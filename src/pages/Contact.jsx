import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, User, Mail, Info, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '', email: '', subject: 'General Inquiry', message: ''
  });

  // High Standard Validation Logic
  const validate = () => {
    let newErrors = {};
    if (formData.name.length < 3) newErrors.name = "Name must be at least 3 characters";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Please enter a valid email";
    if (formData.message.length < 10) newErrors.message = "Message is too short";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    
    try {
      const res = await fetch('https://beach-stall-server-gezy.vercel.app/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        throw new Error('Failed to send');
      }
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-md mx-auto my-20 p-12 bg-white rounded-[3rem] shadow-2xl border border-gray-50 text-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-3">Talk soon!</h2>
        <p className="text-gray-500 leading-relaxed mb-8">We've received your inquiry. Check your inbox for a confirmation email.</p>
        <button 
          onClick={() => { setStatus('idle'); setFormData({name:'', email:'', subject:'General Inquiry', message:''})}}
          className="px-8 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-indigo-600 transition-all"
        >
          New Message
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-16 px-6 grid md:grid-cols-5 gap-12 items-start">
      
      {/* Sidebar Information (Hierarchy) */}
      <div className="md:col-span-2 space-y-8">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Let's start a conversation.</h2>
          <p className="text-gray-500 text-lg leading-relaxed">Ask us anything about our stalls, catering, or event bookings.</p>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white"><Mail size={20}/></div>
            <div>
              <p className="text-[10px] font-black uppercase text-indigo-400">Email Us</p>
              <p className="font-bold text-gray-800">hello@beachstall.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Form Card */}
      <div className="md:col-span-3 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-gray-200/50 border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField 
              label="Name" icon={<User size={18}/>} 
              error={errors.name}
              inputProps={{
                placeholder: "Your name",
                value: formData.name,
                onChange: (e) => setFormData({...formData, name: e.target.value})
              }}
            />
            <InputField 
              label="Email" icon={<Mail size={18}/>} 
              error={errors.email}
              inputProps={{
                type: "email",
                placeholder: "email@domain.com",
                value: formData.email,
                onChange: (e) => setFormData({...formData, email: e.target.value})
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Inquiry Type</label>
            <div className="relative group">
              <Info className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
              <select 
                className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 focus:bg-white outline-none transition-all appearance-none font-medium text-gray-700"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              >
                <option>General Inquiry</option>
                <option>Event Booking</option>
                <option>Career Opportunities</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Message</label>
            <div className="relative group">
              <MessageSquare className="absolute left-4 top-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
              <textarea
                required rows="4"
                placeholder="Tell us more..."
                className={`w-full pl-12 pr-4 py-4 bg-gray-50/50 border ${errors.message ? 'border-red-200 bg-red-50/20' : 'border-gray-100'} rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 focus:bg-white outline-none transition-all resize-none`}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
              {errors.message && <p className="text-red-500 text-[10px] font-bold mt-1 ml-2">{errors.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full group bg-gray-900 hover:bg-indigo-600 text-white py-5 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-gray-200 disabled:opacity-50"
          >
            {status === 'loading' ? 'Processing...' : status === 'error' ? 'Retry Sending' : 'Send Message'}
            <Send size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}

// Sub-component for cleaner code
function InputField({ label, icon, error, inputProps }) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">{label}</label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">{icon}</div>
        <input
          {...inputProps}
          className={`w-full pl-12 pr-4 py-4 bg-gray-50/50 border ${error ? 'border-red-200 bg-red-50/20' : 'border-gray-100'} rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 focus:bg-white outline-none transition-all font-medium`}
        />
        {error && <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-400"><AlertCircle size={16}/></div>}
      </div>
      {error && <p className="text-red-500 text-[10px] font-bold mt-1 ml-2">{error}</p>}
    </div>
  );
}