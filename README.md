# DAOS Cakes - Custom Artisanal Bakery & Cake Studio

[![CI Verification](https://github.com/Shashank876747/DAOS-Cakes/actions/workflows/ci.yml/badge.svg)](https://github.com/Shashank876747/DAOS-Cakes/actions/workflows/ci.yml)
[![CodeQL Analysis](https://github.com/Shashank876747/DAOS-Cakes/actions/workflows/codeql.yml/badge.svg)](https://github.com/Shashank876747/DAOS-Cakes/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](https://opensource.org/licenses/MIT)
[![React 19](https://img.shields.io/badge/React-19.0-61dafb.svg?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.1-38bdf8.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

DAOS Cakes is a production-grade, responsive web application for an artisanal custom cake bakery based in Smyrna, Georgia—proudly serving the Greater Atlanta and Cobb County communities. 

The application delivers a bespoke customer experience featuring real-time cake pricing calculators, interactive multi-step order configuration, instant Google Form pre-filling, secure client-side storage encryption, and comprehensive Georgia Cottage Food compliance information.

---

## 🎂 Key Features

- **🍰 Dynamic Cake Price Estimator**: Instant budget and pricing calculation with real-time feedback based on tier sizing, sponge types, specialty fillings, custom frostings, and decorative complexity.
- **📝 Interactive Order Builder**: Multi-step, validated order inquiry workflow with two-way real-time state synchronization between the price estimator and order forms.
- **🔗 Smart Google Form Prefilling**: Automatically translates selected cake specifications, dates, locations, and dietary needs into pre-populated Google Form submission URLs.
- **🔒 AES-GCM Encrypted Local Storage**: Implements browser-native Web Crypto API (`PBKDF2` + `AES-GCM 256-bit`) to protect draft order info and customer details stored client-side from plaintext exposure.
- **📅 Public Availability & Schedule**: Transparent live calendar of baker availability, standard turnaround times, and local pickup logistics.
- **🛡️ Food Safety & Georgia Cottage Food Permitted**: Direct disclosure of allergen protocols, kitchen sanitation practices, licensing information, and safe vehicle transport instructions.
- **📱 Responsive & Accessible**: Mobile-first design crafted with fluid layout animations, high-contrast typography, and intuitive touch targets.
- **🌐 SEO & Schema Structured Data**: Full OpenGraph tags, JSON-LD Schema markup, dynamic XML sitemaps, and robots configuration for high search engine visibility.

---

## 🗺️ Application Routes

| Route | Page | Purpose |
| :--- | :--- | :--- |
| `/` | **Home Page** | Showcase signature cakes, testimonials, bakery highlights, and hero booking CTA. |
| `/order` | **Order & Inquiry Page** | Multi-step interactive custom cake inquiry and booking workflow. |
| `/estimator` | **Price Estimator** | Real-time interactive cake pricing calculator and custom quote builder. |
| `/about` | **About DAOS** | Bakery history, culinary philosophy, ingredient standards, and baker credentials. |
| `/how-it-works` | **How It Works** | Step-by-step custom cake ordering process, timelines, and tasting guide. |
| `/faq` | **FAQ & Policies** | Common inquiries, deposit terms, cancellation policies, and transport recommendations. |
| `/contact` | **Contact** | Direct communication channels, pickup locations, and consultation inquiries. |

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5.8](https://www.typescriptlang.org/) (Strict Mode)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Motion](https://motion.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Cryptographic Security**: Native Web Crypto API (`SubtleCrypto` PBKDF2 / AES-GCM)
- **CI/CD**: GitHub Actions (Linting, Typechecking, CodeQL SAST, Netlify Continuous Deployment)

---

## 🔒 Security Architecture

This repository adheres to strict security standards verified by GitHub CodeQL:
- **Zero Plaintext Sensitive Storage**: User contact and draft estimate data in browser `localStorage` are encrypted using AES-GCM with PBKDF2-derived keys (`src/lib/storageSecurity.ts`).
- **Automated CodeQL SAST**: GitHub Actions continuously runs CodeQL analysis on push and pull request events to detect security regressions.
- **Content Security & Compliance**: Strict external asset headers and privacy-conscious cookie consent mechanisms.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20.x or higher recommended)
- `npm` (v10.x or higher)

### Installation & Local Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Shashank876747/DAOS-Cakes.git
   cd DAOS-Cakes
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Boots local Vite development server on `http://0.0.0.0:3000` |
| `npm run build` | Compiles and tree-shakes production assets into `/dist` |
| `npm run preview` | Runs a local preview server of the production build |
| `npm run lint` | Runs TypeScript type verification (`tsc --noEmit`) |

---

## 📂 Repository Structure

```
.
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml          # Structured bug report template
│   │   └── feature_request.yml     # Structured feature request template
│   ├── workflows/
│   │   ├── ci.yml                  # Automated TypeScript checks & build validation
│   │   ├── codeql.yml              # Automated GitHub CodeQL SAST security scanning
│   │   └── netlify.yml             # Automated Netlify continuous deployment
│   ├── dependabot.yml              # Weekly automated dependency maintenance
│   └── pull_request_template.md    # Standard PR review & security checklist
├── public/                         # Static assets, sitemaps, ads.txt, robots.txt
├── src/
│   ├── assets/                     # Imagery, logos, and gallery photography
│   ├── components/                 # Reusable UI components (Estimator, Forms, Navbar, Footer)
│   ├── data/                       # Bakery menus, pricing tiers, FAQs, and flavor catalogs
│   ├── lib/                        # Storage security (AES-GCM), Google Form integration helpers
│   ├── pages/                      # Application route pages (Home, Order, Estimator, About, etc.)
│   ├── types.ts                    # Global TypeScript models and interfaces
│   ├── App.tsx                     # Top-level application layout and route declarations
│   ├── index.css                   # Tailwind CSS global styles and theme variables
│   └── main.tsx                    # React application entry point
├── CONTRIBUTING.md                 # Contributor guidelines and workflow
├── LICENSE                         # MIT Open-Source License
├── SECURITY.md                     # Vulnerability reporting protocol
├── netlify.toml                    # Netlify routing and production configuration
├── package.json                    # Dependencies and scripts manifest
├── tsconfig.json                   # Strict TypeScript compiler options
└── vite.config.ts                  # Vite bundler and Tailwind configuration
```

---

## 🌐 Continuous Deployment & Environment Variables

When deploying to Netlify or custom hosting, configure the following optional environment variables in your deployment dashboard:

| Variable | Description |
| :--- | :--- |
| `VITE_LOCALSTORAGE_CRYPTO_KEY` | Custom encryption salt/key for client-side storage encryption |
| `NETLIFY_AUTH_TOKEN` | Netlify personal access token (used in GitHub Actions CI/CD) |
| `NETLIFY_SITE_ID` | Netlify Site API ID for continuous automated publishing |

---

## 📄 License & Contact

Distributed under the [MIT License](./LICENSE).

- **Bakery**: DAOS Cakes
- **Location**: Smyrna, Georgia (Serving Greater Atlanta & Cobb County)
- **Website**: [daoscakes.com](https://daoscakes.com)
