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
  Printer
} from 'lucide-react';

interface OrderFormData {
  // Section 1: Contact
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;

  // Section 2: Order Details
  cakeType: string;
  cakeTypeOther: string;
  cakeSize: string;
  icingType: string;
  icingTypeOther: string;
  occasion: string;
  occasionOther: string;
  colors: string;
  wordsOnCake: string;

  // Section 3: Schedule a Call
  callDate: string;
  callTime: string;

  // Section 4: Pickup
  pickupDate: string;
  pickupTime: string;
  location: string;
}

const INITIAL_FORM_DATA: OrderFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  cakeType: 'Vanilla Sponge',
  cakeTypeOther: '',
  cakeSize: '8 INCH',
  icingType: 'American Buttercream',
  icingTypeOther: '',
  occasion: 'Birthday',
  occasionOther: '',
  colors: '',
  wordsOnCake: '',
  callDate: '',
  callTime: '11:00',
  pickupDate: '',
  pickupTime: '14:00',
  location: "1. Truist Park: Infront of Children's Healthcare of Atlanta Park"
};

const CAKE_TYPES = [
  'Vanilla Sponge',
  'Rich Chocolate',
  'Red Velvet',
  'Carrot Cake',
  'Other'
];

const CAKE_SIZES = [
  { size: '4 INCH', servings: '2-4 Servings (Mini Celebration)' },
  { size: '6 INCH', servings: '6-10 Servings (Intimate Gathering)' },
  { size: '8 INCH', servings: '12-16 Servings (Popular Party Size)' },
  { size: '10 INCH', servings: '20-28 Servings (Large Celebration)' },
  { size: '12 INCH', servings: '30-40 Servings (Event / Grand Party)' }
];

const ICING_TYPES = [
  'American Buttercream',
  'Swiss Meringue Buttercream',
  'Cream Cheese Frosting',
  'Chocolate Ganache',
  'Fondant Finish',
  'Whipped Cream Frosting',
  'Other'
];

const OCCASIONS = [
  'Anniversary',
  'Birthday',
  'Breakfast Event',
  "Mother's Day Special",
  'Party',
  'Staff Party',
  'Wedding',
  'Other'
];

const PICKUP_LOCATIONS = [
  {
    id: "1. Truist Park: Infront of Children's Healthcare of Atlanta Park",
    name: "Truist Park (Infront of Children's Healthcare of Atlanta Park)",
    address: "755 Battery Ave SE, Atlanta, GA 30339",
    tag: "Option 1"
  },
  {
    id: "2. BP Gas Station : Cobb Pkwy and Herodian Way Intersection",
    name: "BP Gas Station (Cobb Pkwy & Herodian Way Intersection)",
    address: "2535 Cobb Pkwy SE, Smyrna, GA 30080",
    tag: "Option 2"
  },
  {
    id: "3. Public Storage - Herodian Way",
    name: "Public Storage - Herodian Way",
    address: "2460 Herodian Way, Smyrna, GA 30080",
    tag: "Option 3"
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

  const handleChange = (field: keyof OrderFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
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
        newErrors.cakeTypeOther = 'Please specify the cake type.';
      }
      if (!formData.cakeSize) newErrors.cakeSize = 'Please select a cake size.';
      if (!formData.icingType) newErrors.icingType = 'Please select an icing type.';
      if (formData.icingType === 'Other' && !formData.icingTypeOther.trim()) {
        newErrors.icingTypeOther = 'Please specify the icing type.';
      }
      if (!formData.occasion) newErrors.occasion = 'Please select an occasion.';
      if (formData.occasion === 'Other' && !formData.occasionOther.trim()) {
        newErrors.occasionOther = 'Please specify the occasion.';
      }
      if (!formData.colors.trim()) newErrors.colors = 'Please specify desired cake colors.';
      if (!formData.wordsOnCake.trim()) newErrors.wordsOnCake = 'Please specify words or inscription on cake.';
    } else if (section === 3) {
      if (!formData.callDate) newErrors.callDate = 'Call date is required.';
      if (!formData.callTime) newErrors.callTime = 'Call time is required.';
    } else if (section === 4) {
      if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required.';
      if (!formData.pickupTime) newErrors.pickupTime = 'Pickup time is required.';
      if (!formData.location) newErrors.location = 'Please select a pickup location.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateSection(currentSection)) {
      setCurrentSection((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: document.getElementById('order-form')?.offsetTop || 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: document.getElementById('order-form')?.offsetTop || 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSection(4)) {
      const generatedId = `DAOS-${Date.now().toString().slice(-6)}`;
      setSubmissionId(generatedId);
      setIsSubmitted(true);
      window.scrollTo({ top: document.getElementById('order-form')?.offsetTop || 0, behavior: 'smooth' });
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
              <span>Section {currentSection} of 4</span>
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
        <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-6">
          {[
            { num: 1, label: 'Contact Details' },
            { num: 2, label: 'Order Details' },
            { num: 3, label: 'Schedule a Call' },
            { num: 4, label: 'Pickup & Verification' }
          ].map((s) => {
            const isCompleted = currentSection > s.num;
            const isCurrent = currentSection === s.num;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => {
                  if (s.num < currentSection) setCurrentSection(s.num);
                }}
                disabled={s.num > currentSection}
                className={`text-left p-2.5 sm:p-3 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-amber-500/20 border-amber-400 text-white shadow-xs'
                    : isCompleted
                    ? 'bg-stone-800/80 border-stone-700 text-stone-300 hover:bg-stone-800 cursor-pointer'
                    : 'bg-stone-900/50 border-stone-800 text-stone-500 opacity-60 cursor-not-allowed'
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
              Your cake order request has been received. We will connect with you for your scheduled design call on{' '}
              <strong className="text-stone-900">{formData.callDate}</strong> at{' '}
              <strong className="text-stone-900">{formData.callTime}</strong>.
            </p>
          </div>

          {/* Summary Box */}
          <div className="max-w-2xl mx-auto bg-stone-50 rounded-2xl p-6 border border-stone-200 text-left space-y-4 text-xs sm:text-sm">
            <h4 className="font-serif font-bold text-stone-900 text-base border-b border-stone-200 pb-2">
              Order Summary
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-stone-500 font-medium">Customer:</span>
                <p className="font-semibold text-stone-900">{formData.firstName} {formData.lastName}</p>
                <p className="text-stone-600">{formData.phoneNumber}</p>
                {formData.email && <p className="text-stone-600">{formData.email}</p>}
              </div>

              <div>
                <span className="text-stone-500 font-medium">Cake Specifications:</span>
                <p className="font-semibold text-stone-900">{formData.cakeSize} • {formData.cakeType === 'Other' ? formData.cakeTypeOther : formData.cakeType}</p>
                <p className="text-stone-600">Icing: {formData.icingType === 'Other' ? formData.icingTypeOther : formData.icingType}</p>
                <p className="text-stone-600">Occasion: {formData.occasion === 'Other' ? formData.occasionOther : formData.occasion}</p>
              </div>

              <div>
                <span className="text-stone-500 font-medium">Design & Customization:</span>
                <p className="text-stone-800"><strong>Colors:</strong> {formData.colors}</p>
                <p className="text-stone-800"><strong>Inscription:</strong> "{formData.wordsOnCake}"</p>
              </div>

              <div>
                <span className="text-stone-500 font-medium">Scheduled Pickup:</span>
                <p className="font-semibold text-stone-900">{formData.pickupDate} at {formData.pickupTime}</p>
                <p className="text-stone-700 text-xs mt-1">{formData.location}</p>
                <p className="text-amber-900 font-semibold text-xs mt-1">Payment: Cash on Pickup</p>
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
          {/* SECTION 1: Contact Details */}
          {/* ========================================================================= */}
          {currentSection === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-stone-200 pb-4">
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-amber-800" />
                  <span>Section 1: Contact Information</span>
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Please provide your contact details so we can coordinate your design call and order updates.
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
          {/* SECTION 2: Order Details */}
          {/* ========================================================================= */}
          {currentSection === 2 && (
            <div className="space-y-8 animate-in fade-in">
              <div className="border-b border-stone-200 pb-4">
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
                  <Cake className="w-5 h-5 text-amber-800" />
                  <span>Section 2: Order Details</span>
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Customize the sponge flavor, size, frosting finish, occasion, and custom writing.
                </p>
              </div>

              {/* 1. Cake Type */}
              <div className="space-y-3">
                <label className="block text-xs sm:text-sm font-bold text-stone-900">
                  Cake Type <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {CAKE_TYPES.map((type) => {
                    const isSelected = formData.cakeType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleChange('cakeType', type)}
                        className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-100/90 border-amber-500 text-amber-950 font-bold shadow-xs'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-amber-300 hover:bg-amber-50/40'
                        }`}
                      >
                        {type}
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
                {errors.cakeTypeOther && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.cakeTypeOther}
                  </p>
                )}
              </div>

              {/* 2. Cake Size */}
              <div className="space-y-3">
                <label className="block text-xs sm:text-sm font-bold text-stone-900">
                  Cake Size <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {CAKE_SIZES.map((item) => {
                    const isSelected = formData.cakeSize === item.size;
                    return (
                      <button
                        key={item.size}
                        type="button"
                        onClick={() => handleChange('cakeSize', item.size)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-100/90 border-amber-500 text-amber-950 shadow-xs'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-amber-300 hover:bg-amber-50/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-bold text-base text-stone-900">
                            {item.size}
                          </span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-800" />}
                        </div>
                        <p className="text-xs text-stone-600 mt-1 font-normal">
                          {item.servings}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Icing Type */}
              <div className="space-y-3">
                <label className="block text-xs sm:text-sm font-bold text-stone-900">
                  Icing Type <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {ICING_TYPES.map((icing) => {
                    const isSelected = formData.icingType === icing;
                    return (
                      <button
                        key={icing}
                        type="button"
                        onClick={() => handleChange('icingType', icing)}
                        className={`p-3 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-100/90 border-amber-500 text-amber-950 font-bold shadow-xs'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-amber-300 hover:bg-amber-50/40'
                        }`}
                      >
                        {icing}
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
                {errors.icingTypeOther && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.icingTypeOther}
                  </p>
                )}
              </div>

              {/* 4. Occasion */}
              <div className="space-y-3">
                <label className="block text-xs sm:text-sm font-bold text-stone-900">
                  Occasion <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {OCCASIONS.map((occ) => {
                    const isSelected = formData.occasion === occ;
                    return (
                      <button
                        key={occ}
                        type="button"
                        onClick={() => handleChange('occasion', occ)}
                        className={`p-3 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-100/90 border-amber-500 text-amber-950 font-bold shadow-xs'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-amber-300 hover:bg-amber-50/40'
                        }`}
                      >
                        {occ}
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
                {errors.occasionOther && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.occasionOther}
                  </p>
                )}
              </div>

              {/* 5. Colors & 6. Words on Cake */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-bold text-stone-900" htmlFor="field-colors">
                    Colors <span className="text-red-600">*</span>
                  </label>
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
                  <label className="block text-xs sm:text-sm font-bold text-stone-900" htmlFor="field-words-on-cake">
                    Words on Cake <span className="text-red-600">*</span>
                  </label>
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
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 3: Schedule a Call */}
          {/* ========================================================================= */}
          {currentSection === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-stone-200 pb-4">
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
                  <PhoneCall className="w-5 h-5 text-amber-800" />
                  <span>Section 3: Schedule a Call</span>
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  We will connect for a brief 5-10 minute design consultation to align on your cake concept and quote.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Call Date */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-bold text-stone-900" htmlFor="field-call-date">
                    Call Date <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="field-call-date"
                      type="date"
                      required
                      value={formData.callDate}
                      onChange={(e) => handleChange('callDate', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-stone-900 text-sm transition-all"
                    />
                  </div>
                  {errors.callDate && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.callDate}
                    </p>
                  )}
                </div>

                {/* Call Time */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-bold text-stone-900" htmlFor="field-call-time">
                    Call Time <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="field-call-time"
                      type="time"
                      required
                      value={formData.callTime}
                      onChange={(e) => handleChange('callTime', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-stone-900 text-sm transition-all"
                    />
                  </div>
                  {errors.callTime && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.callTime}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-stone-800 text-xs sm:text-sm flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-800">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-stone-900 block">Design Call Prep</strong>
                  <span>Have any inspiration pictures or theme color swatches handy when we call to ensure every detail is captured accurately.</span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 4: Pickup & Verification */}
          {/* ========================================================================= */}
          {currentSection === 4 && (
            <div className="space-y-8 animate-in fade-in">
              <div className="border-b border-stone-200 pb-4">
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-800" />
                  <span>Section 4: Pickup Details & Verification</span>
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Choose your preferred community pickup point, date, and review order payment terms.
                </p>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-bold text-stone-900" htmlFor="field-pickup-date">
                    Pickup Date <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="field-pickup-date"
                    type="date"
                    required
                    value={formData.pickupDate}
                    onChange={(e) => handleChange('pickupDate', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-stone-900 text-sm transition-all"
                  />
                  {errors.pickupDate && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.pickupDate}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-bold text-stone-900" htmlFor="field-pickup-time">
                    Pickup Time <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="field-pickup-time"
                    type="time"
                    required
                    value={formData.pickupTime}
                    onChange={(e) => handleChange('pickupTime', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-stone-900 text-sm transition-all"
                  />
                  {errors.pickupTime && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.pickupTime}
                    </p>
                  )}
                </div>
              </div>

              {/* Location Selectors */}
              <div className="space-y-3">
                <label className="block text-xs sm:text-sm font-bold text-stone-900">
                  Select Pickup Location <span className="text-red-600">*</span>
                </label>
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

            {currentSection < 4 ? (
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
