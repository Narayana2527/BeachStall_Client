import React, { useContext } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { ChevronRight } from 'lucide-react'; // Elegant chevron
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import CartBadge from './CartBadge';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Menu', href: '/menu' },
  { name: 'Reservations', href: '/booktable' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const { user, setUser, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <Disclosure as="nav" className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      {({ open, close }) => (
        <>
          {/* Main Desktop/Header Row */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              
              {/* Left: Mobile Menu Button */}
              <div className="flex items-center sm:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-xl p-2 text-gray-500 hover:bg-gray-100 transition-all focus:outline-none">
                  {open ? (
                    <XMarkIcon className="block h-7 w-7" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-7 w-7" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>

              {/* Logo Section */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <span 
                    className="text-xl font-black tracking-tighter text-indigo-600 cursor-pointer italic" 
                    onClick={() => { navigate('/'); close(); }}
                  >
                    BEACH STALL
                  </span>
                </div>
                
                {/* Desktop Navigation Links */}
                <div className="hidden sm:ml-10 sm:flex sm:items-center sm:space-x-8">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        `text-sm font-bold transition-all ${
                          isActive ? 'text-indigo-600 underline underline-offset-8 decoration-2' : 'text-gray-400 hover:text-indigo-600'
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Right Section: Actions */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                <NavLink to="/cart" onClick={() => close()} className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                  <CartBadge />
                </NavLink>

                {!isLoggedIn ? (
                  <div className="hidden sm:flex items-center space-x-4">
                    <NavLink to="/login" className="text-sm font-bold text-gray-600">Login</NavLink>
                    <NavLink to="/signup" className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-indigo-700 transition-all">
                      Join
                    </NavLink>
                  </div>
                ) : (
                  <Menu as="div" className="relative ml-2">
                    <MenuButton className="flex items-center rounded-full bg-gray-50 p-1 hover:ring-2 hover:ring-indigo-100 transition-all">
                      <UserCircleIcon className="h-8 w-8 text-indigo-600" />
                    </MenuButton>
                    <MenuItems className="absolute right-0 z-50 mt-3 w-56 origin-top-right rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-black/5 focus:outline-none border border-gray-100">
                        <div className="px-3 py-3 mb-2 bg-indigo-50 rounded-xl">
                          <p className="text-[10px] text-indigo-400 uppercase font-black tracking-widest leading-none mb-1">{user?.role || 'Customer'}</p>
                          <p className="text-sm font-bold text-gray-800 truncate">{user?.name}</p>
                        </div>
                        <MenuItem>
                          {({ active }) => (
                            <NavLink to="/profile" onClick={() => close()} className={`flex w-full px-3 py-2 text-sm font-medium rounded-lg ${active ? 'bg-gray-50 text-indigo-600' : 'text-gray-700'}`}>
                              My Profile
                            </NavLink>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <NavLink to="/profile/orders" onClick={() => close()} className={`flex w-full px-3 py-2 text-sm font-medium rounded-lg ${active ? 'bg-gray-50 text-indigo-600' : 'text-gray-700'}`}>
                              My Orders
                            </NavLink>
                          )}
                        </MenuItem>
                        <div className="my-2 border-t border-gray-100" />
                        <MenuItem>
                          {({ active }) => (
                            <button onClick={() => { handleLogout(); close(); }} className={`flex w-full px-3 py-2 text-sm font-bold rounded-lg text-red-600 ${active ? 'bg-red-50' : ''}`}>
                              Sign out
                            </button>
                          )}
                        </MenuItem>
                    </MenuItems>
                  </Menu>
                )}
              </div>
            </div>
          </div>

          {/* 📱 Mobile Navigation Panel */}
          <DisclosurePanel className="sm:hidden relative overflow-hidden bg-white h-[calc(100vh-80px)]">
            
            {/* 🌊 CENTERED LOGO WATERMARK BACKGROUND */}
            <div className="absolute inset-0 z-0 flex items-center justify-center select-none pointer-events-none p-4">
              <div className="flex flex-col items-center opacity-[0.06] transform -rotate-6">
                <span className="text-[18vw] font-black leading-none tracking-tighter text-gray-900">
                  BEACH
                </span>
                <span className="text-[18vw] font-black leading-none tracking-tighter text-gray-900">
                  STALL
                </span>
              </div>
            </div>

            {/* Navigation Links Layer */}
            <div className="relative z-10 px-6 pt-10 pb-6 flex flex-col h-full">
              <div className="space-y-1">
                {navigation.map((item, index) => (
                  <div key={item.name}>
                    <DisclosureButton 
                      as={NavLink} 
                      to={item.href} 
                      className={({ isActive }) => 
                        `flex items-center justify-between w-full py-6 px-2 group transition-all ${
                          isActive ? 'text-indigo-600' : 'text-gray-700 active:bg-gray-50 rounded-lg'
                        }`
                      }
                    >
                      <span className="text-xl font-bold tracking-tight uppercase">
                        {item.name}
                      </span>
                      
                      {/* Custom Chevron + Line Arrow: --- > */}
                      <div className="flex items-center transition-transform duration-300 group-hover:translate-x-1">
                        <div className="h-[1.5px] w-6 bg-current opacity-20 group-hover:opacity-100 transition-all" />
                        <ChevronRight size={20} strokeWidth={2.5} className="ml-[-2px]" />
                      </div>
                    </DisclosureButton>
                    
                    {/* Divider HR */}
                    {index !== navigation.length - 1 && (
                      <hr className="border-gray-100 w-full" />
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom Mobile Action Buttons */}
              {!isLoggedIn && (
                <div className="mt-auto space-y-4 pb-12">
                  <DisclosureButton 
                    as={NavLink} 
                    to="/signup" 
                    className="flex w-full items-center justify-center rounded-2xl bg-indigo-600 py-5 text-lg font-bold text-white shadow-xl shadow-indigo-100 active:scale-95 transition-all"
                  >
                    Join the Club
                  </DisclosureButton>
                  <DisclosureButton 
                    as={NavLink} 
                    to="/login" 
                    className="flex w-full items-center justify-center rounded-2xl bg-gray-50 py-5 text-lg font-bold text-gray-700 active:bg-gray-100 transition-all"
                  >
                    Login
                  </DisclosureButton>
                </div>
              )}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}