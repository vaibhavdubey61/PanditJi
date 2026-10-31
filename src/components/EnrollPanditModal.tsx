import React, { useState } from 'react';
import { Pandit } from '../types';
import { 
  UserCheck, 
  Sparkles, 
  MapPin, 
  Phone, 
  BookOpen, 
  ShieldCheck, 
  Award, 
  Check, 
  X,
  Camera,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface EnrollPanditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnroll: (pandit: Pandit) => void;
}

const DEFAULT_AVATARS = [
  { label: 'Traditional Saffron Purohit', url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600' },
  { label: 'Elder Vedic Shastri', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600' },
  { label: 'Young Sanskrit Scholar', url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600' },
  { label: 'Kashi Acharya', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600' },
  { label: 'Temple Purohit', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600' },
];

const SPECIALTY_OPTIONS = [
  'Griha Pravesh',
  'Satyanarayan Katha',
  'Rudrabhishek',
  'Vivah Sanskar',
  'Mahamrityunjaya Jaap',
  'Vastu Shanti',
  'Navchandi Path',
  'Lakshmi Kuber Puja',
  'Pitru Paksha Shradh',
  'Namkaran Sanskar',
  'Mundan Sanskar',
  'Kaal Sarp Dosh Shanti',
];

const LANGUAGE_OPTIONS = [
  'Sanskrit',
  'Hindi',
  'Marathi',
  'Gujarati',
  'Bengali',
  'Tamil',
  'Telugu',
  'Kannada',
  'Bhojpuri',
  'Punjabi',
  'English',
];

export const EnrollPanditModal: React.FC<EnrollPanditModalProps> = ({
  isOpen,
  onClose,
  onEnroll,
}) => {
  const [formData, setFormData] = useState({
    title: 'Acharya' as Pandit['title'],
    name: '',
    gotra: 'Kashyap Gotra',
    vedaParampara: 'Shukla Yajurveda',
    gurukul: 'Sampurnanand Sanskrit Vishwavidyalaya, Varanasi',
    experienceYears: 12,
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    canTravel: true,
    onlinePuja: true,
    languages: ['Hindi', 'Sanskrit'],
    specialties: ['Griha Pravesh', 'Satyanarayan Katha', 'Rudrabhishek'],
    startingDakshina: 2500,
    phone: '',
    whatsapp: '',
    email: '',
    bringsSamagri: true,
    bio: '',
    photo: DEFAULT_AVATARS[0].url,
  });

  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const toggleSpecialty = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(item)
        ? prev.specialties.filter((s) => s !== item)
        : [...prev.specialties, item],
    }));
  };

  const toggleLanguage = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(item)
        ? prev.languages.filter((l) => l !== item)
        : [...prev.languages, item],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please fill in your name and phone number.');
      return;
    }

    const newPandit: Pandit = {
      id: `pdt-${Date.now()}`,
      title: formData.title,
      name: formData.name,
      photo: formData.photo,
      gotra: formData.gotra,
      vedaParampara: formData.vedaParampara,
      gurukul: formData.gurukul,
      experienceYears: Number(formData.experienceYears) || 5,
      city: formData.city,
      state: formData.state,
      canTravel: formData.canTravel,
      onlinePuja: formData.onlinePuja,
      languages: formData.languages.length ? formData.languages : ['Hindi', 'Sanskrit'],
      specialties: formData.specialties.length ? formData.specialties : ['Satyanarayan Katha'],
      startingDakshina: Number(formData.startingDakshina) || 2100,
      phone: formData.phone,
      whatsapp: formData.whatsapp || formData.phone,
      email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '')}@onlinepanditji.in`,
      rating: 5.0,
      totalPujas: 1,
      isVerified: true,
      bringsSamagri: formData.bringsSamagri,
      bio: formData.bio || `Vedic Purohit specializing in ${formData.specialties.join(', ')} with ${formData.experienceYears} years of experience.`,
      availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      services: [
        {
          name: formData.specialties[0] || 'Vedic Hawan & Puja',
          duration: '2.5 Hours',
          dakshina: Number(formData.startingDakshina) || 2500,
          description: 'Complete scriptural vidhi with Gauri Ganesh, Kalash Sthapana and Agnihotra hawan.',
        },
      ],
    };

    onEnroll(newPandit);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.5 },
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-stone-950 border border-amber-900/60 rounded-3xl max-w-3xl w-full p-5 sm:p-8 text-stone-100 shadow-2xl relative my-6 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-white p-2 rounded-full hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-800">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl">
            🕉️
          </div>
          <div>
            <h2 className="text-2xl font-bold font-serif text-white">
              Enroll as Pandit Ji (पंडित पंजीकरण)
            </h2>
            <p className="text-xs text-amber-300">
              Join India's premier community of verified Vedic Purohits & connect with devotees
            </p>
          </div>
        </div>

        {isSuccess ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-3xl">
              ✓
            </div>
            <h3 className="text-2xl font-bold text-white font-serif">
              अभिनंदन Pandit Ji!
            </h3>
            <p className="text-stone-300 text-sm max-w-md mx-auto">
              Your profile has been enrolled and published successfully on the Online PanditJi directory. Devotees can now view your details and connect with you!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Title & Full Name */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  Vedic Title *
                </label>
                <select
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value as Pandit['title'] })}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-amber-500"
                >
                  <option value="Acharya">Acharya (आचार्य)</option>
                  <option value="Shastri">Shastri (शास्त्री)</option>
                  <option value="Pandit">Pandit (पंडित)</option>
                  <option value="Vedmurti">Vedmurti (वेदमूर्ति)</option>
                  <option value="Mahant">Mahant (महंत)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  Full Name (पूरा नाम) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radheshyam Dwivedi"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* 2. Photo / Avatar Selection */}
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5 flex items-center justify-between">
                <span>Profile Photo / Avatar</span>
                <span className="text-[11px] text-stone-400">Choose a preset or enter photo URL below</span>
              </label>

              <div className="grid grid-cols-5 gap-2 mb-3">
                {DEFAULT_AVATARS.map((avatar, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setFormData({ ...formData, photo: avatar.url })}
                    className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                      formData.photo === avatar.url ? 'border-amber-400 scale-105 shadow-md' : 'border-stone-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={avatar.url} alt={avatar.label} className="w-full h-full object-cover" />
                    {formData.photo === avatar.url && (
                      <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white drop-shadow" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <input
                type="url"
                placeholder="Or paste custom image URL (https://...)"
                value={formData.photo}
                onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* 3. Gotra, Veda Lineage & Gurukul */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  Gotra (गोत्र) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kashyap, Shandilya, Bharadwaj"
                  value={formData.gotra}
                  onChange={(e) => setFormData({ ...formData, gotra: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  Veda Shakha / Parampara *
                </label>
                <select
                  value={formData.vedaParampara}
                  onChange={(e) => setFormData({ ...formData, vedaParampara: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-amber-500"
                >
                  <option value="Shukla Yajurveda">Shukla Yajurveda (शुक्ल यजुर्वेद)</option>
                  <option value="Krishna Yajurveda">Krishna Yajurveda (कृष्ण यजुर्वेद)</option>
                  <option value="Rigveda">Rigveda (ऋग्वेद)</option>
                  <option value="Samaveda">Samaveda (सामवेद)</option>
                  <option value="Atharvaveda">Atharvaveda (अथर्ववेद)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  Experience (Years) *
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  required
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Gurukul / Pathshala */}
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">
                Gurukul / Sanskrit Pathshala / University *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sampurnanand Sanskrit Vishwavidyalaya, Haridwar Gurukul"
                value={formData.gurukul}
                onChange={(e) => setFormData({ ...formData, gurukul: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* 4. City, State & Dakshina */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  Primary City *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Varanasi, Delhi, Bengaluru"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  State *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Uttar Pradesh, Karnataka"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  Starting Dakshina (₹) *
                </label>
                <input
                  type="number"
                  min="500"
                  step="100"
                  required
                  value={formData.startingDakshina}
                  onChange={(e) => setFormData({ ...formData, startingDakshina: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* 5. Contact Info (Phone & WhatsApp) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  Mobile / Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  WhatsApp Number (for direct devotee connect) *
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* 6. Puja Specialties Multi-select */}
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">
                Puja & Sanskar Specialties (Select all that you perform):
              </label>
              <div className="flex flex-wrap gap-2">
                {SPECIALTY_OPTIONS.map((item) => {
                  const isSelected = formData.specialties.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleSpecialty(item)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950 font-bold border border-amber-400'
                          : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
                      }`}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5" /> : <Flame className="w-3.5 h-3.5 opacity-50" />}
                      <span>{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 7. Languages Spoken */}
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">
                Languages Spoken fluently:
              </label>
              <div className="flex flex-wrap gap-2">
                {LANGUAGE_OPTIONS.map((lang) => {
                  const isSelected = formData.languages.includes(lang);
                  return (
                    <button
                      type="button"
                      key={lang}
                      onClick={() => toggleLanguage(lang)}
                      className={`px-3 py-1 rounded-lg text-xs transition-all ${
                        isSelected
                          ? 'bg-stone-200 text-stone-950 font-bold'
                          : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
                      }`}
                    >
                      {lang}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 8. Additional Flags */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-stone-900 border border-stone-800 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-stone-300">
                <input
                  type="checkbox"
                  checked={formData.canTravel}
                  onChange={(e) => setFormData({ ...formData, canTravel: e.target.checked })}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <span>Willing to travel to nearby cities</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-stone-300">
                <input
                  type="checkbox"
                  checked={formData.onlinePuja}
                  onChange={(e) => setFormData({ ...formData, onlinePuja: e.target.checked })}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <span>Can perform Virtual / E-Puja</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-stone-300">
                <input
                  type="checkbox"
                  checked={formData.bringsSamagri}
                  onChange={(e) => setFormData({ ...formData, bringsSamagri: e.target.checked })}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <span>Can bring pure Hawan Samagri</span>
              </label>
            </div>

            {/* 9. Bio / Sankalpa Statement */}
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">
                Vedic Bio & Devotee Message (संक्षिप्त परिचय)
              </label>
              <textarea
                rows={3}
                placeholder="Share your spiritual journey, Vedic guru parampara, devotion to shastra rules, or any special blessings..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Submit Buttons */}
            <div className="pt-4 border-t border-stone-800 flex gap-3">
              <button
                type="submit"
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-sm shadow-xl hover:from-amber-600 hover:to-orange-600 transition-all text-center flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Submit Enrollment & Go Live</span>
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
