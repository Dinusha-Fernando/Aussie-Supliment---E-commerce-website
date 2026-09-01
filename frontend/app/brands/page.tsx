import React from 'react';
import Link from 'next/link';
import { FALLBACK_BRANDS } from '@/lib/api';
import { Award, ShieldCheck, ChevronRight, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Australian Supplement Brands Directory | Aussie Supplements',
  description: 'Explore verified Australian sports nutrition and wellness brands. Aussie Pure Nutrition, Tasman Performance Lab, Byron Bay Organics, and Outback Nutra.',
};

export default function BrandsDirectoryPage() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 pb-24">
      {/* Header */}
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-eucalyptus-50 text-eucalyptus-800 border border-eucalyptus-200 px-3 py-1 rounded-full text-xs font-bold">
          🇦🇺 100% Australian Formulators
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-charcoal-950">
          Brand Directory
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600">
          Discover trusted Australian nutrition laboratories and organic botanical partners adhering to strict GMP and TGA guidelines.
        </p>
      </div>

      {/* Alphabetical Index Strip */}
      <div className="bg-white p-3 rounded-2xl border border-sand shadow-xs flex items-center justify-between overflow-x-auto text-xs font-bold text-charcoal-500">
        {alphabet.map((letter) => (
          <span key={letter} className="px-2 py-1 hover:text-eucalyptus-900 cursor-pointer">
            {letter}
          </span>
        ))}
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {FALLBACK_BRANDS.map((brand) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.slug}`}
            className="group bg-white rounded-3xl p-8 border border-sand shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6"
          >
            <div className="flex items-start gap-5">
              <img
                src={brand.logo_url}
                alt={brand.name}
                className="w-16 h-16 rounded-2xl object-cover border border-sand shadow-xs shrink-0"
              />
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-gold-700 bg-gold-100 px-2 py-0.5 rounded">
                  {brand.origin_country}
                </span>
                <h2 className="text-lg font-black text-charcoal-950 group-hover:text-eucalyptus-800 transition">
                  {brand.name}
                </h2>
                <p className="text-xs text-charcoal-600 leading-relaxed line-clamp-2">
                  {brand.description}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-sand flex items-center justify-between text-xs">
              <span className="font-bold text-charcoal-400">
                {brand.product_count} Clinical Formulations
              </span>
              <span className="font-bold text-eucalyptus-900 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                View Brand Catalog <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
