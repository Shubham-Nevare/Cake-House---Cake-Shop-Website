"use client";

import { useToast } from '../context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';

const typeStyles = {
  info: 'bg-white/90 text-black border border-gray-200',
  success: 'bg-green-100 text-green-900 border border-green-200',
  error: 'bg-red-100 text-red-900 border border-red-200',
  warn: 'bg-yellow-100 text-yellow-900 border border-yellow-200',
};

const Toast = () => {
  const { toasts, dismiss } = useToast();

  return (
    <div aria-live="polite" className="fixed inset-0 z-50 pointer-events-none flex items-start justify-end p-6 md:p-8">
      <div className="w-full max-w-sm space-y-3">
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className={`pointer-events-auto rounded-xl shadow-lg p-3 sm:p-4 backdrop-blur-sm ${typeStyles[t.type || 'info']}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 text-sm leading-tight wrap-break-word">{t.message}</div>
                <button onClick={() => dismiss(t.id)} aria-label="Dismiss" className="text-sm opacity-70">✕</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Toast;
