import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

// Define the navigation links and social icons
const footerNavs = [
  { label: 'Company', 
    items: [{name:'About Us', href:"/about"}, {name:'Menu', href:'/menu'}, {name:'Book A table', href:"/booktable"},
            {name:'Contact', href:"/contact"}
    ] },
  { label: 'Support', items: ['Help Center', 'Terms of Service', 'Privacy Policy'] },
  { label: 'Resources', items: ['Blog', 'Guides', 'FAQs'] },
];

const socialIcons = [
  { icon: FaFacebook, href: '#' },
  { icon: FaTwitter, href: '#' },
  { icon: FaInstagram, href: '#' },
  { icon: FaLinkedin, href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-700">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-12">
          
          {/* 🚀 Brand/Logo Section (Col 1-3 on large screens) */}
          <div className="col-span-2 md:col-span-6 lg:col-span-3">
            <h3 className="text-3xl font-bold text-indigo-400">Beach Stall</h3>
            <p className="mt-4 text-gray-400 text-sm max-w-xs">
              Bringing the taste of the coast right to your table, every single day.
            </p>
          </div>

          {/* 🔗 Navigation Links (Col 4-12 on large screens) */}
          {footerNavs.map((section, index) => (
            <div key={index} className="col-span-1 md:col-span-2 lg:col-span-3">
              <h4 className="text-lg font-semibold mb-4 text-white">{section.label}</h4>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a 
                      href={item.href} 
                      className="text-gray-400 hover:text-indigo-400 transition duration-150 ease-in-out text-base"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col items-center justify-between sm:flex-row">
          
          {/* © Copyright Notice */}
          <p className="text-sm text-gray-400 order-2 sm:order-1 mt-4 sm:mt-0">
            &copy; {new Date().getFullYear()} Beach Stall. All rights reserved.
          </p>
          
          {/* 📱 Social Media Icons */}
          <div className="flex space-x-6 order-1 sm:order-2">
            {socialIcons.map((social, index) => (
              <a 
                key={index} 
                href={social.href} 
                className="text-gray-400 hover:text-indigo-400 transition duration-150 ease-in-out"
                aria-label={social.icon.name}
              >
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}