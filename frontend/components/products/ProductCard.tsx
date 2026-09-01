'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/storeContext';
import {
  Star,
  ShoppingBag,
  Heart,
  Eye,
  SlidersHorizontal,
  Check,
  ShieldCheck,
  Building2,
  Flame
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  featuredBadge?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, featuredBadge }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    addToCompare,
    isWholesaleMode,
    formatPrice
  } = useStore();

  const isWish = isInWishlist(product.id);
  const retailPrice = Number(product.retail_price);
  const comparePrice = product.compare_at_price ? Number(product.compare_at_price) : null;
  const wholesalePrice = Number(product.wholesale_price);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative bg-white rounded-2xl sm:rounded-3xl border border-sand shadow-xs hover:shadow-xl transition-all flex flex-col h-full justify-between overflow-hidden"
    >
      {/* Image Container & Badges */}
      <div className="relative aspect-square w-full bg-offwhite overflow-hidden p-3 sm:p-4">
        {/* Badges Left */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 flex flex-col gap-1 sm:gap-1.5 items-start max-w-[70%]">
          {featuredBadge && (
            <span className="bg-eucalyptus-950 text-gold-400 font-extrabold text-[9px] sm:text-[10px] uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md shadow-xs truncate max-w-full">
              {featuredBadge}
            </span>
          )}
          {product.is_best_seller && !featuredBadge && (
            <span className="bg-gold-500 text-eucalyptus-950 font-black text-[9px] sm:text-[10px] uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md shadow-xs truncate max-w-full flex items-center gap-1">
              <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-eucalyptus-950 fill-current shrink-0" />
              Best Seller
            </span>
          )}
          {product.discount_percent > 0 && (
            <span className="bg-error text-white font-black text-[9px] sm:text-[10px] px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-md shadow-xs">
              Save {product.discount_percent}%
            </span>
          )}
          {product.artg_number && (
            <span className="bg-white/90 backdrop-blur-xs text-eucalyptus-900 border border-eucalyptus-200 font-bold text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-md flex items-center gap-1 shadow-xs truncate max-w-full">
              <ShieldCheck className="w-2.5 h-2.5 text-eucalyptus-700 shrink-0" />
              TGA {product.artg_number}
            </span>
          )}
        </div>

        {/* Action Buttons Right (Wishlist, Quick View, Compare) */}
        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 flex flex-col gap-1.5">
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-1.5 sm:p-2 rounded-full backdrop-blur-md shadow-xs transition ${
              isWish
                ? 'bg-error text-white'
                : 'bg-white/85 text-charcoal-600 hover:bg-white hover:text-error'
            }`}
            title="Add to wishlist"
            aria-label="Add to wishlist"
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWish ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={() => setQuickViewProduct(product)}
            className="p-1.5 sm:p-2 rounded-full bg-white/85 backdrop-blur-md text-charcoal-600 hover:bg-white hover:text-eucalyptus-900 shadow-xs transition"
            title="Quick preview"
            aria-label="Quick preview"
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            onClick={() => addToCompare(product)}
            className="p-1.5 sm:p-2 rounded-full bg-white/85 backdrop-blur-md text-charcoal-600 hover:bg-white hover:text-eucalyptus-900 shadow-xs transition hidden sm:block"
            title="Add to comparison"
            aria-label="Add to comparison"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Product Image */}
        <Link href={`/products/${product.slug}`} className="w-full h-full flex items-center justify-center">
          <img
            src={product.primary_image || 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=600&q=80'}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
          />
        </Link>
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 sm:p-5 flex flex-col justify-between flex-1 space-y-2.5 sm:space-y-3">
        <div className="space-y-1 sm:space-y-1.5">
          {/* Brand & Size */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-semibold text-charcoal-400">
            <span className="uppercase tracking-wider text-eucalyptus-700 truncate max-w-[65%]">{product.brand_name}</span>
            <span className="shrink-0">{product.size_label}</span>
          </div>

          {/* Title */}
          <Link href={`/products/${product.slug}`} className="block group-hover:text-eucalyptus-800 transition">
            <h3 className="font-bold text-xs sm:text-sm text-charcoal-900 line-clamp-2 leading-snug min-h-[2rem] sm:min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>

          {/* Rating Summary */}
          <div className="flex items-center gap-1 sm:gap-1.5 pt-0.5">
            <div className="flex items-center text-gold-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                    i < Math.floor(Number(product.rating_avg) || 5)
                      ? 'fill-current text-gold-500'
                      : 'text-sand'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-charcoal-800">
              {Number(product.rating_avg || 5).toFixed(1)}
            </span>
            <span className="text-[10px] sm:text-[11px] text-charcoal-400">({product.review_count || 0})</span>
          </div>

          {/* Dietary Tag Snippet */}
          <p className="text-[10px] sm:text-[11px] text-charcoal-500 truncate pt-0.5">
            {product.dietary_tags}
          </p>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="pt-2.5 sm:pt-3 border-t border-sand flex items-center justify-between gap-1.5 sm:gap-2">
          <div className="min-w-0">
            {isWholesaleMode ? (
              <div>
                <span className="text-[9px] sm:text-[10px] font-bold text-gold-700 uppercase tracking-wider block truncate">
                  Wholesale Rate
                </span>
                <div className="flex items-baseline gap-1 flex-wrap">
                  <span className="text-sm sm:text-base font-black text-eucalyptus-950">
                    {formatPrice(wholesalePrice)}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-charcoal-400 line-through">
                    {formatPrice(retailPrice)}
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-baseline gap-1 sm:gap-1.5 flex-wrap">
                  <span className="text-sm sm:text-base font-black text-eucalyptus-950">
                    {formatPrice(retailPrice)}
                  </span>
                  {comparePrice && comparePrice > retailPrice && (
                    <span className="text-[10px] sm:text-xs text-charcoal-400 line-through">
                      {formatPrice(comparePrice)}
                    </span>
                  )}
                </div>
                <span className="text-[9px] sm:text-[10px] text-eucalyptus-700 font-semibold flex items-center gap-0.5 truncate">
                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-success shrink-0" /> In Stock
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="bg-eucalyptus-900 hover:bg-eucalyptus-800 text-white p-2 sm:px-3 sm:py-2.5 rounded-xl font-bold text-xs shadow-md hover:shadow-lg transition flex items-center gap-1 sm:gap-1.5 group/btn shrink-0"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:scale-110 transition-transform" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
