import { createContext, useContext, useState, useEffect } from 'react';

const light = {
  bg: '#FFFFFF',
  bgAlt: '#F8FAFC',
  bgCard: '#FFFFFF',
  bgCardHover: '#FAFAFA',
  text: '#0A1F44',
  textSub: '#444',
  textMuted: '#888',
  border: '#e8e8e8',
  cardBorder: '#e8e8e8',
  cardShadow: '0 4px 20px rgba(10,31,68,0.08)',
  inputBg: '#FFFFFF',
  inputBorder: '#e0e0e0',
  navBg: 'linear-gradient(90deg,#0A1F44 0%,#163A7A 100%)',
  sectionBadgeBg: '#FFF3E0',
  sectionBadgeColor: '#FF6B00',
  tagBg: '#F8FAFC',
  tagBorder: '#e8e8e8',
  tagText: '#0A1F44',
  tagHoverBg: '#FFF3E0',
};

const dark = {
  bg: '#060D1F',
  bgAlt: '#0A1F44',
  bgCard: 'rgba(255,255,255,0.05)',
  bgCardHover: 'rgba(255,255,255,0.08)',
  text: '#F0F4FF',
  textSub: 'rgba(240,244,255,0.75)',
  textMuted: 'rgba(240,244,255,0.45)',
  border: 'rgba(255,255,255,0.08)',
  cardBorder: 'rgba(255,255,255,0.08)',
  cardShadow: '0 4px 24px rgba(0,0,0,0.4)',
  inputBg: 'rgba(255,255,255,0.07)',
  inputBorder: 'rgba(255,255,255,0.15)',
  navBg: 'linear-gradient(90deg,#020812 0%,#0A1F44 100%)',
  sectionBadgeBg: 'rgba(255,107,0,0.15)',
  sectionBadgeColor: '#FF8C33',
  tagBg: 'rgba(255,255,255,0.06)',
  tagBorder: 'rgba(255,255,255,0.1)',
  tagText: 'rgba(240,244,255,0.8)',
  tagHoverBg: 'rgba(255,107,0,0.15)',
};

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  const t = theme === 'light' ? light : dark;

  useEffect(() => {
    document.body.style.background = t.bg;
    document.body.style.color = t.text;
    document.body.style.transition = 'background 0.3s, color 0.3s';
  }, [t]);

  return (
    <ThemeContext.Provider value={{ theme, t, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}