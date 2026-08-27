import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Camera, Clock, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="py-8 md:py-16 space-y-12 bg-stone-50">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-200">
          <Phone className="w-3.5 h-3.5 text-amber-800" />
          <span>Get in Touch</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          Contact DAOS Cakes
        </h1>

        <p className="text-lg text-stone-700 max-w-2xl mx-auto leading-relaxed">
          We are here to help you plan the centerpiece for your birthday, wedding, anniversary, or special event in Smyrna, GA and the Greater Atlanta area.
        </p>
      </div>

      {/* Main Contact Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Phone Numbers Card */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-xs">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">Direct Phone</h3>
            <p className="text-xs text-stone-500">Call or text us for questions or urgent inquiry checks.</p>
            
            <div className="space-y-2 pt-2 text-sm font-semibold">
              <div>
                <a
                  href="tel:4704761631"
                  className="text-amber-800 hover:text-amber-900 text-base font-bold block"
                >
                  (470) 476-1631
                </a>
                <span className="text-xs text-stone-500 font-normal">Primary Line</span>
              </div>

              <div className="pt-1">
                <a
                  href="tel:6782358462"
                  className="text-amber-800 hover:text-amber-900 text-base font-bold block"
                >
                  (678) 235-8462
                </a>
                <span className="text-xs text-stone-500 font-normal">Secondary Line</span>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-800 flex items-center justify-center shadow-xs">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">Email Inquiry</h3>
            <p className="text-xs text-stone-500">Send inspiration photos or event questions directly to our inbox.</p>
            
            <div className="pt-2 text-sm">
              <a
                href="mailto:daoscakes2@gmail.com"
                className="text-amber-800 hover:text-amber-900 font-bold break-all block text-base"
              >
                daoscakes2@gmail.com
              </a>
              <span className="text-xs text-stone-500 mt-1 block">Replies typically within 24 hours</span>
            </div>
          </div>

          {/* Instagram / Social Card */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-700 flex items-center justify-center shadow-xs">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">Instagram Gallery</h3>
            <p className="text-xs text-stone-500">View recent custom designs, floral palette cakes, and customer creations.</p>
            
            <div className="pt-2 text-sm">
              <a
                href="https://www.instagram.com/daoscakes/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-800 hover:text-amber-900 font-bold block text-base"
              >
                @daoscakes
              </a>
              <span className="text-xs text-stone-500 mt-1 block">Follow our latest bakery bakes</span>
            </div>
          </div>

        </div>
      </div>

      {/* Pickup Location & Hours Card */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">Bakery Location &amp; Service Area</h3>
                <p className="text-xs text-stone-500">Smyrna, Georgia 30080 • Serving Greater Atlanta &amp; Cobb County</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 text-stone-800 text-xs font-semibold">
              <Clock className="w-4 h-4 text-stone-600" />
              <span>Pickup By Scheduled Appointment</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-stone-700">
            <div className="space-y-2 bg-stone-50 p-6 rounded-2xl border border-stone-200/70">
              <h4 className="font-bold text-stone-900 text-base">Pickup Guidelines</h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-stone-600 list-disc pl-5">
                <li>Pickups are coordinated directly after your cake design is confirmed.</li>
                <li>Please transport cakes on a flat surface (car floorboard with A/C running).</li>
                <li>Payment is conducted in person upon pickup (Cash Only).</li>
              </ul>
            </div>

            <div className="space-y-3 bg-amber-50/70 p-6 rounded-2xl border border-amber-200 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-stone-900 text-base">Ready to Place Your Order?</h4>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                  Fill out our online order form with your flavor, size, and date preferences to reserve your slot.
                </p>
              </div>
              <div>
                <Link
                  to="/order"
                  className="bg-amber-800 hover:bg-amber-900 text-amber-50 px-6 py-2.5 rounded-full font-bold text-xs shadow-xs transition-all inline-flex items-center gap-2"
                >
                  <span>Open Order Form</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
