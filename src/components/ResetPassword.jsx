import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Eye, EyeOff, Loader2, CheckCircle2, Circle } from 'lucide-react';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [showPass, setShowPass] = useState(false);
  const [status, setStatus] = useState({ loading: false, error: '', success: false });
  const [strength, setStrength] = useState(0);

  // Password strength logic
  useEffect(() => {
    const pass = formData.password;
    let score = 0;
    if (pass.length > 7) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    setStrength(score);
  }, [formData.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setStatus({ ...status, error: "Passwords do not match" });
    }
    if (strength < 2) {
      return setStatus({ ...status, error: "Please provide a stronger password" });
    }

    setStatus({ ...status, loading: true, error: '' });

    try {
      // Using your Vercel Production URL
      await axios.post(`https://beach-stall-server-gezy.vercel.app/api/user/resetpassword/${token}`, {
        password: formData.password
      });
      
      setStatus({ loading: false, success: true, error: '' });
      setTimeout(() => navigate('/login'), 4000);
    } catch (err) {
      setStatus({ 
        loading: false, 
        error: err.response?.data?.message || "Link expired or invalid. Please request a new one." 
      });
    }
  };

  const getStrengthColor = () => {
    if (strength === 0) return 'bg-zinc-200 dark:bg-zinc-800';
    if (strength < 2) return 'bg-red-500';
    if (strength < 4) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center px-6 transition-colors duration-500">
      <div className="max-w-md w-full">
        
        {/* Brand Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 mb-6">
            <Lock size={28} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600/70 dark:text-indigo-400 mb-3 block">
            The Beach Stall • Security
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase dark:text-white leading-none">
            Reset <br /> <span className="font-serif italic lowercase font-light text-indigo-600">password</span>
          </h1>
        </div>

        {status.success ? (
          <div className="bg-green-50/50 dark:bg-green-900/10 p-10 rounded-[2.5rem] text-center border border-green-100 dark:border-green-900/30 animate-in zoom-in-95 duration-500">
            <div className="relative inline-block mb-6">
               <CheckCircle2 className="text-green-500" size={64} />
               <div className="absolute inset-0 bg-green-500 blur-2xl opacity-20 animate-pulse" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight dark:text-white mb-2">Password Updated</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
              Your security is our priority. Redirecting you to the login screen in a few seconds...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* New Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">New Password</label>
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map((v) => (
                    <div 
                      key={v} 
                      className={`h-1 w-6 rounded-full transition-all duration-500 ${v <= strength ? getStrengthColor() : 'bg-zinc-100 dark:bg-zinc-800'}`} 
                    />
                  ))}
                </div>
              </div>
              
              <div className="relative group">
                <input 
                  type={showPass ? "text" : "password"}
                  required
                  autoFocus
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-transparent focus:border-indigo-500/50 dark:focus:border-indigo-500/30 rounded-2xl py-5 px-6 text-sm font-medium transition-all dark:text-white outline-none"
                  placeholder="Enter secure password"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-indigo-600 transition-colors"
                >
                  {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Confirm Identity</label>
              <input 
                type="password"
                required
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-transparent focus:border-indigo-500/50 dark:focus:border-indigo-500/30 rounded-2xl py-5 px-6 text-sm font-medium transition-all dark:text-white outline-none"
                placeholder="Repeat password"
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>

            {/* Error Message */}
            {status.error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 border border-red-100 dark:border-red-900/30 animate-in fade-in slide-in-from-top-2">
                <Circle size={14} fill="currentColor" className="opacity-20" />
                <p className="text-[10px] font-black uppercase tracking-wider">{status.error}</p>
              </div>
            )}

            {/* Action Button */}
            <button 
              disabled={status.loading || !formData.password}
              className="group w-full py-6 bg-indigo-600 text-white rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-40 disabled:grayscale"
            >
              {status.loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Confirm New Password
                  <ShieldCheck size={16} className="group-hover:rotate-12 transition-transform" />
                </>
              )}
            </button>

            <p className="text-center text-[10px] font-bold text-zinc-400 uppercase tracking-widest pt-4">
              Secured by Beach Stall Auth Engine
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;