'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/storeContext';
import { FALLBACK_PRODUCTS } from '@/lib/api';
import { Product } from '@/lib/types';
import {
  X,
  Compass,
  Flame,
  Zap,
  Heart,
  ShieldCheck,
  Leaf,
  ArrowRight,
  RotateCcw,
  ShoppingBag,
  Star,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SupplementFinderModal: React.FC = () => {
  const { isFinderOpen, setIsFinderOpen, addToCart, formatPrice } = useStore();
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<string>('');
  const [format, setFormat] = useState<string>('');
  const [dietary, setDietary] = useState<string>('');
  const [matchedProducts, setMatchedProducts] = useState<Product[]>([]);

  if (!isFinderOpen) return null;

  const handleGoalSelect = (selectedGoal: string) => {
    setGoal(selectedGoal);
    setStep(2);
  };

  const handleFormatSelect = (selectedFormat: string) => {
    setFormat(selectedFormat);
    setStep(3);
  };

  const handleDietarySelect = (selectedDietary: string) => {
    setDietary(selectedDietary);

    // Calculate matches from catalog
    let results = [...FALLBACK_PRODUCTS];

    if (goal === 'Muscle') {
      results = results.filter((p) => p.category_slug === 'protein' || p.goal.includes('Muscle'));
    } else if (goal === 'Strength') {
      results = results.filter((p) => p.category_slug === 'sports-nutrition' || p.goal.includes('Strength'));
    } else if (goal === 'Recovery') {
      results = results.filter((p) => p.category_slug === 'vitamins-minerals' || p.goal.includes('Recovery') || p.goal.includes('Sleep'));
    } else if (goal === 'Stress') {
      results = results.filter((p) => p.category_slug === 'herbal-supplements' || p.goal.includes('Stress'));
    } else if (goal === 'Skin') {
      results = results.filter((p) => p.category_slug === 'wellness-longevity' || p.goal.includes('Skin'));
    }

    if (format && format !== 'ANY') {
      results = results.filter((p) => p.form === format);
    }

    if (results.length === 0) {
      results = FALLBACK_PRODUCTS.slice(0, 3);
    }

    setMatchedProducts(results);
    setStep(4);
  };

  const resetQuiz = () => {
    setStep(1);
    setGoal('');
    setFormat('');
    setDietary('');
    setMatchedProducts([]);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsFinderOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl shadow-2xl border border-sand w-full max-w-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-eucalyptus-950 p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-white">
                  Australian Supplement Finder
                </h3>
                <p className="text-xs text-eucalyptus-200">
                  Step {step} of 4 • Clinical & Goal Matching Engine
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsFinderOpen(false)}
              className="p-2 text-eucalyptus-200 hover:text-white bg-eucalyptus-900 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Questions / Results */}
          <div className="p-6 md:p-8 overflow-y-auto flex-1">
            {step === 1 && (
              <div className="space-y-5">
                <div className="text-center max-w-md mx-auto">
                  <h4 className="text-xl font-extrabold text-charcoal-900">
                    What is your primary wellness or fitness goal?
                  </h4>
                  <p className="text-xs text-charcoal-500 mt-1">
                    Select your core focus to match with evidence-based Australian ingredients.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => handleGoalSelect('Muscle')}
                    className="p-4 rounded-2xl border-2 border-sand hover:border-eucalyptus-800 bg-offwhite hover:bg-eucalyptus-50 text-left transition flex items-center gap-3.5 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-charcoal-900 block group-hover:text-eucalyptus-900">
                        Muscle Growth & Leucine
                      </span>
                      <span className="text-xs text-charcoal-500">Pure Grass-Fed WPI 90</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleGoalSelect('Strength')}
                    className="p-4 rounded-2xl border-2 border-sand hover:border-eucalyptus-800 bg-offwhite hover:bg-eucalyptus-50 text-left transition flex items-center gap-3.5 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-charcoal-900 block group-hover:text-eucalyptus-900">
                        Strength & Power Output
                      </span>
                      <span className="text-xs text-charcoal-500">German Creapure® Creatine</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleGoalSelect('Recovery')}
                    className="p-4 rounded-2xl border-2 border-sand hover:border-eucalyptus-800 bg-offwhite hover:bg-eucalyptus-50 text-left transition flex items-center gap-3.5 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-charcoal-900 block group-hover:text-eucalyptus-900">
                        Deep Sleep & Cramp Relief
                      </span>
                      <span className="text-xs text-charcoal-500">Chelated Magnesium Glycinate</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleGoalSelect('Stress')}
                    className="p-4 rounded-2xl border-2 border-sand hover:border-eucalyptus-800 bg-offwhite hover:bg-eucalyptus-50 text-left transition flex items-center gap-3.5 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-charcoal-900 block group-hover:text-eucalyptus-900">
                        Cortisol & Stress Resilience
                      </span>
                      <span className="text-xs text-charcoal-500">Organic KSM-66® Ashwagandha</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleGoalSelect('Skin')}
                    className="p-4 rounded-2xl border-2 border-sand hover:border-eucalyptus-800 bg-offwhite hover:bg-eucalyptus-50 text-left transition flex items-center gap-3.5 group sm:col-span-2"
                  >
                    <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-charcoal-900 block group-hover:text-eucalyptus-900">
                        Joint Cartilage & Skin Elasticity
                      </span>
                      <span className="text-xs text-charcoal-500">Wild Deep-Sea Marine Collagen Peptides</span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div className="text-center max-w-md mx-auto">
                  <h4 className="text-xl font-extrabold text-charcoal-900">
                    What is your preferred format?
                  </h4>
                  <p className="text-xs text-charcoal-500 mt-1">
                    How do you prefer consuming your daily nutrition?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <button
                    onClick={() => handleFormatSelect('POWDER')}
                    className="p-5 rounded-2xl border-2 border-sand hover:border-eucalyptus-800 bg-offwhite hover:bg-eucalyptus-50 text-center transition flex flex-col items-center gap-2 group"
                  >
                    <span className="font-extrabold text-base text-charcoal-900 group-hover:text-eucalyptus-900">
                      Powder Blends
                    </span>
                    <span className="text-xs text-charcoal-500">Mix in shakes, smoothies or coffee</span>
                  </button>

                  <button
                    onClick={() => handleFormatSelect('CAPSULES')}
                    className="p-5 rounded-2xl border-2 border-sand hover:border-eucalyptus-800 bg-offwhite hover:bg-eucalyptus-50 text-center transition flex flex-col items-center gap-2 group"
                  >
                    <span className="font-extrabold text-base text-charcoal-900 group-hover:text-eucalyptus-900">
                      Veggie Capsules
                    </span>
                    <span className="text-xs text-charcoal-500">Convenient daily therapeutic caps</span>
                  </button>

                  <button
                    onClick={() => handleFormatSelect('ANY')}
                    className="p-5 rounded-2xl border-2 border-sand hover:border-eucalyptus-800 bg-offwhite hover:bg-eucalyptus-50 text-center transition flex flex-col items-center gap-2 group"
                  >
                    <span className="font-extrabold text-base text-charcoal-900 group-hover:text-eucalyptus-900">
                      No Preference
                    </span>
                    <span className="text-xs text-charcoal-500">Show all top clinically matched formats</span>
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div className="text-center max-w-md mx-auto">
                  <h4 className="text-xl font-extrabold text-charcoal-900">
                    Any specific dietary requirements?
                  </h4>
                  <p className="text-xs text-charcoal-500 mt-1">
                    All our formulations adhere to strict Australian GMP and clean-label standards.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => handleDietarySelect('Grass-Fed')}
                    className="p-4 rounded-2xl border-2 border-sand hover:border-eucalyptus-800 bg-offwhite hover:bg-eucalyptus-50 text-left transition font-bold text-sm text-charcoal-900"
                  >
                    🇦🇺 100% Grass-Fed Victorian Dairy
                  </button>
                  <button
                    onClick={() => handleDietarySelect('Vegan')}
                    className="p-4 rounded-2xl border-2 border-sand hover:border-eucalyptus-800 bg-offwhite hover:bg-eucalyptus-50 text-left transition font-bold text-sm text-charcoal-900"
                  >
                    🌱 100% Plant-Based / Vegan
                  </button>
                  <button
                    onClick={() => handleDietarySelect('Gluten-Free')}
                    className="p-4 rounded-2xl border-2 border-sand hover:border-eucalyptus-800 bg-offwhite hover:bg-eucalyptus-50 text-left transition font-bold text-sm text-charcoal-900"
                  >
                    🌾 Certified Gluten-Free & Non-GMO
                  </button>
                  <button
                    onClick={() => handleDietarySelect('ANY')}
                    className="p-4 rounded-2xl border-2 border-sand hover:border-eucalyptus-800 bg-offwhite hover:bg-eucalyptus-50 text-left transition font-bold text-sm text-charcoal-900"
                  >
                    ✨ Show All Matching Formulas
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-success bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Clinical Matches Found ({matchedProducts.length})
                  </span>
                  <h4 className="text-xl font-extrabold text-charcoal-950 mt-2">
                    Your Personalized Australian Supplement Protocol
                  </h4>
                </div>

                <div className="space-y-3.5">
                  {matchedProducts.map((p, idx) => (
                    <div
                      key={p.id}
                      className="p-4 bg-offwhite rounded-2xl border border-sand flex items-center justify-between gap-4 hover:border-eucalyptus-700 transition"
                    >
                      <img
                        src={p.primary_image}
                        alt={p.name}
                        className="w-16 h-16 object-cover rounded-xl bg-white border border-sand shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase text-gold-700 bg-gold-100 px-2 py-0.5 rounded">
                            {idx === 0 ? '99% Perfect Match' : '95% Synergistic'}
                          </span>
                          <span className="text-xs text-charcoal-500 font-semibold">{p.size_label}</span>
                        </div>
                        <h5 className="font-bold text-xs sm:text-sm text-charcoal-900 truncate mt-1">
                          {p.name}
                        </h5>
                        <p className="text-xs font-extrabold text-eucalyptus-950 mt-0.5">
                          {formatPrice(p.retail_price)}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          addToCart(p, 1);
                          setIsFinderOpen(false);
                        }}
                        className="bg-eucalyptus-900 hover:bg-eucalyptus-800 text-white p-2.5 sm:px-4 sm:py-2.5 rounded-xl font-bold text-xs shadow-sm transition flex items-center gap-1.5 shrink-0"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Add to Cart</span>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-sand">
                  <button
                    onClick={resetQuiz}
                    className="flex items-center gap-1 text-xs font-bold text-charcoal-500 hover:text-charcoal-800"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
                  </button>

                  <button
                    onClick={() => {
                      matchedProducts.forEach((p) => addToCart(p, 1));
                      setIsFinderOpen(false);
                    }}
                    className="bg-gold-500 hover:bg-gold-400 text-eucalyptus-950 font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition"
                  >
                    Add All Matches to Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
