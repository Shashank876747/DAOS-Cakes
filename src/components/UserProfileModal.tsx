import React, { useState } from 'react';
import { X, User, LogOut, Calendar, KeyRound, CheckCircle2, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const { user, signOut, changeUserPassword } = useAuth();

  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  if (!isOpen || !user) return null;

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);

    if (newPassword.length < 6) {
      setPasswordStatus({ type: 'error', message: 'Password must be at least 6 characters long.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: 'error', message: 'Passwords do not match. Please try again.' });
      return;
    }

    setIsUpdating(true);
    try {
      await changeUserPassword(newPassword);
      setPasswordStatus({ type: 'success', message: 'Password updated successfully!' });
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setShowPasswordChange(false), 2000);
    } catch (err: any) {
      setPasswordStatus({ type: 'error', message: err?.message || 'Failed to update password. Please try again.' });
    } finally {
      setIsUpdating(false);
    }
  };

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
          </div>

          {/* Change Password Toggle & Form */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-3">
            <button
              type="button"
              onClick={() => {
                setShowPasswordChange(!showPasswordChange);
                setPasswordStatus(null);
              }}
              className="w-full flex items-center justify-between text-xs font-bold text-stone-800 hover:text-amber-800 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-800" />
                Change Account Password
              </span>
              <span className="text-amber-800 text-[11px] font-semibold">
                {showPasswordChange ? 'Cancel' : 'Update'}
              </span>
            </button>

            {showPasswordChange && (
              <form onSubmit={handlePasswordChange} className="pt-2 border-t border-stone-200/80 space-y-3 animate-fade-in">
                {passwordStatus && (
                  <div className={`p-2.5 rounded-xl text-[11px] font-medium flex items-center gap-2 ${
                    passwordStatus.type === 'success'
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                      : 'bg-red-50 border border-red-200 text-red-900'
                  }`}>
                    {passwordStatus.type === 'success' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                    )}
                    <span>{passwordStatus.message}</span>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 focus:border-amber-800 text-xs text-stone-900 bg-white outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 focus:border-amber-800 text-xs text-stone-900 bg-white outline-hidden"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60 shadow-2xs"
                >
                  <KeyRound className="w-3.5 h-3.5 text-amber-300" />
                  <span>{isUpdating ? 'Updating Password...' : 'Save New Password'}</span>
                </button>
              </form>
            )}
          </div>

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
