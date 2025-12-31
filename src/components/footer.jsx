import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Send } from 'lucide-react'; // More modern icon set

const footerNavs = [
  { 
    label: 'Explore', 
    items: [
      { name: 'About Our Story', href: "/about" }, 
      { name: 'Fresh Menu', href: '/menu' }, 
      { name: 'Reserve a Table', href: "/booktable" },
      { name: 'Contact Us', href: "/contact" }
    ] 
  },
  { 
    label: 'Support', 
    items: [
      { name: 'Help Center', href: "#" }, 
      { name: 'Terms of Service', href: "#" }, 
      { name: 'Privacy Policy', href: "#" }
    ] 
  },
  { 
    label: 'Resources', 
    items: [
      { name: 'Coastal Blog', href: "#" }, 
      { name: 'Cooking Guides', href: "#" }, 
      { name: 'FAQs', href: "#" }
    ] 
  },
];

const socialIcons = [
  { icon: FaFacebook, href: '#', label: 'Facebook' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaLinkedin, href: '#', label: 'Linkedin' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#05080a] text-white pt-24 pb-12 overflow-hidden">
      {/* Decorative Background Glow */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 mb-16">
          
          {/* 🚀 Brand Section & Newsletter */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h3 className="text-4xl font-serif italic font-bold tracking-tight text-white">
                Beach <span className="text-indigo-400">Stall.</span>
              </h3>
              <p className="mt-4 text-gray-400 text-lg leading-relaxed max-w-md">
                Experience the authentic taste of the coast. We bring fresh, 
                chef-crafted seafood directly from the docks to your table.
              </p>
            </div>

            {/* Newsletter Input */}
            <div className="max-w-sm">
              <label className="text-sm font-semibold uppercase tracking-widest text-gray-300 mb-3 block">
                Join the Voyage
              </label>
              <div className="relative flex items-center">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
                <button className="absolute right-2 p-2.5 bg-indigo-500 hover:bg-indigo-400 rounded-xl transition-colors shadow-lg shadow-indigo-500/20">
                  <Send size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* 🔗 Links Sections */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerNavs.map((section, index) => (
              <div key={index}>
                <h4 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-400 mb-6">
                  {section.label}
                </h4>
                <ul className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <a 
                        href={item.href} 
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-base flex items-center group"
                      >
                        <span className="w-0 group-hover:w-2 h-[2px] bg-indigo-400 mr-0 group-hover:mr-2 transition-all duration-300" />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 📱 Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col items-center justify-between gap-6 sm:flex-row">
          
          <div className="flex space-x-4 order-1 sm:order-2">
            {socialIcons.map((social, index) => (
              <a 
                key={index} 
                href={social.href} 
                className="p-3 bg-white/5 hover:bg-indigo-500 rounded-2xl text-gray-400 hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xl"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <p className="text-sm text-gray-500 order-2 sm:order-1 font-medium">
            &copy; {new Date().getFullYear()} Beach Stall. Crafted for Coastal Lovers.
          </p>
          
        </div>
      </div>
    </footer>
  );
}