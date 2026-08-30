/**
 * Google Form Field Mappings for DAOS Cakes Official Order Form
 * Form URL: https://docs.google.com/forms/d/e/1FAIpQLSdQ7d5odCaliDzgkufvsD_hfwdhbi1meCHUyO_zMdgoLJVMwA/viewform
 */

export const GOOGLE_FORM_BASE_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdQ7d5odCaliDzgkufvsD_hfwdhbi1meCHUyO_zMdgoLJVMwA';
export const GOOGLE_FORM_VIEW_URL = `${GOOGLE_FORM_BASE_URL}/viewform`;
export const GOOGLE_FORM_RESPONSE_URL = `${GOOGLE_FORM_BASE_URL}/formResponse`;

export const GOOGLE_FORM_ENTRY_IDS = {
  // Section 1: Contact
  firstName: 'entry.498676495',
  lastName: 'entry.2074531224',
  email: 'entry.1918454948',
  phoneNumber: 'entry.1645644955',

  // Section 2: Order Details
  cakeType: 'entry.1010408185',        // Vanilla Sponge, Rich Chocolate, Red Velvet, Carrot Cake, Marble Sponge, etc.
  cakeSize: 'entry.1048914920',        // 4 INCH, 6 INCH, 8 INCH, 10 INCH, 12 INCH, 2-Tier, etc.
  icingType: 'entry.1147327316',       // American Buttercream, Swiss Meringue Buttercream, Chocolate Ganache, Fondant Finish, etc.
  occasion: 'entry.853164149',         // Birthday, Anniversary, Wedding, Staff Party, etc.
  colors: 'entry.278285100',           // e.g. Blue, Pastel Pink & Gold
  wordsOnCake: 'entry.1172096536',     // Inscription text

  // Section 3: Schedule a Call
  callDate: 'entry.1203167593',        // YYYY-MM-DD
  callTime: 'entry.1366075080',        // HH:MM

  // Section 4: Pickup Details
  pickupDate: 'entry.1461094710',      // YYYY-MM-DD
  pickupTime: 'entry.825733551',       // HH:MM
  location: 'entry.4230735'            // Pickup location name
} as const;

export interface GoogleFormOrderPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  cakeType?: string;
  cakeSize?: string;
  icingType?: string;
  occasion?: string;
  colors?: string;
  wordsOnCake?: string;
  callDate?: string;
  callTime?: string;
  pickupDate?: string;
  pickupTime?: string;
  location?: string;
}

/**
 * Generates a pre-filled Google Form URL from order / estimator specs
 */
export function buildPrefilledGoogleFormUrl(
  order: GoogleFormOrderPayload,
  options?: { embedded?: boolean }
): string {
  const params = new URLSearchParams();
  params.set('usp', 'pp_url');

  if (options?.embedded) {
    params.set('embedded', 'true');
  }

  // Populate known entries if present
  if (order.firstName) params.set(GOOGLE_FORM_ENTRY_IDS.firstName, order.firstName);
  if (order.lastName) params.set(GOOGLE_FORM_ENTRY_IDS.lastName, order.lastName);
  if (order.email) params.set(GOOGLE_FORM_ENTRY_IDS.email, order.email);
  if (order.phoneNumber) params.set(GOOGLE_FORM_ENTRY_IDS.phoneNumber, order.phoneNumber);

  if (order.cakeType) params.set(GOOGLE_FORM_ENTRY_IDS.cakeType, order.cakeType);
  if (order.cakeSize) params.set(GOOGLE_FORM_ENTRY_IDS.cakeSize, order.cakeSize);
  if (order.icingType) params.set(GOOGLE_FORM_ENTRY_IDS.icingType, order.icingType);
  if (order.occasion) params.set(GOOGLE_FORM_ENTRY_IDS.occasion, order.occasion);
  if (order.colors) params.set(GOOGLE_FORM_ENTRY_IDS.colors, order.colors);
  if (order.wordsOnCake) params.set(GOOGLE_FORM_ENTRY_IDS.wordsOnCake, order.wordsOnCake);

  if (order.callDate) params.set(GOOGLE_FORM_ENTRY_IDS.callDate, order.callDate);
  if (order.callTime) params.set(GOOGLE_FORM_ENTRY_IDS.callTime, order.callTime);
  if (order.pickupDate) params.set(GOOGLE_FORM_ENTRY_IDS.pickupDate, order.pickupDate);
  if (order.pickupTime) params.set(GOOGLE_FORM_ENTRY_IDS.pickupTime, order.pickupTime);
  if (order.location) params.set(GOOGLE_FORM_ENTRY_IDS.location, order.location);

  return `${GOOGLE_FORM_VIEW_URL}?${params.toString()}`;
}
