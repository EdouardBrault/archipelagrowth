import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { supabaseUntyped as supabase } from '@/integrations/supabase/untyped-client';
import { useBingSubmission } from '@/hooks/useBingSubmission';
import { useArticleMeta } from '@/hooks/useArticleMeta';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaqItem, FaqSection } from '@/types/blog';
import FaqEditor from './FaqEditor';
import BasicInfoSection from './BasicInfoSection';
import CategoryTagsSection from './CategoryTagsSection';
import ImageUploadSection from './ImageUploadSection';
import ArticleImageSection from './ArticleImageSection';
import SeoFieldsSection from './SeoFieldsSection';
import PublicationSection from './PublicationSection';

const EditArticleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { submitArticleToBing } = useBingSubmission();
  const { generateMeta, generating } = useArticleMeta();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '', slug: '', excerpt: '', content: '',
    meta_title: '', meta_description: '', tags: '', category: '',
    featured_image: '', alt_text: '', article_image: '', article_image_alt: '',
    status: 'draft' as 'draft' | 'published',
    published_at: '',
    author: '',
    faq: [] as FaqItem[],
    faqSections: [] as FaqSection[],
  });

  useEffect(() => { if (id) fetchArticle(); }, [id]);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase.from('Blog Archipel AI' as any).select('*').eq('id', parseInt(id!)).single();
      if (error) { toast({ title: "Erreur", description: "Impossible de charger l'article.", variant: "destructive" }); return; }

      const validStatus = data.status === 'published' ? 'published' : 'draft';
      let faqData: FaqItem[] = [];
      if (data.faq) {
        try { faqData = Array.isArray(data.faq) ? data.faq as unknown as FaqItem[] : typeof data.faq === 'string' ? JSON.parse(data.faq) : []; }
        catch (e) { faqData = []; }
      }
      let faqSectionsData: FaqSection[] = [];
      const faqSectionsRaw = (data as any).faq_sections;
      if (faqSectionsRaw) {
        try { faqSectionsData = Array.isArray(faqSectionsRaw) ? faqSectionsRaw as unknown as FaqSection[] : typeof faqSectionsRaw === 'string' ? JSON.parse(faqSectionsRaw) : []; }
        catch (e) { faqSectionsData = []; }
      }

      setFormData({
        title: data.title || '', slug: data.slug || '', excerpt: data.excerpt || '', content: data.content || '',
        meta_title: data.meta_title || '', meta_description: data.meta_description || '',
        tags: data.tags || '', category: data.category || '',
        featured_image: data.featured_image || '', alt_text: data.alt_text || '',
        article_image: data.article_image || '', article_image_alt: data.article_image_alt || '',
        status: validStatus, published_at: data.published_at || '', author: data.author || '',
        faq: faqData, faqSections: faqSectionsData,
      });
    } catch (error) { console.error('Error:', error); }
    finally { setLoading(false); }
  };

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleTitleChange = (value: string) => {
    setFormData(prev => ({ ...prev, title: value, slug: generateSlug(value) }));
  };

  const handleGenerateMeta = async () => {
    const result = await generateMeta(formData.title, formData.content);
    if (result) {
      setFormData(p => ({
        ...p,
        meta_title: result.meta_title,
        meta_description: result.meta_description,
        excerpt: result.excerpt,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { error } = await supabase.from('Blog Archipel AI' as any).update({
        title: formData.title, slug: formData.slug, excerpt: formData.excerpt, content: formData.content,
        meta_title: formData.meta_title, meta_description: formData.meta_description,
        tags: formData.tags, category: formData.category,
        featured_image: formData.featured_image, alt_text: formData.alt_text,
        article_image: formData.article_image, article_image_alt: formData.article_image_alt,
        status: formData.status, published_at: formData.published_at || null, author: formData.author,
        faq: formData.faq.length > 0 ? formData.faq : null,
        faq_sections: formData.faqSections.length > 0 ? formData.faqSections : null,
        updated_at: new Date().toISOString(),
      }).eq('id', parseInt(id!));

      if (error) { toast({ title: "Erreur", description: "Impossible de sauvegarder.", variant: "destructive" }); return; }
      toast({ title: "Sauvegardé", description: "Article mis à jour." });
      if (formData.status === 'published' && formData.slug) await submitArticleToBing(formData.slug);
      navigate('/admin-dashboard');
    } catch (error) { console.error('Error:', error); }
    finally { setSaving(false); }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-[#0043F1]" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm" className="text-[#010D3E]/50 hover:text-[#010D3E] hover:bg-[#F3F4F6] font-inter text-xs gap-1.5">
          <Link to="/admin-dashboard">
            <ArrowLeft className="w-3.5 h-3.5" /> Retour
          </Link>
        </Button>
        <h1 className="font-jakarta text-xl font-bold text-[#010D3E]">Modifier l'article</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 space-y-6">
          <BasicInfoSection
            title={formData.title} slug={formData.slug} author={formData.author}
            excerpt={formData.excerpt} content={formData.content}
            onTitleChange={handleTitleChange}
            onSlugChange={(v) => setFormData(p => ({ ...p, slug: v }))}
            onAuthorChange={(v) => setFormData(p => ({ ...p, author: v }))}
            onExcerptChange={(v) => setFormData(p => ({ ...p, excerpt: v }))}
            onContentChange={(v) => setFormData(p => ({ ...p, content: v }))}
          />
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 space-y-6">
          <CategoryTagsSection
            category={formData.category} tags={formData.tags}
            onCategoryChange={(v) => setFormData(p => ({ ...p, category: v }))}
            onTagsChange={(v) => setFormData(p => ({ ...p, tags: v }))}
          />
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 space-y-6">
          <ImageUploadSection
            featuredImage={formData.featured_image} altText={formData.alt_text}
            articleTitle={formData.title}
            onImageChange={(url) => setFormData(p => ({ ...p, featured_image: url }))}
            onAltTextChange={(t) => setFormData(p => ({ ...p, alt_text: t }))}
          />
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 space-y-6">
          <ArticleImageSection
            articleImage={formData.article_image} articleImageAlt={formData.article_image_alt}
            onArticleImageChange={(url) => setFormData(p => ({ ...p, article_image: url }))}
            onArticleImageAltChange={(t) => setFormData(p => ({ ...p, article_image_alt: t }))}
          />
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
          <FaqEditor faq={formData.faq} faqSections={formData.faqSections || []}
            onChange={(faq, faqSections) => setFormData(p => ({ ...p, faq, faqSections }))}
            articleContent={formData.content} articleTitle={formData.title} articleCategory={formData.category} />
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 space-y-6">
          <SeoFieldsSection
            metaTitle={formData.meta_title} metaDescription={formData.meta_description}
            title={formData.title} excerpt={formData.excerpt}
            onMetaTitleChange={(v) => setFormData(p => ({ ...p, meta_title: v }))}
            onMetaDescriptionChange={(v) => setFormData(p => ({ ...p, meta_description: v }))}
            generating={generating}
            onGenerate={handleGenerateMeta}
          />
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 space-y-6">
          <PublicationSection
            status={formData.status}
            publishedAt={formData.published_at}
            onStatusChange={(v) => setFormData(p => ({ ...p, status: v }))}
            onPublishedAtChange={(v) => setFormData(p => ({ ...p, published_at: v }))}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving} className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter text-sm gap-1.5">
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditArticleForm;
