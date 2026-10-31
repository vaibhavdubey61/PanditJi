import React, { useState, useEffect } from 'react';
import { PujaEventRequest, PujaTheme } from '../types';
import { 
  CalendarPlus, 
  Sparkles, 
  MapPin, 
  Phone, 
  Clock, 
  DollarSign, 
  Flame, 
  X,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CreatePujaRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (request: PujaEventRequest) => void;
  initialTheme?: PujaTheme | null;
}

export const CreatePujaRequestModal: React.FC<CreatePujaRequestModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialTheme,
}) => {
  const [formData, setFormData] = useState({
    devoteeName: '',
    phone: '',
    whatsapp: '',
    pujaType: 'Griha Pravesh & Vastu Shanti Hawan',
    preferredDate: '',
    timeSlot: 'Morning (Pratahkal)' as PujaEventRequest['timeSlot'],
    city: 'Bengaluru',
    venueType: 'Home' as PujaEventRequest['venueType'],
    address: '',
    dakshinaBudget: 5100,
    preferredLanguage: 'Hindi & Sanskrit',
    samagriProvidedBy: 'Pandit Ji to bring all samagri' as PujaEventRequest['samagriProvidedBy'],
    specialRequirements: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (initialTheme) {
      setFormData((prev) => ({
        ...prev,
        pujaType: initialTheme.title,
        dakshinaBudget: initialTheme.startingDakshina || 3100,
      }));
    }
  }, [initialTheme]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.devoteeName.trim() || !formData.phone.trim() || !formData.preferredDate) {
      alert('Please fill in your name, contact phone, and preferred date.');
      return;
    }

    const newRequest: PujaEventRequest = {
      id: `req-${Date.now()}`,
      devoteeName: formData.devoteeName,
      phone: formData.phone,
      whatsapp: formData.whatsapp || formData.phone,
      pujaType: formData.pujaType,
      preferredDate: formData.preferredDate,
      timeSlot: formData.timeSlot,
      city: formData.city,
      venueType: formData.venueType,
      address: formData.address || `${formData.city}`,
      dakshinaBudget: Number(formData.dakshinaBudget) || 3100,
      preferredLanguage: formData.preferredLanguage,
      samagriProvidedBy: formData.samagriProvidedBy,
      specialRequirements: formData.specialRequirements || 'Please contact for detailed Sankalpa and Shubh Muhurat.',
      createdAt: 'Just now',
      status: 'Open',
      interestedPanditsCount: 0,
    };

    onSubmit(newRequest);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-stone-950 border border-orange-900/60 rounded-3xl max-w-2xl w-full p-5 sm:p-8 text-stone-100 shadow-2xl relative my-6 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-white p-2 rounded-full hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-800">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-2xl">
            🪔
          </div>
          <div>
            <h2 className="text-2xl font-bold font-serif text-white">
              Request a Puja Event (पूजा अनुरोध दर्ज करें)
            </h2>
            <p className="text-xs text-orange-300">
              Post your ritual requirements so available Vedic Pandits in your area can connect with you
            </p>
          </div>
        </div>

        {isSuccess ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-3xl">
              ✓
            </div>
            <h3 className="text-2xl font-bold text-white font-serif">
              शुभम्! Request Posted Successfully
            </h3>
            <p className="text-stone-300 text-sm max-w-md mx-auto">
              Your Puja Event request is now live on the Devotee Board. Available Pandits will review your requirements and connect with you directly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 1. Devotee Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  Devotee / Family Name (यजमान का नाम) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh & Sunita Mehra"
                  value={formData.devoteeName}
                  onChange={(e) => setFormData({ ...formData, devoteeName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  Contact Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* 2. Puja Event Title / Type */}
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">
                Puja Event Ceremony *
              </label>
              <select
                value={formData.pujaType}
                onChange={(e) => setFormData({ ...formData, pujaType: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-orange-500"
              >
                <option value="Griha Pravesh & Vastu Shanti Hawan">Griha Pravesh & Vastu Shanti (गृह प्रवेश)</option>
                <option value="Satyanarayan Vrat Katha & Hawan">Satyanarayan Vrat Katha (सत्यनारायण कथा)</option>
                <option value="Maha Rudrabhishek with Bilva Patra">Maha Rudrabhishek (रुद्राभिषेक)</option>
                <option value="Vedic Vivah Sanskar (Wedding Priest)">Vedic Vivah Sanskar (विवाह संस्कार)</option>
                <option value="Mahamrityunjaya Jaap & Hawan">Mahamrityunjaya Jaap (महामृत्युंजय जाप)</option>
                <option value="Navchandi & Durga Saptashati Path">Navchandi Path (नवचंडी पाठ)</option>
                <option value="Office / Factory Opening Puja">Office / Business Opening Puja (कार्यालय उद्घाटन)</option>
                <option value="Pitru Paksha Shradh & Tarpan">Pitru Paksha Shradh (श्राद्ध तर्पण)</option>
                <option value="Namkaran & Mundan Sanskar">Namkaran & Mundan (नामकरण / मुंडन)</option>
                <option value="Other Custom Vedic Ritual">Other Custom Vedic Ritual</option>
              </select>
            </div>

            {/* 3. Preferred Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  Preferred Date (तिथि / दिनांक) *
                </label>
                <input
                  type="date"
                  required
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  Preferred Time Slot *
                </label>
                <select
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value as PujaEventRequest['timeSlot'] })}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-orange-500"
                >
                  <option value="Morning (Pratahkal)">Morning (Pratahkal / प्रातःकाल)</option>
                  <option value="Afternoon (Madhyahna)">Afternoon (Madhyahna / मध्याह्न)</option>
                  <option value="Evening (Sayankal)">Evening (Sayankal / सायंकाल)</option>
                  <option value="Auspicious Muhurat">As per Shubh Muhurat (शुभ मुहूर्त अनुसार)</option>
                </select>
              </div>
            </div>

            {/* 4. City, Venue & Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  City / Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bengaluru, Mumbai, Delhi NCR"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  Venue Type *
                </label>
                <select
                  value={formData.venueType}
                  onChange={(e) => setFormData({ ...formData, venueType: e.target.value as PujaEventRequest['venueType'] })}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-orange-500"
                >
                  <option value="Home">At Home (घर पर)</option>
                  <option value="Office / Commercial">Office / Commercial Space (दुकान / कार्यालय)</option>
                  <option value="Temple">At Temple (मंदिर में)</option>
                  <option value="Online E-Puja">Online Virtual E-Puja (ऑनलाइन ई-पूजा)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">
                Full Address / Area
              </label>
              <input
                type="text"
                placeholder="e.g. Flat 402, Whitefield, Bengaluru"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* 5. Budget, Language & Samagri preference */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  Dakshina Budget (₹) *
                </label>
                <input
                  type="number"
                  min="1100"
                  step="500"
                  value={formData.dakshinaBudget}
                  onChange={(e) => setFormData({ ...formData, dakshinaBudget: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  Pandit Language Preference
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hindi, Kannada, Gujarati"
                  value={formData.preferredLanguage}
                  onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  Samagri Arrangement
                </label>
                <select
                  value={formData.samagriProvidedBy}
                  onChange={(e) => setFormData({ ...formData, samagriProvidedBy: e.target.value as PujaEventRequest['samagriProvidedBy'] })}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-xs focus:outline-none focus:border-orange-500"
                >
                  <option value="Pandit Ji to bring all samagri">Pandit Ji to bring all samagri</option>
                  <option value="Family will arrange">Family will arrange</option>
                  <option value="Partial / Discuss">Partial / Discuss</option>
                </select>
              </div>
            </div>

            {/* 6. Special Requirements */}
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">
                Special Sankalpa / Instructions (विशिष्ट आवश्यकताएं)
              </label>
              <textarea
                rows={3}
                placeholder="Mention specific gotra, family members, hawan kund requirements, or any particular Vedic rituals you wish to include..."
                value={formData.specialRequirements}
                onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-stone-800 flex gap-3">
              <button
                type="submit"
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 font-extrabold text-sm shadow-xl hover:from-orange-600 hover:to-amber-600 transition-all text-center flex items-center justify-center gap-2"
              >
                <CalendarPlus className="w-4 h-4" />
                <span>Post Puja Request (अनुरोध पोस्ट करें)</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="py-3.5 px-6 rounded-xl bg-stone-900 border border-stone-700 text-stone-400 hover:text-white text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
