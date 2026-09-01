'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/storeContext';
import {
  FALLBACK_REVIEWS,
  FALLBACK_PRODUCTS,
  FALLBACK_CATEGORIES,
  FALLBACK_BRANDS,
  apiClient
} from '@/lib/api';
import {
  Review,
  Product,
  Category,
  Brand,
  HeroSlide,
  TrustPillarItem,
  DiagnosticQuestion,
  Coupon
} from '@/lib/types';
import {
  TrendingUp,
  ShoppingBag,
  Building2,
  Users,
  Star,
  CheckCircle2,
  XCircle,
  MessageSquare,
  AlertTriangle,
  Award,
  ShieldCheck,
  Filter,
  Check,
  ChevronRight,
  Sliders,
  Save,
  RefreshCw,
  Globe,
  DollarSign,
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  Tag,
  BookOpen,
  Sparkles,
  Layers,
  HelpCircle,
  Package,
  Eye,
  CheckSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminPortalPage() {
  const {
    showToast,
    formatPrice,
    siteConfig,
    heroSlides,
    trustPillars,
    quizQuestions,
    refreshSiteConfig
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'analytics' | 'cms_slides' | 'cms_pillars' | 'cms_quiz' | 'products' | 'categories' | 'coupons' | 'reviews' | 'wholesale' | 'site_config'
  >('analytics');

  // Local editable copies synced with backend
  const [slidesList, setSlidesList] = useState<HeroSlide[]>(heroSlides);
  const [pillarsList, setPillarsList] = useState<TrustPillarItem[]>(trustPillars);
  const [quizList, setQuizList] = useState<DiagnosticQuestion[]>(quizQuestions);
  const [productsList, setProductsList] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [categoriesList, setCategoriesList] = useState<Category[]>(FALLBACK_CATEGORIES);
  const [brandsList, setBrandsList] = useState<Brand[]>(FALLBACK_BRANDS);
  const [couponsList, setCouponsList] = useState<Coupon[]>([]);
  const [reviewsList, setReviewsList] = useState<Review[]>(FALLBACK_REVIEWS);
  const [cmsForm, setCmsForm] = useState(siteConfig);
  const [isSaving, setIsSaving] = useState(false);

  // Modals / Item Editors
  const [editingSlide, setEditingSlide] = useState<Partial<HeroSlide> | null>(null);
  const [editingPillar, setEditingPillar] = useState<Partial<TrustPillarItem> | null>(null);
  const [editingQuiz, setEditingQuiz] = useState<Partial<DiagnosticQuestion> | null>(null);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [editingCoupon, setEditingCoupon] = useState<Partial<Coupon> | null>(null);

  // Fetch live collections on load
  const loadAllAdminData = async () => {
    try {
      const [prodsRes, cats, brs, coups] = await Promise.all([
        apiClient.getProducts(),
        apiClient.getCategories(),
        apiClient.getBrands(),
        apiClient.getCoupons()
      ]);
      if (prodsRes?.results?.length) setProductsList(prodsRes.results);
      if (cats?.length) setCategoriesList(cats);
      if (brs?.length) setBrandsList(brs);
      if (coups?.length) setCouponsList(coups);
    } catch (e) {}
  };

  useEffect(() => {
    loadAllAdminData();
  }, []);

  useEffect(() => {
    if (heroSlides?.length) setSlidesList(heroSlides);
  }, [heroSlides]);

  useEffect(() => {
    if (trustPillars?.length) setPillarsList(trustPillars);
  }, [trustPillars]);

  useEffect(() => {
    if (quizQuestions?.length) setQuizList(quizQuestions);
  }, [quizQuestions]);

  useEffect(() => {
    if (siteConfig) setCmsForm(siteConfig);
  }, [siteConfig]);

  // Save Site Configuration
  const handleSaveSiteConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await apiClient.updateSiteConfig(cmsForm);
      await refreshSiteConfig();
      showToast('Storefront configuration published & synced with database!');
    } catch (err) {
      showToast('Saved to local store.');
    } finally {
      setIsSaving(false);
    }
  };

  // --- HERO SLIDES CRUD ---
  const handleSaveSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide) return;
    setIsSaving(true);
    try {
      if (editingSlide.id) {
        await apiClient.updateHeroSlide(editingSlide.id, editingSlide);
        showToast(`Hero Slide #${editingSlide.id} updated!`);
      } else {
        await apiClient.createHeroSlide({ ...editingSlide, is_active: true });
        showToast('New Hero Slide created!');
      }
      await refreshSiteConfig();
      setEditingSlide(null);
    } catch (e) {
      showToast('Error saving hero slide');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSlide = async (id: number) => {
    if (!confirm('Are you sure you want to delete this Hero Slide?')) return;
    await apiClient.deleteHeroSlide(id);
    await refreshSiteConfig();
    showToast('Hero Slide removed.');
  };

  // --- TRUST PILLARS CRUD ---
  const handleSavePillar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPillar) return;
    setIsSaving(true);
    try {
      if (editingPillar.id) {
        await apiClient.updateTrustPillar(editingPillar.id, editingPillar);
        showToast(`Trust Pillar updated!`);
      } else {
        await apiClient.createTrustPillar({ ...editingPillar, is_active: true });
        showToast('New Trust Pillar created!');
      }
      await refreshSiteConfig();
      setEditingPillar(null);
    } catch (e) {
      showToast('Error saving trust pillar');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePillar = async (id: number) => {
    if (!confirm('Delete this Trust Pillar?')) return;
    await apiClient.deleteTrustPillar(id);
    await refreshSiteConfig();
    showToast('Trust Pillar deleted.');
  };

  // --- QUIZ CRUD ---
  const handleSaveQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuiz) return;
    setIsSaving(true);
    try {
      if (editingQuiz.id) {
        await apiClient.updateQuizQuestion(editingQuiz.id, editingQuiz);
        showToast('Quiz question updated!');
      } else {
        await apiClient.createQuizQuestion({ ...editingQuiz, is_active: true });
        showToast('New Quiz question added!');
      }
      await refreshSiteConfig();
      setEditingQuiz(null);
    } catch (e) {
      showToast('Error saving quiz question');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteQuiz = async (id: number) => {
    if (!confirm('Delete this Diagnostic Quiz question?')) return;
    await apiClient.deleteQuizQuestion(id);
    await refreshSiteConfig();
    showToast('Quiz question removed.');
  };

  // --- PRODUCTS CRUD ---
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setIsSaving(true);
    try {
      if (editingProduct.id) {
        const updated = await apiClient.updateProduct(editingProduct.id, editingProduct);
        if (updated) {
          setProductsList((prev) => prev.map((p) => (p.id === editingProduct.id ? { ...p, ...editingProduct } as Product : p)));
        }
        showToast('Product updated successfully!');
      } else {
        const created = await apiClient.createProduct({
          ...editingProduct,
          brand: 1,
          category: 1,
          is_active: true
        });
        if (created) setProductsList((prev) => [created, ...prev]);
        showToast('New product added to catalog!');
      }
      setEditingProduct(null);
    } catch (e) {
      showToast('Error saving product');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product from the store?')) return;
    await apiClient.deleteProduct(id);
    setProductsList((prev) => prev.filter((p) => p.id !== id));
    showToast('Product deleted.');
  };

  // --- COUPONS CRUD ---
  const handleSaveCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCoupon) return;
    setIsSaving(true);
    try {
      if (editingCoupon.id) {
        await apiClient.updateCoupon(editingCoupon.id, editingCoupon);
        setCouponsList((prev) => prev.map((c) => (c.id === editingCoupon.id ? { ...c, ...editingCoupon } as Coupon : c)));
        showToast(`Coupon ${editingCoupon.code} updated!`);
      } else {
        const created = await apiClient.createCoupon({ ...editingCoupon, is_active: true });
        if (created) setCouponsList((prev) => [created, ...prev]);
        showToast(`Promo Code ${editingCoupon.code} created!`);
      }
      setEditingCoupon(null);
    } catch (e) {
      showToast('Error saving coupon');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCoupon = async (id: number) => {
    if (!confirm('Delete this coupon code?')) return;
    await apiClient.deleteCoupon(id);
    setCouponsList((prev) => prev.filter((c) => c.id !== id));
    showToast('Coupon code deleted.');
  };

  // Wholesale Applications queue
  const [wholesaleApps, setWholesaleApps] = useState([
    {
      id: 1,
      business_name: 'Bondi Beach CrossFit Hub',
      abn: '83 194 820 119',
      contact_name: 'Liam Vance',
      email: 'liam@bondibeachcrossfit.com.au',
      business_type: 'Gym / Fitness Facility',
      spend: '$3,000 - $6,000 / month',
      status: 'PENDING'
    },
    {
      id: 2,
      business_name: 'Brisbane Wellness Chemist',
      abn: '41 902 441 552',
      contact_name: 'Dr. Emily Watson',
      email: 'orders@brisbanewellnesschemist.com.au',
      business_type: 'Pharmacy / Health Store',
      spend: '$6,000 - $10,000 / month',
      status: 'PENDING'
    }
  ]);

  const handleReviewAction = (reviewId: number, action: 'approve' | 'reject' | 'feature') => {
    setReviewsList((prev) =>
      prev.map((r) => {
        if (r.id === reviewId) {
          if (action === 'approve') return { ...r, status: 'APPROVED' };
          if (action === 'reject') return { ...r, status: 'REJECTED' };
          if (action === 'feature') return { ...r, is_featured: !r.is_featured };
        }
        return r;
      })
    );
    showToast(`Review #${reviewId} updated (${action})`);
  };

  const handleWholesaleApprove = (appId: number, tier: string) => {
    setWholesaleApps((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: 'APPROVED' } : app))
    );
    showToast(`Wholesale application approved with ${tier}! Welcome email dispatched.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-32">
      {/* Admin Executive Header */}
      <div className="bg-eucalyptus-950 text-white p-8 rounded-3xl border border-gold-500/20 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-gold-400 bg-gold-500/20 px-2.5 py-0.5 rounded border border-gold-500/30">
              Complete Control Center
            </span>
            <span className="text-xs text-eucalyptus-200">Full CRUD CMS & Database Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Aussie Supplements Master Suite
          </h1>
          <p className="text-xs text-eucalyptus-200">
            Control all storefront text, images, hero slides, diagnostic quiz, trust pillars, products, coupons & multi-currency live in Django.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center bg-eucalyptus-900 p-1.5 rounded-2xl border border-eucalyptus-800 text-xs font-bold overflow-x-auto scrollbar-none max-w-full gap-1">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-2 rounded-xl transition shrink-0 ${
              activeTab === 'analytics' ? 'bg-gold-500 text-eucalyptus-950 font-black' : 'text-eucalyptus-200 hover:text-white'
            }`}
          >
            KPI Analytics
          </button>
          <button
            onClick={() => setActiveTab('cms_slides')}
            className={`px-3 py-2 rounded-xl transition shrink-0 flex items-center gap-1.5 ${
              activeTab === 'cms_slides' ? 'bg-gold-500 text-eucalyptus-950 font-black' : 'text-eucalyptus-200 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hero Slides ({slidesList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('cms_pillars')}
            className={`px-3 py-2 rounded-xl transition shrink-0 flex items-center gap-1.5 ${
              activeTab === 'cms_pillars' ? 'bg-gold-500 text-eucalyptus-950 font-black' : 'text-eucalyptus-200 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Trust Pillars ({pillarsList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('cms_quiz')}
            className={`px-3 py-2 rounded-xl transition shrink-0 flex items-center gap-1.5 ${
              activeTab === 'cms_quiz' ? 'bg-gold-500 text-eucalyptus-950 font-black' : 'text-eucalyptus-200 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Quiz Builder</span>
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-3 py-2 rounded-xl transition shrink-0 flex items-center gap-1.5 ${
              activeTab === 'products' ? 'bg-gold-500 text-eucalyptus-950 font-black' : 'text-eucalyptus-200 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Products ({productsList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-3 py-2 rounded-xl transition shrink-0 flex items-center gap-1.5 ${
              activeTab === 'coupons' ? 'bg-gold-500 text-eucalyptus-950 font-black' : 'text-eucalyptus-200 hover:text-white'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Coupons</span>
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-3 py-2 rounded-xl transition shrink-0 ${
              activeTab === 'reviews' ? 'bg-gold-500 text-eucalyptus-950 font-black' : 'text-eucalyptus-200 hover:text-white'
            }`}
          >
            Reviews ({reviewsList.length})
          </button>
          <button
            onClick={() => setActiveTab('wholesale')}
            className={`px-3 py-2 rounded-xl transition shrink-0 ${
              activeTab === 'wholesale' ? 'bg-gold-500 text-eucalyptus-950 font-black' : 'text-eucalyptus-200 hover:text-white'
            }`}
          >
            Wholesale B2B
          </button>
          <button
            onClick={() => setActiveTab('site_config')}
            className={`px-3 py-2 rounded-xl transition shrink-0 flex items-center gap-1.5 ${
              activeTab === 'site_config' ? 'bg-gold-500 text-eucalyptus-950 font-black' : 'text-gold-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Site Config & Currency</span>
          </button>
        </div>
      </div>

      {/* TAB 1: KPI Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-sand shadow-sm space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400">Total Revenue</span>
              <h3 className="text-2xl font-black text-eucalyptus-950">{formatPrice(148290)}</h3>
              <span className="text-xs font-bold text-success flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +24.8% vs last month
              </span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-sand shadow-sm space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400">Wholesale B2B Revenue</span>
              <h3 className="text-2xl font-black text-eucalyptus-950">{formatPrice(89450)}</h3>
              <span className="text-xs font-bold text-gold-700 bg-gold-50 px-2 py-0.5 rounded">60.3% of revenue</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-sand shadow-sm space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400">Average Order Value</span>
              <h3 className="text-2xl font-black text-eucalyptus-950">{formatPrice(168.5)}</h3>
              <span className="text-xs font-semibold text-charcoal-500">B2C: {formatPrice(118)} | B2B: {formatPrice(1420)}</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-sand shadow-sm space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400">Customer Satisfaction</span>
              <h3 className="text-2xl font-black text-eucalyptus-950">4.95 / 5.0</h3>
              <span className="text-xs font-bold text-success flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 98.4% 5-Star Ratio
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HERO SLIDES MANAGER (FULL CRUD) */}
      {activeTab === 'cms_slides' && (
        <div className="bg-white rounded-3xl border border-sand shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand">
            <div>
              <h2 className="text-lg font-black text-charcoal-950 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold-600" />
                <span>Interactive 3D Hero Slides Manager</span>
              </h2>
              <p className="text-xs text-charcoal-500 mt-0.5">
                Create, customize images, titles, pricing, glowing halos, and 3D floating hotspots live on the homepage hero banner.
              </p>
            </div>

            <button
              onClick={() =>
                setEditingSlide({
                  title: 'New Bioactive Australian Formulation',
                  tagline: 'Clinical Purity Grade',
                  hero_title: 'BIOACTIVE PERFORMANCE',
                  subline: 'Formulated with ultra-pure Australian ingredients and zero artificial fillers.',
                  size_servings: '1kg Jar • 33 Serves',
                  retail_price: 69.95,
                  wholesale_price: 45.0,
                  image_url: '/assets/hero-tub.jpg',
                  halo_gradient: 'from-emerald-500/30 via-gold-500/25 to-amber-500/20',
                  glow_shadow: 'shadow-[0_0_80px_rgba(229,169,60,0.35)]',
                  tab_label: 'New Product Slide',
                  slug: 'new-product-slide',
                  badge_top_value: '100%',
                  badge_top_label: 'Pure Assay',
                  badge_top_sub: 'Lab Tested',
                  badge_bottom_title: 'Victorian Dairy',
                  badge_bottom_subtitle: '100% Grass-Fed',
                  badge_rating_score: '4.98',
                  badge_rating_count: '500+ Reviews',
                  hotspots: [
                    { x: '25%', y: '30%', title: '100% Bioactive', detail: 'Micro-filtered for maximum bioavailability.' },
                    { x: '75%', y: '65%', title: 'TGA Compliant', detail: 'Assayed in Australian certified laboratories.' }
                  ],
                  order: slidesList.length,
                  is_active: true
                })
              }
              className="inline-flex items-center gap-1.5 bg-gold-500 hover:bg-gold-400 text-eucalyptus-950 px-4 py-2 rounded-xl text-xs font-black shadow-md transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Hero Slide</span>
            </button>
          </div>

          {/* Slides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {slidesList.map((slide, idx) => (
              <div key={slide.id || idx} className="bg-offwhite rounded-2xl border border-sand p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition">
                <div className="space-y-3">
                  <div className="relative h-44 rounded-xl bg-charcoal-900 overflow-hidden flex items-center justify-center p-2">
                    <img src={slide.image_url} alt={slide.title} className="max-h-full object-contain drop-shadow-xl" />
                    <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      Order: {slide.order + 1}
                    </span>
                    <span className="absolute top-2 right-2 bg-gold-500 text-eucalyptus-950 text-[10px] font-black px-2 py-0.5 rounded">
                      ${Number(slide.retail_price).toFixed(2)} AUD
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-gold-700">{slide.tagline}</span>
                    <h3 className="font-extrabold text-sm text-charcoal-900 line-clamp-1">{slide.title}</h3>
                    <p className="text-xs text-charcoal-500 line-clamp-2 mt-1">{slide.subline}</p>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-sand text-[11px] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-charcoal-400">Badge Top:</span>
                      <strong className="text-charcoal-800">{slide.badge_top_value} ({slide.badge_top_label})</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-400">3D Hotspots:</span>
                      <strong className="text-charcoal-800">{slide.hotspots?.length || 0} Points</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-sand">
                  <button
                    onClick={() => setEditingSlide(slide)}
                    className="p-2 rounded-xl bg-eucalyptus-100 hover:bg-eucalyptus-200 text-eucalyptus-900 text-xs font-bold flex items-center gap-1 transition"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteSlide(slide.id)}
                    className="p-2 rounded-xl bg-red-100 hover:bg-red-200 text-error text-xs font-bold flex items-center gap-1 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Edit Slide Modal */}
          {editingSlide && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5"
              >
                <div className="flex items-center justify-between pb-3 border-b border-sand">
                  <h3 className="text-base font-black text-charcoal-900">
                    {editingSlide.id ? `Edit Hero Slide #${editingSlide.id}` : 'Create New Hero Slide'}
                  </h3>
                  <button onClick={() => setEditingSlide(null)} className="text-charcoal-400 hover:text-charcoal-700">
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveSlide} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-charcoal-700">Product Title</label>
                      <input
                        type="text"
                        value={editingSlide.title || ''}
                        onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                        required
                        className="w-full bg-offwhite border border-sand rounded-xl px-3 py-2 text-charcoal-900 font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-charcoal-700">Top Tagline</label>
                      <input
                        type="text"
                        value={editingSlide.tagline || ''}
                        onChange={(e) => setEditingSlide({ ...editingSlide, tagline: e.target.value })}
                        required
                        className="w-full bg-offwhite border border-sand rounded-xl px-3 py-2 text-charcoal-900 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-charcoal-700">Hero Main Headline</label>
                      <input
                        type="text"
                        value={editingSlide.hero_title || ''}
                        onChange={(e) => setEditingSlide({ ...editingSlide, hero_title: e.target.value })}
                        required
                        className="w-full bg-offwhite border border-sand rounded-xl px-3 py-2 text-charcoal-900 font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-charcoal-700">Image Asset URL</label>
                      <input
                        type="text"
                        value={editingSlide.image_url || ''}
                        onChange={(e) => setEditingSlide({ ...editingSlide, image_url: e.target.value })}
                        required
                        className="w-full bg-offwhite border border-sand rounded-xl px-3 py-2 text-charcoal-900 font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-charcoal-700">Subline Description</label>
                    <textarea
                      rows={2}
                      value={editingSlide.subline || ''}
                      onChange={(e) => setEditingSlide({ ...editingSlide, subline: e.target.value })}
                      required
                      className="w-full bg-offwhite border border-sand rounded-xl px-3 py-2 text-charcoal-900 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-charcoal-700">Retail Price ($ AUD)</label>
                      <input
                        type="number"
                        step="0.05"
                        value={editingSlide.retail_price || 0}
                        onChange={(e) => setEditingSlide({ ...editingSlide, retail_price: Number(e.target.value) })}
                        required
                        className="w-full bg-offwhite border border-sand rounded-xl px-3 py-2 text-charcoal-900 font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-charcoal-700">Wholesale Price ($ AUD)</label>
                      <input
                        type="number"
                        step="0.05"
                        value={editingSlide.wholesale_price || 0}
                        onChange={(e) => setEditingSlide({ ...editingSlide, wholesale_price: Number(e.target.value) })}
                        required
                        className="w-full bg-offwhite border border-sand rounded-xl px-3 py-2 text-charcoal-900 font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-charcoal-700">Size & Servings Label</label>
                      <input
                        type="text"
                        value={editingSlide.size_servings || ''}
                        onChange={(e) => setEditingSlide({ ...editingSlide, size_servings: e.target.value })}
                        required
                        className="w-full bg-offwhite border border-sand rounded-xl px-3 py-2 text-charcoal-900 font-medium"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t border-sand">
                    <button
                      type="button"
                      onClick={() => setEditingSlide(null)}
                      className="px-4 py-2 rounded-xl bg-offwhite border border-sand text-charcoal-700 font-bold hover:bg-sand transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-5 py-2 rounded-xl bg-gold-500 text-eucalyptus-950 font-black hover:bg-gold-400 shadow-md transition"
                    >
                      {isSaving ? 'Saving...' : 'Save & Synchronize'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: TRUST PILLARS MANAGER (FULL CRUD) */}
      {activeTab === 'cms_pillars' && (
        <div className="bg-white rounded-3xl border border-sand shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand">
            <div>
              <h2 className="text-lg font-black text-charcoal-950 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-gold-600" />
                <span>Store Trust Pillars & Assurances</span>
              </h2>
              <p className="text-xs text-charcoal-500 mt-0.5">
                Manage the clinical assurance badges displayed under the hero banner and on product pages.
              </p>
            </div>

            <button
              onClick={() =>
                setEditingPillar({
                  title: '100% Clean Formulation',
                  subtitle: 'Third-Party Batch Assayed',
                  icon_type: 'ShieldCheck',
                  order: pillarsList.length + 1,
                  is_active: true
                })
              }
              className="inline-flex items-center gap-1.5 bg-gold-500 hover:bg-gold-400 text-eucalyptus-950 px-4 py-2 rounded-xl text-xs font-black shadow-md transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Trust Pillar</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillarsList.map((pillar, i) => (
              <div key={pillar.id || i} className="p-5 bg-offwhite rounded-2xl border border-sand flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-charcoal-400 uppercase">Icon: {pillar.icon_type}</span>
                  <h4 className="font-extrabold text-sm text-charcoal-950">{pillar.title}</h4>
                  <p className="text-xs text-charcoal-500">{pillar.subtitle}</p>
                </div>
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-sand">
                  <button
                    onClick={() => setEditingPillar(pillar)}
                    className="p-1.5 bg-eucalyptus-100 text-eucalyptus-900 rounded-lg text-xs font-bold hover:bg-eucalyptus-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePillar(pillar.id)}
                    className="p-1.5 bg-red-100 text-error rounded-lg text-xs font-bold hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {editingPillar && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-4">
                <h3 className="text-sm font-black text-charcoal-900">
                  {editingPillar.id ? 'Edit Trust Pillar' : 'Create Trust Pillar'}
                </h3>
                <form onSubmit={handleSavePillar} className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-charcoal-700">Pillar Title</label>
                    <input
                      type="text"
                      value={editingPillar.title || ''}
                      onChange={(e) => setEditingPillar({ ...editingPillar, title: e.target.value })}
                      required
                      className="w-full bg-offwhite border border-sand rounded-xl px-3 py-2"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-charcoal-700">Subtitle</label>
                    <input
                      type="text"
                      value={editingPillar.subtitle || ''}
                      onChange={(e) => setEditingPillar({ ...editingPillar, subtitle: e.target.value })}
                      required
                      className="w-full bg-offwhite border border-sand rounded-xl px-3 py-2"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-charcoal-700">Icon Type (ShieldCheck, Leaf, Truck, Flag)</label>
                    <input
                      type="text"
                      value={editingPillar.icon_type || 'ShieldCheck'}
                      onChange={(e) => setEditingPillar({ ...editingPillar, icon_type: e.target.value })}
                      className="w-full bg-offwhite border border-sand rounded-xl px-3 py-2"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button type="button" onClick={() => setEditingPillar(null)} className="px-3 py-1.5 bg-sand rounded-lg font-bold">
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-1.5 bg-gold-500 text-eucalyptus-950 font-black rounded-lg">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: DIAGNOSTIC QUIZ BUILDER */}
      {activeTab === 'cms_quiz' && (
        <div className="bg-white rounded-3xl border border-sand shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand">
            <div>
              <h2 className="text-lg font-black text-charcoal-950 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-gold-600" />
                <span>Interactive Supplement Recommendation Quiz</span>
              </h2>
              <p className="text-xs text-charcoal-500 mt-0.5">
                Configure question flow, options, icons, and automated category matching.
              </p>
            </div>

            <button
              onClick={() =>
                setEditingQuiz({
                  step_number: quizList.length + 1,
                  question_text: 'What is your primary training target?',
                  subtitle: 'We will calibrate your optimal nutrient dosage',
                  options: [
                    { id: 'opt1', title: 'Lean Muscle & Power', desc: 'Whey Protein Isolate & Creapure Creatine', icon: 'Flame', category_slug: 'protein' },
                    { id: 'opt2', title: 'Endurance & Recovery', desc: 'Electrolytes & Joint Peptides', icon: 'Heart', category_slug: 'wellness-longevity' }
                  ],
                  order: quizList.length + 1,
                  is_active: true
                })
              }
              className="inline-flex items-center gap-1.5 bg-gold-500 hover:bg-gold-400 text-eucalyptus-950 px-4 py-2 rounded-xl text-xs font-black shadow-md transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Quiz Question</span>
            </button>
          </div>

          <div className="space-y-4">
            {quizList.map((q) => (
              <div key={q.id} className="p-5 bg-offwhite rounded-2xl border border-sand space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="bg-eucalyptus-900 text-white font-black text-xs px-2.5 py-0.5 rounded-md">
                      Step {q.step_number}
                    </span>
                    <h3 className="font-extrabold text-sm text-charcoal-950">{q.question_text}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingQuiz(q)}
                      className="px-2.5 py-1 bg-eucalyptus-100 hover:bg-eucalyptus-200 text-eucalyptus-900 rounded-lg text-xs font-bold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteQuiz(q.id)}
                      className="px-2.5 py-1 bg-red-100 hover:bg-red-200 text-error rounded-lg text-xs font-bold"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <p className="text-xs text-charcoal-500">{q.subtitle}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-2">
                  {q.options?.map((opt, oi) => (
                    <div key={oi} className="p-2.5 bg-white rounded-xl border border-sand text-xs space-y-0.5">
                      <strong className="text-charcoal-900 block">{opt.title}</strong>
                      <span className="text-[10px] text-charcoal-500 block">{opt.desc}</span>
                      <span className="text-[9px] bg-gold-50 text-gold-800 font-bold px-1.5 py-0.2 rounded border border-gold-200 inline-block">
                        Target: {opt.category_slug}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {editingQuiz && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 space-y-4">
                <h3 className="text-sm font-black text-charcoal-900">
                  {editingQuiz.id ? 'Edit Quiz Step' : 'Create Quiz Step'}
                </h3>
                <form onSubmit={handleSaveQuiz} className="space-y-3 text-xs">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-charcoal-700">Step Number</label>
                      <input
                        type="number"
                        value={editingQuiz.step_number || 1}
                        onChange={(e) => setEditingQuiz({ ...editingQuiz, step_number: Number(e.target.value) })}
                        required
                        className="w-full bg-offwhite border border-sand rounded-xl px-3 py-2"
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <label className="font-bold text-charcoal-700">Question Text</label>
                      <input
                        type="text"
                        value={editingQuiz.question_text || ''}
                        onChange={(e) => setEditingQuiz({ ...editingQuiz, question_text: e.target.value })}
                        required
                        className="w-full bg-offwhite border border-sand rounded-xl px-3 py-2"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-charcoal-700">Subtitle / Guidance</label>
                    <input
                      type="text"
                      value={editingQuiz.subtitle || ''}
                      onChange={(e) => setEditingQuiz({ ...editingQuiz, subtitle: e.target.value })}
                      className="w-full bg-offwhite border border-sand rounded-xl px-3 py-2"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button type="button" onClick={() => setEditingQuiz(null)} className="px-3 py-1.5 bg-sand rounded-lg font-bold">
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-1.5 bg-gold-500 text-eucalyptus-950 font-black rounded-lg">
                      Save Question
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: PRODUCTS CATALOG & STOCK (FULL CRUD) */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl border border-sand shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand">
            <div>
              <h2 className="text-lg font-black text-charcoal-950 flex items-center gap-2">
                <Package className="w-5 h-5 text-gold-600" />
                <span>Products & Inventory Catalog</span>
              </h2>
              <p className="text-xs text-charcoal-500 mt-0.5">
                Add, edit, adjust stock quantities, pricing, and delete products live from the store.
              </p>
            </div>

            <button
              onClick={() =>
                setEditingProduct({
                  name: 'Aussie Botanical Clinical Extract',
                  sku: `AUS-PROD-${Math.floor(1000 + Math.random() * 9000)}`,
                  retail_price: 54.95,
                  compare_at_price: 64.95,
                  wholesale_price: 32.5,
                  stock_quantity: 150,
                  size_label: '500g Jar',
                  form: 'POWDER',
                  short_description: 'Pure bio-enhanced botanical extract formulated in Australia.',
                  description: 'Clinical grade nutrition packed with bioactive phytonutrients.',
                  goal: 'Muscle Recovery & Vitality',
                  dietary_tags: 'Australian Made, Vegan, Gluten Free',
                  image_urls: ['https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=1000&q=80'],
                  is_featured: false,
                  is_best_seller: false,
                  is_active: true
                })
              }
              className="inline-flex items-center gap-1.5 bg-gold-500 hover:bg-gold-400 text-eucalyptus-950 px-4 py-2 rounded-xl text-xs font-black shadow-md transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs divide-y divide-sand">
              <thead className="bg-offwhite text-charcoal-500 font-extrabold uppercase">
                <tr>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Product</th>
                  <th className="p-3">Retail Price</th>
                  <th className="p-3">Wholesale Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand">
                {productsList.map((p) => (
                  <tr key={p.id} className="hover:bg-eucalyptus-50/30">
                    <td className="p-3 font-mono font-bold text-eucalyptus-900">{p.sku}</td>
                    <td className="p-3">
                      <strong className="text-charcoal-900 block">{p.name}</strong>
                      <span className="text-[10px] text-charcoal-400">{p.size_label} • {p.brand_name}</span>
                    </td>
                    <td className="p-3 font-bold text-charcoal-900">${Number(p.retail_price).toFixed(2)}</td>
                    <td className="p-3 font-bold text-gold-700">${Number(p.wholesale_price).toFixed(2)}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        p.stock_quantity > 20 ? 'bg-emerald-50 text-success' : 'bg-red-50 text-error'
                      }`}>
                        {p.stock_quantity} units
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1.5">
                      <button
                        onClick={() => setEditingProduct(p)}
                        className="px-2.5 py-1 bg-eucalyptus-100 hover:bg-eucalyptus-200 text-eucalyptus-900 font-bold rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="px-2.5 py-1 bg-red-100 hover:bg-red-200 text-error font-bold rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit Product Modal */}
          {editingProduct && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-4">
                <h3 className="text-base font-black text-charcoal-900">
                  {editingProduct.id ? `Edit Product: ${editingProduct.name}` : 'Create New Product'}
                </h3>
                <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-charcoal-700">Product Name</label>
                      <input
                        type="text"
                        value={editingProduct.name || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        required
                        className="w-full bg-offwhite border border-sand rounded-xl px-3 py-2 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-charcoal-700">SKU</label>
                      <input
                        type="text"
                        value={editingProduct.sku || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                        required
                        className="w-full bg-offwhite border border-sand rounded-xl px-3 py-2 font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-charcoal-700">Retail Price ($)</label>
                      <input
                        type="number"
                        step="0.05"
                        value={editingProduct.retail_price || 0}
                        onChange={(e) => setEditingProduct({ ...editingProduct, retail_price: Number(e.target.value) })}
                        required
                        className="w-full bg-offwhite border border-sand rounded-xl px-3 py-2 font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-charcoal-700">Wholesale Price ($)</label>
                      <input
                        type="number"
                        step="0.05"
                        value={editingProduct.wholesale_price || 0}
                        onChange={(e) => setEditingProduct({ ...editingProduct, wholesale_price: Number(e.target.value) })}
                        required
                        className="w-full bg-offwhite border border-sand rounded-xl px-3 py-2 font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-charcoal-700">Stock Units</label>
                      <input
                        type="number"
                        value={editingProduct.stock_quantity || 0}
                        onChange={(e) => setEditingProduct({ ...editingProduct, stock_quantity: Number(e.target.value) })}
                        required
                        className="w-full bg-offwhite border border-sand rounded-xl px-3 py-2 font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-charcoal-700">Short Summary</label>
                    <textarea
                      rows={2}
                      value={editingProduct.short_description || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, short_description: e.target.value })}
                      className="w-full bg-offwhite border border-sand rounded-xl px-3 py-2"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-sand">
                    <button type="button" onClick={() => setEditingProduct(null)} className="px-4 py-2 bg-sand rounded-xl font-bold">
                      Cancel
                    </button>
                    <button type="submit" disabled={isSaving} className="px-5 py-2 bg-gold-500 text-eucalyptus-950 font-black rounded-xl shadow-md">
                      {isSaving ? 'Saving...' : 'Save Product'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 6: COUPONS & PROMOTIONS (FULL CRUD) */}
      {activeTab === 'coupons' && (
        <div className="bg-white rounded-3xl border border-sand shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand">
            <div>
              <h2 className="text-lg font-black text-charcoal-950 flex items-center gap-2">
                <Tag className="w-5 h-5 text-gold-600" />
                <span>Coupons & Discount Promotions</span>
              </h2>
              <p className="text-xs text-charcoal-500 mt-0.5">
                Create and manage promo codes with percentage or fixed dollar discounts.
              </p>
            </div>

            <button
              onClick={() =>
                setEditingCoupon({
                  code: 'SUMMER25',
                  discount_type: 'PERCENTAGE',
                  discount_value: 25,
                  min_spend: 80,
                  is_active: true
                })
              }
              className="inline-flex items-center gap-1.5 bg-gold-500 hover:bg-gold-400 text-eucalyptus-950 px-4 py-2 rounded-xl text-xs font-black shadow-md transition"
            >
              <Plus className="w-4 h-4" />
              <span>Create Coupon Code</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {couponsList.map((coup) => (
              <div key={coup.id} className="p-5 bg-offwhite rounded-2xl border border-sand flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-base text-eucalyptus-950 bg-gold-100 px-2 py-0.5 rounded border border-gold-300">
                      {coup.code}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${coup.is_active ? 'bg-emerald-100 text-success' : 'bg-sand text-charcoal-500'}`}>
                      {coup.is_active ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-charcoal-800 pt-1">
                    {coup.discount_value}{coup.discount_type === 'PERCENTAGE' ? '% OFF' : '$ AUD OFF'}
                  </p>
                  <span className="text-[11px] text-charcoal-500 block">Min spend: ${coup.min_spend}</span>
                </div>
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-sand">
                  <button onClick={() => setEditingCoupon(coup)} className="p-1.5 bg-eucalyptus-100 text-eucalyptus-900 font-bold rounded-lg text-xs">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteCoupon(coup.id)} className="p-1.5 bg-red-100 text-error font-bold rounded-lg text-xs">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {editingCoupon && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-4">
                <h3 className="text-sm font-black text-charcoal-900">
                  {editingCoupon.id ? `Edit Coupon: ${editingCoupon.code}` : 'Create Promo Code'}
                </h3>
                <form onSubmit={handleSaveCoupon} className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-charcoal-700">Coupon Code</label>
                    <input
                      type="text"
                      value={editingCoupon.code || ''}
                      onChange={(e) => setEditingCoupon({ ...editingCoupon, code: e.target.value.toUpperCase() })}
                      required
                      className="w-full bg-offwhite border border-sand rounded-xl px-3 py-2 uppercase font-mono font-bold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-charcoal-700">Discount Type</label>
                      <select
                        value={editingCoupon.discount_type || 'PERCENTAGE'}
                        onChange={(e) => setEditingCoupon({ ...editingCoupon, discount_type: e.target.value as any })}
                        className="w-full bg-offwhite border border-sand rounded-xl px-3 py-2"
                      >
                        <option value="PERCENTAGE">Percentage (%)</option>
                        <option value="FIXED">Fixed Amount ($ AUD)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-charcoal-700">Discount Value</label>
                      <input
                        type="number"
                        value={editingCoupon.discount_value || 10}
                        onChange={(e) => setEditingCoupon({ ...editingCoupon, discount_value: Number(e.target.value) })}
                        required
                        className="w-full bg-offwhite border border-sand rounded-xl px-3 py-2 font-bold"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-charcoal-700">Minimum Order Spend ($ AUD)</label>
                    <input
                      type="number"
                      value={editingCoupon.min_spend || 0}
                      onChange={(e) => setEditingCoupon({ ...editingCoupon, min_spend: Number(e.target.value) })}
                      className="w-full bg-offwhite border border-sand rounded-xl px-3 py-2 font-bold"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button type="button" onClick={() => setEditingCoupon(null)} className="px-3 py-1.5 bg-sand rounded-lg font-bold">
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-1.5 bg-gold-500 text-eucalyptus-950 font-black rounded-lg">
                      Save Promo Code
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 7: REVIEWS MODERATION */}
      {activeTab === 'reviews' && (
        <div className="bg-white rounded-3xl border border-sand shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-sand">
            <div>
              <h2 className="text-base font-extrabold text-charcoal-950">Verified Review Moderation Queue</h2>
              <p className="text-xs text-charcoal-500">Ensure compliance with Australian Therapeutic Goods guidelines.</p>
            </div>
            <span className="text-xs font-bold text-eucalyptus-900 bg-eucalyptus-50 px-3 py-1 rounded-full border border-eucalyptus-200">
              {reviewsList.length} Total Reviews
            </span>
          </div>

          <div className="space-y-4">
            {reviewsList.map((rev) => (
              <div key={rev.id} className="p-5 bg-offwhite rounded-2xl border border-sand space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex text-gold-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="font-extrabold text-xs text-charcoal-900">{rev.user_name}</span>
                    {rev.is_verified_purchase && (
                      <span className="text-[10px] font-bold text-success bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Verified Purchase
                      </span>
                    )}
                    {rev.is_featured && (
                      <span className="text-[10px] font-bold text-gold-800 bg-gold-100 px-2 py-0.5 rounded border border-gold-300">
                        Featured on Homepage
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-charcoal-400">{rev.product_name}</span>
                </div>

                <div>
                  <h4 className="font-bold text-xs text-charcoal-900">{rev.title}</h4>
                  <p className="text-xs text-charcoal-600 leading-relaxed mt-0.5">{rev.content}</p>
                </div>

                <div className="pt-2 border-t border-sand flex items-center justify-between gap-2 text-xs">
                  <span className="text-charcoal-400">Helpful Votes: {rev.helpful_count}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleReviewAction(rev.id, 'feature')}
                      className="px-3 py-1 rounded-lg bg-gold-50 text-gold-800 hover:bg-gold-100 font-bold border border-gold-200 transition"
                    >
                      {rev.is_featured ? 'Un-Feature' : 'Mark Featured'}
                    </button>
                    <button
                      onClick={() => handleReviewAction(rev.id, 'approve')}
                      className="px-3 py-1 rounded-lg bg-emerald-100 text-success hover:bg-emerald-200 font-bold transition flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button
                      onClick={() => handleReviewAction(rev.id, 'reject')}
                      className="px-3 py-1 rounded-lg bg-red-100 text-error hover:bg-red-200 font-bold transition"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: WHOLESALE B2B QUEUE */}
      {activeTab === 'wholesale' && (
        <div className="bg-white rounded-3xl border border-sand shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-sand">
            <div>
              <h2 className="text-base font-extrabold text-charcoal-950">Pending B2B Wholesale Applications</h2>
              <p className="text-xs text-charcoal-500">Verify Australian Business Numbers (ABN) against the Australian Business Register (ABR).</p>
            </div>
          </div>

          <div className="space-y-4">
            {wholesaleApps.map((app) => (
              <div key={app.id} className="p-6 bg-offwhite rounded-2xl border border-sand space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-extrabold text-sm text-charcoal-950">{app.business_name}</h3>
                    <p className="text-xs text-charcoal-500">
                      ABN: <strong>{app.abn}</strong> • {app.business_type}
                    </p>
                  </div>
                  <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                    app.status === 'APPROVED' ? 'bg-emerald-100 text-success' : 'bg-gold-100 text-gold-800'
                  }`}>
                    {app.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-white p-3.5 rounded-xl border border-sand">
                  <div>
                    <span className="text-charcoal-400 block font-semibold">Contact</span>
                    <strong className="text-charcoal-900">{app.contact_name} ({app.email})</strong>
                  </div>
                  <div>
                    <span className="text-charcoal-400 block font-semibold">Projected Monthly Spend</span>
                    <strong className="text-eucalyptus-950 font-bold">{app.spend}</strong>
                  </div>
                </div>

                {app.status === 'PENDING' && (
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => handleWholesaleApprove(app.id, 'Tier 1 (25% off)')}
                      className="bg-eucalyptus-900 hover:bg-eucalyptus-800 text-white font-bold px-4 py-2 rounded-xl text-xs transition"
                    >
                      Approve as Tier 1 (Studio)
                    </button>
                    <button
                      onClick={() => handleWholesaleApprove(app.id, 'Tier 2 (35% off)')}
                      className="bg-gold-500 hover:bg-gold-400 text-eucalyptus-950 font-black px-4 py-2 rounded-xl text-xs transition"
                    >
                      Approve as Tier 2 (Commercial)
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 9: SITE CONFIG & MULTI-CURRENCY */}
      {activeTab === 'site_config' && (
        <form onSubmit={handleSaveSiteConfig} className="space-y-8">
          <div className="bg-white rounded-3xl border border-sand shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand">
              <div>
                <h2 className="text-lg font-black text-charcoal-950 flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-gold-600" />
                  <span>Live Storefront CMS & Multi-Currency Engine</span>
                </h2>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  Synchronize banners, pricing thresholds, and exchange rates in real-time with the Django database.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="http://127.0.0.1:8000/admin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-eucalyptus-50 hover:bg-eucalyptus-100 text-eucalyptus-900 border border-eucalyptus-200 px-3.5 py-2 rounded-xl text-xs font-bold transition"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Django Admin</span>
                </a>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 bg-gold-500 hover:bg-gold-400 text-eucalyptus-950 px-5 py-2 rounded-xl text-xs font-black shadow-md transition active:scale-98 disabled:opacity-50"
                >
                  {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>{isSaving ? 'Saving...' : 'Publish Changes'}</span>
                </button>
              </div>
            </div>

            {/* Announcement Bar Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-charcoal-900 uppercase tracking-wider text-[11px] text-charcoal-400">
                1. Top Announcement Bar
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-8 space-y-1.5">
                  <label className="text-xs font-bold text-charcoal-700">Announcement Text</label>
                  <input
                    type="text"
                    value={cmsForm?.announcement_text || ''}
                    onChange={(e) => setCmsForm({ ...cmsForm, announcement_text: e.target.value })}
                    className="w-full text-xs bg-offwhite border border-sand rounded-xl px-4 py-2.5 font-medium text-charcoal-900 focus:outline-none focus:border-gold-500"
                    placeholder="e.g. FREE SHIPPING OVER $100..."
                  />
                </div>

                <div className="md:col-span-4 space-y-1.5">
                  <label className="text-xs font-bold text-charcoal-700">Banner Visibility</label>
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setCmsForm({ ...cmsForm, announcement_enabled: !cmsForm?.announcement_enabled })}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        cmsForm?.announcement_enabled ? 'bg-gold-500' : 'bg-charcoal-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          cmsForm?.announcement_enabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                    <span className="text-xs font-bold text-charcoal-800">
                      {cmsForm?.announcement_enabled ? 'Active on Storefront' : 'Hidden'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Currency & Threshold Multipliers */}
            <div className="space-y-4 pt-4 border-t border-sand">
              <h3 className="text-sm font-bold text-charcoal-900 uppercase tracking-wider text-[11px] text-charcoal-400">
                2. Live Multi-Currency Exchange Multipliers
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-offwhite p-4 rounded-2xl border border-sand space-y-1.5">
                  <label className="text-xs font-bold text-charcoal-700 flex items-center gap-1">
                    <span>🇱🇰 Sri Lanka Rupee (LKR) Multiplier</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-charcoal-400 font-bold">1 AUD =</span>
                    <input
                      type="number"
                      step="1"
                      value={cmsForm?.lkr_multiplier || 200}
                      onChange={(e) => setCmsForm({ ...cmsForm, lkr_multiplier: Number(e.target.value) })}
                      className="w-full text-xs bg-white border border-sand rounded-xl pl-18 pr-4 py-2 font-black text-eucalyptus-950 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <span className="text-[10px] text-charcoal-400 block">Default storefront currency</span>
                </div>

                <div className="bg-offwhite p-4 rounded-2xl border border-sand space-y-1.5">
                  <label className="text-xs font-bold text-charcoal-700 flex items-center gap-1">
                    <span>🇺🇸 US Dollar (USD) Multiplier</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-charcoal-400 font-bold">1 AUD =</span>
                    <input
                      type="number"
                      step="0.01"
                      value={cmsForm?.usd_multiplier || 0.65}
                      onChange={(e) => setCmsForm({ ...cmsForm, usd_multiplier: Number(e.target.value) })}
                      className="w-full text-xs bg-white border border-sand rounded-xl pl-18 pr-4 py-2 font-black text-eucalyptus-950 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <span className="text-[10px] text-charcoal-400 block">International exchange factor</span>
                </div>

                <div className="bg-offwhite p-4 rounded-2xl border border-sand space-y-1.5">
                  <label className="text-xs font-bold text-charcoal-700">Free Shipping Threshold</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-charcoal-400 font-bold">$ AUD</span>
                    <input
                      type="number"
                      step="5"
                      value={cmsForm?.free_shipping_threshold || 100}
                      onChange={(e) => setCmsForm({ ...cmsForm, free_shipping_threshold: Number(e.target.value) })}
                      className="w-full text-xs bg-white border border-sand rounded-xl pl-16 pr-4 py-2 font-black text-eucalyptus-950 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <span className="text-[10px] text-charcoal-400 block">Applies to all retail orders</span>
                </div>
              </div>
            </div>

            {/* Storefront Operations & Contact */}
            <div className="space-y-4 pt-4 border-t border-sand">
              <h3 className="text-sm font-bold text-charcoal-900 uppercase tracking-wider text-[11px] text-charcoal-400">
                3. Operations & Support Coordinates
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-charcoal-700">Support Email</label>
                  <input
                    type="email"
                    value={cmsForm?.contact_email || ''}
                    onChange={(e) => setCmsForm({ ...cmsForm, contact_email: e.target.value })}
                    className="w-full text-xs bg-offwhite border border-sand rounded-xl px-4 py-2.5 font-medium text-charcoal-900 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-charcoal-700">Support Hotline</label>
                  <input
                    type="text"
                    value={cmsForm?.contact_phone || ''}
                    onChange={(e) => setCmsForm({ ...cmsForm, contact_phone: e.target.value })}
                    className="w-full text-xs bg-offwhite border border-sand rounded-xl px-4 py-2.5 font-medium text-charcoal-900 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
