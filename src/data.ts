import { MenuItem, FlavorGuideItem } from './types';

export const SIGNATURE_CAKES: MenuItem[] = [
  {
    id: 'sig-1',
    name: 'Classic Celebration Layer Cake',
    category: 'signature',
    startingPrice: 'Starting at $65',
    description: 'Three tall layers of light, moist sponge paired with silky Swiss meringue buttercream. Perfect for birthdays and milestones.',
    popular: true,
    tags: ['Best Seller', '3-Tier Option Available']
  },
  {
    id: 'sig-2',
    name: 'Elegant Floral Palette Cake',
    category: 'signature',
    startingPrice: 'Starting at $75',
    description: 'Hand-piped buttercream flowers and subtle textured palette knife art tailored to your event color scheme.',
    popular: true,
    tags: ['Custom Artwork', 'Weddings & Showers']
  },
  {
    id: 'sig-3',
    name: 'Decadent Chocolate Fudge Cake',
    category: 'signature',
    startingPrice: 'Starting at $70',
    description: 'Rich dark chocolate sponge layers drizzled with silky ganache and whipped chocolate cream.',
    tags: ['Chocoholic Favorite']
  },
  {
    id: 'sig-4',
    name: 'Rustic Naked Berry Cake',
    category: 'signature',
    startingPrice: 'Starting at $60',
    description: 'Light vanilla bean sponge with semi-exposed edges, fresh seasonal berries, and vanilla cream.',
    tags: ['Fresh Berries', 'Rustic Style']
  }
];

export const DAILY_TREATS: MenuItem[] = [
  {
    id: 'treat-1',
    name: 'Gourmet Cupcake Dozen',
    category: 'treats',
    startingPrice: 'Starting at $36 / dozen',
    description: 'Freshly baked cupcakes topped with signature swirl buttercream and custom sprinkles.',
    popular: true,
    tags: ['Assorted Flavors']
  },
  {
    id: 'treat-2',
    name: 'French Macaron Box',
    category: 'treats',
    startingPrice: 'Starting at $28 / box of 12',
    description: 'Delicate almond meringue shells filled with handcrafted chocolate ganache or fruit curds.',
    tags: ['Naturally Gluten-Friendly']
  },
  {
    id: 'treat-3',
    name: 'Custom Mini Dessert Shooters',
    category: 'treats',
    startingPrice: 'Starting at $42 / dozen',
    description: 'Individual layered dessert cups featuring cheesecake, mousse, or shortcake flavors.',
    tags: ['Party Favorite']
  },
  {
    id: 'treat-4',
    name: 'Artisan Cake Pops & Cakesicles',
    category: 'treats',
    startingPrice: 'Starting at $38 / dozen',
    description: 'Moist cake bites dipped in premium chocolate and customized to match your theme.',
    tags: ['Custom Design']
  }
];

export const FLAVOR_GUIDE: FlavorGuideItem[] = [
  {
    category: 'Cake Sponges',
    flavors: ['Classic Vanilla Bean', 'Rich Chocolate Fudge', 'Red Velvet', 'Lemon Zest', 'Spiced Carrot', 'Confetti Vanilla'],
    fillings: ['Fresh Strawberry Compote', 'Salted Caramel Drizzle', 'Lemon Curd', 'Chocolate Ganache', 'Raspberry Jam', 'Vanilla Cream'],
    frostings: ['Vanilla Swiss Meringue', 'Chocolate Buttercream', 'Cream Cheese Frosting', 'Espresso Buttercream', 'Salted Caramel Buttercream']
  }
];
