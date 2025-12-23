import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, UserCircleIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
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
  // { name: 'Cart', href: '/cart' },
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
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              
              {/* Mobile Menu Button (Left) */}
              <div className="flex items-center sm:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-7 w-7" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-7 w-7" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>

              {/* Logo (Centered on mobile, Left on desktop) */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <span className="text-2xl font-black tracking-tight text-indigo-600 cursor-pointer" onClick={() => navigate('/')}>
                    BEACH STALL
                  </span>
                </div>
                {/* Desktop Navigation */}
                <div className="hidden sm:ml-10 sm:flex sm:space-x-4">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        `px-3 py-2 text-sm font-medium transition-colors ${
                          isActive ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-500'
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Right Section: Cart + Auth */}
              <div className="flex items-center space-x-2 sm:space-x-6">            
                
                <NavLink to="/cart" className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors">
                   <CartBadge /> {/* Ensure CartBadge component handles the icon or wrap it here */}
                </NavLink>

                {/* Desktop Auth Logic */}
                <div className="hidden sm:flex sm:items-center sm:space-x-4">
                  {!isLoggedIn ? (
                    <>
                      <NavLink to="/login" className="text-sm font-semibold text-gray-700 hover:text-indigo-600">Login</NavLink>
                      <NavLink to="/signup" className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all">
                        Get Started
                      </NavLink>
                    </>
                  ) : (
                    <Menu as="div" className="relative ml-3">
                      <MenuButton className="flex items-center space-x-3 rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 p-1">
                        <span className="hidden lg:block text-sm font-medium text-gray-700">
                           {user?.name}
                        </span>
                        <UserCircleIcon className="h-8 w-8 text-gray-400 hover:text-indigo-600 transition-colors" />
                      </MenuButton>
                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-4 py-2 border-b border-gray-50">
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">{user?.role}</p>
                        </div>
                        <MenuItem>
                          <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Profile</NavLink>
                        </MenuItem>
                        <MenuItem>
                          <NavLink to="/profile/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Orders</NavLink>
                        </MenuItem>
                        {/* <MenuItem>
                          <NavLink to={user?.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Orders</NavLink>
                        </MenuItem> */}
                        <hr className="my-1 border-gray-100" />
                        <MenuItem>
                          <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign out</button>
                        </MenuItem>
                      </MenuItems>
                    </Menu>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Panel */}
          <DisclosurePanel className="sm:hidden bg-white border-t border-gray-100">
            <div className="space-y-1 px-4 pt-2 pb-3">
              {navigation.map((item) => (
                <DisclosureButton 
                  key={item.name} 
                  as={NavLink} 
                  to={item.href} 
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pb-3 pt-4 px-4">
              {!isLoggedIn ? (
                <div className="space-y-2">
                  <DisclosureButton as={NavLink} to="/login" className="block w-full text-center py-2 text-base font-medium text-gray-700">Login</DisclosureButton>
                  <DisclosureButton as={NavLink} to="/signup" className="block w-full text-center py-3 bg-indigo-600 text-white rounded-xl font-bold">Sign Up</DisclosureButton>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex items-center px-3 mb-3">
                    <UserCircleIcon className="h-10 w-10 text-gray-400" />
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">{user?.name}</div>
                      <div className="text-sm font-medium text-gray-500">{user?.role}</div>
                    </div>
                  </div>
                  <DisclosureButton as={NavLink} to="/profile" className="block rounded-md px-3 py-2 text-base font-medium text-gray-600">My Profile</DisclosureButton>
                  <DisclosureButton as={NavLink} to={user?.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'} className="block rounded-md px-3 py-2 text-base font-medium text-gray-600">Dashboard</DisclosureButton>
                  <button onClick={handleLogout} className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-red-600">Sign Out</button>
                </div>
              )}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}