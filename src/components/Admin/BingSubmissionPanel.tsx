
import { useEffect } from 'react';
import BingUrlSubmissionForm from './BingSubmission/BingUrlSubmissionForm';
import BingSubmissionHistory from './BingSubmission/BingSubmissionHistory';
import { useBingSubmissionLogs } from './BingSubmission/useBingSubmissionLogs';

const BingSubmissionPanel = () => {
  const { submissions, loadingLogs, loadSubmissionLogs } = useBingSubmissionLogs();

  useEffect(() => {
    loadSubmissionLogs();
  }, [loadSubmissionLogs]);

  return (
    <div className="space-y-6">
      <BingUrlSubmissionForm onSubmissionComplete={loadSubmissionLogs} />
      <BingSubmissionHistory 
        submissions={submissions} 
        onRefresh={loadSubmissionLogs}
        loadingLogs={loadingLogs}
      />
    </div>
  );
};

export default BingSubmissionPanel;
