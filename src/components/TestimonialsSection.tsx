import React from 'react';
import { Star, Heart, Quote, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-200">
            <Heart className="w-3.5 h-3.5 text-amber-800 fill-amber-800" />
            <span>Client Reviews</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Loved by Sweet Celebrations
          </h2>

          <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
            Read what our clients say about our artisanal cake designs, scratch-baked flavors, and attentive service.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-3xl p-7 border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Top Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-amber-200/80" />
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal italic">
                  "{testimonial.comment}"
                </p>
              </div>

              {/* Author & Event Details */}
              <div className="pt-6 mt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-stone-900">
                    {testimonial.author}
                  </h4>
                  <p className="text-[11px] text-stone-500">{testimonial.role} • {testimonial.event}</p>
                </div>

                <span className="text-[10px] text-stone-400 font-mono">
                  {testimonial.date}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
