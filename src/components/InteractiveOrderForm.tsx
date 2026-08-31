import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Cake,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  PhoneCall,
  Sparkles,
  Heart,
  ExternalLink,
  Printer,
  ShieldCheck,
  Palette,
  Type,
  Layers,
  FileText,
  Truck
} from 'lucide-react';

export interface OrderFormData {
  // Section 1: Contact (Question 13)
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;

  // Section 2: Order Details (Questions 1, 2, 3, 4, 5, 6, 7, 11, 12)
  cakeSize: string;
  cakeSizeOther: string;
  cakeType: string;
  cakeTypeOther: string;
  icingType: string;
  icingTypeOther: string;
  occasion: string;
  occasionOther: string;
  colors: string;
  wordsOnCake: string;
  filling: string;
  fillingOther: string;
  allergies: string;
  allergiesOther: string;
  cakeStyle: string;
  cakeStyleOther: string;
  customDesignNotes: string;

  // Section 3: Pickup & Location (Question 10)
  location: string;
  deliveryAddress: string;
}

export const INITIAL_FORM_DATA: OrderFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  cakeSize: '8 INCH',
  cakeSizeOther: '',
  cakeType: 'Vanilla Sponge',
  cakeTypeOther: '',
  icingType: 'American Buttercream',
  icingTypeOther: '',
  occasion: 'Birthday',
  occasionOther: '',
  colors: '',
  wordsOnCake: '',
  filling: 'standard-buttercream',
  fillingOther: '',
  allergies: 'standard',
  allergiesOther: '',
  cakeStyle: 'modern-minimalist',
  cakeStyleOther: '',
  customDesignNotes: '',
  location: "1. Truist Park: Infront of Children's Healthcare of Atlanta Park",
  deliveryAddress: ''
};

export const CAKE_SIZES = [
  { size: '4 INCH', servings: '2-4 Servings (Mini / Smash Cake)', base: 45, guests: 4 },
  { size: '6 INCH', servings: '6-10 Servings (Intimate Gathering)', base: 65, guests: 10 },
  { size: '8 INCH', servings: '12-16 Servings (Most Popular Party Size)', base: 85, guests: 16 },
  { size: '10 INCH', servings: '20-28 Servings (Large Celebration)', base: 115, guests: 28 },
  { size: '12 INCH', servings: '30-40 Servings (Event / Grand Banquet)', base: 155, guests: 40 },
  { size: '2-Tier (6" + 8")', servings: '35-40 Servings (Baby/Bridal Shower)', base: 145, guests: 40 },
  { size: '3-Tier (6" + 8" + 10")', servings: '65-75 Servings (Luxury Wedding / Gala)', base: 245, guests: 75 },
  { size: 'Other', servings: 'Custom Size / Bespoke Tiers', base: 120, guests: 20 }
];

export const CAKE_TYPES = [
  { name: 'Vanilla Sponge', premium: 0 },
  { name: 'Rich Chocolate', premium: 5 },
  { name: 'Red Velvet', premium: 5 },
  { name: 'Carrot Cake', premium: 8 },
  { name: 'Marble Sponge', premium: 5 },
  { name: 'Strawberry Infusion', premium: 6 },
  { name: 'Lemon Poppyseed', premium: 5 },
  { name: 'Other', premium: 8 }
];

export const ICING_TYPES = [
  { name: 'American Buttercream', price: 0 },
  { name: 'Swiss Meringue Buttercream', price: 10 },
  { name: 'Cream Cheese Frosting', price: 10 },
  { name: 'Chocolate Ganache', price: 15 },
  { name: 'Fondant Finish', price: 25 },
  { name: 'Whipped Cream Frosting', price: 5 },
  { name: 'Naked / Semi-Naked', price: 0 },
  { name: 'Other', price: 12 }
];

export const OCCASIONS = [
  { name: 'Birthday', price: 0 },
  { name: 'Wedding', price: 30 },
  { name: 'Anniversary', price: 10 },
  { name: 'Baby Shower', price: 10 },
  { name: 'Breakfast Event', price: 0 },
  { name: "Mother's Day Special", price: 0 },
  { name: 'Party', price: 0 },
  { name: 'Staff Party', price: 0 },
  { name: 'Other', price: 5 }
];

export const FILLING_OPTIONS = [
  { id: 'standard-buttercream', name: 'Matching Buttercream', price: 0, desc: 'Silky smooth matching exterior icing' },
  { id: 'strawberry-compote', name: 'Fresh Strawberry Compote', price: 12, desc: 'Real Georgia-ripened strawberry glaze' },
  { id: 'lemon-curd', name: 'Zesty Lemon Curd & Cream', price: 14, desc: 'Tart citrus reduction with sweet cream' },
  { id: 'salted-caramel', name: 'Salted Caramel & Ganache', price: 12, desc: 'Hand-crafted slow kettle caramel & dark drizzle' },
  { id: 'wild-raspberry', name: 'Wild Raspberry Puree', price: 15, desc: 'Intense berry puree between artisan layers' },
  { id: 'chocolate-mousse', name: 'Belgian Chocolate Mousse', price: 15, desc: 'Airy 70% dark Belgian cocoa mousse' },
  { id: 'other', name: 'Custom Filling Request', price: 12, desc: 'Specify your bespoke gourmet filling flavor' }
];

export const DIETARY_OPTIONS = [
  { id: 'standard', name: 'Standard Traditional Kitchen', cost: 0, desc: 'Premium butter, organic flour, farm-fresh eggs' },
  { id: 'nut-free', name: 'Nut-Free Kitchen Focus', cost: 0, desc: 'Sanitized prep area; strict zero nut policy' },
  { id: 'gluten-friendly', name: 'Gluten-Friendly Flour Blend', cost: 15, desc: 'Crafted with premium gluten-free certified flour' },
  { id: 'dairy-free', name: 'Dairy-Free Organic Ingredients', cost: 15, desc: 'Plant-based butter, oat/almond artisan milks' },
  { id: 'vegan', name: 'Egg-Free & Vegan Friendly', cost: 18, desc: '100% plant-based formulation' },
  { id: 'Other', name: 'Other / Specific Custom Allergy', cost: 10, desc: 'Tell us about your specific dietary needs' }
];

export const CAKE_STYLES = [
  { id: 'vintage-lambeth', name: 'Vintage Lambeth Piping', cost: 25, desc: 'Intricate royal over-piping, ruffles & retro cherries' },
  { id: 'modern-minimalist', name: 'Modern Minimalist & Clean Lines', cost: 0, desc: 'Sharp edges, sleek monochrome palette, crisp aesthetic' },
  { id: 'botanical-florals', name: 'Botanical Florals & Fresh Blooms', cost: 20, desc: 'Hand-placed edible florals, eucalyptus sprigs & greenery' },
  { id: 'gold-leaf-geode', name: 'Luxe Gold Leaf & Geode Accents', cost: 35, desc: '24k edible gold leaf foil, shimmering crystal sugar accents' },
  { id: 'cartoon-pop', name: 'Cartoon / Pop Art Comic Cake', cost: 20, desc: 'Bold black contour lining for 2D illusion effect' },
  { id: 'Other', name: 'Other Custom Design Style', cost: 15, desc: 'Share your specific theme or Pinterest inspiration' }
];

export const PICKUP_LOCATIONS = [
  {
    id: "1. Truist Park: Infront of Children's Healthcare of Atlanta Park",
    name: "Truist Park (Infront of Children's Healthcare of Atlanta Park)",
    address: "755 Battery Ave SE, Atlanta, GA 30339",
    tag: "Option 1 (Free)",
    price: 0
  },
  {
    id: "2. BP Gas Station : Cobb Pkwy and Herodian Way Intersection",
    name: "BP Gas Station (Cobb Pkwy & Herodian Way Intersection)",
    address: "2535 Cobb Pkwy SE, Smyrna, GA 30080",
    tag: "Option 2 (Free)",
    price: 0
  },
  {
    id: "3. Public Storage - Herodian Way",
    name: "Public Storage - Herodian Way",
    address: "2460 Herodian Way, Smyrna, GA 30080",
    tag: "Option 3 (Free)",
    price: 0
  },
  {
    id: "White-Glove Refrigerated Courier Delivery",
    name: "White-Glove Refrigerated Courier Delivery",
    address: "Delivered in climate-controlled transport to your venue",
    tag: "Courier Delivery ($25)",
    price: 25
  }
];

interface InteractiveOrderFormProps {
  googleFormUrl: string;
}

export default function InteractiveOrderForm({ googleFormUrl }: InteractiveOrderFormProps) {
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [formData, setFormData] = useState<OrderFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submissionId, setSubmissionId] = useState<string>('');
  const [estimatorSyncNotice, setEstimatorSyncNotice] = useState<string | null>(null);
  const [lastAutoSyncTime, setLastAutoSyncTime] = useState<string>('Live');

  // Compute live synchronized estimated quote from current form selections
  const sizeObj = CAKE_SIZES.find((s) => s.size === formData.cakeSize) || CAKE_SIZES[2];
  const typeObj = CAKE_TYPES.find((t) => t.name === formData.cakeType) || CAKE_TYPES[0];
  const icingObj = ICING_TYPES.find((i) => i.name === formData.icingType) || ICING_TYPES[0];
  const occasionObj = OCCASIONS.find((o) => o.name === formData.occasion) || OCCASIONS[0];
  const fillingObj = FILLING_OPTIONS.find((f) => f.id === formData.filling || f.name === formData.filling) || FILLING_OPTIONS[0];
  const dietaryObj = DIETARY_OPTIONS.find((d) => d.id === formData.allergies || d.name === formData.allergies) || DIETARY_OPTIONS[0];
  const styleObj = CAKE_STYLES.find((st) => st.id === formData.cakeStyle || st.name === formData.cakeStyle) || CAKE_STYLES[1];
  const locationObj = PICKUP_LOCATIONS.find((l) => l.id === formData.location) || PICKUP_LOCATIONS[0];

  const currentEstimatedTotal =
    sizeObj.base +
    typeObj.premium +
    icingObj.price +
    occasionObj.price +
    fillingObj.price +
    dietaryObj.cost +
    styleObj.cost +
    locationObj.price;

  const currentDeposit = Math.round(currentEstimatedTotal / 2);
  const currentPerGuest = (currentEstimatedTotal / (sizeObj.guests || 16)).toFixed(2);

  // Auto-sync on mount and listen to live changes from Price Estimator Section
  React.useEffect(() => {
    const applyEstimatorData = (parsed: any) => {
      setFormData((prev) => ({
        ...prev,
        // Contact (Q13)
        firstName: parsed.firstName !== undefined ? parsed.firstName : prev.firstName,
        lastName: parsed.lastName !== undefined ? parsed.lastName : prev.lastName,
        email: parsed.email !== undefined ? parsed.email : prev.email,
        phoneNumber: parsed.phoneNumber !== undefined ? parsed.phoneNumber : prev.phoneNumber,

        // Specs (Q1, Q2, Q3, Q4, Q5, Q6)
        cakeSize: parsed.cakeSize || prev.cakeSize,
        cakeSizeOther: parsed.cakeSizeOther !== undefined ? parsed.cakeSizeOther : prev.cakeSizeOther,
        cakeType: parsed.cakeType || prev.cakeType,
        cakeTypeOther: parsed.cakeTypeOther !== undefined ? parsed.cakeTypeOther : prev.cakeTypeOther,
        icingType: parsed.icingType || prev.icingType,
        icingTypeOther: parsed.icingTypeOther !== undefined ? parsed.icingTypeOther : prev.icingTypeOther,
        occasion: parsed.occasion || prev.occasion,
        occasionOther: parsed.occasionOther !== undefined ? parsed.occasionOther : prev.occasionOther,
        colors: parsed.colors !== undefined ? parsed.colors : prev.colors,
        wordsOnCake: parsed.wordsOnCake !== undefined ? parsed.wordsOnCake : prev.wordsOnCake,

        // Filling & Dietary & Style (Q7, Q11, Q12)
        filling: parsed.filling || prev.filling,
        fillingOther: parsed.fillingOther !== undefined ? parsed.fillingOther : prev.fillingOther,
        allergies: parsed.allergies || prev.allergies,
        allergiesOther: parsed.allergiesOther !== undefined ? parsed.allergiesOther : prev.allergiesOther,
        cakeStyle: parsed.cakeStyle || prev.cakeStyle,
        cakeStyleOther: parsed.cakeStyleOther !== undefined ? parsed.cakeStyleOther : prev.cakeStyleOther,
        customDesignNotes: parsed.customDesignNotes !== undefined ? parsed.customDesignNotes : prev.customDesignNotes,

        // Pickup & Location (Q10)
        location: parsed.location || parsed.pickupLocation || prev.location,
        deliveryAddress: parsed.deliveryAddress !== undefined ? parsed.deliveryAddress : prev.deliveryAddress,
      }));

      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastAutoSyncTime(timeStr);
      if (parsed.estimatedTotal) {
        setEstimatorSyncNotice(`Auto-Synced with Pricing Estimator: $${parsed.estimatedTotal} Estimated Market Quote`);
      }
    };

    try {
      const saved = localStorage.getItem('daos_estimated_order');
      if (saved) {
        applyEstimatorData(JSON.parse(saved));
      }
    } catch {
      // Ignore
    }

    // Real-time custom event listener from CakeEstimatorSection
    const handleEstimatorSync = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        applyEstimatorData(customEvent.detail);
      }
    };

    window.addEventListener('daos_estimator_sync', handleEstimatorSync);
    window.addEventListener('storage', (e) => {
      if (e.key === 'daos_estimated_order' && e.newValue) {
        try {
          applyEstimatorData(JSON.parse(e.newValue));
        } catch {
          // Ignore
        }
      }
    });

    return () => {
      window.removeEventListener('daos_estimator_sync', handleEstimatorSync);
    };
  }, []);

  const handleChange = (field: keyof OrderFormData, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }

    // Auto-broadcast and save to sync with the Price Estimator
    try {
      const syncPayload = {
        firstName: updated.firstName,
        lastName: updated.lastName,
        email: updated.email,
        phoneNumber: updated.phoneNumber,
        cakeType: updated.cakeType,
        cakeTypeOther: updated.cakeTypeOther,
        cakeSize: updated.cakeSize,
        cakeSizeOther: updated.cakeSizeOther,
        icingType: updated.icingType,
        icingTypeOther: updated.icingTypeOther,
        occasion: updated.occasion,
        occasionOther: updated.occasionOther,
        colors: updated.colors,
        wordsOnCake: updated.wordsOnCake,
        filling: updated.filling,
        fillingOther: updated.fillingOther,
        allergies: updated.allergies,
        allergiesOther: updated.allergiesOther,
        cakeStyle: updated.cakeStyle,
        cakeStyleOther: updated.cakeStyleOther,
        customDesignNotes: updated.customDesignNotes,
        location: updated.location,
        pickupLocation: updated.location,
        deliveryAddress: updated.deliveryAddress,
        estimatedTotal: currentEstimatedTotal,
        depositAmount: currentDeposit,
        lastSyncedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      localStorage.setItem('daos_estimated_order', JSON.stringify(syncPayload));
      window.dispatchEvent(new CustomEvent('daos_form_sync', { detail: syncPayload }));
    } catch {
      // Ignore
    }
  };

  const validateSection = (section: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (section === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required.';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required.';
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required.';
    } else if (section === 2) {
      if (!formData.cakeType) newErrors.cakeType = 'Please select a cake type.';
      if (formData.cakeType === 'Other' && !formData.cakeTypeOther.trim()) {
        newErrors.cakeTypeOther = 'Please specify the cake flavor.';
      }
      if (!formData.cakeSize) newErrors.cakeSize = 'Please select a cake size.';
      if (formData.cakeSize === 'Other' && !formData.cakeSizeOther.trim()) {
        newErrors.cakeSizeOther = 'Please specify custom size.';
      }
      if (!formData.icingType) newErrors.icingType = 'Please select an icing type.';
      if (formData.icingType === 'Other' && !formData.icingTypeOther.trim()) {
        newErrors.icingTypeOther = 'Please specify the icing finish.';
      }
      if (!formData.occasion) newErrors.occasion = 'Please select an occasion.';
      if (formData.occasion === 'Other' && !formData.occasionOther.trim()) {
        newErrors.occasionOther = 'Please specify the occasion.';
      }
      if (!formData.colors.trim()) newErrors.colors = 'Please specify cake colors / palette.';
      if (!formData.wordsOnCake.trim()) newErrors.wordsOnCake = 'Please specify words or inscription on cake.';
    } else if (section === 3) {
      if (!formData.location) newErrors.location = 'Please select a pickup location.';
      if (formData.location.includes('Delivery') && !formData.deliveryAddress.trim()) {
        newErrors.deliveryAddress = 'Please enter your venue / delivery address.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateSection(currentSection)) {
      setCurrentSection((prev) => Math.min(prev + 1, 3));
      window.scrollTo({ top: document.getElementById('cake-order-form-container')?.offsetTop || 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: document.getElementById('cake-order-form-container')?.offsetTop || 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSection(3)) {
      const generatedId = `DAOS-${Date.now().toString().slice(-6)}`;
      setSubmissionId(generatedId);
      setIsSubmitted(true);
      window.scrollTo({ top: document.getElementById('cake-order-form-container')?.offsetTop || 0, behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-3xl border border-amber-200/80 shadow-xl overflow-hidden text-left" id="cake-order-form-container">
      
      {/* Top Banner with Section Steps */}
      <div className="bg-stone-900 text-stone-100 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Section {currentSection} of 3</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              DAOS Cakes Cake Order Form
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              Handcrafted custom cakes baked to order in Florida & Metro Atlanta.
            </p>
          </div>

          <a
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-200 border border-stone-700 transition-colors w-fit"
            title="Open in Google Forms directly"
          >
            <span>Open Google Form</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Stepper Progress Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mt-6">
          {[
            { num: 1, label: '1. Contact Details' },
            { num: 2, label: '2. Cake Specifications' },
            { num: 3, label: '3. Pickup & Location' }
          ].map((s) => {
            const isCompleted = currentSection > s.num;
            const isCurrent = currentSection === s.num;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => setCurrentSection(s.num)}
                className={`text-left p-2.5 sm:p-3 rounded-2xl border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-500/20 border-amber-400 text-white shadow-xs ring-2 ring-amber-400/40'
                    : isCompleted
                    ? 'bg-stone-800/80 border-stone-700 text-stone-300 hover:bg-stone-800'
                    : 'bg-stone-900/70 border-stone-800 text-stone-400 hover:bg-stone-800 hover:text-stone-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono font-bold uppercase">
                    Step {s.num}
                  </span>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <p className="text-xs sm:text-sm font-semibold truncate">
                  {s.label}
                </p>
              </button>
            );
          })}
        </div>

        {/* Persistent Imported from Price Estimator Banner */}
        {estimatorSyncNotice && (
          <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-amber-950/60 border border-amber-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start sm:items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse mt-1 sm:mt-0 shrink-0" />
              <div>
                <div className="font-bold text-amber-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Estimator Choices Fully Imported &amp; Synced:</span>
                </div>
                <div className="text-stone-300 text-[11px] mt-0.5">
                  <strong>{formData.cakeSize}</strong> • <strong>{formData.cakeType === 'Other' ? (formData.cakeTypeOther || 'Custom') : formData.cakeType}</strong> • <strong>{formData.icingType}</strong> • Colors: <em>"{formData.colors || 'Custom'}"</em> • Inscription: <em>"{formData.wordsOnCake || 'None'}"</em>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="font-serif text-lg font-bold text-amber-300">${currentEstimatedTotal}</span>
              <button
                type="button"
                onClick={() => setCurrentSection(2)}
                className="px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors cursor-pointer"
              >
                View Section 2 Details
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation State */}
      {isSubmitted ? (
        <div className="p-8 sm:p-12 text-center space-y-8 animate-in fade-in">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              Reference #{submissionId}
            </span>
            <h3 className="font-serif text-3xl font-bold text-stone-900">
              Thank You, {formData.firstName}!
            </h3>
            <p className="text-stone-700 text-base leading-relaxed">
              Your cake order request has been received. We will contact you at{' '}
              <strong className="text-stone-900">{formData.phoneNumber}</strong> to confirm your custom design and coordinate details.
            </p>
          </div>

          {/* Summary Box */}
          <div className="max-w-2xl mx-auto bg-stone-50 rounded-2xl p-6 border border-stone-200 text-left space-y-4 text-xs sm:text-sm">
            <h4 className="font-serif font-bold text-stone-900 text-base border-b border-stone-200 pb-2 flex items-center justify-between">
              <span>Complete Order Summary</span>
              <span className="text-amber-800 text-sm font-bold font-mono">${currentEstimatedTotal}</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-stone-500 font-medium">Customer Contact:</span>
                <p className="font-semibold text-stone-900">{formData.firstName} {formData.lastName}</p>
                <p className="text-stone-600">{formData.phoneNumber}</p>
                {formData.email && <p className="text-stone-600">{formData.email}</p>}
              </div>

              <div>
                <span className="text-stone-500 font-medium">Cake Size &amp; Sponge:</span>
                <p className="font-semibold text-stone-900">{formData.cakeSize === 'Other' ? (formData.cakeSizeOther || 'Custom Size') : formData.cakeSize} • {formData.cakeType === 'Other' ? formData.cakeTypeOther : formData.cakeType}</p>
                <p className="text-stone-600">Icing: {formData.icingType === 'Other' ? formData.icingTypeOther : formData.icingType}</p>
                <p className="text-stone-600">Occasion: {formData.occasion === 'Other' ? formData.occasionOther : formData.occasion}</p>
              </div>

              <div>
                <span className="text-stone-500 font-medium">Design, Text &amp; Filling:</span>
                <p className="text-stone-800"><strong>Colors:</strong> {formData.colors}</p>
                <p className="text-stone-800"><strong>Inscription:</strong> "{formData.wordsOnCake}"</p>
                <p className="text-stone-800"><strong>Filling:</strong> {fillingObj.name}</p>
              </div>

              <div>
                <span className="text-stone-500 font-medium">Pickup / Delivery Location:</span>
                <p className="font-semibold text-stone-900">{formData.location}</p>
                {formData.deliveryAddress && <p className="text-stone-500 text-[11px]">Address: {formData.deliveryAddress}</p>}
                <p className="text-amber-900 font-semibold text-xs mt-1">Payment: Cash on Pickup</p>
              </div>

              <div>
                <span className="text-stone-500 font-medium">Dietary Requirements:</span>
                <p className="font-semibold text-stone-900">{dietaryObj.name}</p>
              </div>

              <div>
                <span className="text-stone-500 font-medium">Aesthetic Style &amp; Notes:</span>
                <p className="font-semibold text-stone-900">{styleObj.name}</p>
                {formData.customDesignNotes && <p className="text-stone-600 text-xs italic mt-0.5">"{formData.customDesignNotes}"</p>}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-stone-800 text-xs">
              <strong>Need immediate assistance?</strong> Call us at{' '}
              <a href="tel:4706761631" className="underline font-bold text-amber-900">(470) 676-1631</a> or{' '}
              <a href="tel:6782350482" className="underline font-bold text-amber-900">(678) 235-0482</a>.
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <button
              onClick={handlePrint}
              className="px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm inline-flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save Receipt</span>
            </button>
            <button
              onClick={() => {
                setFormData(INITIAL_FORM_DATA);
                setIsSubmitted(false);
                setCurrentSection(1);
              }}
              className="px-6 py-3 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-sm cursor-pointer"
            >
              Submit Another Cake Order
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">

          {/* ========================================================================= */}
          {/* SECTION 1: Contact Details (Question 13) */}
          {/* ========================================================================= */}
          {currentSection === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-stone-200 pb-4">
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-amber-800" />
                  <span>Section 1: Contact Information</span>
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Please provide your contact details so we can coordinate your design call and order updates (Question 13 of Price Estimator).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-bold text-stone-800" htmlFor="field-first-name">
                    First Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="field-first-name"
                    type="text"
                    required
                    placeholder="e.g. Sarah"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-stone-900 text-sm transition-all"
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-bold text-stone-800" htmlFor="field-last-name">
                    Last Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="field-last-name"
                    type="text"
                    required
                    placeholder="e.g. Jenkins"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-stone-900 text-sm transition-all"
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.lastName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-bold text-stone-800" htmlFor="field-email">
                    Email <span className="text-stone-400 font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <input
                      id="field-email"
                      type="email"
                      placeholder="e.g. sarah.jenkins@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-stone-900 text-sm transition-all"
                    />
                    <Mail className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-bold text-stone-800" htmlFor="field-phone">
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="field-phone"
                      type="tel"
                      required
                      placeholder="e.g. (470) 555-0199"
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange('phoneNumber', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-stone-900 text-sm transition-all"
                    />
                    <Phone className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.phoneNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 2: Order Details (Questions 1, 2, 3, 4, 5, 6, 7, 11, 12) */}
          {/* ========================================================================= */}
          {currentSection === 2 && (
            <div className="space-y-8 animate-in fade-in">
              <div className="border-b border-stone-200 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
                    <Cake className="w-5 h-5 text-amber-800" />
                    <span>Section 2: Complete Cake Specifications</span>
                  </h4>
                  {estimatorSyncNotice && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{estimatorSyncNotice}</span>
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  All selections from your 13-question Price Estimator are imported below and can be adjusted anytime.
                </p>
              </div>

              {/* Real-time Synced Live Pricing Estimator Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 text-white border border-stone-800 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                        Auto-Synced Market Pricing
                      </span>
                      <span className="text-[11px] text-stone-400">({lastAutoSyncTime})</span>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif text-3xl font-bold text-amber-300">
                        ${currentEstimatedTotal}
                      </span>
                      <span className="text-xs text-stone-300">
                        (~${currentPerGuest} / serving • 50% Deposit: <strong className="text-emerald-400">${currentDeposit}</strong>)
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href="#estimator"
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById('estimator');
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          window.location.href = '/pricing-estimator';
                        }
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Customize in Full Estimator</span>
                    </a>
                  </div>
                </div>
                <div className="mt-3 pt-2.5 border-t border-stone-800 text-[11px] text-stone-400 flex flex-wrap items-center justify-between gap-2">
                  <span>
                    Current Specs: <strong>{formData.cakeSize || '8 INCH'}</strong> • <strong>{formData.cakeType}</strong> • <strong>{formData.icingType}</strong> • <strong>{fillingObj.name}</strong>
                  </span>
                  <span className="text-stone-500">*Live synchronized across form &amp; estimator</span>
                </div>
              </div>

              {/* 1. Cake Size */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs sm:text-sm font-bold text-stone-900">
                    1. Cake Size &amp; Servings <span className="text-red-600">*</span>
                  </label>
                  <span className="text-xs text-stone-500 font-mono">Question 1</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {CAKE_SIZES.map((item) => {
                    const isSelected = formData.cakeSize === item.size;
                    return (
                      <button
                        key={item.size}
                        type="button"
                        onClick={() => handleChange('cakeSize', item.size)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-100/90 border-amber-500 text-amber-950 shadow-xs'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-amber-300 hover:bg-amber-50/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-bold text-sm text-stone-900">
                            {item.size}
                          </span>
                          <span className="text-xs font-mono font-bold text-amber-800">${item.base}</span>
                        </div>
                        <p className="text-[11px] text-stone-600 mt-1 font-normal">
                          {item.servings}
                        </p>
                      </button>
                    );
                  })}
                </div>
                {formData.cakeSize === 'Other' && (
                  <input
                    type="text"
                    placeholder="Please specify custom size / guest count..."
                    value={formData.cakeSizeOther}
                    onChange={(e) => handleChange('cakeSizeOther', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-200 outline-none text-xs sm:text-sm text-stone-900"
                  />
                )}
              </div>

              {/* 2. Cake Type */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs sm:text-sm font-bold text-stone-900">
                    2. Cake Flavor / Sponge <span className="text-red-600">*</span>
                  </label>
                  <span className="text-xs text-stone-500 font-mono">Question 2</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {CAKE_TYPES.map((type) => {
                    const isSelected = formData.cakeType === type.name;
                    return (
                      <button
                        key={type.name}
                        type="button"
                        onClick={() => handleChange('cakeType', type.name)}
                        className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-100/90 border-amber-500 text-amber-950 font-bold shadow-xs'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-amber-300 hover:bg-amber-50/40'
                        }`}
                      >
                        <span>{type.name}</span>
                        {type.premium > 0 && <span className="text-[10px] text-amber-800 font-mono font-bold">+${type.premium}</span>}
                      </button>
                    );
                  })}
                </div>
                {formData.cakeType === 'Other' && (
                  <input
                    type="text"
                    placeholder="Please specify custom cake flavor..."
                    value={formData.cakeTypeOther}
                    onChange={(e) => handleChange('cakeTypeOther', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-200 outline-none text-xs sm:text-sm text-stone-900"
                  />
                )}
              </div>

              {/* 3. Icing Type */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs sm:text-sm font-bold text-stone-900">
                    3. Icing &amp; Exterior Finish <span className="text-red-600">*</span>
                  </label>
                  <span className="text-xs text-stone-500 font-mono">Question 3</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {ICING_TYPES.map((icing) => {
                    const isSelected = formData.icingType === icing.name;
                    return (
                      <button
                        key={icing.name}
                        type="button"
                        onClick={() => handleChange('icingType', icing.name)}
                        className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-100/90 border-amber-500 text-amber-950 font-bold shadow-xs'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-amber-300 hover:bg-amber-50/40'
                        }`}
                      >
                        <span>{icing.name}</span>
                        {icing.price > 0 && <span className="text-[10px] text-amber-800 font-mono font-bold">+${icing.price}</span>}
                      </button>
                    );
                  })}
                </div>
                {formData.icingType === 'Other' && (
                  <input
                    type="text"
                    placeholder="Please specify custom icing finish..."
                    value={formData.icingTypeOther}
                    onChange={(e) => handleChange('icingTypeOther', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-200 outline-none text-xs sm:text-sm text-stone-900"
                  />
                )}
              </div>

              {/* 4. Occasion */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs sm:text-sm font-bold text-stone-900">
                    4. Occasion <span className="text-red-600">*</span>
                  </label>
                  <span className="text-xs text-stone-500 font-mono">Question 4</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {OCCASIONS.map((occ) => {
                    const isSelected = formData.occasion === occ.name;
                    return (
                      <button
                        key={occ.name}
                        type="button"
                        onClick={() => handleChange('occasion', occ.name)}
                        className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-100/90 border-amber-500 text-amber-950 font-bold shadow-xs'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-amber-300 hover:bg-amber-50/40'
                        }`}
                      >
                        <span>{occ.name}</span>
                        {occ.price > 0 && <span className="text-[10px] text-amber-800 font-mono font-bold">+${occ.price}</span>}
                      </button>
                    );
                  })}
                </div>
                {formData.occasion === 'Other' && (
                  <input
                    type="text"
                    placeholder="Please specify occasion..."
                    value={formData.occasionOther}
                    onChange={(e) => handleChange('occasionOther', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-200 outline-none text-xs sm:text-sm text-stone-900"
                  />
                )}
              </div>

              {/* 5. Colors & 6. Words on Cake */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs sm:text-sm font-bold text-stone-900" htmlFor="field-colors">
                      5. Color Palette &amp; Theme <span className="text-red-600">*</span>
                    </label>
                    <span className="text-xs text-stone-500 font-mono">Question 5</span>
                  </div>
                  <input
                    id="field-colors"
                    type="text"
                    required
                    placeholder="e.g. Sage green, cream, and gold accents"
                    value={formData.colors}
                    onChange={(e) => handleChange('colors', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-stone-900 text-sm transition-all"
                  />
                  {errors.colors && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.colors}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs sm:text-sm font-bold text-stone-900" htmlFor="field-words-on-cake">
                      6. Words on Cake / Inscription <span className="text-red-600">*</span>
                    </label>
                    <span className="text-xs text-stone-500 font-mono">Question 6</span>
                  </div>
                  <input
                    id="field-words-on-cake"
                    type="text"
                    required
                    placeholder="e.g. Happy 30th Birthday Alex!"
                    value={formData.wordsOnCake}
                    onChange={(e) => handleChange('wordsOnCake', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-stone-900 text-sm transition-all"
                  />
                  {errors.wordsOnCake && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.wordsOnCake}
                    </p>
                  )}
                </div>
              </div>

              {/* 7. Gourmet Filling */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs sm:text-sm font-bold text-stone-900">
                    7. Gourmet Inner Layer Filling
                  </label>
                  <span className="text-xs text-stone-500 font-mono">Question 7</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {FILLING_OPTIONS.map((f) => {
                    const isSelected = formData.filling === f.id || formData.filling === f.name;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => handleChange('filling', f.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-100/90 border-amber-500 text-amber-950 shadow-xs'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-amber-300 hover:bg-amber-50/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-stone-900">{f.name}</span>
                          <span className="text-xs font-mono font-bold text-amber-800">
                            {f.price > 0 ? `+$${f.price}` : 'Included'}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-600 mt-1">{f.desc}</p>
                      </button>
                    );
                  })}
                </div>
                {formData.filling === 'other' && (
                  <input
                    type="text"
                    placeholder="Specify bespoke inner filling flavor..."
                    value={formData.fillingOther}
                    onChange={(e) => handleChange('fillingOther', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-200 outline-none text-xs sm:text-sm text-stone-900"
                  />
                )}
              </div>

              {/* 11. Dietary & Allergies & 12. Cake Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs sm:text-sm font-bold text-stone-900">
                      11. Dietary &amp; Allergy Accommodations
                    </label>
                    <span className="text-xs text-stone-500 font-mono">Question 11</span>
                  </div>
                  <div className="space-y-2">
                    {DIETARY_OPTIONS.map((d) => {
                      const isSelected = formData.allergies === d.id || formData.allergies === d.name;
                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => handleChange('allergies', d.id)}
                          className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-amber-100/90 border-amber-500 text-amber-950 font-bold'
                              : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-amber-300'
                          }`}
                        >
                          <div>
                            <span>{d.name}</span>
                            <p className="text-[10px] text-stone-500 font-normal">{d.desc}</p>
                          </div>
                          {d.cost > 0 && <span className="text-[11px] font-mono text-amber-800 shrink-0 font-bold">+${d.cost}</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs sm:text-sm font-bold text-stone-900">
                      12. Cake Aesthetic Style
                    </label>
                    <span className="text-xs text-stone-500 font-mono">Question 12</span>
                  </div>
                  <div className="space-y-2">
                    {CAKE_STYLES.map((st) => {
                      const isSelected = formData.cakeStyle === st.id || formData.cakeStyle === st.name;
                      return (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => handleChange('cakeStyle', st.id)}
                          className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-amber-100/90 border-amber-500 text-amber-950 font-bold'
                              : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-amber-300'
                          }`}
                        >
                          <div>
                            <span>{st.name}</span>
                            <p className="text-[10px] text-stone-500 font-normal">{st.desc}</p>
                          </div>
                          {st.cost > 0 && <span className="text-[11px] font-mono text-amber-800 shrink-0 font-bold">+${st.cost}</span>}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2">
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Custom Design Notes &amp; Specific Details:
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Add any specific design notes, piping wishes, or theme ideas..."
                      value={formData.customDesignNotes}
                      onChange={(e) => handleChange('customDesignNotes', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-xs text-stone-900"
                    />
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 3: Pickup & Location (Question 10) */}
          {/* ========================================================================= */}
          {currentSection === 3 && (
            <div className="space-y-8 animate-in fade-in">
              <div className="border-b border-stone-200 pb-4">
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-800" />
                  <span>Section 3: Pickup &amp; Delivery</span>
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Choose your preferred community pickup point or white-glove delivery, and review order payment terms.
                </p>
              </div>

              {/* Location Selectors */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs sm:text-sm font-bold text-stone-900">
                    Pickup Location or Delivery Method <span className="text-red-600">*</span>
                  </label>
                  <span className="text-xs text-stone-500 font-mono">Question 10</span>
                </div>
                <div className="space-y-3">
                  {PICKUP_LOCATIONS.map((loc) => {
                    const isSelected = formData.location === loc.id;
                    return (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => handleChange('location', loc.id)}
                        className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-4 cursor-pointer ${
                          isSelected
                            ? 'bg-amber-100/90 border-amber-500 shadow-xs'
                            : 'bg-stone-50 border-stone-200 hover:border-amber-300 hover:bg-amber-50/40'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
                              {loc.tag}
                            </span>
                            <h5 className="font-serif font-bold text-sm sm:text-base text-stone-900">
                              {loc.name}
                            </h5>
                          </div>
                          <p className="text-xs text-stone-600 font-mono">
                            📍 {loc.address}
                          </p>
                        </div>
                        <div className="shrink-0 pt-1">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-amber-600 bg-amber-600 text-white' : 'border-stone-400'
                          }`}>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {formData.location.includes('Delivery') && (
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-stone-800 mb-1" htmlFor="field-delivery-address">
                      Venue / Residential Delivery Street Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="field-delivery-address"
                      type="text"
                      required
                      placeholder="e.g. 123 Peachtree St NE, Atlanta, GA 30303"
                      value={formData.deliveryAddress}
                      onChange={(e) => handleChange('deliveryAddress', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-stone-900 text-sm transition-all"
                    />
                    {errors.deliveryAddress && (
                      <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.deliveryAddress}
                      </p>
                    )}
                  </div>
                )}

                {errors.location && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.location}
                  </p>
                )}
              </div>

              {/* Informational Cards: Verification, Address & Payment */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                
                {/* 1. Call Us to Verify */}
                <div className="p-4 rounded-2xl bg-stone-900 text-stone-200 space-y-2 border border-stone-800">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                    <PhoneCall className="w-4 h-4" />
                    <span>Call Us to Verify</span>
                  </div>
                  <p className="text-xs text-stone-300">
                    Phone numbers for order status & questions:
                  </p>
                  <div className="space-y-1 pt-1 font-mono text-xs font-semibold text-white">
                    <a href="tel:4706761631" className="block hover:text-amber-300 transition-colors">
                      (470) 676-1631
                    </a>
                    <a href="tel:6782350482" className="block hover:text-amber-300 transition-colors">
                      (678) 235-0482
                    </a>
                  </div>
                </div>

                {/* 2. Pickup Location Addresses */}
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-stone-900 space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                    <MapPin className="w-4 h-4 text-amber-800" />
                    <span>Locations Address</span>
                  </div>
                  <ul className="text-[11px] text-stone-700 space-y-1.5 leading-snug">
                    <li>1. Children's Healthcare Park: 755 Battery Ave SE, Atlanta, GA 30339</li>
                    <li>2. BP Gas Station: 2535 Cobb Pkwy SE, Smyrna, GA 30080</li>
                    <li>3. Public Storage: 2460 Herodian Way, Smyrna, GA 30080</li>
                  </ul>
                </div>

                {/* 3. Payment */}
                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                    <DollarSign className="w-4 h-4" />
                    <span>Payment</span>
                  </div>
                  <p className="font-serif font-bold text-base text-emerald-950">
                    Cash on Pickup
                  </p>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    Final balance is collected in cash upon inspecting and receiving your handcrafted cake.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* Form Navigation Buttons */}
          <div className="flex items-center justify-between gap-4 pt-6 border-t border-stone-200">
            {currentSection > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-3 rounded-full border border-stone-300 hover:bg-stone-100 text-stone-800 font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back (Section {currentSection - 1})</span>
              </button>
            ) : (
              <div />
            )}

            {currentSection < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-7 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <span>Continue to Section {currentSection + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Submit Cake Order</span>
              </button>
            )}
          </div>

        </form>
      )}

    </div>
  );
}
