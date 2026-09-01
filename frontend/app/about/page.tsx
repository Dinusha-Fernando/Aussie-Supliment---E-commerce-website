'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Leaf,
  Award,
  Building2,
  Truck,
  CheckCircle2,
  ArrowRight,
  Compass,
  Sparkles,
  MapPin,
  ChevronRight,
  Microscope,
  Dna,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/storeContext';

export default function AboutPage() {
  const { setIsFinderOpen } = useStore();
  const [activeOriginIndex, setActiveOriginIndex] = useState<number>(0);
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState<number>(0);
  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  // 1. Geographic Provenance / Sourcing Data
  const sourcingOrigins = [
    {
      id: 1,
      region: 'Gippsland, Victoria',
      ingredient: '100% Pasture-Fed Whey Isolate & Hydrolysate',
      coordinates: "38° 12' S, 146° 32' E",
      elevation: '420m Above Sea Level',
      climate: 'Temperate Maritime • Year-Round Green Grazing',
      image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80',
      description:
        'Our dairy cattle graze uninterrupted across the rolling green pastures of Gippsland, nourished by natural rainfall and pesticide-free clover. This single-origin dairy produces naturally high concentrations of conjugated linoleic acid (CLA), native immunoglobulins, and an industry-leading 27.4g bioactive protein yield per serve.',
      keyMetrics: [
        { label: 'Pasture Grazing', value: '365 Days/Yr' },
        { label: 'Bovine Hormones', value: '0% rBST / rBGH' },
        { label: 'Cold Filtration', value: 'Ceramic CFM' },
        { label: 'Heavy Metals', value: '< 0.001 ppm' }
      ]
    },
    {
      id: 2,
      region: 'Tasmanian Wilderness & Bavaria',
      ingredient: 'Creapure® Certified Micronized Monohydrate',
      coordinates: "42° 00' S, 146° 48' E",
      elevation: 'Alpine Glacial Runoff',
      climate: 'Sub-Antarctic Crisp Purity',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      description:
        'Synthesized under the strictest pharmaceutical GMP conditions in Bavaria and blended using pristine Tasmanian glacial water synergy. Creapure® is globally recognized as the gold standard of creatine, guaranteed 99.99% pure with non-detectable levels of unwanted by-products like dicyandiamide (DCD) and dihydrotriazine (DHT).',
      keyMetrics: [
        { label: 'Assay Purity', value: '99.99%' },
        { label: 'Harmful DHT/DCD', value: 'Non-Detectable' },
        { label: 'Mesh Particle', value: '200 Ultra-Fine' },
        { label: 'Bioavailability', value: '100% Instant' }
      ]
    },
    {
      id: 3,
      region: 'Southern Pacific Ocean',
      ingredient: 'Wild-Harvested Marine Collagen Peptides',
      coordinates: "39° 30' S, 140° 12' E",
      elevation: 'Deep Ocean Trench Waters',
      climate: 'Nutrient-Dense Antarctic Currents',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      description:
        'Sourced sustainably from the pristine, icy deep waters off the Southern Australian coast. Our wild marine collagen peptides undergo gentle enzymatic hydrolysis down to 2,000 Daltons for rapid gastrointestinal absorption, fortifying connective tendons, cartilage integrity, and skin extracellular matrix.',
      keyMetrics: [
        { label: 'Dalton Weight', value: '2,000 Da' },
        { label: 'Collagen Types', value: 'Type I & III' },
        { label: 'Sustainability', value: 'MSC Certified' },
        { label: 'Microplastics', value: '0.00% Zero' }
      ]
    },
    {
      id: 4,
      region: 'Top End, Northern Territory',
      ingredient: 'Wild Organic Kakadu Plum Extract',
      coordinates: "12° 27' S, 131° 50' E",
      elevation: 'Tropical Monsoonal Lowlands',
      climate: 'Sun-Drenched Indigenous Bushland',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80',
      description:
        'Ethically harvested in partnership with Indigenous community growers in the remote Northern Territory. The Australian Kakadu Plum contains the highest concentration of natural Vitamin C on Earth (up to 100 times that of an orange), acting as an essential biological catalyst for natural collagen cross-linking.',
      keyMetrics: [
        { label: 'Native Vit C', value: '100x Oranges' },
        { label: 'ORAC Oxygen Radical', value: 'Super High' },
        { label: 'Indigenous Fair', value: '100% Ethical' },
        { label: 'Extraction Method', value: 'Cellular Liquid' }
      ]
    }
  ];

  // 2. Timeline Milestones Data
  const milestones = [
    {
      year: '2021',
      title: 'The Gippsland Farm Genesis',
      badge: 'FOUNDING ERA',
      summary:
        'Frustrated by imported sports nutrition filled with maltodextrin, sucralose, and denatured milk powders, our founding sports scientists partnered directly with dairy farmers in Gippsland, Victoria to formulate Australia’s purest zero-filler WPI.',
      kpis: ['1st Cold-Microfiltered Batch', '100% Single-Origin Victorian Milk', '0 Fillers Policy Established']
    },
    {
      year: '2023',
      title: 'TGA ARTG Compliance & Cleanroom Scale',
      badge: 'REGULATORY MILESTONE',
      summary:
        'Achieved full compliance with the Australian Therapeutic Goods Administration (TGA), receiving official ARTG listings. Constructed ISO-8 pharmaceutical cleanrooms in Melbourne with batch-by-batch heavy metal and Informed-Sport testing.',
      kpis: ['ARTG Listed Formulations', 'Informed-Sport Anti-Doping Cleared', 'HPLC Chemical Assay Integration']
    },
    {
      year: '2024',
      title: 'Commercial Wholesale Engine (280+ Gyms)',
      badge: 'B2B ACCELERATION',
      summary:
        'Launched our proprietary Australian B2B commercial portal with automated ABN validation and volume tier schedules, becoming the official nutritional partner to over 280+ commercial gyms, CrossFit boxes, and elite recovery facilities.',
      kpis: ['280+ Commercial Gym Partners', 'Tiered Volume Schedules', 'Same-Day Melbourne Freight']
    },
    {
      year: '2026',
      title: 'Global Export & Multi-Currency Platform',
      badge: 'GLOBAL EXPANSION',
      summary:
        'Expanded our enterprise digital infrastructure with real-time multi-currency support (LKR, USD, AUD) and cold-chain international freight, delivering Australia’s cleanest sports nutrition to elite athletes across the Asia-Pacific and worldwide.',
      kpis: ['15,000+ Active Athletes', 'Multi-Currency Real-Time Engine', 'Zero-Compromise Pure Standard']
    }
  ];

  // 3. Scientific Advisory Team
  const teamMembers = [
    {
      name: 'Dr. Lachlan Hayes, PhD',
      role: 'Head of Clinical Formulation & Sports Biochemistry',
      credentials: 'BSc (Hons), PhD (Nutritional Biochemistry), Ex-AIS High-Performance Consultant',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
      bio: 'Leading sports scientist with over 16 peer-reviewed clinical publications on peptide bioavailability, rapid myofibrillar protein synthesis, and cellular hydration kinetics.',
      quote: 'We formulate strictly on human clinical dosages. If an active ingredient cannot demonstrate bio-equivalence in human trials, it never enters our formulations.'
    },
    {
      name: 'Elena Vance, APD, MND',
      role: 'Director of Clinical Sports Dietetics',
      credentials: 'Master of Nutrition & Dietetics, Accredited Practising Dietitian (SDA)',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      bio: 'Adviser to Australian national team athletes, focusing on gastrointestinal permeability, zero-bloat enzymatic digestion, and clean micronutrient delivery.',
      quote: 'Bloating and gastric distress should never be the cost of getting your daily protein. Our multi-enzyme matrix delivers 100% comfort and maximum absorption.'
    },
    {
      name: 'Marcus Sterling',
      role: 'Director of Dairy Sourcing & Supply Chain Integrity',
      credentials: 'B.AgriSci (Melb), 3rd-Generation Victorian Pastoralist',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      bio: 'Oversees our direct relationships with Victorian pasture farming families, ensuring humane rotational grazing, soil regenerative stewardship, and non-GMO cattle nutrition.',
      quote: 'Great nutrition starts with what the cow grazes on at dawn. Our Gippsland pasture standards are unmatched anywhere on the planet.'
    }
  ];

  // 4. Quality Certifications
  const certifications = [
    {
      id: 1,
      name: 'Therapeutic Goods Administration (TGA)',
      badge: 'ARTG AUST L 384920',
      authority: 'Australian Federal Department of Health',
      details:
        'Every therapeutic batch is independently verified under strict TGA regulatory frameworks for heavy metals (mercury, arsenic, cadmium, lead), microbial pathogens, and active ingredient potency.',
      icon: ShieldCheck
    },
    {
      id: 2,
      name: 'Informed-Sport & WADA Tested',
      badge: 'BANNED SUBSTANCE CLEARED',
      authority: 'LGC Anti-Doping World Laboratories',
      details:
        'Certified free of over 250 WADA (World Anti-Doping Agency) banned substances, giving Olympic athletes, AFL players, and competitive powerlifters complete peace of mind.',
      icon: Award
    },
    {
      id: 3,
      name: 'Dairy Food Safety Victoria (DFSV)',
      badge: 'DAIRY LICENSE #38102',
      authority: 'Victorian State Government Food Authority',
      details:
        'Governs our milk collection, cold ceramic microfiltration, and temperature-controlled logistics, guaranteeing unbroken cold-chain hygiene from farm to powder.',
      icon: Leaf
    },
    {
      id: 4,
      name: 'HACCP & ISO 9001 Cleanrooms',
      badge: 'ISO-8 PHARMA GRADE',
      authority: 'Global Quality Assurance Standards',
      details:
        'Packaged in negative-pressure pharmaceutical cleanrooms with HEPA filtration, eliminating airborne cross-contamination and humidity degradation.',
      icon: Microscope
    }
  ];

  const activeOrigin = sourcingOrigins[activeOriginIndex];
  const activeMilestone = milestones[activeMilestoneIndex];

  return (
    <div className="space-y-20 sm:space-y-28 pb-24 overflow-hidden bg-sand-50/40">
      
      {/* 1. CINEMATIC HERO MANIFESTO STAGE */}
      <section className="relative bg-[#040D0B] text-white pt-8 pb-12 sm:pt-12 sm:pb-16 lg:py-16 overflow-hidden border-b border-white/[0.08]">
        {/* Animated Precision Mesh & Laboratory Dot Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(229,169,60,0.07)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none opacity-80" />

        {/* Ambient Fluid Aurora Glows */}
        <motion.div
          animate={{ rotate: [0, 360], scale: [1, 1.15, 1] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-600/15 via-teal-500/10 to-transparent rounded-full blur-[130px] pointer-events-none"
        />
        <motion.div
          animate={{ rotate: [360, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 -right-40 w-[550px] h-[550px] bg-gradient-to-bl from-gold-500/15 via-amber-500/10 to-transparent rounded-full blur-[120px] pointer-events-none"
        />

        {/* Drifting Golden Embers */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-10, -450],
                x: [0, i % 2 === 0 ? 20 : -20],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: 7 + i * 1.5,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 1.1
              }}
              style={{ left: `${15 + i * 14}%`, bottom: '5%' }}
              className="absolute w-1.5 h-1.5 rounded-full bg-gold-400/50 blur-[0.5px]"
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: Manifesto Narrative & CTAs (7 Cols) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-5 text-center lg:text-left"
            >
              {/* Live Operational Status Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-gold-400/30 backdrop-blur-xl shadow-[0_0_20px_rgba(229,169,60,0.15)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-black tracking-widest uppercase text-gold-300">
                  AUSTRALIAN PROVENANCE • CLINICAL ARCHITECTURE • EST. MELBOURNE
                </span>
              </div>

              {/* Master Kinetic Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.06]">
                The Architecture of <br />
                <span className="font-serif italic font-normal bg-linear-to-r from-[#FFF0C2] via-[#E5A93C] to-[#F3BD48] bg-clip-text text-transparent">
                  Uncompromising Australian Nutrition.
                </span>
              </h1>

              {/* Brand Manifesto Paragraph */}
              <p className="text-xs sm:text-sm lg:text-base text-eucalyptus-100/90 leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0">
                Founded with a singular defiance: eradicate underdosed proprietary blends, chemical gums, and inferior imported dairy from Australian performance nutrition. We craft single-origin Victorian pasture-fed protein, certified pharmaceutical Creapure®, and therapeutic ocean bio-actives with uncompromising scientific rigor.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1 text-xs font-bold">
                <Link
                  href="/shop"
                  className="relative group overflow-hidden bg-linear-to-r from-gold-500 via-gold-400 to-amber-400 text-eucalyptus-950 font-black px-6 py-3.5 rounded-xl shadow-[0_0_25px_rgba(229,169,60,0.3)] hover:shadow-[0_0_40px_rgba(229,169,60,0.5)] transition-all duration-300 flex items-center gap-2 active:scale-98"
                >
                  <span className="absolute inset-0 w-1/2 h-full bg-white/30 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
                  <span className="relative z-10 flex items-center gap-2">
                    <span>EXPLORE CLINICAL CATALOG</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>

                <Link
                  href="/wholesale"
                  className="inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.12] text-white px-5 py-3.5 rounded-xl border border-white/15 hover:border-gold-400/40 backdrop-blur-md transition"
                >
                  <Building2 className="w-4 h-4 text-gold-400" />
                  <span>B2B WHOLESALE ACCESS</span>
                </Link>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Compact Glassmorphic KPI Matrix (5 Cols) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-5 sm:p-6 border border-white/10 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <span className="text-[11px] font-black uppercase tracking-widest text-gold-400">
                  CLINICAL PERFORMANCE MATRIX
                </span>
                <span className="text-[10px] text-eucalyptus-300 font-mono">
                  ISO-8 VERIFIED
                </span>
              </div>

              {/* 2x2 Bento Matrix */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/[0.04] p-3.5 rounded-2xl border border-white/[0.08] hover:border-gold-500/40 transition">
                  <span className="block text-2xl sm:text-3xl font-black text-white">100%</span>
                  <span className="text-[11px] text-gold-300 font-bold uppercase tracking-wider block mt-0.5">
                    Victorian Pasture
                  </span>
                  <span className="text-[10px] text-eucalyptus-300 block">Single-origin Gippsland</span>
                </div>

                <div className="bg-white/[0.04] p-3.5 rounded-2xl border border-white/[0.08] hover:border-gold-500/40 transition">
                  <span className="block text-2xl sm:text-3xl font-black text-gold-400">0.00%</span>
                  <span className="text-[11px] text-gold-300 font-bold uppercase tracking-wider block mt-0.5">
                    Zero Fillers
                  </span>
                  <span className="text-[10px] text-eucalyptus-300 block">No gums or sucralose</span>
                </div>

                <div className="bg-white/[0.04] p-3.5 rounded-2xl border border-white/[0.08] hover:border-gold-500/40 transition">
                  <span className="block text-2xl sm:text-3xl font-black text-white">ARTG</span>
                  <span className="text-[11px] text-gold-300 font-bold uppercase tracking-wider block mt-0.5">
                    TGA Certified
                  </span>
                  <span className="text-[10px] text-eucalyptus-300 block">HPLC purity assays</span>
                </div>

                <div className="bg-white/[0.04] p-3.5 rounded-2xl border border-white/[0.08] hover:border-gold-500/40 transition">
                  <span className="block text-2xl sm:text-3xl font-black text-emerald-400">15,000+</span>
                  <span className="text-[11px] text-gold-300 font-bold uppercase tracking-wider block mt-0.5">
                    Athletes Fueled
                  </span>
                  <span className="text-[10px] text-eucalyptus-300 block">280+ Gym fleets</span>
                </div>
              </div>

              {/* Bottom Live Logistics Dispatch Badge */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-eucalyptus-200">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                  <span>Melbourne Logistics: Live Dispatch Active</span>
                </div>
                <Truck className="w-3.5 h-3.5 text-gold-400" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. GEOGRAPHIC PROVENANCE: INTERACTIVE SOURCING ATLAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-sand pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-eucalyptus-800 mb-1">
                <MapPin className="w-3.5 h-3.5 text-gold-600" />
                <span>GEOGRAPHIC PROVENANCE & HARVEST ORIGIN</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-charcoal-950 tracking-tight">
                Where Australian Purity Begins.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-charcoal-600 max-w-md">
              We reject anonymous commodity broker supply chains. Every ingredient is traced to a specific Australian pasture, sub-Antarctic ocean trench, or accredited cleanroom laboratory.
            </p>
          </div>

          {/* Sourcing Navigation Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 bg-white p-2 rounded-2xl border border-sand shadow-sm">
            {sourcingOrigins.map((origin, idx) => (
              <button
                key={origin.id}
                onClick={() => setActiveOriginIndex(idx)}
                className={`py-3 px-3 rounded-xl text-left transition-all ${
                  activeOriginIndex === idx
                    ? 'bg-eucalyptus-950 text-white shadow-md'
                    : 'text-charcoal-700 hover:bg-sand-100/70'
                }`}
              >
                <span className="text-[10px] font-mono tracking-wider block opacity-70">
                  ORIGIN 0{origin.id}
                </span>
                <span className="text-xs sm:text-sm font-black block truncate">
                  {origin.region}
                </span>
              </button>
            ))}
          </div>

          {/* Active Origin Display Showcase */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeOrigin.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl border border-sand shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Left Column: Image with GPS Coordinates Overlay */}
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full min-h-[380px] overflow-hidden group">
                <img
                  src={activeOrigin.image}
                  alt={activeOrigin.region}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/30 to-transparent" />
                
                {/* Coordinates & Elevation Holographic Pill */}
                <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 p-4 rounded-2xl bg-charcoal-950/80 backdrop-blur-xl border border-white/15 text-white flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-gold-400 block">
                      GPS LATITUDE / LONGITUDE
                    </span>
                    <span className="text-xs sm:text-sm font-black font-mono">
                      {activeOrigin.coordinates}
                    </span>
                  </div>
                  <div className="hidden sm:block text-right">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-eucalyptus-300 block">
                      ELEVATION & CLIMATE
                    </span>
                    <span className="text-xs font-bold text-white">
                      {activeOrigin.elevation} • {activeOrigin.climate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Origin Analysis & Biological Profile */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 text-gold-800 text-[11px] font-black uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-gold-600" />
                    <span>{activeOrigin.ingredient}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-charcoal-950 tracking-tight">
                    {activeOrigin.region}
                  </h3>

                  <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                    {activeOrigin.description}
                  </p>
                </div>

                {/* 4 Laboratory Verification Indicators */}
                <div className="space-y-3 pt-4 border-t border-sand">
                  <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-400 block">
                    HARVEST QUALITY METRICS
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {activeOrigin.keyMetrics.map((km, i) => (
                      <div key={i} className="bg-sand-50 p-2.5 rounded-xl border border-sand">
                        <span className="text-[10px] text-charcoal-500 font-medium block">
                          {km.label}
                        </span>
                        <span className="text-xs sm:text-sm font-black text-eucalyptus-950 block">
                          {km.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Link */}
                <div className="pt-2">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 text-xs font-black text-eucalyptus-900 hover:text-gold-600 group"
                  >
                    <span>View formulas derived from this origin</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 3. SCIENTIFIC ARCHITECTURE BENTO GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-gold-600 bg-gold-100 px-3 py-1 rounded-full border border-gold-200">
              NO UNDERDOSED FILLERS • NO JUNK
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-charcoal-950 tracking-tight">
              The Four Architectural Pillars.
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
              Every formula is governed by four non-negotiable principles engineered to outperform standard consumer supplement brands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Bento Card 1: Cold Ceramic Microfiltration (Wide 2-col) */}
            <div className="md:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-sand shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-eucalyptus-50 text-eucalyptus-900 flex items-center justify-center font-black group-hover:scale-110 transition-transform">
                  <Microscope className="w-6 h-6 text-eucalyptus-800" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-charcoal-950">
                  Cold Ceramic Microfiltration (CFM)
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  Traditional whey processing uses high-temperature acid precipitation which denatures fragile sub-fraction proteins. We employ sub-zero ceramic cross-flow microfiltration to extract pure whey isolate without heat or chemical acids, isolating intact lactoferrin and glycomacropeptides.
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-sand text-xs font-bold text-eucalyptus-900">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Non-Denatured Proteins</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Sub-Zero Ceramic Filters</span>
                </div>
              </div>
            </div>

            {/* Bento Card 2: ARTG & TGA Listed Standards */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-gold-50 text-gold-800 flex items-center justify-center font-black group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-gold-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-charcoal-950">
                  TGA / ARTG Listed
                </h3>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  Australian Therapeutic Goods Administration (TGA) certified protocols. Certified heavy metal free with independent batch assays for arsenic, cadmium, lead, and mercury.
                </p>
              </div>

              <div className="text-[11px] font-black text-gold-700 uppercase tracking-wider">
                ● Official AUST L 384920
              </div>
            </div>

            {/* Bento Card 3: 100% Clean Label (Zero Gums/Sweeteners) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-black group-hover:scale-110 transition-transform">
                  <Leaf className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-charcoal-950">
                  100% Clean Label
                </h3>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  Strictly zero sucralose, acesulfame-K, aspartame, xanthan gums, or thickening carrageenan. Sweetened naturally using non-bitter Reb-M stevia leaf and organic monk fruit.
                </p>
              </div>

              <div className="text-[11px] font-black text-emerald-700 uppercase tracking-wider">
                ● DigeZyme® Multi-Enzyme Matrix
              </div>
            </div>

            {/* Bento Card 4: Commercial B2B Dual Architecture (Wide 2-col) */}
            <div className="md:col-span-2 lg:col-span-2 bg-eucalyptus-950 text-white rounded-3xl p-6 sm:p-8 border border-gold-500/20 shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-gold-400 flex items-center justify-center font-black">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Dual Retail & Commercial Wholesale Engine
                </h3>
                <p className="text-xs sm:text-sm text-eucalyptus-100/85 leading-relaxed">
                  We bridge the gap between individual athletic performance and commercial sports enterprise. Commercial gym owners, CrossFit box directors, and physiotherapists gain instant access to ABN volume tiers, recurring purchase schedules, and pallet-level freight.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="text-xs text-eucalyptus-200">
                  <span className="text-gold-400 font-bold">280+ Gym Partners</span> • Same-day Melbourne dispatch
                </div>
                <Link
                  href="/wholesale"
                  className="bg-gold-500 hover:bg-gold-400 text-eucalyptus-950 text-xs font-black px-4 py-2 rounded-xl transition"
                >
                  Wholesale Details →
                </Link>
              </div>
            </div>

            {/* Bento Card 5: Australian Native Botanicals */}
            <div className="md:col-span-2 lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-sand shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-black group-hover:scale-110 transition-transform">
                  <Dna className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-charcoal-950">
                  Native Botanical Synergy
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  We blend high-potency indigenous Australian botanicals into clinical formulas. From wild Kakadu Plum (high ORAC Vitamin C cofactor) to organic Victorian peppermint extract for instantaneous digestive comfort.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-sand text-xs font-bold text-charcoal-700">
                <span>Kakadu Plum</span> • <span>Lemon Myrtle</span> • <span>Native Mountain Pepperberry</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE MILESTONE TIMELINE (2021 - 2026+) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-sand p-6 sm:p-10 lg:p-14 shadow-xl space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-sand pb-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-gold-600 block mb-1">
                OUR JOURNEY & EVOLUTION
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-charcoal-950 tracking-tight">
                From Gippsland Pastures to Global Standards.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-charcoal-600 max-w-md">
              Tracing our chronological trajectory from a small Victorian agricultural collaboration into Australia's highest-standard sports nutrition provider.
            </p>
          </div>

          {/* Timeline Year Slider Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {milestones.map((m, idx) => (
              <button
                key={m.year}
                onClick={() => setActiveMilestoneIndex(idx)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  activeMilestoneIndex === idx
                    ? 'bg-eucalyptus-950 text-white border-eucalyptus-950 shadow-lg scale-102'
                    : 'bg-sand-50/70 hover:bg-sand-100 text-charcoal-700 border-sand'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl sm:text-2xl font-black">{m.year}</span>
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                    activeMilestoneIndex === idx ? 'bg-gold-500 text-eucalyptus-950' : 'bg-sand-200 text-charcoal-700'
                  }`}>
                    {m.badge}
                  </span>
                </div>
                <span className="text-xs font-bold block truncate opacity-85">
                  {m.title}
                </span>
              </button>
            ))}
          </div>

          {/* Active Milestone Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMilestone.year}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="bg-sand-50/80 rounded-2xl p-6 sm:p-8 border border-sand space-y-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-gold-600 uppercase tracking-widest">
                  <Clock className="w-4 h-4" />
                  <span>YEAR {activeMilestone.year} • {activeMilestone.badge}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-charcoal-950">
                  {activeMilestone.title}
                </h3>
                <p className="text-xs sm:text-base text-charcoal-700 leading-relaxed max-w-3xl">
                  {activeMilestone.summary}
                </p>
              </div>

              {/* Milestone Key Deliverables */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-sand">
                {activeMilestone.kpis.map((kpi, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-sand">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs font-bold text-charcoal-900">{kpi}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 5. SCIENTIFIC ADVISORY BOARD & FORMULATION LEADERSHIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-gold-600 bg-gold-100 px-3 py-1 rounded-full border border-gold-200">
              FORMULATION LEADERSHIP
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-charcoal-950 tracking-tight">
              Clinical Minds Behind the Formulations.
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
              Every formula is authored by accredited Australian nutritional biochemists and sports dietitians with decades of elite Olympic and professional athletic consultancy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border border-sand p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  {/* Portrait Avatar */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-sand group-hover:border-gold-500/50 transition-colors shadow-md">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Name & Credentials */}
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-black text-charcoal-950">
                      {member.name}
                    </h3>
                    <span className="text-xs font-bold text-eucalyptus-800 block">
                      {member.role}
                    </span>
                    <span className="text-[11px] text-charcoal-500 font-mono block pt-0.5">
                      {member.credentials}
                    </span>
                  </div>

                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Quote Box */}
                <div className="p-3.5 rounded-2xl bg-sand-50 border border-sand italic text-[11px] text-charcoal-700 leading-relaxed">
                  "{member.quote}"
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CERTIFIED QUALITY VAULT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A201A] rounded-3xl p-6 sm:p-10 lg:p-12 text-white border border-gold-500/20 shadow-2xl space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-gold-400 block mb-1">
                INSPECTION VAULT
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Verified Quality Assays & Accreditations.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-eucalyptus-200 max-w-md">
              We provide full analytical transparency. Click any certification below to review compliance frameworks and regulatory authorities.
            </p>
          </div>

          {/* 4 Certification Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert) => {
              const Icon = cert.icon;
              return (
                <button
                  key={cert.id}
                  onClick={() => setSelectedCert(selectedCert === cert.id ? null : cert.id)}
                  className={`p-5 rounded-2xl text-left border transition-all duration-300 relative overflow-hidden ${
                    selectedCert === cert.id
                      ? 'bg-white/15 border-gold-400/80 shadow-[0_0_25px_rgba(229,169,60,0.25)]'
                      : 'bg-white/5 hover:bg-white/10 border-white/10'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-gold-400 mb-3">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-wider text-gold-400 block mb-1">
                    {cert.badge}
                  </span>
                  
                  <h4 className="text-sm font-black text-white mb-1">
                    {cert.name}
                  </h4>

                  <span className="text-[11px] text-eucalyptus-300 block">
                    {cert.authority}
                  </span>

                  {selectedCert === cert.id && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-[11px] text-eucalyptus-100 pt-3 mt-3 border-t border-white/10 leading-relaxed"
                    >
                      {cert.details}
                    </motion.p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. SHOWSTOPPER EXECUTIVE CALL-TO-ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-linear-to-b from-[#0A201A] to-[#040D0B] text-white rounded-3xl p-8 sm:p-14 lg:p-16 text-center space-y-8 border border-gold-500/30 shadow-2xl overflow-hidden">
          
          {/* Radial Spotlight Beam */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(229,169,60,0.15)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-gold-300 bg-white/10 px-4 py-1.5 rounded-full border border-gold-400/30">
              COMMERCIAL B2B & INDIVIDUAL ATHLETES
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Ready to experience uncompromised Australian performance?
            </h2>

            <p className="text-xs sm:text-base text-eucalyptus-100/90 leading-relaxed max-w-2xl mx-auto">
              Join over 15,000+ athletes and 280+ commercial gym partners nationwide. All retail orders dispatch same-day via Australia Post Express from our Melbourne fulfillment center.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/shop"
              className="relative group overflow-hidden bg-linear-to-r from-gold-500 via-gold-400 to-amber-400 text-eucalyptus-950 font-black px-8 py-4 rounded-2xl shadow-[0_0_35px_rgba(229,169,60,0.35)] hover:shadow-[0_0_55px_rgba(229,169,60,0.55)] transition-all duration-300 text-sm flex items-center gap-2.5 active:scale-98"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-white/30 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
              <span className="relative z-10 flex items-center gap-2">
                <span>EXPLORE CLINICAL CATALOG</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </span>
            </Link>

            <Link
              href="/wholesale"
              className="inline-flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.15] text-white font-bold px-7 py-4 rounded-2xl border border-white/20 hover:border-gold-400/50 backdrop-blur-xl transition text-sm"
            >
              <Building2 className="w-4 h-4 text-gold-400" />
              <span>APPLY FOR B2B WHOLESALE</span>
            </Link>

            <button
              onClick={() => setIsFinderOpen(true)}
              className="inline-flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold px-6 py-4 rounded-2xl border border-emerald-500/30 text-xs transition"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Take 60s Goal Diagnostic</span>
            </button>
          </div>

          {/* Guarantee Capsule */}
          <div className="relative z-10 pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-eucalyptus-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>30-Day Pure Performance Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-gold-400" />
              <span>Same-Day Melbourne Warehouse Freight</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
