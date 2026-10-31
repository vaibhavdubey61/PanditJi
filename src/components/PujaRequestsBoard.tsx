import React, { useState } from 'react';
import { PujaEventRequest } from '../types';
import { POPULAR_CITIES } from '../data/mockData';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles, 
  PlusCircle, 
  Filter, 
  Send, 
  PhoneCall, 
  HelpCircle,
  Home,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PujaRequestsBoardProps {
  requests: PujaEventRequest[];
  onOpenCreateRequest: () => void;
  onExpressInterest: (requestId: string) => void;
}

export const PujaRequestsBoard: React.FC<PujaRequestsBoardProps> = ({
  requests,
  onOpenCreateRequest,
  onExpressInterest,
}) => {
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [respondingTo, setRespondingTo] = useState<PujaEventRequest | null>(null);
  const [panditName, setPanditName] = useState('');
  const [panditPhone, setPanditPhone] = useState('');
  const [panditMessage, setPanditMessage] = useState('');
  const [responseSuccess, setResponseSuccess] = useState(false);

  // Filter requests
  const filteredRequests = requests.filter((req) => {
    const matchesCity = selectedCity === 'All' || req.city.toLowerCase() === selectedCity.toLowerCase();
    const matchesStatus = selectedStatus === 'All' || req.status === selectedStatus;
    return matchesCity && matchesStatus;
  });

  const handleSendInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!respondingTo || !panditName.trim() || !panditPhone.trim()) return;

    onExpressInterest(respondingTo.id);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });

    setResponseSuccess(true);
    setTimeout(() => {
      setResponseSuccess(false);
      setRespondingTo(null);
      setPanditName('');
      setPanditPhone('');
      setPanditMessage('');
    }, 2000);
  };

  return (
    <section id="requests" className="py-16 bg-stone-900 border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Public Devotee Requests Board</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-serif tracking-tight">
              Devotee Requests for Puja Events
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-1 max-w-2xl">
              Devotees actively seeking learned Purohits for family ceremonies, office openings, and anushthans. Pandits can review details and express direct interest.
            </p>
          </div>

          {/* Post Request CTA */}
          <button
            onClick={onOpenCreateRequest}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-stone-950 font-extrabold text-sm shadow-xl shadow-orange-500/20 transition-all flex items-center gap-2 self-start md:self-end hover:scale-105"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Post Your Puja Request (पूजा कराएं)</span>
          </button>
        </div>

        {/* Filter bar */}
        <div className="bg-stone-950/80 p-4 rounded-2xl border border-stone-800 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1 mr-2">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <span>Filter by City:</span>
            </span>
            {['All', 'Bengaluru', 'Mumbai', 'Delhi NCR', 'Haridwar', 'Ahmedabad'].map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCity(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCity === c
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 font-medium">Status:</span>
            {['All', 'Open', 'In Discussion'].map((s) => (
              <button
                key={s}
                onClick={() => setSelectedStatus(s)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedStatus === s
                    ? 'bg-stone-700 text-white font-bold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Requests List */}
        {filteredRequests.length === 0 ? (
          <div className="text-center py-16 bg-stone-950/40 rounded-3xl border border-stone-800 p-8 space-y-3">
            <Calendar className="w-12 h-12 text-stone-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Puja Requests for this filter</h3>
            <p className="text-stone-400 text-xs max-w-sm mx-auto">
              Be the first to request an auspicious Puja event in your city!
            </p>
            <button
              onClick={onOpenCreateRequest}
              className="mt-2 px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold"
            >
              Post a Puja Event Request
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRequests.map((req) => (
              <div
                key={req.id}
                className="bg-stone-950/90 rounded-3xl border border-stone-800 hover:border-orange-500/40 p-6 shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Status & Devotee info */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center text-xs border border-amber-500/30">
                        {req.devoteeName.charAt(0)}
                      </span>
                      <div>
                        <div className="font-bold text-white text-sm">
                          {req.devoteeName}
                        </div>
                        <div className="text-[11px] text-stone-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          <span>{req.city}</span>
                          <span>•</span>
                          <span>Posted {req.createdAt}</span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                        req.status === 'Open'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      ● {req.status}
                    </span>
                  </div>

                  {/* Puja Title */}
                  <h3 className="text-xl font-bold text-amber-300 font-serif mt-2 mb-1 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-400 shrink-0" />
                    <span>{req.pujaType}</span>
                  </h3>

                  {/* Date, Time & Venue Bar */}
                  <div className="grid grid-cols-2 gap-2 my-3 p-3 rounded-2xl bg-stone-900 border border-stone-800 text-xs">
                    <div className="flex items-center gap-2 text-stone-300">
                      <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-stone-400 block">Date</span>
                        <strong className="text-white">{req.preferredDate}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-stone-300">
                      <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-stone-400 block">Preferred Time</span>
                        <strong className="text-white">{req.timeSlot}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Special Requirements & Notes */}
                  <div className="bg-stone-900/50 p-3.5 rounded-2xl border border-stone-800/80 mb-3 text-xs text-stone-300 space-y-2">
                    <p className="line-clamp-3 leading-relaxed text-stone-300">
                      "{req.specialRequirements}"
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1 border-t border-stone-800/60 text-[11px]">
                      <span className="bg-stone-800 px-2 py-0.5 rounded-md text-stone-300">
                        Venue: <strong>{req.venueType}</strong>
                      </span>
                      <span className="bg-stone-800 px-2 py-0.5 rounded-md text-stone-300">
                        Language: <strong>{req.preferredLanguage}</strong>
                      </span>
                      <span className="bg-stone-800 px-2 py-0.5 rounded-md text-stone-300">
                        Samagri: <strong>{req.samagriProvidedBy}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer with Budget & Action for Pandits */}
                <div className="pt-4 border-t border-stone-800 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-stone-400 block">Devotee Dakshina Budget</span>
                    <span className="text-lg font-black text-emerald-400">
                      ₹{req.dakshinaBudget.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setRespondingTo(req)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-stone-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Express Interest ({req.interestedPanditsCount})</span>
                    </button>

                    <a
                      href={`https://wa.me/${req.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Pranam Devotee Ji, I saw your request for "${req.pujaType}" on Online PanditJi portal. I am a Vedic Pandit available for this ceremony.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-emerald-400 border border-stone-700 transition-colors"
                      title="WhatsApp Devotee Directly"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pandit Express Interest Modal */}
        {respondingTo && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-stone-950 border border-amber-900/60 rounded-3xl max-w-lg w-full p-6 text-stone-100 shadow-2xl relative">
              <button
                onClick={() => setRespondingTo(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-white p-2 rounded-full hover:bg-stone-800"
              >
                ✕
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🕉️</span>
                <div>
                  <h3 className="text-xl font-bold font-serif text-amber-400">
                    Connect with {respondingTo.devoteeName}
                  </h3>
                  <p className="text-xs text-stone-400">
                    Express interest for "{respondingTo.pujaType}"
                  </p>
                </div>
              </div>

              {responseSuccess ? (
                <div className="text-center py-8 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
                    ✓
                  </div>
                  <h4 className="text-lg font-bold text-white">Pranam Pandit Ji!</h4>
                  <p className="text-stone-300 text-xs">
                    Your interest and contact details have been sent to the devotee. They will reach out to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendInterest} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Pandit / Acharya Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acharya Ramanand Shastri"
                      value={panditName}
                      onChange={(e) => setPanditName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Contact Number / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={panditPhone}
                      onChange={(e) => setPanditPhone(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Brief Message to Devotee (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share your Vedic experience, whether you bring samagri, and auspicious muhurat suggestions..."
                      value={panditMessage}
                      onChange={(e) => setPanditMessage(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-bold text-sm shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all"
                    >
                      Submit Response to Devotee
                    </button>
                    <button
                      type="button"
                      onClick={() => setRespondingTo(null)}
                      className="py-3 px-4 rounded-xl bg-stone-900 text-stone-400 hover:text-white text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
