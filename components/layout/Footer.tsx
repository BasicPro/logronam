"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import { MapPin, Mail, Phone, Instagram } from "lucide-react";

export const Footer: React.FC = () => {
  const { t } = useTranslation("common");
  const params = useParams();
  const currentLocale = params.locale as string;
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Show loading state during hydration
  if (!isHydrated) {
    return (
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-red-400 mb-4">Logroñam</h3>
              <p className="text-gray-300 mb-4 max-w-md">
                Discover the best pintxos and bars in Logroño
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div></li>
                <li><div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div></li>
                <li><div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-red-400" />
                  <span className="text-gray-300">Logroño, La Rioja, Spain</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-red-400" />
                  <span className="text-gray-300">info@logronam.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-red-400" />
                  <span className="text-gray-300">+34 941 123 456</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-300">© 2024 Logroñam. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-red-400 mb-4">
              {t("home.title")}
            </h3>
            <p className="text-gray-300 mb-4 max-w-md">
              {t("home.description")}
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${currentLocale}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("navigation.home")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${currentLocale}/rankings`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("navigation.rankings")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${currentLocale}/pintxos`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("navigation.pintxos")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("bar.contact")}</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-red-400" />
                <span className="text-gray-300">{t("footer.location")}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-red-400" />
                <span className="text-gray-300">{t("footer.email")}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-red-400" />
                <span className="text-gray-300">{t("footer.phone")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};
