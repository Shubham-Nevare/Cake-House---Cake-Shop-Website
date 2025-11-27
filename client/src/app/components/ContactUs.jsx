"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "../context/ToastContext";
import { FaWhatsapp } from "react-icons/fa";

const ContactUs = () => {
  const toast = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Custom Birthday Cake");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const formVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="contact"
      className="py-20 bg-linear-to-br from-white to-pink-50"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="uppercase tracking-[0.25em] text-xs text-pink-500 font-semibold mb-2"
          >
            Contact
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-chocolate-brown mb-4">
            Let&apos;s Bake Something Special
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a custom cake idea, bulk order, or just a sweet question? Reach
            out to us and we&apos;ll get back to you as soon as possible.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {/* Left column – Info + WhatsApp + Quick details */}
          <div className="space-y-6">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-chocolate-brown mb-4">
                Get in touch
              </h3>
              <p className="text-gray-600 mb-6">
                Visit our store, call us, or drop a message on WhatsApp.
              </p>

              <div className="space-y-4 text-sm">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center shrink-0">
                    📍
                  </div>
                  <div>
                    <p className="font-semibold text-chocolate-brown">
                      Address
                    </p>
                    <p className="text-gray-600">
                      123 Bakery Street, Sweet City, SC 12345
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center shrink-0">
                    📞
                  </div>
                  <div>
                    <p className="font-semibold text-chocolate-brown">Phone</p>
                    <a
                      href="tel:+915551234567"
                      className="text-gray-700 hover:text-chocolate-brown transition-colors"
                    >
                      (555) 123-4567
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center shrink-0">
                    ✉️
                  </div>
                  <div>
                    <p className="font-semibold text-chocolate-brown">Email</p>
                    <a
                      href="mailto:info@sweetdreamsbakery.com"
                      className="text-gray-700 hover:text-chocolate-brown transition-colors break-all"
                    >
                      info@sweetdreamsbakery.com
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* WhatsApp CTA */}
              <motion.div
                className="mt-6 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a
                  href="https://wa.me/915551234567?text=Hi%20Sweet%20Dreams%20Bakery%2C%20I%20want%20to%20order%20a%20cake."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group w-full justify-center"
                >
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FaWhatsapp className="text-lg" />
                  </motion.div>
                  <span className="group-hover:scale-105 transition-transform">
                    Quick Chat on WhatsApp
                  </span>
                </a>
                <p className="text-xs text-green-600 text-center mt-2 font-medium">
                  💬 Typically replies within minutes
                </p>
              </motion.div>
            </motion.div>

            {/* Map card */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200/70"
            >
              <iframe
                title="Mira Road Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.116699926437!2d72.87370207408283!3d19.2777024819689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b0684e67f945%3A0xfd19facee776fcfc!2sPleasant%20Park%2C%20Mira%20Road%20East%2C%20Mira%20Bhayandar%2C%20Maharashtra%20401107!5e1!3m2!1sen!2sin!4v1764153810298!5m2!1sen!2sin"
                className="w-full h-64"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>

          {/* Right column – Contact Form */}
          <motion.div
            variants={formVariants}
            className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl shadow-xl p-6 md:p-8"
          >
            <h3 className="text-2xl font-bold text-chocolate-brown mb-4">
              Send us a message
            </h3>
            <p className="text-gray-600 mb-6">
              Share your requirements and we&apos;ll get back with options,
              pricing, and availability.
            </p>

            <form
              className="space-y-6"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!name.trim())
                  return toast.show("Please enter your full name", {
                    type: "error",
                  });
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email))
                  return toast.show("Please enter a valid email address", {
                    type: "error",
                  });
                if (!message.trim())
                  return toast.show("Please tell us what you need", {
                    type: "error",
                  });

                try {
                  setLoading(true);

                  const stored = JSON.parse(
                    localStorage.getItem("sd_messages") || "[]"
                  );
                  const newMsg = {
                    id: Date.now(),
                    name,
                    email,
                    phone,
                    subject,
                    message,
                  };
                  stored.unshift(newMsg);
                  localStorage.setItem("sd_messages", JSON.stringify(stored));

                  toast.show("Message sent! We will get back in a few hours.", {
                    type: "success",
                  });
                  setName("");
                  setEmail("");
                  setPhone("");
                  setSubject("Custom Birthday Cake");
                  setMessage("");
                } catch (err) {
                  toast.show(
                    "Could not submit your message, please try again.",
                    { type: "error" }
                  );
                } finally {
                  setLoading(false);
                }
              }}
            >
              <motion.div whileHover={{ scale: 1.01 }}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300"
                />
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div whileHover={{ scale: 1.01 }}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.01 }}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your contact number"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300"
                  />
                </motion.div>
              </div>

              <motion.div whileHover={{ scale: 1.01 }}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  What would you like to order?
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300"
                >
                  <option>Custom Birthday Cake</option>
                  <option>Wedding Cake</option>
                  <option>Cupcakes / Desserts</option>
                  <option>Bulk / Corporate Order</option>
                  <option>Other</option>
                </select>
              </motion.div>

              <motion.div whileHover={{ scale: 1.01 }}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your flavor, size, date, and any special message..."
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm resize-none outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300"
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto inline-flex justify-center items-center gap-3 rounded-2xl bg-linear-to-r from-pink-500 to-orange-500 text-white font-bold px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>✉️ Send Message</>
                )}
              </motion.button>

              <p className="text-xs text-gray-500 text-center">
                We usually respond within a few business hours.
              </p>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
