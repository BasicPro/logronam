"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import { Instagram } from "lucide-react";
import { Locale } from "../../types/common";

export const Footer: React.FC = () => {
  const { t } = useTranslation("common");
  const params = useParams();
  const currentLocale = params.locale as Locale;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  href={`/${currentLocale}/about`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("navigation.about")}
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
              <li>
                <Link
                  href={`/${currentLocale}/bars`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("navigation.bars")}
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
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};
