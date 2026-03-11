import { useState } from 'react';
import { supabaseUntyped as supabase } from '@/integrations/supabase/untyped-client';
import { useToast } from '@/hooks/use-toast';

interface ArticleMetaResult {
  meta_title: string;
  meta_description: string;
  excerpt: string;
}

export const useArticleMeta = () => {
  const { toast } = useToast();
  const [generating, setGenerating] = useState(false);

  const generateMeta = async (title: string, content: string): Promise<ArticleMetaResult | null> => {
    if (!title || !content) {
      toast({
        title: "Champs requis",
        description: "Le titre et le contenu sont nécessaires pour générer les métadonnées.",
        variant: "destructive",
      });
      return null;
    }

    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-article-meta', {
        body: { title, content },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast({ title: "✨ Métadonnées générées", description: "Meta title, description et extrait remplis automatiquement." });
      return data as ArticleMetaResult;
    } catch (e) {
      console.error('Error generating meta:', e);
      toast({
        title: "Erreur de génération",
        description: e instanceof Error ? e.message : "Impossible de générer les métadonnées.",
        variant: "destructive",
      });
      return null;
    } finally {
      setGenerating(false);
    }
  };

  return { generateMeta, generating };
};
