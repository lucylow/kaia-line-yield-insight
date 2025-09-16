import { useTranslation as useI18nTranslation } from 'react-i18next';
import { languageDetectionService } from '../services/languageDetectionService';

export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();

  return {
    t,
    i18n,
    currentLanguage: languageDetectionService.getCurrentLanguage(),
    isJapanese: languageDetectionService.isJapanese(),
    isEnglish: languageDetectionService.isEnglish(),
    changeLanguage: languageDetectionService.setLanguage.bind(languageDetectionService),
    availableLanguages: languageDetectionService.getAvailableLanguages(),
  };
};
