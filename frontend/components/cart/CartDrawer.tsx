'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/storeContext';
import { api } from '@/lib/api';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Truck,
  CheckCircle2,
  Building2,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer: React.FC = () => {
  const router = useRouter();
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartItemCount,
    showToast,
    isWholesaleMode,
    formatPrice
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponAppliedMessage, setCouponAppliedMessage] = useState<string | null>(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const freeShippingThreshold = 100;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - (cartSubtotal - couponDiscount));
  const freeShippingProgress = Math.min(100, ((cartSubtotal - couponDiscount) / freeShippingThreshold) * 100);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setIsApplyingCoupon(true);
    const res = await api.validateCoupon(couponCode, cartSubtotal);
    setIsApplyingCoupon(false);

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

  const finalTotal = Math.max(0, cartSubtotal - couponDiscount);
  const gstAmount = Math.round((finalTotal / 11) * 100) / 100;

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-sand flex items-center justify-between bg-offwhite">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-eucalyptus-900" />
                <h3 className="font-extrabold text-base text-charcoal-900">
                  Your Cart ({cartItemCount})
                </h3>
              </div>
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="p-2 text-charcoal-500 hover:bg-sand rounded-xl transition"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Meter */}
            <div className="bg-eucalyptus-50 p-4 border-b border-eucalyptus-100">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5 text-eucalyptus-900">
                  <Truck className="w-4 h-4 text-gold-600" />
                  {remainingForFreeShipping === 0 ? (
                    <span className="text-success font-black flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> FREE Express Shipping Unlocked!
                    </span>
                  ) : (
                    <span>
                      Add <strong className="text-eucalyptus-950">{formatPrice(remainingForFreeShipping)}</strong> for FREE Express Shipping
                    </span>
                  )}
                </span>
                <span className="text-eucalyptus-700">{Math.round(freeShippingProgress)}%</span>
              </div>
              <div className="w-full h-2 bg-eucalyptus-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-linear-to-r from-gold-500 to-eucalyptus-700 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${freeShippingProgress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 divide-y divide-sand">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-offwhite flex items-center justify-center text-charcoal-300">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900">Your cart is empty</h4>
                    <p className="text-xs text-charcoal-500 mt-1 max-w-xs">
                      Explore our premium 100% Australian grass-fed proteins, Creapure creatine, and wellness botanicals.
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="bg-eucalyptus-900 hover:bg-eucalyptus-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="py-4 flex gap-3.5 first:pt-0 last:pb-0">
                    <img
                      src={item.product.primary_image || 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=300&q=80'}
                      alt={item.product.name}
                      className="w-18 h-18 object-cover rounded-xl bg-offwhite border border-sand shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-charcoal-900 line-clamp-2 leading-snug">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-charcoal-400 hover:text-error transition p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] text-charcoal-500 font-medium">
                            {item.product.size_label}
                          </span>
                          {item.is_wholesale && (
                            <span className="text-[10px] font-bold bg-gold-100 text-gold-800 px-1.5 py-0.2 rounded border border-gold-300">
                              Wholesale B2B
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2.5">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-sand rounded-lg bg-offwhite">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-sand text-charcoal-700 transition rounded-l-lg"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-charcoal-900 min-w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-sand text-charcoal-700 transition rounded-r-lg"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-extrabold text-eucalyptus-950">
                          {formatPrice(item.total_price)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-sand bg-offwhite space-y-4">
                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-charcoal-400" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Promo Code (e.g. WELCOME10)"
                      className="w-full pl-8 pr-3 py-2 bg-white border border-sand rounded-xl text-xs uppercase font-medium focus:outline-none focus:ring-1 focus:ring-eucalyptus-700"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isApplyingCoupon || !couponCode.trim()}
                    className="bg-charcoal-800 hover:bg-black text-white text-xs font-bold px-3.5 py-2 rounded-xl transition disabled:opacity-50"
                  >
                    Apply
                  </button>
                </form>

                {couponAppliedMessage && (
                  <div className="flex items-center gap-1.5 text-xs text-success font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{couponAppliedMessage}</span>
                  </div>
                )}

                {/* Pricing Breakdown */}
                <div className="space-y-1.5 text-xs text-charcoal-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-charcoal-900">{formatPrice(cartSubtotal)}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-success font-semibold">
                      <span>Coupon Discount</span>
                      <span>-{formatPrice(couponDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span className="font-semibold text-charcoal-900">
                      {remainingForFreeShipping === 0 ? 'FREE' : formatPrice(9.95)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-charcoal-400">
                    <span>Tax Inclusive</span>
                    <span>{formatPrice(gstAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-charcoal-950 pt-2 border-t border-sand">
                    <span>Total Amount</span>
                    <span className="text-base text-eucalyptus-950 font-black">
                      {formatPrice(finalTotal + (remainingForFreeShipping === 0 ? 0 : 9.95))}
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    router.push('/checkout');
                  }}
                  className="w-full bg-eucalyptus-900 hover:bg-eucalyptus-800 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 text-sm group"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* WhatsApp Cart Assistance */}
                <a
                  href={`https://wa.me/94775696254?text=${encodeURIComponent(
                    `Hi Aussie Supplements! I have ${cart.length} item(s) in my cart (Total: ${formatPrice(finalTotal)}). Could you help me with my order / payment?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 border border-emerald-200 rounded-xl py-2 px-3 text-xs font-bold transition flex items-center justify-center gap-2 active:scale-98"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 fill-[#25D366] shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Need help with this order? Chat on WhatsApp</span>
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
