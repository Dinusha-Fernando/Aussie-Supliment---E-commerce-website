'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/storeContext';
import {
  Building2,
  ShieldCheck,
  Truck,
  Award,
  ArrowRight,
  CheckCircle2,
  Users,
  TrendingUp,
  CreditCard,
  FileCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function WholesalePage() {
  const { switchDemoRole, formatPrice } = useStore();

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-linear-to-b from-eucalyptus-950 via-eucalyptus-900 to-eucalyptus-950 text-white pt-16 pb-24 border-b border-eucalyptus-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-300 border border-gold-500/30 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase">
            <Building2 className="w-4 h-4 text-gold-400" />
            AUSTRALIAN B2B COMMERCIAL SUPPLY
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Grow Your Supplement Business With Our <span className="gold-gradient-text">Wholesale Program</span>
          </h1>

          <p className="text-base sm:text-lg text-eucalyptus-100 max-w-2xl mx-auto leading-relaxed">
            Direct commercial access to premium 100% Australian grass-fed proteins, clinical Creapure®, and TGA-listed wellness lines with competitive trade margins.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/wholesale/apply"
              className="bg-gold-500 hover:bg-gold-400 text-eucalyptus-950 font-black px-8 py-4 rounded-xl shadow-xl transition text-sm flex items-center gap-2 group"
            >
              <span>APPLY FOR WHOLESALE ACCOUNT (ABN)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/wholesale/dashboard"
              className="bg-eucalyptus-800 hover:bg-eucalyptus-700 text-white font-bold px-6 py-4 rounded-xl border border-eucalyptus-700 transition text-sm flex items-center gap-2"
            >
              <span>ACCESS QUICK-ORDER SKU MATRIX</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Target Industries */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-eucalyptus-800">
            Who We Partner With
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-charcoal-950">
            Trusted By Australia&apos;s Leading Fitness & Health Businesses
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 bg-white rounded-2xl border border-sand shadow-xs space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-eucalyptus-50 text-eucalyptus-900 flex items-center justify-center mx-auto font-black text-lg">
              🏋️
            </div>
            <h3 className="font-extrabold text-sm text-charcoal-900">Gyms & Studios</h3>
            <p className="text-xs text-charcoal-500">CrossFit boxes, boutique gyms & martial arts centers.</p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-sand shadow-xs space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-eucalyptus-50 text-eucalyptus-900 flex items-center justify-center mx-auto font-black text-lg">
              🏪
            </div>
            <h3 className="font-extrabold text-sm text-charcoal-900">Supplement Stores</h3>
            <p className="text-xs text-charcoal-500">Brick & mortar sports nutrition retailers across AU.</p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-sand shadow-xs space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-eucalyptus-50 text-eucalyptus-900 flex items-center justify-center mx-auto font-black text-lg">
              💊
            </div>
            <h3 className="font-extrabold text-sm text-charcoal-900">Pharmacies & Clinics</h3>
            <p className="text-xs text-charcoal-500">Allied health clinics, naturopaths & chemists.</p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-sand shadow-xs space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-eucalyptus-50 text-eucalyptus-900 flex items-center justify-center mx-auto font-black text-lg">
              🛒
            </div>
            <h3 className="font-extrabold text-sm text-charcoal-900">Online Retailers</h3>
            <p className="text-xs text-charcoal-500">Authorized Australian ecommerce wellness platforms.</p>
          </div>
        </div>
      </section>

      {/* Pricing Tiers Table */}
      <section id="tiers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-sand shadow-xl p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-700 bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
              Transparent Margin Schedules
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-charcoal-950">
              Wholesale Pricing Tiers
            </h2>
            <p className="text-xs text-charcoal-500">
              Volume-based price schedules applied automatically at checkout for approved ABN holders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tier 1 */}
            <div className="p-8 rounded-3xl bg-offwhite border-2 border-sand flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-wider text-eucalyptus-800 bg-eucalyptus-100 px-3 py-1 rounded-lg">
                  Tier 1 • Studios & PTs
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-eucalyptus-950">25% OFF</span>
                  <span className="text-xs text-charcoal-500">Retail RRP</span>
                </div>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  Ideal for boutique fitness studios, personal training studios, and small clinics.
                </p>
                <ul className="space-y-2 text-xs text-charcoal-700 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" /> Minimum spend: {formatPrice(300)} per order
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" /> Mix & match flavours across all categories
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" /> Fast 48h express courier dispatch
                  </li>
                </ul>
              </div>

              <Link
                href="/wholesale/apply"
                className="block text-center w-full bg-eucalyptus-900 hover:bg-eucalyptus-800 text-white font-bold py-3.5 rounded-xl text-xs transition"
              >
                Apply for Tier 1 Account →
              </Link>
            </div>

            {/* Tier 2 */}
            <div className="p-8 rounded-3xl bg-eucalyptus-950 text-white border-2 border-gold-500/30 flex flex-col justify-between space-y-6 shadow-2xl relative">
              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-wider text-gold-400 bg-gold-500/20 px-3 py-1 rounded-lg border border-gold-500/30">
                  Tier 2 • Commercial Retailers
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-gold-400">35% OFF</span>
                  <span className="text-xs text-eucalyptus-200">Retail RRP</span>
                </div>
                <p className="text-xs text-eucalyptus-200 leading-relaxed">
                  Built for high-volume commercial supplement retailers, gym franchises, and pharmacy groups.
                </p>
                <ul className="space-y-2 text-xs text-eucalyptus-100 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-400" /> Minimum spend: {formatPrice(1000)} per order
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-400" /> Dedicated Key Account Manager & POS displays
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-400" /> Subsidized commercial pallet freight
                  </li>
                </ul>
              </div>

              <Link
                href="/wholesale/apply"
                className="block text-center w-full bg-gold-500 hover:bg-gold-400 text-eucalyptus-950 font-black py-3.5 rounded-xl text-xs transition"
              >
                Apply for Tier 2 Commercial Rate →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
