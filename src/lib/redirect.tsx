import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import languageDetector from './languageDetector';
import i18nextConfig from '../../next-i18next.config.js';
import LanguageLoading from '@/components/LanguageLoading';


export const useRedirect = (to?: string) => {
  const router = useRouter();
  const targetPath = to || router.asPath;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!languageDetector) {
      return;
    }

    // If not found in localStorage, detect and save
    const detectedLng = languageDetector.detect() || i18nextConfig.i18n.defaultLocale;

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

//   const RedirectComponent = () => {
//     const isLoading = useRedirect(to);
    
//     if (isLoading) {
//       return <LanguageLoading />;
//     }
    
//     return null;
//   };
  
//   RedirectComponent.displayName = `RedirectTo(${to})`;
//   return RedirectComponent;
// }; 