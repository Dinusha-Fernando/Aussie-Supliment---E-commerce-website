'use client';

import React from 'react';
import { useStore } from '@/lib/storeContext';
import { CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Toast: React.FC = () => {
  const { toastMessage, showToast } = useStore();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-eucalyptus-950 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-gold-500/30 max-w-md"
        >
          <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" />
          <span className="text-sm font-medium leading-snug">{toastMessage}</span>
          <button
            onClick={() => showToast('')}
            className="ml-auto text-charcoal-300 hover:text-white transition p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
