import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Loader2, Phone, ChevronRight, AlertCircle, CalendarDays, Sparkles } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";

const bookingSchema = z.object({
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .regex(/^[0-9+]+$/, "Invalid phone format"),
  eventDate: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a valid date!",
  }),
  category: z.enum(['Wedding', 'Table Booking'], {
    error_map: () => ({ message: "Please select an event type" })
  }),
  subCategory: z.string().min(1, "Please select a service/zone"),
  nestedOption: z.string().min(1, "Please select a specific choice"),
  customNotes: z.string().max(500, "Notes cannot exceed 500 characters").optional(),
});

const BookingForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      phone: '',
      category: '',
      subCategory: '',
      nestedOption: '',
      customNotes: '',
      eventDate: new Date()
    }
  });

  const watchCategory = watch("category");
  const watchSubCategory = watch("subCategory");

  const onSubmit = async (data) => {
    const token = localStorage.getItem('token');
    const bookingData = {
      phone: data.phone,
      category: data.category,
      eventDate: data.eventDate.toISOString(),
      details: {
        subCategory: data.subCategory,
        nestedOption: data.nestedOption,
        customNotes: data.customNotes
      }
    };

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post('https://beach-stall-server-gezy.vercel.app/api/bookings', bookingData, config);
      
      Swal.fire({
        title: 'Reserved!',
        text: 'Your booking is successful.',
        icon: 'success',
        background: document.documentElement.classList.contains('dark') ? '#18181b' : '#fff',
        color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
        confirmButtonColor: '#4f46e5'
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || 'Something went wrong.',
        icon: 'error',
        background: document.documentElement.classList.contains('dark') ? '#18181b' : '#fff',
        color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
      });
    }
  };

  const ErrorMsg = ({ name }) => (
    errors[name] ? (
      <p className="text-red-500 text-[10px] font-black uppercase tracking-tighter mt-1.5 flex items-center gap-1 px-1">
        <AlertCircle size={10} strokeWidth={3} /> {errors[name].message}
      </p>
    ) : null
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center p-3 sm:p-6 lg:p-8 transition-colors duration-300">
      {/* DatePicker Dark Mode Overrides */}
      <style>{`
        .react-datepicker { background-color: #18181b; border: 1px solid #27272a; border-radius: 1.5rem; }
        .dark .react-datepicker__header { background-color: #27272a; border-bottom: 1px solid #3f3f46; }
        .dark .react-datepicker__day-name, .dark .react-datepicker__day { color: #f4f4f5; }
        .dark .react-datepicker__day:hover { background-color: #4f46e5; }
        .dark .react-datepicker__time-container { border-left: 1px solid #3f3f46; background-color: #18181b; }
        .dark .react-datepicker__time-list-item:hover { background-color: #4f46e5 !important; }
        @media (max-width: 640px) {
           .react-datepicker__time-container { width: 70px; }
           .react-datepicker { display: flex; flex-direction: column; }
        }
      `}</style>

      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-[2rem] sm:rounded-[3rem] shadow-xl dark:shadow-none overflow-hidden border border-gray-100 dark:border-zinc-800">
        
        {/* 🏆 Header Section - Responsive heights */}
        <div className="bg-[#c2dcc7d9] dark:bg-indigo-500 p-6 sm:p-10 text-white relative overflow-hidden">
          <div className="absolute -top-4 -right-4 opacity-10">
              <Sparkles size={100} className="sm:w-[150px] sm:h-[150px]" />
          </div>
          <div className="relative z-10 text-center">
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-indigo-200">Exclusive Experience</span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tighter mt-1 uppercase">Book Table</h2>
            <div className="h-1 w-10 sm:w-12 bg-white/30 mx-auto mt-3 sm:mt-4 rounded-full"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5 sm:p-8 lg:p-12 space-y-5 sm:space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Phone Input */}
            <div className="space-y-1.5">
              <label className="text-[9px] sm:text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest px-1">Contact Phone</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
                <input
                  {...register("phone")}
                  className="w-full pl-11 pr-4 py-3.5 sm:py-4 bg-gray-50 dark:bg-zinc-950 border-2 border-transparent rounded-xl sm:rounded-2xl outline-none focus:bg-white dark:focus:bg-zinc-950 focus:border-indigo-500 transition-all font-bold text-sm sm:text-base dark:text-white"
                  placeholder="+91 00000 00000"
                />
              </div>
              <ErrorMsg name="phone" />
            </div>

            {/* Date Picker */}
            <div className="space-y-1.5">
              <label className="text-[9px] sm:text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest px-1">Event Timing</label>
              <div className="relative group">
                <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none group-focus-within:text-indigo-500 transition-colors" size={16} />
                <Controller
                  control={control}
                  name="eventDate"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      showTimeSelect
                      popperPlacement="bottom-end"
                      className="w-full pl-11 pr-4 py-3.5 sm:py-4 bg-gray-50 dark:bg-zinc-950 border-2 border-transparent rounded-xl sm:rounded-2xl outline-none focus:bg-white dark:focus:bg-zinc-950 focus:border-indigo-500 transition-all font-bold text-sm sm:text-base dark:text-white"
                      dateFormat="MMMM d, h:mm aa"
                    />
                  )}
                />
              </div>
              <ErrorMsg name="eventDate" />
            </div>
          </div>

          <div className="h-[1px] bg-gray-100 dark:bg-zinc-800 w-full" />

          {/* 🔘 Selection Hierarchy */}
          <div className="space-y-4 sm:space-y-6">
            {/* Category */}
            <div className="space-y-2">
              <label className="text-[9px] sm:text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest px-1">1. Choose Category</label>
              <select 
                {...register("category", { onChange: () => { setValue("subCategory", ""); setValue("nestedOption", ""); } })}
                className="w-full p-4 sm:p-5 bg-gray-50 dark:bg-zinc-950 border-2 border-transparent rounded-xl sm:rounded-[1.5rem] outline-none focus:border-indigo-500 transition-all font-black uppercase text-[10px] sm:text-xs tracking-widest dark:text-white cursor-pointer"
              >
                <option value="">Select Option</option>
                <option value="Wedding">💍 Wedding Celebration</option>
                <option value="Table Booking">🍽️ Premium Dining</option>
              </select>
              <ErrorMsg name="category" />
            </div>

            {/* Sub-Category */}
            {watchCategory && (
              <div className="space-y-2 animate-in fade-in slide-in-from-left-4">
                <label className="text-[9px] sm:text-[10px] font-black text-indigo-500 uppercase tracking-widest px-1">2. Service Type</label>
                <select 
                  {...register("subCategory", { onChange: () => setValue("nestedOption", "") })}
                  className="w-full p-4 sm:p-5 bg-indigo-50/50 dark:bg-indigo-500/5 border-2 border-transparent rounded-xl sm:rounded-[1.5rem] outline-none focus:border-indigo-500 font-bold text-sm sm:text-base dark:text-zinc-100 cursor-pointer"
                >
                  <option value="">Select Service</option>
                  {watchCategory === 'Wedding' ? (
                    <><option value="Catering">Gourmet Catering</option><option value="Decor">Thematic Decoration</option></>
                  ) : (
                    <><option value="Indoor">Indoor Hall</option><option value="Outdoor">Terrace/Poolside</option></>
                  )}
                </select>
                <ErrorMsg name="subCategory" />
              </div>
            )}

            {/* Nested Options */}
            {watchSubCategory && (
              <div className="space-y-2 animate-in fade-in slide-in-from-left-6">
                <label className="text-[9px] sm:text-[10px] font-black text-emerald-500 dark:text-emerald-400 uppercase tracking-widest px-1">3. Specific Preference</label>
                <select 
                  {...register("nestedOption")}
                  className="w-full p-4 sm:p-5 bg-emerald-50/50 dark:bg-emerald-500/5 border-2 border-transparent rounded-xl sm:rounded-[1.5rem] outline-none focus:border-emerald-500 font-bold text-sm sm:text-base dark:text-zinc-100 cursor-pointer"
                >
                  <option value="">Choose specific preference...</option>
                  {watchSubCategory === 'Catering' && (
                    <><option value="Veg-Thali">Veg Thali</option><option value="Non-Veg">Premium Non-Veg</option></>
                  )}
                  {watchSubCategory === 'Outdoor' && (
                    <><option value="Sea-Facing">Sea Facing</option><option value="Garden">Garden Side</option></>
                  )}
                </select>
                <ErrorMsg name="nestedOption" />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[9px] sm:text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest px-1">Special Notes</label>
            <textarea 
              {...register("customNotes")}
              className="w-full p-4 sm:p-5 bg-gray-50 dark:bg-zinc-950 border-2 border-transparent rounded-xl sm:rounded-[2rem] focus:bg-white dark:focus:bg-zinc-950 focus:border-indigo-500 outline-none transition-all text-sm font-bold dark:text-white"
              placeholder="Any specific requests?"
              rows="3"
            />
            <ErrorMsg name="customNotes" />
          </div>

          {/* 🚀 Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 sm:py-6 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 disabled:bg-gray-200 dark:disabled:bg-zinc-800 text-white rounded-2xl sm:rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs flex justify-center items-center gap-3 transition-all active:scale-95"
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : (
              <>Confirm Reservation <ChevronRight size={18} strokeWidth={3} /></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;