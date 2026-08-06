import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useSite } from '../context/SiteContext';
import {
  ShoppingBag,
  Plus,
  Trash2,
  Edit3,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  FileSpreadsheet,
  Eye,
  RefreshCw,
  X,
  Save,
  User,
  Mail,
  Phone,
  DollarSign,
  Tag,
  Check,
  ChevronDown,
  Table
} from 'lucide-react';

export interface AdminOrder {
  id: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  flavor: string;
  size: string;
  designNotes: string;
  pickupDate: string;
  status: 'Scheduled' | 'In Production' | 'Ready for Pickup' | 'Completed' | 'Cancelled';
  totalAmount?: string | number;
  createdAt?: string;
}

const DEFAULT_DEMO_ORDERS: AdminOrder[] = [
  {
    id: 'CAKE-0',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@example.com',
    customerPhone: '0',
    flavor: 'Classic Vanilla Bean & Swiss Buttercream',
    size: '0-Tier 0-inch Celebration',
    designNotes: 'Botanical Floral Palette & Pastel Gold Accents. White roses on top.',
    pickupDate: '2026-08-08',
    status: 'Scheduled',
    totalAmount: '$0',
    createdAt: '2026-08-01'
  },
  {
    id: 'CAKE-0',
    customerName: 'Marcus Vance',
    customerEmail: 'marcus.vance@example.com',
    customerPhone: '0',
    flavor: 'Rich Chocolate Fudge & Dark Ganache',
    size: '0-Tier 0-inch Birthday',
    designNotes: 'Textured Rustic Knife Strokes & Fresh Strawberries on rim.',
    pickupDate: '2026-08-12',
    status: 'In Production',
    totalAmount: '$0',
    createdAt: '2026-08-02'
  },
  {
    id: 'CAKE-0',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.r@example.com',
    customerPhone: '0',
    flavor: 'Red Velvet & Whipped Cream Cheese',
    size: '0-inch Single Tier',
    designNotes: 'Minimalist Vintage Piping & Velvet Ribbon around base.',
    pickupDate: '2026-08-15',
    status: 'Scheduled',
    totalAmount: '$0',
    createdAt: '2026-08-03'
  },
  {
    id: 'CAKE-0',
    customerName: 'David Miller',
    customerEmail: 'dmiller@example.com',
    customerPhone: '0',
    flavor: 'Past Order - Confetti Celebration',
    size: '0-inch Single Tier',
    designNotes: 'Rainbow Sprinkles & Party Candles.',
    pickupDate: '2026-07-25',
    status: 'Completed',
    totalAmount: '$0',
    createdAt: '2026-07-20'
  }
];

export default function AdminOrdersManager() {
  const { content } = useSite();
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editingOrder, setEditingOrder] = useState<AdminOrder | null>(null);
  const [showSheetViewer, setShowSheetViewer] = useState<boolean>(false);

  // New order form state
  const [newOrder, setNewOrder] = useState<Partial<AdminOrder>>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    flavor: 'Classic Vanilla Bean & Swiss Buttercream',
    size: '8-inch Single Tier',
    designNotes: '',
    pickupDate: new Date().toISOString().split('T')[0],
    status: 'Scheduled',
    totalAmount: '$120.00'
  });

  // Subscribe to real-time Firestore orders
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      collection(db, 'orders'),
      (snapshot) => {
        if (!snapshot.empty) {
          const fsOrders: AdminOrder[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              customerName: data.customerName || data.name || 'Valued Customer',
              customerEmail: data.customerEmail || data.email || 'N/A',
              customerPhone: data.customerPhone || data.phone || '',
              flavor: data.flavor || data.orderType || 'Custom Cake Creation',
              size: data.size || data.cakeSize || 'Standard Celebration Tier',
              designNotes: data.designNotes || data.notes || 'Custom Artisanal Bakery Order',
              pickupDate: data.pickupDate || data.eventDate || new Date().toISOString().split('T')[0],
              status: data.status || 'Scheduled',
              totalAmount: data.totalAmount || data.price || '$120.00',
              createdAt: data.createdAt || new Date().toLocaleDateString()
            };
          });
          setOrders(fsOrders);
        } else {
          // Default demo orders if collection is empty
          setOrders(DEFAULT_DEMO_ORDERS);
        }
        setLoading(false);
      },
      (err) => {
        console.warn('Admin Firestore orders listener warning:', err);
        setOrders(DEFAULT_DEMO_ORDERS);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Update order status in Firestore
  const handleStatusChange = async (orderId: string, newStatus: AdminOrder['status']) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
      setOrders((prev) =>
        prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
      );
    } catch (err) {
      console.warn('Failed to update Firestore order, falling back to local state:', err);
      setOrders((prev) =>
        prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
      );
    }
  };

  // Delete order from Firestore
  const handleDeleteOrder = async (orderId: string) => {
    if (!window.confirm(`Are you sure you want to delete order #${orderId}?`)) return;
    try {
      await deleteDoc(doc(db, 'orders', orderId));
      setOrders((prev) => prev.filter((ord) => ord.id !== orderId));
    } catch (err) {
      console.warn('Failed to delete from Firestore, updating local state:', err);
      setOrders((prev) => prev.filter((ord) => ord.id !== orderId));
    }
  };

  // Add new order
  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = 'CAKE-' + Math.floor(1000 + Math.random() * 9000);
    const created: AdminOrder = {
      id: orderId,
      customerName: newOrder.customerName || 'Customer',
      customerEmail: newOrder.customerEmail || '',
      customerPhone: newOrder.customerPhone || '',
      flavor: newOrder.flavor || 'Custom Vanilla Cake',
      size: newOrder.size || '8-inch Tier',
      designNotes: newOrder.designNotes || 'Custom Design',
      pickupDate: newOrder.pickupDate || new Date().toISOString().split('T')[0],
      status: (newOrder.status as AdminOrder['status']) || 'Scheduled',
      totalAmount: newOrder.totalAmount || '$120.00',
      createdAt: new Date().toLocaleDateString()
    };

    try {
      await setDoc(doc(db, 'orders', orderId), created);
    } catch (err) {
      console.warn('Failed to write to Firestore orders, updating local state:', err);
    }

    setOrders((prev) => [created, ...prev]);
    setShowAddModal(false);
    setNewOrder({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      flavor: 'Classic Vanilla Bean & Swiss Buttercream',
      size: '8-inch Single Tier',
      designNotes: '',
      pickupDate: new Date().toISOString().split('T')[0],
      status: 'Scheduled',
      totalAmount: '$120.00'
    });
  };

  // Save edited order
  const handleSaveEditedOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;

    try {
      await setDoc(doc(db, 'orders', editingOrder.id), editingOrder, { merge: true });
    } catch (err) {
      console.warn('Firestore update warning:', err);
    }

    setOrders((prev) =>
      prev.map((ord) => (ord.id === editingOrder.id ? editingOrder : ord))
    );
    setEditingOrder(null);
  };

  // Filtered orders
  const filteredOrders = orders.filter((ord) => {
    const matchesFilter =
      statusFilter === 'All' || ord.status.toLowerCase() === statusFilter.toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      ord.id.toLowerCase().includes(q) ||
      (ord.customerName && ord.customerName.toLowerCase().includes(q)) ||
      (ord.customerEmail && ord.customerEmail.toLowerCase().includes(q)) ||
      ord.flavor.toLowerCase().includes(q) ||
      ord.pickupDate.includes(q);

    return matchesFilter && matchesSearch;
  });

  // Metrics
  const totalCount = orders.length;
  const scheduledCount = orders.filter((o) => o.status === 'Scheduled').length;
  const inProductionCount = orders.filter((o) => o.status === 'In Production').length;
  const readyCount = orders.filter((o) => o.status === 'Ready for Pickup').length;
  const completedCount = orders.filter((o) => o.status === 'Completed').length;

  // Extract sheet id for embed
  const sheetMatch = content.googleSheetUrl ? content.googleSheetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/) : null;
  const sheetId = sheetMatch ? sheetMatch[1] : null;
  const embedSheetUrl = sheetId ? `https://docs.google.com/spreadsheets/d/${sheetId}/pubhtml?widget=true&headers=false` : null;

  return (
    <div className="space-y-6 animate-fade-in text-stone-800">
      
      {/* Top Banner & Quick Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-amber-900 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-amber-800" />
          </div>
          <div className="text-2xl font-black text-amber-950">{totalCount}</div>
        </div>

        <div className="bg-blue-50 border border-blue-200/80 rounded-2xl p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-blue-900 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Scheduled</span>
            <Calendar className="w-4 h-4 text-blue-700" />
          </div>
          <div className="text-2xl font-black text-blue-950">{scheduledCount}</div>
        </div>

        <div className="bg-purple-50 border border-purple-200/80 rounded-2xl p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-purple-900 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">In Production</span>
            <Clock className="w-4 h-4 text-purple-700" />
          </div>
          <div className="text-2xl font-black text-purple-950">{inProductionCount}</div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-emerald-900 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Completed</span>
            <CheckCircle className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black text-emerald-950">{completedCount}</div>
        </div>
      </div>

      {/* Control Bar: Search, Status Filter & Add Button */}
      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by customer, order #, flavor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-stone-200 text-xs bg-white text-stone-900 focus:border-amber-800 focus:ring-1 focus:ring-amber-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
              >
                ×
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {content.googleSheetUrl && (
              <a
                href={content.googleSheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-300" />
                <span>Google Sheet Responses</span>
                <ExternalLink className="w-3 h-3 text-emerald-200" />
              </a>
            )}

            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Order</span>
            </button>
          </div>
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 scrollbar-none">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mr-1 shrink-0">
            Filter:
          </span>
          {['All', 'Scheduled', 'In Production', 'Ready for Pickup', 'Completed', 'Cancelled'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-amber-900 text-white font-bold shadow-2xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List / Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-stone-500 font-semibold px-1">
          <span>Showing {filteredOrders.length} order{filteredOrders.length === 1 ? '' : 's'}</span>
          {loading && <span className="text-amber-800 flex items-center gap-1"><RefreshCw className="w-3 h-3 animate-spin" /> Syncing Firestore...</span>}
        </div>

        {filteredOrders.length === 0 ? (
          <div className="p-8 text-center bg-stone-50 border border-dashed border-stone-300 rounded-2xl space-y-2">
            <ShoppingBag className="w-8 h-8 text-stone-400 mx-auto" />
            <p className="text-stone-700 font-bold text-sm">No orders found</p>
            <p className="text-xs text-stone-500">Try adjusting your filter or search query, or add a new order.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredOrders.map((order) => {
              const statusColors = {
                Scheduled: 'bg-blue-100 text-blue-900 border-blue-200',
                'In Production': 'bg-purple-100 text-purple-900 border-purple-200',
                'Ready for Pickup': 'bg-amber-100 text-amber-900 border-amber-200',
                Completed: 'bg-emerald-100 text-emerald-900 border-emerald-200',
                Cancelled: 'bg-stone-200 text-stone-700 border-stone-300'
              }[order.status] || 'bg-stone-100 text-stone-800 border-stone-200';

              return (
                <div
                  key={order.id}
                  className="bg-white border border-stone-200 rounded-2xl p-4 space-y-3 hover:border-amber-300 transition-colors shadow-2xs"
                >
                  {/* Top Bar: Order ID, Date & Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-stone-900 text-amber-300 font-mono text-xs font-bold">
                        #{order.id}
                      </span>
                      <span className="text-xs font-bold text-stone-800 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-stone-500" />
                        Pickup: {order.pickupDate}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {order.totalAmount && (
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                          {order.totalAmount}
                        </span>
                      )}

                      {/* Status Selector Dropdown */}
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as AdminOrder['status'])}
                        className={`text-xs font-bold px-2.5 py-1 rounded-xl border cursor-pointer ${statusColors}`}
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="In Production">In Production</option>
                        <option value="Ready for Pickup">Ready for Pickup</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Customer & Cake Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-stone-900">
                        <User className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                        <span>{order.customerName || 'Customer'}</span>
                      </div>
                      {order.customerEmail && (
                        <div className="flex items-center gap-1.5 text-stone-600 font-mono text-[11px]">
                          <Mail className="w-3 h-3 text-stone-400 shrink-0" />
                          <span>{order.customerEmail}</span>
                        </div>
                      )}
                      {order.customerPhone && (
                        <div className="flex items-center gap-1.5 text-stone-600 text-[11px]">
                          <Phone className="w-3 h-3 text-stone-400 shrink-0" />
                          <span>{order.customerPhone}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1 bg-amber-50/50 border border-amber-100 p-2.5 rounded-xl">
                      <div className="font-bold text-amber-950">{order.flavor}</div>
                      <div className="text-[11px] text-amber-900 font-semibold">
                        Size: {order.size}
                      </div>
                      <p className="text-[11px] text-stone-600 italic line-clamp-2">
                        "{order.designNotes}"
                      </p>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between pt-1 border-t border-stone-100 text-xs">
                    <div className="text-[10px] text-stone-400">
                      Added: {order.createdAt || 'Recent'}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingOrder(order)}
                        className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteOrder(order.id)}
                        className="px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Embedded Google Sheet Viewer Accordion */}
      {embedSheetUrl && (
        <div className="border border-stone-200 rounded-2xl bg-stone-50 overflow-hidden">
          <button
            type="button"
            onClick={() => setShowSheetViewer(!showSheetViewer)}
            className="w-full p-4 text-left flex items-center justify-between bg-stone-100 hover:bg-stone-200/70 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 font-bold text-xs text-stone-900">
              <Table className="w-4 h-4 text-emerald-700" />
              <span>Live Google Sheet Form Response Database</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
              <span>{showSheetViewer ? 'Hide Sheet' : 'View Sheet'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showSheetViewer ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {showSheetViewer && (
            <div className="p-4 space-y-2 bg-white border-t border-stone-200">
              <div className="flex items-center justify-between text-xs text-stone-600">
                <span>Direct response entries synced from Google Order Form</span>
                <a
                  href={content.googleSheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-800 font-bold hover:underline flex items-center gap-1"
                >
                  Full Sheet View <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="w-full h-80 rounded-xl border border-stone-300 overflow-hidden bg-white shadow-inner">
                <iframe
                  src={embedSheetUrl}
                  title="Google Sheet Response Live View"
                  className="w-full h-full border-none"
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ADD ORDER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-stone-200 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2 font-bold text-stone-900 text-base">
                <Plus className="w-5 h-5 text-amber-800" />
                <span>Create New Custom Order</span>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jessica Alba"
                  value={newOrder.customerName || ''}
                  onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 font-medium text-stone-900 focus:border-amber-800 focus:ring-1 focus:ring-amber-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Customer Email</label>
                  <input
                    type="email"
                    placeholder="jessica@example.com"
                    value={newOrder.customerEmail || ''}
                    onChange={(e) => setNewOrder({ ...newOrder, customerEmail: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-stone-900 focus:border-amber-800 focus:ring-1 focus:ring-amber-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Customer Phone</label>
                  <input
                    type="tel"
                    placeholder="0"
                    value={newOrder.customerPhone || ''}
                    onChange={(e) => setNewOrder({ ...newOrder, customerPhone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-stone-900 focus:border-amber-800 focus:ring-1 focus:ring-amber-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Cake Flavor & Filling</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Classic Vanilla Bean & Swiss Buttercream"
                  value={newOrder.flavor || ''}
                  onChange={(e) => setNewOrder({ ...newOrder, flavor: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-stone-900 focus:border-amber-800 focus:ring-1 focus:ring-amber-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Cake Size / Tiers</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3-Tier 8-inch Celebration"
                    value={newOrder.size || ''}
                    onChange={(e) => setNewOrder({ ...newOrder, size: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-stone-900 focus:border-amber-800 focus:ring-1 focus:ring-amber-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Pickup Date (YYYY-MM-DD)</label>
                  <input
                    type="date"
                    required
                    value={newOrder.pickupDate || ''}
                    onChange={(e) => setNewOrder({ ...newOrder, pickupDate: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-stone-900 focus:border-amber-800 focus:ring-1 focus:ring-amber-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Design & Theme Notes</label>
                <textarea
                  rows={2}
                  placeholder="Specific colors, florals, piping, toppers..."
                  value={newOrder.designNotes || ''}
                  onChange={(e) => setNewOrder({ ...newOrder, designNotes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-stone-900 focus:border-amber-800 focus:ring-1 focus:ring-amber-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Initial Status</label>
                  <select
                    value={newOrder.status || 'Scheduled'}
                    onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value as AdminOrder['status'] })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-stone-900 focus:border-amber-800 focus:ring-1 focus:ring-amber-800"
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="In Production">In Production</option>
                    <option value="Ready for Pickup">Ready for Pickup</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Total Amount ($)</label>
                  <input
                    type="text"
                    placeholder="$150.00"
                    value={newOrder.totalAmount || ''}
                    onChange={(e) => setNewOrder({ ...newOrder, totalAmount: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-stone-900 focus:border-amber-800 focus:ring-1 focus:ring-amber-800"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 font-bold hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold flex items-center gap-1.5 shadow-2xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Order</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT ORDER MODAL */}
      {editingOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-stone-200 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2 font-bold text-stone-900 text-base">
                <Edit3 className="w-5 h-5 text-amber-800" />
                <span>Edit Order #{editingOrder.id}</span>
              </div>
              <button
                onClick={() => setEditingOrder(null)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedOrder} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  value={editingOrder.customerName || ''}
                  onChange={(e) => setEditingOrder({ ...editingOrder, customerName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 font-medium text-stone-900 focus:border-amber-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Customer Email</label>
                  <input
                    type="email"
                    value={editingOrder.customerEmail || ''}
                    onChange={(e) => setEditingOrder({ ...editingOrder, customerEmail: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-stone-900 focus:border-amber-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Customer Phone</label>
                  <input
                    type="tel"
                    value={editingOrder.customerPhone || ''}
                    onChange={(e) => setEditingOrder({ ...editingOrder, customerPhone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-stone-900 focus:border-amber-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Cake Flavor & Filling</label>
                <input
                  type="text"
                  required
                  value={editingOrder.flavor}
                  onChange={(e) => setEditingOrder({ ...editingOrder, flavor: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-stone-900 focus:border-amber-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Cake Size / Tiers</label>
                  <input
                    type="text"
                    required
                    value={editingOrder.size}
                    onChange={(e) => setEditingOrder({ ...editingOrder, size: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-stone-900 focus:border-amber-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Pickup Date (YYYY-MM-DD)</label>
                  <input
                    type="date"
                    required
                    value={editingOrder.pickupDate}
                    onChange={(e) => setEditingOrder({ ...editingOrder, pickupDate: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-stone-900 focus:border-amber-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Design & Theme Notes</label>
                <textarea
                  rows={2}
                  value={editingOrder.designNotes}
                  onChange={(e) => setEditingOrder({ ...editingOrder, designNotes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-stone-900 focus:border-amber-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Status</label>
                  <select
                    value={editingOrder.status}
                    onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value as AdminOrder['status'] })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-stone-900 focus:border-amber-800"
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="In Production">In Production</option>
                    <option value="Ready for Pickup">Ready for Pickup</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Total Amount</label>
                  <input
                    type="text"
                    value={editingOrder.totalAmount || ''}
                    onChange={(e) => setEditingOrder({ ...editingOrder, totalAmount: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-stone-900 focus:border-amber-800"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingOrder(null)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 font-bold hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold flex items-center gap-1.5 shadow-2xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Order</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
