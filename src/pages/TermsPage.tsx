import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function TermsPage() {
  useEffect(() => {
    document.title = 'Terms of Service - DAOS Cakes';
  }, []);

  return (
    <div className="py-12 sm:py-16 bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full bg-white border border-stone-200 hover:bg-amber-800 hover:text-white hover:border-amber-800 text-stone-700 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        <article className="bg-white p-6 sm:p-10 md:p-12 rounded-3xl border border-stone-200 shadow-xs space-y-8 text-stone-800">
          <header className="border-b border-stone-200 pb-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <FileText className="w-3.5 h-3.5" />
              <span>Legal Agreement</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-3">
              Terms of Service
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm mt-2">
              Effective Date: January 1, 2026 | Last Updated: October 5, 2026
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-stone-900">1. Acceptance of Terms</h2>
            <p className="text-stone-700 leading-relaxed text-sm">
              By accessing the DAOS Cakes website or placing a custom cake inquiry with us, you agree to comply with these Terms of Service and our{' '}
              <Link to="/privacy-policy" className="text-amber-800 font-semibold underline">
                Privacy Policy
              </Link>
              . If you do not agree with any part of these terms, please do not use our services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-stone-900">2. Custom Cake Orders &amp; Lead Times</h2>
            <p className="text-stone-700 leading-relaxed text-sm">
              All cakes are custom baked from scratch in small batches. Submitting an inquiry through our online order form or pricing estimator does not constitute a confirmed booking until we contact you directly to confirm flavor availability, date capacity, and final design specifications. We recommend at least 7 to 14 days advance notice for custom celebration cakes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-stone-900">3. Payment Policy (Cash on In-Person Pickup)</h2>
            <p className="text-stone-700 leading-relaxed text-sm">
              DAOS Cakes does not collect or process online payments through this website. Payment is due in full in person upon physical inspection and pickup in Smyrna, Georgia (Cash Only).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-stone-900">4. Pickup &amp; Safe Cake Transport</h2>
            <p className="text-stone-700 leading-relaxed text-sm">
              Pickups take place at our Smyrna, Georgia location within agreed appointment windows. Once a cake is inspected and handed over at pickup, the client assumes full responsibility for safe vehicle transport. As detailed in our{' '}
              <Link to="/cake-care-guide" className="text-amber-800 font-semibold underline">
                Cake Care &amp; Transport Guide
              </Link>
              , cakes must be placed flat on a level floorboard in a fully air-conditioned vehicle cabin—never on a tilted seat or inside a warm trunk.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-stone-900">5. Georgia Cottage Food &amp; Allergen Advisory</h2>
            <p className="text-stone-700 leading-relaxed text-sm">
              Our bakery operates in compliance with Georgia Department of Agriculture Cottage Food regulations in a home kitchen environment where common allergens—including wheat, eggs, dairy, soy, tree nuts, and peanuts—are present. While strict sanitary protocols are maintained, cross-contact may occur. Clients must notify us of any dietary sensitivities during consultation.
            </p>
          </section>

          <section className="space-y-4 border-t border-stone-200 pt-6">
            <h2 className="font-serif text-2xl font-bold text-stone-900">6. Contact Information</h2>
            <p className="text-stone-700 leading-relaxed text-sm">
              For questions regarding these Terms of Service, please reach out to us:
            </p>
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 text-xs sm:text-sm space-y-2 text-stone-800">
              <p className="font-serif font-bold text-base text-stone-900">DAOS Cakes (Operated by DAOS Florida LLC)</p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-800 shrink-0" />
                <span>Smyrna, Georgia 30080, USA</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-800 shrink-0" />
                <span>
                  Email:{' '}
                  <a href="mailto:daoscakes2@gmail.com" className="text-amber-800 font-bold underline">
                    daoscakes2@gmail.com
                  </a>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-800 shrink-0" />
                <span>Phone: (470) 476-1631 | (678) 235-8462</span>
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
