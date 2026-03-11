import { useLocation } from 'react-router-dom';
import { usePosthog } from '@/hooks/usePosthog';
import { useEffect, useState } from 'react';

export const useUtmTracking = () => {
  const location = useLocation();
  const { getUtmQueryString, getUtmParams } = usePosthog();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      captureAndStoreUtms();
    }
  }, [location.search, location.hash, isClient]);

  // Extract UTM params from search, hash, or full URL
  const getSearchParams = () => {
    if (typeof window === 'undefined') return new URLSearchParams();

    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

    // Try location.search first
    let params = new URLSearchParams(location.search);
    if (utmKeys.some(k => params.get(k))) return params;

    // Fallback: parse UTMs from hash (e.g. #contact-form?utm_source=google&...)
    const hash = location.hash || window.location.hash;
    const hashQueryIndex = hash.indexOf('?');
    if (hashQueryIndex !== -1) {
      params = new URLSearchParams(hash.substring(hashQueryIndex));
      if (utmKeys.some(k => params.get(k))) return params;
    }

    // Last resort: parse from full URL
    const fullUrl = window.location.href;
    const urlQueryIndex = fullUrl.indexOf('?');
    if (urlQueryIndex !== -1) {
      params = new URLSearchParams(fullUrl.substring(urlQueryIndex));
      if (utmKeys.some(k => params.get(k))) return params;
    }

    return new URLSearchParams();
  };

  const captureAndStoreUtms = () => {
    if (typeof window === 'undefined') return;

    const currentParams = getSearchParams();
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    const hasCurrentUtms = utmParams.some(param => currentParams.get(param));

    if (hasCurrentUtms) {
      const utmData: Record<string, string | null> = {};
      utmParams.forEach(param => {
        const value = currentParams.get(param);
        utmData[param] = value;
        if (value) {
          localStorage.setItem(param, value);
        }
      });
      localStorage.setItem('utm_captured_at', new Date().toISOString());
      console.log('🔗 UTMs captured and stored:', utmData);
    }
  };

  const getPersistedUtmParams = () => {
    const currentParams = getSearchParams();
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    const utms: Record<string, string | null> = {};

    utmParams.forEach(param => {
      const currentValue = currentParams.get(param);
      if (currentValue) {
        utms[param] = currentValue;
      } else if (typeof window !== 'undefined') {
        utms[param] = localStorage.getItem(param);
      } else {
        utms[param] = null;
      }
    });

    return utms;
  };

  const getUtmString = () => {
    if (!isClient) return '';

    const currentParams = getSearchParams();
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    const utms: string[] = [];

    utmParams.forEach(param => {
      let value = currentParams.get(param);
      if (!value) value = localStorage.getItem(param);
      if (value) utms.push(`${param}=${encodeURIComponent(value)}`);
    });

    return utms.join('&');
  };

  const clearStoredUtms = () => {
    if (typeof window === 'undefined') return;
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    utmParams.forEach(param => localStorage.removeItem(param));
    localStorage.removeItem('utm_captured_at');
  };

  return {
    getUtmString,
    getUtmParams: getPersistedUtmParams,
    clearStoredUtms,
    captureAndStoreUtms
  };
};
