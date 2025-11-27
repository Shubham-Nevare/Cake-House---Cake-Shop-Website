"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const CustomOrderForm = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="custom-cake" className="py-20 bg-linear-to-br from-pink-50 to-orange-50">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-center text-chocolate-brown mb-16"
        >
          Custom Cakes
        </motion.h2>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants}>
            <motion.h2 
              className="text-4xl md:text-5xl font-extrabold text-chocolate-brown mb-6"
              whileInView={{ x: 0 }}
              initial={{ x: -50 }}
              transition={{ duration: 0.6 }}
            >
              We build custom cakes for every celebration
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-700 mb-6 leading-relaxed"
              variants={itemVariants}
            >
              Tell us your idea — theme, flavor, size and we will craft a cake
              that&apos;s unique and perfect for your occasion. From show-stopping
              wedding tiered cakes to fun car-shaped birthday cakes and delicate
              dessert towers — we&apos;ve got you covered.
            </motion.p>

            <motion.div 
              className="flex items-center gap-3 mb-8 p-4 bg-white/50 rounded-2xl"
              variants={itemVariants}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl"
              >
                🎨
              </motion.div>
              <p className="text-gray-600">
                Need something very special? Our custom cake service can create
                themed shapes, edible images, special fillings, and multi-tiered
                designs.
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 items-center"
              variants={itemVariants}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/custom-order"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-pink-500 to-orange-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  🎂 Create my cake
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ x: 5 }}>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm text-chocolate-brown font-semibold hover:underline transition-all"
                >
                  💬 Talk to an expert
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={imageVariants}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://image.wedmegood.com/resized/1000X/uploads/project/24018/1657372169_Avenger_Pinata.jpg"
                alt="custom cake hero"
                className="w-full h-96 object-cover"
              />
            </motion.div>
            
            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-pink-200"
            >
              <p className="font-bold text-chocolate-brown text-sm">500+ Orders</p>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-pink-200"
            >
              <p className="font-bold text-chocolate-brown text-sm">⭐ 4.9/5 Rating</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomOrderForm;