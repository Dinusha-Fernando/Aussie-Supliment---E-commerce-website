'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  Star,
  FileText,
  Building2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/storeContext';

function SuccessContent() {
  const { formatPrice } = useStore();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || 'AUS-2026-98124';
  const email = searchParams.get('email') || 'sarah.miller@sydneyfitness.com.au';
  const total = searchParams.get('total') || '134.90';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-8">
      {/* Success Badge */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-20 h-20 bg-emerald-100 text-success rounded-full flex items-center justify-center mx-auto shadow-lg"
      >
        <CheckCircle2 className="w-10 h-10 text-success" />
      </motion.div>

      <div className="space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-gold-700 bg-gold-100 px-3.5 py-1 rounded-full border border-gold-300">
          Payment Confirmed & Order Placed
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-charcoal-950">
          Thank you for your order!
        </h1>
        <p className="text-sm text-charcoal-600 max-w-md mx-auto">
          We have sent your official tax invoice and order receipt to <strong>{email}</strong>.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-white rounded-3xl p-8 border border-sand shadow-lg text-left space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-sand gap-4">
          <div>
            <span className="text-xs text-charcoal-400 font-bold uppercase">Order Reference</span>
            <h3 className="font-mono text-lg font-black text-eucalyptus-950">{orderNumber}</h3>
          </div>
          <div>
            <span className="text-xs text-charcoal-400 font-bold uppercase">Total Paid</span>
            <h3 className="text-lg font-black text-charcoal-900">{formatPrice(total)}</h3>
          </div>
          <div>
            <span className="text-xs text-charcoal-400 font-bold uppercase">Carrier Dispatch</span>
            <span className="text-xs font-extrabold text-success block">Australia Post eParcel</span>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-charcoal-500">
            Fulfillment Progress
          </h4>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="font-bold text-success block text-xs">1. Confirmed</span>
              <span className="text-[10px] text-charcoal-500">Ready for packing</span>
            </div>
            <div className="p-3 bg-offwhite rounded-xl border border-sand">
              <span className="font-bold text-charcoal-700 block text-xs">2. Packing</span>
              <span className="text-[10px] text-charcoal-400">Sydney Warehouse</span>
            </div>
            <div className="p-3 bg-offwhite rounded-xl border border-sand">
              <span className="font-bold text-charcoal-700 block text-xs">3. Dispatched</span>
              <span className="text-[10px] text-charcoal-400">Australia Post</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <Link
          href="/account/orders"
          className="bg-eucalyptus-900 hover:bg-eucalyptus-800 text-white font-bold px-7 py-3.5 rounded-xl text-xs transition shadow-md"
        >
          View in My Account
        </Link>
        <Link
          href="/shop"
          className="bg-offwhite hover:bg-sand text-charcoal-800 font-bold px-7 py-3.5 rounded-xl border border-sand text-xs transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading Order Details...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
