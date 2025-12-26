import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import CartBadge from './CartBadge';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Menu', href: '/menu' },
  { name: 'Reservations', href: '/booktable' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const { user, setUser, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <Disclosure as="nav" className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      {({ open, close }) => ( // Added 'close' from render props
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              
              {/* Left: Mobile Menu Button */}
              <div className="flex items-center sm:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-xl p-2 text-gray-500 hover:bg-gray-100 focus:outline-none transition-all">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>

              {/* Center: Logo */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <span 
                    className="text-xl font-black tracking-tighter text-indigo-600 cursor-pointer" 
                    onClick={() => { navigate('/'); close(); }}
                  >
                    BEACH STALL
                  </span>
                </div>
                {/* Desktop Nav */}
                <div className="hidden sm:ml-10 sm:flex sm:items-center sm:space-x-8">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        `text-sm font-semibold transition-all ${
                          isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-500'
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Right Section: Action Group (Cart + User) */}
              <div className="flex items-center space-x-1 sm:space-x-4">
                {/* Cart Badge - Always visible beside user */}
                <NavLink 
                  to="/cart" 
                  onClick={() => close()} 
                  className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  <CartBadge />
                </NavLink>

                {/* Auth Logic */}
                <div className="flex items-center">
                  {!isLoggedIn ? (
                    <div className="hidden sm:flex items-center space-x-4">
                      <NavLink to="/login" className="text-sm font-bold text-gray-700 hover:text-indigo-600">Login</NavLink>
                      <NavLink to="/signup" className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95">
                        Join
                      </NavLink>
                    </div>
                  ) : (
                    <Menu as="div" className="relative ml-2">
                      <MenuButton className="flex items-center space-x-2 rounded-full bg-gray-50 p-1 pr-3 hover:bg-gray-100 transition-all border border-transparent focus:border-indigo-200">
                        <UserCircleIcon className="h-8 w-8 text-indigo-600" />
                        <span className="hidden md:block text-xs font-bold text-gray-700 truncate max-w-[80px]">
                          {user?.name?.split(' ')[0]}
                        </span>
                      </MenuButton>
                      <MenuItems className="absolute right-0 z-50 mt-3 w-56 origin-top-right rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-black/5 focus:outline-none border border-gray-100">
                        <div className="px-3 py-3 mb-2 bg-indigo-50 rounded-xl">
                          <p className="text-[10px] text-indigo-400 uppercase font-black tracking-widest leading-none mb-1">{user?.role}</p>
                          <p className="text-sm font-bold text-gray-800 truncate">{user?.name}</p>
                        </div>
                        <MenuItem>
                          {({ active }) => (
                            <NavLink to="/profile" onClick={() => close()} className={`flex w-full items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${active ? 'bg-gray-50 text-indigo-600' : 'text-gray-700'}`}>
                              My Profile
                            </NavLink>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <NavLink to="/profile/orders" onClick={() => close()} className={`flex w-full items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${active ? 'bg-gray-50 text-indigo-600' : 'text-gray-700'}`}>
                              My Orders
                            </NavLink>
                          )}
                        </MenuItem>
                        <div className="my-2 border-t border-gray-100" />
                        <MenuItem>
                          {({ active }) => (
                            <button onClick={() => { handleLogout(); close(); }} className={`flex w-full items-center px-3 py-2 text-sm font-bold rounded-lg text-red-600 ${active ? 'bg-red-50' : ''}`}>
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
          </div>

          {/* Mobile Panel */}
          <DisclosurePanel className="sm:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white">
            <div className="space-y-1 px-4 pt-2 pb-6 border-t border-gray-50">
              {navigation.map((item) => (
                <DisclosureButton 
                  key={item.name} 
                  as={NavLink} 
                  to={item.href} 
                  className={({ isActive }) => 
                    `block rounded-xl px-4 py-3 text-base font-bold transition-all ${
                      isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 active:bg-gray-50'
                    }`
                  }
                >
                  {item.name}
                </DisclosureButton>
              ))}
              
              {!isLoggedIn && (
                <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-gray-100">
                  <DisclosureButton as={NavLink} to="/login" className="flex items-center justify-center rounded-xl py-3 text-sm font-bold text-gray-700 bg-gray-50">
                    Login
                  </DisclosureButton>
                  <DisclosureButton as={NavLink} to="/signup" className="flex items-center justify-center rounded-xl py-3 text-sm font-bold text-white bg-indigo-600 shadow-md shadow-indigo-100">
                    Sign Up
                  </DisclosureButton>
                </div>
              )}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}