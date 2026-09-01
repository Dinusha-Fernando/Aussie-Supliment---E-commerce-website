'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/storeContext';
import {
  ShieldCheck,
  Award,
  Truck,
  Building2,
  Leaf,
  CheckCircle2,
  Mail,
  ArrowRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      showToast('🎉 Thank you! Your 10% coupon code is WELCOME10');
      setEmail('');
    }
  };

  return (
    <footer className="bg-eucalyptus-950 text-white pt-16 pb-12 border-t border-eucalyptus-900">
      {/* Trust Credential Badges Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-eucalyptus-900">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 bg-eucalyptus-900/60 p-4 rounded-2xl border border-eucalyptus-800/80">
            <div className="w-11 h-11 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center shrink-0 border border-gold-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">TGA & ARTG Listed</h4>
              <p className="text-xs text-eucalyptus-200 mt-0.5">Therapeutic strength compliance</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-eucalyptus-900/60 p-4 rounded-2xl border border-eucalyptus-800/80">
            <div className="w-11 h-11 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center shrink-0 border border-gold-500/20">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Grass-Fed Dairy</h4>
              <p className="text-xs text-eucalyptus-200 mt-0.5">Victorian pasture sourced</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-eucalyptus-900/60 p-4 rounded-2xl border border-eucalyptus-800/80">
            <div className="w-11 h-11 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center shrink-0 border border-gold-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Lab Tested & Certified</h4>
              <p className="text-xs text-eucalyptus-200 mt-0.5">HPLC purity verified</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-eucalyptus-900/60 p-4 rounded-2xl border border-eucalyptus-800/80">
            <div className="w-11 h-11 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center shrink-0 border border-gold-500/20">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Express Dispatch</h4>
              <p className="text-xs text-eucalyptus-200 mt-0.5">Australia Post eParcel</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <img
                src="/assets/logo.png"
                alt="Aussie Supplement Official Logo"
                className="h-14 sm:h-16 w-auto object-contain rounded-2xl shadow-xl border border-eucalyptus-800/80 group-hover:scale-102 transition-transform duration-300"
              />
            </Link>
            <p className="text-sm text-eucalyptus-200 max-w-sm leading-relaxed">
              Australia&apos;s leading evidence-based sports nutrition and wellness platform. Sourcing certified pure raw materials for both retail athletes and commercial B2B wholesale partners.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block mb-2">
                Join our Australian Wellness VIP Club (Get 10% Off)
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="bg-eucalyptus-900/80 border border-eucalyptus-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-eucalyptus-400 focus:outline-none focus:ring-2 focus:ring-gold-500 flex-1"
                />
                <button
                  type="submit"
                  className="bg-gold-500 hover:bg-gold-400 text-eucalyptus-950 font-bold px-5 py-2.5 rounded-xl text-sm transition flex items-center gap-1 shrink-0"
                >
                  Join <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-4">
              Shop Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-eucalyptus-200">
              <li>
                <Link href="/category/protein" className="hover:text-white transition">
                  Whey Protein Isolate (WPI)
                </Link>
              </li>
              <li>
                <Link href="/category/sports-nutrition" className="hover:text-white transition">
                  Creapure® Creatine
                </Link>
              </li>
              <li>
                <Link href="/category/sports-nutrition" className="hover:text-white transition">
                  Clinical Pre-Workouts
                </Link>
              </li>
              <li>
                <Link href="/category/vitamins-minerals" className="hover:text-white transition">
                  Magnesium Bisglycinate
                </Link>
              </li>
              <li>
                <Link href="/category/wellness-longevity" className="hover:text-white transition">
                  Marine Collagen Peptides
                </Link>
              </li>
              <li>
                <Link href="/category/herbal-supplements" className="hover:text-white transition">
                  KSM-66® Ashwagandha
                </Link>
              </li>
            </ul>
          </div>

          {/* Wholesale B2B */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-4">
              Wholesale & Commercial
            </h4>
            <ul className="space-y-2.5 text-sm text-eucalyptus-200">
              <li>
                <Link href="/wholesale" className="hover:text-white transition">
                  Wholesale Overview
                </Link>
              </li>
              <li>
                <Link href="/wholesale/apply" className="hover:text-white transition">
                  ABN Wholesale Application
                </Link>
              </li>
              <li>
                <Link href="/wholesale/dashboard" className="hover:text-white transition">
                  Quick Order SKU Matrix
                </Link>
              </li>
              <li>
                <Link href="/wholesale#tiers" className="hover:text-white transition">
                  Tiered Pricing Schedules
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Commercial Account Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Science & Policies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-4">
              Science & Company
            </h4>
            <ul className="space-y-2.5 text-sm text-eucalyptus-200">
              <li>
                <Link href="/blog" className="hover:text-white transition">
                  Supplement Science Guides
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Aussie Supplements
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-white transition">
                  Australian Brand Partners
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy & Data Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal & ABN Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-eucalyptus-900 text-xs text-eucalyptus-300 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>
          © {new Date().getFullYear()} Aussie Supplements Pty Ltd. ABN: 51 824 753 556. All prices include 10% Australian GST.
        </p>
        <div className="flex items-center gap-4 text-eucalyptus-300">
          <span>Melbourne • Sydney • Brisbane Dispatch</span>
          <span>•</span>
          <span>Australia Post eParcel Partner</span>
        </div>
      </div>
    </footer>
  );
};
