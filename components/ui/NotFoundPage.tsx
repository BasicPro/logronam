import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';

interface NotFoundPageProps {
  title: string;
  description: string;
  backButtonText: string;
  backButtonHref: string;
  className?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  title,
  description,
  backButtonText,
  backButtonHref,
  className = ''
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col ${className}`}>
      <Header />
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-600 mb-8">{description}</p>
          <Link href={backButtonHref}>
            <Button>{backButtonText}</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};
