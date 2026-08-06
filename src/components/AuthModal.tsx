import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Crown,
  UserCheck,
  AlertCircle,
  Sliders
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSite } from '../context/SiteContext';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    authModalMode,
    closeAuthModal,
    openAuthModal,
    signUpWithEmail,
    signInWithEmail,
    loginWithOAuth
  } = useAuth();

  const { setIsAdminMode } = useSite();

  const [selectedRole, setSelectedRole] = useState<'admin' | 'customer'>('admin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [oauthLoading, setOauthLoading] = useState<'google' | 'microsoft' | 'apple' | null>(null);

  if (!isAuthModalOpen) return null;

  const isSignUp = authModalMode === 'signup';

  const validateSignUpForm = () => {
    // 1. Full Name Validation
    if (!name || name.trim().length < 2) {
      setError('Please enter a valid full name (at least 2 characters).');
      return false;
    }

    // 2. Email Validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return false;
    }

    // 3. Password Validation
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }

    // 4. Confirm Password Matching
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your password.');
      return false;
    }

    return true;
  };

  const validateSignInForm = () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (!password) {
      setError('Please enter your password.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isSignUp) {
      if (!validateSignUpForm()) return;
    } else {
      if (!validateSignInForm()) return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await signUpWithEmail(name.trim(), email, selectedRole);
      } else {
        await signInWithEmail(email, selectedRole);
      }

      // Activate Admin Mode only if logging in as verified owner
      if (email.toLowerCase().trim() === 'daosflorida@gmail.com') {
        setIsAdminMode(true);
      } else {
        setIsAdminMode(false);
      }

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'microsoft' | 'apple') => {
    setError(null);
    setOauthLoading(provider);
    try {
      await loginWithOAuth(provider, isSignUp, selectedRole);
    } catch (err: any) {
      setError(`Failed to sign ${isSignUp ? 'up' : 'in'} with ${provider}.`);
    } finally {
      setOauthLoading(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl border border-amber-200 shadow-2xl w-full max-w-lg overflow-hidden my-auto relative transition-all">
        
        {/* Top Header Decor */}
        <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 text-white p-6 sm:p-7 relative border-b border-stone-800">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider border border-amber-500/30">
              DAOS Cakes Authentication
            </span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
            {isSignUp ? 'Create Your Account' : 'Sign In to Your Account'}
          </h3>
          <p className="text-stone-300 text-xs mt-1">
            {isSignUp
              ? 'Register as an Admin or Customer to manage site content & custom orders.'
              : 'Access your account privileges, site admin tools, and order preferences.'}
          </p>

          {/* Sign In vs Sign Up Tabs */}
          <div className="flex bg-stone-900/90 p-1 rounded-xl mt-5 border border-stone-700/80">
            <button
              onClick={() => {
                setError(null);
                openAuthModal('signup');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                isSignUp
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>Sign Up (Register)</span>
            </button>

            <button
              onClick={() => {
                setError(null);
                openAuthModal('signin');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                !isSignUp
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-amber-300" />
              <span>Sign In</span>
            </button>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-7 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Account Role Choice */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5 space-y-2">
            <label className="block text-xs font-bold text-amber-950 uppercase tracking-wider">
              1. Choose Account Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedRole === 'admin'
                    ? 'bg-white border-amber-800 ring-2 ring-amber-800/20 text-stone-900 shadow-2xs'
                    : 'bg-stone-50/80 border-stone-200 text-stone-600 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-amber-900 flex items-center gap-1">
                    <Crown className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                    Administrator
                  </span>
                  {selectedRole === 'admin' && (
                    <span className="w-2 h-2 rounded-full bg-amber-800" />
                  )}
                </div>
                <p className="text-[11px] text-stone-500 leading-snug">
                  Restricted to verified owner (daosflorida@gmail.com)
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('customer')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedRole === 'customer'
                    ? 'bg-white border-stone-800 ring-2 ring-stone-800/20 text-stone-900 shadow-2xs'
                    : 'bg-stone-50/80 border-stone-200 text-stone-600 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-stone-800 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-stone-500" />
                    Customer
                  </span>
                  {selectedRole === 'customer' && (
                    <span className="w-2 h-2 rounded-full bg-stone-800" />
                  )}
                </div>
                <p className="text-[11px] text-stone-500 leading-snug">
                  Save order details & custom cake requests
                </p>
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-amber-100/80 border border-amber-300 text-xs text-amber-950 font-medium flex items-center gap-2 shadow-2xs">
              <AlertCircle className="w-4 h-4 text-amber-800 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Social Auth Options (4 Providers Supported) */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
              2. {isSignUp ? 'Sign-Up Options' : 'Sign-In Options'}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* Google */}
              <button
                type="button"
                onClick={() => handleOAuth('google')}
                disabled={!!oauthLoading || loading}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold shadow-2xs hover:border-stone-300 transition-all cursor-pointer disabled:opacity-60"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="truncate">{oauthLoading === 'google' ? 'Connecting...' : 'Google'}</span>
              </button>

              {/* Microsoft */}
              <button
                type="button"
                onClick={() => handleOAuth('microsoft')}
                disabled={!!oauthLoading || loading}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold shadow-2xs hover:border-stone-300 transition-all cursor-pointer disabled:opacity-60"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 23 23">
                  <path fill="#f35325" d="M1 1h10v10H1z"/>
                  <path fill="#81bc06" d="M12 1h10v10H12z"/>
                  <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                  <path fill="#ffba08" d="M12 12h10v10H12z"/>
                </svg>
                <span className="truncate">{oauthLoading === 'microsoft' ? 'Connecting...' : 'Microsoft'}</span>
              </button>

              {/* Apple */}
              <button
                type="button"
                onClick={() => handleOAuth('apple')}
                disabled={!!oauthLoading || loading}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-stone-900 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer disabled:opacity-60"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.82.13-9.68-1.92-14.58-6.14-3.23-2.83-7.14-7.53-11.73-14.11-6.53-9.28-11.66-19.86-15.38-31.74-3.72-11.88-5.58-23.36-5.58-34.45 0-14.75 3.73-27.18 11.2-37.3 7.47-10.12 17.11-15.29 28.92-15.52 4.71 0 10.02 1.18 15.93 3.54 5.91 2.36 10.02 3.6 12.33 3.72 2.12 0 6.38-1.36 12.78-4.08 6.4-2.73 11.96-3.98 16.68-3.76 12.33.95 22.06 5.25 29.19 12.91-10.89 6.56-16.22 15.61-16.01 27.15.22 8.97 3.59 16.5 10.12 22.59 6.53 6.09 14.38 9.7 23.55 10.84-2.36 7.15-5.53 14.17-9.51 21.08zM119.22 31.81c0-6.91 2.53-13.56 7.59-19.95 5.06-6.39 11.26-10.3 18.6-11.73.54 6.78-1.57 13.58-6.33 20.4-4.76 6.82-10.96 10.74-18.6 11.76-.22-.16-.43-.24-.65-.24-.22 0-.43-.08-.61-.24z" />
                </svg>
                <span className="truncate">{oauthLoading === 'apple' ? 'Connecting...' : 'Apple'}</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-stone-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-bold text-stone-400 uppercase tracking-wider relative">
              Or with Email & Password
            </span>
          </div>

          {/* Email & Password Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            
            {/* Full Name Field with explicit Validation (Sign-Up Only) */}
            {isSignUp && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-stone-700">
                    Full Name <span className="text-amber-800">*</span>
                  </label>
                  <span className="text-[10px] text-stone-400">Min. 2 characters</span>
                </div>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required={isSignUp}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:border-amber-800 focus:ring-1 focus:ring-amber-800 text-xs text-stone-900 outline-hidden bg-stone-50/50"
                  />
                </div>
              </div>
            )}

            {/* Email Address Field */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Email Address <span className="text-amber-800">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="admin@daoscakes.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:border-amber-800 focus:ring-1 focus:ring-amber-800 text-xs text-stone-900 outline-hidden bg-stone-50/50"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-stone-700">
                  Password <span className="text-amber-800">*</span>
                </label>
                {isSignUp && <span className="text-[10px] text-stone-400">Min. 6 characters</span>}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:border-amber-800 focus:ring-1 focus:ring-amber-800 text-xs text-stone-900 outline-hidden bg-stone-50/50"
                />
              </div>
            </div>

            {/* Confirm Password Field (Sign-Up Only) */}
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Confirm Password <span className="text-amber-800">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:border-amber-800 focus:ring-1 focus:ring-amber-800 text-xs text-stone-900 outline-hidden bg-stone-50/50"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !!oauthLoading}
              className="w-full py-3 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 mt-3 disabled:opacity-60"
            >
              <span>
                {loading
                  ? 'Processing Request...'
                  : isSignUp
                  ? `Sign Up as ${selectedRole === 'admin' ? 'Administrator' : 'Customer'}`
                  : `Sign In as ${selectedRole === 'admin' ? 'Administrator' : 'Customer'}`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* Privacy Footnote */}
          <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-800" />
            <span>Encrypted SSL Admin & User Account Storage</span>
          </div>

        </div>

      </div>
    </div>
  );
}
