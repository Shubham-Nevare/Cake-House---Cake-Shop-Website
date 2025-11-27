"use client";

import { use } from 'react';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

export default function ProductPage({ params }) {
  // Use the use hook to unwrap the params promise
  const { id } = use(params);
  const productId = Number(id);
  const product = products.find((p) => p.id === productId);
  const { addToCart, items: cartItems, updateQuantity, openCart } = useCart();

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link href="/">Back home</Link>
      </div>
    );
  }

  // Check if product is in cart - define this AFTER the null check
  const cartItem = cartItems.find(item => (item.product?.id ?? item.id) === productId);
  const quantity = cartItem ? cartItem.quantity : 1;

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const handleIncrease = () => {
    if (cartItem) {
      const itemIndex = cartItems.findIndex(item => (item.product?.id ?? item.id) === productId);
      updateQuantity(itemIndex, quantity + 1);
    } else {
      addToCart(product, 1);
    }
  };

  const handleDecrease = () => {
    if (cartItem && quantity > 1) {
      const itemIndex = cartItems.findIndex(item => (item.product?.id ?? item.id) === productId);
      updateQuantity(itemIndex, quantity - 1);
    }
  };

  return (
    <main className="container mx-auto px-4 py-16 pt-30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <img src={product.image} alt={product.name} className="rounded-lg shadow-md object-cover h-96 w-full" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-chocolate-brown mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center gap-4 mb-6">
            <div className="text-3xl font-bold text-pastel-pink">₹{product.price}</div>
            <div className="text-gray-600 flex items-center gap-2">★ {product.rating}</div>
          </div>

          {/* Updated Cart Controls */}
          <div className="flex items-center gap-3 mb-6">
            {!cartItem ? (
              // Not in cart - Show Add to Cart button
              <button 
                onClick={handleAddToCart}
                className="flex items-center gap-2 px-6 py-3 bg-pastel-pink text-chocolate-brown rounded-full font-semibold hover:bg-pastel-pink/90 transition-colors cursor-pointer"
              >
                <FaShoppingCart />
                Add to cart
              </button>
            ) : (
              // In cart - Show quantity controls and Go to Cart
              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                  <button
                    onClick={handleDecrease}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold cursor-pointer"
                  >
                    −
                  </button>
                  <span className="min-w-10 text-center font-semibold text-chocolate-brown">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 transition-colors text-lg font-semibold cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Go to Cart Button */}
                <button
                  onClick={openCart}
                  className="flex items-center gap-2 px-6 py-3 bg-chocolate-brown text-white rounded-full font-semibold hover:bg-chocolate-brown/90 transition-colors cursor-pointer"
                >
                  <FaShoppingCart />
                  Go to Cart ({quantity})
                </button>
              </div>
            )}
            
            <Link href="/" className="px-6 py-3 border border-gray-300 rounded-full text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              Continue shopping
            </Link>
          </div>

          {/* Additional Product Info */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-chocolate-brown mb-3">Product Details</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Freshly baked daily with premium ingredients</li>
              <li>• Customization options available</li>
              <li>• Free delivery on orders above ₹1000</li>
              <li>• 24-hour advance booking recommended</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}