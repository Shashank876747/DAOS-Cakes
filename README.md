# DAOS Cakes - Custom Cakes 

DAOS Cakes is a web application designed for a custom artisanal cake bakery. It provides customers with information about handcrafted cake offerings, cottage food safety compliance, contact details, and an embedded order form integrated with Google Forms and Google Sheets.

---

## 🎂 Key Features

- **Hero Showcase**: Highlighting custom cake offerings, fresh baking practices, and cottage food permitted status.
- **Embedded Order Form**: A responsive iframe integration embedding a custom Google Form for cake quote and order requests synced with Google Sheets.
- **Google Apps Script Guide**: Built-in modal guide providing step-by-step instructions and code for syncing form submissions to Google Sheets.
- **About & Cottage Food Compliance**: Information regarding home kitchen food safety standards and local permitted cottage food operations.
- **Header Navigation & Mobile Drawer**: Sticky navigation header with smooth scrolling, announcement bar, and mobile responsive menu.
- **Contact & Social Details**: Email, Instagram handles, operating hours, and location information.
- **Analytics & Site Verification**: Configured with Google Tag Manager and Google Analytics (`gtag.js`).

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build System**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database / Auth**: [Firebase SDK](https://firebase.google.com/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed.

### Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Shashank876747/DAOS-Cakes.git
   cd DAOS-Cakes
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

---

## 📦 Available Scripts

- `npm run dev`: Launches the development server on port 3000.
- `npm run build`: Compiles the application into production static assets in `/dist`.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs TypeScript type validation without emitting code.

---

## 📂 Directory Structure

```
├── public/                 # Static assets and site manifest
├── src/
│   ├── assets/             # Brand images and photos
│   ├── components/         # Modular React UI components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── AppsScriptGuideModal.tsx
│   │   ├── PublicOrderSchedule.tsx
│   │   └── UserProfileModal.tsx
│   ├── context/            # Site and Auth state management
│   │   ├── AuthContext.tsx
│   │   └── SiteContext.tsx
│   ├── data/               # Integration guide scripts
│   ├── lib/                # Firebase initialization
│   ├── App.tsx             # Main page layout
│   ├── index.css           # Global CSS and Tailwind setup
│   └── main.tsx            # Application entry point
├── firebase-applet-config.json # Firebase configuration
├── firestore.rules         # Firestore security rules
├── index.html              # HTML entry point with analytics tags
├── package.json            # Project dependencies and build scripts
└── vite.config.ts          # Vite configuration
```

---

## 🔒 Security & Quality

This project implements GitHub Advanced Security tools:
- **CodeQL Analysis**: Automated SAST workflow located in `.github/workflows/codeql.yml`.
- **Dependabot**: Automated dependency and action updates defined in `.github/dependabot.yml`.
- **Security Policy**: Detailed vulnerability reporting policy in `SECURITY.md`.
- **Secret Scanning & Private Vulnerability Reporting**: Enabled for repository security.

---

## 📄 License

This repository is maintained for DAOS Cakes. All rights reserved.
