import React, { useState } from 'react';
import { Printer, DollarSign, FileText, CheckCircle2, Download, CreditCard, Shield, Car, User } from 'lucide-react';
import { MOCK_INVOICES } from '../lib/mockData';

export const InvoicesPage = () => {
  const [invoices, setInvoices] = useState(MOCK_INVOICES);
  const [activeInvoice, setActiveInvoice] = useState(MOCK_INVOICES[0]);

  const handlePrint = () => {
    window.print();
  };

  const togglePaymentStatus = (invId) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === invId) {
        const nextStatus = inv.payment_status === 'Paid' ? 'Pending' : 'Paid';
        const updated = { ...inv, payment_status: nextStatus, payment_method: nextStatus === 'Paid' ? 'Credit Card (Terminal)' : 'Awaiting Payment' };
        if (activeInvoice.id === invId) setActiveInvoice(updated);
        return updated;
      }
      return inv;
    }));
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 flex justify-between items-center print:hidden">
        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            Billing & Revenue Center
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Customer Invoices</h1>
          <p className="text-slate-400 text-xs mt-1">Generate itemized billing statement for labor, parts, tax, and discount.</p>
        </div>

        <button
          onClick={handlePrint}
          className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 flex items-center gap-2"
        >
          <Printer className="w-4 h-4" /> Print / Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Invoice Selector List */}
        <div className="space-y-3 print:hidden">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">All Generated Invoices</h3>
          {invoices.map((inv) => (
            <div
              key={inv.id}
              onClick={() => setActiveInvoice(inv)}
              className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                activeInvoice.id === inv.id
                  ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400">{inv.invoice_number}</span>
                  <h4 className="font-bold text-sm text-white">{inv.customer_name}</h4>
                </div>
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
                  inv.payment_status === 'Paid'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                }`}>
                  {inv.payment_status}
                </span>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400">{inv.license_plate}</span>
                <span className="font-extrabold text-white">${inv.total_amount.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Invoice Printable View Sheet */}
        <div className="lg:col-span-2">
          <div id="printable-invoice" className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 space-y-8 bg-slate-900/90 text-slate-100">
            
            {/* Invoice Top Header */}
            <div className="flex justify-between items-start border-b border-slate-800 pb-6">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-600 text-white font-black text-sm">AC</div>
                  <h2 className="text-2xl font-extrabold text-white tracking-wider">AUTOCARE PRO</h2>
                </div>
                <p className="text-xs text-slate-400 mt-1">1040 Performance Way, Automotive District, CA 90210</p>
                <p className="text-xs text-slate-400">Phone: +1 (800) 555-AUTO • Tax ID: 88-3920194</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-amber-400 font-bold tracking-wider uppercase">INVOICE</span>
                <h3 className="text-xl font-bold font-mono text-white">{activeInvoice.invoice_number}</h3>
                <p className="text-xs text-slate-400 mt-1">Date: {activeInvoice.issue_date}</p>
                <p className="text-xs text-slate-400">Due Date: {activeInvoice.due_date}</p>
              </div>
            </div>

            {/* Billed To & Vehicle Info */}
            <div className="grid grid-cols-2 gap-6 text-xs bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <div>
                <span className="text-slate-500 font-bold uppercase tracking-wider block mb-1">Customer Details</span>
                <strong className="text-white text-sm block">{activeInvoice.customer_name}</strong>
                <span className="text-slate-400">{activeInvoice.customer_email}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold uppercase tracking-wider block mb-1">Vehicle Specifications</span>
                <strong className="text-white text-sm block">{activeInvoice.vehicle_details}</strong>
                <span className="text-amber-400 font-mono">Plate: {activeInvoice.license_plate}</span>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Itemized Work & Consumables</span>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono">
                    <th className="py-3 px-2">Description</th>
                    <th className="py-3 px-2">Category</th>
                    <th className="py-3 px-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {activeInvoice.items.map((item, idx) => (
                    <tr key={idx} className="text-slate-200">
                      <td className="py-3 px-2 font-medium">{item.description}</td>
                      <td className="py-3 px-2 text-slate-400">{item.category}</td>
                      <td className="py-3 px-2 text-right font-mono text-white">${item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Breakdown */}
            <div className="flex justify-end pt-4 border-t border-slate-800">
              <div className="w-64 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span className="font-mono text-slate-200">${activeInvoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tax (8%):</span>
                  <span className="font-mono text-slate-200">${activeInvoice.tax_amount.toFixed(2)}</span>
                </div>
                {activeInvoice.discount_amount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount:</span>
                    <span className="font-mono">-${activeInvoice.discount_amount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
                  <span>Total Due:</span>
                  <span className="font-mono text-amber-400">${activeInvoice.total_amount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Footer & Payment Status Trigger */}
            <div className="flex justify-between items-center pt-6 border-t border-slate-800 text-xs text-slate-400">
              <div>
                <span>Status: </span>
                <strong className={activeInvoice.payment_status === 'Paid' ? 'text-emerald-400' : 'text-amber-400'}>
                  {activeInvoice.payment_status} ({activeInvoice.payment_method})
                </strong>
              </div>
              <button
                onClick={() => togglePaymentStatus(activeInvoice.id)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs print:hidden"
              >
                Mark as {activeInvoice.payment_status === 'Paid' ? 'Pending' : 'Paid'}
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
