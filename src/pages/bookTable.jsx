import React, { forwardRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import Swal from 'sweetalert2';
import { 
  Loader2, Phone, ChevronRight, AlertCircle, 
  CalendarDays, Sparkles, Clock, ChevronDown, 
  Users, Waves, Utensils
} from 'lucide-react';

import "react-datepicker/dist/react-datepicker.css";

// 🛡️ Updated Validation Schema (Removed seating)
const bookingSchema = z.object({
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long"),
  eventDate: z.date({ required_error: "Please select arrival time" }),
  guests: z.string().min(1, "Please select number of guests"),
  category: z.enum(['Veg Curry', 'Non-Veg Curry', 'Veg Biryani', 'Non-Veg Biryani', 'Catering'], {
    error_map: () => ({ message: "Please select a menu category" })
  }),
  speciality: z.string().min(1, "Please select your dish"),
  customNotes: z.string().max(500).optional(),
});

const BookingForm = () => {
  const { register, handleSubmit, control, watch, setValue, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: { phone: '', category: '', speciality: '', guests: '2', eventDate: new Date() }
  });

  const watchCategory = watch("category");

  const specialityMap = {
    'Veg Curry': ['Paneer Butter Masala', 'Mushroom Malai', 'Veg Kolhapuri', 'Dal Makhani', 'Kadai Veg', 'Malai Kofta', 'Mix Veg Curry', 'Palak Paneer', 'Aloo Gobi', 'Veg Jalfrezi'],
    'Non-Veg Curry': ['Butter Chicken', 'Mutton Rogan Josh', 'Prawns Masala', 'Fish Curry', 'Chicken Tikka Masala', 'Egg Curry', 'Crab Roast', 'Chicken Chettinad', 'Mutton Korma', 'Hyd Chicken'],
    'Veg Biryani': ['Hyderabadi Veg Biryani', 'Paneer Biryani', 'Mushroom Biryani', 'Jackfruit Biryani', 'Soya Chaap Biryani', 'Kashmiri Pulao', 'Dum Alloo Biryani', 'Tawa Pulao', 'Veg Handi Biryani', 'Zaffrani Biryani'],
    'Non-Veg Biryani': ['Dum Chicken Biryani', 'Mutton Biryani', 'Fish Biryani', 'Prawns Biryani', 'Egg Biryani', 'Spl Boneless Biryani', 'Donne Biryani', 'Ambur Mutton Biryani', 'Kacchi Ghosht Biryani', 'Afghan Chicken Biryani'],
    'Catering': ['Corporate Buffet', 'Wedding Feast', 'Beach Party Pack', 'Birthday Special', 'Family Reunion Combo', 'House Warming Pack', 'Cocktail Snacks', 'Grand Thali Service', 'Outdoor Live Grill', 'Seafood Extravaganza']
  };

  const DateCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button type="button" onClick={onClick} ref={ref} className="w-full flex items-center gap-4 p-5 bg-gray-50 dark:bg-zinc-950 border-2 border-transparent rounded-2xl focus:border-cyan-500 transition-all text-left group">
      <CalendarDays className="text-cyan-600 group-hover:scale-110 transition-transform" size={24} />
      <div className="flex flex-col">
        <span className="text-[10px] uppercase font-black text-gray-400 dark:text-zinc-500">Date & Time</span>
        <span className="font-bold text-lg dark:text-white">{value || "Choose Arrival"}</span>
      </div>
    </button>
  ));

  const onSubmit = async (data) => {
    const token = localStorage.getItem('token');
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post('https://beach-stall-server-gezy.vercel.app/api/bookings', data, config);

      Swal.fire({
        title: '<span style="color: #0891b2">Table Booked!</span>',
        text: `Success! We've reserved a spot for ${data.guests} guests.`,
        icon: 'success',
        confirmButtonColor: '#0891b2',
        background: document.documentElement.classList.contains('dark') ? '#18181b' : '#fff',
        color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
      });
      reset();
    } catch (error) {
       Swal.fire({
         title: 'Error',
         text: error.response?.data?.message || 'Something went wrong.',
         icon: 'error',
         confirmButtonColor: '#0891b2'
       });
    }
  };

  const ErrorMsg = ({ name }) => (
    errors[name] ? (
      <p className="text-red-500 text-[11px] font-bold italic mt-2 flex items-center gap-1">
        <AlertCircle size={12} /> {errors[name].message}
      </p>
    ) : null
  );

  const Label = ({ children, icon: Icon, color = "text-cyan-700 dark:text-cyan-500" }) => (
    <label className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-widest ${color} mb-2 ml-1`}>
      {Icon && <Icon size={14} />} {children}
    </label>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-4 py-12 flex items-center justify-center font-sans text-slate-900 dark:text-slate-100">
      
      <style>{`
        .react-datepicker { border-radius: 2rem; border: none; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3); overflow: hidden; }
        .dark .react-datepicker { background-color: #18181b; color: white; border: 1px solid #27272a; }
        .dark .react-datepicker__header { background-color: #27272a; border-bottom: 1px solid #3f3f46; }
        .dark .react-datepicker__current-month, .dark .react-datepicker__day-name { color: white; }
        .dark .react-datepicker__day { color: #a1a1aa; }
        .dark .react-datepicker__day:hover { background-color: #0891b2; color: white; }
        .react-datepicker__day--selected { background-color: #0891b2 !important; }
        .react-datepicker__portal { backdrop-filter: blur(4px); }
      `}</style>

      <div className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-zinc-800 overflow-hidden">
        
        <div className="bg-cyan-600 p-12 text-white text-center relative">
          <Waves className="absolute bottom-0 left-0 right-0 w-full opacity-10 animate-pulse" />
          <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Book a Table</h2>
          <p className="text-cyan-100 text-sm font-bold uppercase tracking-widest">Seashore Dining & Catering</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 sm:p-12 space-y-8">
          
          {/* 1. Phone */}
          <div className="flex flex-col">
            <Label icon={Phone}>1. Guest Contact</Label>
            <input {...register("phone")} className="w-full p-5 bg-gray-50 dark:bg-zinc-950 rounded-2xl border-none ring-1 ring-inset ring-gray-200 dark:ring-zinc-800 focus:ring-2 focus:ring-cyan-500 font-bold text-lg transition-all outline-none" placeholder="+91 00000 00000" />
            <ErrorMsg name="phone" />
          </div>

          {/* 2. Guests */}
          <div className="flex flex-col">
            <Label icon={Users}>2. Table Size</Label>
            <select {...register("guests")} className="w-full p-5 bg-gray-50 dark:bg-zinc-950 rounded-2xl border-none ring-1 ring-inset ring-gray-200 dark:ring-zinc-800 focus:ring-2 focus:ring-cyan-500 font-bold text-lg appearance-none cursor-pointer outline-none">
              {[1, 2, 3, 4, 5, 6, 8, 10, 15].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
            </select>
            <ErrorMsg name="guests" />
          </div>

          {/* 3. Date & Time */}
          <div className="flex flex-col">
            <Label icon={Clock}>3. Arrival Time</Label>
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
            <ErrorMsg name="eventDate" />
          </div>

          {/* 4. Category */}
          <div className="flex flex-col">
            <Label icon={Utensils}>4. Dining Category</Label>
            <select 
              {...register("category", { onChange: () => setValue("speciality", "") })}
              className="w-full p-5 bg-gray-50 dark:bg-zinc-950 rounded-2xl border-none ring-1 ring-inset ring-gray-200 dark:ring-zinc-800 focus:ring-2 focus:ring-cyan-500 font-bold text-lg appearance-none cursor-pointer outline-none"
            >
              <option value="">Choose Category...</option>
              {Object.keys(specialityMap).map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <ErrorMsg name="category" />
          </div>

          {/* 5. Speciality (Dynamic) */}
          {watchCategory && (
            <div className="flex flex-col animate-in fade-in slide-in-from-top-4 duration-500">
              <Label icon={Sparkles} color="text-emerald-600 dark:text-emerald-400">5. Select Your Speciality</Label>
              <select {...register("speciality")} className="w-full p-5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border-none ring-2 ring-emerald-200 dark:ring-emerald-900 focus:ring-emerald-500 font-bold text-lg appearance-none cursor-pointer outline-none">
                <option value="">Which dish would you like?</option>
                {specialityMap[watchCategory].map(item => <option key={item} value={item}>{item}</option>)}
              </select>
              <ErrorMsg name="speciality" />
            </div>
          )}

          {/* 6. Notes */}
          <div className="flex flex-col">
            <Label>6. Special Requests</Label>
            <textarea {...register("customNotes")} className="w-full p-5 bg-gray-50 dark:bg-zinc-950 rounded-2xl border-none ring-1 ring-inset ring-gray-200 dark:ring-zinc-800 focus:ring-2 focus:ring-cyan-500 font-bold min-h-[120px] outline-none transition-all" placeholder="Allergies, birthday surprises, etc." />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-300 dark:disabled:bg-zinc-800 text-white rounded-[2rem] font-black uppercase tracking-widest text-lg flex justify-center items-center gap-4 shadow-2xl shadow-cyan-500/40 transition-all active:scale-95"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : <>Confirm Reservation <ChevronRight size={24} /></>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;