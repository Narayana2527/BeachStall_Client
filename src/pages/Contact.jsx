import React, { useState } from 'react';
import { 
  Send, CheckCircle2, MessageSquare, User, Mail, 
  Info, AlertCircle, Phone, MapPin, Briefcase, Sparkles, ChevronDown 
} from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: 'Event Booking', message: ''
  });

  const validate = () => {
    let newErrors = {};
    if (formData.name.length < 3) newErrors.name = "Name must be 3+ chars";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Enter 10 digits";
    if (formData.message.length < 10) newErrors.message = "Provide more details";
    
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
      <div className="px-6 py-20">
        <div className="max-w-md mx-auto p-8 md:p-12 bg-white dark:bg-zinc-900 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl border border-orange-100 dark:border-orange-500/20 text-center animate-in zoom-in duration-500">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-orange-50 dark:bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-orange-500" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white mb-3 uppercase tracking-tighter">Request Received!</h2>
          <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 px-2">Our Chirala event team will contact you within 24 hours to discuss the details.</p>
          <button 
            onClick={() => { setStatus('idle'); setFormData({name:'', email:'', phone:'', subject:'Event Booking', message:''})}}
            className="w-full md:w-auto px-10 py-4 bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 dark:shadow-none"
          >
            Send Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-8 md:my-16 px-4 md:px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start overflow-hidden">
      
      {/* 🏝️ Left Side: Brand Authority */}
      <div className="lg:col-span-5 space-y-8 md:space-y-12 text-center lg:text-left">
        <div className="space-y-4 md:space-y-6">
          <div className="flex justify-center lg:justify-start">
            <span className="px-4 py-1.5 bg-orange-500/10 text-orange-600 rounded-full font-black uppercase tracking-[0.2em] text-[10px] border border-orange-200 dark:border-orange-500/20">
              Get in Touch
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white tracking-tighter leading-[1] md:leading-[0.9] uppercase">
            Let's build <br/><span className="text-orange-500 italic font-serif lowercase">Memories</span> in Chirala.
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0 px-2 md:px-0">
            Whether it's a beach wedding at Ramapuram or a resort dealership inquiry, we're ready to scale your vision.
          </p>
        </div>
        
        <div className="grid gap-4 max-w-sm mx-auto lg:mx-0">
          <ContactDetail 
            icon={<Briefcase size={20}/>} 
            label="Business Inquiries" 
            value="nd.beachstall@gmail.com" 
            color="bg-zinc-900"
          />
          <ContactDetail 
            icon={<MapPin size={20}/>} 
            label="Location" 
            value="Ramapuram Beach, Chirala, AP" 
            color="bg-orange-500"
          />
        </div>
      </div>

      {/* 📝 Right Side: Professional Lead Form */}
      <div className="lg:col-span-7 bg-white dark:bg-zinc-900 rounded-[2.5rem] md:rounded-[3.5rem] p-6 sm:p-10 md:p-14 shadow-2xl shadow-zinc-200/50 dark:shadow-none border border-zinc-50 dark:border-zinc-800/50 transition-all">
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <InputField 
              label="Full Name" icon={<User size={18}/>} 
              error={errors.name}
              inputProps={{
                placeholder: "Alex Johnson",
                value: formData.name,
                onChange: (e) => setFormData({...formData, name: e.target.value})
              }}
            />
            <InputField 
              label="Phone Number" icon={<Phone size={18}/>} 
              error={errors.phone}
              inputProps={{
                type: "tel",
                placeholder: "9876543210",
                value: formData.phone,
                onChange: (e) => setFormData({...formData, phone: e.target.value})
              }}
            />
          </div>

          <InputField 
            label="Email Address" icon={<Mail size={18}/>} 
            error={errors.email}
            inputProps={{
              type: "email",
              placeholder: "alex@example.com",
              value: formData.email,
              onChange: (e) => setFormData({...formData, email: e.target.value})
            }}
          />

          <div className="space-y-2 md:space-y-3">
            <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 ml-1">Nature of Inquiry</label>
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-orange-500 transition-colors pointer-events-none">
                <Info size={18} />
              </div>
              <select 
                className="w-full pl-14 pr-10 py-4 md:py-5 bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-400 focus:bg-white dark:focus:bg-zinc-950 outline-none transition-all appearance-none font-bold text-zinc-700 dark:text-zinc-300 text-xs md:text-sm"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              >
                <option>Event Booking (Wedding/Party)</option>
                <option>Resort Dealership Partnership</option>
                <option>Beach Catering Service</option>
                <option>Other Business Inquiry</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          <div className="space-y-2 md:space-y-3">
            <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 ml-1">Event Details / Message</label>
            <div className="relative group">
              <div className="absolute left-5 top-5 text-zinc-400 group-focus-within:text-orange-500 transition-colors pointer-events-none">
                <MessageSquare size={18} />
              </div>
              <textarea
                required rows="4"
                placeholder="Ex: Planning a sunset wedding for 200 guests on July 15th..."
                className={`w-full pl-14 pr-6 py-5 bg-zinc-50/50 dark:bg-zinc-950/50 border ${errors.message ? 'border-red-400' : 'border-zinc-100 dark:border-zinc-800'} rounded-[1.5rem] md:rounded-[2rem] focus:ring-4 focus:ring-orange-500/10 focus:border-orange-400 focus:bg-white dark:focus:bg-zinc-950 outline-none transition-all resize-none text-zinc-900 dark:text-white font-medium text-xs md:text-sm`}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>
            {errors.message && <p className="text-red-500 text-[10px] font-bold mt-1 ml-2">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full group bg-zinc-900 dark:bg-zinc-100 hover:bg-orange-500 dark:hover:bg-orange-500 text-white dark:text-zinc-900 hover:text-white py-5 md:py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all duration-300 flex items-center justify-center gap-3 shadow-xl disabled:opacity-50"
          >
            {status === 'loading' ? 'Sending Request...' : status === 'error' ? 'Retry Sending' : 'Send Inquiry'}
            <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}

function ContactDetail({ icon, label, value, color }) {
  return (
    <div className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-white dark:bg-zinc-900/40 rounded-2xl md:rounded-3xl border border-zinc-100 dark:border-zinc-800 hover:border-orange-200 transition-all group text-left">
      <div className={`w-10 h-10 md:w-14 md:h-14 shrink-0 ${color} rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
        {React.cloneElement(icon, { size: 18 })}
      </div>
      <div className="min-w-0">
        <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-0.5 md:mb-1">{label}</p>
        <p className="font-bold text-zinc-900 dark:text-zinc-100 text-xs md:text-sm truncate">{value}</p>
      </div>
    </div>
  );
}

function InputField({ label, icon, error, inputProps }) {
  return (
    <div className="space-y-2 md:space-y-3 w-full">
      <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 ml-1">{label}</label>
      <div className="relative group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-orange-500 transition-colors pointer-events-none">{icon}</div>
        <input
          {...inputProps}
          className={`w-full pl-14 pr-10 py-4 md:py-5 bg-zinc-50/50 dark:bg-zinc-950/50 border ${error ? 'border-red-400' : 'border-zinc-100 dark:border-zinc-800'} rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-400 focus:bg-white dark:focus:bg-zinc-950 outline-none transition-all font-bold text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-700 text-xs md:text-sm`}
        />
        {error && <div className="absolute right-5 top-1/2 -translate-y-1/2 text-red-500"><AlertCircle size={18}/></div>}
      </div>
      {error && <p className="text-red-500 text-[9px] md:text-[10px] font-bold mt-1 ml-2 tracking-tight">{error}</p>}
    </div>
  );
}