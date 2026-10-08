import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Wrench, ShieldCheck, Clock, Award, Calendar, ArrowRight, CheckCircle2, Car, Activity, Sparkles, ChevronRight } from 'lucide-react';
import { MOCK_SERVICES, MOCK_WORK_ORDERS, MOCK_APPOINTMENTS } from '../lib/mockData';

export const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleStatusSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim().toUpperCase();
    
    // Search in work orders
    const matchedWO = MOCK_WORK_ORDERS.find(
      wo => wo.license_plate.toUpperCase() === query || wo.vehicle_vin.toUpperCase() === query
    );

    // Search in appointments
    const matchedApt = MOCK_APPOINTMENTS.find(
      apt => apt.license_plate.toUpperCase() === query || (apt.vin && apt.vin.toUpperCase() === query)
    );

    if (matchedWO) {
      setSearchResult({
        type: 'Work Order',
        title: matchedWO.vehicle_details,
        plate: matchedWO.license_plate,
        stage: matchedWO.stage,
        mechanic: matchedWO.mechanic_assigned,
        completion: matchedWO.estimated_completion,
        notes: matchedWO.notes
      });
    } else if (matchedApt) {
      setSearchResult({
        type: 'Appointment',
        title: `${matchedApt.vehicle_make} ${matchedApt.vehicle_model}`,
        plate: matchedApt.license_plate,
        stage: matchedApt.status,
        mechanic: 'Scheduled Team',
        completion: `${matchedApt.appointment_date} at ${matchedApt.appointment_time}`,
        notes: matchedApt.notes
      });
    } else {
      setSearchResult(null);
    }
    setHasSearched(true);
  };

  const getStageBadgeColor = (stage) => {
    switch (stage) {
      case 'In Queue': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'In Repair': case 'In Progress': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'Ready for Pickup': case 'Completed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              Automobile Service & Digital Tracking System
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Precision Care for <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-400 bg-clip-text text-transparent">
                Your Luxury & Daily Drive
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              Book appointments in seconds, track real-time job card progress, inspect digital diagnostic reports, and access complete transparent service history.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <Link
                to="/booking"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-500 hover:to-amber-400 text-white font-bold text-base shadow-xl shadow-blue-600/25 flex items-center justify-center gap-3 transition-all hover:scale-105"
              >
                <Calendar className="w-5 h-5" />
                Book Service Appointment
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-card text-slate-200 hover:text-white font-semibold text-base flex items-center justify-center gap-2 border border-slate-700/80"
              >
                <Wrench className="w-5 h-5 text-amber-400" />
                View Services & Pricing
              </Link>
            </div>

          </div>

          {/* Quick Vehicle Status Search Bar */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-3">
                <Activity className="w-5 h-5 text-blue-400 animate-pulse" />
                <h3 className="text-white font-bold text-lg">Live Vehicle Status Tracker</h3>
              </div>
              <p className="text-xs text-slate-400 mb-5">
                Already dropped off your car? Enter your **License Plate** or **VIN** (e.g. <code className="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded">AUT-8899</code> or <code className="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded">911-SPEED</code>) to check live status.
              </p>

              <form onSubmit={handleStatusSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter License Plate or VIN number..."
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 font-mono tracking-wider"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-blue-600/20"
                >
                  Track Now
                </button>
              </form>

              {/* Search Result Output */}
              {hasSearched && (
                <div className="mt-6 pt-6 border-t border-slate-800">
                  {searchResult ? (
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-xs text-slate-400 font-semibold">{searchResult.type} Record</div>
                          <h4 className="text-base font-bold text-white flex items-center gap-2">
                            <Car className="w-4 h-4 text-blue-400" />
                            {searchResult.title}
                          </h4>
                          <span className="text-xs text-amber-400 font-mono">Plate: {searchResult.plate}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStageBadgeColor(searchResult.stage)}`}>
                          {searchResult.stage}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                        <div><strong className="text-slate-500">Technician:</strong> {searchResult.mechanic}</div>
                        <div><strong className="text-slate-500">Target Time:</strong> {searchResult.completion}</div>
                      </div>
                      <p className="text-xs text-slate-400 italic bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                        "{searchResult.notes}"
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs text-center">
                      No active service record found for "{searchQuery}". Try <code className="text-white font-mono">AUT-8899</code> or <code className="text-white font-mono">911-SPEED</code>.
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* Metrics Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-800 text-center space-y-2">
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-400">12,500+</div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Vehicles Serviced</div>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-slate-800 text-center space-y-2">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">99.4%</div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Diagnostic Accuracy</div>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-slate-800 text-center space-y-2">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">15+</div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">ASE Master Techs</div>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-slate-800 text-center space-y-2">
            <div className="text-3xl sm:text-4xl font-extrabold text-purple-400">4.9 / 5.0</div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Customer Rating</div>
          </div>
        </div>
      </section>

      {/* Featured Services Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Popular Service Packages</h2>
            <p className="text-slate-400 text-sm mt-1">Transparent pricing, genuine OEM parts, and digital inspection reports.</p>
          </div>
          <Link to="/services" className="hidden sm:flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold text-sm">
            View All Services <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_SERVICES.slice(0, 3).map((srv) => (
            <div key={srv.id} className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6 group hover:border-blue-500/50">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold">
                    {srv.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> {srv.estimated_time}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {srv.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {srv.description}
                </p>
                <ul className="space-y-2 pt-2 border-t border-slate-800/80">
                  {srv.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-xs text-slate-500 block">Starting from</span>
                  <span className="text-2xl font-black text-white">${srv.price.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => navigate(`/booking?service=${encodeURIComponent(srv.title)}`)}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-blue-600/20"
                >
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4-Step Process Flow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 text-center space-y-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">How AutoCare Works</h2>
            <p className="text-slate-400 text-sm mt-1">Seamless digital vehicle service workflow designed for total peace of mind.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3 relative">
              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/40 font-extrabold text-xl flex items-center justify-center mx-auto shadow-lg shadow-blue-600/20">
                01
              </div>
              <h4 className="text-base font-bold text-white">Online Booking</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Select your service, choose your preferred date and time slot in under 60 seconds.</p>
            </div>
            <div className="space-y-3 relative">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 font-extrabold text-xl flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
                02
              </div>
              <h4 className="text-base font-bold text-white">Express Drop-Off</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Drive in or use our 24/7 key drop. Our advisors perform an instant check-in.</p>
            </div>
            <div className="space-y-3 relative">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 font-extrabold text-xl flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/20">
                03
              </div>
              <h4 className="text-base font-bold text-white">Live Job Tracking</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Track diagnostics, labor progress, and parts replacement right from your phone.</p>
            </div>
            <div className="space-y-3 relative">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-extrabold text-xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                04
              </div>
              <h4 className="text-base font-bold text-white">Digital Invoice & Pickup</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Inspect itemized invoice, pay securely online or at station, and drive home satisfied.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
