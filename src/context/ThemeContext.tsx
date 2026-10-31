import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeColor } from '../types';

interface ThemeStyles {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  badgeBg: string;
  badgeText: string;
  accentBorder: string;
  heroGradient: string;
  cardBorder: string;
  headerBg: string;
  name: string;
  hindiName: string;
  icon: string;
}

export const THEME_CONFIGS: Record<ThemeColor, ThemeStyles> = {
  saffron: {
    primary: 'bg-amber-600 hover:bg-amber-700 text-white',
    primaryHover: 'hover:bg-amber-700',
    primaryLight: 'bg-amber-50 text-amber-900 border-amber-200',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
    badgeText: 'text-amber-800',
    accentBorder: 'border-amber-500',
    heroGradient: 'from-amber-700 via-orange-600 to-amber-900',
    cardBorder: 'hover:border-amber-400',
    headerBg: 'bg-amber-950/90 text-amber-50',
    name: 'Vedic Saffron',
    hindiName: 'वैदिक केसरी',
    icon: '🕉️',
  },
  crimson: {
    primary: 'bg-rose-700 hover:bg-rose-800 text-white',
    primaryHover: 'hover:bg-rose-800',
    primaryLight: 'bg-rose-50 text-rose-900 border-rose-200',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
    badgeText: 'text-rose-800',
    accentBorder: 'border-rose-600',
    heroGradient: 'from-rose-900 via-red-800 to-amber-900',
    cardBorder: 'hover:border-rose-400',
    headerBg: 'bg-rose-950/90 text-rose-50',
    name: 'Temple Crimson',
    hindiName: 'मंदिर सिंदूर',
    icon: '🛕',
  },
  sandalwood: {
    primary: 'bg-yellow-700 hover:bg-yellow-800 text-white',
    primaryHover: 'hover:bg-yellow-800',
    primaryLight: 'bg-amber-50/70 text-yellow-900 border-yellow-200',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    badgeText: 'text-emerald-800',
    accentBorder: 'border-yellow-600',
    heroGradient: 'from-stone-900 via-yellow-900 to-emerald-950',
    cardBorder: 'hover:border-yellow-500',
    headerBg: 'bg-stone-950/90 text-amber-50',
    name: 'Kashi Sandalwood',
    hindiName: 'काशी चन्दन',
    icon: '🌿',
  },
  shiva: {
    primary: 'bg-indigo-700 hover:bg-indigo-800 text-white',
    primaryHover: 'hover:bg-indigo-800',
    primaryLight: 'bg-indigo-50 text-indigo-900 border-indigo-200',
    badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    badgeText: 'text-indigo-800',
    accentBorder: 'border-indigo-500',
    heroGradient: 'from-slate-950 via-indigo-950 to-slate-900',
    cardBorder: 'hover:border-indigo-400',
    headerBg: 'bg-slate-950/90 text-indigo-50',
    name: 'Shiva Nilam',
    hindiName: 'शिव नीलकंठ',
    icon: '🔱',
  },
  midnight: {
    primary: 'bg-orange-600 hover:bg-orange-700 text-white',
    primaryHover: 'hover:bg-orange-700',
    primaryLight: 'bg-zinc-800 text-amber-200 border-zinc-700',
    badgeBg: 'bg-zinc-800 text-amber-300 border-zinc-700',
    badgeText: 'text-amber-400',
    accentBorder: 'border-orange-500',
    heroGradient: 'from-black via-zinc-900 to-stone-900',
    cardBorder: 'hover:border-orange-500',
    headerBg: 'bg-black/95 text-stone-100',
    name: 'Midnight Mandir',
    hindiName: 'दिव्य रात्रि',
    icon: '🌙',
  },
};

interface ThemeContextType {
  theme: ThemeColor;
  setTheme: (t: ThemeColor) => void;
  config: ThemeStyles;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeColor>(() => {
    return (localStorage.getItem('panditji_theme') as ThemeColor) || 'saffron';
  });

  useEffect(() => {
    localStorage.setItem('panditji_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const config = THEME_CONFIGS[theme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, config }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
