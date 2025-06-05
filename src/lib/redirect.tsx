import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import languageDetector from './languageDetector';
import i18nextConfig from '../../next-i18next.config.js';
import LanguageLoading from '@/components/LanguageLoading';

const LANGUAGE_STORAGE_KEY = 'user_language_preference';

export const useRedirect = (to?: string) => {
  const router = useRouter();
  const targetPath = to || router.asPath;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!languageDetector) {
      return;
    }

    // Attempt to get language settings from localStorage first
    let detectedLng = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    
    // If not found in localStorage, detect and save
    if (!detectedLng) {
      detectedLng = languageDetector.detect() || i18nextConfig.i18n.defaultLocale;
      localStorage.setItem(LANGUAGE_STORAGE_KEY, detectedLng);
    }

    // If the current path already includes the correct language prefix, no redirect is needed
    if (targetPath.startsWith('/' + detectedLng)) {
      return;
    }

    // Only set loading when a redirect is needed
    setIsLoading(true);
    
    // @ts-expect-error Type definition issue with next-language-detector
    languageDetector.cache(detectedLng);
    router.replace('/' + detectedLng + targetPath).finally(() => {
      setIsLoading(false);
    });

  }, [router, targetPath]);

  return isLoading;
};

export const Redirect = () => {
  const isLoading = useRedirect();
  
  if (isLoading) {
    return <LanguageLoading />;
  }
  
  return null;
};

Redirect.displayName = 'Redirect';

export const getRedirect = (to?: string) => {
  const RedirectComponent = () => {
    const isLoading = useRedirect(to);
    
    if (isLoading) {
      return <LanguageLoading />;
    }
    
    return null;
  };
  
  RedirectComponent.displayName = `RedirectTo(${to})`;
  return RedirectComponent;
}; 