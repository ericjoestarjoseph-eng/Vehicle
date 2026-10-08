import React, { useState } from 'react';
import { History, Search, Car, Calendar, FileText, CheckCircle2, Clock, Wrench, User, DollarSign, Download, Filter } from 'lucide-react';
import { MOCK_VEHICLES, MOCK_WORK_ORDERS, MOCK_INVOICES, MOCK_APPOINTMENTS } from '../lib/mockData';

export const ServiceHistoryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(MOCK_VEHICLES[0]);

  // Filter vehicles matching search query
  const filteredVehicles = MOCK_VEHICLES.filter(v => 
    v.license_plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.vin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Work orders for selected vehicle
  const vehicleWorkOrders = MOCK_WORK_ORDERS.filter(wo => 
    wo.vehicle_vin === selectedVehicle.vin || wo.license_plate === selectedVehicle.license_plate
  );

  // Invoices for selected vehicle
  const vehicleInvoices = MOCK_INVOICES.filter(inv =>
    inv.license_plate === selectedVehicle.license_plate
  );

  // Appointments for selected vehicle
  const vehicleAppointments = MOCK_APPOINTMENTS.filter(apt =>
    apt.license_plate === selectedVehicle.license_plate || apt.vin === selectedVehicle.vin
  );

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
            Vehicle Health Ledger
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-2">Digital Service History</h1>
          <p className="text-slate-400 text-xs mt-1">Complete maintenance record timeline, parts replacement log, and digital invoices.</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search VIN, Plate (e.g. AUT-8899)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Vehicle Selector List */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Car className="w-4 h-4 text-amber-400" /> Registered Vehicles ({filteredVehicles.length})
          </h3>

          <div className="space-y-3">
            {filteredVehicles.map((v) => (
              <div
                key={v.id}
                onClick={() => setSelectedVehicle(v)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  selectedVehicle.id === v.id
                    ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm text-white">{v.year} {v.make} {v.model}</h4>
                    <span className="text-xs text-amber-400 font-mono font-bold block mt-0.5">
                      Plate: {v.license_plate}
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    {v.mileage.toLocaleString()} mi
                  </span>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex justify-between items-center text-[11px] text-slate-400">
                  <span className="flex items-center gap-1"><User className="w-3 h-3 text-slate-500" /> {v.customer_name}</span>
                  <span className="font-mono text-slate-500 truncate max-w-[120px]">{v.vin}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Detailed History Timeline */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Vehicle Card */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex justify-between items-center bg-slate-900/80">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Vehicle Profile</span>
              <h2 className="text-2xl font-extrabold text-white">{selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}</h2>
              <div className="flex gap-4 text-xs text-slate-400 mt-1 font-mono">
                <span>VIN: <strong className="text-slate-200">{selectedVehicle.vin}</strong></span>
                <span>Plate: <strong className="text-amber-400">{selectedVehicle.license_plate}</strong></span>
                <span>Color: <strong className="text-slate-200">{selectedVehicle.color}</strong></span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Odometer</span>
              <span className="text-xl font-bold text-emerald-400 font-mono">{selectedVehicle.mileage.toLocaleString()} mi</span>
            </div>
          </div>

          {/* Service Work Orders Timeline */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <History className="w-4 h-4 text-blue-400" /> Completed & Active Work Orders
            </h3>

            {vehicleWorkOrders.length > 0 ? (
              vehicleWorkOrders.map((wo) => (
                <div key={wo.id} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold font-mono">
                          {wo.id.toUpperCase()}
                        </span>
                        <h4 className="text-base font-bold text-white">Work Order Job Card</h4>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Assigned Mechanic: <strong className="text-slate-200">{wo.mechanic_assigned}</strong></p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {wo.stage}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 italic bg-slate-900 p-3 rounded-xl border border-slate-800">
                    "{wo.notes}"
                  </p>

                  {/* Replaced Parts List */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Parts Installed & Consumables:</span>
                    <div className="bg-slate-900/90 rounded-xl border border-slate-800 divide-y divide-slate-800/80">
                      {wo.parts_list.map((part, pIdx) => (
                        <div key={pIdx} className="p-2.5 flex justify-between items-center text-xs">
                          <span className="text-slate-200 font-medium flex items-center gap-2">
                            <Wrench className="w-3.5 h-3.5 text-slate-500" /> {part.name} (x{part.quantity})
                          </span>
                          <span className="font-mono text-slate-300">${(part.quantity * part.unit_price).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs pt-3 border-t border-slate-800 text-slate-400">
                    <span>Labor Hours: <strong className="text-white">{wo.labor_hours} hrs</strong> (@ ${wo.labor_rate}/hr)</span>
                    <span className="font-bold text-amber-400">Est Completion: {wo.estimated_completion}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="glass-panel p-8 rounded-2xl text-center text-slate-400 text-xs">
                No archived work order job cards found for vehicle {selectedVehicle.license_plate}.
              </div>
            )}
          </div>

          {/* Associated Invoices */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" /> Associated Invoices & Receipts
            </h3>

            {vehicleInvoices.length > 0 ? (
              vehicleInvoices.map((inv) => (
                <div key={inv.id} className="glass-card p-5 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="text-xs font-mono font-bold text-amber-400">{inv.invoice_number}</div>
                    <div className="text-sm font-bold text-white mt-0.5">{inv.vehicle_details}</div>
                    <div className="text-[11px] text-slate-500">Issued: {inv.issue_date} • Paid via {inv.payment_method}</div>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="text-lg font-black text-white block">${inv.total_amount.toFixed(2)}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {inv.payment_status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="glass-panel p-6 rounded-2xl text-center text-slate-400 text-xs">
                No paid billing receipts recorded for vehicle {selectedVehicle.license_plate}.
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
