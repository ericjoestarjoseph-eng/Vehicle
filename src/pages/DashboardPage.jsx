import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Car, Wrench, Calendar, DollarSign, Clock, CheckCircle2, AlertTriangle, Plus, ChevronRight, User, FileText, ArrowUpRight } from 'lucide-react';
import { MOCK_WORK_ORDERS, MOCK_APPOINTMENTS, MOCK_INVOICES, MOCK_VEHICLES } from '../lib/mockData';

export const DashboardPage = () => {
  const [workOrders, setWorkOrders] = useState(MOCK_WORK_ORDERS);

  // Stage pipeline columns
  const stages = ['In Queue', 'Diagnostics', 'In Repair', 'Ready for Pickup'];

  const getOrdersByStage = (stageName) => workOrders.filter(wo => wo.stage === stageName);

  const moveStage = (orderId, newStage) => {
    setWorkOrders(prev => prev.map(wo => wo.id === orderId ? { ...wo, stage: newStage } : wo));
  };

  const totalRevenue = MOCK_INVOICES.reduce((sum, inv) => sum + inv.total_amount, 0);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            Station Management Portal
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Operational Dashboard</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/booking"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/20 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New Appointment
          </Link>
          <Link
            to="/work-orders"
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2"
          >
            <Wrench className="w-4 h-4 text-amber-400" /> Work Orders
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Vehicles in Service</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400"><Car className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{workOrders.length}</div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <span className="text-emerald-400 font-semibold flex items-center"><ArrowUpRight className="w-3.5 h-3.5" /> +2</span> since morning shift
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Today's Revenue</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400"><DollarSign className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">${totalRevenue.toFixed(2)}</div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <span className="text-emerald-400 font-semibold flex items-center"><ArrowUpRight className="w-3.5 h-3.5" /> 100%</span> collected
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Bookings</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400"><Calendar className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{MOCK_APPOINTMENTS.length}</div>
          <div className="text-[11px] text-slate-400">Next available slot: <strong className="text-amber-400">11:30 AM</strong></div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Active Bay Utilization</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400"><Wrench className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">85%</div>
          <div className="text-[11px] text-slate-400">6 of 8 Service Bays Occupied</div>
        </div>
      </div>

      {/* Service Stage Kanban Pipeline */}
      <div className="space-y-4 pt-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Wrench className="w-5 h-5 text-blue-400" /> Active Service Pipeline
          </h2>
          <span className="text-xs text-slate-400">Drag or click arrow to shift stages</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stages.map((stg) => {
            const items = getOrdersByStage(stg);
            return (
              <div key={stg} className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3 min-h-[360px]">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">{stg}</h3>
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center">
                    {items.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {items.map((wo) => (
                    <div key={wo.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 shadow-md hover:border-slate-700 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-amber-400">{wo.license_plate}</span>
                          <h4 className="text-xs font-bold text-white leading-snug">{wo.vehicle_details}</h4>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">{wo.id}</span>
                      </div>

                      <div className="text-[11px] text-slate-400">
                        Advisor/Tech: <strong className="text-slate-300">{wo.mechanic_assigned}</strong>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px]">
                        <span className="text-slate-500 font-mono">{wo.estimated_completion}</span>
                        
                        {/* Quick stage transition button */}
                        {stg !== 'Ready for Pickup' && (
                          <button
                            onClick={() => {
                              const nextIdx = stages.indexOf(stg) + 1;
                              if (nextIdx < stages.length) moveStage(wo.id, stages[nextIdx]);
                            }}
                            className="px-2 py-1 rounded bg-blue-600/20 text-blue-400 border border-blue-500/30 font-bold hover:bg-blue-600 hover:text-white transition-colors"
                          >
                            Advance →
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {items.length === 0 && (
                    <div className="p-8 text-center text-slate-600 text-xs border border-dashed border-slate-800/80 rounded-xl">
                      No vehicles in {stg}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
