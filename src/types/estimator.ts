export interface EstimatorOrderDetails {
  // Question 1: Cake Size & Servings
  cakeSize: string;
  cakeSizeOther?: string;
  // Question 2: Cake Flavor / Sponge
  cakeType: string;
  cakeTypeOther?: string;
  // Question 3: Icing Type & Finish
  icingType: string;
  icingTypeOther?: string;
  // Question 4: Occasion
  occasion: string;
  occasionOther?: string;
  // Question 5: Colors / Palette Theme
  colors: string;
  // Question 6: Words on Cake / Inscription
  wordsOnCake: string;
  // Question 7: Gourmet Inner Filling
  filling: string;
  fillingOther?: string;
  // Question 8: Pickup Location / Delivery
  pickupLocation: string;
  deliveryAddress?: string;
  // Question 9: Dietary & Allergy Requirements
  allergies: string;
  allergiesOther?: string;
  // Question 10: Cake Aesthetic & Custom Design Notes
  cakeStyle: string;
  customDesignNotes?: string;
  // Question 11: Contact Details
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;

  // Optional legacy / schedule fields
  pickupDate?: string;
  pickupTimeWindow?: string;
  pickupTimeWindowOther?: string;

  // Calculation metadata
  estimatedTotal: number;
  depositAmount: number;
  pricePerServing: string;
  marketRateAdjustment: number;
  lastSyncedAt: string;
}

