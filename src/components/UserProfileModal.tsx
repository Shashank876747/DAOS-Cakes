import React from 'react';
import { X, User, LogOut, Calendar, ShieldCheck, Mail, Sparkles, Cake, Sliders, Check, Crown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSite } from '../context/SiteContext';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const { user, signOut, updateUserRole } = useAuth();
  const { isAdminMode, setIsAdminMode, openAdminEditor } = useSite();

  if (!isOpen || !user) return null;

  const handleSignOut = () => {
    signOut();
    onClose();
  };

  const getProviderBadge = (provider: string) => {
    switch (provider) {
      case 'google':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 text-[11px] font-medium border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Signed in with Google
          </span>
        );
      case 'microsoft':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-medium border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Signed in with Microsoft
          </span>
        );
      case 'apple':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 text-stone-800 text-[11px] font-medium border border-stone-300">
            <span className="w-2 h-2 rounded-full bg-stone-900" />
            Signed in with Apple
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-medium border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Email & Password Account
          </span>
        );
    }
  };

  const isUserAdmin = user.role === 'admin';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-sm overflow-hidden my-auto relative">
        
        {/* Header Banner */}
        <div className="bg-stone-900 p-6 text-white text-center relative border-b border-stone-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-500 mx-auto mb-3 flex items-center justify-center overflow-hidden shadow-inner">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-amber-800" />
            )}
          </div>

          <h3 className="font-serif text-xl font-bold text-white tracking-tight">
            {user.name}
          </h3>
          <p className="text-xs text-stone-300 font-mono mt-0.5">{user.email}</p>

          <div className="mt-3 inline-block">
            {getProviderBadge(user.provider)}
          </div>
        </div>

        {/* Details List */}
        <div className="p-6 space-y-4 text-xs">
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between text-stone-700">
              <span className="flex items-center gap-2 font-medium">
                <Calendar className="w-4 h-4 text-amber-800" />
                Member Since
              </span>
              <span className="font-semibold text-stone-900">{user.createdAt}</span>
            </div>

            <div className="flex items-center justify-between text-stone-700 pt-2 border-t border-stone-200/80">
              <span className="flex items-center gap-2 font-medium">
                <Crown className="w-4 h-4 text-amber-800" />
                Account Role
              </span>
              <span className={`font-bold px-2.5 py-0.5 rounded-md ${
                isUserAdmin ? 'bg-amber-100 text-amber-900 border border-amber-200' : 'bg-stone-200 text-stone-800'
              }`}>
                {isUserAdmin ? 'Administrator' : 'Customer'}
              </span>
            </div>
          </div>

          {/* Admin Controls Box */}
          {user.email.toLowerCase() === 'daosflorida@gmail.com' ? (
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-800" />
                  <span className="font-bold text-amber-900">Live Site Admin Mode</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAdminMode}
                    onChange={(e) => {
                      setIsAdminMode(e.target.checked);
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-stone-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-800"></div>
                </label>
              </div>

              <button
                onClick={() => {
                  onClose();
                  setIsAdminMode(true);
                  openAdminEditor();
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Launch Site Content Editor</span>
              </button>
            </div>
          ) : (
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 text-center">
              <div className="flex items-center justify-center gap-1.5 text-amber-900 font-bold mb-1">
                <ShieldCheck className="w-4 h-4 text-amber-800" />
                <span>Sole Site Administrator Protection</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Site editing privileges and live content modifications are restricted exclusively to verified owner <strong className="text-stone-800">daosflorida@gmail.com</strong>.
              </p>
            </div>
          )}

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="w-full py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer border border-stone-300"
          >
            <LogOut className="w-4 h-4 text-stone-600" />
            <span>Sign Out</span>
          </button>
        </div>

      </div>
    </div>
  );
}
