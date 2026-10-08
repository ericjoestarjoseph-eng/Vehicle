import React, { useState } from 'react';
import { Wrench, Plus, Edit3, Trash2, CheckCircle2, UserCheck, Clock, FileText, Car, DollarSign } from 'lucide-react';
import { MOCK_WORK_ORDERS } from '../lib/mockData';

export const WorkOrdersPage = () => {
  const [workOrders, setWorkOrders] = useState(MOCK_WORK_ORDERS);
  const [selectedWO, setSelectedWO] = useState(MOCK_WORK_ORDERS[0]);

  const [newPartName, setNewPartName] = useState('');
  const [newPartQty, setNewPartQty] = useState(1);
  const [newPartPrice, setNewPartPrice] = useState(50);

  const handleAddPart = (e) => {
    e.preventDefault();
    if (!newPartName.trim()) return;

    const newPartObj = { name: newPartName, quantity: Number(newPartQty), unit_price: Number(newPartPrice) };
    const updatedList = [...selectedWO.parts_list, newPartObj];

    const updatedWO = { ...selectedWO, parts_list: updatedList };
    setSelectedWO(updatedWO);
    setWorkOrders(prev => prev.map(w => w.id === selectedWO.id ? updatedWO : w));

    setNewPartName('');
    setNewPartQty(1);
    setNewPartPrice(50);
  };

  const calculatePartsTotal = (parts) => parts.reduce((sum, p) => sum + (p.quantity * p.unit_price), 0);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 flex justify-between items-center">
        <div>
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            Technician & Advisor Portal
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Digital Work Orders (Job Cards)</h1>
          <p className="text-slate-400 text-xs mt-1">Manage repair stages, labor hours, and spare parts inventory usage.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left List of Work Orders */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">All Active Work Orders</h3>
          {workOrders.map((wo) => (
            <div
              key={wo.id}
              onClick={() => setSelectedWO(wo)}
              className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                selectedWO.id === wo.id
                  ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold">{wo.license_plate}</span>
                  <h4 className="font-bold text-sm text-white">{wo.vehicle_details}</h4>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                  {wo.stage}
                </span>
              </div>
              <div className="mt-2 text-xs text-slate-400">
                Customer: <strong className="text-slate-200">{wo.customer_name}</strong>
              </div>
            </div>
          ))}
        </div>

        {/* Right Details & Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
            
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-blue-400 font-bold">{selectedWO.id.toUpperCase()}</span>
                <h2 className="text-2xl font-extrabold text-white">{selectedWO.vehicle_details}</h2>
                <div className="text-xs text-slate-400">Owner: {selectedWO.customer_name} • Plate: <strong className="text-amber-400">{selectedWO.license_plate}</strong></div>
              </div>
              <div className="space-y-1 text-right">
                <span className="text-xs text-slate-400 block">Stage Status</span>
                <select
                  value={selectedWO.stage}
                  onChange={(e) => {
                    const newStage = e.target.value;
                    const updated = { ...selectedWO, stage: newStage };
                    setSelectedWO(updated);
                    setWorkOrders(prev => prev.map(w => w.id === updated.id ? updated : w));
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-amber-400 focus:outline-none"
                >
                  <option>In Queue</option>
                  <option>Diagnostics</option>
                  <option>In Repair</option>
                  <option>Ready for Pickup</option>
                  <option>Delivered</option>
                </select>
              </div>
            </div>

            {/* Mechanic Assignment & Labor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Assigned Mechanic</label>
                <input
                  type="text"
                  value={selectedWO.mechanic_assigned}
                  onChange={(e) => {
                    const updated = { ...selectedWO, mechanic_assigned: e.target.value };
                    setSelectedWO(updated);
                    setWorkOrders(prev => prev.map(w => w.id === updated.id ? updated : w));
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Labor Hours</label>
                <input
                  type="number"
                  step="0.5"
                  value={selectedWO.labor_hours}
                  onChange={(e) => {
                    const updated = { ...selectedWO, labor_hours: Number(e.target.value) };
                    setSelectedWO(updated);
                    setWorkOrders(prev => prev.map(w => w.id === updated.id ? updated : w));
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>
            </div>

            {/* Installed Parts Editor */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex justify-between items-center">
                <span>Parts Installed ({selectedWO.parts_list.length})</span>
                <span className="text-amber-400 font-mono">Total Parts: ${calculatePartsTotal(selectedWO.parts_list).toFixed(2)}</span>
              </h3>

              <div className="space-y-2">
                {selectedWO.parts_list.map((pt, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-white font-medium">{pt.name} (Qty: {pt.quantity})</span>
                    <span className="font-mono text-emerald-400">${(pt.quantity * pt.unit_price).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Add Part Form */}
              <form onSubmit={handleAddPart} className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Part name (e.g. Oil Filter, Brake Pads)..."
                  value={newPartName}
                  onChange={(e) => setNewPartName(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                />
                <input
                  type="number"
                  placeholder="Qty"
                  value={newPartQty}
                  onChange={(e) => setNewPartQty(e.target.value)}
                  className="w-16 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newPartPrice}
                  onChange={(e) => setNewPartPrice(e.target.value)}
                  className="w-20 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shrink-0"
                >
                  + Add
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
