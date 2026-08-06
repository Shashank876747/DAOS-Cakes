import React from 'react';
import { Sliders, Lock, FileSpreadsheet, ShoppingBag } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { useAuth, isAdminEmail } from '../context/AuthContext';

export default function AdminToolbar() {
  const { content, isAdminMode, setIsAdminMode, openAdminEditor } = useSite();
  const { user } = useAuth();

  const isUserAdmin = isAdminEmail(user?.email);

  if (!isAdminMode || !isUserAdmin) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 animate-bounce-in">
      <div className="bg-stone-900/95 text-white border border-amber-500/40 shadow-2xl rounded-2xl p-3 sm:p-3.5 flex items-center gap-2 sm:gap-3 backdrop-blur-md">
        
        {/* Admin Status Pill */}
        <div className="flex items-center gap-2 pl-1 pr-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
          </span>
          <span className="text-xs font-bold text-amber-300 font-serif hidden sm:inline">
            Admin Active
          </span>
        </div>

        <div className="h-4 w-[1px] bg-stone-700 hidden sm:block" />

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => openAdminEditor('orders')}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            title="View and manage customer cake orders"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-950" />
            <span>Orders Dashboard</span>
          </button>

          <button
            onClick={() => openAdminEditor('general')}
            className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer border border-stone-700"
            title="Edit website content and text"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Site Content</span>
          </button>

          {content.googleSheetUrl && (
            <a
              href={content.googleSheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-emerald-950/90 hover:bg-emerald-900 text-emerald-200 hover:text-white font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer border border-emerald-700/50"
              title="Open Associated Google Sheet Response Database"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Google Sheet</span>
            </a>
          )}

          <button
            onClick={() => setIsAdminMode(false)}
            className="px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-medium transition-colors cursor-pointer flex items-center gap-1"
            title="Exit Admin Mode"
          >
            <Lock className="w-3.5 h-3.5 text-stone-400" />
            <span className="hidden md:inline">Exit</span>
          </button>
        </div>

      </div>
    </div>
  );
}
