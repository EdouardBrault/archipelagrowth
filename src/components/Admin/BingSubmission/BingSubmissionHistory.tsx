
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface SubmissionLog {
  id: string;
  site_url: string;
  urls_submitted: string[];
  submission_date: string;
  status: string;
}

interface BingSubmissionHistoryProps {
  submissions: SubmissionLog[];
  onRefresh: () => void;
  loadingLogs: boolean;
}

const BingSubmissionHistory = ({ submissions, onRefresh, loadingLogs }: BingSubmissionHistoryProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-archipel-cyan" />
            <CardTitle className="text-white">Historique des soumissions</CardTitle>
          </div>
          <Button
            onClick={onRefresh}
            disabled={loadingLogs}
            variant="outline"
            size="sm"
            className="border-gray-600 text-white hover:bg-gray-700"
          >
            {loadingLogs ? 'Chargement...' : 'Actualiser'}
          </Button>
        </div>
        <CardDescription className="text-gray-300">
          Dernières soumissions à l'API Bing Webmaster
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submissions.length === 0 ? (
          <p className="text-gray-400 text-center py-4">
            Aucune soumission trouvée. Effectuez votre première soumission ci-dessus.
          </p>
        ) : (
          <div className="space-y-3">
            {submissions.map((submission) => (
              <div key={submission.id} className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {submission.status === 'success' ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400" />
                    )}
                    <span className="text-white font-medium">
                      {formatDate(submission.submission_date)}
                    </span>
                  </div>
                  <Badge variant={submission.status === 'success' ? 'default' : 'destructive'}>
                    {submission.status === 'success' ? 'Succès' : 'Échec'}
                  </Badge>
                </div>
                <p className="text-gray-300 text-sm">
                  <strong>{submission.urls_submitted.length}</strong> URL(s) soumises
                </p>
                <p className="text-gray-400 text-xs">
                  Site: {submission.site_url}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BingSubmissionHistory;
