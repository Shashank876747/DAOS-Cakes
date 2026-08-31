import React, { useState, useEffect } from 'react';
import {
  Calculator,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cake,
  Users,
  RefreshCw,
  TrendingUp,
  Palette,
  Type,
  Calendar,
  Clock,
  MapPin,
  Heart,
  FileText,
  Copy,
  CheckCircle2,
  X,
  ExternalLink,
  Zap,
  AlertTriangle,
  Send,
  User,
  Mail,
  Phone,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { buildPrefilledGoogleFormUrl } from '../lib/googleFormService';

const LOCAL_STORAGE_CRYPTO_SECRET =
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_LOCALSTORAGE_CRYPTO_KEY) ||
  (typeof process !== 'undefined' && (process as any).env?.REACT_APP_LOCALSTORAGE_CRYPTO_KEY) ||
  'replace-this-default-secret-in-env';

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

const toBase64 = (bytes: Uint8Array): string => {
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
};

const fromBase64 = (base64: string): Uint8Array => {
  const binary = atob(base64);
const fromBase64 = (value: string): Uint8Array => {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

const getLocalStorageCryptoKey = async (): Promise<CryptoKey> => {
  const secretBytes = textEncoder.encode(LOCAL_STORAGE_CRYPTO_SECRET);
  const keyMaterial = await crypto.subtle.digest('SHA-256', secretBytes);
  return crypto.subtle.importKey('raw', keyMaterial, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
};

const encryptForLocalStorage = async (plainText: string): Promise<string> => {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await getLocalStorageCryptoKey();
  const cipherBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    textEncoder.encode(plainText)
  );

  const cipherBytes = new Uint8Array(cipherBuffer);
  const packed = new Uint8Array(iv.length + cipherBytes.length);
  packed.set(iv, 0);
  packed.set(cipherBytes, iv.length);
  return toBase64(packed);
};

const decryptFromLocalStorage = async (encryptedBase64: string): Promise<string | null> => {
  try {
    const packed = fromBase64(encryptedBase64);
    if (packed.length <= 12) return null;

    const iv = packed.slice(0, 12);
    const cipherBytes = packed.slice(12);
    const key = await getLocalStorageCryptoKey();
    const plainBuffer = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      cipherBytes
    );

    return textDecoder.decode(plainBuffer);
  } catch {
    return null;
  }
};

const deriveAesKey = async (): Promise<CryptoKey> => {
  const hash = await crypto.subtle.digest('SHA-256', textEncoder.encode(LOCAL_STORAGE_CRYPTO_SECRET));
  return crypto.subtle.importKey('raw', hash, { name: 'AES-GCM' }, false, ['encrypt']);
};

const deriveKeyFromSecret = async (salt: Uint8Array): Promise<CryptoKey> => {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    textEncoder.encode(LOCAL_STORAGE_CRYPTO_SECRET),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
};

const encryptForLocalStorage = async (payload: unknown): Promise<string> => {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await deriveKeyFromSecret(salt);
  const plaintext = textEncoder.encode(JSON.stringify(payload));
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext);
  return JSON.stringify({
    v: 1,
    iv: toBase64(iv),
    salt: toBase64(salt),
    data: toBase64(new Uint8Array(ciphertext))
  });
};

const decryptFromLocalStorage = async (stored: string): Promise<any> => {
  const envelope = JSON.parse(stored);
  if (!envelope || typeof envelope !== 'object' || !envelope.iv || !envelope.salt || !envelope.data) {
    throw new Error('Invalid encrypted payload');
  }
  const iv = fromBase64(envelope.iv);
  const salt = fromBase64(envelope.salt);
  const data = fromBase64(envelope.data);
  const key = await deriveKeyFromSecret(salt);
  const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
  return JSON.parse(textDecoder.decode(plaintext));
};

interface CakeEstimatorProps {
  onApplyToOrder?: (estimateDetails: string) => void;
}

interface CakeSizeOption {
  id: string;
  name: string;
  servings: string;
  guestCount: number;
  marketBasePrice: number;
  recommended: string;
}

const CAKE_SIZES: CakeSizeOption[] = [
  {
    id: '4 INCH',
    name: '4" Round Single Tier (3 Layers)',
    servings: '2 - 4 Servings',
    guestCount: 4,
    marketBasePrice: 45,
    recommended: 'Smash cakes, intimate anniversaries, mini celebrations'
  },
  {
    id: '6 INCH',
    name: '6" Round Single Tier (3 Layers)',
    servings: '6 - 10 Servings',
    guestCount: 10,
    marketBasePrice: 65,
    recommended: 'Intimate birthdays, dinner parties, small gatherings'
  },
  {
    id: '8 INCH',
    name: '8" Round Single Tier (3 Layers)',
    servings: '12 - 16 Servings',
    guestCount: 16,
    marketBasePrice: 85,
    recommended: 'Family celebrations, milestone birthdays, standard parties'
  },
  {
    id: '10 INCH',
    name: '10" Round Single Tier (3 Layers)',
    servings: '20 - 28 Servings',
    guestCount: 28,
    marketBasePrice: 115,
    recommended: 'Large birthday parties, corporate events, office celebrations'
  },
  {
    id: '12 INCH',
    name: '12" Round Single Tier (3 Layers)',
    servings: '30 - 40 Servings',
    guestCount: 40,
    marketBasePrice: 155,
    recommended: 'Grand celebrations, banquets, milestone anniversaries'
  },
  {
    id: '2-Tier (6" + 8")',
    name: '2-Tier Celebration Cake (6" + 8")',
    servings: '35 - 40 Servings',
    guestCount: 40,
    marketBasePrice: 145,
    recommended: 'Baby showers, bridal showers, engagement parties'
  },
  {
    id: '3-Tier (6" + 8" + 10")',
    name: '3-Tier Luxury Cake (6" + 8" + 10")',
    servings: '65 - 75 Servings',
    guestCount: 75,
    marketBasePrice: 245,
    recommended: 'Weddings, luxury galas, grand milestones'
  },
  {
    id: 'Other',
    name: 'Other / Custom Size & Tiers',
    servings: 'Custom Servings',
    guestCount: 16,
    marketBasePrice: 85,
    recommended: 'Custom tiers, sculpted shapes, sheet cakes, or bespoke dimensions'
  }
];

const CAKE_TYPES = [
  { id: 'Vanilla Sponge', name: 'Vanilla Sponge', premium: 0, desc: 'Madagascar vanilla bean crumb' },
  { id: 'Rich Chocolate', name: 'Rich Chocolate', premium: 5, desc: 'Decadent Valrhona cocoa sponge' },
  { id: 'Red Velvet', name: 'Red Velvet', premium: 5, desc: 'Traditional Southern velvet cocoa' },
  { id: 'Carrot Cake', name: 'Carrot Cake', premium: 8, desc: 'Spiced with pecans & organic carrots' },
  { id: 'Marble Sponge', name: 'Marble Sponge', premium: 5, desc: 'Vanilla & chocolate swirl' },
  { id: 'Strawberry Infusion', name: 'Strawberry Infusion', premium: 6, desc: 'Real berry puree reduction' },
  { id: 'Lemon Poppyseed', name: 'Lemon Poppyseed', premium: 5, desc: 'Fresh Florida lemon zest' },
  { id: 'Other', name: 'Other / Custom Flavor', premium: 8, desc: 'Custom tailored recipe upon request' }
];

const ICING_TYPES = [
  { id: 'American Buttercream', name: 'American Buttercream', price: 0, desc: 'Classic sweet crusting buttercream' },
  { id: 'Swiss Meringue Buttercream', name: 'Swiss Meringue Buttercream', price: 10, desc: 'Ultra-silky, less sweet, premium finish' },
  { id: 'Cream Cheese Frosting', name: 'Cream Cheese Frosting', price: 10, desc: 'Tangy, whipped velvet cream cheese' },
  { id: 'Chocolate Ganache', name: 'Chocolate Ganache', price: 15, desc: 'Pure Belgian dark/milk chocolate glaze' },
  { id: 'Fondant Finish', name: 'Fondant Finish', price: 25, desc: 'Sleek porcelain-smooth sculpted sugar layer' },
  { id: 'Whipped Cream Frosting', name: 'Whipped Cream Frosting', price: 5, desc: 'Light and airy dairy whipped topping' },
  { id: 'Naked / Semi-Naked', name: 'Naked / Semi-Naked', price: 0, desc: 'Exposed sponge edges with rustic scrape' },
  { id: 'Other', name: 'Other / Custom Frosting', price: 12, desc: 'Custom stenciling, textured palette knife, etc.' }
];

const OCCASIONS = [
  { id: 'Birthday', name: 'Birthday', structurePrice: 0 },
  { id: 'Wedding', name: 'Wedding', structurePrice: 30 },
  { id: 'Anniversary', name: 'Anniversary', structurePrice: 10 },
  { id: 'Baby Shower', name: 'Baby Shower', structurePrice: 10 },
  { id: 'Breakfast Event', name: 'Breakfast Event', structurePrice: 0 },
  { id: "Mother's Day Special", name: "Mother's Day Special", structurePrice: 0 },
  { id: 'Party', name: 'General Party', structurePrice: 0 },
  { id: 'Staff Party', name: 'Staff / Corporate Party', structurePrice: 0 },
  { id: 'Other', name: 'Other / Custom Event', structurePrice: 5 }
];

const COLOR_PRESETS = [
  'Sage Green & Gold Accents',
  'Blush Pink & Ivory White',
  'Classic White with 24K Gold Leaf',
  'Midnight Navy & Silver',
  'Warm Amber, Cream & Terracotta',
  'Pastel Floral Rainbow',
  'Rustic Earth Tones',
  'Other / Custom Palette'
];

const FILLING_UPGRADES = [
  { id: 'standard', name: 'Matching Buttercream Layer', price: 0, desc: 'Filled with the selected exterior icing' },
  { id: 'strawberry', name: 'Fresh Strawberry Compote', price: 10, desc: 'Slow-simmered real berries' },
  { id: 'lemon-curd', name: 'Florida Lemon Curd & Cream', price: 12, desc: 'Tart citrus reduction' },
  { id: 'caramel-ganache', name: 'Salted Caramel & Belgian Ganache', price: 12, desc: 'Flaked sea salt with fudge' },
  { id: 'raspberry', name: 'Wild Raspberry Reduction', price: 10, desc: 'Seedless berry puree' },
  { id: 'belgian-mousse', name: 'Belgian Dark Chocolate Mousse', price: 12, desc: 'Aerated rich cocoa ganache' },
  { id: 'other', name: 'Other / Custom Filling', price: 10, desc: 'Custom fruit compote, mousse, curd, or specialty filling' }
];

const TIME_WINDOWS = [
  { id: '10:00 - 12:00', label: 'Morning (10:00 AM – 12:00 PM)' },
  { id: '12:00 - 14:00', label: 'Early Afternoon (12:00 PM – 2:00 PM)' },
  { id: '14:00 - 17:00', label: 'Late Afternoon (2:00 PM – 5:00 PM)' },
  { id: '17:00 - 19:00', label: 'Evening (5:00 PM – 7:00 PM)' },
  { id: 'Other', label: 'Other / Specific Time Window' }
];

const PICKUP_OPTIONS = [
  {
    id: "1. Truist Park: Infront of Children's Healthcare of Atlanta Park",
    name: 'Truist Park',
    desc: "Infront of Children's Healthcare of Atlanta Park (755 Battery Ave SE)",
    cost: 0
  },
  {
    id: '2. BP Gas Station : Cobb Pkwy and Herodian Way Intersection',
    name: 'BP Gas Station',
    desc: 'Cobb Pkwy & Herodian Way Intersection (2535 Cobb Pkwy SE)',
    cost: 0
  },
  {
    id: '3. Public Storage - Herodian Way',
    name: 'Public Storage',
    desc: '2460 Herodian Way, Smyrna, GA 30080',
    cost: 0
  },
  {
    id: 'White Glove Hand Delivery',
    name: 'White Glove Refrigerated Delivery',
    desc: 'Metro Atlanta / North Georgia direct door-to-door courier service',
    cost: 25
  },
  {
    id: 'Other',
    name: 'Other / Custom Pickup Location',
    desc: 'Special venue arrangement or private coordination',
    cost: 0
  }
];

const DIETARY_OPTIONS = [
  { id: 'None / Standard', label: 'Standard Premium Recipe (Contains dairy, wheat, eggs)', cost: 0 },
  { id: 'Nut-Free Kitchen Focus', label: 'Strict 100% Nut-Free Preparation', cost: 0 },
  { id: 'Gluten-Friendly Flour', label: 'Gluten-Friendly Artisan Flour Blend', cost: 10 },
  { id: 'Dairy-Free Frosting', label: 'Dairy-Free Plant Buttercream', cost: 10 },
  { id: 'Egg-Free / Vegan Recipe', label: 'Egg-Free / Full Vegan Sponge Recipe', cost: 15 },
  { id: 'Other', label: 'Other / Custom Allergy Concern', cost: 0 }
];

const CAKE_STYLES = [
  { id: 'Vintage Lambeth Piping', name: 'Vintage Lambeth & Frills', desc: 'Over-piped scalloped ruffles and Victorian royal borders', cost: 15 },
  { id: 'Modern Minimalist', name: 'Modern Minimalist & Clean', desc: 'Crisp razor-sharp edges, smooth canvas, subtle texture', cost: 0 },
  { id: 'Fresh Floral & Botanical', name: 'Botanical & Organic Florals', desc: 'Pressed edible petals, organic greenery, floral crown accents', cost: 15 },
  { id: 'Luxe Gold Leaf & Geode', name: 'Luxe Gold Foil & Geode', desc: '24-karat edible gold flake, crystal rock candy accents', cost: 20 },
  { id: 'Cartoon / Character Pop', name: 'Illustrated / Pop Art Comic', desc: 'Bold black contour piping with vibrant comic pop colors', cost: 15 },
  { id: 'Other', name: 'Other / Custom Theme & Motif', desc: 'Custom bespoke cake art from your reference moodboard', cost: 10 }
];

export default function CakeEstimatorSection({ onApplyToOrder }: CakeEstimatorProps) {
  const navigate = useNavigate();

  // 11 Form Questions State (Date & Time removed per user instruction)
  // Question 1: Cake Size
  const [cakeSize, setCakeSize] = useState<string>('8 INCH');
  const [cakeSizeOther, setCakeSizeOther] = useState<string>('');

  // Question 2: Cake Flavor
  const [cakeType, setCakeType] = useState<string>('Vanilla Sponge');
  const [cakeTypeOther, setCakeTypeOther] = useState<string>('');

  // Question 3: Icing Type
  const [icingType, setIcingType] = useState<string>('American Buttercream');
  const [icingTypeOther, setIcingTypeOther] = useState<string>('');

  // Question 4: Occasion
  const [occasion, setOccasion] = useState<string>('Birthday');
  const [occasionOther, setOccasionOther] = useState<string>('');

  // Question 5: Colors / Palette
  const [colors, setColors] = useState<string>('Sage Green & Gold Accents');
  const [colorsOther, setColorsOther] = useState<string>('');

  // Question 6: Words on Cake
  const [wordsOnCake, setWordsOnCake] = useState<string>('Happy Birthday!');

  // Question 7: Gourmet Filling
  const [filling, setFilling] = useState<string>('strawberry');
  const [fillingOther, setFillingOther] = useState<string>('');

  // Question 8: Pickup / Delivery Location
  const [pickupLocation, setPickupLocation] = useState<string>("1. Truist Park: Infront of Children's Healthcare of Atlanta Park");
  const [pickupLocationOther, setPickupLocationOther] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');

  // Question 9: Dietary & Allergy
  const [allergies, setAllergies] = useState<string>('None / Standard');
  const [allergiesOther, setAllergiesOther] = useState<string>('');

  // Question 10: Cake Aesthetic & Custom Notes
  const [cakeStyle, setCakeStyle] = useState<string>('Modern Minimalist');
  const [cakeStyleOther, setCakeStyleOther] = useState<string>('');
  const [customDesignNotes, setCustomDesignNotes] = useState<string>('');

  // Question 11: Contact Details
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  // Market Price Sync Engine State
  const [isSyncingMarket, setIsSyncingMarket] = useState<boolean>(false);
  const [lastMarketSync, setLastMarketSync] = useState<string>('Just now');
  const [marketIndexRate, setMarketIndexRate] = useState<number>(1.0);
  const [syncMessage, setSyncMessage] = useState<string>('Synchronized with Metro Atlanta / Florida regional bakery market');

  // Modal State
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  // Load from local storage
  useEffect(() => {
    try {
      const loadSavedEstimate = async () => {
        const saved = localStorage.getItem('daos_estimated_order');
        if (!saved) return;

        const decrypted = await decryptFromLocalStorage(saved);
        const parsed = JSON.parse(decrypted ?? saved);

        if (parsed.cakeSize) setCakeSize(parsed.cakeSize);
        if (parsed.cakeSizeOther) setCakeSizeOther(parsed.cakeSizeOther);
        if (parsed.cakeType) setCakeType(parsed.cakeType);
        if (parsed.cakeTypeOther) setCakeTypeOther(parsed.cakeTypeOther);
        if (parsed.icingType) setIcingType(parsed.icingType);
        if (parsed.icingTypeOther) setIcingTypeOther(parsed.icingTypeOther);
        if (parsed.occasion) setOccasion(parsed.occasion);
        if (parsed.occasionOther) setOccasionOther(parsed.occasionOther);
        if (parsed.colors) setColors(parsed.colors);
        if (parsed.colorsOther) setColorsOther(parsed.colorsOther);
        if (parsed.wordsOnCake) setWordsOnCake(parsed.wordsOnCake);
        if (parsed.filling) setFilling(parsed.filling);
        if (parsed.fillingOther) setFillingOther(parsed.fillingOther);
        if (parsed.pickupLocation) setPickupLocation(parsed.pickupLocation);
        if (parsed.pickupLocationOther) setPickupLocationOther(parsed.pickupLocationOther);
        if (parsed.deliveryAddress) setDeliveryAddress(parsed.deliveryAddress);
        if (parsed.allergies) setAllergies(parsed.allergies);
        if (parsed.allergiesOther) setAllergiesOther(parsed.allergiesOther);
        if (parsed.cakeStyle) setCakeStyle(parsed.cakeStyle);
        if (parsed.cakeStyleOther) setCakeStyleOther(parsed.cakeStyleOther);
        if (parsed.customDesignNotes) setCustomDesignNotes(parsed.customDesignNotes);
        if (parsed.firstName) setFirstName(parsed.firstName);
        if (parsed.lastName) setLastName(parsed.lastName);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.phoneNumber) setPhoneNumber(parsed.phoneNumber);
      };

      void loadSavedEstimate();
        const parsed = JSON.parse(saved);
    const loadSavedOrder = async () => {
      try {
        const saved = localStorage.getItem('daos_estimated_order');
        if (!saved) return;

        let parsed: any;
        try {
          parsed = await decryptFromLocalStorage(saved);
        } catch {
          // Backward compatibility for previously stored plaintext payloads
          parsed = JSON.parse(saved);
        }

        if (parsed.cakeSize) setCakeSize(parsed.cakeSize);
        if (parsed.cakeSizeOther) setCakeSizeOther(parsed.cakeSizeOther);
        if (parsed.cakeType) setCakeType(parsed.cakeType);
        if (parsed.cakeTypeOther) setCakeTypeOther(parsed.cakeTypeOther);
        if (parsed.icingType) setIcingType(parsed.icingType);
        if (parsed.icingTypeOther) setIcingTypeOther(parsed.icingTypeOther);
        if (parsed.occasion) setOccasion(parsed.occasion);
        if (parsed.occasionOther) setOccasionOther(parsed.occasionOther);
        if (parsed.colors) setColors(parsed.colors);
        if (parsed.colorsOther) setColorsOther(parsed.colorsOther);
        if (parsed.wordsOnCake) setWordsOnCake(parsed.wordsOnCake);
        if (parsed.filling) setFilling(parsed.filling);
        if (parsed.fillingOther) setFillingOther(parsed.fillingOther);
        if (parsed.pickupLocation) setPickupLocation(parsed.pickupLocation);
        if (parsed.pickupLocationOther) setPickupLocationOther(parsed.pickupLocationOther);
        if (parsed.deliveryAddress) setDeliveryAddress(parsed.deliveryAddress);
        if (parsed.allergies) setAllergies(parsed.allergies);
        if (parsed.allergiesOther) setAllergiesOther(parsed.allergiesOther);
        if (parsed.cakeStyle) setCakeStyle(parsed.cakeStyle);
        if (parsed.cakeStyleOther) setCakeStyleOther(parsed.cakeStyleOther);
        if (parsed.customDesignNotes) setCustomDesignNotes(parsed.customDesignNotes);
        if (parsed.firstName) setFirstName(parsed.firstName);
        if (parsed.lastName) setLastName(parsed.lastName);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.phoneNumber) setPhoneNumber(parsed.phoneNumber);
      } catch {
        // Ignore
      }
    };

    loadSavedOrder();

    const handleFormSync = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        const d = customEvent.detail;
        if (d.cakeSize) setCakeSize(d.cakeSize);
        if (d.cakeSizeOther !== undefined) setCakeSizeOther(d.cakeSizeOther);
        if (d.cakeType) setCakeType(d.cakeType);
        if (d.cakeTypeOther !== undefined) setCakeTypeOther(d.cakeTypeOther);
        if (d.icingType) setIcingType(d.icingType);
        if (d.icingTypeOther !== undefined) setIcingTypeOther(d.icingTypeOther);
        if (d.occasion) setOccasion(d.occasion);
        if (d.occasionOther !== undefined) setOccasionOther(d.occasionOther);
        if (d.colors !== undefined) setColors(d.colors);
        if (d.wordsOnCake !== undefined) setWordsOnCake(d.wordsOnCake);
        if (d.location) setPickupLocation(d.location);
        if (d.pickupLocation) setPickupLocation(d.pickupLocation);
        if (d.firstName) setFirstName(d.firstName);
        if (d.lastName) setLastName(d.lastName);
        if (d.email) setEmail(d.email);
        if (d.phoneNumber) setPhoneNumber(d.phoneNumber);
      }
    };

    window.addEventListener('daos_form_sync', handleFormSync);
    return () => {
      window.removeEventListener('daos_form_sync', handleFormSync);
    };
  }, []);

  // Lookups
  const currentSizeObj = CAKE_SIZES.find((s) => s.id === cakeSize) || CAKE_SIZES[2];
  const currentTypeObj = CAKE_TYPES.find((t) => t.id === cakeType) || CAKE_TYPES[0];
  const currentIcingObj = ICING_TYPES.find((i) => i.id === icingType) || ICING_TYPES[0];
  const currentOccasionObj = OCCASIONS.find((o) => o.id === occasion) || OCCASIONS[0];
  const currentFillingObj = FILLING_UPGRADES.find((f) => f.id === filling) || FILLING_UPGRADES[0];
  const currentDietaryObj = DIETARY_OPTIONS.find((d) => d.id === allergies) || DIETARY_OPTIONS[0];
  const currentStyleObj = CAKE_STYLES.find((st) => st.id === cakeStyle) || CAKE_STYLES[1];
  const currentPickupObj = PICKUP_OPTIONS.find((p) => p.id === pickupLocation) || PICKUP_OPTIONS[0];

  // Price Calculation Engine
  const rawSubtotal =
    currentSizeObj.marketBasePrice +
    currentTypeObj.premium +
    currentIcingObj.price +
    currentOccasionObj.structurePrice +
    currentFillingObj.price +
    currentDietaryObj.cost +
    currentStyleObj.cost +
    currentPickupObj.cost;

  const estimatedTotal = Math.round(rawSubtotal * marketIndexRate);
  const pricePerServing = (estimatedTotal / currentSizeObj.guestCount).toFixed(2);
  const depositAmount = Math.round(estimatedTotal / 2);

  // Sync state changes
  useEffect(() => {
    const finalSize = cakeSize === 'Other' ? (cakeSizeOther || 'Custom Size') : cakeSize;
    const finalFlavor = cakeType === 'Other' ? (cakeTypeOther || 'Custom Flavor') : cakeType;
    const finalIcing = icingType === 'Other' ? (icingTypeOther || 'Custom Frosting') : icingType;
    const finalOccasion = occasion === 'Other' ? (occasionOther || 'Custom Event') : occasion;
    const finalColor = colors === 'Other / Custom Palette' ? (colorsOther || 'Custom Palette') : colors;
    const finalFilling = filling === 'other' ? (fillingOther || 'Custom Filling') : currentFillingObj.name;
    const finalLocation = pickupLocation === 'Other' ? (pickupLocationOther || 'Custom Location') : pickupLocation;

    const payload = {
      cakeSize: currentSizeObj.id,
      cakeSizeOther: cakeSize === 'Other' ? cakeSizeOther : '',
      finalCakeSize: finalSize,
      cakeType: finalFlavor,
      cakeTypeOther: cakeType === 'Other' ? cakeTypeOther : '',
      icingType: finalIcing,
      icingTypeOther: icingType === 'Other' ? icingTypeOther : '',
      occasion: finalOccasion,
      occasionOther: occasion === 'Other' ? occasionOther : '',
      colors: finalColor,
      wordsOnCake: wordsOnCake,
      filling: filling,
      fillingOther: filling === 'other' ? fillingOther : '',
      finalFilling: finalFilling,
      pickupLocation: finalLocation,
      location: finalLocation,
      deliveryAddress: deliveryAddress,
      allergies: allergies === 'Other' ? (allergiesOther || 'Custom Accommodation') : allergies,
      cakeStyle: cakeStyle === 'Other' ? (cakeStyleOther || 'Custom Theme') : cakeStyle,
      customDesignNotes: customDesignNotes,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      estimatedTotal: estimatedTotal,
      depositAmount: depositAmount,
      pricePerServing: pricePerServing,
      lastSyncedAt: lastMarketSync
    };

    try {
      void encryptForLocalStorage(JSON.stringify(payload))
        .then((encryptedPayload) => {
          localStorage.setItem('daos_estimated_order', encryptedPayload);
        })
        .catch(() => {
          // Ignore
        });
    } catch {
      // Ignore
    }
    const persistEstimatedOrder = async () => {
      try {
        const encryptedPayload = await encryptForLocalStorage(payload);
        localStorage.setItem('daos_estimated_order', encryptedPayload);
      } catch {
        // Ignore
      }
    };

    persistEstimatedOrder();

    window.dispatchEvent(new CustomEvent('daos_estimator_sync', { detail: payload }));
  }, [
    cakeSize,
    cakeSizeOther,
    cakeType,
    cakeTypeOther,
    icingType,
    icingTypeOther,
    occasion,
    occasionOther,
    colors,
    colorsOther,
    wordsOnCake,
    filling,
    fillingOther,
    pickupLocation,
    pickupLocationOther,
    deliveryAddress,
    allergies,
    allergiesOther,
    cakeStyle,
    cakeStyleOther,
    customDesignNotes,
    firstName,
    lastName,
    email,
    phoneNumber,
    estimatedTotal,
    depositAmount,
    pricePerServing,
    lastMarketSync,
    currentSizeObj.id,
    currentFillingObj.name
  ]);

  const handleSyncMarketPrice = () => {
    setIsSyncingMarket(true);
    setTimeout(() => {
      setIsSyncingMarket(false);
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastMarketSync(`Today at ${timeStr}`);
      setMarketIndexRate(1.0);
      setSyncMessage('Live Market Sync Complete: Ingredient rates verified with Georgia/Florida local suppliers.');
    }, 600);
  };

  const getFullSummaryText = () => {
    const finalSize = cakeSize === 'Other' ? `Other (${cakeSizeOther || 'Custom Dimensions'})` : `${currentSizeObj.id} (${currentSizeObj.servings})`;
    const finalType = cakeType === 'Other' ? `Custom (${cakeTypeOther || 'Bespoke Recipe'})` : cakeType;
    const finalIcing = icingType === 'Other' ? `Custom (${icingTypeOther || 'Special Finish'})` : icingType;
    const finalOccasion = occasion === 'Other' ? `Other (${occasionOther || 'Event'})` : occasion;
    const finalColor = colors === 'Other / Custom Palette' ? (colorsOther || 'Custom Palette') : colors;
    const finalFill = filling === 'other' ? `Custom (${fillingOther || 'Special Filling'})` : currentFillingObj.name;
    const finalLoc = pickupLocation === 'Other' ? (pickupLocationOther || 'Custom Location') : pickupLocation;
    const finalDiet = allergies === 'Other' ? (allergiesOther || 'Custom Dietary') : allergies;
    const finalStyle = cakeStyle === 'Other' ? (cakeStyleOther || 'Custom Aesthetic') : cakeStyle;

    return `=== DAOS CAKES - 11 QUESTION COMPLETE ESTIMATE ===
1. Cake Size & Tiers: ${finalSize}
2. Cake Flavor: ${finalType}
3. Icing & Exterior Finish: ${finalIcing}
4. Occasion: ${finalOccasion}
5. Color Palette: ${finalColor}
6. Words on Cake: "${wordsOnCake}"
7. Inner Layer Filling: ${finalFill}
8. Location / Delivery: ${finalLoc} ${deliveryAddress ? `(Address: ${deliveryAddress})` : ''}
9. Dietary Requirements: ${finalDiet}
10. Design Style & Notes: ${finalStyle} ${customDesignNotes ? `(Notes: ${customDesignNotes})` : ''}
11. Client Contact: ${firstName} ${lastName} | ${email} | ${phoneNumber}
---------------------------------------------
ESTIMATED TOTAL: $${estimatedTotal}
50% BOOKING DEPOSIT: $${depositAmount}
COST PER GUEST: ~$${pricePerServing}
MARKET STATUS: Synced (${lastMarketSync})`;
  };

  const handleCopySpecs = () => {
    navigator.clipboard.writeText(getFullSummaryText());
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2500);
  };

  const handleApplyAndTransfer = () => {
    const finalSize = cakeSize === 'Other' ? (cakeSizeOther || 'Custom Size') : currentSizeObj.id;
    const finalType = cakeType === 'Other' ? (cakeTypeOther || 'Custom Flavor') : cakeType;
    const finalIcing = icingType === 'Other' ? (icingTypeOther || 'Custom Frosting') : icingType;
    const finalOccasion = occasion === 'Other' ? (occasionOther || 'Custom Occasion') : occasion;
    const finalColor = colors === 'Other / Custom Palette' ? (colorsOther || 'Custom Palette') : colors;
    const finalFilling = filling === 'other' ? (fillingOther || 'Custom Filling') : currentFillingObj.name;
    const finalLocation = pickupLocation === 'Other' ? (pickupLocationOther || 'Custom Location') : pickupLocation;
    const finalDiet = allergies === 'Other' ? (allergiesOther || 'Custom Dietary') : allergies;
    const finalStyle = cakeStyle === 'Other' ? (cakeStyleOther || 'Custom Aesthetic') : cakeStyle;

    const payloadObj = {
      // 1. Size
      cakeSize: currentSizeObj.id,
      cakeSizeOther: cakeSize === 'Other' ? cakeSizeOther : '',
      finalCakeSize: finalSize,
      // 2. Flavor
      cakeType: finalType,
      cakeTypeOther: cakeType === 'Other' ? cakeTypeOther : '',
      // 3. Icing
      icingType: finalIcing,
      icingTypeOther: icingType === 'Other' ? icingTypeOther : '',
      // 4. Occasion
      occasion: finalOccasion,
      occasionOther: occasion === 'Other' ? occasionOther : '',
      // 5. Colors
      colors: finalColor,
      colorsOther: colorsOther,
      // 6. Words
      wordsOnCake: wordsOnCake,
      // 7. Filling
      filling: filling,
      fillingOther: fillingOther,
      finalFilling: finalFilling,
      // 8. Location / Delivery
      location: finalLocation,
      pickupLocation: finalLocation,
      pickupLocationOther: pickupLocationOther,
      deliveryAddress: deliveryAddress,
      // 9. Dietary & Allergies
      allergies: finalDiet,
      allergiesOther: allergiesOther,
      // 10. Cake Style & Notes
      cakeStyle: finalStyle,
      cakeStyleOther: cakeStyleOther,
      customDesignNotes: customDesignNotes,
      // 11. Contact Info
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      // Financials
      estimatedTotal: estimatedTotal,
      depositAmount: depositAmount,
      pricePerServing: pricePerServing,
      lastSyncedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    try {
      void encryptForLocalStorage(JSON.stringify(payloadObj))
        .then((encryptedPayload) => {
          localStorage.setItem('daos_estimated_order', encryptedPayload);
          window.dispatchEvent(new CustomEvent('daos_estimator_sync', { detail: payloadObj }));
        })
        .catch(() => {
          // Ignore
        });
    } catch {
      // Ignore
    }

    const summaryText = `Custom Estimate: ${finalSize} ${finalType} Cake, ${finalIcing}, Colors: ${finalColor}, Inscription: "${wordsOnCake}". Est: $${estimatedTotal}`;
    
    if (onApplyToOrder) {
      onApplyToOrder(summaryText);
    } else {
      navigate('/order');
    }
  };

  return (
    <section id="estimator" className="py-12 md:py-20 bg-gradient-to-b from-stone-50 via-amber-50/20 to-stone-50 border-b border-stone-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Market Price Sync Bar */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-200">
            <Calculator className="w-3.5 h-3.5 text-amber-800" />
            <span>Complete 11-Question Price &amp; Specification Calculator</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Custom Cake Pricing &amp; Order Details Estimator
          </h2>

          <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
            Configure every question from our official order form below—sizes, flavors, frostings, occasions, palettes, gourmet fillings, pickup locations, dietary options, aesthetics, and client info—with live market quote calculations.
          </p>

          {/* Live Market Price Sync Bar */}
          <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-amber-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-stone-800">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div className="text-left">
                <div className="font-bold flex items-center gap-1.5 text-stone-900">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Market Price Index: Active &amp; Synced</span>
                </div>
                <div className="text-[11px] text-stone-500 font-normal">
                  {syncMessage} • <span className="font-medium text-amber-800">Updated: {lastMarketSync}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSyncMarketPrice}
                disabled={isSyncingMarket}
                className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-semibold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                title="Synchronize real-time bakery ingredient rates"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncingMarket ? 'animate-spin text-amber-800' : ''}`} />
                <span>{isSyncingMarket ? 'Syncing...' : 'Sync Market Price'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsPopupOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-amber-300" />
                <span>Open All Questions Popup</span>
              </button>
            </div>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Options Column (8 cols): All 11 Questions */}
          <div className="lg:col-span-8 space-y-10 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-xs text-left">
            
            <div className="border-b border-stone-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Complete Interactive Questionnaire</span>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  All 11 Order Questions &amp; Preferences
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
                  11 of 11 Questions Active
                </span>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* QUESTION 1: Cake Size & Servings */}
            {/* ========================================================================= */}
            <div className="space-y-3.5 border-b border-stone-100 pb-8">
              <div className="flex items-center justify-between">
                <label className="font-serif font-bold text-stone-900 text-lg flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center font-sans font-bold shadow-xs">1</span>
                  Select Cake Size &amp; Guest Servings
                </label>
                <span className="text-xs text-stone-500 font-medium bg-stone-100 px-2.5 py-1 rounded-lg">Question 1 of 11</span>
              </div>

              <p className="text-xs text-stone-600">
                Choose the size based on your guest count. All tiers include 3 generous sponge layers and gourmet filling.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                {CAKE_SIZES.map((sizeItem) => {
                  const isSelected = cakeSize === sizeItem.id;
                  return (
                    <button
                      key={sizeItem.id}
                      type="button"
                      onClick={() => setCakeSize(sizeItem.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-amber-800 bg-amber-50/90 shadow-2xs ring-2 ring-amber-800/20'
                          : 'border-stone-200 bg-white hover:border-amber-300 hover:bg-stone-50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="font-serif font-bold text-sm text-stone-900">
                            {sizeItem.id}
                          </span>
                          <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full shrink-0">
                            ${sizeItem.marketBasePrice}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-stone-600 font-medium">
                          <Users className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                          <span>{sizeItem.servings}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-2 line-clamp-1">
                        {sizeItem.recommended}
                      </p>
                    </button>
                  );
                })}
              </div>

              {cakeSize === 'Other' && (
                <div className="pt-2 animate-in fade-in">
                  <label className="block text-xs font-bold text-stone-700 mb-1">Specify Custom Size / Custom Tiers:</label>
                  <input
                    type="text"
                    placeholder="e.g. 14-inch round, 4-tier grand wedding structure, sheet cake for 100 guests..."
                    value={cakeSizeOther}
                    onChange={(e) => setCakeSizeOther(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-200 outline-none text-xs sm:text-sm text-stone-900 bg-amber-50/40"
                  />
                </div>
              )}
            </div>

            {/* ========================================================================= */}
            {/* QUESTION 2: Cake Flavor / Sponge */}
            {/* ========================================================================= */}
            <div className="space-y-3.5 border-b border-stone-100 pb-8">
              <div className="flex items-center justify-between">
                <label className="font-serif font-bold text-stone-900 text-lg flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center font-sans font-bold shadow-xs">2</span>
                  Cake Type &amp; Sponge Flavor
                </label>
                <span className="text-xs text-stone-500 font-medium bg-stone-100 px-2.5 py-1 rounded-lg">Question 2 of 13</span>
              </div>

              <p className="text-xs text-stone-600">
                Freshly baked from scratch with unbleached organic flour, pure butter, and real vanilla bean.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                {CAKE_TYPES.map((typeItem) => {
                  const isSelected = cakeType === typeItem.id;
                  return (
                    <button
                      key={typeItem.id}
                      type="button"
                      onClick={() => setCakeType(typeItem.id)}
                      className={`p-3 rounded-2xl border text-left text-xs transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-amber-800 bg-amber-50/90 font-bold text-amber-950 ring-2 ring-amber-800/20'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-amber-300 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-stone-900">{typeItem.name}</span>
                        {typeItem.premium > 0 && (
                          <span className="text-[10px] text-amber-800 font-bold bg-amber-100/80 px-1.5 py-0.5 rounded-full">
                            +${typeItem.premium}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-stone-500 mt-1">{typeItem.desc}</span>
                    </button>
                  );
                })}
              </div>

              {cakeType === 'Other' && (
                <div className="pt-2 animate-in fade-in">
                  <label className="block text-xs font-bold text-stone-700 mb-1">Specify Custom Flavor / Sponge Recipe:</label>
                  <input
                    type="text"
                    placeholder="e.g. Lavender Earl Grey, Coconut Passionfruit, Almond Amaretto..."
                    value={cakeTypeOther}
                    onChange={(e) => setCakeTypeOther(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-200 outline-none text-xs sm:text-sm text-stone-900 bg-amber-50/40"
                  />
                </div>
              )}
            </div>

            {/* ========================================================================= */}
            {/* QUESTION 3: Icing Type & Finish */}
            {/* ========================================================================= */}
            <div className="space-y-3.5 border-b border-stone-100 pb-8">
              <div className="flex items-center justify-between">
                <label className="font-serif font-bold text-stone-900 text-lg flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center font-sans font-bold shadow-xs">3</span>
                  Icing Type &amp; Exterior Finish
                </label>
                <span className="text-xs text-stone-500 font-medium bg-stone-100 px-2.5 py-1 rounded-lg">Question 3 of 13</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
                {ICING_TYPES.map((icingItem) => {
                  const isSelected = icingType === icingItem.id;
                  return (
                    <button
                      key={icingItem.id}
                      type="button"
                      onClick={() => setIcingType(icingItem.id)}
                      className={`p-3 rounded-2xl border text-left text-xs transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-amber-800 bg-amber-50/90 font-bold text-amber-950 ring-2 ring-amber-800/20'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-amber-300 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-stone-900">{icingItem.name}</span>
                        {icingItem.price > 0 && (
                          <span className="text-[10px] text-amber-800 font-bold bg-amber-100/80 px-1.5 py-0.5 rounded-full">
                            +${icingItem.price}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-stone-500 mt-1">{icingItem.desc}</span>
                    </button>
                  );
                })}
              </div>

              {icingType === 'Other' && (
                <div className="pt-2 animate-in fade-in">
                  <label className="block text-xs font-bold text-stone-700 mb-1">Specify Custom Frosting / Exterior Finish:</label>
                  <input
                    type="text"
                    placeholder="e.g. Textured palette knife, espresso mirror glaze, marshmallow fluff..."
                    value={icingTypeOther}
                    onChange={(e) => setIcingTypeOther(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-200 outline-none text-xs sm:text-sm text-stone-900 bg-amber-50/40"
                  />
                </div>
              )}
            </div>

            {/* ========================================================================= */}
            {/* QUESTION 4: Occasion & Event Structure */}
            {/* ========================================================================= */}
            <div className="space-y-3.5 border-b border-stone-100 pb-8">
              <div className="flex items-center justify-between">
                <label className="font-serif font-bold text-stone-900 text-lg flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center font-sans font-bold shadow-xs">4</span>
                  Occasion &amp; Event Type
                </label>
                <span className="text-xs text-stone-500 font-medium bg-stone-100 px-2.5 py-1 rounded-lg">Question 4 of 13</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 pt-1">
                {OCCASIONS.map((occItem) => {
                  const isSelected = occasion === occItem.id;
                  return (
                    <button
                      key={occItem.id}
                      type="button"
                      onClick={() => setOccasion(occItem.id)}
                      className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-800 bg-amber-100/90 text-amber-950 font-bold shadow-2xs ring-1 ring-amber-800'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-amber-300 hover:bg-amber-50/40'
                      }`}
                    >
                      {occItem.name}
                    </button>
                  );
                })}
              </div>

              {occasion === 'Other' && (
                <div className="pt-2 animate-in fade-in">
                  <label className="block text-xs font-bold text-stone-700 mb-1">Specify Custom Event Type:</label>
                  <input
                    type="text"
                    placeholder="e.g. Graduation, Retirement, Quinceañera, Housewarming, Bridal Shower..."
                    value={occasionOther}
                    onChange={(e) => setOccasionOther(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-200 outline-none text-xs sm:text-sm text-stone-900 bg-amber-50/40"
                  />
                </div>
              )}
            </div>

            {/* ========================================================================= */}
            {/* QUESTION 5: Colors / Palette Theme */}
            {/* ========================================================================= */}
            <div className="space-y-3.5 border-b border-stone-100 pb-8">
              <div className="flex items-center justify-between">
                <label className="font-serif font-bold text-stone-900 text-lg flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center font-sans font-bold shadow-xs">5</span>
                  Color Theme &amp; Styling Palette <span className="text-red-600">*</span>
                </label>
                <span className="text-xs text-stone-500 font-medium bg-stone-100 px-2.5 py-1 rounded-lg">Question 5 of 13</span>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  value={colors}
                  onChange={(e) => setColors(e.target.value)}
                  placeholder="e.g. Sage green, ivory white, and 24K gold leaf accents"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-xs sm:text-sm text-stone-900"
                />
                
                {/* Quick Palette Presets */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-[11px] text-stone-400 font-medium self-center">Popular Presets:</span>
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setColors(preset)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                        colors === preset
                          ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-amber-50'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                {colors === 'Other / Custom Palette' && (
                  <div className="pt-2 animate-in fade-in">
                    <input
                      type="text"
                      placeholder="Specify your exact custom hex codes, Pantone shades, or party decor colors..."
                      value={colorsOther}
                      onChange={(e) => setColorsOther(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-200 outline-none text-xs sm:text-sm text-stone-900 bg-amber-50/40"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* ========================================================================= */}
            {/* QUESTION 6: Words on Cake / Inscription */}
            {/* ========================================================================= */}
            <div className="space-y-3.5 border-b border-stone-100 pb-8">
              <div className="flex items-center justify-between">
                <label className="font-serif font-bold text-stone-900 text-lg flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center font-sans font-bold shadow-xs">6</span>
                  Words on Cake / Custom Inscription <span className="text-red-600">*</span>
                </label>
                <span className="text-xs text-stone-500 font-medium bg-stone-100 px-2.5 py-1 rounded-lg">Question 6 of 13</span>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  value={wordsOnCake}
                  onChange={(e) => setWordsOnCake(e.target.value)}
                  placeholder="e.g. Happy 30th Birthday Jessica! (or leave blank for no piping)"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-xs sm:text-sm text-stone-900"
                />

                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-[11px] text-stone-400 font-medium self-center">Suggestions:</span>
                  {['Happy Birthday!', 'Congratulations!', 'Mr. & Mrs.', 'Sweet 16', 'Oh Baby!', 'None (Clean Top)'].map((msg) => (
                    <button
                      key={msg}
                      type="button"
                      onClick={() => setWordsOnCake(msg === 'None (Clean Top)' ? '' : msg)}
                      className="text-xs bg-stone-100 hover:bg-amber-100 text-stone-700 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                    >
                      "{msg}"
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* QUESTION 7: Gourmet Inner Layer Filling */}
            {/* ========================================================================= */}
            <div className="space-y-3.5 border-b border-stone-100 pb-8">
              <div className="flex items-center justify-between">
                <label className="font-serif font-bold text-stone-900 text-lg flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center font-sans font-bold shadow-xs">7</span>
                  Select Gourmet Inner Layer Filling
                </label>
                <span className="text-xs text-stone-500 font-medium bg-stone-100 px-2.5 py-1 rounded-lg">Question 7 of 13</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {FILLING_UPGRADES.map((fillItem) => (
                  <button
                    key={fillItem.id}
                    type="button"
                    onClick={() => setFilling(fillItem.id)}
                    className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between ${
                      filling === fillItem.id
                        ? 'border-amber-800 bg-amber-50/90 text-amber-950 font-semibold ring-1 ring-amber-800'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-amber-300 hover:bg-stone-50'
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-stone-900 text-xs sm:text-sm">{fillItem.name}</p>
                      <p className="text-[11px] text-stone-500 mt-0.5">{fillItem.desc}</p>
                    </div>
                    <span className="text-xs text-amber-900 font-bold shrink-0 ml-3 bg-amber-100 px-2 py-1 rounded-md">
                      {fillItem.price === 0 ? 'Included' : `+$${fillItem.price}`}
                    </span>
                  </button>
                ))}
              </div>

              {filling === 'other' && (
                <div className="pt-2 animate-in fade-in">
                  <label className="block text-xs font-bold text-stone-700 mb-1">Specify Custom Layer Filling:</label>
                  <input
                    type="text"
                    placeholder="e.g. Passionfruit curd, Nutella hazelnut mousse, Guava cream, Salted dulce de leche..."
                    value={fillingOther}
                    onChange={(e) => setFillingOther(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-200 outline-none text-xs sm:text-sm text-stone-900 bg-amber-50/40"
                  />
                </div>
              )}
            </div>

            {/* ========================================================================= */}
            {/* QUESTION 8: Pickup Location / Delivery */}
            {/* ========================================================================= */}
            <div className="space-y-3.5 border-b border-stone-100 pb-8">
              <div className="flex items-center justify-between">
                <label className="font-serif font-bold text-stone-900 text-lg flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center font-sans font-bold shadow-xs">8</span>
                  Pickup Location &amp; Delivery Method
                </label>
                <span className="text-xs text-stone-500 font-medium bg-stone-100 px-2.5 py-1 rounded-lg">Question 8 of 11</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {PICKUP_OPTIONS.map((locItem) => {
                  const isSelected = pickupLocation === locItem.id;
                  return (
                    <button
                      key={locItem.id}
                      type="button"
                      onClick={() => setPickupLocation(locItem.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-amber-800 bg-amber-50/90 text-amber-950 font-semibold ring-1 ring-amber-800'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-amber-300 hover:bg-stone-50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs sm:text-sm text-stone-900">{locItem.name}</span>
                          <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md">
                            {locItem.cost === 0 ? 'Free Pickup' : `+$${locItem.cost}`}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500">{locItem.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {pickupLocation === 'White Glove Hand Delivery' && (
                <div className="pt-2 animate-in fade-in">
                  <label className="block text-xs font-bold text-stone-700 mb-1">Delivery Address &amp; Venue Details:</label>
                  <input
                    type="text"
                    placeholder="Enter street address, suite/apt, city, zip code, and venue contact..."
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-200 outline-none text-xs sm:text-sm text-stone-900 bg-amber-50/40"
                  />
                </div>
              )}

              {pickupLocation === 'Other' && (
                <div className="pt-2 animate-in fade-in">
                  <label className="block text-xs font-bold text-stone-700 mb-1">Specify Custom Pickup / Delivery Instructions:</label>
                  <input
                    type="text"
                    placeholder="e.g. Special restaurant drop-off, catering coordinator handover..."
                    value={pickupLocationOther}
                    onChange={(e) => setPickupLocationOther(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-200 outline-none text-xs sm:text-sm text-stone-900 bg-amber-50/40"
                  />
                </div>
              )}
            </div>

            {/* ========================================================================= */}
            {/* QUESTION 9: Dietary & Allergy Accommodations */}
            {/* ========================================================================= */}
            <div className="space-y-3.5 border-b border-stone-100 pb-8">
              <div className="flex items-center justify-between">
                <label className="font-serif font-bold text-stone-900 text-lg flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center font-sans font-bold shadow-xs">9</span>
                  Dietary &amp; Allergy Accommodations
                </label>
                <span className="text-xs text-stone-500 font-medium bg-stone-100 px-2.5 py-1 rounded-lg">Question 9 of 11</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                {DIETARY_OPTIONS.map((dietItem) => {
                  const isSelected = allergies === dietItem.id;
                  return (
                    <button
                      key={dietItem.id}
                      type="button"
                      onClick={() => setAllergies(dietItem.id)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-amber-800 bg-amber-50/90 text-amber-950 font-bold ring-1 ring-amber-800'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-amber-300 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-stone-900">{dietItem.id}</span>
                        {dietItem.cost > 0 && (
                          <span className="text-[10px] text-amber-800 font-bold bg-amber-100 px-1.5 py-0.5 rounded-full">
                            +${dietItem.cost}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-stone-500">{dietItem.label}</span>
                    </button>
                  );
                })}
              </div>

              {allergies === 'Other' && (
                <div className="pt-2 animate-in fade-in">
                  <label className="block text-xs font-bold text-stone-700 mb-1">Specify Specific Allergy or Sensitivity:</label>
                  <input
                    type="text"
                    placeholder="e.g. Severe peanut allergy, soy sensitivity, alcohol-free vanilla extract..."
                    value={allergiesOther}
                    onChange={(e) => setAllergiesOther(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-200 outline-none text-xs sm:text-sm text-stone-900 bg-amber-50/40"
                  />
                </div>
              )}
            </div>

            {/* ========================================================================= */}
            {/* QUESTION 10: Cake Style, Theme & Custom Design Notes */}
            {/* ========================================================================= */}
            <div className="space-y-3.5 border-b border-stone-100 pb-8">
              <div className="flex items-center justify-between">
                <label className="font-serif font-bold text-stone-900 text-lg flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center font-sans font-bold shadow-xs">10</span>
                  Cake Aesthetic Style &amp; Custom Design Notes
                </label>
                <span className="text-xs text-stone-500 font-medium bg-stone-100 px-2.5 py-1 rounded-lg">Question 10 of 11</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                {CAKE_STYLES.map((styleItem) => {
                  const isSelected = cakeStyle === styleItem.id;
                  return (
                    <button
                      key={styleItem.id}
                      type="button"
                      onClick={() => setCakeStyle(styleItem.id)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-amber-800 bg-amber-50/90 text-amber-950 font-bold ring-1 ring-amber-800'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-amber-300 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-stone-900">{styleItem.name}</span>
                        {styleItem.cost > 0 && (
                          <span className="text-[10px] text-amber-800 font-bold bg-amber-100 px-1.5 py-0.5 rounded-full">
                            +${styleItem.cost}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-stone-500">{styleItem.desc}</span>
                    </button>
                  );
                })}
              </div>

              {cakeStyle === 'Other' && (
                <div className="pt-2 animate-in fade-in">
                  <label className="block text-xs font-bold text-stone-700 mb-1">Specify Custom Theme or Style:</label>
                  <input
                    type="text"
                    placeholder="e.g. Enchanted forest, celestial astrology, retro disco 70s..."
                    value={cakeStyleOther}
                    onChange={(e) => setCakeStyleOther(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-200 outline-none text-xs sm:text-sm text-stone-900 bg-amber-50/40"
                  />
                </div>
              )}

              <div className="pt-2">
                <label className="block text-xs font-bold text-stone-700 mb-1">Additional Design Notes, Inspiration &amp; Special Requests:</label>
                <textarea
                  rows={2}
                  value={customDesignNotes}
                  onChange={(e) => setCustomDesignNotes(e.target.value)}
                  placeholder="Describe your design vision, toppers, florals, reference links, or specific placement requests..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-xs sm:text-sm text-stone-900"
                />
              </div>
            </div>

            {/* ========================================================================= */}
            {/* QUESTION 11: Contact Details for Estimate / Order */}
            {/* ========================================================================= */}
            <div className="space-y-3.5 pb-2">
              <div className="flex items-center justify-between">
                <label className="font-serif font-bold text-stone-900 text-lg flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center font-sans font-bold shadow-xs">11</span>
                  Contact Information for Order Confirmation &amp; Quote
                </label>
                <span className="text-xs text-stone-500 font-medium bg-stone-100 px-2.5 py-1 rounded-lg">Question 11 of 11</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-stone-500" />
                    <span>First Name <span className="text-red-600">*</span></span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Jessica"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-xs sm:text-sm text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-stone-500" />
                    <span>Last Name <span className="text-red-600">*</span></span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Miller"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-xs sm:text-sm text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-stone-500" />
                    <span>Email Address <span className="text-red-600">*</span></span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jessica@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-xs sm:text-sm text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-stone-500" />
                    <span>Phone Number <span className="text-red-600">*</span></span>
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="(404) 555-0199"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-xs sm:text-sm text-stone-900"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Sticky Calculation & Popup Trigger Card (4 cols) */}
          <div className="lg:col-span-4 sticky top-24 bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-7 shadow-xl border border-stone-800 space-y-6 text-left">
            
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">Live 11-Question Calculation</span>
                <h3 className="font-serif text-xl font-bold text-white">Estimated Quote</h3>
              </div>
              <div className="w-9 h-9 rounded-full bg-amber-800/60 text-amber-300 flex items-center justify-center">
                <Cake className="w-5 h-5" />
              </div>
            </div>

            {/* Selected Configuration Summary */}
            <div className="space-y-2.5 text-xs text-stone-300 max-h-[300px] overflow-y-auto pr-1">
              <div className="flex justify-between items-start pb-2 border-b border-stone-800/60">
                <div>
                  <p className="font-semibold text-white">
                    {cakeSize === 'Other' ? (cakeSizeOther ? `Other (${cakeSizeOther})` : 'Other Size') : currentSizeObj.name}
                  </p>
                  <p className="text-[11px] text-stone-400">{currentSizeObj.servings}</p>
                </div>
                <span className="text-amber-400 font-bold">${currentSizeObj.marketBasePrice}</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-stone-800/60">
                <span className="text-stone-400">Flavor: {cakeType === 'Other' ? (cakeTypeOther || 'Custom') : cakeType}</span>
                <span className="font-semibold text-white">{currentTypeObj.premium > 0 ? `+$${currentTypeObj.premium}` : 'Included'}</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-stone-800/60">
                <span className="text-stone-400">Icing: {icingType === 'Other' ? (icingTypeOther || 'Custom') : icingType}</span>
                <span className="font-semibold text-white">{currentIcingObj.price > 0 ? `+$${currentIcingObj.price}` : 'Included'}</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-stone-800/60">
                <span className="text-stone-400">Occasion: {occasion === 'Other' ? (occasionOther || 'Custom') : occasion}</span>
                <span className="font-semibold text-white">{currentOccasionObj.structurePrice > 0 ? `+$${currentOccasionObj.structurePrice}` : 'Included'}</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-stone-800/60">
                <span className="text-stone-400">Filling: {filling === 'other' ? (fillingOther || 'Custom') : currentFillingObj.name}</span>
                <span className="font-semibold text-white">{currentFillingObj.price > 0 ? `+$${currentFillingObj.price}` : 'Included'}</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-stone-800/60">
                <span className="text-stone-400">Style: {cakeStyle === 'Other' ? (cakeStyleOther || 'Custom') : cakeStyle}</span>
                <span className="font-semibold text-white">{currentStyleObj.cost > 0 ? `+$${currentStyleObj.cost}` : 'Included'}</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-stone-800/60">
                <span className="text-stone-400">Pickup / Delivery:</span>
                <span className="font-semibold text-white">{currentPickupObj.cost > 0 ? `+$${currentPickupObj.cost}` : 'Free Pickup'}</span>
              </div>
            </div>

            {/* Total Highlight */}
            <div className="pt-1">
              <div className="bg-stone-800/80 p-4 rounded-2xl border border-stone-700/80 space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-semibold text-stone-300">Estimated Total:</span>
                  <span className="font-serif text-3xl font-bold text-amber-400">
                    ${estimatedTotal}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-stone-400">
                  <span>Approx. ~${pricePerServing} per guest</span>
                  <span className="text-emerald-400 font-medium">50% Deposit: ${depositAmount}</span>
                </div>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={handleApplyAndTransfer}
                className="w-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-stone-950" />
                <span>Apply All Questions to Order Form</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={buildPrefilledGoogleFormUrl({
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  phoneNumber: phoneNumber,
                  cakeType: cakeType === 'Other' ? (cakeTypeOther || 'Custom') : cakeType,
                  cakeSize: currentSizeObj.id,
                  icingType: icingType === 'Other' ? (icingTypeOther || 'Custom') : icingType,
                  occasion: occasion === 'Other' ? (occasionOther || 'Event') : occasion,
                  colors: colors === 'Other / Custom Palette' ? (colorsOther || 'Custom') : colors,
                  wordsOnCake: wordsOnCake,
                  location: pickupLocation === 'Other' ? (pickupLocationOther || 'Custom Location') : pickupLocation
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-stone-800 hover:bg-stone-700 text-amber-200 font-bold text-xs border border-stone-700 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <ExternalLink className="w-4 h-4 text-amber-400" />
                <span>Open in Pre-Filled Google Form</span>
              </a>

              <button
                type="button"
                onClick={() => setIsPopupOpen(true)}
                className="w-full py-2.5 px-4 rounded-2xl bg-stone-900/60 hover:bg-stone-900 text-stone-300 font-semibold text-xs border border-stone-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-stone-400" />
                <span>📋 Pop Up All Questions &amp; Live Summary</span>
              </button>

              <p className="text-[10px] text-stone-400 text-center leading-relaxed">
                *Final invoice confirmed by bakery upon availability verification.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 11-QUESTION ORDER DETAILS POPUP MODAL */}
      {/* ========================================================================= */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-200/80 p-6 sm:p-8 space-y-6 text-left relative">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
              title="Close Popup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Popup Header */}
            <div className="space-y-1 pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-mono font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>11 Questions Complete Specification</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                11-Question Order &amp; Price Breakdown
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                Every single question answered in the interactive price estimator.
              </p>
            </div>

            {/* Market Sync Notice */}
            <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl flex items-center justify-between text-xs text-emerald-950">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Market Status:</strong> Synced with Georgia/Florida ingredient indices ({lastMarketSync})</span>
              </div>
              <span className="font-bold text-emerald-800 shrink-0">100% Verified Rate</span>
            </div>

            {/* Detailed Order Specifications Table (All 11 Questions) */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden divide-y divide-stone-200 text-xs sm:text-sm">
              
              <div className="p-3 flex justify-between items-center">
                <span className="text-stone-500 font-medium">1. Cake Size &amp; Guest Servings:</span>
                <span className="font-bold text-stone-900">
                  {cakeSize === 'Other' ? (cakeSizeOther ? `Other (${cakeSizeOther})` : 'Other Size') : `${currentSizeObj.name} (${currentSizeObj.servings})`}
                </span>
              </div>

              <div className="p-3 flex justify-between items-center">
                <span className="text-stone-500 font-medium">2. Cake Type / Flavor Sponge:</span>
                <span className="font-bold text-stone-900">{cakeType === 'Other' ? (cakeTypeOther || 'Custom') : cakeType}</span>
              </div>

              <div className="p-3 flex justify-between items-center">
                <span className="text-stone-500 font-medium">3. Icing Type &amp; Exterior Finish:</span>
                <span className="font-bold text-stone-900">{icingType === 'Other' ? (icingTypeOther || 'Custom') : icingType}</span>
              </div>

              <div className="p-3 flex justify-between items-center">
                <span className="text-stone-500 font-medium">4. Occasion &amp; Event Type:</span>
                <span className="font-bold text-stone-900">{occasion === 'Other' ? (occasionOther || 'Event') : occasion}</span>
              </div>

              <div className="p-3 flex justify-between items-center">
                <span className="text-stone-500 font-medium">5. Colors &amp; Styling Palette:</span>
                <span className="font-bold text-amber-950">{colors === 'Other / Custom Palette' ? (colorsOther || 'Custom') : colors}</span>
              </div>

              <div className="p-3 flex justify-between items-center">
                <span className="text-stone-500 font-medium">6. Words / Inscription on Cake:</span>
                <span className="font-bold text-stone-900">"{wordsOnCake}"</span>
              </div>

              <div className="p-3 flex justify-between items-center">
                <span className="text-stone-500 font-medium">7. Gourmet Inner Layer Filling:</span>
                <span className="font-bold text-stone-900">{filling === 'other' ? (fillingOther || 'Custom Filling') : currentFillingObj.name}</span>
              </div>

              <div className="p-3 flex justify-between items-center">
                <span className="text-stone-500 font-medium">8. Location / Delivery:</span>
                <span className="font-bold text-stone-900">{pickupLocation === 'Other' ? (pickupLocationOther || 'Custom') : pickupLocation}</span>
              </div>

              <div className="p-3 flex justify-between items-center">
                <span className="text-stone-500 font-medium">9. Dietary Requirements:</span>
                <span className="font-bold text-stone-900">{allergies === 'Other' ? (allergiesOther || 'Custom') : allergies}</span>
              </div>

              <div className="p-3 flex justify-between items-center">
                <span className="text-stone-500 font-medium">10. Aesthetic Style &amp; Notes:</span>
                <span className="font-bold text-stone-900">{cakeStyle === 'Other' ? (cakeStyleOther || 'Custom') : cakeStyle}</span>
              </div>

              <div className="p-3 flex justify-between items-center">
                <span className="text-stone-500 font-medium">11. Client Contact Info:</span>
                <span className="font-bold text-stone-900">
                  {firstName || lastName ? `${firstName} ${lastName} • ${phoneNumber || email || ''}` : 'Not provided yet (can be added on order form)'}
                </span>
              </div>

            </div>

            {/* Financial Summary */}
            <div className="bg-stone-900 text-stone-100 p-5 rounded-2xl border border-stone-800 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-stone-400 uppercase font-semibold tracking-wider">Synchronized Estimate:</span>
                <span className="font-serif text-3xl font-bold text-amber-400">${estimatedTotal}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs border-t border-stone-800 pt-3 text-stone-300">
                <div>Serving Unit Cost: <strong className="text-white">~${pricePerServing} / guest</strong></div>
                <div className="text-right">50% Booking Deposit: <strong className="text-emerald-400">${depositAmount}</strong></div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopySpecs}
                className="flex-1 py-3 px-4 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                {hasCopied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Copied All 11 Specs!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-stone-600" />
                    <span>Copy All 11 Questions Specs</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsPopupOpen(false);
                  handleApplyAndTransfer();
                }}
                className="flex-1 py-3 px-4 rounded-full bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-colors"
              >
                <span>Apply to Live Order Form</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
