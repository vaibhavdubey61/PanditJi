import React, { useState } from 'react';
import { useTheme, THEME_CONFIGS } from '../context/ThemeContext';
import { ThemeColor } from '../types';
import { sacredAudio } from '../utils/audio';
import { 
  Flame, 
  Volume2, 
  VolumeX, 
  UserPlus, 
  CalendarPlus, 
  Menu, 
  X, 
  Sparkles,
  PhoneCall,
  Search,
  BookOpen
} from 'lucide-react';

interface NavbarProps {
  onOpenEnrollPandit: () => void;
  onOpenCreateRequest: () => void;
  onOpenSamagriGuide: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEnrollPandit,
  onOpenCreateRequest,
  onOpenSamagriGuide,
  activeSection,
  setActiveSection,
}) => {
  const { theme, setTheme, config } = useTheme();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleChant = () => {
    const active = sacredAudio.toggle();
    setIsPlayingAudio(active);
  };

  const navLinks = [
    { id: 'pandits', label: 'Pandits Directory', labelHi: 'पंडित सूची', icon: Search },
    { id: 'requests', label: 'Puja Requests Board', labelHi: 'पूजा अनुरोध', icon: CalendarPlus },
    { id: 'themes', label: 'Puja Themes & Gallery', labelHi: 'थीम व अनुष्ठान', icon: Flame },
    { id: 'panchang', label: 'Shubh Muhurat', labelHi: 'पंचांग', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-stone-900/90 text-stone-100 border-b border-amber-900/40 shadow-xl transition-all">
      {/* Top Auspicious Bar */}
      <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-800 text-amber-50 text-xs py-1.5 px-4 font-medium flex justify-between items-center shadow-inner">
        <div className="flex items-center space-x-2 truncate">
          <span className="inline-block animate-pulse">🕉️</span>
          <span>॥ यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः तत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम ॥</span>
          <span className="hidden md:inline text-amber-200">| 100% Shastra-Sammat Certified Purohits</span>
        </div>
        <div className="flex items-center space-x-4 shrink-0 text-amber-100">
          <a href="tel:+919876543210" className="hover:text-white flex items-center gap-1 transition-colors">
            <PhoneCall className="w-3 h-3 text-amber-300" />
            <span className="hidden sm:inline">24x7 Purohit Helpline:</span> +91 98765 43210
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveSection('pandits')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-400 p-0.5 shadow-lg shadow-amber-600/30 group-hover:scale-105 transition-transform flex items-center justify-center">
            <div className="w-full h-full bg-stone-950 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <span className="text-2xl select-none group-hover:animate-bounce">🛕</span>
              <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-serif">
                Online <span className="text-amber-400">PanditJi</span>
              </span>
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-amber-500/30">
                Live
              </span>
            </div>
            <p className="text-[11px] text-amber-200/70 font-medium">
              शुभम् करोति कल्याणम् • Vedic Purohit Portal
            </p>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-600/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Samagri Guide Button */}
          <button
            onClick={onOpenSamagriGuide}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-stone-300 hover:text-white hover:bg-stone-800/60 transition-all"
            title="Interactive Puja Samagri Checklist"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Samagri List</span>
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center space-x-3">
          {/* Audio Chanting Drone Toggle */}
          <button
            onClick={toggleChant}
            className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-semibold ${
              isPlayingAudio
                ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-500/20 animate-pulse'
                : 'bg-stone-800/80 border-stone-700 text-stone-400 hover:text-white hover:border-stone-600'
            }`}
            title={isPlayingAudio ? 'Mute Divine Om Chanting' : 'Listen to Divine Om Chanting'}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span className="hidden xl:inline">Om Chanting ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="hidden xl:inline">Play Om Sound</span>
              </>
            )}
          </button>

          {/* Theme Selector */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="p-2.5 rounded-xl border border-stone-700 bg-stone-800/80 text-stone-300 hover:text-white hover:border-amber-500/50 transition-all flex items-center gap-1.5 text-xs font-medium"
              title="Change Devotional Color Theme"
            >
              <span>{config.icon}</span>
              <span className="hidden md:inline">{config.name}</span>
            </button>

            {showThemeMenu && (
              <div 
                className="absolute right-0 mt-2 w-56 rounded-2xl bg-stone-900 border border-amber-900/60 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onClick={() => setShowThemeMenu(false)}
              >
                <div className="px-3 py-1.5 text-xs font-bold text-stone-400 uppercase tracking-wider border-b border-stone-800">
                  Select Theme / रंग रूप
                </div>
                {(Object.keys(THEME_CONFIGS) as ThemeColor[]).map((tKey) => {
                  const item = THEME_CONFIGS[tKey];
                  const isCurrent = theme === tKey;
                  return (
                    <button
                      key={tKey}
                      onClick={() => setTheme(tKey)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors my-1 ${
                        isCurrent
                          ? 'bg-amber-600/30 text-amber-300 font-bold border border-amber-500/30'
                          : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.icon}</span>
                        <div>
                          <div className="leading-tight">{item.name}</div>
                          <div className="text-[10px] text-stone-400">{item.hindiName}</div>
                        </div>
                      </div>
                      {isCurrent && <span className="w-2 h-2 rounded-full bg-amber-400"></span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Post Puja Request CTA (Devotees) */}
          <button
            onClick={onOpenCreateRequest}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-stone-950 shadow-md shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>Request Puja</span>
          </button>

          {/* Enroll as Pandit CTA */}
          <button
            onClick={onOpenEnrollPandit}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold border border-amber-500/60 bg-stone-900 text-amber-400 hover:bg-amber-600/20 hover:text-amber-200 transition-all shadow-md"
          >
            <UserPlus className="w-4 h-4 text-amber-400" />
            <span>Enroll as Pandit</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenCreateRequest}
            className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-stone-950"
          >
            Request
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-stone-800 text-stone-200"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-stone-800 bg-stone-900/98 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`p-3 rounded-xl text-left text-xs font-semibold ${
                  activeSection === item.id ? 'bg-amber-600/20 text-amber-300' : 'bg-stone-800/60 text-stone-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnrollPandit();
              }}
              className="w-full py-2.5 rounded-xl text-center text-sm font-bold bg-amber-600 text-white flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Enroll as Pandit (पंडित पंजीकरण)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCreateRequest();
              }}
              className="w-full py-2.5 rounded-xl text-center text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 flex items-center justify-center gap-2"
            >
              <CalendarPlus className="w-4 h-4" />
              Request Puja Event (पूजा अनुरोध)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSamagriGuide();
              }}
              className="w-full py-2 rounded-xl text-center text-xs font-semibold bg-stone-800 text-stone-300 flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              View Puja Samagri Checklist
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
