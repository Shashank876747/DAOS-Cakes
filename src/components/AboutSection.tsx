import React from 'react';
import { Heart, ChefHat } from 'lucide-react';
import treatsImage from '../assets/images/daos_baker_treats_1785892816667.jpg';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image & Visual Card */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Background Accent */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-amber-200 to-amber-100 rounded-3xl blur-md opacity-60 -z-10" />

              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-stone-100">
                <img
                  src={treatsImage}
                  alt="DAOS Cakes - Artisan Home Baker Treats"
                  className="w-full h-[380px] sm:h-[440px] object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-stone-900/90 backdrop-blur-md p-4 rounded-xl text-amber-50 border border-stone-700 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-800 text-amber-100 flex items-center justify-center shrink-0">
                    <ChefHat className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-white">Handcrafted with Pride</h4>
                    <p className="text-xs text-stone-300">Small-batch artisanal home baking.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2 text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 text-amber-800 fill-amber-800" />
              <span>Passionate Home Baker</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-snug">
              Meet the Baker Behind DAOS Cakes
            </h2>

            {/* Warm paragraph about a passionate home baker */}
            <p className="text-stone-700 text-base sm:text-lg font-normal leading-relaxed">
              Welcome to DAOS Cakes! What started as a lifelong love for baking and decorating has grown into a cherished home bakery. I am a passionate home baker dedicated to bringing joy to your sweetest celebrations. Every custom cake, cupcake, and pastry is handcrafted from scratch using premium ingredients, timeless recipes, and meticulous attention to detail. Whether you are celebrating a birthday, baby shower, or intimate gathering, my goal is to deliver a dessert that looks stunning and tastes incredible.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
