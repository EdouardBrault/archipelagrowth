
import { useState, useCallback } from 'react';
import { supabaseUntyped as supabase } from '@/integrations/supabase/untyped-client';
import { useToast } from '@/hooks/use-toast';

interface SubmissionLog {
  id: string;
  site_url: string;
  urls_submitted: string[];
  submission_date: string;
  status: string;
}

export const useBingSubmissionLogs = () => {
  const [submissions, setSubmissions] = useState<SubmissionLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const { toast } = useToast();

  const loadSubmissionLogs = useCallback(async () => {
    setLoadingLogs(true);
    try {
      const { data, error } = await supabase
        .from('bing_url_submissions' as any)
        .select('*')
        .order('submission_date', { ascending: false })
        .limit(10);

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error loading submission logs:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger l'historique des soumissions.",
        variant: "destructive",
      });
    } finally {
      setLoadingLogs(false);
    }
  }, [toast]);

  return {
    submissions,
    loadingLogs,
    loadSubmissionLogs
  };
};
