import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageCircle } from 'lucide-react';
import { FAQS } from '../data';

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white border-b border-stone-200 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-200">
            <HelpCircle className="w-3.5 h-3.5 text-amber-800" />
            <span>Got Questions?</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
            Everything you need to know about lead times, deposit terms, dietary notes, and pickup details.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'border-amber-300 bg-amber-50/30 shadow-xs'
                    : 'border-stone-200 bg-stone-50/50 hover:bg-stone-50'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-stone-900">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-amber-800 text-white' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-700 leading-relaxed border-t border-amber-100 font-normal">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions prompt */}
        <div className="mt-10 text-center p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
          <p className="text-xs sm:text-sm text-stone-700 font-medium">
            Have a custom design inquiry or special dietary request not listed here?
          </p>
          <a
            href="mailto:daoscakes2@gmail.com"
            className="inline-flex items-center gap-1.5 text-xs text-amber-800 hover:text-amber-900 font-bold underline"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Contact us directly at daoscakes2@gmail.com</span>
          </a>
        </div>

      </div>
    </section>
  );
}
