import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, Shield, UserCheck, Key, ArrowRight, AlertCircle, Sparkles, CheckCircle2, Car } from 'lucide-react';
import { DEMO_ACCOUNTS } from '../lib/mockData';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { loginWithSupabase, switchRole } = useAuth();

  const [email, setEmail] = useState('admin@autocare.com');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState('Admin');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBanner, setSuccessBanner] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessBanner('');
    setIsSubmitting(true);

    const result = await loginWithSupabase(email, password);
    setIsSubmitting(false);

    if (result.success) {
      switchRole(selectedRole);
      setSuccessBanner(`Signed in successfully as ${selectedRole}!`);
      setTimeout(() => {
        if (selectedRole === 'Customer') {
          navigate('/');
        } else {
          navigate('/dashboard');
        }
      }, 700);
    } else {
      setErrorMsg(result.error || 'Invalid credentials. Try using one of the quick demo buttons below.');
    }
  };

  const handleFillDemo = (demo) => {
    setEmail(demo.email);
    setPassword(demo.password);
    setSelectedRole(demo.role);
    setErrorMsg('');
  };

  return (
    <div className="max-w-md mx-auto pt-8 pb-16 space-y-6">
      
      {/* Top Banner */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-amber-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-blue-500/20">
          <Car className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-white">Station Staff & User Login</h1>
        <p className="text-slate-400 text-xs">Sign in to access your role-based dashboard & service portal.</p>
      </div>

      {/* Role Selection Tabs */}
      <div className="glass-panel p-1.5 rounded-2xl border border-slate-800 flex gap-1">
        {['Admin', 'Service Advisor', 'Customer'].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setSelectedRole(r)}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedRole === r
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Main Login Form */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
        
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successBanner && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successBanner}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-400" /> Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@autocare.com"
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-400" /> Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-500 hover:to-amber-400 text-white font-bold text-xs shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            {isSubmitting ? 'Authenticating...' : `Sign In as ${selectedRole}`}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Accounts Quick-Fill Section */}
        <div className="pt-6 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-amber-400" /> Demo Quick Credentials</span>
            <span className="text-[10px] text-slate-500 font-normal">Click to fill</span>
          </div>

          <div className="space-y-2">
            {DEMO_ACCOUNTS.map((demo, idx) => (
              <div
                key={idx}
                onClick={() => handleFillDemo(demo)}
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 cursor-pointer flex justify-between items-center text-xs transition-colors group"
              >
                <div>
                  <div className="font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                    {demo.role}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{demo.email}</div>
                </div>
                <span className="text-[10px] px-2 py-1 rounded bg-slate-800 text-slate-300 font-semibold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  Use Preset
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
