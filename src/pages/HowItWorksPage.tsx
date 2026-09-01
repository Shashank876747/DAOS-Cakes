import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  CheckCircle2,
  MapPin,
  FileText,
  PhoneCall,
  CalendarCheck,
  ShieldCheck,
  Palette,
  PackageCheck,
  Car
} from 'lucide-react';

export default function HowItWorksPage() {
  const detailedPhases = [
    {
      number: '01',
      icon: FileText,
      title: 'Inquiry & Concept Submission',
      subtitle: 'Tell Us Your Vision',
      description: 'Submit our simple online order form. Provide your celebration date, estimated guest count, flavor preferences, and any theme details, color palettes, or reference photos you love.'
    },
    {
      number: '02',
      icon: PhoneCall,
      title: 'Design Consultation & Transparent Quote',
      subtitle: 'Aligning on Every Detail',
      description: 'We review your request, verify calendar availability, and connect via text, phone, or email to discuss tier heights, custom toppers, color matching, and provide a clear, itemized price quote.'
    },
    {
      number: '03',
      icon: CalendarCheck,
      title: 'Date Reservation & Deposit',
      subtitle: 'Securing Your Baking Slot',
      description: 'Once you approve your quote, a 50% retainer locks your celebration date on our private weekly baking schedule. We only accept a limited number of orders per weekend to ensure artisan quality.'
    },
    {
      number: '04',
      icon: Palette,
      title: 'Fresh Scratch Baking & Handcrafting',
      subtitle: 'Small-Batch Artistry',
      description: 'In the 24 to 48 hours prior to your event, we whip fresh batters, simmer real fruit compotes, and craft your silky Swiss Meringue Buttercream. Every decorative element is applied by hand.'
    },
    {
      number: '05',
      icon: PackageCheck,
      title: 'Chilled Boxing & Structural Check',
      subtitle: 'Prepared for Safe Transit',
      description: 'Multi-tier cakes are stabilized with internal food-safe dowels. Your cake is chilled at optimal temperature and packaged in a heavy-duty, reinforced bakery box with non-slip base lining.'
    },
    {
      number: '06',
      icon: Car,
      title: 'Convenient Smyrna Pickup',
      subtitle: 'Ready for Your Celebration',
      description: 'Meet at your scheduled pickup window at our Smyrna, Georgia location. We personally walk you through care tips, vehicle placement, and serving temperature recommendations.'
    }
  ];

  return (
    <div className="py-8 md:py-16 space-y-16">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-200">
          <Clock className="w-3.5 h-3.5 text-amber-800" />
          <span>Step-by-Step Experience</span>
        </div>
        
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-tight">
          How Ordering Works
        </h1>
        
        <p className="text-lg sm:text-xl text-stone-700 max-w-3xl mx-auto leading-relaxed font-normal">
          From your initial inspiration photo to the final delicious slice, here is our complete artisanal custom cake ordering, baking, and pickup roadmap.
        </p>
      </div>

      {/* Detailed 6-Phase Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {detailedPhases.map((phase) => {
            const Icon = phase.icon;
            return (
              <div
                key={phase.number}
                className="bg-white rounded-3xl p-7 border border-stone-200 hover:border-amber-300 transition-all duration-300 flex flex-col justify-between shadow-xs space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-2xl font-bold text-amber-800/40">
                      Phase {phase.number}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      {phase.title}
                    </h3>
                    <p className="text-xs font-semibold text-amber-800 mb-2">
                      {phase.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                      {phase.description}
                    </p>
                  </div>
                </div>

                <div className="text-[11px] font-semibold text-stone-400 pt-3 border-t border-stone-100">
                  DAOS Quality Standard
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Banner */}
        <div className="mt-10 p-8 rounded-3xl bg-stone-900 text-stone-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-800 text-amber-200 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="font-serif font-bold text-white text-base sm:text-lg">
                Limited Weekly Baking Schedule
              </p>
              <p className="text-xs sm:text-sm text-stone-400">
                To guarantee maximum attention to detail, we cap our bookings each week. We recommend reaching out 2–3 weeks in advance.
              </p>
            </div>
          </div>

          <Link
            to="/order"
            className="px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all whitespace-nowrap shadow-md"
          >
            Start Order Form
          </Link>
        </div>
      </div>

      {/* Pickup Information & Policy Callout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">Pickup Logistics in Smyrna, Georgia</h3>
              <p className="text-xs text-stone-500">Serving Smyrna, Cobb County, Vinings, and Greater Atlanta</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-stone-700">
            <div className="space-y-2.5 bg-stone-50 p-6 rounded-2xl border border-stone-200/70">
              <h4 className="font-bold text-stone-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-800" />
                <span>Lead Times &amp; Rush Orders</span>
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Standard orders require 1 to 2 weeks notice. Elaborate multi-tiered cakes require 3 to 4 weeks. If you need a last-minute cake within 5–7 days, submit an inquiry and we will check if an opening is available.
              </p>
            </div>

            <div className="space-y-2.5 bg-stone-50 p-6 rounded-2xl border border-stone-200/70">
              <h4 className="font-bold text-stone-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-800" />
                <span>Transparent Payment Terms</span>
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                A 50% non-refundable retainer reserves your date. The remaining balance is completed prior to or upon pickup via electronic invoice, Zelle, Venmo, or cash.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <Link
              to="/order"
              className="bg-amber-800 hover:bg-amber-900 text-amber-50 px-8 py-3.5 rounded-full font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
            >
              <span>Proceed to Order Form</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/cake-care-guide"
              className="bg-stone-100 hover:bg-stone-200 text-stone-800 px-6 py-3.5 rounded-full font-semibold text-sm border border-stone-300 transition-all"
            >
              <span>View Transport &amp; Care Guide</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
