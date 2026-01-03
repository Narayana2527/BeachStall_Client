import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Calendar, Loader2, ClipboardCheck, Phone, ChevronRight, ListTree } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  
  // State to manage nested selections
  const [formData, setFormData] = useState({
    phone: '',
    category: '', // Level 1
    subCategory: '', // Level 2
    nestedOption: '', // Level 3
    customNotes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem('token');

    const bookingData = {
      ...formData,
      eventDate: selectedDate.toISOString(),
      details: {
        subCategory: formData.subCategory,
        nestedOption: formData.nestedOption,
        customNotes: formData.customNotes
      }
    };

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post('https://beach-stall-server-gezy.vercel.app/api/bookings', bookingData, config);
      
      Swal.fire({ title: 'Reserved!', text: 'Your tiered booking is successful.', icon: 'success' });
      setFormData({ phone: '', category: '', subCategory: '', nestedOption: '', customNotes: '' });
    } catch (error) {
      Swal.fire({ title: 'Error', text: 'Something went wrong.', icon: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to reset lower levels when a higher level changes
  const handleCategoryChange = (val) => {
    setFormData({ ...formData, category: val, subCategory: '', nestedOption: '' });
  };

  const handleSubCategoryChange = (val) => {
    setFormData({ ...formData, subCategory: val, nestedOption: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 selection:bg-indigo-100">
      <div className="w-full max-w-xl bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-gray-100">
        
        {/* Header Section */}
        <div className="bg-indigo-600 p-8 text-white relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <ClipboardCheck size={120} />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold tracking-tight">Reserve Your Slot</h2>
            <p className="text-indigo-100 mt-2 font-medium">Precision booking for your special events.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {/* Section: Contact & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest px-1">Call-back Number</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                <input
                  type="tel" required
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all text-gray-700 font-medium"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest px-1">Reservation Time</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                className="w-full p-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all font-medium text-gray-700"
                dateFormat="MMMM d, h:mm aa"
              />
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          {/* HIERARCHY LEVEL 1 */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">
              <span className="w-5 h-5 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-[10px]">1</span>
              Primary Event Type
            </label>
            <select 
              required
              className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all appearance-none cursor-pointer font-semibold text-gray-700"
              value={formData.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Wedding">💍 Wedding Celebration</option>
              <option value="Table Booking">🍽️ Premium Dining</option>
            </select>
          </div>

          {/* HIERARCHY LEVEL 2 & 3: Conditional Group */}
          {formData.category && (
            <div className="space-y-6 p-6 bg-indigo-50/50 rounded-[2rem] border border-indigo-100/50 animate-in fade-in zoom-in-95 duration-300">
              
              {/* Level 2 Select */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[11px] font-bold text-indigo-600 uppercase tracking-widest px-1">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">2</span>
                  {formData.category === 'Wedding' ? 'Service Required' : 'Dining Zone'}
                </label>
                <select 
                  required
                  className="w-full p-4 bg-white border border-indigo-100 rounded-2xl outline-none shadow-sm font-medium"
                  value={formData.subCategory}
                  onChange={(e) => handleSubCategoryChange(e.target.value)}
                >
                  <option value="">Select Option</option>
                  {formData.category === 'Wedding' ? (
                    <>
                      <option value="Catering">Gourmet Catering</option>
                      <option value="Decor">Visual Decoration</option>
                    </>
                  ) : (
                    <>
                      <option value="Indoor">Climate Controlled Indoor</option>
                      <option value="Outdoor">Open Air / Terrace</option>
                    </>
                  )}
                </select>
              </div>

              {/* Level 3 Select */}
              {formData.subCategory && (
                <div className="space-y-3 animate-in slide-in-from-top-4 duration-500">
                  <label className="flex items-center gap-2 text-[11px] font-bold text-indigo-600 uppercase tracking-widest px-1">
                    <span className="w-5 h-5 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center text-[10px]">3</span>
                    Final Selection
                  </label>
                  <select 
                    required
                    className="w-full p-4 bg-white border border-indigo-200 rounded-2xl outline-none shadow-md font-medium text-indigo-900 ring-2 ring-indigo-100"
                    value={formData.nestedOption}
                    onChange={(e) => setFormData({...formData, nestedOption: e.target.value})}
                  >
                    <option value="">Choose your specific preference...</option>
                    {/* Map choices based on subCategory */}
                    {formData.subCategory === 'Catering' && (
                      <>
                        <option value="Veg-Thali">Traditional Veg Thali</option>
                        <option value="NonVeg-Premium">Premium Non-Veg Buffet</option>
                      </>
                    )}
                    {formData.subCategory === 'Outdoor' && (
                      <>
                        <option value="Sunset-View">Sunset View Table</option>
                        <option value="Poolside">Private Poolside</option>
                      </>
                    )}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Specific Requests</label>
            <textarea 
              rows="3"
              className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
              placeholder="Allergies, wheelchair access, or specific menu items..."
              value={formData.customNotes}
              onChange={(e) => setFormData({...formData, customNotes: e.target.value})}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !formData.nestedOption}
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-[1.5rem] font-bold text-lg flex justify-center items-center gap-3 transition-all shadow-xl shadow-indigo-100 active:scale-[0.98]"
          >
            {isLoading ? <Loader2 className="animate-spin" size={24} /> : (
              <>Confirm My Reservation <ChevronRight size={20} /></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;