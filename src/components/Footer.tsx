import React from 'react';
import { Sparkles, Phone, Mail, MapPin, Heart, ShieldCheck, Flame } from 'lucide-react';

interface FooterProps {
  onOpenEnroll: () => void;
  onOpenCreateRequest: () => void;
  onOpenSamagriGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenEnroll,
  onOpenCreateRequest,
  onOpenSamagriGuide,
}) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-amber-900/40 pt-16 pb-12 relative overflow-hidden">
      {/* Background mandala subtle pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Shloka Banner */}
        <div className="text-center pb-12 border-b border-stone-800 max-w-3xl mx-auto">
          <span className="text-3xl select-none mb-3 inline-block">🪔</span>
          <p className="text-amber-300/90 font-serif text-lg sm:text-xl font-medium tracking-wide">
            ॥ ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय । ॐ शान्तिः शान्तिः शान्तिः ॥
          </p>
          <p className="text-stone-400 text-xs mt-2">
            "Lead us from falsehood to truth, from darkness to light, from mortality to immortality."
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-b border-stone-800">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛕</span>
              <span className="text-xl font-black text-white font-serif tracking-tight">
                Online <span className="text-amber-400">PanditJi</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              India's authentic digital portal connecting Sanatana devotees with verified Vedic Purohits, Acharyas, and Shastris for traditional home & temple rituals.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold bg-stone-900 p-2.5 rounded-xl border border-stone-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Verified Vedic Credentials & Shastra Vidhi</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>For Devotees</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <a href="#pandits" className="hover:text-amber-400 transition-colors">
                  Find Available Pandits (पंडित खोजें)
                </a>
              </li>
              <li>
                <button onClick={onOpenCreateRequest} className="hover:text-amber-400 transition-colors text-left">
                  Request a Puja Event (पूजा अनुरोध)
                </button>
              </li>
              <li>
                <a href="#themes" className="hover:text-amber-400 transition-colors">
                  Puja Themes & Ritual Gallery
                </a>
              </li>
              <li>
                <a href="#panchang" className="hover:text-amber-400 transition-colors">
                  Daily Panchang & Shubh Muhurat
                </a>
              </li>
              <li>
                <button onClick={onOpenSamagriGuide} className="hover:text-amber-400 transition-colors text-left">
                  Interactive Samagri Checklist
                </button>
              </li>
            </ul>
          </div>

          {/* For Pandits */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>For Vedic Purohits</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={onOpenEnroll} className="hover:text-amber-400 transition-colors text-left font-bold text-amber-300">
                  + Enroll as Pandit Ji (पंडित पंजीकरण)
                </button>
              </li>
              <li>
                <a href="#requests" className="hover:text-amber-400 transition-colors">
                  Browse Devotee Puja Requests
                </a>
              </li>
              <li>
                <a href="#pandits" className="hover:text-amber-400 transition-colors">
                  Purohit Directory Verification
                </a>
              </li>
              <li>
                <span className="text-stone-400">Direct WhatsApp Devotee Connect</span>
              </li>
              <li>
                <span className="text-stone-400">Zero Commission Community Model</span>
              </li>
            </ul>
          </div>

          {/* 24x7 Helpline */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Purohit Sahayata Kendra
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <a href="tel:+919876543210" className="hover:text-white font-mono font-bold text-amber-200">
                  +91 98765 43210 (Toll Free)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <a href="mailto:support@onlinepanditji.in" className="hover:text-white">
                  seva@onlinepanditji.in
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Dashashwamedh Ghat, Varanasi, UP</span>
              </div>
              <p className="text-[11px] text-stone-400 pt-1">
                Available all 7 days from 06:00 AM to 10:00 PM for urgent Muhurat inquiries.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} Online PanditJi Portal. Dedicated to preserving Sanatana Vedic Traditions.</p>
          <div className="flex items-center gap-4">
            <span>हर हर महादेव • जय श्री राम</span>
            <span className="text-amber-500 font-bold">100% Shastra-Sammat</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
