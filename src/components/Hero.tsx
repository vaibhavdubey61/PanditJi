import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Sparkles, 
  Search, 
  ShieldCheck, 
  Award, 
  Users, 
  Calendar,
  Flame,
  ArrowRight
} from 'lucide-react';

interface HeroProps {
  onSearchChange: (q: string) => void;
  searchQuery: string;
  onOpenEnrollPandit: () => void;
  onOpenCreateRequest: () => void;
  totalPanditsCount: number;
  totalRequestsCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  onSearchChange,
  searchQuery,
  onOpenEnrollPandit,
  onOpenCreateRequest,
  totalPanditsCount,
  totalRequestsCount,
}) => {
  const { config } = useTheme();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-white pt-10 pb-16 border-b border-amber-900/30">
      {/* Decorative Traditional Mandala / Floral Background Patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Sacred Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-72 h-72 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Sacred auspicious pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold backdrop-blur-sm shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>॥ ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif text-stone-100">
            Divine Blessings at Your Doorstep with <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent underline decoration-amber-500/40 decoration-wavy">
              Online PanditJi
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
            The authentic Vedic ecosystem to connect with verified Purohits, book customized home & temple Pujas, or enroll as a Shastri / Pandit Ji.
          </p>

          {/* Interactive Search Bar in Hero */}
          <div className="max-w-2xl mx-auto mt-6 bg-stone-900/90 p-2 sm:p-2.5 rounded-2xl border border-amber-500/40 shadow-2xl flex flex-col sm:flex-row items-center gap-2 backdrop-blur-md">
            <div className="flex items-center gap-2 px-3 w-full text-stone-400">
              <Search className="w-5 h-5 text-amber-400 shrink-0" />
              <input
                type="text"
                placeholder="Search by Pandit name, Puja type (e.g. Griha Pravesh), or City..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base text-stone-100 placeholder-stone-400 focus:outline-none"
              />
            </div>
            <button
              onClick={() => {
                const el = document.getElementById('pandits');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-stone-950 font-bold text-sm shadow-lg hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <span>Find Pandits</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Primary Action Buttons for Both Devotees and Pandits */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenCreateRequest}
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-xl shadow-orange-950/40 flex items-center gap-2 hover:scale-105 transition-all"
            >
              <Flame className="w-5 h-5 text-amber-300" />
              <span>Request a Puja Event (भक्त अनुरोध)</span>
            </button>

            <button
              onClick={onOpenEnrollPandit}
              className="px-6 py-3.5 rounded-xl font-bold text-sm border-2 border-amber-500/70 bg-stone-900/80 text-amber-300 hover:bg-amber-500/10 hover:border-amber-400 shadow-xl flex items-center gap-2 hover:scale-105 transition-all"
            >
              <Users className="w-5 h-5 text-amber-400" />
              <span>Enroll as Pandit Ji (पंडित पंजीकरण)</span>
            </button>
          </div>

          {/* Auspicious Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-10 text-stone-300">
            <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-stone-800 backdrop-blur-sm flex flex-col items-center text-center">
              <ShieldCheck className="w-6 h-6 text-amber-400 mb-1" />
              <div className="font-extrabold text-white text-lg sm:text-xl font-serif">{totalPanditsCount}+ Available</div>
              <div className="text-xs text-stone-400">Verified Vedic Pandits</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-stone-800 backdrop-blur-sm flex flex-col items-center text-center">
              <Calendar className="w-6 h-6 text-orange-400 mb-1" />
              <div className="font-extrabold text-white text-lg sm:text-xl font-serif">{totalRequestsCount}+ Active</div>
              <div className="text-xs text-stone-400">Devotee Puja Requests</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-stone-800 backdrop-blur-sm flex flex-col items-center text-center">
              <Award className="w-6 h-6 text-yellow-400 mb-1" />
              <div className="font-extrabold text-white text-lg sm:text-xl font-serif">40+ Vedic Rituals</div>
              <div className="text-xs text-stone-400">With Pure Samagri Vidhi</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-stone-800 backdrop-blur-sm flex flex-col items-center text-center">
              <Sparkles className="w-6 h-6 text-emerald-400 mb-1" />
              <div className="font-extrabold text-white text-lg sm:text-xl font-serif">4.95 ★ Rating</div>
              <div className="text-xs text-stone-400">From Satisfied Devotees</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
