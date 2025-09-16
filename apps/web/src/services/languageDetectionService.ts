import i18n from '../i18n';

interface IPLocationData {
  country_code: string;
  country_name: string;
  region: string;
  city: string;
  timezone: string;
}

class LanguageDetectionService {
  private readonly IP_API_URL = 'https://ipapi.co/json/';
  private readonly FALLBACK_LANGUAGE = 'en';
  private readonly JAPAN_CODES = ['JP', 'JPN'];

  /**
   * Detect user's language based on IP location
   * Falls back to browser language detection if IP detection fails
   */
  async detectLanguage(): Promise<string> {
    try {
      // First try IP-based detection
      const detectedLanguage = await this.detectLanguageByIP();
      if (detectedLanguage) {
        return detectedLanguage;
      }
    } catch (error) {
      console.warn('IP-based language detection failed:', error);
    }

    // Fallback to browser language detection
    return this.detectBrowserLanguage();
  }

  /**
   * Detect language based on user's IP location
   */
  private async detectLanguageByIP(): Promise<string | null> {
    try {
      const response = await fetch(this.IP_API_URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        // Add timeout to prevent hanging
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: IPLocationData = await response.json();
      
      // Check if user is from Japan
      if (this.JAPAN_CODES.includes(data.country_code)) {
        return 'ja';
      }

      // Default to English for other countries
      return 'en';
    } catch (error) {
      console.warn('IP detection failed:', error);
      return null;
    }
  }

  /**
   * Detect language based on browser settings
   */
  private detectBrowserLanguage(): string {
    const browserLang = navigator.language || navigator.languages?.[0] || this.FALLBACK_LANGUAGE;
    
    // Check if browser language is Japanese
    if (browserLang.startsWith('ja')) {
      return 'ja';
    }

    // Default to English
    return 'en';
  }

  /**
   * Set language and save to localStorage
   */
  setLanguage(language: string): void {
    i18n.changeLanguage(language);
    localStorage.setItem('i18nextLng', language);
  }

  /**
   * Get current language
   */
  getCurrentLanguage(): string {
    return i18n.language || this.FALLBACK_LANGUAGE;
  }

  /**
   * Check if current language is Japanese
   */
  isJapanese(): boolean {
    return this.getCurrentLanguage() === 'ja';
  }

  /**
   * Check if current language is English
   */
  isEnglish(): boolean {
    return this.getCurrentLanguage() === 'en';
  }

  /**
   * Get available languages
   */
  getAvailableLanguages(): Array<{ code: string; name: string; nativeName: string }> {
    return [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    ];
  }

  /**
   * Initialize language detection on app startup
   */
  async initialize(): Promise<void> {
    try {
      const detectedLanguage = await this.detectLanguage();
      this.setLanguage(detectedLanguage);
      
      console.log(`Language detected and set to: ${detectedLanguage}`);
    } catch (error) {
      console.error('Failed to initialize language detection:', error);
      // Fallback to English
      this.setLanguage(this.FALLBACK_LANGUAGE);
    }
  }
}

export const languageDetectionService = new LanguageDetectionService();
