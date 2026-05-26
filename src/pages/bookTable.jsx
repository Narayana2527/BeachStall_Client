import React, { forwardRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import Swal from 'sweetalert2';
import { 
  Loader2, Phone, ChevronRight, AlertCircle, 
  CalendarDays, Sparkles, Clock, Users, Waves, 
  Utensils, MapPin, PartyPopper
} from 'lucide-react';

import "react-datepicker/dist/react-datepicker.css";

// 🛡️ Enhanced Validation Schema
const bookingSchema = z.object({
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long"),
  eventDate: z.date({ required_error: "Please select arrival time" }),
  guests: z.string().min(1, "Please select number of guests"),
  category: z.enum(['Veg Curry', 'Non-Veg Curry', 'Veg Biryani', 'Non-Veg Biryani', 'Event Catering'], {
    error_map: () => ({ message: "Please select a menu category" })
  }),
  speciality: z.string().min(1, "Please select your dish or package"),
  customNotes: z.string().max(500).optional(),
});

const BookingForm = () => {
  const { register, handleSubmit, control, watch, setValue, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: { phone: '', category: '', speciality: '', guests: '2', eventDate: new Date() }
  });

  const watchCategory = watch("category");
  const watchGuests = watch("guests");

  const specialityMap = {
    'Veg Curry': ['Paneer Butter Masala', 'Mushroom Malai', 'Veg Kolhapuri', 'Dal Makhani', 'Kadai Veg', 'Palak Paneer', 'Aloo Gobi'],
    'Non-Veg Curry': ['Butter Chicken', 'Mutton Rogan Josh', 'Prawns Masala', 'Fish Curry', 'Chicken Tikka Masala', 'Crab Roast'],
    'Veg Biryani': ['Hyderabadi Veg Biryani', 'Paneer Biryani', 'Mushroom Biryani', 'Jackfruit Biryani', 'Zaffrani Biryani'],
    'Non-Veg Biryani': ['Dum Chicken Biryani', 'Mutton Biryani', 'Fish Biryani', 'Prawns Biryani', 'Spl Boneless Biryani'],
    'Event Catering': ['Corporate Buffet', 'Wedding Feast', 'Beach Party Pack', 'Birthday Special', 'Live Grill Experience', 'Seafood Extravaganza']
  };

  const DateCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button type="button" onClick={onClick} ref={ref} className="w-full flex items-center gap-4 p-5 bg-zinc-50 dark:bg-zinc-950 border-2 border-transparent rounded-2xl focus:border-orange-500 transition-all text-left group border border-zinc-200 dark:border-zinc-800">
      <CalendarDays className="text-orange-600 group-hover:scale-110 transition-transform" size={24} />
      <div className="flex flex-col">
        <span className="text-[10px] uppercase font-black text-zinc-400 dark:text-zinc-500">Date & Arrival Time</span>
        <span className="font-bold text-lg dark:text-white">{value || "Choose Slot"}</span>
      </div>
    </button>
  ));

  const onSubmit = async (data) => {
    const token = localStorage.getItem('token');
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post('https://beach-stall-server-gezy.vercel.app/api/bookings', data, config);

      Swal.fire({
        title: '<span style="color: #f97316">Request Confirmed!</span>',
        text: `Success! We've noted your ${data.category} request for ${data.guests} people.`,
        icon: 'success',
        confirmButtonColor: '#f97316',
        background: document.documentElement.classList.contains('dark') ? '#09090b' : '#fff',
        color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
      });
      reset();
    } catch (error) {
       Swal.fire({
         title: 'Booking Error',
         text: error.response?.data?.message || 'Something went wrong. Please check your login status.',
         icon: 'error',
         confirmButtonColor: '#f97316'
       });
    }
  };

  const Label = ({ children, icon: Icon, color = "text-zinc-700 dark:text-zinc-400" }) => (
    <label className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-widest ${color} mb-3 ml-1`}>
      {Icon && <Icon size={14} className="text-orange-500" />} {children}
    </label>
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 py-16 flex items-center justify-center font-sans">
      
      <style>{`
        .react-datepicker { border-radius: 2rem; border: none; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); overflow: hidden; font-family: inherit; }
        .dark .react-datepicker { background-color: #18181b; color: white; border: 1px solid #27272a; }
        .dark .react-datepicker__header { background-color: #27272a; border-bottom: 1px solid #3f3f46; }
        .dark .react-datepicker__day { color: #a1a1aa; }
        .dark .react-datepicker__day:hover { background-color: #f97316; color: white; }
        .react-datepicker__day--selected { background-color: #f97316 !important; }
      `}</style>

      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-[3.5rem] shadow-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-zinc-900 p-12 text-center relative overflow-hidden">
          <Waves className="absolute -bottom-4 left-0 right-0 w-full opacity-20 text-orange-500 animate-pulse" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full mb-4">
              <MapPin size={12} className="text-orange-500" />
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Ramapuram Beach, Chirala</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2">Secure Your <span className="text-orange-500">Spot</span></h2>
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-[0.3em]">Table Booking & Event Inquiries</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-14 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 1. Phone */}
            <div className="flex flex-col">
              <Label icon={Phone}>Guest Contact</Label>
              <input {...register("phone")} className="w-full p-5 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border-none ring-1 ring-zinc-200 dark:ring-zinc-800 focus:ring-2 focus:ring-orange-500 font-bold text-lg transition-all outline-none dark:text-white" placeholder="Phone Number" />
              {errors.phone && <p className="text-red-500 text-[10px] font-bold mt-2 ml-2 tracking-tight">{errors.phone.message}</p>}
            </div>

            {/* 2. Guests */}
            <div className="flex flex-col">
              <Label icon={Users}>Group Size</Label>
              <div className="relative">
                <select {...register("guests")} className="w-full p-5 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border-none ring-1 ring-zinc-200 dark:ring-zinc-800 focus:ring-2 focus:ring-orange-500 font-bold text-lg appearance-none cursor-pointer outline-none dark:text-white">
                  {[2, 4, 6, 10, 20, 50, 100, 200].map(n => <option key={n} value={n}>{n === 200 ? '200+ People' : `${n} Guests`}</option>)}
                </select>
                <PartyPopper size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* 3. Date & Time */}
          <div className="flex flex-col">
            <Label icon={Clock}>Reservation Slot</Label>
            <Controller control={control} name="eventDate" render={({ field }) => (
              <DatePicker 
                selected={field.value} 
                onChange={(date) => field.onChange(date)} 
                showTimeSelect 
                dateFormat="MMMM d, h:mm aa" 
                customInput={<DateCustomInput />}
                withPortal={window.innerWidth < 768}
              />
            )} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 4. Category */}
            <div className="flex flex-col">
              <Label icon={Utensils}>Menu Preference</Label>
              <select 
                {...register("category", { onChange: () => setValue("speciality", "") })}
                className="w-full p-5 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border-none ring-1 ring-zinc-200 dark:ring-zinc-800 focus:ring-2 focus:ring-orange-500 font-bold text-lg appearance-none cursor-pointer outline-none dark:text-white"
              >
                <option value="">Choose Service...</option>
                {Object.keys(specialityMap).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              {errors.category && <p className="text-red-500 text-[10px] font-bold mt-2 ml-2">{errors.category.message}</p>}
            </div>

            {/* 5. Speciality (Dynamic) */}
            <div className={`flex flex-col transition-all duration-500 ${!watchCategory ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
              <Label icon={Sparkles}>Specific Dish / Pack</Label>
              <select {...register("speciality")} className="w-full p-5 bg-orange-50/50 dark:bg-orange-500/5 rounded-2xl border-none ring-1 ring-orange-200 dark:ring-orange-500/20 focus:ring-2 focus:ring-orange-500 font-bold text-lg appearance-none cursor-pointer outline-none dark:text-white">
                <option value="">Select Option</option>
                {watchCategory && specialityMap[watchCategory].map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
          </div>

          {/* 6. Notes */}
          <div className="flex flex-col">
            <Label>Any Special Arrangements?</Label>
            <textarea {...register("customNotes")} className="w-full p-6 bg-zinc-50 dark:bg-zinc-950 rounded-3xl border-none ring-1 ring-zinc-200 dark:ring-zinc-800 focus:ring-2 focus:ring-orange-500 font-medium min-h-[140px] outline-none transition-all dark:text-white" placeholder="Birthday decor, sea-view preference, or specific dietary needs..." />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-7 bg-zinc-900 dark:bg-orange-600 hover:bg-orange-500 disabled:bg-zinc-300 text-white rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] flex justify-center items-center gap-4 shadow-xl transition-all active:scale-95 shadow-orange-500/10"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : <>Finalize Booking <ChevronRight size={18} /></>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;