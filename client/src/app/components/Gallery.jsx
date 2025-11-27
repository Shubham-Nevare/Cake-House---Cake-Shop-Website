"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

const Gallery = () => {
  const galleryImages = [
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1089&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=987&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1603532648955-039310d9ed75?q=80&w=987&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1623334044303-241021148842?q=80&w=1170&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1571928002685-15aeba39a2d4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU1fHxjdXN0b20lMjBjYWtlfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1736267095915-0163cd1d13ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTYyfHxjdXN0b20lMjBjYWtlfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1599334102996-f27e62b2eb79?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTg0fHxjdXN0b20lMjBjYWtlfGVufDB8fDB8fHww'
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-chocolate-brown mb-4">
            Our Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Feast your eyes on our delicious creations
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                rotate: index % 2 === 0 ? 2 : -2,
                transition: { duration: 0.3 }
              }}
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  className="text-white text-2xl"
                >
                  👁️
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal for enlarged image */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-w-4xl max-h-full"
            >
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <button
                className="absolute top-4 right-4 text-white text-2xl bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Gallery;