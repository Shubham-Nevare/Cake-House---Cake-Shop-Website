"use client";

import { useCart } from "../context/CartContext";
import { FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const WhatsAppButton = ({ phoneNumber = "+15551234567" }) => {
  const { open } = useCart();
  const [showTooltip, setShowTooltip] = useState(false);

  if (open) return null;
  
  const href = `https://wa.me/${phoneNumber.replace(/\D/g, "")}`;

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute right-16 bottom-0 bg-black/80 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap"
          >
            Chat with us on WhatsApp!
            <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-2 h-2 bg-black/80 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsing Ring Effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* WhatsApp Button - Circular with Ring */}
      <motion.a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-white"
        whileHover={{ 
          scale: 1.15,
          y: -5,
        }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 15,
          delay: 1 
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 0],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FaWhatsapp className="text-2xl" />
        </motion.div>
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;