import { useState, useEffect } from "react";
import axios from "axios";
import Items from "./products";

const ProductItems = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/product/getProducts");
        // Update the state with the array from database
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

 
  const biryaniItems = products.filter(item => item.category === 'Biryani' || item.category === 'Main Course');
  const curryItems = products.filter(item => item.category === 'Coastal Curries');

  if (loading) return <div className="text-center py-20">Loading Menu...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      {/* Decorative Brand Element */}
      <div className="pt-16 pb-8 text-center bg-[#fcfaf8]">
        <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-xs">Our Specialty</span>
        <h1 className="text-5xl font-serif italic mt-2">The Seafood Stall</h1>
      </div>

      {/* Signature Biryanis Section */}
      <Items 
        title="Signature Biryanis"
        products={biryaniItems}  
      />
      
      <div className="max-w-7xl mx-auto px-4">
        <hr className="border-orange-50" />
      </div>

      {/* Coastal Curries Section */}
      <Items 
        title="Coastal Curries"
        products={curryItems}  
      />
    </div>
  );
};

export default ProductItems;