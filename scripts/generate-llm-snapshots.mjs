#!/usr/bin/env node
// Build ping: updated to ensure auto-deploy and LLM snapshots freshness
import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://retrrddqewpcvmnhywpy.supabase.co";
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJldHJyZGRxZXdwY3Ztbmh5d3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMTE2MDIsImV4cCI6MjA4NzU4NzYwMn0.-wLZ8PKbpn6v8lgFRnk8gBxdQCLyMKLM5HpCvphVPMg";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const SITE_URL = "https://archipelmarketing.com";

const generateBaseHTML = (title, content, description = "", slug = "") => `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://archipel-ai.com${slug ? '/blog/' + slug : (title.includes('Blog') ? '/blog' : '')}">
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; margin: 0; padding: 20px; max-width: 800px; margin: 0 auto; color: #374151; }
        h1 { color: #1e40af; margin-bottom: 1rem; }
        h2 { color: #374151; margin: 1.5rem 0 0.5rem 0; }
        h3 { color: #4b5563; margin: 1rem 0 0.5rem 0; }
        p { margin-bottom: 1rem; }
        .meta { color: #6b7280; font-size: 0.9rem; margin: 1rem 0; }
        .tag { background: #f3f4f6; padding: 0.25rem 0.5rem; border-radius: 0.25rem; margin-right: 0.5rem; font-size: 0.8rem; }
        .faq { margin-top: 2rem; }
        .faq-question { font-weight: bold; margin: 1rem 0 0.5rem 0; }
        nav { margin-bottom: 2rem; }
        nav a { color: #1e40af; text-decoration: none; margin-right: 1rem; }
        nav a:hover { text-decoration: underline; }
        footer { margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e5e7eb; color: #6b7280; }
        ul { margin: 1rem 0; }
        li { margin: 0.5rem 0; }
        .article-list { margin-top: 2rem; }
        .article-item { margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #f3f4f6; }
        .article-item h3 { margin-top: 0; }
    </style>
</head>
<body>
    <header>
        <h1>Archipel AI - ${title}</h1>
        <nav>
            <a href="/">Accueil</a>
            <a href="/blog">Blog</a>
            <a href="/contact">Contact</a>
        </nav>
    </header>
    <main>
        ${content}
    </main>
    <footer>
        <p>&copy; 2024 Archipel AI. Tous droits réservés.</p>
    </footer>
</body>
</html>`;

async function generateHomeSnapshot() {
    const content = `
        <section>
            <h1>Archipel AI - Expertise en Géolocalisation et Intelligence Artificielle</h1>
            <p>Archipel AI est une agence spécialisée dans l'optimisation géolocalisée et l'intelligence artificielle. Nous aidons les entreprises à améliorer leur visibilité locale et à exploiter la puissance de l'IA pour leur croissance.</p>
            
            <h2>Nos Services</h2>
            <ul>
                <li>SEO Géolocalisé</li>
                <li>Google My Business</li>
                <li>Intelligence Artificielle</li>
                <li>Optimisation locale</li>
            </ul>
            
            <h2>Pourquoi choisir Archipel AI ?</h2>
            <p>Notre expertise combine les dernières technologies d'IA avec une connaissance approfondie du SEO géolocalisé pour offrir des résultats exceptionnels à nos clients.</p>
        </section>
    `;
    
    return generateBaseHTML(
        "Agence SEO Géolocalisé & IA",
        content,
        "Archipel AI, agence spécialisée en SEO géolocalisé et intelligence artificielle. Optimisez votre visibilité locale avec nos experts."
    );
}

async function generateBlogSnapshot(articles) {
    const articlesHTML = articles?.map(article => `
        <article>
            <h3><a href="/blog/${article.slug}">${article.title}</a></h3>
            <p>${article.excerpt}</p>
            <small>Catégorie: ${article.category} | Publié le: ${new Date(article.published_at).toLocaleDateString('fr-FR')}</small>
        </article>
    `).join('') || '';

    const content = `
        <h1>Blog Archipel AI</h1>
        <p>Découvrez nos derniers articles sur le SEO géolocalisé, l'intelligence artificielle et l'optimisation digitale.</p>
        <section>
            ${articlesHTML}
        </section>
    `;

    return generateBaseHTML(
        "Blog - Articles SEO et IA",
        content,
        "Blog Archipel AI - Articles sur le SEO géolocalisé, l'intelligence artificielle et l'optimisation digitale."
    );
}

async function generateArticleSnapshot(article) {
    const faqHTML = article.faq_sections ? 
        article.faq_sections.map(section => `
            <section>
                <h3>${section.title}</h3>
                ${section.questions.map(q => `
                    <div>
                        <h4>${q.question}</h4>
                        <p>${q.answer}</p>
                    </div>
                `).join('')}
            </section>
        `).join('') : '';

    const content = `
        <article>
            <header>
                <h1>${article.title}</h1>
                <p><strong>Catégorie:</strong> ${article.category}</p>
                <p><strong>Auteur:</strong> ${article.author}</p>
                <p><strong>Publié le:</strong> ${new Date(article.published_at).toLocaleDateString('fr-FR')}</p>
                <p><strong>Temps de lecture:</strong> ${article.reading_time} min</p>
            </header>
            
            <section>
                <h2>Résumé</h2>
                <p>${article.excerpt}</p>
            </section>
            
            <section>
                <h2>Contenu</h2>
                ${article.content}
            </section>
            
            ${faqHTML ? `
                <section>
                    <h2>Questions Fréquentes</h2>
                    ${faqHTML}
                </section>
            ` : ''}
            
            <footer>
                <p><strong>Mots-clés:</strong> ${article.tags?.join(', ') || ''}</p>
            </footer>
        </article>
    `;

    return generateBaseHTML(
        article.seo_title || article.title,
        content,
        article.seo_description || article.excerpt,
        article.slug
    );
}

async function main() {
    const start = Date.now();
    const buildInfo = {
        startTime: new Date().toISOString(),
        nodeVersion: process.version,
        cwd: process.cwd(),
        supabaseHost: 'unknown',
        articlesGenerated: 0,
        errors: []
    };

    try {
        console.log('🚀 Génération des snapshots HTML pour les LLM...');
        console.log(`⏱️ Début: ${buildInfo.startTime}`);
        console.log(`🧩 Node: ${buildInfo.nodeVersion} | CWD: ${buildInfo.cwd}`);
        console.log('📊 Forçage du redéploiement Vercel - 4 septembre 2025');
        
        try {
            const u = new URL(SUPABASE_URL);
            buildInfo.supabaseHost = u.host;
            console.log(`🔗 Supabase host: ${buildInfo.supabaseHost}`);
        } catch (_) {
            console.log('🔗 Supabase host: (invalid URL)');
            buildInfo.errors.push('Invalid Supabase URL');
        }
        
        // Créer le dossier llm-snapshots avec structure complète
        await fs.mkdir('dist/llm-snapshots', { recursive: true });
        await fs.mkdir('dist/llm-snapshots/blog', { recursive: true });

        // TOUJOURS générer la page d'accueil (même en cas d'erreur Supabase)
        console.log('📄 Génération de la page d\'accueil...');
        try {
            const homeHTML = await generateHomeSnapshot();
            await fs.writeFile('dist/llm-snapshots/index.html', homeHTML);
            console.log('✅ Page d\'accueil générée');
        } catch (error) {
            console.warn('⚠️  Erreur lors de la génération de la page d\'accueil:', error);
            buildInfo.errors.push(`Home page error: ${error.message}`);
            // Générer une page d'accueil minimale
            const fallbackHome = generateBaseHTML('Archipel AI', '<h1>Archipel AI</h1><p>Site en cours de maintenance.</p>');
            await fs.writeFile('dist/llm-snapshots/index.html', fallbackHome);
        }

        // Récupération des articles avec gestion d'erreur robuste
        let articles = null;
        console.log('📊 Récupération des articles publiés...');
        try {
            const { data, error } = await supabase
                .from('Blog Archipel AI')
                .select('*')
                .eq('status', 'published')
                .order('published_at', { ascending: false });
            
            if (error) {
                throw new Error(`Supabase error: ${error.message}`);
            }
            
            // Normalize fields to match frontend expectations
            const normalizeArticle = (row) => {
                const tagsArr = row.tags
                    ? String(row.tags)
                        .split(',')
                        .map((t) => t.trim())
                        .filter(Boolean)
                    : [];
                let faqSections = row.faq_sections;
                if (!faqSections || (Array.isArray(faqSections) && faqSections.length === 0)) {
                    if (Array.isArray(row.faq) && row.faq.length > 0) {
                        faqSections = [{ id: 'main', title: 'FAQ', questions: row.faq }];
                    } else {
                        faqSections = [];
                    }
                }
                return {
                    ...row,
                    published_at: row.published_at || row.created_at,
                    reading_time: row.reading_time || 5,
                    author: row.author || 'Archipel AI',
                    category: row.category || 'GEO',
                    tags: tagsArr,
                    faq_sections: faqSections,
                    seo_title: row.meta_title || row.title,
                    seo_description: row.meta_description || row.excerpt,
                };
            };
            
            articles = (data || []).map(normalizeArticle);
            console.log(`📊 ${articles?.length || 0} articles récupérés`);
        } catch (error) {
            console.warn('❌ Erreur lors de la récupération des articles:', error);
            buildInfo.errors.push(`Articles fetch error: ${error.message}`);
            articles = []; // Continuer avec un tableau vide
        }

        // TOUJOURS générer la page blog (même avec 0 articles)
        console.log('📋 Génération de la page blog...');
        try {
            const blogHTML = await generateBlogSnapshot(articles);
            await fs.writeFile('dist/llm-snapshots/blog.html', blogHTML);
            await fs.writeFile('dist/llm-snapshots/blog/index.html', blogHTML);
            
            // Generate static blog files for direct access
            await fs.mkdir('dist/blog', { recursive: true });
            await fs.writeFile('dist/blog/index.html', blogHTML);
            console.log('✅ Blog variants générés: blog.html, blog/index.html et fichier statique /blog/index.html');
        } catch (error) {
            console.warn('⚠️  Erreur lors de la génération du blog:', error);
            buildInfo.errors.push(`Blog page error: ${error.message}`);
            // Générer une page blog minimale
            const fallbackBlog = generateBaseHTML('Blog', '<h1>Blog</h1><p>Articles en cours de chargement.</p>');
            await fs.writeFile('dist/llm-snapshots/blog.html', fallbackBlog);
            await fs.writeFile('dist/llm-snapshots/blog/index.html', fallbackBlog);
            await fs.mkdir('dist/blog', { recursive: true });
            await fs.writeFile('dist/blog/index.html', fallbackBlog);
        }

        // Générer les articles individuels avec gestion d'erreur par article
        if (articles && articles.length > 0) {
            console.log(`📝 Génération de ${articles.length} articles individuels...`);
            let successCount = 0;
            
            for (const article of articles) {
                try {
                    // Validation des données d'article
                    if (!article.slug || !article.title) {
                        console.warn(`⚠️  Article ignoré - données manquantes: ${article.id}`);
                        buildInfo.errors.push(`Article ${article.id}: missing slug or title`);
                        continue;
                    }
                    
                    const articleHTML = await generateArticleSnapshot(article);
                    
                    // Version sans slash: /blog/slug.html
                    await fs.writeFile(`dist/llm-snapshots/blog/${article.slug}.html`, articleHTML);
                    
                    // Version avec slash: /blog/slug/index.html
                    await fs.mkdir(`dist/llm-snapshots/blog/${article.slug}`, { recursive: true });
                    await fs.writeFile(`dist/llm-snapshots/blog/${article.slug}/index.html`, articleHTML);
                    
                    // Generate static article files for direct access
                    await fs.mkdir(`dist/blog/${article.slug}`, { recursive: true });
                    await fs.writeFile(`dist/blog/${article.slug}/index.html`, articleHTML);
                    
                    successCount++;
                    console.log(`✅ Article ${article.slug}: variants LLM et statiques générés`);
                } catch (error) {
                    console.warn(`⚠️  Erreur pour l'article ${article.slug}:`, error);
                    buildInfo.errors.push(`Article ${article.slug}: ${error.message}`);
                    
                    // Générer une page d'article minimal en cas d'erreur
                    try {
                        const fallbackArticle = generateBaseHTML(
                            article.title || 'Article',
                            `<h1>${article.title || 'Article'}</h1><p>Contenu en cours de chargement.</p>`
                        );
                        await fs.writeFile(`dist/llm-snapshots/blog/${article.slug}.html`, fallbackArticle);
                        await fs.mkdir(`dist/llm-snapshots/blog/${article.slug}`, { recursive: true });
                        await fs.writeFile(`dist/llm-snapshots/blog/${article.slug}/index.html`, fallbackArticle);
                        
                        // Generate static fallback
                        await fs.mkdir(`dist/blog/${article.slug}`, { recursive: true });
                        await fs.writeFile(`dist/blog/${article.slug}/index.html`, fallbackArticle);
                    } catch (fallbackError) {
                        console.error(`❌ Impossible de créer le fallback pour ${article.slug}:`, fallbackError);
                    }
                }
            }
            
            buildInfo.articlesGenerated = successCount;
            console.log(`📊 ${successCount}/${articles.length} articles générés avec succès`);
        } else {
            console.log('⚠️  Aucun article à générer');
        }

        // Générer un manifeste de debug
        buildInfo.endTime = new Date().toISOString();
        buildInfo.duration = ((Date.now() - start) / 1000).toFixed(2) + 's';
        
        const debugManifest = {
            ...buildInfo,
            success: true,
            message: 'Snapshots générés avec succès'
        };
        
        await fs.writeFile('dist/llm-snapshots/debug.json', JSON.stringify(debugManifest, null, 2));

        // Generate sitemap.xml and RSS feed
        await generateSitemap();
        await generateRssFeed(articles);
        
        // Ping IndexNow if key is available
        await pingIndexNow();
        
        console.log('✅ Snapshots HTML et sitemap générés avec succès !');
        console.log('📁 Fichiers créés dans dist/llm-snapshots/ et dist/sitemap.xml');
        console.log(`⏹️ Fin: ${buildInfo.endTime} (${buildInfo.duration})`);
        
        if (buildInfo.errors.length > 0) {
            console.log(`⚠️  ${buildInfo.errors.length} erreur(s) non-critiques détectées (voir debug.json)`);
        }
        
    } catch (criticalError) {
        buildInfo.endTime = new Date().toISOString();
        buildInfo.duration = ((Date.now() - start) / 1000).toFixed(2) + 's';
        buildInfo.errors.push(`Critical error: ${criticalError.message}`);
        
        console.error('❌ Erreur critique lors de la génération des snapshots:', criticalError);
        
        // Générer quand même un manifeste de debug
        try {
            const errorManifest = {
                ...buildInfo,
                success: false,
                message: 'Échec de génération des snapshots'
            };
            await fs.writeFile('dist/llm-snapshots/debug.json', JSON.stringify(errorManifest, null, 2));
        } catch (_) {
            console.error('❌ Impossible de créer le manifeste de debug');
        }
        
        console.log('⚠️  Le build continuera sans les snapshots LLM');
        process.exit(0); // Ne pas faire échouer le build
    }
}

async function generateSitemap() {
  try {
    console.log('🗺️ Génération du sitemap.xml...');
    
    // Static pages
    const staticPages = [
      { url: '', priority: '1.0', changefreq: 'daily' },
      { url: '/blog', priority: '0.9', changefreq: 'daily' },
      { url: '/services-geo', priority: '0.8', changefreq: 'weekly' },
      { url: '/masterclass', priority: '0.8', changefreq: 'weekly' },
      { url: '/qui-sommes-nous', priority: '0.7', changefreq: 'monthly' },
      { url: '/contact', priority: '0.7', changefreq: 'monthly' },
      { url: '/etude-chatgpt-vs-google', priority: '0.8', changefreq: 'monthly' },
      { url: '/simulateur-chatgpt', priority: '0.8', changefreq: 'monthly' },
      { url: '/faq-geo', priority: '0.6', changefreq: 'monthly' },
      { url: '/notre-equipe-geo', priority: '0.6', changefreq: 'monthly' },
      { url: '/methodologie-agence-geo', priority: '0.6', changefreq: 'monthly' },
      { url: '/temoignages-clients-geo', priority: '0.6', changefreq: 'monthly' },
    ];

    // Fetch published articles
    const { data: articles, error } = await supabase
      .from('Blog Archipel AI')
      .select('slug, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching articles for sitemap:', error);
    }

    const now = new Date().toISOString();
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add static pages
    for (const page of staticPages) {
      sitemap += `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    }

    // Add blog articles
    if (articles && articles.length > 0) {
      for (const article of articles) {
        if (article.slug) {
          const lastmod = article.updated_at || article.published_at || now;
          sitemap += `
  <url>
    <loc>${SITE_URL}/blog/${article.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
        }
      }
    }

    sitemap += `
</urlset>`;

    await fs.writeFile(path.join('dist', 'sitemap.xml'), sitemap, 'utf8');
    console.log(`✅ Sitemap généré avec ${staticPages.length + (articles?.length || 0)} URLs`);
    
  } catch (error) {
    console.error('❌ Erreur lors de la génération du sitemap:', error);
  }
}

async function pingIndexNow() {
  try {
    const indexNowKey = process.env.INDEXNOW_KEY;
    if (!indexNowKey) {
      console.log('ℹ️ INDEXNOW_KEY non configurée, IndexNow ignoré');
      return;
    }

    // Generate IndexNow key file
    await fs.writeFile(path.join('dist', `${indexNowKey}.txt`), indexNowKey, 'utf8');
    console.log('✅ Fichier clé IndexNow généré');

    // Ping IndexNow API
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host: 'archipelmarketing.com',
        key: indexNowKey,
        keyLocation: `${SITE_URL}/${indexNowKey}.txt`,
        urlList: [`${SITE_URL}/sitemap.xml`]
      })
    });

    if (response.ok) {
      console.log('✅ IndexNow ping réussi');
    } else {
      console.log(`⚠️ IndexNow ping échoué: ${response.status}`);
    }
    
  } catch (error) {
    console.error('❌ Erreur IndexNow:', error);
  }
}

async function generateRssFeed(articles) {
  try {
    console.log('📻 Génération du feed RSS...');
    
    const rssItems = articles?.map(article => {
      const pubDate = new Date(article.published_at || article.created_at).toUTCString();
      const permalink = `${SITE_URL}/blog/${article.slug}`;
      
      return `    <item>
      <title><![CDATA[${article.title || ''}]]></title>
      <link>${permalink}</link>
      <guid isPermaLink="true">${permalink}</guid>
      <description><![CDATA[${article.excerpt || ''}]]></description>
      <content:encoded><![CDATA[${article.content || ''}]]></content:encoded>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${article.category || 'GEO'}]]></category>
      <dc:creator><![CDATA[${article.author || 'Archipel AI'}]]></dc:creator>
    </item>`;
    }).join('\n') || '';

    const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Archipel AI - Blog GEO et IA</title>
    <link>${SITE_URL}</link>
    <description>Blog de référence sur le Generative Engine Optimization (GEO), l'optimisation pour ChatGPT et les moteurs de recherche IA</description>
    <language>fr-FR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <generator>Archipel AI</generator>
    <image>
      <url>${SITE_URL}/lovable-uploads/096342cb-c5f0-4649-9085-3d636d9ded3c.png</url>
      <title>Archipel AI</title>
      <link>${SITE_URL}</link>
    </image>
${rssItems}
  </channel>
</rss>`;

    await fs.writeFile('dist/feed.xml', rssContent);
    console.log('✅ Feed RSS généré: feed.xml');
  } catch (error) {
    console.warn('⚠️  Erreur lors de la génération du feed RSS:', error);
  }
}

main();