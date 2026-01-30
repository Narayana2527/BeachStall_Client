import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const CartBadge = () => {
  const { cart } = useContext(CartContext);
  const [isAnimate, setIsAnimate] = useState(false);
  
  // Calculate total quantity of items in cart
  const totalItems = Array.isArray(cart) 
    ? cart.reduce((acc, item) => acc + item.quantity, 0) 
    : 0;

  // Trigger a "pop" animation whenever the totalItems count changes
  useEffect(() => {
    if (totalItems === 0) return;
    setIsAnimate(true);
    const timer = setTimeout(() => setIsAnimate(false), 300);
    return () => clearTimeout(timer);
  }, [totalItems]);

  return (
    <Link 
      to="/cart" 
      className="relative inline-flex items-center p-2 group transition-all duration-200"
      aria-label="View Cart"
    >
      {/* Icon with hover effect */}
      <ShoppingCartIcon 
        className={`h-7 w-7 text-zinc-700 dark:text-zinc-300 group-hover:text-orange-500 transition-colors duration-200 ${
          isAnimate ? 'scale-110' : 'scale-100'
        }`} 
      />
      
      {/* Counter Badge */}
      {totalItems > 0 && (
        <span 
          className={`absolute top-1 right-1 bg-orange-600 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center shadow-lg ring-2 ring-white dark:ring-zinc-950 transition-transform duration-300 ${
            isAnimate ? 'scale-125' : 'scale-100'
          }`}
        >
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartBadge;