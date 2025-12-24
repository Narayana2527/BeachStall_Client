import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; // Ensure path is correct

export default function Login() {
  // 1. Hooks must be inside the component
  const { checkUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // 2. State management
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true);

    try {
      // 3. Use 'credentials' to match your state variable
      const res = await axios.post('https://beachstall-server.vercel.app/api/user/login', credentials);
      
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        
        // 4. Update the global Auth state from MongoDB
        await checkUser(); 
        
        // 5. Navigate home
        navigate('/');
      }
    } catch (err) {
      // 6. Error handling for better UX
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl border border-gray-100">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-gray-500">Please enter your details</p>
        </div>

        {/* Display Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded text-sm animate-pulse">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Email Address</label>
              <input
                name="email"
                type="email"
                required
                value={credentials.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                placeholder="name@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <input
                name="password"
                type="password"
                required
                value={credentials.password}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transform transition active:scale-95 disabled:opacity-70 flex justify-center items-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </>
            ) : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            New here?{" "}
            <Link to="/signup" className="text-indigo-600 font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}