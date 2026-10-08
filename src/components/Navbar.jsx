import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Wrench, Car, Calendar, History, Shield, LogOut, LogIn, Menu, X, LayoutDashboard, FileText, ChevronDown } from 'lucide-react';

export const Navbar = () => {
  const { user, role, logout, switchRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-600 to-amber-500 text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-blue-400 bg-clip-text text-transparent">
                AUTOCARE
              </span>
              <span className="text-xs font-semibold tracking-wider text-amber-400 block -mt-1">
                PRO SERVICE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive('/') 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Home
            </Link>

            <Link
              to="/services"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive('/services') 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Wrench className="w-4 h-4" />
              Services
            </Link>

            <Link
              to="/booking"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive('/booking') 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              Book Service
            </Link>

            <Link
              to="/history"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive('/history') 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <History className="w-4 h-4" />
              Service History
            </Link>

            {/* Staff Navigation Links */}
            {(role === 'Admin' || role === 'Service Advisor') && (
              <>
                <div className="w-px h-5 bg-slate-800 my-auto mx-1" />
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive('/dashboard')
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'text-amber-300/80 hover:text-amber-300 hover:bg-slate-800/60'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  to="/work-orders"
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive('/work-orders')
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'text-amber-300/80 hover:text-amber-300 hover:bg-slate-800/60'
                  }`}
                >
                  Work Orders
                </Link>
                <Link
                  to="/invoices"
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive('/invoices')
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'text-amber-300/80 hover:text-amber-300 hover:bg-slate-800/60'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Invoices
                </Link>
              </>
            )}
          </nav>

          {/* User Controls & Role Switcher */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Quick Role Switcher for Demo */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-semibold text-slate-300 hover:border-slate-500 transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span>Role: <strong className="text-white">{role}</strong></span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl glass-panel border border-slate-700 shadow-2xl py-2 z-50">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-800">
                    Switch Demo View
                  </div>
                  {['Admin', 'Service Advisor', 'Customer'].map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        switchRole(r);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-slate-800 flex items-center justify-between ${
                        role === r ? 'text-blue-400 font-semibold bg-blue-500/10' : 'text-slate-300'
                      }`}
                    >
                      {r}
                      {role === r && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-200">
                    {user.user_metadata?.name || user.email?.split('@')[0]}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-medium flex items-center justify-end gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Home
          </Link>
          <Link
            to="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Services Catalog
          </Link>
          <Link
            to="/booking"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Book Service
          </Link>
          <Link
            to="/history"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Service History
          </Link>
          
          <div className="pt-2 border-t border-slate-800">
            <div className="px-4 py-1 text-xs text-slate-400">Role: <strong className="text-white">{role}</strong></div>
            <div className="flex gap-2 px-4 py-2">
              {['Admin', 'Service Advisor', 'Customer'].map((r) => (
                <button
                  key={r}
                  onClick={() => switchRole(r)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                    role === r ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between items-center px-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full flex justify-center items-center gap-2 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-semibold"
              >
                <LogOut className="w-4 h-4" /> Sign Out ({user.email})
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex justify-center items-center gap-2 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold"
              >
                <LogIn className="w-4 h-4" /> Sign In / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
