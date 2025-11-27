"use client";

import { useEffect, useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { motion } from "framer-motion";
import Link from "next/link";
import { useToast } from "../context/ToastContext";
import { FaHeart, FaRegHeart, FaStar, FaShoppingCart } from "react-icons/fa";

const BestSellers = ({ query = "" }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const {
    addToCart,
    items: cartItems = [],
    openCart,
    updateQuantity,
  } = useCart();
  const toast = useToast();
  const [favorites, setFavorites] = useState([]);

  // Use useMemo to prevent recreation on every render - Only top 6 highest rated
  const featuredProducts = useMemo(() => {
    return [...products].sort((a, b) => b.rating - a.rating).slice(0, 6);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sd_favorites") || "[]";
      setFavorites(JSON.parse(raw));
    } catch (e) {
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("sd_favorites", JSON.stringify(favorites));
    } catch (e) {
      /* ignore */
    }
  }, [favorites]);

  function toggleFavorite(id) {
    const exists = favorites.includes(id);
    const next = exists
      ? favorites.filter((x) => x !== id)
      : [id, ...favorites];
    setFavorites(next);
    toast.show(exists ? "Removed from favorites" : "Added to favorites", {
      type: "info",
    });
  }

  useEffect(() => {
    const q = (query || "").trim().toLowerCase();
    if (!q) {
      setFilteredProducts(featuredProducts);
      return;
    }

    // When searching, only search within featured products
    setFilteredProducts(
      featuredProducts.filter((p) => {
        return (
          p.name.toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q) ||
          (p.category || "").toLowerCase().includes(q)
        );
      })
    );
  }, [query, featuredProducts]);

  const getCategoryColor = (category) => {
    const colors = {
      Birthday: "bg-blue-100 text-blue-800 border-blue-200",
      Wedding: "bg-purple-100 text-purple-800 border-purple-200",
      Custom: "bg-green-100 text-green-800 border-green-200",
      Cupcakes: "bg-pink-100 text-pink-800 border-pink-200",
      Pastries: "bg-orange-100 text-orange-800 border-orange-200",
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <section
      id="bestsellers"
      className="py-16 bg-linear-to-b from-pastel-cream/60 to-white"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* heading */}
        <div className="text-center mb-12">
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pastel-pink/20 text-[11px] font-semibold uppercase tracking-[0.25em] text-pink-500 mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ✨ Best sellers
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-chocolate-brown mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Freshly baked favourites
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Handcrafted cakes and pastries, made with premium ingredients and a
            whole lot of love.
          </motion.p>
        </div>

        {/* cards - Only shows 6 products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-12">
              <div className="text-6xl mb-4">🍰</div>
              <p className="text-lg font-semibold mb-2">No products found</p>
              <p className="text-gray-600">Try adjusting your search terms</p>
            </div>
          ) : (
            filteredProducts.map((product, index) => {
              const cartEntry = cartItems.find(
                (it) => (it.product?.id ?? it.id) === product.id
              );

              return (
                <motion.div
                  key={product.id}
                  className="group bg-white rounded-3xl shadow-[0_18px_35px_rgba(15,23,42,0.06)] overflow-hidden border border-pastel-cream hover:shadow-[0_22px_45px_rgba(15,23,42,0.10)] transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.07,
                    duration: 0.5,
                  }}
                  whileHover={{ y: -4 }}
                >
                  {/* image + top badges */}
                  <div className="relative">
                    <Link href={`/product/${product.id}`}>
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>

                    {/* category badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                          product.category
                        )} backdrop-blur-sm shadow-sm`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
                        {product.category}
                      </span>
                    </div>

                    {/* fav + rating */}
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${
                          favorites.includes(product.id)
                            ? "bg-red-500 text-white shadow-md"
                            : "bg-white/95 text-gray-400 hover:text-red-500 hover:shadow-md"
                        }`}
                      >
                        {favorites.includes(product.id) ? (
                          <FaHeart className="text-sm" />
                        ) : (
                          <FaRegHeart className="text-sm" />
                        )}
                      </button>
                      <span className="bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-xl text-xs font-semibold text-chocolate-brown shadow-sm flex items-center gap-1">
                        <FaStar className="text-yellow-400 text-xs" />
                        {product.rating}
                      </span>
                    </div>
                  </div>

                  {/* content */}
                  <div className="p-5 pb-5">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 pr-2">
                        <h3 className="text-lg md:text-xl font-semibold text-chocolate-brown mb-1 line-clamp-1">
                          <Link
                            href={`/product/${product.id}`}
                            className="hover:text-pastel-pink transition-colors duration-200"
                          >
                            {product.name}
                          </Link>
                        </h3>
                      </div>
                      <span className="text-xl font-extrabold text-pastel-pink whitespace-nowrap">
                        ₹{product.price}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* CTA / quantity */}
                    {!cartEntry ? (
                      <motion.button
                        onClick={() => {
                          addToCart(product, 1);
                          toast.show(`Added ${product.name} to cart`, {
                            type: "success",
                          });
                        }}
                        className="w-full py-2.5 rounded-xl bg-linear-to-r from-pastel-pink to-pink-500 
               text-white font-semibold text-sm shadow-md 
               hover:shadow-lg hover:to-pink-400 
               transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <FaShoppingCart className="text-[13px]" />
                        Add to Cart
                      </motion.button>
                    ) : (
                      <div className="flex items-center justify-between gap-2">
                        {/* Quantity Box */}
                        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-2 py-1.5 border border-gray-200">
                          <button
                            onClick={() =>
                              updateQuantity(
                                cartItems.findIndex(
                                  (it) =>
                                    (it.product?.id ?? it.id) === product.id
                                ),
                                Math.max(1, cartEntry.quantity - 1)
                              )
                            }
                            className="w-8 h-8 rounded-lg bg-white flex items-center justify-center 
                   hover:bg-gray-100 transition shadow-sm text-sm font-semibold cursor-pointer"
                          >
                            −
                          </button>

                          <span className="min-w-6 text-center font-semibold text-chocolate-brown text-sm">
                            {cartEntry.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(
                                cartItems.findIndex(
                                  (it) =>
                                    (it.product?.id ?? it.id) === product.id
                                ),
                                cartEntry.quantity + 1
                              )
                            }
                            className="w-8 h-8 rounded-lg bg-white flex items-center justify-center 
                   hover:bg-gray-100 transition shadow-sm text-sm font-semibold cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* View Cart Button */}
                        <button
                          onClick={openCart}
                          className="px-4 py-2 rounded-xl bg-chocolate-brown text-white 
                 font-semibold text-sm hover:bg-chocolate-brown/85 
                 transition shadow-md whitespace-nowrap cursor-pointer"
                        >
                          View Cart
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* view all */}
        {!query && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-chocolate-brown text-white font-semibold hover:bg-chocolate-brown/85 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl group text-sm md:text-base"
            >
              View All Products
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BestSellers;
