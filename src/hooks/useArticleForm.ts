import { useState } from 'react';
import { supabaseUntyped as supabase } from '@/integrations/supabase/untyped-client';
import { useToast } from '@/hooks/use-toast';
import { FaqItem, FaqSection } from '@/types/blog';
import { useBingSubmission } from './useBingSubmission';

export interface ArticleFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  meta_title: string;
  meta_description: string;
  tags: string;
  category: string;
  featured_image: string;
  alt_text: string;
  article_image: string;
  article_image_alt: string;
  status: 'draft' | 'published';
  published_at: string;
  author: string;
  faq: FaqItem[];
  faqSections: FaqSection[];
}

// Fonction utilitaire pour compresser les images
const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve) => {
    console.log('🖼️ Compression useArticleForm:', file.name, file.type, file.size);
    
    // Si petit fichier, pas de compression
    if (file.size <= 500 * 1024) {
      console.log('✅ Fichier petit useArticleForm, pas de compression');
      resolve(file);
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = document.createElement('img');
    
    img.onload = () => {
      try {
        // Calculer les nouvelles dimensions (max 1200px de largeur)
        const maxWidth = 1200;
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        const newWidth = Math.floor(img.width * ratio);
        const newHeight = Math.floor(img.height * ratio);
        
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        if (ctx) {
          ctx.drawImage(img, 0, 0, newWidth, newHeight);
          
          // Préserver le type original
          const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          const quality = file.type === 'image/png' ? undefined : 0.85;
          
          canvas.toBlob((blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: outputType,
                lastModified: Date.now(),
              });
              console.log('✅ Compression useArticleForm réussie:', compressedFile.size);
              resolve(compressedFile);
            } else {
              console.warn('⚠️ Échec compression useArticleForm, fichier original');
              resolve(file);
            }
          }, outputType, quality);
        } else {
          resolve(file);
        }
      } catch (error) {
        console.error('❌ Erreur compression useArticleForm:', error);
        resolve(file);
      }
    };
    
    img.onerror = (error) => {
      console.error('❌ Erreur chargement image useArticleForm:', error);
      resolve(file);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

export const useArticleForm = () => {
  const { toast } = useToast();
  const { submitArticleToBing } = useBingSubmission();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    meta_title: '',
    meta_description: '',
    tags: '',
    category: '',
    featured_image: '',
    alt_text: '',
    article_image: '',
    article_image_alt: '',
    status: 'draft',
    published_at: '',
    author: 'Michael Abramczuk',
    faq: [],
    faqSections: [],
  });

  const updateFormData = (data: Partial<ArticleFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const calculateWordCount = (content: string) => {
    return content.split(/\s+/).filter(word => word.length > 0).length;
  };

  const validateFile = (file: File): string | null => {
    if (file.size > 10 * 1024 * 1024) {
      return 'Le fichier doit faire moins de 10 Mo';
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      return `Format non supporté. Types acceptés: ${allowedTypes.join(', ')}`;
    }

    if (!file.type.startsWith('image/')) {
      return 'Le fichier doit être une image';
    }

    return null;
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      console.log('🚀 === DÉBUT UPLOAD useArticleForm ===');
      console.log('📄 Fichier useArticleForm:', file.name, file.type, file.size);
      
      // Validation
      const validationError = validateFile(file);
      if (validationError) {
        throw new Error(validationError);
      }

      // Compression
      let processedFile: File;
      try {
        processedFile = await compressImage(file);
      } catch (compressionError) {
        console.warn('⚠️ Échec compression useArticleForm, fichier original:', compressionError);
        processedFile = file;
      }
      
      // Nom unique
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 9);
      const extension = processedFile.name.split('.').pop()?.toLowerCase() || 'jpg';
      const fileName = `form-${timestamp}-${randomStr}.${extension}`;
      
      console.log('☁️ Upload useArticleForm vers Supabase:', fileName);
      
      const { data, error } = await supabase.storage
        .from('archipel-blog-images')
        .upload(fileName, processedFile, {
          cacheControl: '3600',
          upsert: false,
          contentType: processedFile.type
        });

      if (error) {
        console.error('❌ Erreur Supabase useArticleForm:', error);
        throw new Error(`Erreur Supabase: ${error.message}`);
      }

      console.log('✅ Upload useArticleForm réussi:', data);

      const { data: publicUrlData } = supabase.storage
        .from('archipel-blog-images')
        .getPublicUrl(fileName);

      console.log('🔗 URL useArticleForm générée:', publicUrlData.publicUrl);
      return publicUrlData.publicUrl;
    } catch (error) {
      console.error('💥 Erreur complète useArticleForm:', error);
      
      let userMessage = 'Erreur inconnue lors de l\'upload';
      if (error instanceof Error) {
        userMessage = error.message;
      }
      
      toast({
        title: "Erreur d'upload",
        description: userMessage,
        variant: "destructive",
      });
      return null;
    }
  };

  const submitArticle = async () => {
    setIsSubmitting(true);
    try {
      const articleData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt || null,
        content: formData.content,
        meta_title: formData.meta_title || null,
        meta_description: formData.meta_description || null,
        tags: formData.tags || null,
        category: formData.category || null,
        featured_image: formData.featured_image || null,
        alt_text: formData.alt_text || null,
        article_image: formData.article_image || null,
        article_image_alt: formData.article_image_alt || null,
        status: formData.status,
        published_at: formData.published_at || null,
        reading_time: calculateReadingTime(formData.content),
        word_count: calculateWordCount(formData.content),
        author: formData.author,
        faq: formData.faq.length > 0 ? JSON.stringify(formData.faq) : null,
        faq_sections: formData.faqSections.length > 0 ? JSON.stringify(formData.faqSections) : null,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('Blog Archipel AI' as any)
        .insert([articleData]);

      if (error) throw error;

      // Auto-submit to Bing if published
      if (formData.status === 'published' && formData.slug) {
        console.log('📤 Auto-submitting new article to Bing...');
        const bingSuccess = await submitArticleToBing(formData.slug);
        
        if (bingSuccess) {
          toast({
            title: "✅ Article enregistré et soumis à Bing !",
            description: "Votre article a été publié et automatiquement soumis pour indexation.",
          });
        } else {
          toast({
            title: "✅ Article enregistré !",
            description: "Article publié avec succès. Soumission Bing échouée (vérifiez la configuration).",
          });
        }
      } else {
        toast({
          title: "✅ Article enregistré !",
          description: "Vous pouvez le retrouver dans Supabase pour validation et publication.",
        });
      }

      return true;
    } catch (error) {
      console.error('Error submitting article:', error);
      toast({
        title: "Erreur de sauvegarde",
        description: "Impossible de sauvegarder l'article. Veuillez réessayer.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    updateFormData,
    generateSlug,
    uploadImage,
    submitArticle,
    isSubmitting,
  };
};
