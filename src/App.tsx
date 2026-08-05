import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import OrderFormSection from './components/OrderFormSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-amber-200 selection:text-amber-900 flex flex-col">
      <Header />
      <main className="grow">
        <HeroSection />
        <OrderFormSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
