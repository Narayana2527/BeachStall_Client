import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Loader2, Phone, ChevronRight, ClipboardCheck, AlertCircle } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";

// 1. Define Validation Schema with Zod
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
  // 2. Initialize React Hook Form
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

  // Watch fields to reset dependent fields
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
      Swal.fire({ title: 'Reserved!', text: 'Your booking is successful.', icon: 'success' });
    } catch (error) {
      Swal.fire({ title: 'Error', text: error.response?.data?.message || 'Something went wrong.', icon: 'error' });
    }
  };

  // Helper component for Error Messages
  const ErrorMsg = ({ name }) => (
    errors[name] ? (
      <p className="text-red-500 text-[10px] font-bold mt-1 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
        <AlertCircle size={10} /> {errors[name].message}
      </p>
    ) : null
  );

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
        
        <div className="bg-indigo-600 p-8 text-white relative">
          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-black tracking-tight">VIP Reservation</h2>
            <p className="text-indigo-100 mt-1 font-medium text-sm">Validating your preferences in real-time.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone Input */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Contact Phone</label>
              <div className="relative">
                <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.phone ? 'text-red-400' : 'text-gray-400'}`} size={18} />
                <input
                  {...register("phone")}
                  className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-2xl outline-none transition-all font-medium ${errors.phone ? 'border-red-100 focus:border-red-500' : 'border-transparent focus:border-indigo-500 focus:bg-white'}`}
                  placeholder="0123456789"
                />
              </div>
              <ErrorMsg name="phone" />
            </div>

            {/* Date Picker */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Event Timing</label>
              <Controller
                control={control}
                name="eventDate"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    showTimeSelect
                    className="w-full p-3.5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all font-medium"
                    dateFormat="Pp"
                  />
                )}
              />
              <ErrorMsg name="eventDate" />
            </div>
          </div>

          <hr className="opacity-50" />

          {/* Level 1: Category */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">1. Select Category</label>
            <select 
              {...register("category", { onChange: () => { setValue("subCategory", ""); setValue("nestedOption", ""); } })}
              className={`w-full p-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all font-semibold ${errors.category ? 'border-red-100' : 'border-transparent focus:border-indigo-500'}`}
            >
              <option value="">Select Option</option>
              <option value="Wedding">💍 Wedding Celebration</option>
              <option value="Table Booking">🍽️ Premium Dining</option>
            </select>
            <ErrorMsg name="category" />
          </div>

          {/* Level 2: Sub-Category */}
          {watchCategory && (
            <div className="space-y-2 animate-in fade-in slide-in-from-left-4">
              <label className="text-[11px] font-bold text-indigo-500 uppercase tracking-widest px-1">2. Service Type</label>
              <select 
                {...register("subCategory", { onChange: () => setValue("nestedOption", "") })}
                className="w-full p-4 bg-indigo-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 font-semibold"
              >
                <option value="">Select Service</option>
                {watchCategory === 'Wedding' ? (
                  <>
                    <option value="Catering">Gourmet Catering</option>
                    <option value="Decor">Thematic Decoration</option>
                  </>
                ) : (
                  <>
                    <option value="Indoor">Indoor Hall</option>
                    <option value="Outdoor">Terrace/Poolside</option>
                  </>
                )}
              </select>
              <ErrorMsg name="subCategory" />
            </div>
          )}

          {/* Level 3: Nested Options */}
          {watchSubCategory && (
            <div className="space-y-2 animate-in fade-in slide-in-from-left-6">
              <label className="text-[11px] font-bold text-emerald-500 uppercase tracking-widest px-1">3. Specific Preference</label>
              <select 
                {...register("nestedOption")}
                className="w-full p-4 bg-emerald-50 border-2 border-transparent rounded-2xl outline-none focus:border-emerald-500 font-semibold"
              >
                <option value="">Choose specific preference...</option>
                {watchSubCategory === 'Catering' && (
                  <>
                    <option value="Veg-Thali">Veg Thali</option>
                    <option value="Non-Veg">Premium Non-Veg</option>
                  </>
                )}
                {watchSubCategory === 'Outdoor' && (
                  <>
                    <option value="Sea-Facing">Sea Facing</option>
                    <option value="Garden">Garden Side</option>
                  </>
                )}
              </select>
              <ErrorMsg name="nestedOption" />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Special Notes</label>
            <textarea 
              {...register("customNotes")}
              className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all text-sm font-medium"
              placeholder="Any specific requests?"
              rows="2"
            />
            <ErrorMsg name="customNotes" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 text-white rounded-[1.5rem] font-bold text-lg flex justify-center items-center gap-3 transition-all shadow-xl shadow-indigo-100"
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : (
              <>Complete Booking <ChevronRight size={20} /></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;