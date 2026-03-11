
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabaseUntyped as supabase } from "@/integrations/supabase/untyped-client";
import { BlogArticle } from "@/types/blog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";

interface ArticleCarouselProps {
  currentArticleId: string;
  currentCategory?: string;
}

const ArticleCarousel = ({ currentArticleId, currentCategory }: ArticleCarouselProps) => {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("ArticleCarousel - Fetching articles, currentArticleId:", currentArticleId);
    fetchOtherArticles();
  }, [currentArticleId, currentCategory]);

  const fetchOtherArticles = async () => {
    try {
      console.log("Fetching other articles...");
      let query = supabase
        .from('Blog Archipel AI' as any)
        .select('*')
        .eq('status', 'published')
        .neq('id', parseInt(currentArticleId))
        .order('published_at', { ascending: false })
        .limit(6);

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching articles:', error);
        return;
      }

      console.log("Fetched articles data:", data);

      if (data) {
        const formattedArticles: BlogArticle[] = data.map(item => ({
          id: item.id.toString(),
          title: item.title || '',
          slug: item.slug || '',
          excerpt: item.excerpt || '',
          content: item.content || '',
          publishedAt: item.published_at || item.created_at,
          author: item.author || 'Archipel AI',
          category: item.category || 'GEO',
          tags: item.tags ? item.tags.split(',').map(tag => tag.trim()) : [],
          readingTime: item.reading_time || 5,
          featuredImage: item.featured_image || undefined,
        }));
        console.log("Formatted articles:", formattedArticles);
        setArticles(formattedArticles);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  console.log("ArticleCarousel render - loading:", loading, "articles count:", articles.length);

  if (loading) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-archipel-cyan mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des articles...</p>
          </div>
        </div>
      </div>
    );
  }

  // Always show the section, even if no articles
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Découvrez nos autres <span className="text-archipel-cyan">articles</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explorez notre collection d'articles sur le GEO et l'optimisation pour les moteurs de recherche IA
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-8">Aucun autre article disponible pour le moment.</p>
            <Button 
              asChild 
              className="bg-archipel-cyan text-archipel-dark hover:bg-archipel-cyan/90 font-semibold"
            >
              <Link to="/blog">Voir tous les articles</Link>
            </Button>
          </div>
        ) : (
          <>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-7xl mx-auto"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {articles.map((article) => (
                  <CarouselItem key={article.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-archipel-cyan/30 transition-all duration-300 h-full group overflow-hidden">
                      {article.featuredImage && (
                        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                          <img 
                            src={article.featuredImage} 
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="secondary" className="bg-archipel-cyan/10 text-archipel-cyan border-archipel-cyan/20 text-xs">
                            {article.category}
                          </Badge>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Clock className="w-4 h-4 mr-1" />
                            {article.readingTime} min
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-archipel-cyan transition-colors">
                          <Link to={`/blog/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>

                        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <CalendarDays className="w-4 h-4 mr-1" />
                            {formatDate(article.publishedAt)}
                          </div>
                        </div>

                        <Button 
                          asChild 
                          className="w-full bg-archipel-cyan text-archipel-dark hover:bg-archipel-cyan/90 font-semibold"
                        >
                          <Link to={`/blog/${article.slug}`} className="flex items-center justify-center gap-2">
                            Lire l'article
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12 bg-white border-gray-300 hover:bg-gray-50" />
              <CarouselNext className="hidden md:flex -right-12 bg-white border-gray-300 hover:bg-gray-50" />
            </Carousel>

            <div className="text-center mt-8">
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-archipel-cyan text-archipel-cyan hover:bg-archipel-cyan hover:text-archipel-dark font-semibold"
              >
                <Link to="/blog" className="flex items-center gap-2">
                  Voir tous les articles
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ArticleCarousel;
