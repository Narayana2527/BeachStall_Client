import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Calendar, Loader2, ClipboardCheck } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventType, setEventType] = useState('Wedding');
  const [isLoading, setIsLoading] = useState(false);

  // Form Reset Logic
  const resetForm = () => {
    setSelectedDate(new Date());
    setEventType('Wedding');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem('token');
    const bookingData = {
      eventDate: selectedDate.toISOString(),
      category: eventType,
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post('http://localhost:5000/api/bookings', bookingData,config);
      
      // Success Alert
      Swal.fire({
        title: 'Booking Confirmed!',
        text: 'Your event has been successfully scheduled.',
        icon: 'success',
        confirmButtonColor: '#4f46e5',
      });

      resetForm();
    } catch (error) {
      console.error("Submission Error:", error);
      
      // Error Alert
      Swal.fire({
        title: 'Oops...',
        text: error.response?.data?.message || 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonColor: '#ef4444',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col justify-center py-12 px-6 lg:px-8">
      
      {/* 1. Header Hierarchy */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <ClipboardCheck className="h-8 w-8 text-indigo-600" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Event Reservation
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Fill in the details below to secure your slot.
        </p>
      </div>

      {/* 2. Form Container */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-8 shadow-2xl rounded-2xl border border-gray-100 ring-1 ring-black ring-opacity-5">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Date Selection Group */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                Pick a Date & Time
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Calendar className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  minDate={new Date()}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all outline-none"
                  wrapperClassName="w-full"
                />
              </div>
            </div>

            {/* Event Category Group */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                Category of Event
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="block w-full border border-gray-200 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-xl bg-gray-50 transition-all appearance-none cursor-pointer"
              >
                <option value="Wedding">💍 Wedding</option>
                <option value="Photography">📸 Photography</option>
                <option value="Table Booking">🍽️ Table Booking</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all active:scale-95 ${
                  isLoading ? 'opacity-75 cursor-wait' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Validating...
                  </>
                ) : (
                  'Confirm My Booking'
                )}
              </button>
            </div>
          </form>
          
          <p className="mt-6 text-center text-xs text-gray-400">
            By booking, you agree to our Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;