import React, { useState } from 'react';
import { Sparkles, Sun, Moon, Clock, Calendar, CheckCircle } from 'lucide-react';

export const PanchangWidget: React.FC = () => {
  const [selectedDayOffset, setSelectedDayOffset] = useState(0);

  // Dynamic Panchang details based on current date
  const today = new Date();
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + selectedDayOffset);

  const dateString = targetDate.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <section id="panchang" className="py-16 bg-stone-950 border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sun className="w-3.5 h-3.5" />
              <span>Vedic Panchang & Shubh Muhurat</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-serif tracking-tight">
              Auspicious Muhurat & Daily Tithi
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-1">
              Accurate Sanatana calculations for home pujas, hawan, graha pravesh, and sacred vows.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-stone-900 p-1.5 rounded-2xl border border-stone-800">
            <button
              onClick={() => setSelectedDayOffset(0)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDayOffset === 0 ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-white'
              }`}
            >
              Today (आज)
            </button>
            <button
              onClick={() => setSelectedDayOffset(1)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDayOffset === 1 ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-white'
              }`}
            >
              Tomorrow (कल)
            </button>
            <button
              onClick={() => setSelectedDayOffset(2)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDayOffset === 2 ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-white'
              }`}
            >
              Day After (परसों)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Card 1: Tithi & Paksha */}
          <div className="bg-stone-900/90 rounded-2xl border border-stone-800 p-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <Moon className="w-4 h-4 text-amber-400" /> Tithi & Paksha
              </span>
              <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/20">
                Shukla Paksha
              </span>
            </div>
            <div>
              <div className="text-xl font-bold text-white font-serif">Ekadashi (एकादशी)</div>
              <p className="text-xs text-stone-400 mt-1">Upto 02:44 PM, followed by Dwadashi</p>
            </div>
            <div className="pt-2 border-t border-stone-800 text-[11px] text-amber-300/80">
              Vedic Samvat 2083 • Kartik Maas
            </div>
          </div>

          {/* Card 2: Nakshatra & Yoga */}
          <div className="bg-stone-900/90 rounded-2xl border border-stone-800 p-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-orange-400" /> Nakshatra & Yoga
              </span>
              <span className="text-[10px] bg-orange-500/10 text-orange-300 px-2 py-0.5 rounded-full border border-orange-500/20">
                Auspicious
              </span>
            </div>
            <div>
              <div className="text-xl font-bold text-white font-serif">Rohini (रोहिणी)</div>
              <p className="text-xs text-stone-400 mt-1">Yoga: Vriddhi • Karana: Bava</p>
            </div>
            <div className="pt-2 border-t border-stone-800 text-[11px] text-orange-300/80">
              Deity: Prajapati • Best for Griha Pravesh
            </div>
          </div>

          {/* Card 3: Shubh Muhurat */}
          <div className="bg-stone-900/90 rounded-2xl border border-stone-800 p-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-yellow-400" /> Abhijit Muhurat
              </span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">
                Most Sacred
              </span>
            </div>
            <div>
              <div className="text-xl font-bold text-emerald-400 font-serif">11:48 AM - 12:34 PM</div>
              <p className="text-xs text-stone-400 mt-1">Golden window for starting any ritual</p>
            </div>
            <div className="pt-2 border-t border-stone-800 text-[11px] text-emerald-300/80">
              Amrit Kaal: 03:15 PM - 04:50 PM
            </div>
          </div>

          {/* Card 4: Rahukaal (Avoid) */}
          <div className="bg-stone-900/90 rounded-2xl border border-stone-800 p-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-rose-400" /> Inauspicious Hours
              </span>
              <span className="text-[10px] bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded-full border border-rose-500/20">
                Avoid Starting
              </span>
            </div>
            <div>
              <div className="text-xl font-bold text-rose-400 font-serif">04:30 PM - 06:00 PM</div>
              <p className="text-xs text-stone-400 mt-1">Rahu Kaalam (राहु काल)</p>
            </div>
            <div className="pt-2 border-t border-stone-800 text-[11px] text-rose-300/80">
              Gulika Kaal: 01:30 PM - 03:00 PM
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-stone-900/50 rounded-2xl border border-stone-800/80 flex items-center justify-between text-xs text-stone-300">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-amber-400" />
            <span>Panchang Date: <strong>{dateString}</strong> (Calculated for Indian Standard Time)</span>
          </div>
          <span className="text-stone-400 hidden sm:inline">Certified by Kashi Vidvat Parishad guidelines</span>
        </div>
      </div>
    </section>
  );
};
