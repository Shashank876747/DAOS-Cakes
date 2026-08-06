import React, { useState, useEffect } from 'react';
import {
  X,
  Save,
  RotateCcw,
  Layout,
  FileText,
  PhoneCall,
  Sparkles,
  Link,
  Info,
  CheckCircle,
  Eye,
  Sliders,
  Bell,
  FileSpreadsheet,
  ExternalLink,
  Code,
  ShieldCheck,
  CheckCircle2,
  Table,
  RefreshCw,
  Layers,
  ShoppingBag
} from 'lucide-react';
import { useSite, SiteContent } from '../context/SiteContext';
import AdminOrdersManager from './AdminOrdersManager';

interface AdminEditorModalProps {
  onOpenAppsScriptGuide?: () => void;
}

export default function AdminEditorModal({ onOpenAppsScriptGuide }: AdminEditorModalProps) {
  const {
    content,
    updateContent,
    resetToDefaults,
    isAdminEditorOpen,
    closeAdminEditor,
    adminModalTab,
    setAdminModalTab
  } = useSite();

  const [activeTab, setActiveTab] = useState<'orders' | 'general' | 'hero' | 'form' | 'about' | 'contact'>('orders');
  const [formData, setFormData] = useState<SiteContent>(content);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (adminModalTab) {
      setActiveTab(adminModalTab as any);
    }
  }, [adminModalTab, isAdminEditorOpen]);

  useEffect(() => {
    setFormData(content);
  }, [content, isAdminEditorOpen]);

  if (!isAdminEditorOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all site content back to defaults?')) {
      resetToDefaults();
      closeAdminEditor();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl border border-amber-200 shadow-2xl w-full max-w-3xl overflow-hidden my-auto relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl font-bold text-white tracking-tight">
                  Admin Site Content Editor
                </h3>
                <span className="px-2 py-0.5 rounded-md bg-amber-500 text-stone-950 font-sans text-[10px] font-extrabold uppercase tracking-widest">
                  LIVE EDIT
                </span>
              </div>
              <p className="text-stone-300 text-xs mt-0.5">
                Customize titles, banners, form links, and contact information across the website.
              </p>
            </div>
          </div>

          <button
            onClick={closeAdminEditor}
            className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-stone-100 border-b border-stone-200 px-4 pt-3 flex gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-semibold flex items-center gap-2 border-t border-x transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-white border-stone-200 text-amber-900 shadow-2xs font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-800" />
            <span>Orders & Responses</span>
          </button>

          <button
            onClick={() => setActiveTab('general')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-semibold flex items-center gap-2 border-t border-x transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'general'
                ? 'bg-white border-stone-200 text-amber-900 shadow-2xs font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>General & Banner</span>
          </button>

          <button
            onClick={() => setActiveTab('hero')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-semibold flex items-center gap-2 border-t border-x transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'hero'
                ? 'bg-white border-stone-200 text-amber-900 shadow-2xs font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>Hero Header</span>
          </button>

          <button
            onClick={() => setActiveTab('form')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-semibold flex items-center gap-2 border-t border-x transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'form'
                ? 'bg-white border-stone-200 text-amber-900 shadow-2xs font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
            <span>Google Forms & Sheets</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-semibold flex items-center gap-2 border-t border-x transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'about'
                ? 'bg-white border-stone-200 text-amber-900 shadow-2xs font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>About Section</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-semibold flex items-center gap-2 border-t border-x transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'contact'
                ? 'bg-white border-stone-200 text-amber-900 shadow-2xs font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Contact & Info</span>
          </button>
        </div>

        {/* Modal Form Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {saveSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2.5 shadow-2xs">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Site settings updated and saved successfully!</span>
            </div>
          )}

          {/* TAB 0: Orders & Responses Manager */}
          {activeTab === 'orders' && <AdminOrdersManager />}

          {/* TAB 1: General & Banner */}
          {activeTab === 'general' && (
            <div className="space-y-5 animate-fade-in">
              <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 text-amber-900 text-xs flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <p>
                  Configure brand identifiers and top announcement banner displayed to visitors.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Bakery / Site Name
                  </label>
                  <input
                    type="text"
                    value={formData.siteName}
                    onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-amber-800 focus:ring-1 focus:ring-amber-800 text-xs text-stone-900 bg-stone-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-amber-800 focus:ring-1 focus:ring-amber-800 text-xs text-stone-900 bg-stone-50/50"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="block text-xs font-bold text-stone-900">
                      Top Announcement Bar
                    </span>
                    <span className="block text-[11px] text-stone-500">
                      Displays a notification banner at the very top of every page.
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.announcement.enabled}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          announcement: { ...formData.announcement, enabled: e.target.checked }
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-stone-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-800"></div>
                  </label>
                </div>

                <textarea
                  rows={2}
                  value={formData.announcement.text}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      announcement: { ...formData.announcement, text: e.target.value }
                    })
                  }
                  placeholder="e.g. 🎉 Now taking cake orders for August and September!"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-amber-800 focus:ring-1 focus:ring-amber-800 text-xs text-stone-900 bg-stone-50/50"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Hero Section */}
          {activeTab === 'hero' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Hero Badge Text
                </label>
                <input
                  type="text"
                  value={formData.hero.badge}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, badge: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-amber-800 focus:ring-1 focus:ring-amber-800 text-xs text-stone-900 bg-stone-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Hero Title / Headline
                </label>
                <input
                  type="text"
                  value={formData.hero.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, title: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-amber-800 focus:ring-1 focus:ring-amber-800 text-xs font-bold text-stone-900 bg-stone-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Hero Subtitle Description
                </label>
                <textarea
                  rows={3}
                  value={formData.hero.subtitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, subtitle: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-amber-800 focus:ring-1 focus:ring-amber-800 text-xs text-stone-900 bg-stone-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Main Call to Action (CTA) Button Text
                </label>
                <input
                  type="text"
                  value={formData.hero.ctaText}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, ctaText: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-amber-800 focus:ring-1 focus:ring-amber-800 text-xs text-stone-900 bg-stone-50/50"
                />
              </div>
            </div>
          )}

          {/* TAB 3: Google Forms & Sheets Integration */}
          {activeTab === 'form' && (
            <div className="space-y-5 animate-fade-in">
              
              {/* Integration Status Card */}
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 text-emerald-950 space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-xs text-emerald-900">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                    <span>Google Workspace Integration Active</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-200/70 text-emerald-900 text-[10px] font-bold uppercase tracking-wider border border-emerald-300">
                    OAuth Authorized
                  </span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  Your Google Forms and associated Google Sheets are connected. Order requests submitted through the form are saved directly into your Google Sheet response database.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded-md bg-white/80 border border-emerald-200 text-stone-700 text-[10px] font-mono">
                    ✓ spreadsheets
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white/80 border border-emerald-200 text-stone-700 text-[10px] font-mono">
                    ✓ forms.body
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white/80 border border-emerald-200 text-stone-700 text-[10px] font-mono">
                    ✓ forms.responses.readonly
                  </span>
                </div>
              </div>

              {/* Associated Google Sheet Panel */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Table className="w-4 h-4 text-emerald-700" />
                    <h4 className="font-bold text-stone-900 text-xs">
                      Associated Google Sheet (Order Response Database)
                    </h4>
                  </div>
                  {formData.googleSheetUrl && (
                    <a
                      href={formData.googleSheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <span>Open Sheet</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <p className="text-[11px] text-stone-600 leading-relaxed">
                  This is the Google Sheet linked to your Google Order Form. Every customer order submission automatically populates a new row in this spreadsheet.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Google Sheet Spreadsheet URL
                  </label>
                  <input
                    type="url"
                    value={formData.googleSheetUrl || ''}
                    onChange={(e) => setFormData({ ...formData, googleSheetUrl: e.target.value })}
                    placeholder="https://docs.google.com/spreadsheets/d/.../edit"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 text-xs font-mono text-stone-900 bg-white"
                  />
                </div>

                {/* Embedded Live Sheet Viewer */}
                {formData.googleSheetUrl && (() => {
                  const sheetMatch = formData.googleSheetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
                  const sheetId = sheetMatch ? sheetMatch[1] : null;
                  if (!sheetId) return null;
                  const embedSheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/pubhtml?widget=true&headers=false`;

                  return (
                    <div className="mt-3 pt-3 border-t border-stone-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-stone-800 flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-emerald-700" />
                          Live Google Sheet Response Dashboard
                        </span>
                        <a
                          href={formData.googleSheetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-900 underline flex items-center gap-1"
                        >
                          Full Screen Spreadsheet <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="w-full h-72 rounded-xl border border-stone-300 overflow-hidden bg-white shadow-inner">
                        <iframe
                          src={embedSheetUrl}
                          title="Google Sheet Live Response Orders"
                          className="w-full h-full border-none"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Embedded Google Form Panel */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Link className="w-4 h-4 text-amber-800" />
                    <h4 className="font-bold text-stone-900 text-xs">
                      Customer Google Order Form (Public Embed)
                    </h4>
                  </div>
                  {formData.googleFormUrl && (
                    <a
                      href={formData.googleFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <span>Open Form</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Paste your public Google Form URL below. The editor appends <code className="bg-stone-200 px-1 py-0.5 rounded text-[10px]">?embedded=true</code> so it embeds smoothly on the order page.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Google Form Embed URL
                  </label>
                  <input
                    type="url"
                    value={formData.googleFormUrl}
                    onChange={(e) => setFormData({ ...formData, googleFormUrl: e.target.value })}
                    placeholder="https://docs.google.com/forms/d/e/.../viewform"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-amber-800 focus:ring-1 focus:ring-amber-800 text-xs font-mono text-stone-900 bg-white"
                  />
                </div>
              </div>

              {/* Google Apps Script Automation Guide Button */}
              {onOpenAppsScriptGuide && (
                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 font-bold text-stone-900 text-xs">
                      <Code className="w-4 h-4 text-amber-800" />
                      <span>Google Apps Script Sync Pipeline</span>
                    </div>
                    <p className="text-[11px] text-stone-600">
                      Sync rows from your Google Sheet directly to the public schedule.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenAppsScriptGuide}
                    className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    <Code className="w-3.5 h-3.5 text-amber-300" />
                    <span>View Apps Script Guide</span>
                  </button>
                </div>
              )}

              {/* Order Notice Badge, Title & Subtitle */}
              <div className="pt-2 border-t border-stone-200 space-y-3">
                <h4 className="font-bold text-stone-900 text-xs">
                  Website Form Section Display Text
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Order Form Badge Text
                  </label>
                  <input
                    type="text"
                    value={formData.orderNotice.badge}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        orderNotice: { ...formData.orderNotice, badge: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 bg-stone-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Order Form Main Title
                  </label>
                  <input
                    type="text"
                    value={formData.orderNotice.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        orderNotice: { ...formData.orderNotice, title: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-bold text-stone-900 bg-stone-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Order Form Subtitle / Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={formData.orderNotice.subtitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        orderNotice: { ...formData.orderNotice, subtitle: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 bg-stone-50/50"
                  />
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: About Section */}
          {activeTab === 'about' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  About Section Title
                </label>
                <input
                  type="text"
                  value={formData.about.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      about: { ...formData.about, title: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-amber-800 focus:ring-1 focus:ring-amber-800 text-xs font-bold text-stone-900 bg-stone-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Paragraph 1 (Main Story)
                </label>
                <textarea
                  rows={3}
                  value={formData.about.paragraph1}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      about: { ...formData.about, paragraph1: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-amber-800 focus:ring-1 focus:ring-amber-800 text-xs text-stone-900 bg-stone-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Paragraph 2 (Quality & Ingredients)
                </label>
                <textarea
                  rows={3}
                  value={formData.about.paragraph2}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      about: { ...formData.about, paragraph2: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-amber-800 focus:ring-1 focus:ring-amber-800 text-xs text-stone-900 bg-stone-50/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Highlight 1
                  </label>
                  <input
                    type="text"
                    value={formData.about.highlight1}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        about: { ...formData.about, highlight1: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-900 bg-stone-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Highlight 2
                  </label>
                  <input
                    type="text"
                    value={formData.about.highlight2}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        about: { ...formData.about, highlight2: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-900 bg-stone-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Highlight 3
                  </label>
                  <input
                    type="text"
                    value={formData.about.highlight3}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        about: { ...formData.about, highlight3: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-900 bg-stone-50/50"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Contact & Info */}
          {activeTab === 'contact' && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Contact Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, email: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-amber-800 text-xs text-stone-900 bg-stone-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Phone Number / Text Line
                  </label>
                  <input
                    type="text"
                    value={formData.contact.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, phone: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-amber-800 text-xs text-stone-900 bg-stone-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  value={formData.contact.instagram}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, instagram: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-amber-800 text-xs text-stone-900 bg-stone-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Pickup & Service Area Location
                </label>
                <input
                  type="text"
                  value={formData.contact.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, location: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-amber-800 text-xs text-stone-900 bg-stone-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Business / Baking Hours
                </label>
                <input
                  type="text"
                  value={formData.contact.hours}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, hours: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-amber-800 text-xs text-stone-900 bg-stone-50/50"
                />
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="bg-stone-50 p-4 sm:p-5 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
            <span>Reset to Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={closeAdminEditor}
              className="px-4 py-2.5 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-semibold cursor-pointer transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Site Changes</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
