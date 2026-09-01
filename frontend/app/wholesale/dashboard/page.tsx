'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/storeContext';
import { FALLBACK_PRODUCTS } from '@/lib/api';
import {
  Building2,
  Plus,
  Minus,
  ShoppingBag,
  CheckCircle2,
  FileText,
  Truck,
  ArrowRight,
  Search
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function WholesaleDashboardPage() {
  const { addToCart, setIsCartDrawerOpen, showToast, setIsWholesaleMode, formatPrice } = useStore();
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleQtyChange = (productId: number, qty: number) => {
    const val = Math.max(0, qty);
    setQuantities((prev) => ({ ...prev, [productId]: val }));
  };

  const filteredProducts = FALLBACK_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateItemPrice = (p: typeof FALLBACK_PRODUCTS[0], qty: number) => {
    if (qty >= 50) return Number(p.wholesale_price) * 0.85;
    if (qty >= 10) return Number(p.wholesale_price) * 0.92;
    return Number(p.wholesale_price);
  };

  const totalWholesaleUnits = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalWholesaleSpend = Object.entries(quantities).reduce((sum, [pId, qty]) => {
    if (qty <= 0) return sum;
    const prod = FALLBACK_PRODUCTS.find((p) => p.id === Number(pId));
    if (!prod) return sum;
    return sum + calculateItemPrice(prod, qty) * qty;
  }, 0);

  const handleAddAllToCart = () => {
    let addedCount = 0;
    Object.entries(quantities).forEach(([pId, qty]) => {
      if (qty > 0) {
        const prod = FALLBACK_PRODUCTS.find((p) => p.id === Number(pId));
        if (prod) {
          addToCart(prod, qty, true);
          addedCount += qty;
        }
      }
    });

    if (addedCount > 0) {
      setIsWholesaleMode(true);
      showToast(`Added ${addedCount} wholesale units to cart`);
      setIsCartDrawerOpen(true);
      setQuantities({});
    } else {
      showToast('Please enter quantities for at least 1 product SKU');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-32">
      {/* Account Status Header */}
      <div className="bg-eucalyptus-950 text-white rounded-3xl p-8 sm:p-10 border border-gold-500/20 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-gold-400 bg-gold-500/20 px-3 py-1 rounded-full border border-gold-500/30">
              Verified Commercial Trade
            </span>
            <span className="text-xs text-eucalyptus-200">ABN: 51 824 753 556</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Wholesale Portal • Quick Order Matrix
          </h1>
          <p className="text-xs sm:text-sm text-eucalyptus-100 max-w-xl">
            Welcome back, <strong>Mark Taylor (GymPower Performance HQ)</strong>. Your Tier 1 trade pricing (25% off RRP + volume breaks) is active.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/account/orders"
            className="bg-eucalyptus-900 hover:bg-eucalyptus-800 text-xs font-bold px-4 py-3 rounded-xl border border-eucalyptus-700 text-center transition"
          >
            Past B2B Invoices
          </Link>
          <Link
            href="/wholesale/apply"
            className="bg-gold-500 hover:bg-gold-400 text-eucalyptus-950 text-xs font-black px-4 py-3 rounded-xl text-center transition"
          >
            Request Tier 2 Upgrade
          </Link>
        </div>
      </div>

      {/* SKU Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-sand shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by SKU, Product Name, or Category..."
            className="w-full pl-9 pr-4 py-2 bg-offwhite border border-sand rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-eucalyptus-800 font-medium"
          />
        </div>

        <div className="flex items-center gap-4 text-xs text-charcoal-500">
          <span className="flex items-center gap-1.5 font-bold text-success">
            <CheckCircle2 className="w-4 h-4 text-success" /> All SKUs In Stock in Sydney/Melbourne Hubs
          </span>
        </div>
      </div>

      {/* Quick Order SKU Table */}
      <div className="bg-white rounded-3xl border border-sand shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-sand min-w-[750px]">
            <thead className="bg-offwhite text-charcoal-500 font-extrabold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-4 px-6">SKU / Product</th>
                <th className="py-4 px-4">Size</th>
                <th className="py-4 px-4 text-center">Retail RRP</th>
                <th className="py-4 px-4 text-center">Tier 1 Rate</th>
                <th className="py-4 px-4 text-center">10+ Rate</th>
                <th className="py-4 px-4 text-center">50+ Bulk</th>
                <th className="py-4 px-6 text-center">Order Qty</th>
                <th className="py-4 px-6 text-right">Line Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand">
              {filteredProducts.map((p) => {
                const qty = quantities[p.id] || 0;
                const unitRate = calculateItemPrice(p, qty);
                const lineTotal = unitRate * qty;

                return (
                  <tr key={p.id} className="hover:bg-eucalyptus-50/40 transition">
                    {/* SKU & Product info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.primary_image}
                          alt={p.name}
                          className="w-12 h-12 object-contain bg-offwhite rounded-xl border border-sand shrink-0"
                        />
                        <div>
                          <span className="font-mono text-[10px] font-bold text-eucalyptus-800 bg-eucalyptus-50 px-1.5 py-0.5 rounded">
                            {p.sku}
                          </span>
                          <h4 className="font-bold text-charcoal-900 line-clamp-1 mt-0.5">
                            {p.name}
                          </h4>
                          <span className="text-[10px] text-charcoal-400">{p.flavour || 'Standard'}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-semibold text-charcoal-600">
                      {p.size_label}
                    </td>

                    <td className="py-4 px-4 text-center text-charcoal-400 line-through">
                      {formatPrice(p.retail_price)}
                    </td>

                    <td className="py-4 px-4 text-center font-extrabold text-charcoal-900">
                      {formatPrice(p.wholesale_price)}
                    </td>

                    <td className="py-4 px-4 text-center font-bold text-eucalyptus-800">
                      {formatPrice(Number(p.wholesale_price) * 0.92)}
                    </td>

                    <td className="py-4 px-4 text-center font-black text-gold-600">
                      {formatPrice(Number(p.wholesale_price) * 0.85)}
                    </td>

                    {/* Quantity Input Stepper */}
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center border border-sand rounded-xl bg-offwhite p-1 max-w-[120px] mx-auto">
                        <button
                          onClick={() => handleQtyChange(p.id, qty - 5)}
                          className="p-1.5 text-charcoal-500 hover:bg-sand rounded-lg transition"
                          title="-5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <input
                          type="number"
                          min="0"
                          value={qty === 0 ? '' : qty}
                          onChange={(e) => handleQtyChange(p.id, parseInt(e.target.value) || 0)}
                          placeholder="0"
                          className="w-12 text-center font-extrabold text-xs bg-transparent focus:outline-none text-charcoal-900"
                        />
                        <button
                          onClick={() => handleQtyChange(p.id, qty + 5)}
                          className="p-1.5 text-charcoal-500 hover:bg-sand rounded-lg transition"
                          title="+5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </td>

                    {/* Line Total */}
                    <td className="py-4 px-6 text-right font-black text-eucalyptus-950">
                      {formatPrice(lineTotal)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Bottom Sticky Action Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-eucalyptus-950/95 backdrop-blur-md text-white border-t border-gold-500/30 p-4 shadow-2xl z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-[10px] uppercase font-bold text-eucalyptus-300 block">Total B2B Units</span>
              <strong className="text-base text-white">{totalWholesaleUnits} items</strong>
            </div>
            <div className="h-8 w-px bg-eucalyptus-800" />
            <div>
              <span className="text-[10px] uppercase font-bold text-gold-400 block">Wholesale Order Total</span>
              <strong className="text-xl text-gold-300 font-black">{formatPrice(totalWholesaleSpend)}</strong>
            </div>
          </div>

          <button
            onClick={handleAddAllToCart}
            disabled={totalWholesaleUnits === 0}
            className="w-full sm:w-auto bg-gold-500 hover:bg-gold-400 disabled:opacity-40 text-eucalyptus-950 font-black px-8 py-3.5 rounded-xl shadow-xl transition flex items-center justify-center gap-2 text-xs"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>ADD ALL ITEMS TO WHOLESALE CART</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
