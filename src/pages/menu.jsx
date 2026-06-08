// src/pages/ModernMenu.jsx
import React, {
  useState, useEffect, useContext,
  useTransition, useDeferredValue, useOptimistic,
  useMemo, useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  Search, ShoppingBag, Loader2,
  X, SlidersHorizontal, ChevronLeft, ChevronRight,
} from 'lucide-react';
import api from '../axios/axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const ITEMS_PER_PAGE = 12;

/* ─── helpers ──────────────────────────────────────────────────────────────── */
const getCategories = (products) =>
  [...new Set(products.map((p) => p.category))].sort();

const getPriceCeiling = (products) =>
  products.length ? Math.max(...products.map((p) => p.price)) : 1500;

/* ═══════════════════════════════════════════════════════════════════════════ */
const ModernMenu = () => {
  const navigate = useNavigate();
  const { user }                    = useContext(AuthContext);
  const { addToCart, cartItems }    = useContext(CartContext);

  /* ── server data ── */
  const [allProducts,  setAllProducts]  = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);

  /* ── filter state ── */
  const [searchQuery,   setSearchQuery]   = useState('');
  const [selectedCats,  setSelectedCats]  = useState([]);
  const [maxPrice,      setMaxPrice]      = useState(1500);
  const [currentPage,   setCurrentPage]   = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  /* ── React 18 ── */
  const [isPending, startTransition] = useTransition();
  const deferredSearch = useDeferredValue(searchQuery);

  /* ── optimistic cart ── */
  // Normalizing the state structure to match the cart array elements safely
  const [optimisticCart, setOptimisticCart] = useOptimistic(
    cartItems || [],
    (state, newItem) => [...state, newItem],
  );

  /* ══════════════════════════════════════════════════════════════════════════
   * FETCH — single call to /api/product/allProducts (returns a plain array).
   * Filtering, search, and pagination are all client-side.
   * ═══════════════════════════════════════════════════════════════════════ */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/api/product/allProducts');
        const data = Array.isArray(res.data) ? res.data : [];
        if (!cancelled) {
          setAllProducts(data);
          setMaxPrice(getPriceCeiling(data));
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
            'Failed to load menu. Check your network and try again.'
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  /* ── derived ── */
  const categories   = useMemo(() => getCategories(allProducts),   [allProducts]);
  const priceCeiling = useMemo(() => getPriceCeiling(allProducts), [allProducts]);

  /* ── client-side filter + search ── */
  const filteredProducts = useMemo(() => {
    const q = deferredSearch.toLowerCase().trim();
    return allProducts.filter((p) => {
      const matchCat   = selectedCats.length === 0 || selectedCats.includes(p.category);
      const matchPrice = p.price <= maxPrice;
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q);
      return matchCat && matchPrice && matchSearch;
    });
  }, [allProducts, selectedCats, maxPrice, deferredSearch]);

  /* ── pagination ── */
  const totalPages    = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const safePage      = Math.min(currentPage, totalPages);
  const pagedProducts = filteredProducts.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  // reset to page 1 whenever filters change
  useEffect(() => { setCurrentPage(1); }, [deferredSearch, selectedCats, maxPrice]);

  /* ── handlers ── */
  const toggleCategory = useCallback((name) => {
    startTransition(() => {
      setSelectedCats((prev) =>
        prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name],
      );
    });
  }, []);

  const clearFilters = useCallback(() => {
    startTransition(() => {
      setSelectedCats([]);
      setMaxPrice(priceCeiling);
      setSearchQuery('');
    });
  }, [priceCeiling]);

  const handleAddToCart = useCallback(async (item, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!user) { 
      Swal.fire({
        title: 'Welcome!',
        text: 'Please login to start your beach order.',
        icon: 'info',
        confirmButtonColor: '#f97316',
      });
      navigate('/login');
      return;
    }

    // Explicitly structure payload to mirror the line-item shape used in CartContext tracking
    const cartPayload = { productId: item._id, name: item.name, price: item.price, quantity: 1 };
    
    setOptimisticCart(cartPayload);
    try {
      await addToCart(cartPayload);
      Swal.fire({
        toast: true, 
        position: 'top-end', 
        icon: 'success',
        title: `${item.name} added!`, 
        showConfirmButton: false, 
        timer: 1500,
      });
    } catch (error) {
      console.error("Cart synchronization error:", error);
      Swal.fire('Error', 'Could not add item. Please try again.', 'error');
    }
  }, [user, navigate, addToCart, setOptimisticCart]);

  // Robust deep match supporting schema layouts checking product targets directly
  const isInCart = useCallback(
    (id) => {
      return (optimisticCart || []).some((c) => {
        const itemProductId = c.productId || c.product?._id || c._id;
        return itemProductId === id;
      });
    },
    [optimisticCart],
  );

  const activeFilterCount = selectedCats.length + (maxPrice < priceCeiling ? 1 : 0);

  /* ══════════════════════════════════════════════════════════════════════════
   * RENDER
   * ═══════════════════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex pt-[80px] font-sans">

      {/* mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className={`
        fixed md:sticky top-0 md:top-[80px] left-0
        h-full md:h-[calc(100vh-80px)]
        w-72 bg-white dark:bg-zinc-900 z-50
        p-6 border-r border-zinc-100 dark:border-zinc-800
        overflow-y-auto transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xs font-black uppercase tracking-widest dark:text-white">
            Refine Your Feast
          </h2>
          <button
            className="md:hidden p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={18} className="dark:text-white" />
          </button>
        </div>

        {/* clear button */}
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="mb-6 w-full py-2 text-xs font-bold uppercase tracking-widest text-orange-500 border border-orange-300 dark:border-orange-700 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-950 transition-colors"
          >
            Clear {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''}
          </button>
        )}

        {/* categories */}
        <div className="mb-8">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">
            Category
          </p>
          {categories.length === 0 ? (
            <p className="text-xs text-zinc-400 italic">Loading…</p>
          ) : (
            categories.map((cat) => (
              <label key={cat} className="flex items-center gap-3 mb-3 cursor-pointer group">
                <span className={`
                  w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all
                  ${selectedCats.includes(cat)
                    ? 'bg-orange-500 border-orange-500'
                    : 'border-zinc-300 dark:border-zinc-600 group-hover:border-orange-400'}
                `}>
                  {selectedCats.includes(cat) && (
                    <svg viewBox="0 0 10 8" className="w-2.5 h-2.5">
                      <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" fill="none"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={selectedCats.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                <span className={`text-sm font-semibold flex-1 transition-colors ${
                  selectedCats.includes(cat)
                    ? 'text-orange-500'
                    : 'text-zinc-600 dark:text-zinc-400 group-hover:text-orange-400'
                }`}>
                  {cat}
                </span>
                <span className="text-[10px] text-zinc-400">
                  {allProducts.filter((p) => p.category === cat).length}
                </span>
              </label>
            ))
          )}
        </div>

        {/* price range */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              Max Price
            </p>
            <span className="text-sm font-black text-orange-500">₹{maxPrice}</span>
          </div>
          <input
            type="range"
            min="100"
            max={priceCeiling}
            step="50"
            value={maxPrice}
            onChange={(e) => startTransition(() => setMaxPrice(Number(e.target.value)))}
            className="w-full accent-orange-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
            <span>₹100</span>
            <span>₹{priceCeiling}</span>
          </div>
        </div>

        <p className="text-xs text-zinc-400 text-center pt-4 border-t border-zinc-100 dark:border-zinc-800">
          {filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''} found
        </p>
      </aside>

      {/* ── Main ────────────────────────────────────────────────────────── */}
      <main className="flex-1 min-w-0 p-4 md:p-10">
        <div className="max-w-5xl mx-auto">

          {/* search + mobile filter toggle */}
          <div className="flex gap-3 mb-8">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                size={18}
              />
              <input
                type="text"
                value={searchQuery}
                placeholder="Search dishes, categories…"
                className="w-full pl-12 pr-10 py-3.5 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-orange-500 transition-all dark:text-white text-sm"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                  onClick={() => setSearchQuery('')}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <button
              className="md:hidden relative flex items-center gap-2 px-4 py-3.5 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm text-sm font-semibold dark:text-white"
              onClick={() => setIsSidebarOpen(true)}
            >
              <SlidersHorizontal size={18} />
              Filters
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-orange-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* active filter chips */}
          {(selectedCats.length > 0 || searchQuery) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCats.map((cat) => (
                <span key={cat} className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-bold rounded-full">
                  {cat}
                  <button onClick={() => toggleCategory(cat)}><X size={12} /></button>
                </span>
              ))}
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-bold rounded-full">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')}><X size={12} /></button>
                </span>
              )}
            </div>
          )}

          {/* ── states ── */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="animate-spin text-orange-500" size={40} />
              <p className="text-sm text-zinc-400">Loading menu…</p>
            </div>

          ) : error ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
              <p className="text-3xl">🌊</p>
              <p className="text-zinc-600 dark:text-zinc-400 font-semibold">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-bold hover:bg-orange-600 transition-colors"
              >
                Retry
              </button>
            </div>

          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 gap-3">
              <p className="text-4xl">🐟</p>
              <p className="text-zinc-500 dark:text-zinc-400 font-semibold">
                No dishes match your filters.
              </p>
              <button onClick={clearFilters} className="text-orange-500 text-sm font-bold hover:underline">
                Clear all filters
              </button>
            </div>

          ) : (
            <>
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-200 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
                {pagedProducts.map((item) => (
                  <ProductCard
                    key={item._id}
                    item={item}
                    inCart={isInCart(item._id)}
                    onAddToCart={(e) => handleAddToCart(item, e)} 
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={safePage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

/* ── ProductCard ────────────────────────────────────────────────────────────── */
const ProductCard = React.memo(({ item, inCart, onAddToCart }) => (
  <div className="group bg-white dark:bg-zinc-900 rounded-[1.75rem] overflow-hidden border border-zinc-100 dark:border-zinc-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className="relative h-52 overflow-hidden">
      <img
        src={item.image || 'https://images.unsplash.com/photo-1589187151003-0dd3c63b47e9?q=80&w=500'}
        alt={item.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute top-3 left-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase text-orange-600 tracking-wider shadow-sm">
        {item.category}
      </div>
      {item.isFeatured && (
        <div className="absolute top-3 right-3 bg-orange-500 px-2.5 py-1 rounded-full text-[10px] font-black uppercase text-white tracking-wider shadow-sm">
          ★ Featured
        </div>
      )}
    </div>

    <div className="p-5">
      <div className="flex justify-between items-start gap-2 mb-1.5">
        <h3 className="text-[15px] font-black uppercase dark:text-white leading-tight line-clamp-2">
          {item.name}
        </h3>
        <p className="text-lg font-black text-orange-600 whitespace-nowrap flex-shrink-0">
          ₹{item.price}
        </p>
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 italic mb-5 line-clamp-2">
        {item.description}
      </p>
      <button
        onClick={(e) => onAddToCart(e)}
        disabled={inCart}
        className={`
          w-full py-3 rounded-xl font-bold text-xs uppercase tracking-widest
          flex items-center justify-center gap-2 transition-all duration-200
          ${inCart
            ? 'bg-green-500 text-white cursor-default'
            : 'bg-zinc-900 dark:bg-orange-600 text-white hover:bg-orange-500 dark:hover:bg-orange-500 active:scale-95'}
        `}
      >
        <ShoppingBag size={14} />
        {inCart ? 'In Order ✓' : 'Add to Order'}
      </button>
    </div>
  </div>
));
ProductCard.displayName = 'ProductCard';

/* ── Pagination ─────────────────────────────────────────────────────────────── */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const allPages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visible  = allPages.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1,
  );

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPageChange((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 disabled:opacity-30 hover:border-orange-400 transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} className="dark:text-white" />
      </button>

      {visible.reduce((acc, p, idx) => {
        if (idx > 0 && p - visible[idx - 1] > 1) {
          acc.push(<span key={`gap-${p}`} className="px-1 text-zinc-400 text-sm">…</span>);
        }
        acc.push(
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
              p === currentPage
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 dark:text-white hover:border-orange-400'
            }`}
          >
            {p}
          </button>,
        );
        return acc;
      }, [])}

      <button
        onClick={() => onPageChange((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 disabled:opacity-30 hover:border-orange-400 transition-colors"
        aria-label="Next page"
      >
        <ChevronRight size={16} className="dark:text-white" />
      </button>
    </div>
  );
};

export default ModernMenu;