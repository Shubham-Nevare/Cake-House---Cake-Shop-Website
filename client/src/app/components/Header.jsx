"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import SearchFilter from "./SearchFilter";
import { useToast } from "../context/ToastContext";
import {
  FaCartPlus,
  FaEnvelope,
  FaFire,
  FaLayerGroup,
  FaPhotoVideo,
  FaShoppingBasket,
  FaShoppingCart,
  FaWhatsapp,
} from "react-icons/fa";
import { FaBirthdayCake, FaStar, FaImages, FaPhone } from "react-icons/fa";

const Header = () => {
  const { items, totalItems, openCart } = useCart();
  const [openMenu, setOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const toast = useToast();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cart pulse animation when items change
  useEffect(() => {
    if (totalItems > 0) {
      setCartPulse(true);
      const timer = setTimeout(() => setCartPulse(false), 600);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  function onSearch(q) {
    if (!q || !q.trim()) {
      window.location.hash = "#bestsellers";
      return;
    }
    try {
      sessionStorage.setItem("sd_search_query", q);
    } catch (e) {}
    toast.show(`🔍 Searching for "${q}"`, { type: "info" });
    const el = document.getElementById("bestsellers");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function navigateToAnchor(anchor) {
    if (!pathname || pathname === "/") {
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      try {
        history.replaceState(null, "", `#${anchor}`);
      } catch (e) {}
      return;
    }

    router.push(`/#${anchor}`);
    setTimeout(() => {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 350);
  }

  const navItems = [
    {
      name: "Categories",
      href: "#categories",
      icon: (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
        >
          <FaBirthdayCake className="w-4 h-4" />
        </motion.div>
      ),
    },
    {
      name: "Best Sellers",
      href: "#bestsellers",
      icon: (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          <FaStar className="w-4 h-4" />
        </motion.div>
      ),
    },
    {
      name: "Gallery",
      href: "#gallery",
      icon: (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          <FaImages className="w-4 h-4" />
        </motion.div>
      ),
    },
    {
      name: "Contact",
      href: "#contact",
      icon: (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        >
          <FaPhone className="w-4 h-4" />
        </motion.div>
      ),
    },
  ];

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const navItemVariants = {
    hover: {
      scale: 1.1,
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className={`fixed inset-x-0 top-0 z-50 h-20 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-pink-200/50"
          : "bg-linear-to-b from-white/90 to-white/70 backdrop-blur-lg shadow-lg border-b border-pink-100/30"
      }`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between gap-6">
        {/* Logo/Brand */}
        <motion.div
          className="flex items-center gap-3 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")}
        >
          <motion.div
            className="relative w-14 h-14 rounded-full bg-linear-to-br from-pink-400 to-orange-400 flex items-center justify-center shadow-lg overflow-hidden"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src="/logoMain.png"
              alt="Sweet Dreams Logo"
              className="w-12 h-12 object-contain"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/30"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          <div className="leading-tight">
            <motion.div
              className="text-xl md:text-2xl font-black bg-linear-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
            >
              Cake House
            </motion.div>
            <motion.div
              className="text-xs text-gray-500 -mt-0.5 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Freshly baked with love 💝
            </motion.div>
          </div>
        </motion.div>

        {/* Search Bar - Desktop */}
        <motion.div
          className="flex-1 hidden lg:flex items-center justify-center px-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-full max-w-2xl">
            <SearchFilter onSearch={onSearch} />
          </div>
        </motion.div>

        {/* Navigation - Desktop */}
        <motion.nav
          className="hidden md:flex items-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                navigateToAnchor(item.href.substring(1));
              }}
              className="flex items-center gap-2 text-sm font-semibold text-chocolate-brown hover:text-pink-600 transition-colors relative group"
              variants={navItemVariants}
              whileHover="hover"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-pink-500 to-orange-500 group-hover:w-full transition-all duration-300"
                layoutId="navIndicator"
              />
            </motion.a>
          ))}
        </motion.nav>

        {/* Action Buttons */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* WhatsApp Button */}
          <motion.button
            onClick={() => {
              // toast.show("💬 Opening WhatsApp chat...", { type: "info" });
              window.open(
                "https://wa.me/915551234567?text=Hi%20Cake%20House%2C%20I%20would%20like%20to%20place%20an%20order.",
                "_blank"
              );
            }}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-linear-to-r from-green-500 to-green-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaWhatsapp className="text-lg" />
            </motion.div>
            <span className="hidden sm:inline-block group-hover:scale-105 transition-transform">
              Chat
            </span>
          </motion.button>

          {/* Cart Button */}
          <motion.button
            onClick={() => openCart()}
            aria-label="Open cart"
            className="relative inline-flex items-center justify-center p-3 rounded-2xl bg-linear-to-br from-pink-500 to-orange-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            animate={cartPulse ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="group-hover:scale-110 transition-transform"
              whileHover={{ rotate: 10 }}
            >
              <FaCartPlus className="w-5 h-5" />
            </motion.div>

            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center font-bold border-2 border-white shadow-lg"
              >
                {totalItems}
              </motion.span>
            )}
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setOpenMenu(!openMenu)}
            className="md:hidden p-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={openMenu ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden border-t border-pink-200/50 bg-white/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6">
              {/* Mobile Search */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6"
              >
                <SearchFilter onSearch={onSearch} />
              </motion.div>

              {/* Mobile Navigation */}
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToAnchor(item.href.substring(1));
                      setOpenMenu(false);
                    }}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-linear-to-br from-pink-50 to-orange-50 border border-pink-200/50 text-chocolate-brown font-semibold hover:shadow-lg transition-all duration-300 group"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <motion.span
                      className="text-2xl group-hover:scale-110 transition-transform"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {item.icon}
                    </motion.span>
                    <span>{item.name}</span>
                  </motion.a>
                ))}
              </motion.div>

              {/* Mobile WhatsApp Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-6"
              >
                <motion.button
                  onClick={() => {
                    // toast.show("💬 Opening WhatsApp chat...", { type: "info" });
                    window.open(
                      "https://wa.me/915551234567?text=Hi%20Cake%20House%2C%20I%20would%20like%20to%20place%20an%20order.",
                      "_blank"
                    );
                    setOpenMenu(false);
                  }}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative z-10"
                  >
                    <FaWhatsapp className="text-xl" />
                  </motion.div>
                  <span className="relative z-10 group-hover:scale-105 transition-transform">
                    Chat on WhatsApp
                  </span>
                </motion.button>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-6 pt-6 border-t border-pink-200/50 text-center"
              >
                <p className="text-sm text-gray-600 mb-2">
                  Need help? We're here!
                </p>
                <div className="flex justify-center gap-4 text-xs text-gray-500">
                  <a
                    href="tel:+915551234567"
                    className="hover:text-chocolate-brown transition-colors"
                  >
                    📞 (555) 123-4567
                  </a>
                  <a
                    href="mailto:info@sweetdreamsbakery.com"
                    className="hover:text-chocolate-brown transition-colors"
                  >
                    ✉️ Email Us
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
