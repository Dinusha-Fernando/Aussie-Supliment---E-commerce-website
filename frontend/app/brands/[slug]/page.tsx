import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FALLBACK_BRANDS, FALLBACK_PRODUCTS } from '@/lib/api';
import { ProductCard } from '@/components/products/ProductCard';
import { ChevronRight, ShieldCheck, Award, Building2 } from 'lucide-react';
import type { Metadata } from 'next';

interface BrandPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = FALLBACK_BRANDS.find((b) => b.slug === slug);
  if (!brand) return { title: 'Brand Not Found | Aussie Supplements' };

  return {
    title: `${brand.name} Australia | Authentic Sports Nutrition & Wellness`,
    description: `Shop authentic ${brand.name} products in Australia. ${brand.description}`,
  };
}

export default async function BrandDetailPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = FALLBACK_BRANDS.find((b) => b.slug === slug);

  if (!brand) {
    notFound();
  }

  const brandProducts = FALLBACK_PRODUCTS.filter((p) => p.brand_name.toLowerCase() === brand.name.toLowerCase());

  return (
    <div className="space-y-12 pb-24">
      {/* Brand Hero Banner */}
      <div className="bg-eucalyptus-950 text-white py-14 border-b border-eucalyptus-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs text-eucalyptus-200 font-semibold">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/brands" className="hover:text-white">Brands</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gold-400 font-bold">{brand.name}</span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2">
            <img
              src={brand.logo_url}
              alt={brand.name}
              className="w-24 h-24 rounded-3xl object-cover border-2 border-gold-500/30 shadow-xl shrink-0"
            />
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 bg-gold-500/20 px-3 py-1 rounded-full border border-gold-500/30">
                {brand.origin_country}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white">{brand.name}</h1>
              <p className="text-xs sm:text-sm text-eucalyptus-100 max-w-2xl leading-relaxed">
                {brand.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-charcoal-950">
            {brand.name} Range ({brandProducts.length})
          </h2>
          <Link href="/shop" className="text-xs font-bold text-eucalyptus-900 hover:underline">
            View All Brands Catalog →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
