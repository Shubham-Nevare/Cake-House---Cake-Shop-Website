"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../context/ToastContext";

const highlightCakes = [
  {
    title: "Theme Birthday Cakes",
    desc: "Cartoon, superheroes, gaming, minimal & elegant designs tailored to the occasion.",
    img: "https://images.unsplash.com/photo-1597999709259-ec3cd5868421?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRoZW1lJTIwYmlydGhhZHklMjBjYWtlfGVufDB8fDB8fHww",
    icon: "🎉"
  },
  {
    title: "Wedding & Engagement Cakes",
    desc: "Multi-tier, floral, metallic accents and handcrafted details for your big day.",
    img: "https://images.unsplash.com/photo-1600270187091-936d919ca646?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fHdlZGRpbmclMjAlMjYlMjBlbmdhZ2VtZW50JTIwY2FrZXMlMjB3aXRoJTIwZG9sbHxlbnwwfHwwfHx8MA%3D%3D",
    icon: "💍"
  },
  {
    title: "Corporate / Bulk Orders",
    desc: "Logo cakes, cupcakes & dessert tables for launches, festivals and office events.",
    img: "https://plus.unsplash.com/premium_photo-1741194732682-21f3046cf1a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fEJ1bGslMjBPcmRlcnMlMjBjYWtlfGVufDB8fDB8fHww",
    icon: "🏢"
  },
];

const ideaTags = [
  "Minimal aesthetic cake", "Photo cake", "Cartoon / Superhero theme",
  "Floral watercolour style", "Chocolate overload", "Fondant topper cake",
  "Gender reveal cake", "Custom cupcakes & jars"
];

export default function CustomOrderPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", flavor: "", size: "", 
    message: "", deliveryDate: "", servings: ""
  });
  const [loading, setLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const toast = useToast();

  function handleChange(e) {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      return toast.show("Please enter name and email", { type: "error" });
    }

    setLoading(true);
    try {
      const stored = JSON.parse(localStorage.getItem("sd_custom_orders") || "https://images.unsplash.com/photo-1606311842957[]");
      stored.unshift({ ...formData, id: Date.now() });
      localStorage.setItem("sd_custom_orders", JSON.stringify(stored));
      toast.show("🎂 Custom order saved! We will contact you soon!", { type: "success" });
      setFormData({ name: "", email: "", phone: "", flavor: "", size: "", message: "", deliveryDate: "", servings: "" });
    } catch (err) {
      toast.show("Could not save your order — please try again", { type: "error" });
    } finally {
      setLoading(false);
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-pink-50 to-orange-50 pt-20">
      <section className="container mx-auto px-6 py-16 max-w-7xl">
        {/* Hero Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="uppercase tracking-[0.3em] text-sm text-pink-600 font-bold"
            >
              Custom Cakes
            </motion.p>
            <motion.h1
              className="text-4xl md:text-6xl font-black text-chocolate-brown leading-tight"
              variants={itemVariants}
            >
              Made-to-order cakes, baked just for{" "}
              <motion.span
                className="bg-linear-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ backgroundSize: "200% auto" }}
              >
                your story.
              </motion.span>
            </motion.h1>
            <motion.p className="text-xl text-gray-700 leading-relaxed" variants={itemVariants}>
              From intimate birthdays to grand weddings, we design and bake cakes that 
              match your theme, colors, and personality. Share your vision, and our 
              cake artists will create something truly magical.
            </motion.p>
            <motion.div className="flex flex-wrap gap-3" variants={itemVariants}>
              {["🎂 100% eggless options", "📸 Custom toppers", "🚚 Fast delivery"].map((feature, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-white/80 rounded-full text-sm font-medium shadow-sm"
                >
                  {feature}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02, rotate: 1 }}
              className="rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1565098724521-089da1fa652a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODV8fGN1c3RvbSUyMGNha2V8ZW58MHx8MHx8fDA%3D"
                alt="Custom decorated cake"
                className="w-full h-96 object-cover"
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl border border-pink-200"
            >
              <p className="font-black text-chocolate-brown text-lg">500+</p>
              <p className="text-sm text-gray-600">custom cakes baked</p>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl border border-pink-200"
            >
              <p className="font-black text-chocolate-brown text-lg">4.8/5</p>
              <p className="text-sm text-gray-600">average rating</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* What we can create */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-black text-chocolate-brown text-center mb-4"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
          >
            What we can bake for you
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Whether you&apos;re planning a first birthday, theme party, or elegant 
            engagement, we work closely with you to create the perfect centerpiece.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlightCakes.map((cake, index) => (
              <motion.article
                key={cake.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={cake.img}
                    alt={cake.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 rounded-xl flex items-center justify-center text-2xl">
                    {cake.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-chocolate-brown mb-3">
                    {cake.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {cake.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Ideas + Gallery Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Ideas */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-black text-chocolate-brown mb-6">
              Need inspiration?
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Not sure where to start? Pick a vibe and we&apos;ll send you design 
              options and pricing.
            </p>
            <div className="flex flex-wrap gap-3">
              <AnimatePresence>
                {ideaTags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, backgroundColor: "var(--pastel-pink)" }}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`px-4 py-3 rounded-2xl text-sm font-medium cursor-pointer transition-all duration-300 ${
                      selectedTag === tag 
                        ? "bg-pink-500 text-white shadow-lg" 
                        : "bg-white text-chocolate-brown shadow-md hover:shadow-lg"
                    }`}
                  >
                    {tag}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Gallery */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-black text-chocolate-brown mb-6">
              Our custom creations
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=600&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1565098724521-089da1fa652a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODV8fGN1c3RvbSUyMGNha2V8ZW58MHx8MHx8fDA%3D",
                "https://images.unsplash.com/photo-1628705928220-f30491393e2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTd8fGN1c3RvbSUyMGNha2V8ZW58MHx8MHx8fDA%3D",
                "https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=600&auto=format&fit=crop"
              ].map((src, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                  className="rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                >
                  <img
                    src={src}
                    alt={`Custom cake ${index + 1}`}
                    className="w-full h-32 object-cover hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              *Photos are representative — each design is customized for your order.
            </p>
          </motion.div>
        </motion.section>

        {/* Main Form */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-pink-200">
            <motion.h2
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              className="text-3xl md:text-4xl font-black text-chocolate-brown text-center mb-4"
            >
              Tell us about your dream cake
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-center mb-8 text-lg"
            >
              Share your vision and we&apos;ll create something truly special together.
            </motion.p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div whileHover={{ scale: 1.01 }}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full name *
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your beautiful name"
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300"
                    required
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.01 }}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300"
                    required
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div whileHover={{ scale: 1.01 }}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone number
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.01 }}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Delivery date
                  </label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300"
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div whileHover={{ scale: 1.01 }}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Flavor
                  </label>
                  <select
                    name="flavor"
                    value={formData.flavor}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300"
                  >
                    <option value="">Select flavor</option>
                    <option>Chocolate Fudge</option>
                    <option>Vanilla Bean</option>
                    <option>Red Velvet</option>
                    <option>Butterscotch</option>
                    <option>Strawberry</option>
                    <option>Cookies & Cream</option>
                  </select>
                </motion.div>
                <motion.div whileHover={{ scale: 1.01 }}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Size
                  </label>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300"
                  >
                    <option value="">Select size</option>
                    <option>Small (6" - 8-10 people)</option>
                    <option>Medium (8" - 15-20 people)</option>
                    <option>Large (10" - 25-30 people)</option>
                    <option>Extra Large (12" - 35-40 people)</option>
                    <option>Multi-tier (Wedding/Event)</option>
                  </select>
                </motion.div>
                <motion.div whileHover={{ scale: 1.01 }}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Servings
                  </label>
                  <select
                    name="servings"
                    value={formData.servings}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300"
                  >
                    <option value="">How many people?</option>
                    <option>10-15</option>
                    <option>15-25</option>
                    <option>25-40</option>
                    <option>40-60</option>
                    <option>60+</option>
                  </select>
                </motion.div>
              </div>

              <motion.div whileHover={{ scale: 1.01 }}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Describe your dream cake
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm resize-none outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300"
                  placeholder="Tell us about your theme, colors, special message, decorations, dietary requirements, and any reference images (Instagram/Pinterest links welcome)..."
                />
              </motion.div>

              <motion.div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 max-w-md bg-linear-to-r from-pink-500 to-orange-500 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-3 justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Creating your quote...
                    </span>
                  ) : (
                    <span className="flex items-center gap-3 justify-center">
                      🎂 Submit Custom Order
                    </span>
                  )}
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    toast.show("📋 Link copied to clipboard!", { type: "info" });
                  }}
                  className="px-6 py-3 rounded-2xl border-2 border-gray-300 text-gray-700 hover:border-pink-500 hover:text-pink-500 transition-all duration-300"
                >
                  Share this page
                </motion.button>
              </motion.div>

              <p className="text-center text-sm text-gray-500 pt-4">
                We&apos;ll respond within a few hours with design ideas and pricing. 
                Can&apos;t wait to create something amazing for you! 💫
              </p>
            </form>
          </div>
        </motion.section>
      </section>
    </main>
  );
}