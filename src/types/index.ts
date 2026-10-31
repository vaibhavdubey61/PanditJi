export type ThemeColor = 'saffron' | 'crimson' | 'sandalwood' | 'shiva' | 'midnight';

export interface Pandit {
  id: string;
  name: string;
  title: 'Acharya' | 'Shastri' | 'Pandit' | 'Vedmurti' | 'Mahant';
  photo: string;
  gotra: string;
  vedaParampara: string;
  gurukul: string;
  experienceYears: number;
  city: string;
  state: string;
  canTravel: boolean;
  onlinePuja: boolean;
  languages: string[];
  specialties: string[];
  startingDakshina: number;
  phone: string;
  whatsapp: string;
  email: string;
  rating: number;
  totalPujas: number;
  isVerified: boolean;
  bringsSamagri: boolean;
  bio: string;
  availableDays: string[];
  services: {
    name: string;
    duration: string;
    dakshina: number;
    description: string;
  }[];
}

export interface PujaEventRequest {
  id: string;
  devoteeName: string;
  phone: string;
  whatsapp: string;
  pujaType: string;
  preferredDate: string;
  timeSlot: 'Morning (Pratahkal)' | 'Afternoon (Madhyahna)' | 'Evening (Sayankal)' | 'Auspicious Muhurat';
  city: string;
  venueType: 'Home' | 'Temple' | 'Office / Commercial' | 'Online E-Puja';
  address: string;
  dakshinaBudget: number;
  preferredLanguage: string;
  samagriProvidedBy: 'Pandit Ji to bring all samagri' | 'Family will arrange' | 'Partial / Discuss';
  specialRequirements: string;
  createdAt: string;
  status: 'Open' | 'In Discussion' | 'Pandit Assigned';
  interestedPanditsCount: number;
}

export interface PujaTheme {
  id: string;
  title: string;
  titleHindi: string;
  tagline: string;
  image: string;
  bestTithi: string;
  duration: string;
  startingDakshina: number;
  description: string;
  keyBenefits: string[];
  recommendedSamagri: string[];
}

export interface DevoteeBooking {
  id: string;
  panditId: string;
  panditName: string;
  devoteeName: string;
  phone: string;
  pujaType: string;
  date: string;
  city: string;
  message: string;
  createdAt: string;
}
