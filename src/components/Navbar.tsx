import React, { useState, useEffect, useRef } from 'react'; // Import hooks
import Link from '@/components/Link'; // Use custom Link
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import LanguageSwitchLink from './LanguageSwitchLink'; // Import language switcher
import i18nextConfig from '../../next-i18next.config.js'; // Import config for locales list

const Navbar = ({isNewsEnabled}: {isNewsEnabled: boolean}) => {
  const router = useRouter();
  const { t } = useTranslation('navbar');
  const { t: tCommon } = useTranslation('common');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown

  const currentLocale = router.query.locale || i18nextConfig.i18n.defaultLocale;
  const locales = i18nextConfig.i18n.locales;

  const navLinks = isNewsEnabled ? [
    // Use keys from translation file
    { name: t('home'), href: '/' },
    { name: t('partners'), href: '/partners' },
    { name: t('news'), href: '/news' },
    { name: t('projects'), href: '/projects' },
    { name: t('about'), href: '/about' },
    { name: t('contact'), href: '/contact' },
  ] : [
    // Use keys from translation file
    { name: t('home'), href: '/' },
    { name: t('partners'), href: '/partners' },
    { name: t('projects'), href: '/projects' },
    { name: t('about'), href: '/about' },
    { name: t('contact'), href: '/contact' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className="bg-white text-black shadow-md py-4 px-4 md:px-8 lg:px-16 relative z-20"> {/* Ensure Navbar has higher z-index */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-extrabold font-[Poppins]">
          <Link href="/">CAGANTECH</Link> 
        </div>

        <div className="flex items-center">
            {/* Navigation Links */}
            <ul className="hidden md:flex space-x-6 items-center mr-6">
            {navLinks.map((link) => {
                const isActive = router.pathname.split('/').slice(2).join('/') === link.href.substring(1) || (router.pathname === '/[locale]' && link.href === '/');
                return (
                <li key={link.href}> 
                    <Link href={link.href} className={`text-lg font-[Poppins] transition-colors ${isActive 
                        ? 'font-semibold text-[var(--primary)]' 
                        : 'font-normal text-black hover:text-gray-600'
                    }`}>
                    {link.name}
                    </Link>
                </li>
                );
            })}
            </ul>

            {/* Language Switcher Dropdown */}
            <div className="relative hidden md:block" ref={dropdownRef}> 
                <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                >
                    {/* {(currentLocale as string).toUpperCase()} */}
                    {tCommon(`language.${currentLocale}`, { defaultValue: (currentLocale as string).toUpperCase() })}

                    <svg className="ml-2 -mr-1 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg focus:outline-none py-1">
                        {locales.map((locale) => {
                            if (locale === currentLocale) return null; // Don't show current language
                            return (
                                <LanguageSwitchLink
                                    key={locale}
                                    locale={locale}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                />
                            );
                        })}
                    </div>
                )}
            </div>


        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
           {/* TODO: Integrate Language Switcher into mobile menu if needed */}
           <button className="text-black focus:outline-none">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
           </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 