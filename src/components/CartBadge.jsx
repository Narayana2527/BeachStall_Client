// components/CartBadge.jsx
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/24/outline'; // IMPORT THIS

const CartBadge = () => {
  const { cart } = useContext(CartContext);
  
  // Safeguard: Ensure cart is an array before reducing
  const totalItems = Array.isArray(cart) 
    ? cart.reduce((acc, item) => acc + item.quantity, 0) 
    : 0;

  return (
    <div className="relative inline-flex items-center p-1">
      {/* 1. ADD THE ICON HERE so it's visible */}
      <ShoppingCartIcon className="h-7 w-7 text-gray-600 hover:text-indigo-600 transition-colors" />
      
      {/* 2. THE BADGE */}
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </div>
  );
};

export default CartBadge;