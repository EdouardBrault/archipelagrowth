
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { supabaseUntyped as supabase } from '@/integrations/supabase/untyped-client';
import { Send, Globe } from 'lucide-react';

interface BingUrlSubmissionFormProps {
  onSubmissionComplete: () => void;
}

const BingUrlSubmissionForm = ({ onSubmissionComplete }: BingUrlSubmissionFormProps) => {
  const [urls, setUrls] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitUrls = async () => {
    if (!urls.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer au moins une URL.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const urlList = urls
        .split('\n')
        .map(url => url.trim())
        .filter(url => url.length > 0);

      console.log('📤 Submitting URLs to Bing:', urlList);

      const { data, error } = await supabase.functions.invoke('submit-urls-to-bing', {
        body: { urls: urlList }
      });

      if (error) throw error;

      toast({
        title: "✅ Soumission réussie",
        description: `${urlList.length} URL(s) soumises à Bing avec succès.`,
      });

      setUrls('');
      onSubmissionComplete();
    } catch (error) {
      console.error('Error submitting URLs:', error);
      toast({
        title: "Erreur de soumission",
        description: "Impossible de soumettre les URLs à Bing. Vérifiez votre configuration.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitPublishedArticles = async () => {
    setIsSubmitting(true);
    try {
      const { data: articles, error } = await supabase
        .from('Blog Archipel AI' as any)
        .select('slug')
        .eq('status', 'published')
        .not('slug', 'is', null);

      if (error) throw error;

      const articleUrls = articles.map(article => `https://archipelmarketing.com/blog/${article.slug}`);
      
      // Add main pages
      const mainPages = [
        'https://archipelmarketing.com',
        'https://archipelmarketing.com/services-geo',
        'https://archipelmarketing.com/blog',
        'https://archipelmarketing.com/qui-sommes-nous',
        'https://archipelmarketing.com/contact'
      ];

      const allUrls = [...mainPages, ...articleUrls];

      console.log('📤 Submitting all site URLs to Bing:', allUrls);

      const { data, error: submitError } = await supabase.functions.invoke('submit-urls-to-bing', {
        body: { urls: allUrls }
      });

      if (submitError) throw submitError;

      toast({
        title: "✅ Soumission complète réussie",
        description: `${allUrls.length} URL(s) du site soumises à Bing.`,
      });

      onSubmissionComplete();
    } catch (error) {
      console.error('Error submitting all URLs:', error);
      toast({
        title: "Erreur de soumission",
        description: "Impossible de soumettre toutes les URLs.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Send className="w-5 h-5 text-archipel-cyan" />
          <CardTitle className="text-white">Soumission manuelle d'URLs à Bing</CardTitle>
        </div>
        <CardDescription className="text-gray-300">
          Soumettez des URLs spécifiques à l'index Bing pour une indexation rapide
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-white text-sm font-medium mb-2 block">
            URLs à soumettre (une par ligne)
          </label>
          <Textarea
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            placeholder="https://archipelmarketing.com/blog/mon-article
https://archipelmarketing.com/services-geo
https://archipelmarketing.com/contact"
            rows={6}
            className="bg-gray-700 border-gray-600 text-white"
          />
          <p className="text-gray-400 text-sm mt-1">
            Maximum 50 URLs par soumission (Bing traite par lots de 10)
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={submitUrls}
            disabled={isSubmitting || !urls.trim()}
            className="bg-archipel-cyan text-archipel-dark hover:bg-archipel-cyan/90"
          >
            {isSubmitting ? 'Soumission...' : 'Soumettre les URLs'}
          </Button>

          <Button
            onClick={submitPublishedArticles}
            disabled={isSubmitting}
            variant="outline"
            className="border-archipel-cyan text-archipel-cyan hover:bg-archipel-cyan/10"
          >
            <Globe className="w-4 h-4 mr-2" />
            Soumettre tout le site
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BingUrlSubmissionForm;
