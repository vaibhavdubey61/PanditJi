import React, { useState } from 'react';
import { Pandit } from '../types';
import { POPULAR_CITIES, POPULAR_PUJA_TYPES } from '../data/mockData';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  Globe, 
  Phone, 
  MessageSquare, 
  Calendar, 
  Flame, 
  CheckCircle2, 
  Filter, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface PanditListProps {
  pandits: Pandit[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  selectedPujaType: string;
  onSelectPujaType: (puja: string) => void;
  onSelectPandit: (pandit: Pandit) => void;
  onOpenEnroll: () => void;
}

export const PanditList: React.FC<PanditListProps> = ({
  pandits,
  searchQuery,
  onSearchChange,
  selectedCity,
  onSelectCity,
  selectedPujaType,
  onSelectPujaType,
  onSelectPandit,
  onOpenEnroll,
}) => {
  const [filterOnlineOnly, setFilterOnlineOnly] = useState(false);

  // Filter Pandits based on search, city, puja type, and online flag
  const filteredPandits = pandits.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) ||
      p.gotra.toLowerCase().includes(q) ||
      p.specialties.some((s) => s.toLowerCase().includes(q)) ||
      p.languages.some((l) => l.toLowerCase().includes(q));

    const matchesCity =
      selectedCity === 'All India' ||
      (selectedCity === 'Online Virtual' ? p.onlinePuja : p.city.toLowerCase() === selectedCity.toLowerCase());

    const matchesPuja =
      selectedPujaType === 'All Pujas' ||
      p.specialties.some((s) => s.toLowerCase().includes(selectedPujaType.toLowerCase()));

    const matchesOnline = !filterOnlineOnly || p.onlinePuja;

    return matchesSearch && matchesCity && matchesPuja && matchesOnline;
  });

  return (
    <section id="pandits" className="py-16 bg-stone-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Vedic Purohits Directory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-serif tracking-tight">
              Available Pandits for Puja & Sanskars
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-1">
              Select verified Purohits by Vedic Parampara, city, and rituals. Direct connect with zero commission.
            </p>
          </div>

          {/* Quick Stats & Enroll Pandit Action */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-amber-300 font-bold bg-amber-500/10 px-3 py-2 rounded-xl border border-amber-500/20">
              Showing {filteredPandits.length} of {pandits.length} Pandits
            </span>
            <button
              onClick={onOpenEnroll}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-md transition-all flex items-center gap-1.5"
            >
              <span>+ Enroll as Pandit</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-800 backdrop-blur-md mb-8 space-y-4">
          {/* City Filter Pills */}
          <div>
            <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Location / City:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_CITIES.map((city) => (
                <button
                  key={city}
                  onClick={() => onSelectCity(city)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedCity === city
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Puja Type Filter Pills */}
          <div className="pt-2 border-t border-stone-800">
            <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>Puja Specialty:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_PUJA_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => onSelectPujaType(type)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedPujaType === type
                      ? 'bg-orange-500 text-stone-950 font-bold shadow-md shadow-orange-500/20'
                      : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}

              {/* Toggle for Online Virtual Pujas */}
              <button
                onClick={() => setFilterOnlineOnly(!filterOnlineOnly)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
                  filterOnlineOnly
                    ? 'bg-emerald-500 text-stone-950 font-bold'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                <Globe className="w-3 h-3" />
                <span>Virtual E-Puja Only</span>
              </button>
            </div>
          </div>
        </div>

        {/* Pandits Grid */}
        {filteredPandits.length === 0 ? (
          <div className="text-center py-16 bg-stone-900/40 rounded-3xl border border-stone-800 p-8 space-y-4">
            <div className="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto text-3xl">
              🕉️
            </div>
            <h3 className="text-xl font-bold text-white font-serif">No Pandits Found for this Filter</h3>
            <p className="text-stone-400 text-sm max-w-md mx-auto">
              We couldn't find a Pandit matching "{searchQuery || selectedCity}". Try clearing the filters or request a Puja event for your city.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  onSearchChange('');
                  onSelectCity('All India');
                  onSelectPujaType('All Pujas');
                  setFilterOnlineOnly(false);
                }}
                className="px-4 py-2 rounded-xl bg-stone-800 text-stone-200 text-xs font-semibold hover:bg-stone-700"
              >
                Reset All Filters
              </button>
              <button
                onClick={onOpenEnroll}
                className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700"
              >
                Enroll as a Pandit for this City
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPandits.map((pandit) => (
              <div
                key={pandit.id}
                className="group bg-stone-900/90 rounded-3xl border border-stone-800 hover:border-amber-500/50 shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Top Profile Header */}
                <div className="p-5 sm:p-6 pb-4">
                  <div className="flex items-start gap-4">
                    {/* Pandit Avatar / Photo */}
                    <div className="relative shrink-0">
                      <img
                        src={pandit.photo}
                        alt={pandit.name}
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-500/40 shadow-md group-hover:scale-105 transition-transform"
                      />
                      {pandit.isVerified && (
                        <div 
                          className="absolute -bottom-1 -right-1 bg-amber-500 text-stone-950 p-1 rounded-full shadow-md"
                          title="Verified Vedic Scholar & ID Checked"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                          {pandit.title}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-amber-300 font-bold ml-auto">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{pandit.rating}</span>
                          <span className="text-stone-400 font-normal">({pandit.totalPujas})</span>
                        </div>
                      </div>

                      <h3 
                        onClick={() => onSelectPandit(pandit)}
                        className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors font-serif cursor-pointer truncate mt-1"
                      >
                        {pandit.name}
                      </h3>

                      <p className="text-xs text-stone-400 truncate mt-0.5">
                        {pandit.gotra}
                      </p>

                      <div className="flex items-center gap-1.5 text-xs text-stone-300 mt-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{pandit.city}, {pandit.state}</span>
                      </div>
                    </div>
                  </div>

                  {/* Gurukul & Experience */}
                  <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-300">
                    <div>
                      <span className="text-stone-400">Experience: </span>
                      <strong className="text-amber-300">{pandit.experienceYears} Years</strong>
                    </div>
                    {pandit.onlinePuja && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <Globe className="w-3 h-3" /> E-Puja Available
                      </span>
                    )}
                  </div>

                  {/* Languages Spoken */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {pandit.languages.map((lang) => (
                      <span key={lang} className="text-[10px] bg-stone-800 text-stone-300 px-2 py-0.5 rounded-md">
                        {lang}
                      </span>
                    ))}
                  </div>

                  {/* Specialties Pills */}
                  <div className="mt-3">
                    <div className="text-[11px] text-stone-400 font-medium mb-1">Ritual Specialties:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {pandit.specialties.slice(0, 3).map((spec) => (
                        <span
                          key={spec}
                          className="text-[11px] bg-amber-500/15 text-amber-300 border border-amber-500/25 px-2 py-0.5 rounded-lg font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                      {pandit.specialties.length > 3 && (
                        <span className="text-[11px] text-stone-400 self-center">
                          +{pandit.specialties.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer with Starting Dakshina & Actions */}
                <div className="p-4 sm:p-5 bg-stone-950/80 border-t border-stone-800 rounded-b-3xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-[11px] text-stone-400 block">Starting Dakshina</span>
                      <span className="text-lg font-black text-amber-400">
                        ₹{pandit.startingDakshina.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {pandit.bringsSamagri ? (
                      <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Brings Samagri
                      </span>
                    ) : (
                      <span className="text-[11px] text-stone-400">Samagri on request</span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectPandit(pandit)}
                      className="py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-100 font-bold text-xs transition-all flex items-center justify-center gap-1.5 border border-stone-700"
                    >
                      <span>View Bio & Pujas</span>
                    </button>

                    <a
                      href={`https://wa.me/${pandit.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Pranam Pandit Ji, I found your profile on Online PanditJi portal. I would like to inquire about booking an auspicious Puja with you.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
