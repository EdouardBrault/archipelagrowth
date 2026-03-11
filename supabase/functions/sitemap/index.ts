import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: articles } = await supabase
      .from("Blog Archipel AI")
      .select("slug, updated_at, published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    const base = "https://archipelmarketing.com";

    const staticPages = [
      { loc: "/", priority: "1.0", changefreq: "weekly" },
      { loc: "/blog", priority: "0.9", changefreq: "daily" },
      { loc: "/agence-geo-archipel", priority: "0.8", changefreq: "monthly" },
      { loc: "/agence-google-ads-archipel", priority: "0.8", changefreq: "monthly" },
      { loc: "/agence-linkedin-ads-archipel", priority: "0.8", changefreq: "monthly" },
      { loc: "/agence-meta-ads-archipel", priority: "0.8", changefreq: "monthly" },
      { loc: "/agence-seo-archipel", priority: "0.8", changefreq: "monthly" },
      { loc: "/agence-landing-page", priority: "0.8", changefreq: "monthly" },
      { loc: "/contact", priority: "0.7", changefreq: "monthly" },
      { loc: "/qui-sommes-nous", priority: "0.7", changefreq: "monthly" },
      { loc: "/archipel-nos-references", priority: "0.7", changefreq: "monthly" },
      { loc: "/simulateur-audit-GEO", priority: "0.6", changefreq: "monthly" },
      { loc: "/agence-marketing-digital-france", priority: "0.8", changefreq: "monthly" },
      { loc: "/mentions-legales", priority: "0.3", changefreq: "yearly" },
      { loc: "/politique-confidentialite", priority: "0.3", changefreq: "yearly" },
      { loc: "/cgu", priority: "0.3", changefreq: "yearly" },
    ];

    const today = new Date().toISOString().split("T")[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    for (const page of staticPages) {
      xml += `  <url>
    <loc>${base}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
    }

    if (articles) {
      for (const article of articles) {
        if (!article.slug) continue;
        const lastmod = (article.updated_at || article.published_at || today).split("T")[0];
        xml += `  <url>
    <loc>${base}/blog/${article.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
      }
    }

    xml += `</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (e) {
    console.error("Sitemap error:", e);
    return new Response("Internal Server Error", { status: 500 });
  }
});
