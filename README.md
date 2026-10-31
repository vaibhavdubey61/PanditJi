# 🕉️ Online PanditJi (ऑनलाइन पंडित जी)

> **Live Production Portal**: [https://online-panditji-portal.surge.sh](https://online-panditji-portal.surge.sh)

A dedicated, modern Vedic web application connecting Sanatana devotees across India and worldwide with verified Purohits, Acharyas, and Shastris for traditional home & temple rituals, while providing priests an authentic digital onboarding and scheduling platform.

---

## 🌟 Key Features

1. **✍️ Pandit Self-Enrollment Portal (पंडित पंजीकरण)**:
   - Onboarding form capturing Vedic Parampara (Rigveda, Shukla/Krishna Yajurveda, Samaveda, Atharvaveda), Gotra, Gurukul/Sanskrit University credentials, experience, cities, languages, starting Dakshina, and phone/WhatsApp.
   - Newly enrolled Pandits immediately appear on the public directory with state persistence (`localStorage`).

2. **🔍 Available Pandits Directory**:
   - Filter by City (Varanasi, Haridwar, Delhi NCR, Mumbai, Bengaluru, Pune, Ahmedabad, Ayodhya, Online Virtual) and Puja type.
   - Pandit cards showcase verification badge, gotra, rating, starting Dakshina, and languages.
   - Direct connection via **WhatsApp** (with pre-filled auspicious greeting), direct phone call, and **"View Bio & Pujas"** modal with individual ritual breakdown and duration.

3. **📋 Devotee Puja Requests Public Board (पूजा अनुरोध)**:
   - Live board displaying requirements posted by devotees (e.g., Griha Pravesh in Bangalore, Rudrabhishek in Mumbai, Satyanarayan in Gurugram, Mahamrityunjaya in Haridwar).
   - Shows event date, auspicious time slot, venue type, dakshina budget, and special instructions.
   - Pandits can click **"Express Interest"** to submit proposals directly or chat via WhatsApp.

4. **➕ Request a Puja Event (भक्त अनुरोध)**:
   - Form for devotees to submit upcoming ceremonies, specify budget, date, venue, and samagri preferences.

5. **🌺 Puja Themes & Sacred Rituals Gallery with Images**:
   - Curated gallery with authentic imagery covering **Griha Pravesh & Vastu Shanti**, **Satyanarayan Vrat Katha**, **Maha Rudrabhishek**, **Vedic Vivah Sanskar**, **Mahamrityunjaya Jaap**, **Navchandi Path**, and **Pitru Paksha Shradh**.
   - Includes scriptural significance, best Tithis, duration, and one-click actions to filter Pandits or request the event.

6. **🎨 5 Authentic Devotional Color Themes**:
   - 🕉️ **Vedic Saffron & Gold** (पारंपरिक केसरी)
   - 🛕 **Temple Crimson & Sindoor** (मंदिर सिंदूर)
   - 🌿 **Kashi Sandalwood & Earth** (काशी चन्दन)
   - 🔱 **Shiva Nilam & Bhasma** (शिव नीलकंठ)
   - 🌙 **Midnight Mandir Dark** (दिव्य रात्रि)

7. **🪔 Interactive Extras**:
   - **Daily Panchang & Shubh Muhurat**: Real-time Tithi, Nakshatra, Abhijit Muhurat, and Rahukaal advisory.
   - **Puja Samagri Checklist Generator**: 30+ scriptural items checklist with copy and print features.
   - **Sacred Ambient Om Drone**: Web Audio synthesizer with meditative 136.1 Hz frequency.

---

## 🚀 Getting Started on a New Machine

When setting up this project on another computer:

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Git](https://git-scm.com/)

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/vaibhavdubey61/PanditJi.git
   cd PanditJi
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, Lucide React Icons
- **Bundler**: Vite
- **FX**: Canvas Confetti, Web Audio API
- **Deployment**: Surge.sh Cloud CDN

---

## 📁 Project Structure

```
PanditJi/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── ThemeGallery.tsx
│   │   ├── PanditList.tsx
│   │   ├── PujaRequestsBoard.tsx
│   │   ├── PanchangWidget.tsx
│   │   ├── EnrollPanditModal.tsx
│   │   ├── CreatePujaRequestModal.tsx
│   │   ├── PanditDetailModal.tsx
│   │   ├── SamagriGuideModal.tsx
│   │   └── Footer.tsx
│   ├── context/         # Theme context & color configurations
│   ├── data/            # Mock Pandits, Puja requests, and Themes
│   ├── types/           # TypeScript interfaces & definitions
│   ├── utils/           # Audio engine & helpers
│   ├── App.tsx          # Root application component
│   ├── index.css        # Tailwind CSS imports & styles
│   └── main.tsx         # Application entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 📜 License
MIT License. Dedicated to preserving and sharing Sanatana Vedic traditions.
