import { Metadata } from "next";
import { Header } from "../../../components/layout/Header";
import { Footer } from "../../../components/layout/Footer";
import { generateMetadata as generateSEOMetadata } from "../../../lib/seo";
import { Locale } from "../../../types/common";
import i18nServer from "../../../lib/i18n-server";

interface AboutPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;

  return generateSEOMetadata("about", locale);
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  // Initialize i18n server
  if (!i18nServer.isInitialized) {
    await i18nServer.init();
  }
  await i18nServer.changeLanguage(locale);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            {i18nServer.t("about.hero.title")}
          </h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            {i18nServer.t("about.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {i18nServer.t("about.mission.title")}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {i18nServer.t("about.mission.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {i18nServer.t("about.whatWeDo.title")}
                </h3>
                <ul className="space-y-3 text-gray-600">
                  {(
                    i18nServer.t("about.whatWeDo.items", {
                      returnObjects: true,
                    }) as string[]
                  ).map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-3">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {i18nServer.t("about.values.title")}
                </h3>
                <ul className="space-y-3 text-gray-600">
                  {(
                    i18nServer.t("about.values.items", {
                      returnObjects: true,
                    }) as string[]
                  ).map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-3">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {i18nServer.t("about.community.title")}
              </h3>
              <p className="text-gray-600 mb-6">
                {i18nServer.t("about.community.description")}
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href="#"
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  {i18nServer.t("about.community.instagramButton")}
                </a>
                <a
                  href="#"
                  className="border border-red-600 text-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors"
                >
                  {i18nServer.t("about.community.shareButton")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
