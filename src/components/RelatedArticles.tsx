import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BlogArticle } from "@/types/blog";

interface RelatedArticlesProps {
  currentArticleId: string;
  currentCategory?: string;
  currentTags?: string[];
}

const RelatedArticles = ({ 
  currentArticleId, 
  currentCategory, 
  currentTags = [] 
}: RelatedArticlesProps) => {
  const [relatedArticles, setRelatedArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      try {
        const { data: articles } = await supabase
          .from("Blog Archipel AI")
          .select("*")
          .eq("status", "published")
          .neq("id", Number(currentArticleId))
          .order("created_at", { ascending: false })
          .limit(20);

        if (articles) {
          // Score articles by relevance
          const scoredArticles = articles.map(article => {
            let score = 0;
            
            // Same category gets highest score
            if (currentCategory && article.category === currentCategory) {
              score += 10;
            }
            
            // Tag matches
            if (currentTags.length > 0 && article.tags) {
              const articleTags = article.tags.toLowerCase().split(',').map(tag => tag.trim());
              const matchingTags = currentTags.filter(tag => 
                articleTags.some(articleTag => 
                  articleTag.includes(tag.toLowerCase()) || tag.toLowerCase().includes(articleTag)
                )
              );
              score += matchingTags.length * 3;
            }
            
            // Recent articles get slight boost
            const daysOld = (Date.now() - new Date(article.created_at).getTime()) / (1000 * 60 * 60 * 24);
            if (daysOld < 30) score += 2;
            if (daysOld < 7) score += 1;
            
            return { ...article, score };
          });

          // Sort by score and take top 4
          const sortedArticles = scoredArticles
            .sort((a, b) => b.score - a.score)
            .slice(0, 4)
            .map(({ score, ...article }) => ({
              id: String(article.id),
              title: article.title || '',
              slug: article.slug || '',
              excerpt: article.excerpt || '',
              content: article.content || '',
              publishedAt: article.published_at || article.created_at,
              author: article.author || 'Archipel AI',
              category: article.category || 'GEO',
              tags: article.tags ? article.tags.split(',').map(tag => tag.trim()) : [],
              readingTime: article.reading_time || 5,
              featuredImage: article.featured_image,
              seoTitle: article.meta_title,
              seoDescription: article.meta_description,
              status: article.status || 'published',
              altText: article.alt_text
            } as BlogArticle & { altText?: string }));

          setRelatedArticles(sortedArticles);
        }
      } catch (error) {
        console.error("Error fetching related articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedArticles();
  }, [currentArticleId, currentCategory, currentTags]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Articles recommandés</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-muted rounded-t-lg"></div>
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Articles recommandés</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedArticles.map((article) => (
          <Card key={article.id} className="group hover:shadow-lg transition-shadow duration-300">
            {article.featuredImage && (
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={article.featuredImage}
                  alt={(article as any).altText || article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    {article.category}
                  </Badge>
                </div>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                <Link to={`/blog/${article.slug}`} className="text-decoration-none">
                  {article.title}
                </Link>
              </CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>{article.readingTime} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <User size={12} />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link 
          to="/blog" 
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          Voir tous nos articles
        </Link>
      </div>
    </section>
  );
};

export default RelatedArticles;