import { Button } from "@/components/ui/button";
import { Edit, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogArticle } from '@/types/blog';
import ArticleDeleteDialog from './ArticleDeleteDialog';

interface ArticleActionsProps {
  article: BlogArticle;
  onStatusUpdate: (id: string, newStatus: string) => void;
  onDelete: (id: string, title: string) => void;
}

const ArticleActions = ({ article, onStatusUpdate, onDelete }: ArticleActionsProps) => {
  return (
    <div className="flex justify-end gap-1.5">
      <Button
        size="sm"
        variant="ghost"
        asChild
        className="h-8 w-8 p-0 text-[#010D3E]/40 hover:text-[#0043F1] hover:bg-[#0043F1]/5"
        title="Modifier"
      >
        <Link to={`/archipel-dashboard/edit-article/${article.id}`}>
          <Edit className="w-3.5 h-3.5" />
        </Link>
      </Button>

      {article.status === 'published' && (
        <Button
          size="sm"
          variant="ghost"
          asChild
          className="h-8 w-8 p-0 text-[#010D3E]/40 hover:text-[#0043F1] hover:bg-[#0043F1]/5"
          title="Voir"
        >
          <Link to={`/blog/${article.slug}`} target="_blank">
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </Button>
      )}

      {article.status === 'published' ? (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onStatusUpdate(article.id, 'draft')}
          className="h-8 w-8 p-0 text-[#010D3E]/40 hover:text-amber-600 hover:bg-amber-50"
          title="Dépublier"
        >
          <EyeOff className="w-3.5 h-3.5" />
        </Button>
      ) : (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onStatusUpdate(article.id, 'published')}
          className="h-8 w-8 p-0 text-[#010D3E]/40 hover:text-emerald-600 hover:bg-emerald-50"
          title="Publier"
        >
          <Eye className="w-3.5 h-3.5" />
        </Button>
      )}

      <ArticleDeleteDialog articleId={article.id} articleTitle={article.title} onDelete={onDelete} />
    </div>
  );
};

export default ArticleActions;
