export interface MenuItem {
  id: string;
  name: string;
  category: 'signature' | 'treats';
  startingPrice: string;
  description: string;
  popular?: boolean;
  image?: string;
  tags?: string[];
}

export interface FlavorGuideItem {
  category: string;
  flavors: string[];
  fillings: string[];
  frostings: string[];
}

export interface OrderFormData {
  fullName: string;
  email: string;
  phone: string;
  eventDate: string;
  orderType: string;
  flavor: string;
  cakeSize: string;
  designNotes: string;
  contactMethod: 'email' | 'text' | 'both';
}

export interface OrderConfirmation {
  orderId: string;
  submittedAt: string;
  details: OrderFormData;
}
