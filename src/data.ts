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
    answer: 'We recommend submitting your order request at least 2 to 3 weeks in advance. Because we are a small-batch artisanal home bakery, our dates fill up quickly — especially for weekend celebrations. For short notice (under 7 days), submit a form and we will check our availability!',
    category: 'ordering'
  },
  {
    id: 'faq-2',
    question: 'How does the ordering & payment process work?',
    answer: '1) Submit the online Cake Order Form with your preferred date, size, and flavor ideas. 2) We will confirm availability and send your custom invoice. 3) A 50% non-refundable deposit secures your date. 4) The remaining balance is due prior to or at pickup.',
    category: 'ordering'
  },
  {
    id: 'faq-3',
    question: 'Do you offer gluten-friendly or dietary accommodations?',
    answer: 'Yes! Our French Macarons are naturally gluten-free (made with 100% almond flour). We can also prepare gluten-friendly and nut-conscious cake sponges upon request. Please note baked goods are prepared in a kitchen that handles wheat, dairy, eggs, and nuts.',
    category: 'flavors'
  },
  {
    id: 'faq-4',
    question: 'Where and when do I pick up my cake?',
    answer: 'Pickup is coordinated from our Smyrna, Georgia home kitchen in a sanitized, temperature-controlled environment. We provide specific pickup time windows. We recommend transporting cakes on the flat floorboard of an air-conditioned vehicle rather than on a car seat.',
    category: 'pickup'
  },
  {
    id: 'faq-5',
    question: 'What is Georgia Cottage Food compliance?',
    answer: 'DAOS Cakes operates in compliance with Georgia Cottage Food regulations (Georgia Department of Agriculture). We adhere strictly to sanitary standards, food safety protocols, and proper packaging and labeling for all homemade baked delicacies.',
    category: 'compliance'
  }
];

