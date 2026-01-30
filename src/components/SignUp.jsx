import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../axios/axios"; // 👈 Use your pre-configured api instance
import { AuthContext } from "../context/AuthContext"; // Import context if you want to auto-login
import { User, Mail, Lock, CheckCircle, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const { checkUser } = useContext(AuthContext); // 👈 For silent auto-login after signup
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError("");
    try {
      // 1. Post to registration endpoint
      const res = await api.post("/api/user/register", data);
      
      // 2. If your backend sends a cookie on registration (standard practice):
      // We run checkUser to update the global Auth state immediately.
      if (res.data.success) {
        await checkUser(); 
        navigate("/"); // Redirect to home instead of login for better UX
      } else {
        navigate("/login");
      }
    } catch (err) {
      setServerError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950 py-12 px-4 transition-colors duration-300">
      <div className="max-w-md w-full">
        {/* Branding Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-indigo-600 text-white mb-6 shadow-xl shadow-indigo-500/20">
            <ShieldCheck size={32} strokeWidth={2.5} />
          </div>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">Join Us</h2>
          <p className="mt-2 text-gray-500 dark:text-zinc-400 font-medium">Create your account to start ordering.</p>
        </div>

        <div className="bg-gray-50 dark:bg-zinc-900 p-8 md:p-10 rounded-[3rem] border border-gray-100 dark:border-zinc-800 shadow-sm transition-all">
          
          {serverError && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-tight text-center animate-in fade-in zoom-in">
              {serverError}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <InputField 
              label="Full Name" 
              icon={<User size={18}/>}
              placeholder="John Doe"
              error={errors.name?.message}
              {...register("name", { required: "Full name is required" })}
            />

            <InputField 
              label="Email Address" 
              type="email"
              icon={<Mail size={18}/>}
              placeholder="name@example.com"
              error={errors.email?.message}
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address"
                }
              })}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField 
                label="Password" 
                type="password"
                icon={<Lock size={18}/>}
                error={errors.password?.message}
                {...register("password", { 
                  required: "Password required",
                  minLength: { value: 6, message: "6+ characters" }
                })}
              />
              <InputField 
                label="Confirm" 
                type="password"
                icon={<CheckCircle size={18}/>}
                error={errors.confirmPassword?.message}
                {...register("confirmPassword", { 
                  required: "Confirm your password",
                  validate: (value) => value === password || "Match failed"
                })}
              />
            </div>

            <div className="flex items-start px-1 pt-2">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-indigo-600 border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg focus:ring-indigo-500 transition-all cursor-pointer"
                  {...register("terms", { required: "You must accept the terms" })}
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-bold text-gray-600 dark:text-zinc-400">
                  I agree to the <span className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">Terms & Conditions</span>
                </label>
                {errors.terms && <p className="text-red-500 text-[10px] font-black uppercase mt-1">{errors.terms.message}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-3 py-5 px-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-xl shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : <>Create Account <ArrowRight size={16} /></>}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-zinc-800 text-center">
            <p className="text-sm font-bold text-gray-500 dark:text-zinc-500">
              Already a member?{" "}
              <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline">Sign in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const InputField = React.forwardRef(({ label, name, type, icon, error, placeholder, ...rest }, ref) => {
  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-zinc-500 ml-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors">
          {icon}
        </div>
        <input
          ref={ref}
          name={name}
          type={type}
          placeholder={placeholder}
          {...rest}
          className={`w-full pl-12 pr-4 py-4 bg-white dark:bg-zinc-950 border-2 rounded-2xl outline-none transition-all font-bold dark:text-white text-sm ${
            error 
              ? 'border-red-400/20 focus:border-red-500' 
              : 'border-transparent focus:border-indigo-500 shadow-sm'
          }`}
        />
      </div>
      {error && <p className="text-red-500 text-[10px] font-black uppercase px-1 mt-1 tracking-tighter">{error}</p>}
    </div>
  );
});

InputField.displayName = "InputField";