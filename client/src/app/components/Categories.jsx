"use client";

import { motion } from "framer-motion";
import {
  FaBirthdayCake,
  FaHeart,
  FaCookie,
  FaPalette,
  FaBreadSlice,
  FaRing,
  FaMagic,
} from "react-icons/fa";
const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Birthday Cakes",
      description: "Celebrate special moments",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1089&auto=format&fit=crop",
      icon: <FaBirthdayCake className="text-3xl text-pink-500" />,
      color: "from-pink-400 to-pink-600",
    },
    {
      id: 2,
      name: "Wedding Cakes",
      description: "Elegant designs for your big day",
      image:
        "https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=987&auto=format&fit=crop",
      icon: <FaRing className="text-3xl text-red-500" />,
      color: "from-purple-400 to-purple-600",
    },
    {
      id: 3,
      name: "Cupcakes",
      description: "Perfect little treats",
      image:
        "https://images.unsplash.com/photo-1603532648955-039310d9ed75?q=80&w=987&auto=format&fit=crop",
      icon: <FaMagic className="text-3xl text-yellow-500" />,
      color: "from-yellow-400 to-yellow-600",
    },
    {
      id: 4,
      name: "Custom Cakes",
      description: "Made just for you",
      image:
        "https://images.unsplash.com/photo-1571928002685-15aeba39a2d4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU1fHxjdXN0b20lMjBjYWtlfGVufDB8fDB8fHww",
      icon: <FaPalette className="text-3xl text-blue-500" />,
      color: "from-blue-400 to-blue-600",
    },
    {
      id: 5,
      name: "Pastries",
      description: "Fresh daily delights",
      image:
        "https://images.unsplash.com/photo-1712725214797-38956dc3f091?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjcxfHxwYXN0cnklMjBjYWtlJTIwcGljZXxlbnwwfHwwfHx8MA%3D%3D",
      icon: <FaBreadSlice className="text-3xl text-orange-500" />,
      color: "from-orange-400 to-orange-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="categories" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-chocolate-brown mb-4">
            Our Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our delicious range of cakes and pastries for every occasion
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={{
                ...itemVariants,
                hover: cardHoverVariants.hover,
              }}
              whileHover="hover"
              className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
            >
              <div className="absolute inset-0 bg-linear-to-br from-black/20 to-black/60 z-10" />
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center text-white">
                <motion.div
                  className="text-3xl mb-2"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  {category.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-sm opacity-90">{category.description}</p>
              </div>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
