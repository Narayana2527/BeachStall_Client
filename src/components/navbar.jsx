import React, { useContext } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Home, UtensilsCrossed, CalendarDays, User, ShoppingBag, Settings, Package, LogOut } from 'lucide-react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import CartBadge from './CartBadge';

const desktopNav = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Menu', href: '/menu' },
  { name: 'Reservations', href: '/booktable' },
  { name: 'Contact', href: '/contact' },
];

const mobileNav = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Menu', href: '/menu', icon: UtensilsCrossed },
  { name: 'Book', href: '/booktable', icon: CalendarDays },
  { name: 'Cart', href: '/cart', icon: ShoppingBag, isCart: true },
];

export default function Navbar() {
  const { user, setUser, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Hide bottom nav on checkout-related pages to avoid overlapping buttons
  const hideBottomNav = location.pathname === '/cart' || location.pathname === '/payment';

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <>
      {/* 💻 DESKTOP NAVBAR */}
      <nav className="hidden sm:block sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center">
              <span className="text-xl font-black tracking-tighter text-indigo-600 cursor-pointer italic" onClick={() => navigate('/')}>
                BEACH STALL
              </span>
              <div className="ml-10 flex items-center space-x-8">
                {desktopNav.map((item) => (
                  <NavLink key={item.name} to={item.href} className={({ isActive }) => `text-sm font-bold transition-all ${isActive ? 'text-indigo-600 underline underline-offset-8 decoration-2' : 'text-gray-400 hover:text-indigo-600'}`}>
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <NavLink to="/cart"><CartBadge /></NavLink>
              {!isLoggedIn ? (
                <NavLink to="/login" className="rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-indigo-700 transition-all">Join</NavLink>
              ) : (
                <Menu as="div" className="relative ml-2">
                  <MenuButton className="flex items-center rounded-full bg-gray-50 p-1"><UserCircleIcon className="h-8 w-8 text-indigo-600" /></MenuButton>
                  <MenuItems className="absolute right-0 z-50 mt-3 w-56 rounded-2xl bg-white p-2 shadow-2xl border border-gray-100 focus:outline-none">
                    <div className="px-3 py-3 mb-2 bg-indigo-50 rounded-xl">
                      <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest leading-none mb-1">{user?.role || 'Customer'}</p>
                      <p className="text-sm font-bold text-gray-800 truncate">{user?.name}</p>
                    </div>
                    <MenuItem>{({ active }) => <NavLink to="/profile" className={`flex w-full px-3 py-2 text-sm font-medium rounded-lg ${active ? 'bg-gray-50 text-indigo-600' : 'text-gray-700'}`}>My Profile</NavLink>}</MenuItem>
                    <div className="my-2 border-t border-gray-100" />
                    <MenuItem>{({ active }) => <button onClick={handleLogout} className={`flex w-full px-3 py-2 text-sm font-bold rounded-lg text-red-600 ${active ? 'bg-red-50' : ''}`}>Sign out</button>}</MenuItem>
                  </MenuItems>
                </Menu>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* 📱 MOBILE TOP BAR (Always Visible) */}
      <div className="sm:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md px-6 py-4 flex justify-center items-center border-b border-gray-50">
        <span className="text-lg font-black tracking-tighter text-indigo-600 italic">BEACH STALL</span>
      </div>

      {/* 📱 MOBILE BOTTOM NAVIGATION (Hidden on Cart/Payment) */}
      {!hideBottomNav && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-gray-100 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-around h-20">
            {mobileNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink key={item.name} to={item.href} className={({ isActive }) => `flex flex-col items-center justify-center w-full h-full gap-1 transition-all ${isActive ? 'text-indigo-600' : 'text-gray-400'}`}>
                  {({ isActive }) => (
                    <>
                      <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-indigo-50' : ''}`}>
                        {item.isCart ? (
                          <div className="relative"><Icon size={22} strokeWidth={isActive ? 2.5 : 2} /><div className="absolute -top-2 -right-2 scale-75"><CartBadge /></div></div>
                        ) : (
                          <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                        )}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-tighter">{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
            
            <div className="flex flex-col items-center justify-center w-full h-full relative">
              <Menu as="div">
                {({ open }) => (
                  <>
                    <MenuButton className={`flex flex-col items-center gap-1 transition-all ${open ? 'text-indigo-600' : 'text-gray-400'}`}>
                      <div className={`p-1.5 rounded-xl transition-all ${open ? 'bg-indigo-50' : ''}`}><User size={22} strokeWidth={open ? 2.5 : 2} /></div>
                      <span className="text-[10px] font-bold uppercase tracking-tighter">{isLoggedIn ? 'Account' : 'Login'}</span>
                    </MenuButton>

                    <Transition
                      enter="transition duration-200 ease-out"
                      enterFrom="transform scale-95 opacity-0 translate-y-10"
                      enterTo="transform scale-100 opacity-100 translate-y-0"
                      leave="transition duration-150 ease-in"
                      leaveFrom="transform scale-100 opacity-100 translate-y-0"
                      leaveTo="transform scale-95 opacity-0 translate-y-10"
                    >
                      <MenuItems className="absolute bottom-24 right-4 left-[-150px] w-[calc(100vw-32px)] max-w-sm bg-white rounded-[2rem] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] border border-gray-100 p-4 focus:outline-none z-[70]">
                        {!isLoggedIn ? (
                          /* GUEST VIEW */
                          <div className="p-4 text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                              <User size={32} className="text-gray-300" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Welcome!</h3>
                            {/* Wrap the button in MenuItem so HeadlessUI handles the close event */}
                            <MenuItem>
                              {({ close }) => (
                                <button 
                                  onClick={() => { navigate('/login'); close(); }} 
                                  className="mt-4 w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold"
                                >
                                  Sign In / Join
                                </button>
                              )}
                            </MenuItem>
                          </div>
                        ) : (
                          /* LOGGED IN VIEW */
                          <div className="space-y-2">
                            <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-2xl mb-4">
                              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                                {user?.name?.charAt(0)}
                              </div>
                              <div className="flex-1 overflow-hidden">
                                <p className="text-xs font-black text-indigo-400 uppercase tracking-widest">{user?.role || 'Member'}</p>
                                <p className="text-base font-bold text-gray-900 truncate">{user?.name}</p>
                              </div>
                            </div>

                            <MenuItem>
                              {({ active, close }) => (
                                <button 
                                  onClick={() => { navigate('/profile'); close(); }} 
                                  className={`flex w-full items-center gap-3 p-4 rounded-xl font-bold text-gray-700 ${active ? 'bg-gray-50' : ''}`}
                                >
                                  <Settings size={20} /> Edit Profile
                                </button>
                              )}
                            </MenuItem>

                            <MenuItem>
                              {({ active, close }) => (
                                <button 
                                  onClick={() => { navigate('/profile/orders'); close(); }} 
                                  className={`flex w-full items-center gap-3 p-4 rounded-xl font-bold text-gray-700 ${active ? 'bg-gray-50' : ''}`}
                                >
                                  <Package size={20} /> My Orders
                                </button>
                              )}
                            </MenuItem>

                            <div className="h-px bg-gray-100 my-2" />

                            <MenuItem>
                              {({ active, close }) => (
                                <button 
                                  onClick={() => { handleLogout(); close(); }} 
                                  className={`flex w-full items-center gap-3 p-4 rounded-xl font-bold text-red-600 ${active ? 'bg-red-50' : ''}`}
                                >
                                  <LogOut size={20} /> Sign Out
                                </button>
                              )}
                            </MenuItem>
                          </div>
                        )}
                      </MenuItems>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
          </div>
        </div>
      )}
      
      {/* Dynamic Spacer */}
      {!hideBottomNav && <div className="hidden md:visible lg:visible h-24" />}
    </>
  );
}