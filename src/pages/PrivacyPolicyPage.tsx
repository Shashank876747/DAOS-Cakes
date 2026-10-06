import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cookie, ExternalLink, Lock, FileText, Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy - DAOS Cakes';
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
          {/* Policy Header */}
          <header className="border-b border-stone-200 pb-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Legal &amp; Privacy Disclosures</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-3">
              Privacy Policy for DAOS Cakes
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm mt-2">
              Effective Date: January 1, 2026 | Last Updated: October 5, 2026
            </p>
          </header>

          {/* Introduction */}
          <section className="space-y-3">
            <p className="text-base text-stone-700 leading-relaxed">
              At <strong>DAOS Cakes</strong> (accessible from{' '}
              <a href="https://daoscakes.pages.dev" className="text-amber-800 underline font-medium">
                https://daoscakes.pages.dev
              </a>{' '}
              and our official bakery pages), safeguarding the privacy of our visitors and customers is one of our highest priorities. This Privacy Policy document details the types of information collected and recorded by DAOS Cakes and how we use it in accordance with applicable privacy laws and Google Publisher Policies.
            </p>
            <p className="text-sm text-stone-600 leading-relaxed">
              If you have additional questions or require more information about our Privacy Policy, please contact us directly at{' '}
              <a href="mailto:daoscakes2@gmail.com" className="text-amber-800 font-semibold underline">
                daoscakes2@gmail.com
              </a>
              .
            </p>
          </section>

          {/* 1. Google AdSense & Third-Party Advertising Policy */}
          <section className="space-y-4 bg-amber-50/70 p-6 sm:p-8 rounded-2xl border border-amber-200">
            <div className="flex items-center gap-2.5">
              <Cookie className="w-6 h-6 text-amber-800 shrink-0" />
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                1. Google AdSense &amp; Third-Party Advertising (Cookie Policy)
              </h2>
            </div>
            <p className="text-stone-700 text-sm leading-relaxed">
              We use <strong>Google AdSense</strong> to display advertisements on our website. Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to our website or other websites on the Internet.
            </p>

            <div className="space-y-3 pt-2 text-sm text-stone-700">
              <div className="bg-white p-4 rounded-xl border border-amber-200/80 space-y-1.5">
                <h3 className="font-serif font-bold text-stone-900 text-base">
                  Google DoubleClick DART Cookie &amp; Advertising Cookies
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Google&apos;s use of advertising cookies (including the DoubleClick DART cookie) enables it and its partners to serve ads to our visitors based on their visit to DAOS Cakes and/or other sites on the Internet.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-amber-200/80 space-y-2">
                <h3 className="font-serif font-bold text-stone-900 text-base">
                  How to Opt Out of Personalized Advertising
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Visitors may opt out of personalized advertising or manage third-party cookie preferences at any time using these official portals:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-stone-700">
                  <li>
                    <strong>Google Ads Settings:</strong> Opt out of personalized advertising by visiting{' '}
                    <a
                      href="https://adssettings.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-amber-800 font-bold underline"
                    >
                      <span>https://adssettings.google.com/</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    .
                  </li>
                  <li>
                    <strong>How Google Uses Information from Partner Sites:</strong> Review Google&apos;s official data practices at{' '}
                    <a
                      href="https://policies.google.com/technologies/partner-sites"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-amber-800 font-bold underline"
                    >
                      <span>https://policies.google.com/technologies/partner-sites</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    .
                  </li>
                  <li>
                    <strong>Digital Advertising Alliance (AboutAds):</strong> Opt out of third-party vendor cookies for personalized advertising at{' '}
                    <a
                      href="https://www.aboutads.info/choices/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-amber-800 font-bold underline"
                    >
                      <span>https://www.aboutads.info/choices/</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    .
                  </li>
                  <li>
                    <strong>Network Advertising Initiative (NAI):</strong> Manage consumer opt-out preferences at{' '}
                    <a
                      href="https://optout.networkadvertising.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-amber-800 font-bold underline"
                    >
                      <span>https://optout.networkadvertising.org/</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    .
                  </li>
                  <li>
                    <strong>European Interactive Digital Advertising Alliance (EDAA):</strong> Visitors in the EEA, UK, and Switzerland may manage preferences at{' '}
                    <a
                      href="https://www.youronlinechoices.eu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-amber-800 font-bold underline"
                    >
                      <span>https://www.youronlinechoices.eu/</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    .
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. Standard Log Files */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-stone-900">2. Standard Log Files &amp; Analytics</h2>
            <p className="text-stone-700 text-sm leading-relaxed">
              DAOS Cakes follows standard procedures of using server log files and Google Analytics. These files log visitors when they access websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and click counts. This information is not linked to any personally identifiable information and is used strictly for analyzing trends, administering the site, ensuring security, and improving user experience.
            </p>
          </section>

          {/* 3. Our Advertising Partners */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-stone-900">3. Our Advertising Partners</h2>
            <p className="text-stone-700 text-sm leading-relaxed">
              Third-party ad servers or ad networks use technologies such as cookies, JavaScript, or Web Beacons in their respective advertisements and links that appear on DAOS Cakes, which are sent directly to users&apos; browsers. Our primary advertising partner is:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-stone-800 font-medium">
              <li>
                <strong>Google AdSense</strong> (Publisher ID: <code className="text-xs bg-stone-100 px-1.5 py-0.5 rounded">pub-3796452050933185</code> —{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-800 underline"
                >
                  Google Privacy Policy
                </a>
                )
              </li>
            </ul>
            <p className="text-xs text-stone-500 leading-relaxed">
              These technologies are used to measure the effectiveness of advertising campaigns and/or to personalize the advertising content that you see on websites that you visit. Note that DAOS Cakes has no access to or control over these cookies that are used by third-party advertisers.
            </p>
          </section>

          {/* 4. Cake Inquiries & Order Information */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-stone-900">4. Cake Inquiries &amp; Order Information</h2>
            <p className="text-stone-700 text-sm leading-relaxed">
              When you contact us or submit a custom cake inquiry via our order form, you voluntarily provide your name, phone number, email address, event date, guest count, and cake flavor/design specifications so we can prepare an accurate quote and schedule your pickup.
            </p>
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-700 space-y-1">
              <p className="flex items-center gap-2 font-bold text-stone-900">
                <Lock className="w-4 h-4 text-amber-800" />
                <span>Strict Payment Clarity (No Online Payment Collection)</span>
              </p>
              <p>
                DAOS Cakes does <em>not</em> process, store, or solicit credit card numbers, bank account details, or online financial credentials through this website. Payment is strictly conducted in person upon cake inspection and pickup in Smyrna, Georgia (Cash Only).
              </p>
            </div>
          </section>

          {/* 5. GDPR & CCPA Data Rights */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              5. Your Data Protection Rights (GDPR, CCPA &amp; US State Privacy)
            </h2>
            <p className="text-stone-700 text-sm leading-relaxed">
              We respect your data privacy rights under the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA/CPRA), and applicable state privacy laws:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm text-stone-700">
              <li>
                <strong>Right to Access:</strong> You have the right to request copies of the personal contact data you have submitted to us.
              </li>
              <li>
                <strong>Right to Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.
              </li>
              <li>
                <strong>Right to Erasure:</strong> You have the right to request that we delete your personal contact and inquiry records.
              </li>
              <li>
                <strong>Non-Sale of Personal Information:</strong> DAOS Cakes never sells, rents, or trades your personal contact details to third parties.
              </li>
            </ul>
          </section>

          {/* 6. Children's Information (COPPA) */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              6. Children&apos;s Information (COPPA Compliance)
            </h2>
            <p className="text-stone-700 text-sm leading-relaxed">
              Protecting children while using the internet is an important priority. DAOS Cakes does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you believe that your child has provided personal information on our website, please contact us immediately at{' '}
              <a href="mailto:daoscakes2@gmail.com" className="text-amber-800 underline font-medium">
                daoscakes2@gmail.com
              </a>{' '}
              and we will promptly remove such information from our records.
            </p>
          </section>

          {/* 7. Consent */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-stone-900">7. Consent</h2>
            <p className="text-stone-700 text-sm leading-relaxed">
              By using our website, you hereby consent to our Privacy Policy and agree to our{' '}
              <Link to="/terms" className="text-amber-800 font-semibold underline">
                Terms of Service
              </Link>
              .
            </p>
          </section>

          {/* 8. Contact Us */}
          <section className="space-y-4 border-t border-stone-200 pt-6">
            <h2 className="font-serif text-2xl font-bold text-stone-900">8. Contact Information</h2>
            <p className="text-stone-700 text-sm leading-relaxed">
              For privacy-related questions, data deletion requests, or bakery inquiries, please contact us:
            </p>
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 text-xs sm:text-sm space-y-2 text-stone-800">
              <p className="font-serif font-bold text-base text-stone-900">DAOS Cakes (Operated by DAOS Florida LLC)</p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-800 shrink-0" />
                <span>Smyrna, Georgia 30080, USA (Serving Greater Atlanta &amp; Cobb County)</span>
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
                <span>
                  Phone:{' '}
                  <a href="tel:4704761631" className="text-amber-800 font-medium underline">
                    (470) 476-1631
                  </a>{' '}
                  |{' '}
                  <a href="tel:6782358462" className="text-amber-800 font-medium underline">
                    (678) 235-8462
                  </a>
                </span>
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
