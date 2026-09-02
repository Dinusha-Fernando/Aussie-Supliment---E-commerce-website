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
              <p className="text-xs text-eucalyptus-200 mt-0.5">Colombo & Island-Wide Courier</p>
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
              Sri Lanka&apos;s trusted destination for 100% authentic, imported Australian sports nutrition and wellness brands. Sourcing certified original supplements with fast island-wide dispatch from Colombo.
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

            {/* Direct WhatsApp Fast Touchpoint */}
            <div className="pt-2">
              <a
                href="https://wa.me/94775696254?text=Hi%20Aussie%20Supplements,%20I'd%20like%20to%20inquire%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-eucalyptus-900/80 hover:bg-eucalyptus-800 text-eucalyptus-100 hover:text-white border border-eucalyptus-800 px-3.5 py-2 rounded-xl text-xs font-semibold transition group shadow-xs"
              >
                <div className="w-4 h-4 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <span>WhatsApp Live Chat</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              </a>
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

      {/* Bottom Legal & Colombo Sri Lanka Business Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-eucalyptus-900 text-xs text-eucalyptus-300 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>
          © {new Date().getFullYear()} Aussie Supplements (Pvt) Ltd. Colombo, Sri Lanka. 100% Authentic Australian Imported Brands.
        </p>
        <div className="flex items-center gap-4 text-eucalyptus-300">
          <span>Colombo Central Hub</span>
          <span>•</span>
          <span>Island-Wide Delivery Across Sri Lanka</span>
          <span>•</span>
          <span>Cash on Delivery &amp; Card</span>
        </div>
      </div>
    </footer>
  );
};
