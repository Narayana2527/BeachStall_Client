import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form"; // High performance engine
import { AuthContext } from "../context/AuthContext";
import { Mail, Lock, LogIn, Loader2, ArrowRight, AlertCircle } from "lucide-react";

// Flexible API Base URL
const API_BASE_URL = window.location.hostname === "localhost" 
  ? "http://localhost:5000" 
  : "https://beach-stall-server-gezy.vercel.app";

export default function Login() {
  const { checkUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Initialize Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // 2. Optimized Submit Handler
  const onSubmit = async (data) => {
    setServerError("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/user/login`, data);
      
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        await checkUser(); 
        navigate('/');
      }
    } catch (err) {
      setServerError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950 py-12 px-4 transition-colors duration-300">
      <div className="max-w-md w-full">
        
        {/* Branding */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-indigo-600 text-white mb-6 shadow-xl shadow-indigo-500/20">
            <LogIn size={32} strokeWidth={2.5} />
          </div>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">Welcome Back</h2>
          <p className="mt-2 text-gray-500 dark:text-zinc-400 font-medium">Log in to manage your orders & bookings.</p>
        </div>

        <div className="bg-gray-50 dark:bg-zinc-900 p-8 md:p-10 rounded-[3rem] border border-gray-100 dark:border-zinc-800 shadow-sm transition-all">
          
          {serverError && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-tight flex items-center gap-2 animate-in fade-in zoom-in">
              <AlertCircle size={16} />
              {serverError}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-zinc-500 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="name@company.com"
                  {...register("email", { required: "Email is required" })}
                  className={`w-full pl-12 pr-4 py-4 bg-white dark:bg-zinc-950 border-2 rounded-2xl outline-none transition-all font-bold dark:text-white text-sm shadow-sm ${
                    errors.email ? "border-red-500" : "border-transparent focus:border-indigo-500"
                  }`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] font-black px-1 uppercase">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-end px-1">
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-zinc-500">
                  Password
                </label>
                <Link to="/forgotpassword" size="sm" className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", { required: "Password is required" })}
                  className={`w-full pl-12 pr-4 py-4 bg-white dark:bg-zinc-950 border-2 rounded-2xl outline-none transition-all font-bold dark:text-white text-sm shadow-sm ${
                    errors.password ? "border-red-500" : "border-transparent focus:border-indigo-500"
                  }`}
                />
              </div>
              {errors.password && <p className="text-red-500 text-[10px] font-black px-1 uppercase">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-3 py-5 px-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-xl shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <>Sign In <ArrowRight size={16} /></>}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-zinc-800 text-center">
            <p className="text-sm font-bold text-gray-500 dark:text-zinc-500">
              New here?{" "}
              <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 hover:underline">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}