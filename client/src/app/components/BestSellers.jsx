"use client";

import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useToast } from '../context/ToastContext';

const BestSellers = ({ query = '' }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const { addToCart, items: cartItems = [], removeProductById, openCart, updateQuantity } = useCart();
  const toast = useToast();
  const [favorites, setFavorites] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem('sd_favorites') || '[]';
      setFavorites(JSON.parse(raw));
    } catch (e) {
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('sd_favorites', JSON.stringify(favorites));
    } catch (e) {
      // ignore
    }
  }, [favorites]);

  function toggleFavorite(id) {
    // avoid calling toast.show from inside a state updater function
    const exists = favorites.includes(id);
    const next = exists ? favorites.filter((x) => x !== id) : [id, ...favorites];
    setFavorites(next);
    // show notification after we schedule the update
    toast.show(exists ? 'Removed from favorites' : 'Added to favorites', { type: 'info' });
  }

  useEffect(() => {
    const q = (query || '').trim().toLowerCase();
    if (!q) {
      setFilteredProducts(products);
      return;
    }

    setFilteredProducts(
      products.filter((p) => {
        return (
          p.name.toLowerCase().includes(q) ||
          (p.description || '').toLowerCase().includes(q) ||
          (p.category || '').toLowerCase().includes(q)
        );
      })
    );
  }, [query]);

  return (
    <section id="bestsellers" className="py-16 bg-pastel-cream">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-chocolate-brown mb-12">Best Sellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-8">No products found for your search.</div>
          ) : (
            filteredProducts.slice(0, 6).map((product) => {
            const cartEntry = cartItems.find((it) => (it.product?.id ?? it.id) === product.id);
            const qtyValue = quantities[product.id] ?? cartEntry?.quantity ?? 1;
            return (
            <motion.div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <Link href={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              </Link>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-chocolate-brown mb-2">
                  <Link href={`/product/${product.id}`} className="hover:underline">{product.name}</Link>
                </h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-pastel-pink">₹{product.price}</span>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="text-gray-600">{product.rating}</span>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  { !cartEntry ? (
                    /* Not in cart: large Add to cart + heart */
                    <>
                      <button
                        onClick={() => {
                          const qty = quantities[product.id] ?? qtyValue;
                          addToCart(product, qty);
                          toast.show(`Added ${qty} × ${product.name} to cart`, { type: 'success' });
                        }}
                        className="flex-1 px-6 py-3 rounded-2xl bg-linear-to-r from-[#FCE6F1] via-pastel-pink to-[#FFDDE7] hover:from-[#fdeff7] hover:to-[#ffecf5] text-chocolate-brown font-semibold transition transform hover:-translate-y-0.5 shadow-sm border border-pink-100"
                      >
                        Add to cart
                      </button>

                      <button
                        onClick={() => toggleFavorite(product.id)}
                        aria-label="Toggle favorite"
                        className={`ml-3 w-11 h-11 rounded-full flex items-center justify-center border ${favorites.includes(product.id) ? 'bg-white border-red-200 text-red-500 shadow-sm' : 'bg-white border-gray-200 text-gray-400 hover:text-red-500'}`}
                      >
                        <span className="text-lg leading-none">{favorites.includes(product.id) ? '♥' : '♡'}</span>
                      </button>
                    </>
                  ) : (
                    /* In cart: qty pill | Go to cart | heart */
                    <>
                      <div className="inline-flex items-center gap-0 border border-gray-200 rounded-2xl px-3 py-2 bg-white shadow-sm">
                        <button
                          aria-label="Decrease qty"
                          onClick={() => updateQuantity(cartItems.findIndex(it => (it.product?.id ?? it.id) === product.id), Math.max(1, (quantities[product.id] ?? cartEntry.quantity) - 1))}
                          className="px-1 py-1 rounded-md text-lg text-gray-700 hover:bg-gray-50 transition"
                        >−</button>
                        <div className="px-4 py-1 text-base font-semibold">{quantities[product.id] ?? cartEntry.quantity}</div>
                        <button
                          aria-label="Increase qty"
                          onClick={() => updateQuantity(cartItems.findIndex(it => (it.product?.id ?? it.id) === product.id), (quantities[product.id] ?? cartEntry.quantity) + 1)}
                          className="px-1 py-1 rounded-md text-lg text-gray-700 hover:bg-gray-50 transition"
                        >+</button>
                      </div>

                      <button
                        onClick={() => openCart()}
                        className="px-4 py-2 rounded-2xl border-2 border-gray-100 bg-white text-chocolate-brown font-semibold hover:shadow-md transition mx-2"
                      >
                        Go to cart
                      </button>

                      <button
                        onClick={() => toggleFavorite(product.id)}
                        aria-label="Toggle favorite"
                        className={`w-11 h-11 rounded-full flex items-center justify-center border ${favorites.includes(product.id) ? 'bg-white border-red-200 text-red-500 shadow-sm' : 'bg-white border-gray-200 text-gray-400 hover:text-red-500'}`}
                      >
                        <span className="text-lg leading-none">{favorites.includes(product.id) ? '♥' : '♡'}</span>
                      </button>
                    </>
                  ) }
                  {/* controls replaced by above conditional block */}
                </div>
              </div>
            </motion.div>
            );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
