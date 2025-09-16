import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSwitcher from '../components/LanguageSwitcher';

const I18nTest: React.FC = () => {
  const { t, currentLanguage, isJapanese, isEnglish } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {t('landing.title')} - i18n Test
              </h1>
              <LanguageSwitcher />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Language Status */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-blue-900">
                  Language Status
                </h2>
                <div className="space-y-2">
                  <p><strong>Current Language:</strong> {currentLanguage}</p>
                  <p><strong>Is Japanese:</strong> {isJapanese ? 'Yes' : 'No'}</p>
                  <p><strong>Is English:</strong> {isEnglish ? 'Yes' : 'No'}</p>
                </div>
              </div>

              {/* Navigation Test */}
              <div className="bg-green-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-green-900">
                  Navigation Test
                </h2>
                <div className="space-y-2">
                  <p><strong>{t('navigation.home')}:</strong> {t('navigation.home')}</p>
                  <p><strong>{t('navigation.dashboard')}:</strong> {t('navigation.dashboard')}</p>
                  <p><strong>{t('navigation.yield')}:</strong> {t('navigation.yield')}</p>
                  <p><strong>{t('navigation.nft')}:</strong> {t('navigation.nft')}</p>
                </div>
              </div>

              {/* Wallet Test */}
              <div className="bg-purple-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-purple-900">
                  Wallet Test
                </h2>
                <div className="space-y-2">
                  <p><strong>{t('wallet.connect')}:</strong> {t('wallet.connect')}</p>
                  <p><strong>{t('wallet.disconnect')}:</strong> {t('wallet.disconnect')}</p>
                  <p><strong>{t('wallet.metamask')}:</strong> {t('wallet.metamask')}</p>
                  <p><strong>{t('wallet.kaikas')}:</strong> {t('wallet.kaikas')}</p>
                </div>
              </div>

              {/* Landing Page Test */}
              <div className="bg-orange-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-orange-900">
                  Landing Page Test
                </h2>
                <div className="space-y-2">
                  <p><strong>Title:</strong> {t('landing.title')}</p>
                  <p><strong>Subtitle:</strong> {t('landing.subtitle')}</p>
                  <p><strong>Get Started:</strong> {t('landing.getStarted')}</p>
                  <p><strong>Learn More:</strong> {t('landing.learnMore')}</p>
                </div>
              </div>
            </div>

            {/* Long Text Test */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                Description Test
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('landing.description')}
              </p>
            </div>

            {/* Features Test */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                {t('landing.features.title')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">
                    {t('landing.features.yieldOptimization.title')}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t('landing.features.yieldOptimization.description')}
                  </p>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">
                    {t('landing.features.nftMarketplace.title')}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t('landing.features.nftMarketplace.description')}
                  </p>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">
                    {t('landing.features.realTimeAnalytics.title')}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t('landing.features.realTimeAnalytics.description')}
                  </p>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">
                    {t('landing.features.secureWallet.title')}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t('landing.features.secureWallet.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default I18nTest;
