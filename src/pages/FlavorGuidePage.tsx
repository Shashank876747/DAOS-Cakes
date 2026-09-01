import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Utensils, CheckCircle, HelpCircle, ArrowRight, ShieldCheck, Star } from 'lucide-react';

export default function FlavorGuidePage() {
  const flavorProfiles = [
    {
      name: 'Madagascar Bourbon Vanilla Bean',
      badge: 'Classic Heritage',
      description: 'A light, ultra-moist sponge infused with pure Madagascar bourbon vanilla bean caviar. Exceptionally delicate crumb with a warm, floral aromatic profile.',
      pairings: ['Housemade Strawberry Compote', 'Swiss Meringue Buttercream', 'Lemon Curd', 'Salted Caramel'],
      bestFor: 'Weddings, First Birthdays, Elegant Showers'
    },
    {
      name: 'Decadent Belgian Dark Chocolate Fudge',
      badge: 'Signature Indulgence',
      description: 'Crafted using Dutch-process cocoa and melted Belgian bittersweet chocolate. Deeply rich, velvety, and intensely chocolatey without being cloying.',
      pairings: ['Belgian Dark Chocolate Ganache', 'Wild Raspberry Preserve', 'Espresso Mocha Buttercream', 'Salted Caramel'],
      bestFor: 'Milestone Birthdays, Chocoholic Celebrations, Anniversaries'
    },
    {
      name: 'Velvety Southern Red Velvet',
      badge: 'Southern Favorite',
      description: 'An authentic Southern classic featuring a subtle hint of cocoa, buttermilk tang, and a supremely tender, fine crumb.',
      pairings: ['Whipped Madagascar Cream Cheese Frosting', 'Vanilla Bean Buttercream', 'White Chocolate Silk'],
      bestFor: 'Romantic Celebrations, Holiday Events, Graduations'
    },
    {
      name: 'Zesty Meyer Lemon & Poppyseed',
      badge: 'Citrus Brightness',
      description: 'Freshly zested Meyer lemons and toasted poppy seeds deliver a bright, refreshing, sun-kissed sponge with balanced sweetness.',
      pairings: ['Tart Lemon Curd', 'Wild Blueberry Compote', 'Swiss Meringue Buttercream', 'White Almond Silk'],
      bestFor: 'Spring & Summer Weddings, Garden Parties, Bridal Showers'
    },
    {
      name: 'Spiced Georgia Pecan & Carrot',
      badge: 'Artisan Hearth',
      description: 'Freshly grated sweet carrots, toasted Georgia pecans, warm cinnamon, nutmeg, and ginger folded into a remarkably moist crumb.',
      pairings: ['Whipped Vanilla Cream Cheese Frosting', 'Salted Caramel Drizzle', 'Spiced Buttercream'],
      bestFor: 'Autumn Gatherings, Cozy Birthdays, Groom Cakes'
    },
    {
      name: 'Funfetti Celebration Birthday Sponge',
      badge: 'Festive Classic',
      description: 'Our signature Madagascar vanilla sponge baked with vibrant rainbow sprinkles that melt into cheerful bursts of color.',
      pairings: ['Sweet Vanilla Swiss Buttercream', 'Strawberry Compote', 'Whipped Milk Chocolate'],
      bestFor: 'Children & Adult Birthday Parties, Gender Reveals'
    }
  ];

  const fillingTypes = [
    {
      name: 'Housemade Fresh Fruit Compotes',
      details: 'Simmered in-house using ripe strawberries, wild raspberries, or blueberries with pure cane sugar and a squeeze of fresh lemon juice. Never artificial.',
      texture: 'Bright, fruity, luscious with soft fruit pieces'
    },
    {
      name: 'Silky European Buttercreams',
      details: 'Swiss Meringue Buttercream made from cooked egg whites, pure cane sugar, and high-butterfat sweet cream butter. Exceptionally silky and less sugary than American frosting.',
      texture: 'Velvety smooth, cloud-like melt-in-your-mouth'
    },
    {
      name: 'Belgian Chocolate Ganaches',
      details: 'Formulated from pure 54% dark or 33% white Belgian chocolate melted with heavy cream. Rich, glossy, and luxurious.',
      texture: 'Decadent, rich, fudgy consistency'
    },
    {
      name: 'Whipped Cream Cheese & Curds',
      details: 'Slowly whipped Philadelphia cream cheese infused with vanilla or scratch-cooked Meyer lemon curd made with fresh citrus juice and egg yolks.',
      texture: 'Tangy, creamy, exquisitely balanced'
    }
  ];

  return (
    <div className="py-8 md:py-16 space-y-16">
      {/* Hero Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-800" />
          <span>The DAOS Cakes Compendium</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-tight">
          Artisanal Cake Flavor &amp; Pairing Guide
        </h1>

        <p className="text-lg sm:text-xl text-stone-700 max-w-3xl mx-auto leading-relaxed font-normal">
          Explore our handcrafted sponge recipes, artisanal fruit compotes, and silky Swiss meringue frostings. Discover how we balance sweetness, acidity, and texture to create memorable celebration cakes.
        </p>
      </div>

      {/* Flavor Philosophy Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-amber-50 rounded-3xl p-8 sm:p-12 shadow-xl border border-stone-800 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-800 flex items-center justify-center text-amber-100">
              <Utensils className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">100% Scratch-Baked</h3>
            <p className="text-stone-300 text-sm leading-relaxed">
              We never use commercial cake mixes, artificial flavor oils, or premade bakery buckets. Every batter is whipped with genuine whole ingredients right before assembly.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-800 flex items-center justify-center text-amber-100">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">Balanced Sweetness</h3>
            <p className="text-stone-300 text-sm leading-relaxed">
              We favor Swiss Meringue Buttercream over overly sugary powdered sugar frostings. The result is a light, silky mouthfeel that lets authentic vanilla, chocolate, and fruit notes shine.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-800 flex items-center justify-center text-amber-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">Premium Sourcing</h3>
            <p className="text-stone-300 text-sm leading-relaxed">
              From real Madagascar Bourbon vanilla beans and Dutch-process Valrhona cocoa to fresh local dairy and Georgia pecans, quality ingredients define every bite.
            </p>
          </div>
        </div>
      </div>

      {/* Cake Sponges Breakdown */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Our Signature Cake Sponges
          </h2>
          <p className="text-stone-600 text-base">
            Each recipe has been refined through years of testing to ensure optimal moisture, crumb structure, and structural stability for multi-tiered event cakes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flavorProfiles.map((flavor, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-stone-200 hover:border-amber-300 transition-all shadow-xs flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold">
                  {flavor.badge}
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  {flavor.name}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {flavor.description}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-stone-100 text-xs">
                <div>
                  <span className="font-bold text-stone-800 block mb-1">Recommended Pairings:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {flavor.pairings.map((p, pIdx) => (
                      <span key={pIdx} className="bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-md">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-stone-500 italic">
                  <span className="font-medium text-stone-700 not-italic">Ideal for:</span> {flavor.bestFor}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fillings & Frostings Guide */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50/60 rounded-3xl p-8 sm:p-12 border border-amber-200/80 space-y-8">
          <div className="max-w-3xl space-y-2">
            <h2 className="font-serif text-3xl font-bold text-stone-900">
              Artisan Fillings &amp; Buttercreams
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              What goes between the layers is just as important as the sponge. We pair contrasting textures and moisture layers to elevate each slice.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {fillingTypes.map((fill, fIdx) => (
              <div key={fIdx} className="bg-white rounded-2xl p-6 border border-amber-100 shadow-2xs space-y-2.5">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-700 shrink-0" />
                  <h4 className="font-serif text-lg font-bold text-stone-900">{fill.name}</h4>
                </div>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {fill.details}
                </p>
                <div className="text-[11px] font-semibold text-amber-900 bg-amber-100/70 px-2.5 py-1 rounded-md inline-block">
                  Texture: {fill.texture}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dietary & Allergen Guidance */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">Dietary &amp; Allergen Transparency</h3>
              <p className="text-xs text-stone-500">Informed choices for you and your guests</p>
            </div>
          </div>

          <div className="space-y-4 text-stone-700 text-sm leading-relaxed">
            <p>
              <strong>Gluten-Friendly Options:</strong> Our handcrafted French Macarons are made with 100% pure California almond flour and egg whites, making them naturally gluten-free. We also prepare gluten-conscious cakes upon request.
            </p>
            <p>
              <strong>Nut Awareness:</strong> While several flavors do not contain tree nuts or peanuts, all items are produced in a licensed cottage home kitchen that also processes wheat, dairy, eggs, soy, and tree nuts. We take great care in sanitizing equipment between bakes.
            </p>
            <p>
              <strong>Custom Formulations:</strong> If someone in your party has specific ingredient sensitivities, let us know on your order inquiry form and we will advise on safe flavor recommendations.
            </p>
          </div>

          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-stone-500">
              Ready to design your custom flavor profile?
            </p>
            <Link
              to="/order"
              className="bg-amber-800 hover:bg-amber-900 text-amber-50 px-6 py-3 rounded-full font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
            >
              <span>Build Your Cake</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
