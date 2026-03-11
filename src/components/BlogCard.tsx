
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { BlogArticle } from "@/types/blog";

interface BlogCardProps {
  article: BlogArticle;
}

const BlogCard = ({ article }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-archipel-cyan/50 transition-all duration-300 h-full group overflow-hidden">
      {/* Image au-dessus du bloc */}
      {article.featuredImage && (
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={article.featuredImage} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="bg-archipel-cyan/20 text-archipel-cyan text-xs">
            {article.category}
          </Badge>
          <div className="flex items-center text-gray-400 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            {article.readingTime} min
          </div>
        </div>
        <CardTitle className="text-white text-2xl md:text-3xl font-bold mb-2 group-hover:text-archipel-cyan transition-colors">
          <Link to={`/blog/${article.slug}`}>
            {article.title}
          </Link>
        </CardTitle>
        <CardDescription className="text-base text-gray-300 mb-4">
          {article.excerpt}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            {article.author}
          </div>
          <div className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-1" />
            {formatDate(article.publishedAt)}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {article.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
