"use client";

import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};

export const CartProvider = ({ children }) => {
  // items will be an array of { id, product, quantity }
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart');
      if (!raw) return;
      const parsed = JSON.parse(raw);

      // migrate old format (array of product objects) to new format (grouped by id)
      if (Array.isArray(parsed)) {
        if (parsed.length === 0) return setItems([]);

        // if items are simple products (no quantity field), group by id
        if (parsed[0] && parsed[0].quantity == null) {
          const grouped = parsed.reduce((acc, p) => {
            const id = p.id || p.name || JSON.stringify(p);
            acc[id] = acc[id] || { id, product: p, quantity: 0 };
            acc[id].quantity += 1;
            return acc;
          }, {});
          setItems(Object.values(grouped));
        } else {
          // assume already in new format
          setItems(parsed);
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }, [items]);

  const addToCart = (product, qty = 1) => {
    if (!product) return;
    setItems((prev) => {
      const id = product.id ?? product.name ?? Date.now().toString();
      const foundIdx = prev.findIndex((it) => it.id === id || (it.product && it.product.id === id));
      if (foundIdx > -1) {
        // increment quantity
        const next = prev.map((it, idx) => {
          if (idx !== foundIdx) return it;
          return { ...it, quantity: (it.quantity || 1) + qty };
        });
        return next;
      }

      const cartItem = { id: product.id ?? Date.now().toString(), product, quantity: qty };
      return [cartItem, ...prev];
    });
  };

  const openCart = () => setOpen(true);
  const closeCart = () => setOpen(false);

  const removeFromCart = (index) => {
    setItems((prev) => {
      const it = prev[index];
      if (!it) return prev;
      if ((it.quantity || 0) > 1) {
        return prev.map((item, i) => (i === index ? { ...item, quantity: item.quantity - 1 } : item));
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  // Remove any cart item where the id matches or the underlying product.id matches
  const removeProductById = (id) => {
    setItems((prev) => prev.filter((it) => {
      if (!it) return false;
      if (it.id === id) return false;
      if (it.product && (it.product.id === id || String(it.product.id) === String(id))) return false;
      return true;
    }));
  };

  const updateQuantity = (index, newQty) => {
    setItems((prev) => {
      if (newQty <= 0) return prev.filter((_, i) => i !== index);
      return prev.map((it, i) => (i === index ? { ...it, quantity: newQty } : it));
    });
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((s, it) => s + ((it.product?.price || it.price || 0) * (it.quantity || 1)), 0);
  const totalItems = items.reduce((s, it) => s + (it.quantity || 0), 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, removeProductById, updateQuantity, clearCart, total, totalItems, open, openCart, closeCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
