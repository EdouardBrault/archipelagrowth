
// Google Tag Manager tracking functions

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

export const trackButtonClick = (buttonName: string, section: string, destination: string) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'button_click',
      button_name: buttonName,
      section: section,
      destination: destination,
      timestamp: new Date().toISOString()
    });
  }
};

export const trackNavigation = (fromPage: string, toPage: string, linkText: string) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'navigation_click',
      from_page: fromPage,
      to_page: toPage,
      link_text: linkText,
      timestamp: new Date().toISOString()
    });
  }
};

export const trackFormSubmission = (formName: string, formLocation: string) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'form_submission',
      form_name: formName,
      form_location: formLocation,
      timestamp: new Date().toISOString()
    });
  }
};

// Alias for backward compatibility
export const gtmTrack = (event: string, properties: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event,
      ...properties,
      timestamp: new Date().toISOString()
    });
  }
};

// Track partial lead (URL submission only) for Google Ads conversion
export const trackLeadPartialGeo = (url: string) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'lead_partial_geo',
      analyzed_url: url,
      conversion_type: 'partial_lead',
      timestamp: new Date().toISOString()
    });
    console.log('🎯 GTM Event: lead_partial_geo triggered for URL:', url);
  }
};

// Track complete lead (full form submission) for Google Ads conversion
export const trackLeadCompleteGeo = (data: { url: string; company: string; email: string }) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'lead_complete_geo',
      analyzed_url: data.url,
      company: data.company,
      email_domain: data.email.split('@')[1] || '',
      conversion_type: 'complete_lead',
      timestamp: new Date().toISOString()
    });
    console.log('🎯 GTM Event: lead_complete_geo triggered for company:', data.company);
  }
};

// Alias for backward compatibility
export const trackFormSubmit = (formName: string, formId: string, additionalData?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'form_submit',
      form_name: formName,
      form_id: formId,
      ...additionalData,
      timestamp: new Date().toISOString()
    });
  }
};
