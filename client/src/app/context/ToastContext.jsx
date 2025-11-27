"use client";

import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((message, { type = 'info', duration = 3500 } = {}) => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    const t = { id, message, type };
    setToasts((s) => [t, ...s]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((s) => s.filter((x) => x.id !== id));
      }, duration);
    }
  }, []);

  const dismiss = useCallback((id) => setToasts((s) => s.filter((x) => x.id !== id)), []);

  return (
    <ToastContext.Provider value={{ toasts, show, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
