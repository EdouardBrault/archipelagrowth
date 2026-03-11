
import { useState, useEffect } from 'react';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export const useRecaptcha = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const SITE_KEY = '6LeDNG8rAAAAAFFn5LhrVK1GHd6Vsz9YQkUFzzR7';

  useEffect(() => {
    // Charger le script reCAPTCHA si ce n'est pas déjà fait
    if (!document.querySelector('script[src*="recaptcha"]')) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    // Vérifier si reCAPTCHA est prêt
    const checkRecaptcha = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          setIsLoaded(true);
        });
      } else {
        setTimeout(checkRecaptcha, 100);
      }
    };

    checkRecaptcha();
  }, []);

  const executeRecaptcha = async (action: string): Promise<string | null> => {
    if (!isLoaded || !window.grecaptcha) {
      console.warn('reCAPTCHA not loaded');
      return null;
    }

    try {
      const token = await window.grecaptcha.execute(SITE_KEY, { action });
      return token;
    } catch (error) {
      console.error('Error executing reCAPTCHA:', error);
      return null;
    }
  };

  return { isLoaded, executeRecaptcha };
};
