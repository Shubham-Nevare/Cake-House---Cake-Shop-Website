"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  // Use Unsplash source endpoints — these return good, license-friendly images for the given query
  const images = [
    "https://images.unsplash.com/photo-1739132124985-6c9277e268b5?q=80&w=1139&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1760124056888-8ae3ec14b978?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1620144511939-3981ea285ef9?q=80&w=1168&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // a slightly longer hold between transitions
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative h-screen flex items-center justify-center bg-pastel-cream ">
      <div className="absolute inset-0 overflow-hidden">
        {/* stacked images — animate opacity so we get smooth crossfades without re-mounting */}
        {images.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt={`Hero ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden={i !== currentImage}
            initial={{ opacity: 0, scale: 1.02, filter: "blur(3px)" }}
            animate={{
              opacity: i === currentImage ? 1 : 0,
              scale: i === currentImage ? 1 : 1.02,
              filter: i === currentImage ? "blur(0px)" : "blur(3px)",
            }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            loading="eager"
          />
        ))}

        {/* soft overlay to improve contrast for text */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/20 pointer-events-none" />
      </div>
      <div className="relative z-10 text-center text-white px-4">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Cake House Bakery
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Indulge in our heavenly cakes and pastries
        </motion.p>
        {/* // Hero.jsx - Use the custom CSS classes */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button className="btn-secondary">Order Now</button>
          <button className="px-6 py-3 rounded-full border-2 border-white text-white hover:bg-white hover:text-chocolate-brown transition duration-300 transform hover:scale-105 cursor-pointer">
            View Cakes
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
