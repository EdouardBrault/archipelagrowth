
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    posthog: any;
  }
}

export const usePosthog = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const getUtmQueryString = () => {
    if (!isClient) return '';
    
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    
    const utms: string[] = [];
    utmParams.forEach(param => {
      const value = urlParams.get(param);
      if (value) {
        utms.push(`${param}=${encodeURIComponent(value)}`);
      }
    });
    
    return utms.length > 0 ? utms.join('&') : '';
  };

  const getUtmParams = () => {
    if (!isClient) {
      return {
        utm_source: null,
        utm_medium: null,
        utm_campaign: null,
        utm_term: null,
        utm_content: null
      };
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    return {
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
      utm_term: urlParams.get('utm_term'),
      utm_content: urlParams.get('utm_content')
    };
  };

  const getCurrentUrl = () => {
    return isClient ? window.location.href : '';
  };

  const trackFormSubmission = (data: {
    formName: string;
    formId: string;
    fields: Record<string, any>;
    url: string;
    utmParams: Record<string, string | null>;
  }) => {
    if (isClient && window.posthog) {
      window.posthog.capture('form_submission', {
        form_name: data.formName,
        form_id: data.formId,
        ...data.fields,
        page_url: data.url,
        ...data.utmParams,
        timestamp: new Date().toISOString()
      });
    }
  };

  // Remove the empty useEffect since we already have one for setIsClient

  return {
    getUtmQueryString,
    getUtmParams,
    getCurrentUrl,
    trackFormSubmission
  };
};
