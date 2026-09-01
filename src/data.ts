import { MenuItem, FlavorGuideItem } from './types';
import heroImage from './assets/images/daos_hero_cake_1785892806355.jpg';
import floralTierImage from './assets/images/cake_floral_tier_1787010328090.jpg';
import chocDelightImage from './assets/images/cake_choc_delight_1787010339320.jpg';
import treatsImage from './assets/images/daos_baker_treats_1785892816667.jpg';

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  rating: number;
  comment: string;
  event: string;
  date: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'ordering' | 'flavors' | 'pickup' | 'compliance';
}

export const SIGNATURE_CAKES: MenuItem[] = [
  {
    id: 'sig-1',
    name: 'Classic Celebration Layer Cake',
    category: 'signature',
    startingPrice: 'Starting at $65',
    description: 'Three tall layers of light, moist sponge paired with silky Swiss meringue buttercream and custom color accents.',
    popular: true,
    image: heroImage,
    tags: ['Best Seller', '10-24 Servings', 'Customizable Colors']
  },
  {
    id: 'sig-2',
    name: 'Artisanal Floral Tiered Cake',
    category: 'signature',
    startingPrice: 'Starting at $145',
    description: 'Two to three tiered masterpiece featuring textured ivory buttercream, edible organic blooms, and delicate gold leaf leafing.',
    popular: true,
    image: floralTierImage,
    tags: ['Weddings & Showers', '35-75 Servings', 'Luxury Gold Leaf']
  },
  {
    id: 'sig-3',
    name: 'Gourmet Chocolate Drip & Macarons',
    category: 'signature',
    startingPrice: 'Starting at $75',
    description: 'Rich Valrhona dark chocolate sponge, silky Belgian fudge ganache drip, topped with handcrafted French macarons and berries.',
    popular: true,
    image: chocDelightImage,
    tags: ['Chocoholic Favorite', 'Macaron Crown', '12-24 Servings']
  },
  {
    id: 'sig-4',
    name: 'Rustic Naked Berry & Cream Cake',
    category: 'signature',
    startingPrice: 'Starting at $65',
    description: 'Light Madagascar vanilla bean sponge with semi-exposed crumb edges, filled with strawberry compote and mountain of fresh berries.',
    image: treatsImage,
    tags: ['Fresh Seasonal Berries', 'Rustic Aesthetic', '10-20 Servings']
  }
];

export const DAILY_TREATS: MenuItem[] = [
  {
    id: 'treat-1',
    name: 'Gourmet Swirl Cupcakes (Dozen)',
    category: 'treats',
    startingPrice: '$36 / dozen',
    description: 'Moist single-serving cupcakes topped with towering Swiss buttercream swirls, custom sprinkles, or edible pearls.',
    popular: true,
    tags: ['Party Favorite', 'Assorted Flavors']
  },
  {
    id: 'treat-2',
    name: 'Handcrafted French Macaron Box',
    category: 'treats',
    startingPrice: '$28 / box of 12',
    description: 'Delicate almond meringue shells filled with chocolate ganache, salted caramel, pistachio, and raspberry curd.',
    tags: ['Naturally Gluten-Friendly', 'Gift Ready']
  },
  {
    id: 'treat-3',
    name: 'Custom Theme Cake Pops & Cakesicles',
    category: 'treats',
    startingPrice: '$38 / dozen',
    description: 'Rich cake truffle dough shaped, dipped in Belgian white chocolate, and custom-styled with glitter, drizzle, and charms.',
    tags: ['Kids & Favors', 'Individually Wrapped']
  },
  {
    id: 'treat-4',
    name: 'Artisan Dessert Shooter Cups',
    category: 'treats',
    startingPrice: '$42 / dozen',
    description: 'Miniature dessert glasses featuring layers of cheesecake crumble, berry mousse, and chocolate shortcake.',
    tags: ['Dessert Table Hit', 'Spoon Included']
  }
];

export const FLAVOR_GUIDE: FlavorGuideItem[] = [
  {
    category: 'Cake Sponges',
    flavors: [
      'Madagascar Vanilla Bean',
      'Decadent Belgian Chocolate Fudge',
      'Velvety Southern Red Velvet',
      'Zesty Lemon & Poppyseed',
      'Spiced Carrot with Pecans',
      'Funfetti Celebration Sprinkles',
      'Rich Caramelized Brown Sugar'
    ],
    fillings: [
      'Housemade Fresh Strawberry Compote',
      'Flaked Sea Salt & Caramel Drizzle',
      'Tart Lemon Curd',
      'Belgian Dark Chocolate Ganache',
      'Wild Raspberry Preserve',
      'Silky Vanilla Bean Custard Cream',
      'Whipped Cream Cheese Filling'
    ],
    frostings: [
      'Silky Swiss Meringue Buttercream',
      'Rich Whipped Chocolate Buttercream',
      'Velvet Cream Cheese Frosting',
      'Espresso Mocha Buttercream',
      'Salted Caramel Swiss Meringue',
      'Pure White Almond Buttercream'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    author: 'Jessica M.',
    role: 'Bride',
    rating: 5,
    comment: 'DAOS Cakes made our wedding cake dreams come true! The two-tier floral cake was not only the centerpiece of our reception, but guests are still raving about the strawberry compote filling weeks later.',
    event: 'Wedding Reception',
    date: 'July 2026'
  },
  {
    id: 't-2',
    author: 'David & Sofia R.',
    role: 'Parents',
    rating: 5,
    comment: 'Ordered a custom theme cake and 2 dozen cupcakes for our son’s 1st birthday. The attention to detail and texture was remarkable. Booking through the form was effortless and pickup was smooth!',
    event: '1st Birthday Celebration',
    date: 'August 2026'
  },
  {
    id: 't-3',
    author: 'Elena T.',
    role: 'Event Host',
    rating: 5,
    comment: 'The chocolate drip cake with macarons was absolute perfection. Fresh, decadent, and not overly sweet. You can tell real passion goes into every single bake.',
    event: '30th Milestone Birthday',
    date: 'June 2026'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How far in advance should I place my custom cake order?',
    answer: 'We recommend submitting your order inquiry at least 2 to 4 weeks in advance for standard celebration cakes and 2 to 6 months for tiered wedding cakes. Because we operate as an artisanal, small-batch home bakery in Smyrna, GA, our weekly calendar fills up quickly. If your event is sooner (within 7 days), please still submit the form — we will gladly check if we have an open baking slot!',
    category: 'ordering'
  },
  {
    id: 'faq-2',
    question: 'How does the ordering & payment process work?',
    answer: 'The process is simple and transparent: 1) Fill out our online Cake Order Form detailing your date, guest count, flavor preferences, and inspiration photos. 2) We will contact you with a customized quote and design confirmation. 3) A 50% non-refundable deposit secures your date on our calendar. 4) The remaining balance is due prior to or at pickup.',
    category: 'ordering'
  },
  {
    id: 'faq-3',
    question: 'What methods of payment do you accept?',
    answer: 'We accept secure digital payments including Zelle, Apple Pay, Venmo, credit cards via electronic invoice, and cash upon pickup. Your booking deposit is processed electronically with an itemized invoice detailing your design specifications.',
    category: 'ordering'
  },
  {
    id: 'faq-4',
    question: 'Can you recreate a specific Pinterest or Instagram cake design?',
    answer: 'Yes! We love drawing inspiration from your reference photos, mood boards, party themes, and invitations. Please note that every cake artist has a unique hand and medium; while we capture the exact color palette, floral style, texture, and aesthetic of your inspiration, we also bring our signature artisanal scratch craftsmanship to the final piece.',
    category: 'flavors'
  },
  {
    id: 'faq-5',
    question: 'What makes Swiss Meringue Buttercream different from regular grocery store frosting?',
    answer: 'Traditional American frosting relies on powdered confectioner sugar and shortening, resulting in an overly sweet, gritty texture. We exclusively use Swiss Meringue Buttercream — crafted by gently whipping pasteurized egg whites and pure cane sugar into a glossy meringue, then slowly beating in Grade-AA sweet cream butter. It has approximately 50% less perceived sweetness, a cloud-like texture, and melts like silk on the tongue.',
    category: 'flavors'
  },
  {
    id: 'faq-6',
    question: 'Do you offer gluten-friendly or dietary accommodations?',
    answer: 'Yes! Our handcrafted French Macarons are naturally 100% gluten-free (made with almond flour). We can also prepare gluten-conscious and nut-conscious cake sponges upon request. Please note that our kitchen is a licensed Georgia Cottage bakery that also handles wheat, dairy, eggs, and nuts, so we cannot guarantee a certified medical celiac environment.',
    category: 'flavors'
  },
  {
    id: 'faq-7',
    question: 'Where and when do I pick up my custom cake?',
    answer: 'Scheduled pickups take place at our home bakery in Smyrna, Georgia (serving Cobb County, Vinings, Marietta, and Greater Atlanta). We coordinate a 30-minute pickup window with you so your cake is freshly boxed and chilled at ideal transport temperature.',
    category: 'pickup'
  },
  {
    id: 'faq-8',
    question: 'What is the safest way to transport my cake in a car?',
    answer: 'Always place the cake box on the completely flat floorboard of your vehicle (preferably the front passenger floorboard) with the vehicle air conditioner set to cold. Never place a cake on a slanted car seat, in a passenger lap, or in an unventilated hot car trunk. Drive gently and take turns with care.',
    category: 'pickup'
  },
  {
    id: 'faq-9',
    question: 'How should I store the cake before my event and when should it be served?',
    answer: 'Keep the cake in its box inside your refrigerator until approximately 1.5 to 2 hours before serving. Custom buttercreams are made with real butter and taste best when enjoyed at room temperature (around 68°F–70°F), allowing the crumb to soften and the flavor notes to fully develop.',
    category: 'pickup'
  },
  {
    id: 'faq-10',
    question: 'What is Georgia Cottage Food compliance?',
    answer: 'DAOS Cakes operates under the Georgia Department of Agriculture Cottage Food Law. We maintain strict sanitization standards, food safety protocols, clear ingredient disclosures, and sanitary packaging. All cakes are produced with pride in a dedicated, inspected home kitchen environment.',
    category: 'compliance'
  },
  {
    id: 'faq-11',
    question: 'How do you ensure multi-tier cakes remain stable during transport and display?',
    answer: 'Every tiered cake is engineered with food-grade internal center dowels and individual tier cake boards. This structural framework supports the weight of upper tiers, ensuring the cake remains plumb, level, and secure throughout your celebration.',
    category: 'compliance'
  },
  {
    id: 'faq-12',
    question: 'Can you provide matching treats like cupcakes and macarons for dessert tables?',
    answer: 'Absolutely! We offer gourmet swirl cupcakes, handcrafted French macarons, cake pops, and dessert shooter cups tailored to match your cake theme, color palette, and event branding for stunning dessert table spreads.',
    category: 'flavors'
  }
];

