import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Phone, Mail, MapPin, Clock, ShieldCheck, Award, Wrench } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="glass-panel border-t border-slate-800/80 mt-auto bg-slate-950/80 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-600 to-amber-500 text-white shadow-lg shadow-blue-500/20">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                  AUTOCARE
                </span>
                <span className="text-xs font-semibold tracking-wider text-amber-400 block -mt-1">
                  PRO SERVICE
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Premier automotive service center specializing in full diagnostics, brake overhauls, climate control, synthetic oil changes, and complete digital vehicle history tracking.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> ASE Certified Master Techs
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 tracking-wider uppercase text-xs">Quick Links</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-400 transition-colors">Services & Pricing</Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-blue-400 transition-colors">Schedule Appointment</Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-blue-400 transition-colors">Vehicle History Search</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-400 transition-colors">Staff Login Portal</Link>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h4 className="text-white font-bold mb-4 tracking-wider uppercase text-xs">Operating Hours</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex justify-between border-b border-slate-900 pb-1.5">
                <span className="text-slate-400">Monday - Friday:</span>
                <span className="text-slate-200 font-semibold">07:30 AM - 07:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-slate-900 pb-1.5">
                <span className="text-slate-400">Saturday:</span>
                <span className="text-slate-200 font-semibold">08:00 AM - 05:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-slate-900 pb-1.5">
                <span className="text-slate-400">Sunday:</span>
                <span className="text-amber-400 font-semibold">Emergency Service Only</span>
              </li>
              <li className="pt-2 text-[11px] text-slate-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400" /> Express Key Drop Available 24/7
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold mb-4 tracking-wider uppercase text-xs">Service Station Location</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>1040 Performance Way, Automotive District, CA 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold text-slate-200">+1 (800) 555-AUTO (2886)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>service@autocarepro.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AutoCare Pro Service Center. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Warranty Details</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
