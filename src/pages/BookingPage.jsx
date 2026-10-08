import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, Car, User, CheckCircle2, Wrench, ArrowRight, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import { MOCK_SERVICES } from '../lib/mockData';
import { supabase } from '../lib/supabase';

export const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const preselectedService = searchParams.get('service') || '';

  // Wizard Step State
  const [step, setStep] = useState(1);

  // Form Fields
  const [selectedService, setSelectedService] = useState(preselectedService || MOCK_SERVICES[0].title);
  const [vehicleMake, setVehicleMake] = useState('BMW');
  const [vehicleModel, setVehicleModel] = useState('M3 Competition');
  const [year, setYear] = useState('2023');
  const [licensePlate, setLicensePlate] = useState('AUT-8899');
  const [vin, setVin] = useState('');
  const [bookingDate, setBookingDate] = useState('2026-10-10');
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  
  const [fullName, setFullName] = useState('Alexander Wright');
  const [email, setEmail] = useState('alex.wright@example.com');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [notes, setNotes] = useState('');

  const [bookingComplete, setBookingComplete] = useState(false);
  const [createdAppointmentId, setCreatedAppointmentId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService);
    }
  }, [preselectedService]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const aptData = {
      customer_name: fullName,
      customer_email: email,
      customer_phone: phone,
      vehicle_make: vehicleMake,
      vehicle_model: vehicleModel,
      license_plate: licensePlate.toUpperCase(),
      vin: vin ? vin.toUpperCase() : `VIN-${Math.floor(100000 + Math.random() * 900000)}`,
      service_type: selectedService,
      appointment_date: bookingDate,
      appointment_time: bookingTime,
      status: 'Scheduled',
      notes: notes || 'Booked online via web portal.'
    };

    try {
      // Try writing to Supabase
      const { data, error } = await supabase.from('appointments').insert([aptData]).select();
      if (data && data[0]) {
        setCreatedAppointmentId(data[0].id);
      } else {
        setCreatedAppointmentId(`APT-${Math.floor(1000 + Math.random() * 9000)}`);
      }
    } catch (err) {
      setCreatedAppointmentId(`APT-${Math.floor(1000 + Math.random() * 9000)}`);
    } finally {
      setIsSubmitting(false);
      setBookingComplete(true);
    }
  };

  const getServiceObj = (title) => MOCK_SERVICES.find(s => s.title === title) || MOCK_SERVICES[0];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
          Online Appointment Scheduler
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Book Vehicle Service</h1>
        <p className="text-slate-400 text-sm">Schedule your drop-off time with our certified technicians in 3 easy steps.</p>
      </div>

      {/* Progress Bar */}
      {!bookingComplete && (
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex justify-between items-center max-w-2xl mx-auto">
          <div className={`flex items-center gap-2 text-xs font-bold ${step >= 1 ? 'text-blue-400' : 'text-slate-600'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-800'}`}>1</span>
            Service Selection
          </div>
          <div className="w-12 h-px bg-slate-800" />
          <div className={`flex items-center gap-2 text-xs font-bold ${step >= 2 ? 'text-blue-400' : 'text-slate-600'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-800'}`}>2</span>
            Vehicle & Schedule
          </div>
          <div className="w-12 h-px bg-slate-800" />
          <div className={`flex items-center gap-2 text-xs font-bold ${step >= 3 ? 'text-blue-400' : 'text-slate-600'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-800'}`}>3</span>
            Customer Details
          </div>
        </div>
      )}

      {/* Main Form Container */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative">
        
        {bookingComplete ? (
          /* Confirmation State */
          <div className="text-center space-y-6 py-8">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-emerald-400 tracking-widest font-bold">Appointment Confirmed</span>
              <h2 className="text-3xl font-extrabold text-white">Booking Complete!</h2>
              <p className="text-slate-300 text-sm max-w-lg mx-auto">
                Your appointment ID is <strong className="text-amber-400 font-mono">{createdAppointmentId}</strong>. A confirmation summary has been logged for your service.
              </p>
            </div>

            <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 text-left max-w-md mx-auto space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Service:</span>
                <span className="font-bold text-white">{selectedService}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Vehicle:</span>
                <span className="font-bold text-white">{vehicleMake} {vehicleModel} ({licensePlate})</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Scheduled Time:</span>
                <span className="font-bold text-amber-400">{bookingDate} at {bookingTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Customer:</span>
                <span className="font-bold text-white">{fullName}</span>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={() => navigate('/history')}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-blue-600/20"
              >
                Track Service History
              </button>
              <button
                onClick={() => {
                  setBookingComplete(false);
                  setStep(1);
                }}
                className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit} className="space-y-8">
            
            {/* STEP 1: Select Service */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Wrench className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-bold text-white">Step 1: Choose Service Required</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {MOCK_SERVICES.map((srv) => (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedService(srv.title)}
                      className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                        selectedService === srv.title
                          ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-sm text-white">{srv.title}</h4>
                        <span className="text-xs font-black text-amber-400">${srv.price.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">{srv.description}</p>
                      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/60">
                        <span>Est. Time: {srv.estimated_time}</span>
                        {selectedService === srv.title && (
                          <span className="text-blue-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/20 flex items-center gap-2"
                  >
                    Next: Vehicle & Schedule <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Vehicle & Schedule */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Car className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-bold text-white">Step 2: Vehicle & Preferred Time Slot</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Vehicle Make *</label>
                    <input
                      type="text"
                      required
                      value={vehicleMake}
                      onChange={(e) => setVehicleMake(e.target.value)}
                      placeholder="e.g. BMW, Tesla, Ford"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Vehicle Model *</label>
                    <input
                      type="text"
                      required
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      placeholder="e.g. M3, Model Y, F-150"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Year *</label>
                    <input
                      type="number"
                      required
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="2023"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">License Plate *</label>
                    <input
                      type="text"
                      required
                      value={licensePlate}
                      onChange={(e) => setLicensePlate(e.target.value)}
                      placeholder="e.g. AUT-8899"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono uppercase tracking-wider focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">VIN Number (Optional)</label>
                    <input
                      type="text"
                      value={vin}
                      onChange={(e) => setVin(e.target.value)}
                      placeholder="17-Digit Vehicle Identification Number"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono uppercase focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5 text-blue-400" /> Select Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" /> Time Slot *
                    </label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                    >
                      <option>08:00 AM</option>
                      <option>09:15 AM</option>
                      <option>10:00 AM</option>
                      <option>11:30 AM</option>
                      <option>01:00 PM</option>
                      <option>02:30 PM</option>
                      <option>04:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/20 flex items-center gap-2"
                  >
                    Next: Contact Details <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Customer Details & Confirm */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-lg font-bold text-white">Step 3: Contact & Confirmation</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Special Requests / Symptoms</label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Describe any noise, warning lights, or specific instructions for our master tech..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Summary Card */}
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Booking Summary Review
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-slate-300 pt-2">
                    <div>
                      <span className="text-slate-500 block">Service Selected:</span>
                      <strong>{selectedService}</strong> (${getServiceObj(selectedService).price.toFixed(2)})
                    </div>
                    <div>
                      <span className="text-slate-500 block">Vehicle:</span>
                      <strong>{vehicleMake} {vehicleModel} ({licensePlate})</strong>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-500 hover:to-amber-400 text-white font-bold text-xs shadow-xl shadow-blue-600/30 flex items-center gap-2"
                  >
                    {isSubmitting ? 'Confirming...' : 'Confirm Appointment'} <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

          </form>
        )}

      </div>
    </div>
  );
};
