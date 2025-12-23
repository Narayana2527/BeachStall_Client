// import { useState } from 'react'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Navbar from './components/navbar'
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/menu";
import BookTable from "./pages/bookTable";
import Contact from "./pages/Contact";
import Footer from "./components/footer";
import CartPage from "./pages/Cart";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import { AuthProvider } from "./context/AuthContext";
import {CartProvider} from './context/CartContext'
import PaymentPage from "./pages/payment";
import OrderHistory from "./pages/OrderPage";


function App() {
  

  return (
    <AuthProvider>
      <CartProvider>
        <Router>      
          <Navbar />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />}  />
            <Route path="/about" element ={<About />}  />
            <Route path="/menu"  element={<Menu />} />
            <Route path="/booktable" element={<BookTable />}  />
            <Route path="/contact"  element={<Contact />} />
            <Route path="/cart"  element={<CartPage />} />
            <Route path="/payment"  element={<PaymentPage />} />
            <Route path="/profile/orders"  element={<OrderHistory />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
