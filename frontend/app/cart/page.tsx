'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/storeContext';
import { api } from '@/lib/api';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  CheckCircle2,
  Tag,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function CartPage() {
  const router = useRouter();
  const { cart, updateCartQuantity, removeFromCart, clearCart, cartSubtotal, showToast, formatPrice } = useStore();
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponAppliedMessage, setCouponAppliedMessage] = useState<string | null>(null);

  const freeShippingThreshold = 100;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - (cartSubtotal - couponDiscount));
  const freeShippingProgress = Math.min(100, ((cartSubtotal - couponDiscount) / freeShippingThreshold) * 100);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const res = await api.validateCoupon(couponCode, cartSubtotal);
    if (res.valid) {
      setCouponDiscount(res.discount_amount);
      setCouponAppliedMessage(res.message);
      showToast(res.message);
    } else {
      setCouponDiscount(0);
      setCouponAppliedMessage(null);
      showToast(res.message || 'Invalid coupon code');
    }
  };

  const finalSubtotal = Math.max(0, cartSubtotal - couponDiscount);
  const shippingFee = remainingForFreeShipping === 0 ? 0 : 9.95;
  const grandTotal = finalSubtotal + shippingFee;
  const gstAmount = Math.round((grandTotal / 11) * 100) / 100;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-offwhite rounded-full flex items-center justify-center text-charcoal-400 mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-charcoal-950">Your Cart is Empty</h1>
          <p className="text-xs sm:text-sm text-charcoal-500 max-w-sm mx-auto">
            Explore our clinical sports nutrition and Australian wellness formulations.
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-eucalyptus-900 hover:bg-eucalyptus-800 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition shadow-md"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-20">
      <div className="flex items-center gap-2 text-xs text-charcoal-500 font-semibold">
        <Link href="/" className="hover:text-eucalyptus-900">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-charcoal-400" />
        <span className="text-charcoal-900 font-bold">Shopping Cart</span>
      </div>

      <h1 className="text-3xl font-black text-charcoal-950">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List Left */}
        <div className="lg:col-span-8 space-y-4">
          {/* Free Shipping Meter */}
          <div className="bg-eucalyptus-50 p-5 rounded-2xl border border-eucalyptus-200">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="flex items-center gap-1.5 text-eucalyptus-900">
                <Truck className="w-4 h-4 text-gold-600" />
                {remainingForFreeShipping === 0 ? (
                  <span className="text-success font-black flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> FREE Express Shipping Unlocked!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-eucalyptus-950">{formatPrice(remainingForFreeShipping)}</strong> for FREE Express Delivery
                  </span>
                )}
              </span>
              <span className="text-eucalyptus-700">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-2.5 bg-eucalyptus-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-gold-500 to-eucalyptus-700 rounded-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-sand shadow-sm p-6 divide-y divide-sand">
            {cart.map((item) => (
              <div key={item.id} className="py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.primary_image}
                    alt={item.product.name}
                    className="w-20 h-20 object-contain rounded-2xl bg-offwhite border border-sand p-1 shrink-0"
                  />
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-eucalyptus-800">
                      {item.product.brand_name}
                    </span>
                    <h3 className="font-extrabold text-sm text-charcoal-900 line-clamp-1">
                      {item.product.name}
                    </h3>
                    <span className="text-xs text-charcoal-500">{item.product.size_label}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  <div className="flex items-center border border-sand rounded-xl bg-offwhite p-1">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 hover:bg-sand rounded-lg text-charcoal-700 transition"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 font-bold text-xs text-charcoal-900 min-w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 hover:bg-sand rounded-lg text-charcoal-700 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="font-black text-sm text-eucalyptus-950 min-w-20 text-right">
                    {formatPrice(item.total_price)}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-charcoal-400 hover:text-error transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={clearCart}
              className="text-xs text-charcoal-500 hover:text-error transition flex items-center gap-1 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear Cart
            </button>
            <Link href="/shop" className="text-xs font-bold text-eucalyptus-900 hover:underline">
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Right */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-sand shadow-lg p-6 space-y-6 sticky top-28">
          <h3 className="font-black text-base text-charcoal-950 pb-3 border-b border-sand">
            Order Summary
          </h3>

          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="Promo Code (WELCOME10)"
              className="w-full px-3 py-2 bg-offwhite border border-sand rounded-xl text-xs uppercase font-semibold focus:outline-none focus:ring-1 focus:ring-eucalyptus-800"
            />
            <button
              type="submit"
              className="bg-charcoal-800 hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-xl transition shrink-0"
            >
              Apply
            </button>
          </form>

          {couponAppliedMessage && (
            <div className="flex items-center gap-1 text-xs text-success font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{couponAppliedMessage}</span>
            </div>
          )}

          <div className="space-y-2 text-xs text-charcoal-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-charcoal-900">{formatPrice(cartSubtotal)}</span>
            </div>
            {couponDiscount > 0 && (
              <div className="flex justify-between text-success font-semibold">
                <span>Coupon Discount</span>
                <span>-{formatPrice(couponDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping (Australia Post)</span>
              <span className="font-bold text-charcoal-900">
                {shippingFee === 0 ? 'FREE' : formatPrice(9.95)}
              </span>
            </div>
            <div className="flex justify-between text-[11px] text-charcoal-400">
              <span>Tax Inclusive</span>
              <span>{formatPrice(gstAmount)}</span>
            </div>
            <div className="flex justify-between text-base font-black text-charcoal-950 pt-3 border-t border-sand">
              <span>Total Amount</span>
              <span className="text-lg text-eucalyptus-950 font-black">{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <button
            onClick={() => router.push('/checkout')}
            className="w-full bg-eucalyptus-900 hover:bg-eucalyptus-800 text-white font-extrabold py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
