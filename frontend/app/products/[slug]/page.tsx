'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { useStore } from '@/lib/storeContext';
import { FALLBACK_PRODUCTS, FALLBACK_REVIEWS, api } from '@/lib/api';
import { Product, Review } from '@/lib/types';
import { ProductCard } from '@/components/products/ProductCard';
import {
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Clock,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  Plus,
  Minus,
  MessageSquare,
  Building2,
  Share2,
  FileText,
  AlertTriangle,
  Flame,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { addToCart, toggleWishlist, isInWishlist, isWholesaleMode, currentUser, showToast, formatPrice } = useStore();

  const product = FALLBACK_PRODUCTS.find((p) => p.slug === slug) || FALLBACK_PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState<string>(
    product?.primary_image || 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=800&q=80'
  );
  const [activeTab, setActiveTab] = useState<'overview' | 'nutrition' | 'directions' | 'warnings' | 'reviews' | 'faq'>('overview');
  const [quantity, setQuantity] = useState<number>(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewFilter, setReviewFilter] = useState<'all' | '5' | '4' | 'verified' | 'photos'>('all');

  // Review Form state
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [hasVotedHelpful, setHasVotedHelpful] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (product) {
      setSelectedImage(product.primary_image || (product.images?.[0]?.image_url || ''));
      const matchingReviews = FALLBACK_REVIEWS.filter((r) => r.product === product.id || r.product_slug === product.slug);
      setReviews(matchingReviews.length > 0 ? matchingReviews : FALLBACK_REVIEWS);
    }
  }, [product]);

  if (!product) {
    return <div className="p-12 text-center text-sm font-bold text-charcoal-500">Product Not Found</div>;
  }

  const isWish = isInWishlist(product.id);
  const retailPrice = Number(product.retail_price);
  const comparePrice = product.compare_at_price ? Number(product.compare_at_price) : null;
  const wholesalePrice = Number(product.wholesale_price);

  const relatedProducts = FALLBACK_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  // Filtered reviews
  const filteredReviews = reviews.filter((r) => {
    if (reviewFilter === '5') return r.rating === 5;
    if (reviewFilter === '4') return r.rating === 4;
    if (reviewFilter === 'verified') return r.is_verified_purchase;
    if (reviewFilter === 'photos') return r.images && r.images.length > 0;
    return true;
  });

  const handleVoteHelpful = (reviewId: number) => {
    if (hasVotedHelpful[reviewId]) return;
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpful_count: r.helpful_count + 1 } : r))
    );
    setHasVotedHelpful((prev) => ({ ...prev, [reviewId]: true }));
    showToast('Thank you for voting this review helpful!');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      showToast('Please provide a title and review text');
      return;
    }

    const newReviewObj: Review = {
      id: Date.now(),
      user_name: currentUser?.first_name ? `${currentUser.first_name} ${currentUser.last_name?.[0] || ''}.` : 'Verified Australian Customer',
      product: product.id,
      product_name: product.name,
      product_slug: product.slug,
      rating: newRating,
      title: newTitle.trim(),
      content: newContent.trim(),
      is_verified_purchase: currentUser?.role === 'RETAIL' || currentUser?.role === 'WHOLESALE',
      is_featured: false,
      status: 'APPROVED',
      helpful_count: 1,
      not_helpful_count: 0,
      images: newPhotoUrl.trim() ? [{ id: Date.now(), image_url: newPhotoUrl.trim(), created_at: new Date().toISOString() }] : undefined,
      created_at: 'Just now'
    };

    setReviews([newReviewObj, ...reviews]);
    setIsReviewFormOpen(false);
    setNewTitle('');
    setNewContent('');
    setNewPhotoUrl('');
    showToast('🎉 Review submitted successfully! Verified badge added.');
  };

  // Google JSON-LD Structured Data
  const jsonLdProduct = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [product.primary_image],
    "description": product.short_description,
    "sku": product.sku,
    "brand": {
      "@type": "Brand",
      "name": product.brand_name
    },
    "offers": {
      "@type": "Offer",
      "url": `https://aussiesupplements.com.au/products/${product.slug}`,
      "priceCurrency": "AUD",
      "price": retailPrice,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.is_in_stock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": Number(product.rating_avg) || 4.9,
      "reviewCount": product.review_count || 120
    }
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />

      {/* Breadcrumb Bar */}
      <div className="bg-sand/40 border-b border-sand py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-charcoal-500 font-semibold overflow-x-auto">
          <Link href="/" className="hover:text-eucalyptus-900 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-400" />
          <Link href="/shop" className="hover:text-eucalyptus-900 transition">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-400" />
          <Link href={`/category/${product.category_slug}`} className="hover:text-eucalyptus-900 transition">
            {product.category_name}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-400" />
          <span className="text-charcoal-900 font-bold truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      {/* Main Product Stage: Images Left, Purchasing Right */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: Image Gallery */}
          <div className="lg:col-span-6 space-y-4 sticky top-28">
            <div className="relative aspect-square w-full bg-white rounded-3xl border border-sand p-8 shadow-xs flex items-center justify-center overflow-hidden">
              {product.artg_number && (
                <span className="absolute top-4 left-4 z-10 bg-eucalyptus-950 text-gold-400 text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-md">
                  <ShieldCheck className="w-4 h-4 text-gold-400" />
                  TGA {product.artg_number}
                </span>
              )}

              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 z-10 p-3 rounded-full shadow-md transition ${
                  isWish ? 'bg-error text-white' : 'bg-white/90 text-charcoal-600 hover:text-error'
                }`}
                title="Save to wishlist"
              >
                <Heart className={`w-5 h-5 ${isWish ? 'fill-current' : ''}`} />
              </button>

              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={selectedImage}
                alt={product.name}
                className="max-h-96 object-contain drop-shadow-md hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Gallery Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(img.image_url)}
                    className={`w-20 h-20 rounded-2xl bg-white border-2 p-2 overflow-hidden transition shrink-0 ${
                      selectedImage === img.image_url ? 'border-eucalyptus-900 shadow-md' : 'border-sand hover:border-charcoal-400'
                    }`}
                  >
                    <img src={img.image_url} alt="Thumbnail" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Purchasing Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-eucalyptus-800 bg-eucalyptus-50 px-2.5 py-1 rounded-md">
                  {product.brand_name}
                </span>
                <span className="text-xs text-charcoal-400 font-semibold">SKU: {product.sku}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-charcoal-950 leading-tight">
                {product.name}
              </h1>

              {/* Rating & Review Link */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-extrabold text-charcoal-900">
                  {Number(product.rating_avg || 4.9).toFixed(1)}
                </span>
                <a
                  href="#customer-reviews"
                  onClick={() => setActiveTab('reviews')}
                  className="text-xs font-bold text-eucalyptus-800 hover:underline"
                >
                  ({product.review_count || 126} Verified Customer Reviews)
                </a>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-5 rounded-2xl bg-white border border-sand space-y-2">
              {isWholesaleMode ? (
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-gold-700 bg-gold-100 px-2.5 py-0.5 rounded uppercase">
                      Wholesale B2B Rate
                    </span>
                    <span className="text-xs text-charcoal-400">Save 35% off retail RRP</span>
                  </div>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-3xl font-black text-eucalyptus-950">
                      {formatPrice(wholesalePrice)}
                    </span>
                    <span className="text-sm text-charcoal-400 line-through">
                      RRP {formatPrice(retailPrice)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-eucalyptus-950">
                    {formatPrice(retailPrice)}
                  </span>
                  {comparePrice && comparePrice > retailPrice && (
                    <span className="text-sm text-charcoal-400 line-through">
                      RRP {formatPrice(comparePrice)}
                    </span>
                  )}
                  {product.discount_percent > 0 && (
                    <span className="text-xs font-bold text-error bg-red-50 px-2 py-0.5 rounded border border-red-200">
                      Save {product.discount_percent}%
                    </span>
                  )}
                </div>
              )}

              {/* Wholesale Tier Schedule Table if available */}
              {product.wholesale_pricing_tiers && product.wholesale_pricing_tiers.length > 0 && (
                <div className="pt-3 border-t border-sand">
                  <span className="text-xs font-bold text-charcoal-700 block mb-2">
                    Bulk Tier Volume Pricing:
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-offwhite p-2 rounded-lg border border-sand">
                      <span className="text-charcoal-500 block text-[10px]">1 – 9 units</span>
                      <strong className="text-charcoal-900">{formatPrice(product.wholesale_pricing_tiers[0]?.unit_price || wholesalePrice)}</strong>
                    </div>
                    <div className="bg-offwhite p-2 rounded-lg border border-sand">
                      <span className="text-charcoal-500 block text-[10px]">10 – 49 units</span>
                      <strong className="text-charcoal-900">{formatPrice(product.wholesale_pricing_tiers[1]?.unit_price || wholesalePrice * 0.9)}</strong>
                    </div>
                    <div className="bg-gold-50 p-2 rounded-lg border border-gold-200">
                      <span className="text-gold-700 block text-[10px]">50+ Bulk</span>
                      <strong className="text-eucalyptus-950 font-black">{formatPrice(product.wholesale_pricing_tiers[2]?.unit_price || wholesalePrice * 0.8)}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Short Description */}
            <p className="text-sm text-charcoal-700 leading-relaxed">
              {product.short_description}
            </p>

            {/* Key Specs Pills */}
            <div className="grid grid-cols-3 gap-2.5 text-xs">
              <div className="bg-white p-3 rounded-xl border border-sand">
                <span className="text-charcoal-400 block text-[10px] uppercase font-bold">Size / Serves</span>
                <span className="font-extrabold text-charcoal-900">{product.size_label}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-sand">
                <span className="text-charcoal-400 block text-[10px] uppercase font-bold">Serving Size</span>
                <span className="font-extrabold text-charcoal-900">{product.serving_size}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-sand">
                <span className="text-charcoal-400 block text-[10px] uppercase font-bold">Format</span>
                <span className="font-extrabold text-charcoal-900">{product.form}</span>
              </div>
            </div>

            {/* Stock & Dispatch Speed */}
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 font-bold text-success">
                <CheckCircle2 className="w-4 h-4 text-success" />
                In Stock • Dispatches in 24 Hours
              </span>
              <span className="text-charcoal-500 text-[11px]">eParcel Express Partner</span>
            </div>

            {/* Purchasing Action Controls */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center justify-between sm:justify-center border-2 border-sand rounded-xl bg-white p-1 shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 sm:p-2.5 hover:bg-sand rounded-lg text-charcoal-700 transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-black text-sm text-charcoal-950 min-w-10 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 sm:p-2.5 hover:bg-sand rounded-lg text-charcoal-700 transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 bg-eucalyptus-900 hover:bg-eucalyptus-800 text-white font-extrabold py-3.5 sm:py-4 px-4 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 text-xs sm:text-sm"
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span className="truncate">ADD TO CART • {formatPrice((isWholesaleMode ? wholesalePrice : retailPrice) * quantity)}</span>
                </button>
              </div>
            </div>

            {/* Guarantees Bar */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-sand text-xs text-charcoal-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-eucalyptus-800 shrink-0" />
                <span>100% Australian TGA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-eucalyptus-800 shrink-0" />
                <span>Free Express Delivery over $100</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabbed Clinical & Regulatory System */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white rounded-3xl border border-sand shadow-sm overflow-hidden">
          {/* Tabs Navigation */}
          <div className="flex border-b border-sand overflow-x-auto scrollbar-none bg-offwhite">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 text-xs sm:text-sm font-extrabold transition shrink-0 ${
                activeTab === 'overview'
                  ? 'bg-white text-eucalyptus-950 border-b-2 border-eucalyptus-900'
                  : 'text-charcoal-500 hover:text-charcoal-900'
              }`}
            >
              Formulation Overview
            </button>
            <button
              onClick={() => setActiveTab('nutrition')}
              className={`px-6 py-4 text-xs sm:text-sm font-extrabold transition shrink-0 ${
                activeTab === 'nutrition'
                  ? 'bg-white text-eucalyptus-950 border-b-2 border-eucalyptus-900'
                  : 'text-charcoal-500 hover:text-charcoal-900'
              }`}
            >
              Ingredients & Nutrition
            </button>
            <button
              onClick={() => setActiveTab('directions')}
              className={`px-6 py-4 text-xs sm:text-sm font-extrabold transition shrink-0 ${
                activeTab === 'directions'
                  ? 'bg-white text-eucalyptus-950 border-b-2 border-eucalyptus-900'
                  : 'text-charcoal-500 hover:text-charcoal-900'
              }`}
            >
              Directions & Protocol
            </button>
            <button
              onClick={() => setActiveTab('warnings')}
              className={`px-6 py-4 text-xs sm:text-sm font-extrabold transition shrink-0 ${
                activeTab === 'warnings'
                  ? 'bg-white text-eucalyptus-950 border-b-2 border-eucalyptus-900'
                  : 'text-charcoal-500 hover:text-charcoal-900'
              }`}
            >
              Warnings & ARTG
            </button>
            <button
              id="customer-reviews"
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-4 text-xs sm:text-sm font-extrabold transition shrink-0 ${
                activeTab === 'reviews'
                  ? 'bg-white text-eucalyptus-950 border-b-2 border-eucalyptus-900'
                  : 'text-charcoal-500 hover:text-charcoal-900'
              }`}
            >
              Verified Reviews ({reviews.length})
            </button>
          </div>

          {/* Tab Content Panes */}
          <div className="p-6 sm:p-10">
            {/* 1. Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <h3 className="text-xl font-extrabold text-charcoal-950">Scientific Formulation & Purity</h3>
                  <p className="text-sm text-charcoal-700 leading-relaxed mt-2">
                    {product.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="bg-offwhite p-5 rounded-2xl border border-sand space-y-1.5">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-eucalyptus-800">Primary Goal</h4>
                    <p className="text-sm text-charcoal-900 font-semibold">{product.goal}</p>
                  </div>
                  <div className="bg-offwhite p-5 rounded-2xl border border-sand space-y-1.5">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-eucalyptus-800">Dietary Certifications</h4>
                    <p className="text-sm text-charcoal-900 font-semibold">{product.dietary_tags}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Nutrition */}
            {activeTab === 'nutrition' && (
              <div className="space-y-6 max-w-3xl">
                <h3 className="text-xl font-extrabold text-charcoal-950">Australian Nutrition Information Table</h3>

                {product.nutrition ? (
                  <div className="border border-sand rounded-2xl overflow-hidden shadow-xs">
                    <div className="bg-eucalyptus-950 text-white p-4 font-bold text-sm flex justify-between">
                      <span>Serving Size: {product.nutrition.serving_size_info}</span>
                      <span>Energy: {product.nutrition.energy_kj}</span>
                    </div>
                    <table className="w-full text-left text-xs divide-y divide-sand">
                      <thead className="bg-offwhite text-charcoal-500 font-bold">
                        <tr>
                          <th className="p-3">Nutrient</th>
                          <th className="p-3 text-right">Quantity Per Serving</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-sand">
                        <tr><td className="p-3 font-semibold">Protein</td><td className="p-3 text-right font-black text-eucalyptus-950">{product.nutrition.protein_g}</td></tr>
                        <tr><td className="p-3 font-semibold">Fat, Total</td><td className="p-3 text-right">{product.nutrition.fat_total_g}</td></tr>
                        <tr><td className="p-3 pl-6 text-charcoal-500">- Saturated</td><td className="p-3 text-right">{product.nutrition.fat_saturated_g}</td></tr>
                        <tr><td className="p-3 font-semibold">Carbohydrates</td><td className="p-3 text-right">{product.nutrition.carbs_total_g}</td></tr>
                        <tr><td className="p-3 pl-6 text-charcoal-500">- Sugars</td><td className="p-3 text-right">{product.nutrition.carbs_sugars_g}</td></tr>
                        <tr><td className="p-3 font-semibold">Sodium</td><td className="p-3 text-right">{product.nutrition.sodium_mg}</td></tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-xs text-charcoal-500">Full nutrition table available on physical packaging.</p>
                )}

                <div className="p-4 bg-offwhite rounded-2xl border border-sand">
                  <h4 className="font-bold text-xs text-charcoal-900 mb-1">Full Ingredients List</h4>
                  <p className="text-xs text-charcoal-600 leading-relaxed">{product.ingredients}</p>
                </div>
              </div>
            )}

            {/* 3. Directions */}
            {activeTab === 'directions' && (
              <div className="space-y-4 max-w-2xl">
                <h3 className="text-xl font-extrabold text-charcoal-950">Directions for Use & Timing</h3>
                <div className="bg-offwhite p-6 rounded-2xl border border-sand space-y-2">
                  <p className="text-sm text-charcoal-800 leading-relaxed font-medium">
                    {product.directions_for_use}
                  </p>
                </div>
                <div className="p-4 bg-eucalyptus-50 rounded-2xl border border-eucalyptus-200 text-xs text-eucalyptus-900">
                  <strong>Pro-Tip:</strong> Consume with cold liquid to preserve optimal mixability and enzymatic integrity.
                </div>
              </div>
            )}

            {/* 4. Warnings */}
            {activeTab === 'warnings' && (
              <div className="space-y-4 max-w-2xl">
                <h3 className="text-xl font-extrabold text-charcoal-950">Warnings & Regulatory Statements</h3>
                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 space-y-2 text-xs text-amber-900">
                  <div className="font-bold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                    Australian Health Warning Notice
                  </div>
                  <p className="leading-relaxed">{product.warnings}</p>
                </div>
                <p className="text-xs text-charcoal-500">
                  <strong>Storage:</strong> {product.storage_info}
                </p>
              </div>
            )}

            {/* 5. Verified Customer Reviews System */}
            {activeTab === 'reviews' && (
              <div className="space-y-10">
                {/* Header Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-sand">
                  <div className="lg:col-span-4 text-center lg:text-left space-y-2">
                    <span className="text-5xl font-black text-eucalyptus-950">
                      {Number(product.rating_avg || 4.9).toFixed(1)}
                    </span>
                    <div className="flex justify-center lg:justify-start text-gold-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-charcoal-500">
                      Based on {reviews.length} genuine customer reviews
                    </p>
                  </div>

                  {/* Rating distribution bar */}
                  <div className="lg:col-span-5 space-y-1.5 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-10 font-bold">5 Star</span>
                      <div className="flex-1 h-2 bg-sand rounded-full overflow-hidden">
                        <div className="h-full bg-gold-500 rounded-full" style={{ width: '92%' }} />
                      </div>
                      <span className="w-8 text-charcoal-400 text-right">92%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-10 font-bold">4 Star</span>
                      <div className="flex-1 h-2 bg-sand rounded-full overflow-hidden">
                        <div className="h-full bg-gold-500 rounded-full" style={{ width: '8%' }} />
                      </div>
                      <span className="w-8 text-charcoal-400 text-right">8%</span>
                    </div>
                  </div>

                  <div className="lg:col-span-3 flex justify-center lg:justify-end">
                    <button
                      onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
                      className="bg-eucalyptus-900 hover:bg-eucalyptus-800 text-white font-bold px-6 py-3 rounded-xl text-xs transition flex items-center gap-2 shadow-md"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Write a Review
                    </button>
                  </div>
                </div>

                {/* Review Submission Form Modal / Box */}
                <AnimatePresence>
                  {isReviewFormOpen && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleReviewSubmit}
                      className="bg-offwhite p-6 rounded-3xl border border-sand space-y-4 overflow-hidden"
                    >
                      <h4 className="font-extrabold text-sm text-charcoal-900">
                        Submit a Verified Review for {product.name}
                      </h4>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-charcoal-600">Your Rating:</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewRating(star)}
                              className="text-gold-500 hover:scale-125 transition-transform"
                            >
                              <Star className={`w-5 h-5 ${star <= newRating ? 'fill-current' : ''}`} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-charcoal-700">Review Title</label>
                        <input
                          type="text"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          placeholder="e.g. Best tasting WPI in Australia by far!"
                          required
                          className="w-full px-4 py-2.5 bg-white border border-sand rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-eucalyptus-800"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-charcoal-700">Review Content</label>
                        <textarea
                          value={newContent}
                          onChange={(e) => setNewContent(e.target.value)}
                          rows={3}
                          placeholder="Share your experience regarding digestibility, mixability, and performance..."
                          required
                          className="w-full px-4 py-2.5 bg-white border border-sand rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-eucalyptus-800"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-charcoal-700">Upload Photo URL (Optional)</label>
                        <input
                          type="url"
                          value={newPhotoUrl}
                          onChange={(e) => setNewPhotoUrl(e.target.value)}
                          placeholder="https://..."
                          className="w-full px-4 py-2 bg-white border border-sand rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-eucalyptus-800"
                        />
                      </div>

                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsReviewFormOpen(false)}
                          className="px-4 py-2 text-xs font-bold text-charcoal-500 hover:text-charcoal-800"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-eucalyptus-900 hover:bg-eucalyptus-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition"
                        >
                          Publish Review
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  <button
                    onClick={() => setReviewFilter('all')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                      reviewFilter === 'all' ? 'bg-eucalyptus-900 text-white' : 'bg-offwhite text-charcoal-700'
                    }`}
                  >
                    All ({reviews.length})
                  </button>
                  <button
                    onClick={() => setReviewFilter('5')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                      reviewFilter === '5' ? 'bg-eucalyptus-900 text-white' : 'bg-offwhite text-charcoal-700'
                    }`}
                  >
                    5 Star Only
                  </button>
                  <button
                    onClick={() => setReviewFilter('verified')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                      reviewFilter === 'verified' ? 'bg-eucalyptus-900 text-white' : 'bg-offwhite text-charcoal-700'
                    }`}
                  >
                    Verified Purchases Only
                  </button>
                </div>

                {/* Review Cards Feed */}
                <div className="space-y-6">
                  {filteredReviews.map((rev) => (
                    <div key={rev.id} className="p-6 bg-offwhite rounded-2xl border border-sand space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex text-gold-500">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                          {rev.is_verified_purchase && (
                            <span className="text-[10px] font-extrabold text-success bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Verified Purchase
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-charcoal-400 font-medium">{rev.created_at}</span>
                      </div>

                      <h4 className="font-extrabold text-sm text-charcoal-950">{rev.title}</h4>
                      <p className="text-xs text-charcoal-700 leading-relaxed">{rev.content}</p>

                      {rev.images && rev.images.length > 0 && (
                        <div className="flex gap-2 pt-1">
                          {rev.images.map((img) => (
                            <img
                              key={img.id}
                              src={img.image_url}
                              alt="Review attachment"
                              className="w-16 h-16 object-cover rounded-xl border border-sand"
                            />
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 text-xs">
                        <span className="font-bold text-charcoal-800">{rev.user_name}</span>

                        <button
                          onClick={() => handleVoteHelpful(rev.id)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition ${
                            hasVotedHelpful[rev.id]
                              ? 'bg-eucalyptus-900 text-white border-eucalyptus-900'
                              : 'bg-white text-charcoal-600 border-sand hover:bg-sand'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>Helpful ({rev.helpful_count})</span>
                        </button>
                      </div>

                      {rev.response && (
                        <div className="mt-3 p-3.5 bg-eucalyptus-50 rounded-xl border border-eucalyptus-200 text-xs text-eucalyptus-950 space-y-1">
                          <span className="font-bold flex items-center gap-1.5 text-eucalyptus-900">
                            <ShieldCheck className="w-3.5 h-3.5 text-eucalyptus-700" />
                            {rev.response.admin_name}
                          </span>
                          <p className="text-charcoal-700 italic">&ldquo;{rev.response.content}&rdquo;</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Synergistic Recommendations Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <h3 className="text-2xl font-black text-charcoal-950 mb-6">
          Frequently Stacked & Recommended
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
