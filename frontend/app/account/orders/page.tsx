'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/storeContext';
import {
  ShoppingBag,
  Truck,
  CheckCircle2,
  ChevronRight,
  FileText,
  Clock,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

export default function AccountOrdersPage() {
  const { currentUser, formatPrice } = useStore();

  const orders = [
    {
      order_number: 'AUS-2026-8812',
      date: '2026-02-14',
      status: 'DELIVERED',
      tracking_number: 'AP-SYD-998241',
      total: 134.90,
      carrier: 'Australia Post eParcel Express',
      items: [
        { name: 'Aussie Pure 100% Grass-Fed Whey Protein Isolate 2kg', size: '2kg / Chocolate', qty: 1, price: 89.95 },
        { name: 'Tasman Performance Ultra-Pure Creapure® Creatine 500g', size: '500g', qty: 1, price: 44.95 }
      ]
    },
    {
      order_number: 'AUS-2026-7241',
      date: '2026-01-20',
      status: 'DELIVERED',
      tracking_number: 'AP-MEL-441029',
      total: 39.95,
      carrier: 'Australia Post Standard',
      items: [
        { name: 'Outback Nutra High-Absorption Magnesium Bisglycinate', size: '120 Veg Caps', qty: 1, price: 39.95 }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-charcoal-500 font-semibold">
        <Link href="/" className="hover:text-eucalyptus-900">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/account" className="hover:text-eucalyptus-900">My Account</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-charcoal-900 font-bold">Order History</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-charcoal-950">
            My Orders & Tracking
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Track deliveries, download official Australian tax invoices, and reorder.
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.order_number} className="bg-white rounded-3xl border border-sand shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-sand gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-charcoal-400 font-bold uppercase">Order Reference</span>
                <h3 className="font-mono text-base font-black text-eucalyptus-950">{order.order_number}</h3>
                <span className="text-charcoal-500 text-[11px]">Placed on {order.date}</span>
              </div>

              <div className="space-y-1 sm:text-right">
                <span className="text-charcoal-400 font-bold uppercase">Status</span>
                <span className="inline-flex items-center gap-1 text-xs font-black text-success bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 block">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {order.status}
                </span>
                <span className="text-charcoal-500 text-[11px] block">Track: {order.tracking_number}</span>
              </div>
            </div>

            {/* Items in order */}
            <div className="divide-y divide-sand space-y-3">
              {order.items.map((it, idx) => (
                <div key={idx} className="pt-3 flex items-center justify-between gap-4 first:pt-0 text-xs">
                  <div>
                    <h4 className="font-bold text-charcoal-900">{it.name}</h4>
                    <span className="text-charcoal-400">{it.size} • Qty: {it.qty}</span>
                  </div>
                  <span className="font-extrabold text-charcoal-900">{formatPrice(it.price)}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-sand flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 text-charcoal-500">
                <Truck className="w-4 h-4 text-eucalyptus-800" />
                <span>Delivered via <strong>{order.carrier}</strong></span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="font-black text-sm text-eucalyptus-950">
                  Total: {formatPrice(order.total)}
                </span>
                <Link
                  href="/account/reviews"
                  className="bg-gold-50 hover:bg-gold-100 text-gold-800 font-bold px-4 py-2 rounded-xl border border-gold-300 transition flex items-center gap-1.5 text-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Write Review
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
