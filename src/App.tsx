import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Pandit, PujaEventRequest, PujaTheme } from './types';
import { INITIAL_PANDITS, INITIAL_PUJA_REQUESTS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ThemeGallery } from './components/ThemeGallery';
import { PanditList } from './components/PanditList';
import { PujaRequestsBoard } from './components/PujaRequestsBoard';
import { PanchangWidget } from './components/PanchangWidget';
import { EnrollPanditModal } from './components/EnrollPanditModal';
import { CreatePujaRequestModal } from './components/CreatePujaRequestModal';
import { PanditDetailModal } from './components/PanditDetailModal';
import { SamagriGuideModal } from './components/SamagriGuideModal';
import { Footer } from './components/Footer';

export const AppContent: React.FC = () => {
  // 1. Persistent State for Pandits
  const [pandits, setPandits] = useState<Pandit[]>(() => {
    try {
      const saved = localStorage.getItem('panditji_pandits');
      return saved ? JSON.parse(saved) : INITIAL_PANDITS;
    } catch {
      return INITIAL_PANDITS;
    }
  });

  // 2. Persistent State for Devotee Puja Requests
  const [pujaRequests, setPujaRequests] = useState<PujaEventRequest[]>(() => {
    try {
      const saved = localStorage.getItem('panditji_requests');
      return saved ? JSON.parse(saved) : INITIAL_PUJA_REQUESTS;
    } catch {
      return INITIAL_PUJA_REQUESTS;
    }
  });

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('panditji_pandits', JSON.stringify(pandits));
  }, [pandits]);

  useEffect(() => {
    localStorage.setItem('panditji_requests', JSON.stringify(pujaRequests));
  }, [pujaRequests]);

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All India');
  const [selectedPujaType, setSelectedPujaType] = useState('All Pujas');
  const [activeSection, setActiveSection] = useState('pandits');

  // Modal Open States
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isCreateRequestModalOpen, setIsCreateRequestModalOpen] = useState(false);
  const [themeForNewRequest, setThemeForNewRequest] = useState<PujaTheme | null>(null);
  const [selectedPandit, setSelectedPandit] = useState<Pandit | null>(null);
  const [isSamagriModalOpen, setIsSamagriModalOpen] = useState(false);

  // Handlers
  const handleEnrollPandit = (newPandit: Pandit) => {
    setPandits((prev) => [newPandit, ...prev]);
    // Switch view to directory and clear filter to show newly added pandit
    setSelectedCity('All India');
    setSelectedPujaType('All Pujas');
    setSearchQuery('');
    setActiveSection('pandits');
    const el = document.getElementById('pandits');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCreateRequest = (newRequest: PujaEventRequest) => {
    setPujaRequests((prev) => [newRequest, ...prev]);
    setActiveSection('requests');
    const el = document.getElementById('requests');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExpressInterest = (requestId: string) => {
    setPujaRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? {
              ...r,
              interestedPanditsCount: r.interestedPanditsCount + 1,
              status: r.status === 'Open' ? 'In Discussion' : r.status,
            }
          : r
      )
    );
  };

  const handleSelectThemeFilter = (themeSnippet: string) => {
    setSearchQuery(themeSnippet);
    setActiveSection('pandits');
    const el = document.getElementById('pandits');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenCreateRequestWithTheme = (theme: PujaTheme) => {
    setThemeForNewRequest(theme);
    setIsCreateRequestModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Auspicious Top Navbar */}
      <Navbar
        onOpenEnrollPandit={() => setIsEnrollModalOpen(true)}
        onOpenCreateRequest={() => {
          setThemeForNewRequest(null);
          setIsCreateRequestModalOpen(true);
        }}
        onOpenSamagriGuide={() => setIsSamagriModalOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onSearchChange={setSearchQuery}
          searchQuery={searchQuery}
          onOpenEnrollPandit={() => setIsEnrollModalOpen(true)}
          onOpenCreateRequest={() => {
            setThemeForNewRequest(null);
            setIsCreateRequestModalOpen(true);
          }}
          totalPanditsCount={pandits.length}
          totalRequestsCount={pujaRequests.length}
        />

        {/* Puja Themes & Visual Rituals Showcase */}
        <ThemeGallery
          onSelectThemeFilter={handleSelectThemeFilter}
          onOpenCreateRequestWithTheme={handleOpenCreateRequestWithTheme}
        />

        {/* Directory of Available Pandits */}
        <PanditList
          pandits={pandits}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCity={selectedCity}
          onSelectCity={setSelectedCity}
          selectedPujaType={selectedPujaType}
          onSelectPujaType={setSelectedPujaType}
          onSelectPandit={setSelectedPandit}
          onOpenEnroll={() => setIsEnrollModalOpen(true)}
        />

        {/* Devotee Puja Requests Public Board */}
        <PujaRequestsBoard
          requests={pujaRequests}
          onOpenCreateRequest={() => {
            setThemeForNewRequest(null);
            setIsCreateRequestModalOpen(true);
          }}
          onExpressInterest={handleExpressInterest}
        />

        {/* Panchang & Auspicious Muhurat */}
        <PanchangWidget />
      </main>

      {/* Sacred Vedic Footer */}
      <Footer
        onOpenEnroll={() => setIsEnrollModalOpen(true)}
        onOpenCreateRequest={() => {
          setThemeForNewRequest(null);
          setIsCreateRequestModalOpen(true);
        }}
        onOpenSamagriGuide={() => setIsSamagriModalOpen(true)}
      />

      {/* Modals */}
      <EnrollPanditModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        onEnroll={handleEnrollPandit}
      />

      <CreatePujaRequestModal
        isOpen={isCreateRequestModalOpen}
        onClose={() => {
          setIsCreateRequestModalOpen(false);
          setThemeForNewRequest(null);
        }}
        onSubmit={handleCreateRequest}
        initialTheme={themeForNewRequest}
      />

      <PanditDetailModal
        pandit={selectedPandit}
        onClose={() => setSelectedPandit(null)}
      />

      <SamagriGuideModal
        isOpen={isSamagriModalOpen}
        onClose={() => setIsSamagriModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
