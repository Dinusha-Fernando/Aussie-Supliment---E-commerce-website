'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/storeContext';
import {
  X,
  Star,
  ShoppingBag,
  ShieldCheck,
  Check,
  Plus,
  Minus,
  ArrowRight,
  Flame,
  Zap,
  Leaf
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, isWholesaleMode, formatPrice } = useStore();
  const [qty, setQty] = useState(1);

  if (!quickViewProduct) return null;

  const retailPrice = Number(quickViewProduct.retail_price);
  const comparePrice = quickViewProduct.compare_at_price ? Number(quickViewProduct.compare_at_price) : null;
  const wholesalePrice = Number(quickViewProduct.wholesale_price);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl shadow-2xl border border-sand w-full max-w-3xl overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 text-charcoal-400 hover:text-charcoal-900 bg-white/80 backdrop-blur-md rounded-full shadow-xs transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Product Image */}
          <div className="md:w-1/2 bg-offwhite p-8 flex items-center justify-center relative">
            {quickViewProduct.artg_number && (
              <span className="absolute top-4 left-4 bg-white text-eucalyptus-900 border border-eucalyptus-200 font-bold text-[10px] px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-eucalyptus-700" />
                TGA {quickViewProduct.artg_number}
              </span>
            )}
            <img
              src={quickViewProduct.primary_image || 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=800&q=80'}
              alt={quickViewProduct.name}
              className="max-h-72 object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Right: Product Overview */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-eucalyptus-700">
                {quickViewProduct.brand_name} • {quickViewProduct.category_name}
              </span>

              <h2 className="text-lg font-extrabold text-charcoal-950 leading-snug">
                {quickViewProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-charcoal-800">
                  {Number(quickViewProduct.rating_avg || 5).toFixed(1)}
                </span>
                <span className="text-xs text-charcoal-400">
                  ({quickViewProduct.review_count || 0} reviews)
                </span>
              </div>

              {/* Pricing */}
              <div className="pt-2">
                {isWholesaleMode ? (
                  <div>
                    <span className="text-xs font-bold text-gold-700 uppercase">Wholesale Tier Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-eucalyptus-950">
                        {formatPrice(wholesalePrice)}
                      </span>
                      <span className="text-xs text-charcoal-400 line-through">
                        RRP {formatPrice(retailPrice)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-eucalyptus-950">
                      {formatPrice(retailPrice)}
                    </span>
                    {comparePrice && (
                      <span className="text-sm text-charcoal-400 line-through">
                        {formatPrice(comparePrice)}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <p className="text-xs text-charcoal-600 leading-relaxed pt-1">
                {quickViewProduct.short_description}
              </p>

              {/* Key Specs Pills */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                <div className="bg-offwhite p-2.5 rounded-xl border border-sand">
                  <span className="text-charcoal-400 block font-medium">Serving Size</span>
                  <span className="font-bold text-charcoal-900">{quickViewProduct.serving_size}</span>
                </div>
                <div className="bg-offwhite p-2.5 rounded-xl border border-sand">
                  <span className="text-charcoal-400 block font-medium">Format</span>
                  <span className="font-bold text-charcoal-900">{quickViewProduct.form}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-sand space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-sand rounded-xl bg-offwhite p-1">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-2 text-charcoal-700 hover:bg-sand rounded-lg transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 font-extrabold text-sm text-charcoal-900 min-w-8 text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="p-2 text-charcoal-700 hover:bg-sand rounded-lg transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    addToCart(quickViewProduct, qty);
                    setQuickViewProduct(null);
                  }}
                  className="flex-1 bg-eucalyptus-900 hover:bg-eucalyptus-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart • {formatPrice(((isWholesaleMode ? wholesalePrice : retailPrice) * qty))}
                </button>
              </div>

              <Link
                href={`/products/${quickViewProduct.slug}`}
                onClick={() => setQuickViewProduct(null)}
                className="w-full text-center block text-xs font-bold text-eucalyptus-800 hover:text-eucalyptus-950 py-1"
              >
                View Full Clinical Specifications & Verified Reviews →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
