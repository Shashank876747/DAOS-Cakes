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
  Bell
} from 'lucide-react';
import { useSite, SiteContent } from '../context/SiteContext';

export default function AdminEditorModal() {
  const {
    content,
    updateContent,
    resetToDefaults,
    isAdminEditorOpen,
    closeAdminEditor
  } = useSite();

  const [activeTab, setActiveTab] = useState<'general' | 'hero' | 'form' | 'about' | 'contact'>('general');
  const [formData, setFormData] = useState<SiteContent>(content);
  const [saveSuccess, setSaveSuccess] = useState(false);

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
            <Link className="w-3.5 h-3.5" />
            <span>Google Order Form</span>
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
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {saveSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2.5 shadow-2xs">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Site settings updated and saved successfully!</span>
            </div>
          )}

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

          {/* TAB 3: Google Order Form */}
          {activeTab === 'form' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-xs text-stone-700 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <Link className="w-4 h-4 text-amber-800" />
                  <span>Google Form Embed Integration</span>
                </div>
                <p>
                  Paste your Google Form URL below. The editor will automatically append <code className="bg-stone-200 px-1 py-0.5 rounded text-[10px]">?embedded=true</code> so it renders seamlessly inside the website frame.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Google Form URL
                </label>
                <input
                  type="url"
                  value={formData.googleFormUrl}
                  onChange={(e) => setFormData({ ...formData, googleFormUrl: e.target.value })}
                  placeholder="https://docs.google.com/forms/d/e/.../viewform"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-amber-800 focus:ring-1 focus:ring-amber-800 text-xs font-mono text-stone-900 bg-stone-50/50"
                />
              </div>

              <div className="pt-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Order Form Section Badge
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-amber-800 focus:ring-1 focus:ring-amber-800 text-xs text-stone-900 bg-stone-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Order Form Section Title
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-amber-800 focus:ring-1 focus:ring-amber-800 text-xs font-bold text-stone-900 bg-stone-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Order Form Section Subtitle
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-amber-800 focus:ring-1 focus:ring-amber-800 text-xs text-stone-900 bg-stone-50/50"
                />
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

        </form>

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
