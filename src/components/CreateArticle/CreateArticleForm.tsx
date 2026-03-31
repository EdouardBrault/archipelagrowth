import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { useArticleForm } from "@/hooks/useArticleForm";
import { useArticleMeta } from "@/hooks/useArticleMeta";
import { useNavigate } from "react-router-dom";
import BasicInfoSection from "@/components/EditArticle/BasicInfoSection";
import CategoryTagsSection from "@/components/EditArticle/CategoryTagsSection";
import ImageUploadSection from "@/components/EditArticle/ImageUploadSection";
import ArticleImageSection from "@/components/EditArticle/ArticleImageSection";
import FaqEditor from "@/components/EditArticle/FaqEditor";
import SeoFieldsSection from "@/components/EditArticle/SeoFieldsSection";
import PublicationSection from "@/components/EditArticle/PublicationSection";

const CreateArticleForm = () => {
  const navigate = useNavigate();
  const { formData, updateFormData, generateSlug, submitArticle, isSubmitting } = useArticleForm();
  const { generateMeta, generating } = useArticleMeta();

  const handleTitleChange = (value: string) => {
    updateFormData({ title: value, slug: generateSlug(value) });
  };

  const handleGenerateMeta = async () => {
    const result = await generateMeta(formData.title, formData.content);
    if (result) {
      updateFormData({
        meta_title: result.meta_title,
        meta_description: result.meta_description,
        excerpt: result.excerpt,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitArticle();
    if (success) setTimeout(() => navigate('/admin-dashboard'), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center gap-4">
        <Button type="button" variant="ghost" size="sm" onClick={() => navigate('/admin-dashboard')}
          className="text-[#010D3E]/50 hover:text-[#010D3E] hover:bg-[#F3F4F6] font-inter text-xs gap-1.5">
          <ArrowLeft className="w-3.5 h-3.5" /> Retour
        </Button>
        <h1 className="font-jakarta text-xl font-bold text-[#010D3E]">Nouvel article</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 space-y-6">
          <BasicInfoSection
            title={formData.title} slug={formData.slug} author={formData.author}
            excerpt={formData.excerpt} content={formData.content}
            onTitleChange={handleTitleChange}
            onSlugChange={(v) => updateFormData({ slug: v })}
            onAuthorChange={(v) => updateFormData({ author: v })}
            onExcerptChange={(v) => updateFormData({ excerpt: v })}
            onContentChange={(v) => updateFormData({ content: v })}
          />
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 space-y-6">
          <CategoryTagsSection
            category={formData.category} tags={formData.tags}
            onCategoryChange={(v) => updateFormData({ category: v })}
            onTagsChange={(v) => updateFormData({ tags: v })}
          />
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 space-y-6">
          <ImageUploadSection
            featuredImage={formData.featured_image} altText={formData.alt_text}
            articleTitle={formData.title}
            onImageChange={(url) => updateFormData({ featured_image: url })}
            onAltTextChange={(t) => updateFormData({ alt_text: t })}
          />
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 space-y-6">
          <ArticleImageSection
            articleImage={formData.article_image} articleImageAlt={formData.article_image_alt}
            onArticleImageChange={(url) => updateFormData({ article_image: url })}
            onArticleImageAltChange={(t) => updateFormData({ article_image_alt: t })}
          />
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
          <FaqEditor faq={formData.faq} faqSections={formData.faqSections || []}
            onChange={(faq, faqSections) => updateFormData({ faq, faqSections })}
            articleContent={formData.content} articleTitle={formData.title} articleCategory={formData.category} />
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 space-y-6">
          <SeoFieldsSection
            metaTitle={formData.meta_title} metaDescription={formData.meta_description}
            title={formData.title} excerpt={formData.excerpt}
            onMetaTitleChange={(v) => updateFormData({ meta_title: v })}
            onMetaDescriptionChange={(v) => updateFormData({ meta_description: v })}
            generating={generating}
            onGenerate={handleGenerateMeta}
          />
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 space-y-6">
          <PublicationSection
            status={formData.status}
            publishedAt={formData.published_at}
            onStatusChange={(v) => updateFormData({ status: v })}
            onPublishedAtChange={(v) => updateFormData({ published_at: v })}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting || !formData.title.trim() || !formData.content.trim()}
            className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter text-sm gap-1.5">
            {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            {isSubmitting ? 'Sauvegarde...' : "Publier l'article"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateArticleForm;
