"use client";

import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import Link from 'next/link';

export default function ProductPage({ params }) {
  const { id } = params;
  const productId = Number(id);
  const product = products.find((p) => p.id === productId);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link href="/">Back home</Link>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-16">
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
          <div className="flex items-center gap-3">
            <button onClick={() => addToCart(product)} className="px-6 py-3 bg-pastel-pink text-chocolate-brown rounded-full font-semibold">Add to cart</button>
            <Link href="/" className="px-6 py-3 border rounded-full text-sm text-gray-600">Continue shopping</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
