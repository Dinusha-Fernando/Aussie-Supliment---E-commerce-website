'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/storeContext';
import { ProductCard } from '@/components/products/ProductCard';
import { Heart, ChevronRight, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-charcoal-500 font-semibold">
        <Link href="/" className="hover:text-eucalyptus-900">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/account" className="hover:text-eucalyptus-900">My Account</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-charcoal-900 font-bold">Saved Wishlist</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-charcoal-950">
            My Saved Wishlist ({wishlist.length})
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Formulations you have saved for fast ordering.
          </p>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-sand space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-50 text-error flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-charcoal-900">Your wishlist is currently empty</h3>
          <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
            Click the heart icon on any product in our store to save it here for future reference.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-eucalyptus-900 hover:bg-eucalyptus-800 text-white font-bold px-6 py-3 rounded-xl text-xs transition"
          >
            <span>Browse Supplements</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
