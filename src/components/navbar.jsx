import React, { useContext, useState, Fragment } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition, Dialog, DialogPanel, TransitionChild } from '@headlessui/react';
import { 
  Home, UtensilsCrossed, CalendarDays, User, ShoppingBag, Settings, 
  Package, LogOut, Menu as MenuIcon, X, Info, MessageSquare, 
  ChevronDown, Star 
} from 'lucide-react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import CartBadge from './CartBadge';
import ThemeToggle from './toggleTheme';
import MobileCartBadge from './mobileCartBadge';

const navLinks = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: Info },
  { name: 'Menu', href: '/menu', icon: UtensilsCrossed },
  { name: 'Reservations', href: '/booktable', icon: CalendarDays },
  { name: 'Contact', href: '/contact', icon: MessageSquare },
  { name: 'Event Planning', href: '/events', icon: MessageSquare },
];

const mobileBottomNav = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Menu', href: '/menu', icon: UtensilsCrossed },
  { name: 'Book', href: '/booktable', icon: CalendarDays },
  { name: 'Cart', href: '/cart', icon: ShoppingBag, isCart: true },
];

export default function Navbar() {
  const { user, setUser, isLoggedIn } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const hideBottomNav = location.pathname === '/cart' || location.pathname === '/payment';

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsSidebarOpen(false);
    navigate('/login');
  };

  return (
    <>
      {/* 💻 TOP NAVBAR - Forced White Background */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            
            {/* LEFT: Mobile Menu Toggle & Desktop Logo */}
            <div className="flex items-center gap-4">
              <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                <MenuIcon size={26} />
              </button>

              <div className="hidden lg:block shrink-0">
                {/* Logo sized to fit h-20 header perfectly with padding */}
                <img 
                  src="/assets/images/BeachStall.png" 
                  alt="Logo" 
                  onClick={() => navigate('/')} 
                  className="h-20 cursor-pointer object-contain hover:scale-105 transition-transform" 
                />
              </div>

              {/* Desktop Nav Links - Colors locked for light background */}
              <div className="hidden lg:flex items-center ml-8 space-x-1">
                {navLinks.map((item) => (
                  <NavLink 
                    key={item.name} 
                    to={item.href} 
                    className={({ isActive }) => `px-4 py-2 rounded-xl text-[12px] font-black uppercase tracking-widest transition-all ${isActive ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* CENTER: Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center flex-1">
              <img 
                src="/assets/images/BeachStall.png" 
                alt="Logo" 
                onClick={() => navigate('/')} 
                className="h-20 cursor-pointer object-contain" 
              />
            </div>

            {/* RIGHT: User & Theme */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:flex items-center gap-3">
                <NavLink to="/cart" className="p-2 text-gray-500 hover:text-indigo-600 transition-colors">
                  <CartBadge />
                </NavLink>

                {!isLoggedIn ? (
                  <button onClick={() => navigate('/login')} className="px-6 py-2.5 bg-gray-900 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-600 transition-all shadow-lg active:scale-95">
                    Join
                  </button>
                ) : (
                  <Menu as="div" className="relative">
                    <MenuButton className="flex items-center gap-3 group px-2 py-1.5 rounded-2xl hover:bg-gray-50 transition-all">
                      <div className="hidden md:flex flex-col items-end mr-1">
                        <span className="text-[9px] font-black uppercase tracking-tighter text-indigo-500">{user?.role || 'Premium Member'}</span>
                        <span className="text-sm font-bold text-gray-900 leading-tight">{user?.name}</span>
                      </div>
                      <div className="h-10 w-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-xl shadow-indigo-500/20 rotate-3 group-hover:rotate-0 transition-all">
                        {user?.name?.charAt(0)}
                      </div>
                      <ChevronDown size={14} className="text-gray-400" />
                    </MenuButton>

                    <Transition as={Fragment} enter="transition duration-200" enterFrom="transform scale-95 opacity-0 translate-y-2" enterTo="transform scale-100 opacity-100 translate-y-0">
                      <MenuItems className="absolute right-0 mt-4 w-72 rounded-[2.5rem] bg-white p-3 shadow-2xl border border-gray-100">
                        <div className="px-5 py-5 mb-3 bg-indigo-600 rounded-[2rem] text-white overflow-hidden relative">
                           <Star size={60} className="absolute -right-4 -bottom-4 opacity-20 rotate-12" />
                           <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">Authenticated</p>
                           <p className="text-lg font-black tracking-tight truncate">{user?.name}</p>
                        </div>
                        <div className="space-y-1">
                          <DropdownLink icon={User} label="My Profile" onClick={() => navigate('/profile')} />
                          <DropdownLink icon={Package} label="My Orders" onClick={() => navigate('/profile/orders')} />
                          <DropdownLink icon={CalendarDays} label="My Bookings" onClick={() => navigate('/bookings')} />
                          <div className="h-[1px] bg-gray-100 my-2 mx-4" />
                          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-5 py-4 text-[11px] font-black uppercase text-red-500 hover:bg-red-50 rounded-2xl transition-colors">
                            <LogOut size={18} /> Sign Out
                          </button>
                        </div>
                      </MenuItems>
                    </Transition>
                  </Menu>
                )}
              </div>
              <div className="pl-2 border-l border-gray-100 ml-1">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 🚀 SIDEBAR (OFF-CANVAS) */}
      <Transition show={isSidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100] lg:hidden" onClose={setIsSidebarOpen}>
          <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200">
            <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm" />
          </TransitionChild>
          <div className="fixed inset-0 flex">
            <TransitionChild as={Fragment} enter="transform transition ease-in-out duration-300" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-300" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
              <DialogPanel className="relative flex w-full max-w-xs flex-col bg-white dark:bg-zinc-950 shadow-2xl">
                <div className="flex px-6 py-8 items-center justify-between border-b dark:border-zinc-800">
                  <img src="/assets/images/BeachStall.png" alt="Logo" className="h-20" />
                  <button onClick={() => setIsSidebarOpen(false)} className="p-3 text-gray-400 bg-gray-50 dark:bg-zinc-900 rounded-2xl"><X size={24} /></button>
                </div>
                <div className="mt-4 px-4 space-y-2">
                  {navLinks.map((item) => (
                    <NavLink key={item.name} to={item.href} onClick={() => setIsSidebarOpen(false)} className={({ isActive }) => `flex items-center gap-4 px-6 py-4 rounded-3xl font-black text-xs uppercase tracking-widest transition-all ${isActive ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 dark:shadow-none' : 'text-gray-500 dark:text-zinc-400 hover:bg-gray-50'}`}>
                      <item.icon size={20} />{item.name}
                    </NavLink>
                  ))}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      {/* 📱 BOTTOM NAV */}
      {!hideBottomNav && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-t border-gray-100 dark:border-zinc-800 pb-safe">
          <div className="flex items-center justify-around h-16 px-2">
            {mobileBottomNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink key={item.name} to={item.href} className={({ isActive }) => `relative flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-zinc-500'}`}>
                  {({ isActive }) => (
                    <>
                      <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-indigo-50 dark:bg-indigo-500/10' : ''}`}>
                        <Icon size={20} strokeWidth={isActive ? 3 : 2} />
                        {item.isCart && <div className="absolute top-2 right-4 scale-75"><MobileCartBadge /></div>}
                      </div>
                      <span className="text-[8px] font-black uppercase tracking-tighter">{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
            
            <Menu as="div" className="flex-1 h-full flex items-center justify-center">
              <MenuButton className="flex flex-col items-center gap-0.5 text-gray-400 dark:text-zinc-500">
                <div className="p-1.5 rounded-xl">
                  {isLoggedIn ? (
                    <div className="w-5 h-5 bg-indigo-600 rounded-md flex items-center justify-center text-white text-[9px] font-black">{user?.name?.charAt(0)}</div>
                  ) : <User size={20} />}
                </div>
                <span className="text-[8px] font-black uppercase tracking-tighter">{isLoggedIn ? 'Account' : 'Login'}</span>
              </MenuButton>
              <Transition as={Fragment} enter="transition duration-200" enterFrom="transform scale-95 opacity-0 translate-y-10" enterTo="transform scale-100 opacity-100 translate-y-0">
                <MenuItems className="absolute bottom-20 right-4 left-4 bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-zinc-800 p-4">
                  {!isLoggedIn ? (
                    <button onClick={() => navigate('/login')} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs">Sign In</button>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl mb-2">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">{user?.name?.charAt(0)}</div>
                        <div>
                          <p className="text-xs font-black text-gray-900 dark:text-white truncate">{user?.name}</p>
                          <p className="text-[10px] text-indigo-500 font-bold uppercase">{user?.role || 'Member'}</p>
                        </div>
                      </div>
                      <MenuItem>{() => <button onClick={() => navigate('/profile')} className="flex w-full items-center gap-3 p-3 rounded-xl font-bold text-gray-700 dark:text-zinc-300"><User size={18} /> Profile</button>}</MenuItem>
                      <MenuItem>{() => <button onClick={() => navigate('/profile/orders')} className="flex w-full items-center gap-3 p-3 rounded-xl font-bold text-gray-700 dark:text-zinc-300"><Package size={18} /> Orders</button>}</MenuItem>
                      <MenuItem>{() => <button onClick={() => navigate('/bookings')} className="flex w-full items-center gap-3 p-3 rounded-xl font-bold text-gray-700 dark:text-zinc-300"><CalendarDays size={18} /> Bookings</button>}</MenuItem>
                      <button onClick={handleLogout} className="flex w-full items-center gap-3 p-3 rounded-xl font-bold text-red-500 mt-2 border-t dark:border-zinc-800 pt-3"><LogOut size={18} /> Sign Out</button>
                    </div>
                  )}
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </div>
      )}
    </>
  );
}

function DropdownLink({ icon: Icon, label, onClick }) {
  return (
    <MenuItem>
      {({ active }) => (
        <button onClick={onClick} className={`flex items-center gap-4 w-full px-5 py-3.5 text-[11px] font-black uppercase tracking-widest rounded-2xl transition-all ${active ? 'bg-gray-100 text-indigo-600 translate-x-1' : 'text-gray-500'}`}>
          <Icon size={18} strokeWidth={2.5} /> {label}
        </button>
      )}
    </MenuItem>
  );
}