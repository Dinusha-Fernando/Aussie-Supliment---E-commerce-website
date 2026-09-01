'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/storeContext';
import {
  User,
  ShoppingBag,
  Heart,
  MessageSquare,
  MapPin,
  Building2,
  ShieldCheck,
  ArrowRight,
  Clock,
  CheckCircle2
} from 'lucide-react';

export default function AccountPage() {
  const { currentUser, switchDemoRole, wishlist } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">
      {/* Account Header */}
      <div className="bg-eucalyptus-950 text-white p-8 rounded-3xl border border-gold-500/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gold-500 text-eucalyptus-950 flex items-center justify-center font-black text-2xl shrink-0">
            {currentUser?.first_name?.[0] || 'U'}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-gold-400 bg-gold-500/20 px-2.5 py-0.5 rounded border border-gold-500/30">
                {currentUser?.role || 'RETAIL'} CUSTOMER
              </span>
              <span className="text-xs text-eucalyptus-200">{currentUser?.email}</span>
            </div>
            <h1 className="text-2xl font-black text-white">
              {currentUser?.first_name} {currentUser?.last_name}
            </h1>
            <p className="text-xs text-eucalyptus-200">
              Verified Australian Account • Active since 2025
            </p>
          </div>
        </div>

        {/* Demo Switcher Quick Bar */}
        <div className="flex items-center gap-2 bg-eucalyptus-900 p-1.5 rounded-xl border border-eucalyptus-800 text-xs">
          <button
            onClick={() => switchDemoRole('RETAIL')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              currentUser?.role === 'RETAIL' ? 'bg-gold-500 text-eucalyptus-950' : 'text-eucalyptus-200'
            }`}
          >
            Sarah (Retail B2C)
          </button>
          <button
            onClick={() => switchDemoRole('WHOLESALE')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              currentUser?.role === 'WHOLESALE' ? 'bg-gold-500 text-eucalyptus-950' : 'text-eucalyptus-200'
            }`}
          >
            Mark (Wholesale B2B)
          </button>
        </div>
      </div>

      {/* Account Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/account/orders"
          className="p-6 bg-white rounded-3xl border border-sand shadow-sm hover:shadow-xl transition space-y-3 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-eucalyptus-50 text-eucalyptus-900 flex items-center justify-center font-bold group-hover:bg-eucalyptus-900 group-hover:text-white transition">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h2 className="text-base font-extrabold text-charcoal-900">Order History & Tracking</h2>
          <p className="text-xs text-charcoal-500 leading-relaxed">
            Track live Australia Post eParcel shipments, view invoices, and repeat past orders.
          </p>
          <span className="text-xs font-bold text-eucalyptus-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            View Orders →
          </span>
        </Link>

        <Link
          href="/account/reviews"
          className="p-6 bg-white rounded-3xl border border-sand shadow-sm hover:shadow-xl transition space-y-3 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-gold-50 text-gold-700 flex items-center justify-center font-bold group-hover:bg-gold-500 group-hover:text-eucalyptus-950 transition">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h2 className="text-base font-extrabold text-charcoal-900">My Verified Reviews</h2>
          <p className="text-xs text-charcoal-500 leading-relaxed">
            Manage your verified purchase reviews, photos, helpful votes, and official team responses.
          </p>
          <span className="text-xs font-bold text-eucalyptus-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Manage Reviews →
          </span>
        </Link>

        <Link
          href="/account/wishlist"
          className="p-6 bg-white rounded-3xl border border-sand shadow-sm hover:shadow-xl transition space-y-3 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-error flex items-center justify-center font-bold group-hover:bg-error group-hover:text-white transition">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-base font-extrabold text-charcoal-900">My Saved Wishlist</h2>
          <p className="text-xs text-charcoal-500 leading-relaxed">
            {wishlist.length} saved formulations ready for instant add to cart.
          </p>
          <span className="text-xs font-bold text-eucalyptus-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            View Wishlist →
          </span>
        </Link>
      </div>

      {/* Primary Saved Address Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-charcoal-950 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-eucalyptus-800" />
            Default Australian Shipping Address
          </h2>
          <span className="text-[10px] font-bold uppercase text-success bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Verified Address
          </span>
        </div>

        <div className="p-4 bg-offwhite rounded-2xl border border-sand text-xs text-charcoal-700 space-y-1">
          <p className="font-bold text-charcoal-900">
            {currentUser?.first_name} {currentUser?.last_name}
          </p>
          <p>42 Pitt Street, Level 4 Suite 12</p>
          <p>Sydney, NSW 2000, Australia</p>
          <p className="text-charcoal-500 pt-1">Mobile: {currentUser?.phone || '0412 345 678'}</p>
        </div>
      </div>
    </div>
  );
}
