"use client";

import { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { products } from "../data/products";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaShoppingCart,
  FaFilter,
  FaTimes,
} from "react-icons/fa";

const ProductsPage = () => {
  const { addToCart, items: cartItems, openCart, updateQuantity } = useCart();
  const toast = useToast();
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, []);
  const [categoriesOpen, setCategoriesOpen] = useState(true); // Start open by default

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      // Price filter
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      // Rating filter
      const matchesRating = product.rating >= minRating;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [selectedCategories, priceRange, minRating, sortBy, searchQuery]);

  // Favorites functionality
  const toggleFavorite = (id) => {
    const exists = favorites.includes(id);
    const next = exists
      ? favorites.filter((x) => x !== id)
      : [id, ...favorites];
    setFavorites(next);
    toast.show(exists ? "Removed from favorites" : "Added to favorites", {
      type: "info",
    });
  };

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

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setMinRating(0);
    setSearchQuery("");
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-pastel-cream/30 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 pt-20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-chocolate-brown">
                All Products
              </h1>
              <p className="text-gray-600 mt-1">
                Discover our complete collection of {products.length} delicious
                treats
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pastel-pink/50 focus:border-pastel-pink"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pastel-pink/50 focus:border-pastel-pink"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden p-2 border border-gray-200 rounded-2xl hover:bg-gray-50 transition"
              >
                <FaFilter className="text-chocolate-brown" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div
            className={`hidden md:block w-80 shrink-0 ${
              showFilters
                ? "block fixed inset-0 z-50 bg-white p-6 overflow-auto"
                : ""
            }`}
          >
            {showFilters && (
              <div className="flex justify-between items-center mb-6 md:hidden">
                <h2 className="text-xl font-bold text-chocolate-brown">
                  Filters
                </h2>
                <button onClick={() => setShowFilters(false)} className="p-2">
                  <FaTimes className="text-gray-500" />
                </button>
              </div>
            )}

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-chocolate-brown">
                  Filters
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-pastel-pink hover:text-pink-600 font-semibold"
                >
                  Clear All
                </button>
              </div>

              {/* Categories - Collapsible */}
              <div className="mb-6 border border-gray-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-chocolate-brown">
                    Categories
                  </h3>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      categoriesOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    categoriesOpen
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-4 pt-2 bg-white border-t border-gray-100">
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label
                          key={category}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleCategory(category)}
                            className="rounded border-gray-300 text-pastel-pink focus:ring-pastel-pink transition"
                          />
                          <span className="text-gray-700 group-hover:text-chocolate-brown transition-colors">
                            {category}
                          </span>
                          <span className="text-gray-400 text-sm ml-auto">
                            (
                            {
                              products.filter((p) => p.category === category)
                                .length
                            }
                            )
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-chocolate-brown mb-3">
                  Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                </h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹0</span>
                    <span>₹1000</span>
                  </div>
                </div>
              </div>

              {/* Minimum Rating */}
              <div className="mb-6">
                <h3 className="font-semibold text-chocolate-brown mb-3">
                  Minimum Rating
                </h3>
                <div className="flex gap-2">
                  {[0, 4, 4.5, 4.8].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`flex-1 py-2 px-3 rounded-xl border transition ${
                        minRating === rating
                          ? "bg-pastel-pink text-white border-pastel-pink"
                          : "bg-white text-gray-600 border-gray-200 hover:border-pastel-pink"
                      }`}
                    >
                      {rating === 0 ? "Any" : `⭐ ${rating}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing {filteredProducts.length} of {products.length}{" "}
                  products
                </p>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Active Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {category}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="hover:text-blue-600"
                  >
                    ×
                  </button>
                </span>
              ))}
              {(minRating > 0 || priceRange[1] < 1000) && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-1 bg-pastel-pink text-white rounded-full text-sm hover:bg-pink-600 transition"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-xl font-semibold text-chocolate-brown mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-chocolate-brown text-white rounded-2xl hover:bg-chocolate-brown/80 transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => {
                  const cartEntry = cartItems.find(
                    (it) => (it.product?.id ?? it.id) === product.id
                  );

                  return (
                    <motion.div
                      key={product.id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -4 }}
                    >
                      <div className="relative">
                        <Link href={`/product/${product.id}`}>
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover hover:scale-105 transition duration-500"
                            />
                          </div>
                        </Link>

                        {/* Top Left - Category Badge */}
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

                        {/* Top Right - Rating & Favorite */}
                        <div className="absolute top-3 right-3 flex gap-2">
                          {/* Rating */}
                          <span className="bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-xl text-xs font-semibold text-chocolate-brown shadow-sm flex items-center gap-1">
                            <FaStar className="text-yellow-400 text-xs" />
                            {product.rating}
                          </span>

                          {/* Favorite Button */}
                          <button
                            onClick={() => toggleFavorite(product.id)}
                            className={`w-8 h-8 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-200 cursor-pointer ${
                              favorites.includes(product.id)
                                ? "bg-red-500 text-white shadow-md"
                                : "bg-white/95 text-gray-400 hover:text-red-500 hover:shadow-md"
                            }`}
                          >
                            {favorites.includes(product.id) ? (
                              <FaHeart className="text-xs" />
                            ) : (
                              <FaRegHeart className="text-xs" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="p-5">
                        {/* Product Name and Price */}
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-chocolate-brown mb-1 line-clamp-1">
                              <Link
                                href={`/product/${product.id}`}
                                className="hover:text-pastel-pink transition"
                              >
                                {product.name}
                              </Link>
                            </h3>
                          </div>
                          <span className="text-lg font-bold text-pastel-pink ml-2">
                            ₹{product.price}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Cart Controls */}
                        {!cartEntry ? (
                          <button
                            onClick={() => {
                              addToCart(product, 1);
                              toast.show(`Added ${product.name} to cart`, {
                                type: "success",
                              });
                            }}
                            className="w-full py-2.5 rounded-xl bg-linear-to-r from-pastel-pink to-pink-500 text-white font-semibold text-sm hover:from-pastel-pink hover:to-pink-400 transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <FaShoppingCart className="text-xs" />
                            Add to Cart
                          </button>
                        ) : (
                          <div className="flex gap-2">
                            <div className="flex-1 flex items-center justify-between bg-gray-100 rounded-xl px-3 py-2">
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
                                className="w-7 h-7 rounded-lg bg-white flex items-center justify-center hover:bg-gray-50 transition text-sm font-semibold cursor-pointer"
                              >
                                −
                              </button>
                              <span className="font-semibold text-chocolate-brown text-sm">
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
                                className="w-7 h-7 rounded-lg bg-white flex items-center justify-center hover:bg-gray-50 transition text-sm font-semibold cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={openCart}
                              className="px-3 py-2 rounded-xl bg-chocolate-brown text-white font-semibold text-sm hover:bg-chocolate-brown/80 transition shadow-md hover:shadow-lg cursor-pointer"
                            >
                              View Cart
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {showFilters && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};

export default ProductsPage;
