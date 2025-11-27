"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "../context/ToastContext";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaStar,
  FaBirthdayCake,
  FaImages,
  FaPalette,
  FaPhone,
  FaFire,
  FaLayerGroup,
  FaPhotoVideo,
  FaMagic,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@"))
      return toast.show("Please enter a valid email", { type: "error" });

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const stored = JSON.parse(localStorage.getItem("sd_subscribers") || "[]");
      stored.unshift({ email, date: Date.now() });
      localStorage.setItem("sd_subscribers", JSON.stringify(stored));
      setEmail("");
      toast.show("🎉 Welcome to our sweet family! Subscription saved.", {
        type: "success",
      });
    } catch (e) {
      toast.show("Could not save subscription", { type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: <FaFacebookF className="w-4 h-4" />,
      label: "Facebook",
      href: "#",
      color: "hover:bg-blue-500 hover:text-white",
    },
    {
      icon: <FaInstagram className="w-4 h-4" />,
      label: "Instagram",
      href: "#",
      color:
        "hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-white",
    },
    {
      icon: <FaTwitter className="w-4 h-4" />,
      label: "Twitter",
      href: "#",
      color: "hover:bg-blue-400 hover:text-white",
    },
    {
      icon: <FaLinkedinIn className="w-4 h-4" />,
      label: "LinkedIn",
      href: "#",
      color: "hover:bg-blue-600 hover:text-white",
    },
  ];

  // const quickLinks = [
  //   { name: "Best Sellers", href: "#bestsellers", icon: <FaFire className="w-4 h-4" /> },
  //   { name: "Categories", href: "#categories", icon: <FaLayerGroup className="w-4 h-4" /> },
  //   { name: "Gallery", href: "#gallery", icon: <FaPhotoVideo className="w-4 h-4" /> },
  //   { name: "Custom Orders", href: "/custom-order", icon: <FaMagic className="w-4 h-4" /> },
  //   { name: "Contact Us", href: "#contact", icon: <FaEnvelope className="w-4 h-4" /> },
  // ];
  const quickLinks = [
    {
      name: "Best Sellers",
      href: "#bestsellers",
      icon: <FaStar className="w-4 h-4 text-yellow-500" />,
    },
    {
      name: "Categories",
      href: "#categories",
      icon: <FaBirthdayCake className="w-4 h-4 text-pink-500" />,
    },
    {
      name: "Gallery",
      href: "#gallery",
      icon: <FaImages className="w-4 h-4 text-blue-500" />,
    },
    {
      name: "Custom Orders",
      href: "/custom-order",
      icon: <FaPalette className="w-4 h-4 text-purple-500" />,
    },
    {
      name: "Contact Us",
      href: "#contact",
      icon: <FaPhone className="w-4 h-4 text-green-500" />,
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mt-20 bg-linear-to-br from-white to-pink-50 border-t border-pink-200"
    >
      <div className="container mx-auto px-6 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="relative w-14 h-14 rounded-full bg-linear-to-br from-pink-400 to-orange-400 flex items-center justify-center shadow-lg overflow-hidden"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <motion.img
                  src="/logoMain.png"
                  alt="Sweet Dreams Logo"
                  className="w-10 h-10 object-contain"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/30"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <div>
                <div className="text-2xl font-black text-chocolate-brown">
                  Cake House
                </div>
                <div className="text-sm text-gray-500 -mt-1">
                  Bakery & Cakes
                </div>
              </div>
            </motion.div>

            <motion.p
              className="text-gray-600 leading-relaxed max-w-xs"
              variants={itemVariants}
            >
              Crafting sweet memories with every slice. Custom cakes, wedding
              creations, and daily baked delights made with love and the finest
              ingredients.
            </motion.p>

            <motion.div className="space-y-2" variants={itemVariants}>
              <motion.a
                href="mailto:info@sweetdreamsbakery.com"
                className="flex items-center gap-2 text-gray-700 hover:text-chocolate-brown transition-colors group"
                whileHover={{ x: 5 }}
              >
                <span className="text-lg">✉️</span>
                <span className="group-hover:underline">
                  info@sweetdreamsbakery.com
                </span>
              </motion.a>
              <motion.a
                href="tel:+915551234567"
                className="flex items-center gap-2 text-gray-700 hover:text-chocolate-brown transition-colors group"
                whileHover={{ x: 5 }}
              >
                <span className="text-lg">📞</span>
                <span className="group-hover:underline">(555) 123-4567</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Hours Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-xl font-bold text-chocolate-brown">
              Opening Hours
            </h4>
            <motion.div
              className="space-y-3 text-gray-600"
              variants={containerVariants}
            >
              {[
                { days: "Mon - Fri", hours: "8:00 AM — 8:00 PM" },
                { days: "Saturday", hours: "9:00 AM — 8:00 PM" },
                { days: "Sunday", hours: "9:00 AM — 6:00 PM" },
              ].map((schedule, index) => (
                <motion.div
                  key={schedule.days}
                  variants={itemVariants}
                  className="flex justify-between items-center py-2 border-b border-gray-200"
                >
                  <span className="font-medium">{schedule.days}</span>
                  <span className="text-chocolate-brown font-semibold">
                    {schedule.hours}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-xl font-bold text-chocolate-brown">
              Quick Links
            </h4>
            <motion.ul className="space-y-3" variants={containerVariants}>
              {quickLinks.map((link, index) => (
                <motion.li key={link.name} variants={itemVariants}>
                  <motion.a
                    href={link.href}
                    className="text-gray-600 hover:text-chocolate-brown transition-colors flex items-center gap-3 group"
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                      className="text-pink-500"
                    >
                      {link.icon}
                    </motion.div>
                    <span className="group-hover:underline transition-all duration-300">
                      {link.name}
                    </span>
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Newsletter & Social */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-chocolate-brown">
                Sweet Updates
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Get exclusive offers, new flavors, and cake inspiration
                delivered straight to your inbox.
              </p>

              <motion.form
                onSubmit={subscribe}
                className="flex gap-2"
                whileHover={{ scale: 1.02 }}
              >
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300"
                  placeholder="your.email@example.com"
                  type="email"
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-2xl bg-linear-to-r from-pink-500 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    "Join"
                  )}
                </motion.button>
              </motion.form>
            </div>

            {/* Social Links - Circular */}
            <div className="space-y-3">
              <h5 className="font-semibold text-chocolate-brown">
                Connect With Us
              </h5>
              <motion.div className="flex gap-3" variants={containerVariants}>
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.3,
                      y: -5,
                      transition: { type: "spring", stiffness: 400 },
                    }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 shadow-md hover:shadow-lg transition-all duration-300 ${social.color}`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="border-t border-gray-200 bg-white/50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <span>© {new Date().getFullYear()} Cake House Bakery</span>
              <span className="hidden sm:inline">—</span>
              <span>All rights reserved</span>
            </motion.div>

            <motion.div
              className="flex items-center gap-4"
              variants={containerVariants}
            >
              {["Privacy Policy", "Terms of Service", "FAQ"].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="hover:text-chocolate-brown transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ❤️
              </motion.span>
              <span>Made with love and too much sugar</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
