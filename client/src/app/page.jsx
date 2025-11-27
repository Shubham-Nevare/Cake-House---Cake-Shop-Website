"use client";

import { useState } from 'react';
import Hero from './components/Hero';
import Categories from './components/Categories';
import BestSellers from './components/BestSellers';
import Gallery from './components/Gallery';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import ContactUs from './components/ContactUs';
import CustomOrderForm from './components/CustomOrderForm';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import SearchFilter from './components/SearchFilter';
import Cart from './components/Cart';

export default function Page() {
  const [query, setQuery] = useState('');

  return (
    <main className="min-h-screen bg-pastel-cream text-chocolate-brown">
      <Hero />

      {/* small toolbar area with search and cart
      <div className="container mx-auto px-4 -mt-44 relative z-20 ">
        <div className="flex items-center justify-between bg-white rounded-xl shadow-lg p-4">
          <SearchFilter onSearch={setQuery} />
          <Cart />
        </div>
      </div> */}

      <Categories /> 
      <BestSellers query={query} />
      <Gallery />
      <WhyChooseUs />
      <Testimonials />
      <CustomOrderForm />
      <ContactUs />

      <WhatsAppButton phoneNumber="+15551234567" />
    </main>
  );
}
