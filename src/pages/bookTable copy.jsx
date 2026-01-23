import React, { forwardRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import Swal from 'sweetalert2';
import { 
  Loader2, 
  Phone, 
  ChevronRight, 
  AlertCircle, 
  CalendarDays, 
  Sparkles, 
  Clock,
  ChevronDown
} from 'lucide-react';

import "react-datepicker/dist/react-datepicker.css";

// 🛡️ Validation Schema
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
    reset,
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

  // 🎨 Custom Input for DatePicker to maintain Hierarchy & UI consistency
  const DateCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      type="button"
      onClick={onClick}
      ref={ref}
      className="w-full flex items-center gap-4 p-4 sm:p-5 bg-gray-50 dark:bg-zinc-950 border-2 border-transparent rounded-xl sm:rounded-[1.5rem] outline-none focus:border-indigo-500 transition-all font-bold text-sm sm:text-base dark:text-white text-left group"
    >
      <CalendarDays className="text-gray-400 group-hover:text-indigo-500 transition-colors" size={20} />
      <div className="flex flex-col flex-1">
        <span className="text-[9px] uppercase tracking-widest text-gray-400 dark:text-zinc-500 mb-0.5">Selected Schedule</span>
        <span className="truncate">{value || "Choose Date & Time"}</span>
      </div>
      <Clock className="text-gray-300 dark:text-zinc-800" size={18} />
    </button>
  ));

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
      
      reset();
      Swal.fire({
        title: 'Reserved!',
        text: 'Your booking is successful. We look forward to seeing you!',
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
      <p className="text-red-500 text-[10px] font-black uppercase tracking-tighter mt-2 flex items-center gap-1 px-1">
        <AlertCircle size={10} strokeWidth={3} /> {errors[name].message}
      </p>
    ) : null
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center p-4 sm:p-8 transition-colors duration-300">
      
      <style>{`
        /* 🔵 Global DatePicker Overrides */
        .react-datepicker { 
          font-family: inherit; 
          background-color: #ffffff; 
          border: 1px solid #e5e7eb; 
          border-radius: 1.5rem; 
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          overflow: hidden;
        }
        .dark .react-datepicker { background-color: #18181b; border-color: #27272a; }
        
        .react-datepicker__header { background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; padding: 1rem 0; }
        .dark .react-datepicker__header { background-color: #27272a; border-bottom-color: #3f3f46; }
        
        .dark .react-datepicker__current-month, .dark .react-datepicker__day-name, .dark .react-datepicker-time__header { color: #fff; }
        .dark .react-datepicker__day { color: #a1a1aa; }
        .dark .react-datepicker__day:hover { background-color: #4f46e5; color: #fff; border-radius: 0.5rem; }
        .react-datepicker__day--selected { background-color: #4f46e5 !important; border-radius: 0.5rem !important; color: #fff !important; }
        
        /* Time Section */
        .react-datepicker__time-container { border-left: 1px solid #e5e7eb; width: 100px !important; }
        .dark .react-datepicker__time-container { border-left-color: #3f3f46; background-color: #18181b; }
        .dark .react-datepicker__time-list-item { color: #a1a1aa; background-color: transparent !important; }
        .dark .react-datepicker__time-list-item:hover { background-color: #4f46e5 !important; color: #fff !important; }
        
        /* Mobile Portal UX */
        .react-datepicker__portal { background-color: rgba(0, 0, 0, 0.8); backdrop-filter: blur(8px); }
      `}</style>

      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden">
        
        {/* Header */}
        <div className="bg-indigo-600 p-8 sm:p-12 text-white relative">
          <div className="absolute top-0 right-0 p-8 opacity-10 animate-pulse">
            <Sparkles size={80} />
          </div>
          <div className="relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-200">Reservation Desk</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tighter mt-2 uppercase italic">Book Your Table</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-10 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest px-1">1. Guest Contact</label>
              <div className="relative group">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                <input
                  {...register("phone")}
                  className="w-full pl-14 pr-4 py-4 sm:py-5 bg-gray-50 dark:bg-zinc-950 border-2 border-transparent rounded-xl sm:rounded-2xl outline-none focus:bg-white dark:focus:bg-zinc-950 focus:border-indigo-500 transition-all font-bold text-sm sm:text-base dark:text-white"
                  placeholder="+91 00000 00000"
                />
              </div>
              <ErrorMsg name="phone" />
            </div>

            {/* Responsive DatePicker */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest px-1">2. Event Timing</label>
              <Controller
                control={control}
                name="eventDate"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    showTimeSelect
                    minDate={new Date()}
                    dateFormat="MMMM d, h:mm aa"
                    withPortal={window.innerWidth < 768} // Centered modal on mobile
                    customInput={<DateCustomInput />}
                  />
                )}
              />
              <ErrorMsg name="eventDate" />
            </div>
          </div>

          <hr className="border-gray-100 dark:border-zinc-800" />

          {/* Selections */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-indigo-500 uppercase tracking-widest px-1">3. Category</label>
              <div className="relative">
                <select 
                  {...register("category", { onChange: () => { setValue("subCategory", ""); setValue("nestedOption", ""); }})}
                  className="w-full appearance-none p-4 sm:p-5 bg-gray-50 dark:bg-zinc-950 border-2 border-transparent rounded-xl sm:rounded-[1.5rem] outline-none focus:border-indigo-500 transition-all font-black uppercase text-xs tracking-widest dark:text-white cursor-pointer"
                >
                  <option value="">Select Option</option>
                  <option value="Wedding">Wedding Celebration</option>
                  <option value="Table Booking">Premium Dining</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
              <ErrorMsg name="category" />
            </div>

            {watchCategory && (
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest px-1">4. Service Type</label>
                <select 
                  {...register("subCategory", { onChange: () => setValue("nestedOption", "") })}
                  className="w-full p-4 sm:p-5 bg-emerald-50/30 dark:bg-emerald-500/5 border-2 border-transparent rounded-xl sm:rounded-[1.5rem] outline-none focus:border-emerald-500 font-bold text-sm dark:text-zinc-100 cursor-pointer"
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

            {watchSubCategory && (
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <label className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest px-1">5. Specific Choice</label>
                <select 
                  {...register("nestedOption")}
                  className="w-full p-4 sm:p-5 bg-gray-50 dark:bg-zinc-950 border-2 border-transparent rounded-xl sm:rounded-[1.5rem] outline-none focus:border-indigo-500 font-bold text-sm dark:text-zinc-100 cursor-pointer"
                >
                  <option value="">Choose preference...</option>
                  {watchSubCategory === 'Catering' && <><option value="Veg-Thali">Veg Thali</option><option value="Non-Veg">Premium Non-Veg</option></>}
                  {watchSubCategory === 'Decor' && <><option value="Floral">Floral Theme</option><option value="Minimalist">Modern Minimalist</option></>}
                  {watchSubCategory === 'Indoor' && <><option value="AC-Lounge">AC Lounge</option><option value="Main-Hall">Main Grand Hall</option></>}
                  {watchSubCategory === 'Outdoor' && <><option value="Sea-Facing">Sea Facing</option><option value="Garden">Garden Side</option></>}
                </select>
                <ErrorMsg name="nestedOption" />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest px-1">Additional Requests</label>
            <textarea 
              {...register("customNotes")}
              className="w-full p-5 bg-gray-50 dark:bg-zinc-950 border-2 border-transparent rounded-[2rem] focus:bg-white dark:focus:bg-zinc-950 focus:border-indigo-500 outline-none transition-all text-sm font-bold dark:text-white min-h-[120px]"
              placeholder="Any specific requests?"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 dark:disabled:bg-zinc-800 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs flex justify-center items-center gap-3 transition-all active:scale-95 shadow-xl shadow-indigo-500/20"
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : (
              <>Confirm Booking <ChevronRight size={18} strokeWidth={3} /></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;

{/* 6. Seating - Full Width
          <div className="flex flex-col">
            <Label icon={MapPin}>6. Seating Preference</Label>
            <select {...register("seating")} className="w-full p-5 bg-gray-50 dark:bg-zinc-950 rounded-2xl border-none ring-1 ring-inset ring-gray-200 dark:ring-zinc-800 focus:ring-2 focus:ring-cyan-500 font-bold text-lg appearance-none">
              <option value="">Select a Zone...</option>
              <option value="Sea Facing">Shore-Side (Waves View)</option>
              <option value="Open Terrace">Open Air Deck</option>
              <option value="Indoor AC">Indoor Comfort (AC)</option>
            </select>
          </div> */}