
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useBingSubmission = () => {
  const { toast } = useToast();

  const submitUrlToBing = useCallback(async (url: string) => {
    try {
      console.log('🔗 Auto-submitting URL to Bing:', url);

      const { data, error } = await supabase.functions.invoke('submit-urls-to-bing', {
        body: { urls: [url] }
      });

      if (error) {
        console.error('❌ Error auto-submitting to Bing:', error);
        return false;
      }

      console.log('✅ URL auto-submitted to Bing successfully');
      return true;
    } catch (error) {
      console.error('💥 Error in auto Bing submission:', error);
      return false;
    }
  }, []);

  const submitArticleToBing = useCallback(async (slug: string) => {
    if (!slug) return false;
    
    const url = `https://archipelmarketing.com/blog/${slug}`;
    return await submitUrlToBing(url);
  }, [submitUrlToBing]);

  return {
    submitUrlToBing,
    submitArticleToBing
  };
};
