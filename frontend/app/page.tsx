'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/storeContext';
import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS, FALLBACK_REVIEWS, FALLBACK_BLOG_POSTS, FALLBACK_HERO_SLIDES } from '@/lib/api';
import { HeroSlide, HeroHotspot } from '@/lib/types';
import { ProductCard } from '@/components/products/ProductCard';
import {
  ShieldCheck,
  Award,
  Truck,
  Compass,
  Flame,
  Zap,
  Leaf,
  Heart,
  ArrowRight,
  Star,
  CheckCircle2,
  Building2,
  ChevronRight,
  ChevronLeft,
  ThumbsUp,
  Clock,
  BookOpen,
  ShoppingBag,
  Activity,
  Dna,
  Plus,
  Sparkles,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomePage() {
  const { setIsFinderOpen, addToCart, formatPrice, isWholesaleMode, heroSlides, trustPillars } = useStore();
  const [heroFormulaIndex, setHeroFormulaIndex] = useState<number>(0);
  const [heroPersonaTab, setHeroPersonaTab] = useState<'retail' | 'wholesale'>('retail');
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('all');
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const bestSellers = FALLBACK_PRODUCTS.filter((p) => p.is_best_seller);
  const displayedProducts =
    activeCategoryTab === 'all'
      ? FALLBACK_PRODUCTS
      : FALLBACK_PRODUCTS.filter((p) => p.category_slug === activeCategoryTab);

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % FALLBACK_REVIEWS.length);
  };

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + FALLBACK_REVIEWS.length) % FALLBACK_REVIEWS.length);
  };

  const currentReview = FALLBACK_REVIEWS[currentReviewIndex];

  const rawSlides: HeroSlide[] = (heroSlides && heroSlides.length > 0) ? heroSlides : FALLBACK_HERO_SLIDES;
  const heroFormulas = rawSlides.map((s: HeroSlide) => ({
    id: s.id,
    name: s.title,
    tagline: s.tagline,
    heroTitle: s.hero_title,
    subline: s.subline,
    size: s.size_servings,
    price: Number(s.retail_price),
    wholesalePrice: Number(s.wholesale_price),
    image: s.image_url,
    haloGradient: s.halo_gradient,
    glowShadow: s.glow_shadow,
    badgeTop: { value: s.badge_top_value, label: s.badge_top_label, sub: s.badge_top_sub },
    badgeBottom: { title: s.badge_bottom_title, subtitle: s.badge_bottom_subtitle },
    badgeRating: { score: s.badge_rating_score, count: s.badge_rating_count },
    slug: s.slug,
    tabLabel: s.tab_label,
    hotspots: s.hotspots || []
  }));

  const activeFormula = heroFormulas[heroFormulaIndex % heroFormulas.length] || heroFormulas[0];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-hidden">
      {/* 1. ULTRA-LUXURY CINEMATIC HERO SECTION */}
      <section className="relative bg-[#040D0B] text-white pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
        {/* Precision Coordinate Markers & Laboratory Dot Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(229,169,60,0.06)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-80" />

        {/* Ambient Drifting Embers */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-20, -600],
                x: [0, (i % 2 === 0 ? 30 : -30)],
                opacity: [0, 0.7, 0]
              }}
              transition={{
                duration: 7 + (i * 1.5),
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.8
              }}
              style={{
                left: `${12 + (i * 11)}%`,
                bottom: '5%'
              }}
              className="absolute w-1.5 h-1.5 rounded-full bg-gold-400/50 blur-[0.5px]"
            />
          ))}
        </div>

        {/* Fluid Aurora Glow Waves */}
        <motion.div
          animate={{ rotate: [0, 360], scale: [1, 1.15, 1] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -left-40 w-[750px] h-[750px] bg-gradient-to-tr from-emerald-600/15 via-teal-500/10 to-transparent rounded-full blur-[140px] pointer-events-none"
        />
        <motion.div
          animate={{ rotate: [360, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 -right-40 w-[650px] h-[650px] bg-gradient-to-bl from-gold-500/15 via-amber-500/10 to-transparent rounded-full blur-[130px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* LEFT COLUMN: Narrative & Value Proposition */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              {/* Live Status Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-gold-400/30 backdrop-blur-xl shadow-[0_0_20px_rgba(229,169,60,0.15)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                  <span className="text-[11px] font-black tracking-widest uppercase text-gold-300">
                    VICTORIAN PASTURE • ARTG REGISTERED
                  </span>
                </div>

                <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[11px] font-bold text-emerald-300 backdrop-blur-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Melbourne Logistics: Live Dispatch</span>
                </div>
              </div>

              {/* Editorial Master Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-black tracking-tight text-white leading-[1.02]">
                  Australia's Purest <br />
                  <span className="font-serif italic font-normal bg-linear-to-r from-[#FFF0C2] via-[#E5A93C] to-[#F3BD48] bg-clip-text text-transparent">
                    Clinical Formulations.
                  </span>
                </h1>

                {/* Persona Mode Switcher */}
                <div className="inline-flex items-center p-1 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-xl">
                  <button
                    onClick={() => setHeroPersonaTab('retail')}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                      heroPersonaTab === 'retail'
                        ? 'bg-linear-to-r from-gold-500 to-amber-500 text-eucalyptus-950 shadow-[0_0_20px_rgba(229,169,60,0.4)] scale-102'
                        : 'text-eucalyptus-200 hover:text-white'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>RETAIL ATHLETES</span>
                  </button>
                  <button
                    onClick={() => setHeroPersonaTab('wholesale')}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                      heroPersonaTab === 'wholesale'
                        ? 'bg-linear-to-r from-gold-500 to-amber-500 text-eucalyptus-950 shadow-[0_0_20px_rgba(229,169,60,0.4)] scale-102'
                        : 'text-eucalyptus-200 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>COMMERCIAL WHOLESALE (ABN)</span>
                  </button>
                </div>

                <p className="text-sm sm:text-base text-eucalyptus-100/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                  {heroPersonaTab === 'retail'
                    ? activeFormula.subline
                    : 'Official B2B commercial supply for gyms, CrossFit boxes, recovery clinics, and pharmacies. Volume SKU tier schedules, ABN tax invoicing, and rapid dispatch from our Melbourne logistics center.'}
                </p>
              </div>

              {/* 4 Micro-Metric Stat Cards in Frosted Glass */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                <div className="bg-white/[0.04] backdrop-blur-xl p-3.5 rounded-2xl border border-white/[0.08] text-center sm:text-left hover:border-gold-500/40 transition">
                  <span className="block text-2xl font-black text-white">{activeFormula.badgeTop.value}</span>
                  <span className="text-[10px] text-eucalyptus-300 font-bold uppercase tracking-wider">{activeFormula.badgeTop.label}</span>
                </div>
                <div className="bg-white/[0.04] backdrop-blur-xl p-3.5 rounded-2xl border border-white/[0.08] text-center sm:text-left hover:border-gold-500/40 transition">
                  <span className="block text-2xl font-black text-gold-400">100%</span>
                  <span className="text-[10px] text-eucalyptus-300 font-bold uppercase tracking-wider">Victorian Pasture</span>
                </div>
                <div className="bg-white/[0.04] backdrop-blur-xl p-3.5 rounded-2xl border border-white/[0.08] text-center sm:text-left hover:border-gold-500/40 transition">
                  <span className="block text-2xl font-black text-white">TGA</span>
                  <span className="text-[10px] text-eucalyptus-300 font-bold uppercase tracking-wider">AUST L Certified</span>
                </div>
                <div className="bg-white/[0.04] backdrop-blur-xl p-3.5 rounded-2xl border border-white/[0.08] text-center sm:text-left hover:border-gold-500/40 transition">
                  <span className="block text-2xl font-black text-emerald-400">4.98★</span>
                  <span className="text-[10px] text-eucalyptus-300 font-bold uppercase tracking-wider">15,000+ Athletes</span>
                </div>
              </div>

              {/* High-Impact CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/shop"
                  className="relative group overflow-hidden bg-linear-to-r from-gold-500 via-gold-400 to-amber-400 text-eucalyptus-950 font-black px-8 py-4 rounded-2xl shadow-[0_0_35px_rgba(229,169,60,0.35)] hover:shadow-[0_0_55px_rgba(229,169,60,0.55)] transition-all duration-300 text-sm flex items-center gap-2.5 transform active:scale-98"
                >
                  <span className="absolute inset-0 w-1/2 h-full bg-white/30 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
                  <span className="relative z-10 flex items-center gap-2">
                    <span>ORDER FORMULATION • {formatPrice(heroPersonaTab === 'wholesale' ? activeFormula.wholesalePrice : activeFormula.price)}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>
                </Link>

                <button
                  onClick={() => setIsFinderOpen(true)}
                  className="inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.12] text-white font-bold px-6 py-4 rounded-2xl border border-white/15 hover:border-gold-400/40 backdrop-blur-xl transition text-xs group"
                >
                  <Compass className="w-4 h-4 text-gold-400 group-hover:rotate-90 transition-transform duration-500" />
                  <span>Take 60s Supplement Quiz</span>
                </button>
              </div>

              {/* Wholesale Direct Link */}
              <div className="pt-2 text-xs text-eucalyptus-300 flex items-center justify-center lg:justify-start gap-2">
                <span>Commercial ABN partner?</span>
                <Link href="/wholesale" className="font-extrabold text-gold-400 hover:text-gold-300 underline underline-offset-4 flex items-center gap-1">
                  <span>Apply for Wholesale Tier Pricing (Up to 40% Off)</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Ultra-Luxury 3D Showcase Stage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative flex flex-col items-center justify-center"
            >
              {/* Formula Switcher Tabs */}
              <div className="w-full max-w-lg flex items-center justify-center bg-black/40 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl mb-4 sm:mb-6 shadow-2xl">
                {heroFormulas.map((f: any, idx: number) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      setHeroFormulaIndex(idx);
                      setActiveHotspot(null);
                    }}
                    className={`flex-1 py-2 px-2 text-center rounded-xl text-xs font-black transition-all truncate ${
                      heroFormulaIndex === idx
                        ? 'bg-linear-to-r from-gold-500 to-amber-500 text-eucalyptus-950 shadow-[0_0_20px_rgba(229,169,60,0.4)] scale-102'
                        : 'text-eucalyptus-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {f.tabLabel}
                  </button>
                ))}
              </div>

              {/* 3D Showcase Pod with Orbiting Halo & Interactive Hotspots */}
              <div className="relative w-full max-w-lg aspect-square rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-center group overflow-visible">
                {/* Spinning Ambient Halo */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className={`absolute inset-4 rounded-full bg-linear-to-tr ${activeFormula.haloGradient} blur-3xl opacity-75 pointer-events-none`}
                />

                {/* Floating 3D Product */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFormula.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="relative z-10 w-full flex flex-col items-center"
                  >
                    <motion.div
                      animate={{ y: [0, -12, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative flex items-center justify-center"
                    >
                      <img
                        src={activeFormula.image}
                        alt={activeFormula.name}
                        className={`w-72 sm:w-84 md:w-96 aspect-square object-contain rounded-3xl ${activeFormula.glowShadow} transition-all duration-500`}
                      />

                      {/* Interactive Radar Hotspots */}
                      {activeFormula.hotspots.map((pin: HeroHotspot, i: number) => (
                        <div
                          key={i}
                          style={{ left: pin.x, top: pin.y }}
                          className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
                        >
                          <button
                            onClick={() => setActiveHotspot(activeHotspot === i ? null : i)}
                            onMouseEnter={() => setActiveHotspot(i)}
                            className="relative group/pin flex items-center justify-center w-7 h-7 rounded-full bg-gold-400 text-eucalyptus-950 shadow-[0_0_25px_rgba(229,169,60,0.8)] hover:scale-125 transition-transform cursor-pointer"
                            title={pin.title}
                          >
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
                            <Plus className="w-3.5 h-3.5 font-black" />
                          </button>

                          {/* Hotspot Hover/Click Holographic Card */}
                          {activeHotspot === i && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-56 p-3 rounded-2xl bg-eucalyptus-950/95 backdrop-blur-2xl border border-gold-400/50 shadow-2xl text-left z-40"
                            >
                              <div className="flex items-center justify-between pb-1 border-b border-white/10">
                                <span className="text-xs font-black text-gold-300">{pin.title}</span>
                                <button onClick={() => setActiveHotspot(null)} className="text-white/60 hover:text-white">
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                              <p className="text-[11px] text-eucalyptus-100 pt-1 leading-tight">{pin.detail}</p>
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </motion.div>

                    {/* Holographic Floating Badge 1: Top Left */}
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -top-3 -left-2 sm:-left-4 bg-white/[0.08] backdrop-blur-2xl text-white p-2.5 sm:p-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-2.5 z-20"
                    >
                      <div className="w-8 h-8 rounded-xl bg-gold-500/20 border border-gold-400/40 text-gold-300 flex items-center justify-center font-black text-xs shrink-0">
                        {activeFormula.badgeTop.value}
                      </div>
                      <div>
                        <span className="text-[9px] font-black text-gold-300 uppercase tracking-widest block">
                          {activeFormula.badgeTop.label}
                        </span>
                        <span className="text-xs font-black text-white block">
                          {activeFormula.badgeTop.sub}
                        </span>
                      </div>
                    </motion.div>

                    {/* Holographic Floating Badge 2: Bottom Right */}
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                      className="absolute -bottom-3 -right-2 sm:-right-4 bg-eucalyptus-950/90 backdrop-blur-2xl text-white p-2.5 sm:p-3 rounded-2xl shadow-2xl border border-emerald-400/40 flex items-center gap-2.5 z-20"
                    >
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest block">
                          {activeFormula.badgeBottom.title}
                        </span>
                        <span className="text-xs font-bold text-white block">
                          {activeFormula.badgeBottom.subtitle}
                        </span>
                      </div>
                    </motion.div>

                    {/* Holographic Floating Badge 3: Top Right Athlete Rating */}
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                      className="absolute -top-3 -right-2 sm:-right-3 bg-white/[0.08] backdrop-blur-2xl text-white px-3 py-1.5 rounded-full shadow-2xl border border-white/20 flex items-center gap-1.5 text-xs font-black z-20"
                    >
                      <Award className="w-3.5 h-3.5 text-gold-400" />
                      <span>{activeFormula.badgeRating.score} ★</span>
                      <span className="text-[10px] text-eucalyptus-300 font-normal">({activeFormula.badgeRating.count})</span>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Full-Width Luxury Marquee Trust Ribbon */}
          <div className="mt-12 sm:mt-16 pt-6 border-t border-white/[0.08] max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-gold-400 font-bold">
                  🇦🇺
                </div>
                <div>
                  <h5 className="font-black text-xs text-white">100% Australian</h5>
                  <p className="text-[11px] text-eucalyptus-300">Blended in Victoria</p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-gold-400">
                  <ShieldCheck className="w-4 h-4 text-gold-400" />
                </div>
                <div>
                  <h5 className="font-black text-xs text-white">TGA & ARTG Listed</h5>
                  <p className="text-[11px] text-eucalyptus-300">Therapeutic Assayed</p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-gold-400">
                  <Truck className="w-4 h-4 text-gold-400" />
                </div>
                <div>
                  <h5 className="font-black text-xs text-white">Same-Day Dispatch</h5>
                  <p className="text-[11px] text-eucalyptus-300">Australia Post Express</p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-gold-400">
                  <Leaf className="w-4 h-4 text-gold-400" />
                </div>
                <div>
                  <h5 className="font-black text-xs text-white">100% Clean Label</h5>
                  <p className="text-[11px] text-eucalyptus-300">Zero Artificial Sweeteners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AUSTRALIAN TRUST PILLARS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 lg:-mt-12 relative z-20">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-sand p-4 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {(trustPillars && trustPillars.length > 0 ? trustPillars : [
            { id: 1, title: '100% Australian', subtitle: 'Formulated locally', icon_type: 'flag', order: 1, is_active: true },
            { id: 2, title: 'TGA Quality Assured', subtitle: 'ARTG Registered', icon_type: 'ShieldCheck', order: 2, is_active: true },
            { id: 3, title: 'B2B Wholesale', subtitle: 'Tiered trade pricing', icon_type: 'Award', order: 3, is_active: true },
            { id: 4, title: 'Express Shipping', subtitle: 'Free on orders $100+', icon_type: 'Truck', order: 4, is_active: true },
          ]).map((pillar, idx) => (
            <div key={pillar.id || idx} className="flex items-center gap-2.5 sm:gap-3.5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-eucalyptus-50 text-eucalyptus-900 flex items-center justify-center shrink-0 border border-eucalyptus-100 font-bold text-sm sm:text-base">
                {pillar.icon_type === 'flag' || pillar.title.includes('Australian') ? '🇦🇺' : (
                  pillar.icon_type === 'Award' ? <Award className="w-5 h-5 sm:w-6 sm:h-6 text-gold-600" /> :
                  pillar.icon_type === 'Truck' ? <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-eucalyptus-800" /> :
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-eucalyptus-800" />
                )}
              </div>
              <div className="min-w-0">
                <h4 className="font-extrabold text-xs sm:text-sm text-charcoal-900 truncate">{pillar.title}</h4>
                <p className="text-[10px] sm:text-xs text-charcoal-500 truncate">{pillar.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-eucalyptus-800">
              Curated Formulations
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-charcoal-950 mt-1">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold text-eucalyptus-900 hover:text-eucalyptus-700 inline-flex items-center gap-1 group"
          >
            View All Categories ({FALLBACK_CATEGORIES.length})
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {FALLBACK_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-4/5 bg-charcoal-900 flex flex-col justify-end p-3.5 sm:p-5 shadow-sm hover:shadow-xl transition-all"
            >
              {/* Category Background Image */}
              <img
                src={cat.image_url}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />

              {/* Card Text Content */}
              <div className="relative z-10 space-y-0.5 sm:space-y-1">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gold-400">
                  {cat.product_count} Products
                </span>
                <h3 className="font-extrabold text-sm sm:text-base text-white group-hover:text-gold-300 transition line-clamp-1">
                  {cat.name}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-eucalyptus-100 line-clamp-2 leading-tight hidden sm:block">
                  {cat.description}
                </p>
                <div className="pt-1 sm:pt-2 flex items-center text-[10px] sm:text-xs font-bold text-gold-400 group-hover:translate-x-1 transition-transform">
                  Explore <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. BEST SELLERS & PRODUCT CATALOG GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-eucalyptus-800">
              Verified Australian Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-charcoal-950 mt-1">
              Best Sellers & Trending Formulas
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveCategoryTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                activeCategoryTab === 'all'
                  ? 'bg-eucalyptus-900 text-white shadow-md'
                  : 'bg-white text-charcoal-700 hover:bg-sand border border-sand'
              }`}
            >
              All Supplements
            </button>
            <button
              onClick={() => setActiveCategoryTab('protein')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                activeCategoryTab === 'protein'
                  ? 'bg-eucalyptus-900 text-white shadow-md'
                  : 'bg-white text-charcoal-700 hover:bg-sand border border-sand'
              }`}
            >
              Protein WPI
            </button>
            <button
              onClick={() => setActiveCategoryTab('sports-nutrition')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                activeCategoryTab === 'sports-nutrition'
                  ? 'bg-eucalyptus-900 text-white shadow-md'
                  : 'bg-white text-charcoal-700 hover:bg-sand border border-sand'
              }`}
            >
              Sports Nutrition
            </button>
            <button
              onClick={() => setActiveCategoryTab('vitamins-minerals')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                activeCategoryTab === 'vitamins-minerals'
                  ? 'bg-eucalyptus-900 text-white shadow-md'
                  : 'bg-white text-charcoal-700 hover:bg-sand border border-sand'
              }`}
            >
              Vitamins & Minerals
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE SUPPLEMENT FINDER QUIZ BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-r from-eucalyptus-950 via-eucalyptus-900 to-eucalyptus-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border border-gold-500/20 shadow-2xl">
          <div className="absolute -right-12 -bottom-12 w-80 h-80 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 bg-gold-500/20 text-gold-300 border border-gold-500/30 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5 text-gold-400" />
                Interactive Diagnostic Tool
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                Not sure which formulation matches your fitness goal?
              </h3>
              <p className="text-sm sm:text-base text-eucalyptus-200 max-w-xl leading-relaxed">
                Take our 60-second evidence-based quiz to calculate your exact protein intake, clinical creatine dosage, and recovery micronutrient schedule.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <button
                onClick={() => setIsFinderOpen(true)}
                className="bg-gold-500 hover:bg-gold-400 text-eucalyptus-950 font-black px-8 py-4 rounded-2xl shadow-xl transition text-sm flex items-center gap-2 group"
              >
                <span>FIND YOUR SUPPLEMENT</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VERIFIED CUSTOMER REVIEWS & TRUST CAROUSEL */}
      <section className="bg-sand/50 py-16 sm:py-20 border-y border-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-eucalyptus-800">
                100% Authentic Feedback
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-charcoal-950 mt-1">
                What Our Customers Say
              </h2>
            </div>

            {/* Aggregate Rating Pill */}
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-sand shadow-xs">
              <div className="flex text-gold-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <div className="text-xs">
                <strong className="text-charcoal-950 font-extrabold">4.9 / 5.0</strong>
                <span className="text-charcoal-500 ml-1">Based on 1,200+ verified purchases</span>
              </div>
            </div>
          </div>

          {/* Review Carousel Container */}
          <div className="relative bg-white rounded-3xl p-8 sm:p-12 border border-sand shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex text-gold-500">
                    {[...Array(currentReview.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  {currentReview.is_verified_purchase && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-success bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Purchase
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-charcoal-950 leading-snug">
                  &ldquo;{currentReview.title}&rdquo;
                </h3>

                <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed italic">
                  &ldquo;{currentReview.content}&rdquo;
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <p className="font-extrabold text-sm text-charcoal-900">{currentReview.user_name}</p>
                    <p className="text-xs text-eucalyptus-800 font-semibold">{currentReview.product_name}</p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-charcoal-500 bg-offwhite px-3 py-1.5 rounded-xl border border-sand">
                    <ThumbsUp className="w-3.5 h-3.5 text-eucalyptus-700" />
                    <span>{currentReview.helpful_count} found this helpful</span>
                  </div>
                </div>

                {currentReview.response && (
                  <div className="mt-4 p-4 bg-eucalyptus-50 rounded-2xl border border-eucalyptus-200 text-xs text-eucalyptus-950 space-y-1">
                    <div className="font-extrabold flex items-center gap-1.5 text-eucalyptus-900">
                      <ShieldCheck className="w-4 h-4 text-eucalyptus-700" />
                      {currentReview.response.admin_name}
                    </div>
                    <p className="text-charcoal-700 italic">
                      &ldquo;{currentReview.response.content}&rdquo;
                    </p>
                  </div>
                )}
              </div>

              {/* Review Photo Preview Right */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-sand pt-6 lg:pt-0 lg:pl-8 space-y-4">
                {currentReview.images && currentReview.images.length > 0 ? (
                  <div className="space-y-2 text-center">
                    <img
                      src={currentReview.images[0].image_url}
                      alt="Verified Customer Photo"
                      className="w-48 h-48 object-cover rounded-2xl border border-sand shadow-md mx-auto"
                    />
                    <span className="text-[11px] text-charcoal-400 font-medium">Customer Uploaded Photo</span>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <div className="w-20 h-20 rounded-full bg-eucalyptus-50 border border-eucalyptus-200 flex items-center justify-center text-eucalyptus-900 font-black text-2xl mx-auto">
                      {currentReview.user_name[0]}
                    </div>
                    <span className="text-xs text-charcoal-500 block">Verified Australian Athlete</span>
                  </div>
                )}

                {/* Carousel Navigation Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={prevReview}
                    className="p-3 rounded-xl bg-offwhite hover:bg-sand text-charcoal-800 border border-sand transition"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-xs font-bold text-charcoal-500">
                    {currentReviewIndex + 1} / {FALLBACK_REVIEWS.length}
                  </span>
                  <button
                    onClick={nextReview}
                    className="p-3 rounded-xl bg-offwhite hover:bg-sand text-charcoal-800 border border-sand transition"
                    aria-label="Next review"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHOLESALE B2B CALLOUT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-sand shadow-xl p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-700 bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
              Commercial B2B Supply
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-charcoal-950 leading-tight">
              Grow Your Supplement Business With Our Australian Wholesale Program
            </h2>
            <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
              We supply over 450 gyms, CrossFit studios, pharmacies, and health food stores across NSW, Victoria, Queensland and WA. Enjoy tiered volume discounts up to 35% off retail, flexible 30-day payment terms, and rapid pallet freight dispatch.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-3.5 bg-offwhite rounded-xl border border-sand">
                <strong className="text-charcoal-950 font-bold block text-sm">Tier 1 • Gyms & Studios</strong>
                <span className="text-charcoal-500">25% margin • Min order $300</span>
              </div>
              <div className="p-3.5 bg-offwhite rounded-xl border border-sand">
                <strong className="text-charcoal-950 font-bold block text-sm">Tier 2 • Retail Stores</strong>
                <span className="text-charcoal-500">35% margin • Min order $1,000</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/wholesale/apply"
                className="bg-eucalyptus-900 hover:bg-eucalyptus-800 text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition text-xs flex items-center gap-2"
              >
                <span>APPLY FOR ABN WHOLESALE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/wholesale"
                className="bg-offwhite hover:bg-sand text-charcoal-800 font-bold px-5 py-3.5 rounded-xl border border-sand transition text-xs"
              >
                Learn About B2B Terms
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-eucalyptus-950 rounded-2xl p-6 text-white space-y-4">
            <h3 className="font-extrabold text-base text-gold-400 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-gold-400" />
              Wholesale Quick Order Preview
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 bg-eucalyptus-900 rounded-lg border border-eucalyptus-800">
                <span>APN Grass-Fed WPI 2kg</span>
                <span className="font-bold text-gold-300">{formatPrice(58.50)} <small className="text-eucalyptus-400">(RRP {formatPrice(89.95)})</small></span>
              </div>
              <div className="flex justify-between p-2.5 bg-eucalyptus-900 rounded-lg border border-eucalyptus-800">
                <span>Creapure® Creatine 500g</span>
                <span className="font-bold text-gold-300">{formatPrice(26.00)} <small className="text-eucalyptus-400">(RRP {formatPrice(44.95)})</small></span>
              </div>
              <div className="flex justify-between p-2.5 bg-eucalyptus-900 rounded-lg border border-eucalyptus-800">
                <span>Magnesium Glycinate 120c</span>
                <span className="font-bold text-gold-300">{formatPrice(22.00)} <small className="text-eucalyptus-400">(RRP {formatPrice(39.95)})</small></span>
              </div>
            </div>
            <Link
              href="/wholesale/dashboard"
              className="block text-center w-full bg-gold-500 hover:bg-gold-400 text-eucalyptus-950 font-bold py-2.5 rounded-xl text-xs transition"
            >
              Access SKU Ordering Matrix →
            </Link>
          </div>
        </div>
      </section>

      {/* 8. CLINICAL SCIENCE & BLOG JOURNAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-eucalyptus-800">
              Evidence-Based Insights
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-charcoal-950 mt-1">
              Supplement Science & Nutrition Guides
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-xs font-bold text-eucalyptus-900 hover:text-eucalyptus-700 inline-flex items-center gap-1 group"
          >
            Read All Science Articles ({FALLBACK_BLOG_POSTS.length})
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FALLBACK_BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-3xl border border-sand shadow-xs hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
            >
              <div className="aspect-16/9 w-full bg-offwhite overflow-hidden relative">
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-eucalyptus-950 text-gold-400 text-[10px] font-black uppercase px-3 py-1 rounded-md">
                  {post.category_name}
                </span>
              </div>

              <div className="p-6 sm:p-8 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-charcoal-400 font-medium">
                    <span>{post.author_name}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {post.read_time_minutes} min read
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`} className="block group-hover:text-eucalyptus-800 transition">
                    <h3 className="text-lg sm:text-xl font-extrabold text-charcoal-950 leading-snug">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-sand flex items-center justify-between">
                  <span className="text-xs text-charcoal-400 font-medium">{post.tags}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-eucalyptus-900 group-hover:text-gold-600 flex items-center gap-1 transition"
                  >
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
