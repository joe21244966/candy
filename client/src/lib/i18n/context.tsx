import { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'zh';
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'hero.title': 'Premium Wholesale Candies',
    'hero.subtitle': 'High-Quality Confectionery Products for Global Distribution',
    'contact.button': 'Contact Sales - Get Lowest Price',
    'product.price': 'Price Range',
    'product.moq': 'MOQ',
    'product.shelfLife': 'Shelf Life',
    'product.certifications': 'Certifications',
    'product.getPrice': 'Get Lowest Price',
  },
  zh: {
    'nav.home': '首页',
    'nav.blog': '博客',
    'nav.contact': '联系我们',
    'hero.title': '优质糖果批发',
    'hero.subtitle': '全球供应高品质糖果产品',
    'contact.button': '联系销售 - 获取最低价',
    'product.price': '价格区间',
    'product.moq': '最小起订量',
    'product.shelfLife': '保质期',
    'product.certifications': '认证',
    'product.getPrice': '获取最低价',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // 检测浏览器语言
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('zh')) {
      setLanguage('zh');
    }
  }, []);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
