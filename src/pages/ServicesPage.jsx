import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrench, Disc, Cpu, Wind, Compass, Settings, CheckCircle2, Clock, Shield, Search, ArrowRight, Filter } from 'lucide-react';
import { MOCK_SERVICES } from '../lib/mockData';

export const ServicesPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Maintenance', 'Safety & Brakes', 'Diagnostics', 'Comfort & HVAC', 'Tires & Steering', 'Drivetrain'];

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'Disc': return <Disc className="w-6 h-6 text-amber-400" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-indigo-400" />;
      case 'Wind': return <Wind className="w-6 h-6 text-cyan-400" />;
      case 'Compass': return <Compass className="w-6 h-6 text-emerald-400" />;
      case 'Settings': return <Settings className="w-6 h-6 text-purple-400" />;
      default: return <Wrench className="w-6 h-6 text-blue-400" />;
    }
  };

  const filteredServices = MOCK_SERVICES.filter(srv => {
    const matchesCategory = selectedCategory === 'All' || srv.category === selectedCategory;
    const matchesSearch = srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          srv.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
            Automotive Service Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Professional Auto Repair & Maintenance
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            All services are performed by certified technicians using OEM parts and backed by our 12-month / 12,000-mile nationwide warranty.
          </p>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
          />
        </div>

      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((srv) => (
          <div
            key={srv.id}
            className="glass-card p-6 rounded-2xl border border-slate-800/80 flex flex-col justify-between space-y-6 hover:border-blue-500/40"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
                  {getIconComponent(srv.icon_name)}
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-slate-300 text-xs font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {srv.estimated_time}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
                  {srv.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {srv.title}
                </h3>
              </div>

              <p className="text-slate-400 text-xs leading-relaxed">
                {srv.description}
              </p>

              <div className="space-y-2 pt-3 border-t border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Includes:</span>
                {srv.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-[10px] text-slate-500 block">Est. Cost</span>
                <span className="text-2xl font-black text-white">${srv.price.toFixed(2)}</span>
              </div>
              <button
                onClick={() => navigate(`/booking?service=${encodeURIComponent(srv.title)}`)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all hover:scale-105"
              >
                Book Now <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
