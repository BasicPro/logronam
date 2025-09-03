'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';
import { Globe } from 'lucide-react';

export const Header: React.FC = () => {
  const { t } = useTranslation('common');
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: t('navigation.home'), href: `/${currentLocale}` },
    { name: t('navigation.rankings'), href: `/${currentLocale}/rankings` },
    { name: t('navigation.pintxos'), href: `/${currentLocale}/pintxos` },
    { name: t('navigation.bars'), href: `/${currentLocale}/bars` },
    { name: t('navigation.about'), href: `/${currentLocale}/about` },
    { name: t('navigation.contact'), href: `/${currentLocale}/contact` },
  ];

  const languages = [
    { code: 'es', name: 'ES' },
    { code: 'en', name: 'EN' },
    { code: 'fr', name: 'FR' },
    { code: 'ca', name: 'CA' },
    { code: 'pt', name: 'PT' },
    { code: 'de', name: 'DE' },
    { code: 'it', name: 'IT' },
  ];

  const changeLanguage = (locale: string) => {
    // Get the current path without the locale
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';
    const newPath = `/${locale}${pathWithoutLocale}`;
    
    // Set cookie for future requests
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
    
    // Navigate to new locale
    window.location.href = newPath;
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${currentLocale}`} className="flex items-center">
              <span className="text-2xl font-bold text-red-600">{t('home.title')}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-gray-500" />
            <select
              value={currentLocale}
              onChange={(e) => changeLanguage(e.target.value)}
              className="border-0 bg-transparent text-sm font-medium text-gray-700 focus:outline-none focus:ring-0"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
