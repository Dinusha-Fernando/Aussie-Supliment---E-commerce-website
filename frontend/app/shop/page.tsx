'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FALLBACK_CATEGORIES, FALLBACK_BRANDS, FALLBACK_PRODUCTS } from '@/lib/api';
import { ProductCard } from '@/components/products/ProductCard';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/storeContext';
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  Search,
  Check,
  RotateCcw,
  Flame,
  Zap,
  ShieldCheck,
  LayoutGrid,
  List
} from 'lucide-react';
import { motion } from 'framer-motion';

function ShopContent() {
  const { formatPrice } = useStore();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialQuery = searchParams.get('q') || '';
  const initialGoal = searchParams.get('goal') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedForm, setSelectedForm] = useState<string>('all');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceMax, setPriceMax] = useState<number>(120);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return FALLBACK_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category_slug !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== 'all' && product.brand_name !== selectedBrand) {
        return false;
      }
      // Form filter
      if (selectedForm !== 'all' && product.form !== selectedForm) {
        return false;
      }
      // Dietary filter
      if (selectedDietary !== 'all' && !product.dietary_tags.toLowerCase().includes(selectedDietary.toLowerCase())) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchDesc = product.short_description.toLowerCase().includes(q);
        const matchBrand = product.brand_name.toLowerCase().includes(q);
        const matchSKU = product.sku.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchBrand && !matchSKU) return false;
      }
      // Price
      if (Number(product.retail_price) > priceMax) {
        return false;
      }
      // Stock
      if (inStockOnly && !product.is_in_stock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return Number(a.retail_price) - Number(b.retail_price);
      if (sortBy === 'price_high') return Number(b.retail_price) - Number(a.retail_price);
      if (sortBy === 'rating') return Number(b.rating_avg) - Number(a.rating_avg);
      if (sortBy === 'best_seller') return (b.is_best_seller ? 1 : 0) - (a.is_best_seller ? 1 : 0);
      return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
    });
  }, [selectedCategory, selectedBrand, selectedForm, selectedDietary, searchQuery, sortBy, inStockOnly, priceMax]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedForm('all');
    setSelectedDietary('all');
    setSearchQuery('');
    setSortBy('featured');
    setInStockOnly(false);
    setPriceMax(120);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header & Breadcrumb */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-charcoal-500 font-semibold">
          <span>Home</span>
          <span>/</span>
          <span className="text-eucalyptus-900 font-bold">Australian Supplements Catalog</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-charcoal-950">
              Shop All Supplements
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
              Showing {filteredProducts.length} premium Australian certified formulations
            </p>
          </div>

          {/* Quick Search & Sort Bar */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter name, ingredient, SKU..."
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-sand rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-eucalyptus-800"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-sand rounded-xl px-3 py-2.5 text-xs font-bold text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-eucalyptus-800 shrink-0"
            >
              <option value="featured">Featured First</option>
              <option value="best_seller">Best Sellers</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>

            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden p-2.5 bg-eucalyptus-900 text-white rounded-xl flex items-center gap-1.5 text-xs font-bold shrink-0"
              aria-label="Filter"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="inline sm:hidden">Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters Desktop */}
        <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-3xl border border-sand shadow-xs h-fit sticky top-28">
          <div className="flex items-center justify-between pb-4 border-b border-sand">
            <h3 className="font-extrabold text-sm text-charcoal-950 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-eucalyptus-800" />
              Filter Products
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs text-eucalyptus-800 hover:text-eucalyptus-950 font-bold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Categories Filter */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-charcoal-400">
              Category
            </h4>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center justify-between ${
                  selectedCategory === 'all'
                    ? 'bg-eucalyptus-900 text-white font-bold'
                    : 'text-charcoal-700 hover:bg-offwhite'
                }`}
              >
                <span>All Categories</span>
                <span>{FALLBACK_PRODUCTS.length}</span>
              </button>
              {FALLBACK_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center justify-between ${
                    selectedCategory === cat.slug
                      ? 'bg-eucalyptus-900 text-white font-bold'
                      : 'text-charcoal-700 hover:bg-offwhite'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="opacity-70">{cat.product_count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brands Filter */}
          <div className="space-y-2 pt-2 border-t border-sand">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-charcoal-400">
              Australian Brand
            </h4>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              <button
                onClick={() => setSelectedBrand('all')}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium ${
                  selectedBrand === 'all' ? 'text-eucalyptus-900 font-bold' : 'text-charcoal-600'
                }`}
              >
                All Brands
              </button>
              {FALLBACK_BRANDS.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => setSelectedBrand(brand.name)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedBrand === brand.name ? 'text-eucalyptus-900 font-bold bg-eucalyptus-50' : 'text-charcoal-600 hover:text-charcoal-900'
                  }`}
                >
                  {brand.name}
                </button>
              ))}
            </div>
          </div>

          {/* Format Filter */}
          <div className="space-y-2 pt-2 border-t border-sand">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-charcoal-400">
              Format
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setSelectedForm(selectedForm === 'POWDER' ? 'all' : 'POWDER')}
                className={`p-2 rounded-xl border text-center font-bold transition ${
                  selectedForm === 'POWDER'
                    ? 'bg-eucalyptus-900 text-white border-eucalyptus-900'
                    : 'bg-offwhite border-sand text-charcoal-700 hover:bg-sand'
                }`}
              >
                Powder
              </button>
              <button
                onClick={() => setSelectedForm(selectedForm === 'CAPSULES' ? 'all' : 'CAPSULES')}
                className={`p-2 rounded-xl border text-center font-bold transition ${
                  selectedForm === 'CAPSULES'
                    ? 'bg-eucalyptus-900 text-white border-eucalyptus-900'
                    : 'bg-offwhite border-sand text-charcoal-700 hover:bg-sand'
                }`}
              >
                Capsules
              </button>
            </div>
          </div>

          {/* Max Price Range Slider */}
          <div className="space-y-2 pt-2 border-t border-sand">
            <div className="flex justify-between text-xs">
              <span className="font-extrabold uppercase tracking-wider text-charcoal-400">Max Price</span>
              <span className="font-bold text-eucalyptus-950">{formatPrice(priceMax)}</span>
            </div>
            <input
              type="range"
              min={30}
              max={120}
              step={5}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-eucalyptus-900"
            />
          </div>

          {/* In Stock Toggle */}
          <div className="pt-2 border-t border-sand">
            <label className="flex items-center gap-2 text-xs font-bold text-charcoal-800 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-eucalyptus-900 accent-eucalyptus-900"
              />
              <span>In Stock Only (Dispatches within 24h)</span>
            </label>
          </div>
        </aside>

        {/* Products Grid Main Area */}
        <div className="lg:col-span-3 space-y-6">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-sand space-y-4">
              <div className="w-16 h-16 rounded-full bg-offwhite flex items-center justify-center text-charcoal-400 mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-charcoal-900">No matching formulations found</h3>
              <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
                Try adjusting your category, brand or price filters to explore the full Australian range.
              </p>
              <button
                onClick={resetFilters}
                className="bg-eucalyptus-900 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Slide-in Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl z-10 flex flex-col p-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-sand">
              <h3 className="font-extrabold text-base text-charcoal-950 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-eucalyptus-800" />
                Filters
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetFilters}
                  className="text-xs text-eucalyptus-800 font-bold"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 text-charcoal-500 hover:bg-offwhite rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="py-4 space-y-5 flex-1 overflow-y-auto">
              {/* Category */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase text-charcoal-400">Category</h4>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                      selectedCategory === 'all' ? 'bg-eucalyptus-900 text-white' : 'text-charcoal-700 bg-offwhite'
                    }`}
                  >
                    All Categories ({FALLBACK_PRODUCTS.length})
                  </button>
                  {FALLBACK_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                        selectedCategory === cat.slug ? 'bg-eucalyptus-900 text-white' : 'text-charcoal-700 bg-offwhite'
                      }`}
                    >
                      {cat.name} ({cat.product_count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Format */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase text-charcoal-400">Format</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setSelectedForm(selectedForm === 'POWDER' ? 'all' : 'POWDER')}
                    className={`p-2 rounded-lg border text-center font-bold ${
                      selectedForm === 'POWDER' ? 'bg-eucalyptus-900 text-white' : 'bg-offwhite border-sand'
                    }`}
                  >
                    Powder
                  </button>
                  <button
                    onClick={() => setSelectedForm(selectedForm === 'CAPSULES' ? 'all' : 'CAPSULES')}
                    className={`p-2 rounded-lg border text-center font-bold ${
                      selectedForm === 'CAPSULES' ? 'bg-eucalyptus-900 text-white' : 'bg-offwhite border-sand'
                    }`}
                  >
                    Capsules
                  </button>
                </div>
              </div>

              {/* Max Price */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-extrabold uppercase text-charcoal-400">Max Price</span>
                  <span className="font-bold text-eucalyptus-950">{formatPrice(priceMax)}</span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={120}
                  step={5}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-eucalyptus-900"
                />
              </div>

              {/* In Stock */}
              <label className="flex items-center gap-2 text-xs font-bold text-charcoal-800 cursor-pointer pt-2 border-t border-sand">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-eucalyptus-900 accent-eucalyptus-900"
                />
                <span>In Stock Only</span>
              </label>
            </div>

            <div className="pt-3 border-t border-sand">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-eucalyptus-900 text-white font-bold py-3 rounded-xl shadow-md text-xs"
              >
                View {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-bold text-charcoal-500">Loading Australian Supplements Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
