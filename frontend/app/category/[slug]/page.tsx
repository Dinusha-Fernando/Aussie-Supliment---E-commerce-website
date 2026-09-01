import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from '@/lib/api';
import { ProductCard } from '@/components/products/ProductCard';
import { ChevronRight, ShieldCheck, Flame, Zap, Leaf, Heart } from 'lucide-react';
import type { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = FALLBACK_CATEGORIES.find((c) => c.slug === slug);
  if (!category) return { title: 'Category Not Found | Aussie Supplements' };

  return {
    title: `${category.name} Supplements Australia | Australian Pure Nutrition`,
    description: `Shop premium ${category.name} supplements in Australia. ${category.description} 100% Australian grass-fed and TGA compliant.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = FALLBACK_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const products = FALLBACK_PRODUCTS.filter((p) => p.category_slug === slug);

  return (
    <div className="space-y-10 pb-20">
      {/* Category Hero Banner */}
      <div className="relative bg-eucalyptus-950 text-white py-14 overflow-hidden border-b border-eucalyptus-900">
        <div className="absolute inset-0 opacity-20">
          <img
            src={category.image_url}
            alt={category.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-xs text-eucalyptus-200 font-semibold">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/shop" className="hover:text-white transition">Shop</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gold-400 font-bold">{category.name}</span>
          </div>

          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400 bg-gold-500/20 px-3 py-1 rounded-full border border-gold-500/30">
              Australian Category Range
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {category.name}
            </h1>
            <p className="text-sm sm:text-base text-eucalyptus-100 leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Subcategories Pills */}
          {category.subcategories && category.subcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {category.subcategories.map((sub) => (
                <span
                  key={sub.id}
                  className="bg-eucalyptus-900/90 border border-eucalyptus-700/80 text-xs font-bold text-eucalyptus-100 px-3.5 py-1.5 rounded-xl backdrop-blur-md"
                >
                  {sub.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-charcoal-900">
            Available {category.name} Products ({products.length})
          </h2>
          <Link href="/shop" className="text-xs font-bold text-eucalyptus-900 hover:underline">
            View All Supplements →
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-sand">
            <p className="text-sm text-charcoal-500">No products currently in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
