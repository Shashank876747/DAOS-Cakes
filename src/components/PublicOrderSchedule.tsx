import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  Calendar,
  Sparkles,
  RefreshCw,
  Eye,
  EyeOff,
  ShieldCheck,
  Code,
  Clock,
  Cake,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export interface PublicCakeOrder {
  id: string;
  flavor: string;
  design: string;
  size?: string;
  pickupDate: string; // YYYY-MM-DD
  status?: string;
}

interface PublicOrderScheduleProps {
  onOpenAppsScriptGuide?: () => void;
}

export default function PublicOrderSchedule({ onOpenAppsScriptGuide }: PublicOrderScheduleProps) {
  const [orders, setOrders] = useState<PublicCakeOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showExpired, setShowExpired] = useState<boolean>(false);
  const [customDataUrl, setCustomDataUrl] = useState<string>('');
  const [activeSource, setActiveSource] = useState<string>('Local / public/data.json');

  // Helper to check if a date is today or in the future
  const isOrderActive = (pickupDateStr: string): boolean => {
    if (!pickupDateStr) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    // Parse YYYY-MM-DD cleanly
    const parts = pickupDateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // 0-indexed
      const day = parseInt(parts[2], 10);
      const orderDate = new Date(year, month, day, 23, 59, 59); // End of pickup day
      return orderDate >= today;
    }

    const orderDate = new Date(pickupDateStr);
    return orderDate >= today;
  };

  // Helper to calculate days remaining until pickup
  const getDaysDifference = (pickupDateStr: string): { label: string; isPast: boolean } => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const parts = pickupDateStr.split('-');
    let orderDate: Date;
    if (parts.length === 3) {
      orderDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    } else {
      orderDate = new Date(pickupDateStr);
    }
    orderDate.setHours(0, 0, 0, 0);

    const diffTime = orderDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { label: `${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? '' : 's'} ago (Expired)`, isPast: true };
    } else if (diffDays === 0) {
      return { label: 'Today!', isPast: false };
    } else if (diffDays === 1) {
      return { label: 'Tomorrow', isPast: false };
    } else {
      return { label: `In ${diffDays} days`, isPast: false };
    }
  };

  // Fetch orders function
  const fetchOrders = async (urlToFetch?: string) => {
    setLoading(true);
    setError(null);
    const targetUrl = urlToFetch || '/data.json';

    try {
      const response = await fetch(targetUrl, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status} fetching data.json`);
      }
      const data: PublicCakeOrder[] = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Data format error: Expected JSON array of orders');
      }
      setOrders(data);
      setActiveSource(urlToFetch ? 'Custom GitHub Raw / Remote JSON' : 'Local / public/data.json');
    } catch (err: any) {
      console.warn('Error fetching data.json:', err);
      setError(err.message || 'Failed to load public orders file.');
      // Fallback sample data in case fetch fails
      setOrders([
        {
          id: 'CAKE-1001',
          flavor: 'Classic Vanilla Bean & Swiss Buttercream',
          design: 'Botanical Floral Palette & Pastel Gold Accents',
          size: '3-Tier 8-inch Celebration',
          pickupDate: '2026-08-08',
          status: 'Scheduled'
        },
        {
          id: 'CAKE-1002',
          flavor: 'Rich Chocolate Fudge & Dark Ganache',
          design: 'Textured Rustic Knife Strokes & Fresh Strawberries',
          size: '2-Tier 6-inch Birthday',
          pickupDate: '2026-08-12',
          status: 'Scheduled'
        },
        {
          id: 'CAKE-1003',
          flavor: 'Red Velvet & Whipped Cream Cheese',
          design: 'Minimalist Vintage Piping & Velvet Ribbon',
          size: '10-inch Single Tier',
          pickupDate: '2026-08-15',
          status: 'Scheduled'
        },
        {
          id: 'CAKE-1000',
          flavor: 'Past Order - Confetti Celebration',
          design: 'Rainbow Sprinkles & Party Candles',
          size: '8-inch Single Tier',
          pickupDate: '2026-07-25',
          status: 'Completed'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    // Subscribe to real-time updates from Firebase Firestore /orders collection
    const unsubscribe = onSnapshot(
      collection(db, 'orders'),
      (snapshot) => {
        if (!snapshot.empty) {
          const firestoreOrders: PublicCakeOrder[] = snapshot.docs.map((docSnap) => {
            const d = docSnap.data();
            return {
              id: d.id || docSnap.id,
              flavor: d.flavor || d.orderType || 'Custom Cake Creation',
              design: d.designNotes || 'Custom Artisanal Bakery Order',
              size: d.cakeSize || 'Standard Celebration Tier',
              pickupDate: d.eventDate || new Date().toISOString().split('T')[0],
              status: d.status || 'Scheduled'
            };
          });

          setOrders((prev) => {
            const fsIds = new Set(firestoreOrders.map((o) => o.id));
            const filteredPrev = prev.filter((o) => !fsIds.has(o.id));
            return [...firestoreOrders, ...filteredPrev];
          });
          setActiveSource('Firebase Firestore (Live Real-Time Database)');
        }
      },
      (err) => {
        console.warn('Firestore orders live subscription error:', err);
      }
    );

    return () => unsubscribe();
  }, []);

  // Filter orders based on expire logic
  const activeOrders = orders.filter((order) => isOrderActive(order.pickupDate));
  const expiredOrdersCount = orders.length - activeOrders.length;
  const displayedOrders = showExpired ? orders : activeOrders;

  // Sort displayed orders by date ascending
  const sortedOrders = [...displayedOrders].sort(
    (a, b) => new Date(a.pickupDate).getTime() - new Date(b.pickupDate).getTime()
  );

  return (
    <section id="order-schedule" className="py-16 md:py-24 bg-gradient-to-b from-stone-100 via-amber-50/30 to-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-amber-800" />
            <span>Public Baking Calendar</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Upcoming Public Cake Orders
          </h2>

          <p className="text-stone-700 text-base sm:text-lg font-normal leading-relaxed">
            Live schedule synced automatically from our private Google Form.
            <br className="hidden sm:inline" />
            <span className="text-stone-500 text-sm">
              Customer emails and phone numbers remain 100% private. Past orders expire automatically.
            </span>
          </p>
        </div>

        {/* Control & Sync Banner */}
        <div className="bg-white rounded-2xl border border-amber-200/80 p-4 sm:p-6 shadow-sm mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            {/* Status & Privacy Indicators */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-900 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Active Sync: {activeOrders.length} Upcoming Order{activeOrders.length === 1 ? '' : 's'}</span>
              </div>

              <div className="flex items-center gap-2 bg-amber-50 text-amber-900 px-3 py-1.5 rounded-xl border border-amber-200 text-xs font-medium">
                <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0" />
                <span>Private Info Redacted (Only Flavor, Design & Date)</span>
              </div>
            </div>

            {/* Actions: Refresh & Apps Script Code Modal */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <button
                onClick={() => fetchOrders(customDataUrl || undefined)}
                disabled={loading}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors cursor-pointer border border-stone-300"
                title="Re-fetch data.json"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-amber-700' : ''}`} />
                <span>Refresh Feed</span>
              </button>

              {onOpenAppsScriptGuide && (
                <button
                  onClick={onOpenAppsScriptGuide}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <Code className="w-4 h-4" />
                  <span>Google Apps Script Code</span>
                </button>
              )}
            </div>

          </div>

          {/* Toggle for Expired Orders */}
          <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-stone-400 shrink-0" />
              <span>
                Auto-Expire Logic: Orders with past pickup dates are hidden automatically.
              </span>
            </div>

            <button
              onClick={() => setShowExpired(!showExpired)}
              className="inline-flex items-center gap-1.5 text-amber-900 hover:text-amber-700 font-semibold cursor-pointer underline"
            >
              {showExpired ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>
                {showExpired
                  ? 'Hide Expired Past Orders'
                  : `Show Archived / Expired Orders (${expiredOrdersCount} hidden)`}
              </span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-12 text-center space-y-3 bg-white rounded-3xl border border-stone-200 p-8">
            <RefreshCw className="w-8 h-8 animate-spin text-amber-800 mx-auto" />
            <p className="text-stone-600 text-sm font-medium">Reading cake schedule from data.json...</p>
          </div>
        )}

        {/* Error Notification */}
        {error && !loading && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-800 shrink-0" />
              <span>Showing preview data ({error})</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && sortedOrders.length === 0 && (
          <div className="py-12 text-center bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
            <Cake className="w-12 h-12 text-amber-800/40 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-stone-900">No Upcoming Cake Orders</h3>
            <p className="text-stone-600 text-sm max-w-md mx-auto">
              All scheduled cake orders have passed or no active orders were found in data.json. Submit a new order via the form to add it to the schedule!
            </p>
          </div>
        )}

        {/* Orders Grid */}
        {!loading && sortedOrders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="public-orders-grid">
            {sortedOrders.map((order) => {
              const active = isOrderActive(order.pickupDate);
              const daysInfo = getDaysDifference(order.pickupDate);

              return (
                <div
                  key={order.id}
                  className={`relative rounded-3xl border p-6 transition-all flex flex-col justify-between ${
                    active
                      ? 'bg-white border-stone-200/90 shadow-xs hover:shadow-md'
                      : 'bg-stone-100/80 border-stone-300/80 opacity-75'
                  }`}
                >
                  {/* Card Top / Header */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500 bg-stone-100 border border-stone-200 px-2.5 py-1 rounded-lg">
                        {order.id}
                      </span>

                      {/* Pickup Status Pill */}
                      {active ? (
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                            daysInfo.label === 'Today!'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>{daysInfo.label}</span>
                        </span>
                      ) : (
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-stone-200 text-stone-600">
                          Expired
                        </span>
                      )}
                    </div>

                    {/* Cake Details */}
                    <div className="space-y-3 mb-6">
                      
                      {/* Pickup Date Display */}
                      <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg">
                        <Calendar className="w-5 h-5 text-amber-800 shrink-0" />
                        <span>Pickup Date: {order.pickupDate}</span>
                      </div>

                      {/* Flavor */}
                      <div className="bg-amber-50/70 border border-amber-100 p-3 rounded-2xl">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-800 mb-0.5">
                          Cake Flavor & Fillings
                        </span>
                        <p className="text-sm font-semibold text-stone-900">
                          {order.flavor}
                        </p>
                      </div>

                      {/* Design & Theme Notes */}
                      <div className="bg-stone-50 border border-stone-200/80 p-3 rounded-2xl">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-0.5">
                          Design Style & Theme
                        </span>
                        <p className="text-xs text-stone-700 leading-relaxed">
                          {order.design}
                        </p>
                      </div>

                      {/* Size */}
                      {order.size && (
                        <div className="flex items-center gap-2 text-xs text-stone-600 pt-1">
                          <Cake className="w-3.5 h-3.5 text-amber-800" />
                          <span><strong>Size:</strong> {order.size}</span>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Card Footer Badge */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-sans">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Public Record (No PI)</span>
                    </div>

                    <span className="text-stone-400 font-mono text-[10px]">
                      {active ? 'Scheduled' : 'Archived'}
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
