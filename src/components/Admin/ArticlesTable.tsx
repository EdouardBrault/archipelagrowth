import { BlogArticle } from '@/types/blog';
import ArticleActions from './ArticleActions';

interface ArticlesTableProps {
  articles: BlogArticle[];
  onStatusUpdate: (id: string, newStatus: string) => void;
  onDelete: (id: string, title: string) => void;
}

const ArticlesTable = ({ articles, onStatusUpdate, onDelete }: ArticlesTableProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#E5E7EB]">
            <th className="text-left px-5 py-3 text-xs font-inter font-medium text-[#010D3E]/40 uppercase tracking-wide">Titre</th>
            <th className="text-left px-5 py-3 text-xs font-inter font-medium text-[#010D3E]/40 uppercase tracking-wide">Statut</th>
            <th className="text-left px-5 py-3 text-xs font-inter font-medium text-[#010D3E]/40 uppercase tracking-wide hidden sm:table-cell">Date</th>
            <th className="text-right px-5 py-3 text-xs font-inter font-medium text-[#010D3E]/40 uppercase tracking-wide">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="border-b border-[#E5E7EB] last:border-0 hover:bg-[#F9FAFB] transition-colors">
              <td className="px-5 py-3.5">
                <div className="max-w-md">
                  <p className="text-sm font-inter font-medium text-[#010D3E] truncate">{article.title}</p>
                  <p className="text-xs font-inter text-[#010D3E]/40 truncate mt-0.5">{article.excerpt}</p>
                </div>
              </td>
              <td className="px-5 py-3.5">
                {article.status === 'published' ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-inter font-medium text-emerald-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Publié
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-inter font-medium text-[#010D3E]/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#010D3E]/20" />
                    Brouillon
                  </span>
                )}
              </td>
              <td className="px-5 py-3.5 hidden sm:table-cell">
                <span className="text-xs font-inter text-[#010D3E]/40">
                  {formatDate(article.publishedAt)}
                </span>
              </td>
              <td className="px-5 py-3.5">
                <ArticleActions article={article} onStatusUpdate={onStatusUpdate} onDelete={onDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticlesTable;
