import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'

import Navbar from './components/navbar'
import Home from "./pages/Home";
import About from "./pages/About";
import ModernMenu from "./pages/menu";
import BookTable from "./pages/bookTable";
import Contact from "./pages/Contact";
import Footer from "./components/footer";
import CartPage from "./pages/Cart";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from './context/CartContext' // Now inside Router
import PaymentPage from "./pages/payment";
import OrderHistory from "./pages/OrderPage";
import ScrollToTop from "./components/ScrollToTop";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";
import CateringPage from "./pages/CateringPage";

function App() {
  return (
    <Router> {/* 1. Move Router to the very top */}
      <AuthProvider>
        <CartProvider> {/* 2. CartProvider can now use useNavigate() from Router */}
          <ScrollToTop />  
          <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">  
            <Navbar />
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/resetpassword/:token" element={<ResetPassword />} />
              <Route path="/" element={<Home />}  />
              <Route path="/about" element ={<About />}  />
              <Route path="/menu"  element={<ModernMenu />} />
              <Route path="/catering-booking" element={<CateringPage />} />
              <Route path="/booktable" element={<BookTable />}  />
              <Route path="/contact"  element={<Contact />} />
              <Route path="/cart"  element={<CartPage />} />
              <Route path="/payment"  element={<PaymentPage />} />
              <Route path="/profile/orders"  element={<OrderHistory />} />
            </Routes>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App;