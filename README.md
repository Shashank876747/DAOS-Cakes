# DAOS Cakes - Custom Artisanal Cakes & Bakery

[![CI Verification](https://github.com/Shashank876747/DAOS-Cakes/actions/workflows/ci.yml/badge.svg)](https://github.com/Shashank876747/DAOS-Cakes/actions/workflows/ci.yml)
[![CodeQL](https://github.com/Shashank876747/DAOS-Cakes/actions/workflows/codeql.yml/badge.svg)](https://github.com/Shashank876747/DAOS-Cakes/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](https://opensource.org/licenses/MIT)

DAOS Cakes is a responsive, modern web application for a custom artisanal bakery in Smyrna, Georgia (serving Greater Atlanta & Cobb County). It features interactive cake sizing and pricing calculators, menu showcases, direct order inquiry workflows, public booking schedules, and search engine optimization.

---

## 🎂 Key Features

- **Interactive Menu & Flavor Catalog**: Browse cake bases, fillings, frostings, and signature tiered combinations.
- **Dynamic Price Estimator**: Real-time cake budget calculations based on servings, tiers, cake complexity, and custom design additions.
- **Embedded Order Inquiries**: Seamlessly connected order quote workflow.
- **Public Availability Schedule**: Transparent view of upcoming pickup slots and baker capacity.
- **Cottage Food Permitted & Food Safety Info**: Clear Georgia Cottage Food regulatory details, kitchen safety procedures, and transport tips.
- **Multi-Cloud Deployment & SEO Ready**: Configured for Cloudflare Pages and Netlify with automated XML sitemaps, structured JSON-LD schemas, and Google Search Console verification.
- **Google AdSense Monetization**: Clean auto ads integration and verified `ads.txt`.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Motion](https://motion.dev/)

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

- `npm run dev`: Launches the local development server on port 3000.
- `npm run build`: Compiles optimized production assets into `/dist`.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Performs TypeScript type checks without emitting code.

---

## 📂 Repository Structure

```
.
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml       # Structured bug report template
│   │   └── feature_request.yml  # Structured feature request template
│   ├── workflows/
│   │   ├── ci.yml               # Automated TypeScript checks & build CI
│   │   ├── codeql.yml           # Automated GitHub CodeQL SAST scanning
│   │   └── netlify.yml          # Automated Netlify continuous deployment
│   ├── dependabot.yml           # Weekly automated dependency maintenance
│   └── pull_request_template.md # Standard PR review checklist
├── public/                      # Static assets, sitemaps, ads.txt, robots.txt
├── src/
│   ├── assets/                  # High-resolution gallery and cake imagery
│   ├── components/              # Modular UI components (Navbar, Footer, Modals)
│   ├── data/                    # Bakery data, pricing, menus, FAQs
│   ├── types.ts                 # Global TypeScript models & interfaces
│   ├── App.tsx                  # Primary single-page layout
│   └── main.tsx                 # Client application mounting
├── .gitignore                   # Production-grade Git exclusions
├── CONTRIBUTING.md              # Contributor guidelines and workflow
├── LICENSE                      # MIT Open-Source License
├── netlify.toml                 # Netlify routing and build configuration
├── package.json                 # Project dependencies and script manifest
├── tsconfig.json                # Strict TypeScript configuration
└── vite.config.ts               # Vite configuration & Tailwind plugin
```

---

## 🌐 Continuous Deployment & Secrets

To enable automated deployments via GitHub Actions, add these repository secrets in **GitHub Repo > Settings > Secrets and variables > Actions**:

| Secret Name | Description |
| :--- | :--- |
| `NETLIFY_AUTH_TOKEN` | Personal access token from [Netlify User Settings](https://app.netlify.com/user/applications#personal-access-tokens) |
| `NETLIFY_SITE_ID` | API ID found under **Site configuration > General > Site details** on Netlify |

---

## 🔒 Security & Quality Assurance

- **CodeQL Security Analysis**: Automated CodeQL static code analysis on every push and weekly cron schedule.
- **Dependabot**: Automated updates for npm packages and GitHub Actions dependencies.
- **Security Policy**: Detailed vulnerability reporting protocol outlined in [`SECURITY.md`](./SECURITY.md).

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
