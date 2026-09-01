'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/storeContext';
import {
  X,
  SlidersHorizontal,
  Trash2,
  ShoppingBag,
  Star,
  ShieldCheck,
  Check,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CompareDrawer: React.FC = () => {
  const {
    comparedProducts,
    removeFromCompare,
    clearCompare,
    isCompareDrawerOpen,
    setIsCompareDrawerOpen,
    addToCart,
    formatPrice
  } = useStore();

  if (!isCompareDrawerOpen || comparedProducts.length === 0) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCompareDrawerOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl shadow-2xl border border-sand w-full max-w-5xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-eucalyptus-950 p-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <SlidersHorizontal className="w-5 h-5 text-gold-400" />
              <h3 className="font-extrabold text-base text-white">
                Compare Australian Formulations ({comparedProducts.length}/4)
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={clearCompare}
                className="text-xs text-eucalyptus-200 hover:text-error transition flex items-center gap-1 font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All
              </button>
              <button
                onClick={() => setIsCompareDrawerOpen(false)}
                className="p-1.5 text-eucalyptus-200 hover:text-white bg-eucalyptus-900 rounded-full transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Matrix Grid */}
          <div className="p-6 overflow-x-auto flex-1">
            <div className="min-w-[650px] grid grid-cols-5 gap-4 text-xs">
              {/* Row: Product Header */}
              <div className="font-bold text-charcoal-400 uppercase tracking-wider flex items-end pb-3 border-b border-sand">
                Product Specs
              </div>
              {comparedProducts.map((p) => (
                <div key={p.id} className="space-y-2 pb-3 border-b border-sand text-center relative">
                  <button
                    onClick={() => removeFromCompare(p.id)}
                    className="absolute -top-1 right-0 p-1 text-charcoal-400 hover:text-error"
                    title="Remove from comparison"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <img
                    src={p.primary_image}
                    alt={p.name}
                    className="w-20 h-20 object-contain mx-auto bg-offwhite rounded-xl p-1 border border-sand"
                  />
                  <h4 className="font-bold text-charcoal-900 line-clamp-2 leading-snug">
                    {p.name}
                  </h4>
                  <span className="font-extrabold text-eucalyptus-950 text-sm block">
                    {formatPrice(p.retail_price)}
                  </span>
                </div>
              ))}
              {/* Empty placeholder columns if < 4 */}
              {[...Array(Math.max(0, 4 - comparedProducts.length))].map((_, i) => (
                <div key={i} className="border-2 border-dashed border-sand rounded-xl p-4 flex items-center justify-center text-charcoal-300 text-[11px] font-medium text-center">
                  + Add product from store to compare
                </div>
              ))}

              {/* Row: Brand */}
              <div className="font-bold text-charcoal-500 py-2.5 border-b border-sand">
                Brand & Origin
              </div>
              {comparedProducts.map((p) => (
                <div key={p.id} className="py-2.5 border-b border-sand font-medium text-charcoal-800 text-center">
                  {p.brand_name}
                </div>
              ))}
              {[...Array(Math.max(0, 4 - comparedProducts.length))].map((_, i) => (
                <div key={i} className="py-2.5 border-b border-sand"></div>
              ))}

              {/* Row: Size & Serving Size */}
              <div className="font-bold text-charcoal-500 py-2.5 border-b border-sand">
                Serving Size
              </div>
              {comparedProducts.map((p) => (
                <div key={p.id} className="py-2.5 border-b border-sand font-medium text-charcoal-800 text-center">
                  {p.serving_size} ({p.size_label})
                </div>
              ))}
              {[...Array(Math.max(0, 4 - comparedProducts.length))].map((_, i) => (
                <div key={i} className="py-2.5 border-b border-sand"></div>
              ))}

              {/* Row: Format */}
              <div className="font-bold text-charcoal-500 py-2.5 border-b border-sand">
                Format
              </div>
              {comparedProducts.map((p) => (
                <div key={p.id} className="py-2.5 border-b border-sand font-medium text-charcoal-800 text-center">
                  {p.form}
                </div>
              ))}
              {[...Array(Math.max(0, 4 - comparedProducts.length))].map((_, i) => (
                <div key={i} className="py-2.5 border-b border-sand"></div>
              ))}

              {/* Row: ARTG / Regulatory */}
              <div className="font-bold text-charcoal-500 py-2.5 border-b border-sand">
                TGA / ARTG
              </div>
              {comparedProducts.map((p) => (
                <div key={p.id} className="py-2.5 border-b border-sand text-center">
                  {p.artg_number ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-eucalyptus-900 bg-eucalyptus-50 px-2 py-0.5 rounded border border-eucalyptus-200">
                      <ShieldCheck className="w-3 h-3 text-eucalyptus-700" />
                      {p.artg_number}
                    </span>
                  ) : (
                    <span className="text-charcoal-400">Standard Supplement</span>
                  )}
                </div>
              ))}
              {[...Array(Math.max(0, 4 - comparedProducts.length))].map((_, i) => (
                <div key={i} className="py-2.5 border-b border-sand"></div>
              ))}

              {/* Row: Rating */}
              <div className="font-bold text-charcoal-500 py-2.5 border-b border-sand">
                Customer Rating
              </div>
              {comparedProducts.map((p) => (
                <div key={p.id} className="py-2.5 border-b border-sand text-center font-bold text-charcoal-900 flex items-center justify-center gap-1">
                  <Award className="w-3.5 h-3.5 text-gold-600" />
                  <span>{Number(p.rating_avg || 5).toFixed(1)}</span>
                  <span className="text-charcoal-400 font-normal text-[11px]">({p.review_count})</span>
                </div>
              ))}
              {[...Array(Math.max(0, 4 - comparedProducts.length))].map((_, i) => (
                <div key={i} className="py-2.5 border-b border-sand"></div>
              ))}

              {/* Row: Direct Action */}
              <div className="font-bold text-charcoal-500 pt-3">
                Action
              </div>
              {comparedProducts.map((p) => (
                <div key={p.id} className="pt-3 text-center">
                  <button
                    onClick={() => {
                      addToCart(p, 1);
                      setIsCompareDrawerOpen(false);
                    }}
                    className="w-full bg-eucalyptus-900 hover:bg-eucalyptus-800 text-white font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Buy Now
                  </button>
                </div>
              ))}
              {[...Array(Math.max(0, 4 - comparedProducts.length))].map((_, i) => (
                <div key={i} className="pt-3"></div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
