import React, { useState } from 'react';
import { Mail, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ loading: false, success: false, error: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: "" });
    try {
      // Logic to trigger the email sending on your Vercel server
      await axios.post('https://beach-stall-server-gezy.vercel.app/api/user/forgotpassword', { email:email });
      setStatus({ loading: false, success: true, error: "" });
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.response?.data?.message || "Email not found" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950 px-6">
      <div className="max-w-md w-full">
        {status.success ? (
          <div className="text-center p-10 bg-indigo-50 dark:bg-indigo-900/10 rounded-[2.5rem] border border-indigo-100">
            <CheckCircle2 className="mx-auto text-indigo-600 mb-4" size={50} />
            <h3 className="font-black uppercase dark:text-white">Link Sent</h3>
            <p className="text-xs text-zinc-500 mt-2">Check your email for instructions to reset your password.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-black uppercase tracking-tighter dark:text-white">Recover <br/> <span className="font-serif italic lowercase text-indigo-600">Access</span></h2>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Account Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-600" size={18} />
                <input 
                  type="email" 
                  required 
                  className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-900 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold dark:text-white"
                  placeholder="name@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            {status.error && <p className="text-red-500 text-[10px] font-black uppercase tracking-tight">{status.error}</p>}
            <button className="w-full py-5 bg-indigo-600 text-white rounded-full font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3">
              {status.loading ? <Loader2 className="animate-spin" size={18} /> : "Request Reset Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}