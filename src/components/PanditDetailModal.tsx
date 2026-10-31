import React, { useState } from 'react';
import { Pandit } from '../types';
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
  X, 
  Clock, 
  Volume2, 
  VolumeX, 
  Send
} from 'lucide-react';
import { sacredAudio } from '../utils/audio';
import confetti from 'canvas-confetti';

interface PanditDetailModalProps {
  pandit: Pandit | null;
  onClose: () => void;
}

export const PanditDetailModal: React.FC<PanditDetailModalProps> = ({
  pandit,
  onClose,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingDevoteeName, setBookingDevoteeName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingPuja, setBookingPuja] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  if (!pandit) return null;

  const toggleChant = () => {
    const active = sacredAudio.toggle();
    setIsPlayingAudio(active);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDevoteeName || !bookingPhone || !bookingDate) {
      alert('Please fill in your name, contact phone, and date.');
      return;
    }

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      onClose();
    }, 2500);
  };

  const cleanPhone = pandit.whatsapp.replace(/[^0-9]/g, '');
  const defaultPujaSelection = bookingPuja || (pandit.services[0]?.name || pandit.specialties[0]);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-stone-950 border border-amber-900/60 rounded-3xl max-w-3xl w-full p-5 sm:p-8 text-stone-100 shadow-2xl relative my-6 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-white p-2 rounded-full hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Pandit Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-stone-800">
          <div className="relative">
            <img
              src={pandit.photo}
              alt={pandit.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-amber-500 shadow-xl"
            />
            {pandit.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-amber-500 text-stone-950 p-1.5 rounded-full shadow-lg">
                <ShieldCheck className="w-4 h-4" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                {pandit.title}
              </span>
              <span className="text-xs text-stone-400">
                {pandit.gotra}
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-300 font-bold ml-auto">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{pandit.rating}</span>
                <span className="text-stone-400 font-normal">({pandit.totalPujas} Pujas)</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif mt-1">
              {pandit.name}
            </h2>

            <p className="text-xs sm:text-sm text-amber-200/90 mt-0.5">
              {pandit.vedaParampara} • {pandit.gurukul}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-stone-300">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {pandit.city}, {pandit.state}
              </span>
              <span>•</span>
              <span className="text-amber-300 font-semibold">{pandit.experienceYears} Years Vedic Experience</span>
              {pandit.onlinePuja && (
                <>
                  <span>•</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-medium">
                    <Globe className="w-3 h-3" /> E-Puja Worldwide
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Audio Mantra Preview Bar */}
        <div className="my-5 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleChant}
              className={`p-2.5 rounded-xl border transition-all ${
                isPlayingAudio
                  ? 'bg-amber-500 text-stone-950 border-amber-400 animate-pulse'
                  : 'bg-stone-900 text-amber-300 border-amber-500/40 hover:bg-amber-500/20'
              }`}
            >
              {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Vedic Shanti Mantra & Om Dhwani</span>
                {isPlayingAudio && <span className="text-[10px] text-amber-400 animate-bounce">● Playing</span>}
              </div>
              <p className="text-[11px] text-stone-400">
                Listen to authentic Vedic meditative frequency before booking
              </p>
            </div>
          </div>

          <a
            href={`tel:${pandit.phone}`}
            className="px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 hover:text-white text-xs font-bold flex items-center gap-1 shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Call Directly</span>
          </a>
        </div>

        {/* About Pandit & Specialties */}
        <div className="space-y-4 text-sm text-stone-300">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
              About Pandit Ji (संक्षिप्त परिचय)
            </h4>
            <p className="leading-relaxed text-stone-300 text-xs sm:text-sm bg-stone-900/40 p-3.5 rounded-2xl border border-stone-800">
              {pandit.bio}
            </p>
          </div>

          {/* Languages & Samagri */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-stone-900 p-3 rounded-2xl border border-stone-800">
              <span className="text-stone-400 block mb-1">Languages Spoken</span>
              <div className="flex flex-wrap gap-1">
                {pandit.languages.map((l) => (
                  <span key={l} className="bg-stone-800 text-amber-200 px-2 py-0.5 rounded-md font-medium">
                    {l}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-stone-900 p-3 rounded-2xl border border-stone-800">
              <span className="text-stone-400 block mb-1">Puja Samagri Availability</span>
              <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {pandit.bringsSamagri
                    ? 'Brings complete herbal Hawan & Puja Samagri'
                    : 'Provides complete samagri checklist on booking'}
                </span>
              </div>
            </div>
          </div>

          {/* Ritual Catalog with Dakshina */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              Rituals & Pujas Offered (पूजा विधान व दक्षिणा)
            </h4>
            <div className="space-y-2">
              {pandit.services.map((srv, idx) => (
                <div
                  key={idx}
                  className="bg-stone-900/80 p-3.5 rounded-2xl border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      <Flame className="w-4 h-4 text-orange-400" />
                      <span>{srv.name}</span>
                    </div>
                    <p className="text-xs text-stone-400 mt-0.5">{srv.description}</p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-400">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>Duration: {srv.duration}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs text-stone-400 block">Dakshina</span>
                    <span className="text-base font-extrabold text-amber-400">
                      ₹{srv.dakshina.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Devotee Direct Booking Form */}
          <div className="pt-4 border-t border-stone-800">
            <h4 className="text-sm font-bold text-amber-300 font-serif mb-2 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-orange-400" />
              <span>Book Puja / Connect with {pandit.name}</span>
            </h4>

            {bookingSuccess ? (
              <div className="bg-emerald-950/60 border border-emerald-500/40 p-4 rounded-2xl text-center space-y-1">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h5 className="font-bold text-white text-sm">Booking Request Sent!</h5>
                <p className="text-xs text-stone-300">
                  Pandit Ji has been notified and will call/WhatsApp you to confirm auspicious Muhurat and samagri list.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-400 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={bookingDevoteeName}
                      onChange={(e) => setBookingDevoteeName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-white text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-400 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-white text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-400 mb-1">
                      Desired Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-white text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-400 mb-1">
                      Select Puja Ceremony
                    </label>
                    <select
                      value={defaultPujaSelection}
                      onChange={(e) => setBookingPuja(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-white text-xs focus:outline-none focus:border-amber-500"
                    >
                      {pandit.services.map((s, i) => (
                        <option key={i} value={s.name}>
                          {s.name} - ₹{s.dakshina}
                        </option>
                      ))}
                      {pandit.specialties.map((spec, i) => (
                        <option key={`spec-${i}`} value={spec}>
                          {spec}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-400 mb-1">
                      Location / Notes
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. At home in Koramangala / need Muhurat advice"
                      value={bookingMessage}
                      onChange={(e) => setBookingMessage(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-white text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black text-xs shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Puja Booking Request</span>
                  </button>

                  <a
                    href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                      `Pranam Pandit ${pandit.name} Ji, I am looking to book ${defaultPujaSelection} on ${bookingDate || 'an upcoming auspicious date'}. Devotee: ${bookingDevoteeName || 'Devotee'}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Directly</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
