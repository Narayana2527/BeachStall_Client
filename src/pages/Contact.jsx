import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, User, Mail, Info, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '', email: '', subject: 'General Inquiry', message: ''
  });

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

  // ✅ SUCCESS STATE (Themed)
  if (status === 'success') {
    return (
      <div className="max-w-md mx-auto my-20 p-12 bg-white dark:bg-zinc-900 rounded-[3.5rem] shadow-2xl dark:shadow-none border border-gray-50 dark:border-zinc-800 text-center animate-in zoom-in duration-500 transition-colors">
        <div className="w-24 h-24 bg-green-50 dark:bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-3 uppercase tracking-tighter">Talk soon!</h2>
        <p className="text-gray-500 dark:text-zinc-400 leading-relaxed mb-8">We've received your inquiry. Check your inbox for a confirmation email.</p>
        <button 
          onClick={() => { setStatus('idle'); setFormData({name:'', email:'', subject:'General Inquiry', message:''})}}
          className="px-10 py-4 bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all"
        >
          New Message
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-16 px-6 grid lg:grid-cols-5 gap-16 items-start transition-colors">
      
      {/* 🏛️ Sidebar Information (Hierarchy) */}
      <div className="lg:col-span-2 space-y-10">
        <div className="space-y-4">
          <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-[10px]">Contact Us</span>
          <h2 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter leading-[0.9]">
            Let's start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-indigo-600">conversation.</span>
          </h2>
          <p className="text-gray-500 dark:text-zinc-400 text-lg leading-relaxed max-w-sm">
            Ask us anything about our stalls, catering, or event bookings.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-5 p-6 bg-white dark:bg-zinc-900/50 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-sm">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none">
              <Mail size={22}/>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-0.5">Email Us</p>
              <p className="font-black text-gray-900 dark:text-zinc-100 italic">nd.beachstall@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* 📝 Modern Form Card (Themed) */}
      <div className="lg:col-span-3 bg-white dark:bg-zinc-900 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-zinc-800 transition-colors">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500 ml-1">Inquiry Type</label>
            <div className="relative group">
              <Info className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
              <select 
                className="w-full pl-14 pr-6 py-5 bg-gray-50/50 dark:bg-zinc-950/50 border border-gray-100 dark:border-zinc-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 focus:bg-white dark:focus:bg-zinc-950 outline-none transition-all appearance-none font-bold text-gray-700 dark:text-zinc-300"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              >
                <option>General Inquiry</option>
                <option>Event Booking</option>
                <option>Career Opportunities</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500 ml-1">Your Message</label>
            <div className="relative group">
              <MessageSquare className="absolute left-5 top-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
              <textarea
                required rows="5"
                placeholder="Tell us more..."
                className={`w-full pl-14 pr-6 py-5 bg-gray-50/50 dark:bg-zinc-950/50 border ${errors.message ? 'border-red-400' : 'border-gray-100 dark:border-zinc-800'} rounded-3xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 focus:bg-white dark:focus:bg-zinc-950 outline-none transition-all resize-none text-gray-900 dark:text-white`}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
              {errors.message && <p className="text-red-500 text-[10px] font-bold mt-2 ml-2">{errors.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full group bg-gray-900 dark:bg-zinc-100 hover:bg-indigo-600 dark:hover:bg-indigo-500 text-white dark:text-zinc-900 hover:text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-gray-200 dark:shadow-none disabled:opacity-50"
          >
            {status === 'loading' ? 'Processing...' : status === 'error' ? 'Retry Sending' : 'Send Message'}
            <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}

function InputField({ label, icon, error, inputProps }) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500 ml-1">{label}</label>
      <div className="relative group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">{icon}</div>
        <input
          {...inputProps}
          className={`w-full pl-14 pr-6 py-5 bg-gray-50/50 dark:bg-zinc-950/50 border ${error ? 'border-red-400' : 'border-gray-100 dark:border-zinc-800'} rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 focus:bg-white dark:focus:bg-zinc-950 outline-none transition-all font-bold text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-600`}
        />
        {error && <div className="absolute right-5 top-1/2 -translate-y-1/2 text-red-500"><AlertCircle size={18}/></div>}
      </div>
      {error && <p className="text-red-500 text-[10px] font-bold mt-1 ml-2 tracking-tight">{error}</p>}
    </div>
  );
}