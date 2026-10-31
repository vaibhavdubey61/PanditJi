import React, { useState } from 'react';
import { PUJA_THEMES } from '../data/mockData';
import { PujaTheme, ThemeColor } from '../types';
import { useTheme, THEME_CONFIGS } from '../context/ThemeContext';
import { 
  Sparkles, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  Layers,
  Palette
} from 'lucide-react';

interface ThemeGalleryProps {
  onSelectThemeFilter: (themeTitle: string) => void;
  onOpenCreateRequestWithTheme: (theme: PujaTheme) => void;
}

export const ThemeGallery: React.FC<ThemeGalleryProps> = ({
  onSelectThemeFilter,
  onOpenCreateRequestWithTheme,
}) => {
  const { theme, setTheme } = useTheme();
  const [selectedThemeModal, setSelectedThemeModal] = useState<PujaTheme | null>(null);

  return (
    <section id="themes" className="py-16 bg-stone-900/60 border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sacred Puja Themes & Auspicious Rituals</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-serif tracking-tight">
              Explore Puja Themes & Vedic Sanskars
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-1 max-w-2xl">
              Authentic traditional ceremonies performed according to Rigveda, Yajurveda and Shastras. Choose a theme to view verified Pandits or request an event.
            </p>
          </div>

          {/* Portal Visual Theme Switcher Bar */}
          <div className="bg-stone-950/80 p-2 rounded-2xl border border-stone-800 flex items-center gap-1.5 shrink-0 self-start md:self-end">
            <div className="flex items-center gap-1 px-2 text-xs font-semibold text-stone-400">
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>Portal Themes:</span>
            </div>
            {(Object.keys(THEME_CONFIGS) as ThemeColor[]).map((tKey) => {
              const item = THEME_CONFIGS[tKey];
              const isCurrent = theme === tKey;
              return (
                <button
                  key={tKey}
                  onClick={() => setTheme(tKey)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                    isCurrent
                      ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20 scale-105'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800'
                  }`}
                  title={item.hindiName}
                >
                  <span>{item.icon}</span>
                  <span className="hidden sm:inline">{item.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Puja Themes Grid with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PUJA_THEMES.map((item) => (
            <div
              key={item.id}
              className="group bg-stone-950/90 rounded-2xl border border-stone-800 overflow-hidden hover:border-amber-500/50 shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
            >
              {/* Image with Tag & Gradient Overlay */}
              <div className="relative h-48 overflow-hidden bg-stone-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                
                {/* Devanagari Hindi Badge */}
                <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-500/40 text-[11px] font-bold text-amber-300">
                  {item.titleHindi}
                </div>

                {/* Starting Dakshina Tag */}
                <div className="absolute bottom-3 right-3 bg-amber-500 text-stone-950 font-black text-xs px-2.5 py-1 rounded-lg shadow-lg">
                  Dakshina from ₹{item.startingDakshina.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors font-serif">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.tagline}
                  </p>

                  {/* Highlights */}
                  <div className="mt-3.5 space-y-2 text-xs text-stone-300">
                    <div className="flex items-center gap-1.5 text-stone-300">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Duration: <strong>{item.duration}</strong></span>
                    </div>
                    <div className="flex items-start gap-1.5 text-stone-300">
                      <Calendar className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1 text-[11px]">Best Tithi: {item.bestTithi}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-3.5 border-t border-stone-800 space-y-2">
                  <button
                    onClick={() => onOpenCreateRequestWithTheme(item)}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-stone-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Request This Puja Event</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => onSelectThemeFilter(item.title.split(' ')[0])}
                      className="py-1.5 px-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-300 border border-stone-800 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
                      title="Filter Pandits who specialize in this Puja"
                    >
                      <Search className="w-3 h-3 text-amber-400" />
                      <span>Find Pandits</span>
                    </button>

                    <button
                      onClick={() => setSelectedThemeModal(item)}
                      className="py-1.5 px-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
                    >
                      <Layers className="w-3 h-3 text-stone-400" />
                      <span>Vedic Vidhi</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Theme & Vidhi Modal */}
        {selectedThemeModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-stone-950 border border-amber-900/60 rounded-3xl max-w-2xl w-full p-6 text-stone-100 shadow-2xl relative my-8">
              <button
                onClick={() => setSelectedThemeModal(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-white p-2 rounded-full hover:bg-stone-800"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🪔</span>
                <div>
                  <h3 className="text-2xl font-bold font-serif text-amber-400">
                    {selectedThemeModal.title}
                  </h3>
                  <p className="text-xs text-amber-200/80 font-medium">
                    {selectedThemeModal.titleHindi} • Traditional Vedic Anushthan
                  </p>
                </div>
              </div>

              <div className="h-52 w-full rounded-2xl overflow-hidden mb-4 border border-stone-800">
                <img
                  src={selectedThemeModal.image}
                  alt={selectedThemeModal.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-sm text-stone-300">
                <p className="leading-relaxed">{selectedThemeModal.description}</p>

                <div className="grid grid-cols-2 gap-3 bg-stone-900 p-3.5 rounded-2xl border border-stone-800 text-xs">
                  <div>
                    <span className="text-stone-400 block">Typical Duration</span>
                    <strong className="text-amber-300 text-sm">{selectedThemeModal.duration}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Suggested Dakshina</span>
                    <strong className="text-emerald-400 text-sm">
                      ₹{selectedThemeModal.startingDakshina.toLocaleString('en-IN')} onwards
                    </strong>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Key Vedic Benefits & Phala (फलश्रुति)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedThemeModal.keyBenefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs bg-stone-900/60 p-2.5 rounded-xl border border-stone-800/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">
                    Essential Samagri Required
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedThemeModal.recommendedSamagri.map((item, idx) => (
                      <span key={idx} className="text-[11px] bg-amber-500/10 text-amber-300 px-2.5 py-1 rounded-lg border border-amber-500/20">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-800 flex gap-3">
                  <button
                    onClick={() => {
                      const themeToBook = selectedThemeModal;
                      setSelectedThemeModal(null);
                      onOpenCreateRequestWithTheme(themeToBook);
                    }}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-bold text-sm shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all text-center"
                  >
                    Request This Puja Event Now
                  </button>
                  <button
                    onClick={() => {
                      const title = selectedThemeModal.title.split(' ')[0];
                      setSelectedThemeModal(null);
                      onSelectThemeFilter(title);
                    }}
                    className="py-3 px-4 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 hover:text-white font-bold text-sm transition-all"
                  >
                    View Pandits
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
