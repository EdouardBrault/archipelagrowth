import { useState, useEffect } from 'react';
import { supabaseUntyped as supabase } from '@/integrations/supabase/untyped-client';
import { BlogArticle } from '@/types/blog';
import { useToast } from '@/hooks/use-toast';
import AdminDashboardHeader from './AdminDashboardHeader';
import ArticlesTable from './ArticlesTable';
import ArticleFilters from './ArticleFilters';
import AdminManagement from './AdminManagement';
import ChangePassword from './ChangePassword';
import AuthorManagement from './AuthorManagement';
import { Loader2 } from 'lucide-react';

const AdminDashboard = () => {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => { fetchArticles(); }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('Blog Archipel AI' as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) { console.error('Error fetching articles:', error); return; }

      const formattedArticles: BlogArticle[] = data.map((article: any) => ({
        id: article.id.toString(),
        title: article.title || '',
        slug: article.slug || '',
        excerpt: article.excerpt || '',
        content: article.content || '',
        publishedAt: article.published_at || article.created_at,
        author: article.author || 'Archipel AI',
        category: article.category || 'GEO',
        tags: article.tags ? article.tags.split(',').map((tag: string) => tag.trim()) : [],
        readingTime: article.reading_time || 5,
        featuredImage: article.featured_image || undefined,
        status: article.status || 'draft',
      }));

      setArticles(formattedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateArticleStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('Blog Archipel AI' as any)
        .update({ status: newStatus, published_at: newStatus === 'published' ? new Date().toISOString() : null })
        .eq('id', parseInt(id));

      if (error) {
        toast({ title: "Erreur", description: "Impossible de mettre à jour le statut.", variant: "destructive" });
        return;
      }

      toast({ title: "Succès", description: `Article ${newStatus === 'published' ? 'publié' : 'dépublié'}.` });
      fetchArticles();
    } catch (error) {
      console.error('Error updating article status:', error);
    }
  };

  const deleteArticle = async (id: string, title: string) => {
    try {
      const { error } = await supabase
        .from('Blog Archipel AI' as any)
        .delete()
        .eq('id', parseInt(id));

      if (error) {
        toast({ title: "Erreur", description: "Impossible de supprimer l'article.", variant: "destructive" });
        return;
      }

      toast({ title: "Supprimé", description: `"${title}" a été supprimé.` });
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const filteredArticles = statusFilter === 'all' ? articles : articles.filter(a => a.status === statusFilter);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-[#0043F1]" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <AdminDashboardHeader articlesCount={articles.length} />

      {/* Articles */}
      <div className="bg-white rounded-xl border border-[#E5E7EB]">
        <div className="px-5 py-4 border-b border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm text-[#010D3E]/40 font-inter">
            {articles.length} article{articles.length > 1 ? 's' : ''} au total
          </p>
          <ArticleFilters statusFilter={statusFilter} onFilterChange={setStatusFilter} />
        </div>
        <ArticlesTable articles={filteredArticles} onStatusUpdate={updateArticleStatus} onDelete={deleteArticle} />
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#010D3E]/30 font-inter text-sm">Aucun article trouvé.</p>
          </div>
        )}
      </div>

      {/* Settings sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AuthorManagement />
        <ChangePassword />
      </div>
      <AdminManagement />
    </div>
  );
};

export default AdminDashboard;
