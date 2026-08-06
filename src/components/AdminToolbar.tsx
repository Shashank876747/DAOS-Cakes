import React from 'react';
import { Sliders, Lock } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { useAuth } from '../context/AuthContext';

export default function AdminToolbar() {
  const { isAdminMode, setIsAdminMode, openAdminEditor } = useSite();
  const { user } = useAuth();

  const isOwner = user?.email?.toLowerCase().trim() === 'daosflorida@gmail.com';

  if (!isAdminMode || !isOwner) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 animate-bounce-in">
      <div className="bg-stone-900/95 text-white border border-amber-500/40 shadow-2xl rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 backdrop-blur-md">
        
        {/* Admin Status Pill */}
        <div className="flex items-center gap-2 pl-1 pr-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
          </span>
          <span className="text-xs font-bold text-amber-300 font-serif hidden sm:inline">
            Admin Mode Active
          </span>
        </div>

        <div className="h-4 w-[1px] bg-stone-700 hidden sm:block" />

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={openAdminEditor}
            className="px-3.5 py-1.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-300" />
            <span>Edit Site Content</span>
          </button>

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
