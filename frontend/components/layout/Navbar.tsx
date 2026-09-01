'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '@/lib/storeContext';
import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from '@/lib/api';
import { CURRENCIES, CurrencyCode } from '@/lib/types';
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  Compass,
  ShieldCheck,
  Building2,
  BookOpen,
  ArrowRight,
  SlidersHorizontal,
  Flame,
  Zap,
  Leaf,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    cartItemCount,
    cartSubtotal,
    setIsCartDrawerOpen,
    wishlist,
    isWholesaleMode,
    setIsWholesaleMode,
    currentUser,
    switchDemoRole,
    setIsFinderOpen,
    comparedProducts,
    setIsCompareDrawerOpen,
    currency,
    setCurrency,
    formatPrice,
    siteConfig,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof FALLBACK_PRODUCTS>([]);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Live search filtering
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const matches = FALLBACK_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category_name.toLowerCase().includes(q) ||
        p.brand_name.toLowerCase().includes(q) ||
        p.goal.toLowerCase().includes(q)
    );
    setSearchResults(matches.slice(0, 5));
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-sand shadow-xs">
      {/* Top Notification Bar & Interactive Demo Role Switcher */}
      {siteConfig?.announcement_enabled && (
        <div className="bg-eucalyptus-950 text-white text-xs py-2 px-4 border-b border-eucalyptus-900">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-medium">
              <span className="bg-gold-500/20 text-gold-300 px-2 py-0.5 rounded text-[11px] font-semibold border border-gold-500/30">
                🇦🇺 {siteConfig?.site_name?.toUpperCase() || 'AUSTRALIAN'}
              </span>
              <span className="hidden sm:inline text-eucalyptus-100">
                {siteConfig?.announcement_text || `Free Express Courier Shipping on Orders Over ${formatPrice(siteConfig?.free_shipping_threshold || 100)} • Same-Day Dispatch`}
              </span>
              <span className="sm:hidden text-eucalyptus-100">Free Dispatch Over {formatPrice(siteConfig?.free_shipping_threshold || 100)}</span>
            </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Currency Selector (Sri Lankan Rupee LKR default, USD, AUD) */}
            <div className="flex items-center bg-eucalyptus-900 rounded-lg p-0.5 border border-eucalyptus-800 text-[11px]">
              {(['LKR', 'USD', 'AUD'] as const).map((curr) => {
                const cfg = CURRENCIES[curr];
                return (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`px-2 py-0.5 rounded-md font-bold transition flex items-center gap-1 ${
                      currency === curr
                        ? 'bg-gold-500 text-eucalyptus-950 shadow-xs'
                        : 'text-eucalyptus-200 hover:text-white'
                    }`}
                    title={cfg.name}
                  >
                    <span>{cfg.flag}</span>
                    <span>{curr}</span>
                  </button>
                );
              })}
            </div>

            {/* Persona Switcher for effortless demo testing (Retail B2C vs Wholesale B2B) */}
            <div className="hidden md:flex items-center bg-eucalyptus-900 rounded-lg p-0.5 border border-eucalyptus-800 text-[11px]">
              <button
                onClick={() => switchDemoRole('RETAIL')}
                className={`px-2.5 py-0.5 rounded-md font-medium transition ${
                  currentUser?.role === 'RETAIL' && !isWholesaleMode
                    ? 'bg-gold-500 text-eucalyptus-950 font-bold'
                    : 'text-eucalyptus-200 hover:text-white'
                }`}
              >
                Retail B2C
              </button>
              <button
                onClick={() => switchDemoRole('WHOLESALE')}
                className={`px-2.5 py-0.5 rounded-md font-medium transition flex items-center gap-1 ${
                  isWholesaleMode
                    ? 'bg-gold-500 text-eucalyptus-950 font-bold'
                    : 'text-eucalyptus-200 hover:text-white'
                }`}
              >
                <Building2 className="w-3 h-3" />
                Wholesale B2B
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-eucalyptus-900 hover:bg-eucalyptus-50 rounded-lg transition"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <img
              src="/assets/logo.png"
              alt="Aussie Supplement Official Logo"
              className="h-11 sm:h-12 w-auto object-contain rounded-xl shadow-xs group-hover:scale-102 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Home Navigation Link */}
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
                pathname === '/'
                  ? 'text-eucalyptus-900 bg-eucalyptus-50 font-bold'
                  : 'text-charcoal-800 hover:text-eucalyptus-900 hover:bg-eucalyptus-50/50'
              }`}
            >
              Home
            </Link>

            {/* Shop Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <Link
                href="/shop"
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 transition ${
                  pathname.startsWith('/shop')
                    ? 'text-eucalyptus-900 bg-eucalyptus-50'
                    : 'text-charcoal-800 hover:text-eucalyptus-900 hover:bg-eucalyptus-50/50'
                }`}
              >
                Shop All
                <ChevronDown className="w-4 h-4 text-eucalyptus-700" />
              </Link>

              {/* Mega Menu Dropdown */}
              <AnimatePresence>
                {isMegaMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-[650px] bg-white rounded-2xl shadow-2xl border border-sand p-6 grid grid-cols-3 gap-6"
                  >
                    <div className="space-y-4">
                      <div className="text-xs font-bold uppercase tracking-wider text-eucalyptus-900 flex items-center gap-1.5 pb-2 border-b border-sand">
                        <Flame className="w-4 h-4 text-gold-600" />
                        Key Categories
                      </div>
                      <ul className="space-y-2 text-sm">
                        {FALLBACK_CATEGORIES.map((cat) => (
                          <li key={cat.id}>
                            <Link
                              href={`/category/${cat.slug}`}
                              className="text-charcoal-700 hover:text-eucalyptus-900 font-medium hover:translate-x-1 transition-all inline-block"
                            >
                              {cat.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <div className="text-xs font-bold uppercase tracking-wider text-eucalyptus-900 flex items-center gap-1.5 pb-2 border-b border-sand">
                        <Zap className="w-4 h-4 text-gold-600" />
                        Shop By Goal
                      </div>
                      <ul className="space-y-2 text-sm text-charcoal-700">
                        <li>
                          <Link href="/shop?goal=Muscle" className="hover:text-eucalyptus-900 font-medium transition">
                            Muscle Growth & WPI
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?goal=Strength" className="hover:text-eucalyptus-900 font-medium transition">
                            Power & Creapure Creatine
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?goal=Recovery" className="hover:text-eucalyptus-900 font-medium transition">
                            Sleep & Magnesium Chelate
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?goal=Longevity" className="hover:text-eucalyptus-900 font-medium transition">
                            Marine Collagen & Joints
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Featured Mega-menu banner */}
                    <div className="bg-eucalyptus-950 rounded-xl p-4 text-white flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400 bg-gold-500/20 px-2 py-0.5 rounded">
                          Best Seller
                        </span>
                        <h4 className="font-bold text-sm text-white mt-2 leading-snug">
                          Aussie Pure 100% Grass-Fed WPI
                        </h4>
                        <p className="text-xs text-eucalyptus-200 mt-1 line-clamp-2">
                          27.2g protein, cold microfiltered Victorian dairy.
                        </p>
                      </div>
                      <Link
                        href="/products/aussie-pure-grass-fed-whey-protein-isolate-2kg"
                        className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-gold-400 hover:text-gold-300 transition"
                      >
                        Explore Product <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/brands"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                pathname === '/brands' ? 'text-eucalyptus-900 bg-eucalyptus-50' : 'text-charcoal-800 hover:text-eucalyptus-900'
              }`}
            >
              Brands
            </Link>

            <Link
              href="/wholesale"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1.5 ${
                pathname.startsWith('/wholesale')
                  ? 'text-eucalyptus-900 bg-eucalyptus-50 font-bold'
                  : 'text-charcoal-800 hover:text-eucalyptus-900'
              }`}
            >
              <Building2 className="w-4 h-4 text-gold-600" />
              Wholesale B2B
            </Link>

            <Link
              href="/blog"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                pathname.startsWith('/blog') ? 'text-eucalyptus-900 bg-eucalyptus-50' : 'text-charcoal-800 hover:text-eucalyptus-900'
              }`}
            >
              Learn & Science
            </Link>

            <Link
              href="/about"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                pathname === '/about' ? 'text-eucalyptus-900 bg-eucalyptus-50' : 'text-charcoal-800 hover:text-eucalyptus-900'
              }`}
            >
              About
            </Link>
          </nav>

          {/* Interactive Actions & Tools */}
          <div className="flex items-center gap-2.5">
            {/* Supplement Finder Quiz Button */}
            <button
              onClick={() => setIsFinderOpen(true)}
              className="hidden md:flex items-center gap-1.5 bg-gold-50 text-gold-700 hover:bg-gold-100 border border-gold-300/60 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-xs"
            >
              <Compass className="w-3.5 h-3.5 text-gold-600 animate-pulse" />
              <span>Supplement Finder</span>
            </button>

            {/* Live Search Trigger */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  setTimeout(() => searchInputRef.current?.focus(), 100);
                }}
                className="p-2.5 text-charcoal-700 hover:text-eucalyptus-900 hover:bg-eucalyptus-50 rounded-xl transition"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Instant Search Overlay */}
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-sand p-4 z-50"
                  >
                    <form onSubmit={handleSearchSubmit} className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search WPI, Creapure, Magnesium, ABN..."
                        className="w-full pl-9 pr-8 py-2.5 bg-offwhite border border-sand rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-eucalyptus-700 text-charcoal-900"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </form>

                    {searchResults.length > 0 && (
                      <div className="mt-3 divide-y divide-sand max-h-64 overflow-y-auto">
                        <div className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider py-1">
                          Product Matches
                        </div>
                        {searchResults.map((item) => (
                          <Link
                            key={item.id}
                            href={`/products/${item.slug}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="flex items-center gap-3 py-2.5 hover:bg-eucalyptus-50/70 px-2 rounded-lg transition"
                          >
                            <img
                              src={item.primary_image}
                              alt={item.name}
                              className="w-10 h-10 object-cover rounded-md shrink-0 bg-offwhite border border-sand"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-semibold text-charcoal-900 truncate">{item.name}</p>
                              <p className="text-[11px] text-eucalyptus-800 font-bold">
                                {formatPrice(item.retail_price)}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}

                    <div className="mt-3 pt-3 border-t border-sand flex items-center justify-between text-xs text-charcoal-500">
                      <span>Popular: WPI, Creatine, Magnesium</span>
                      <button
                        onClick={handleSearchSubmit}
                        className="text-eucalyptus-900 font-bold hover:underline"
                      >
                        View all
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist Link */}
            <Link
              href="/account/wishlist"
              className="p-2.5 text-charcoal-700 hover:text-eucalyptus-900 hover:bg-eucalyptus-50 rounded-xl transition relative hidden sm:block"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-gold-500 text-eucalyptus-950 font-black text-[10px] rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Compare Drawer Trigger */}
            {comparedProducts.length > 0 && (
              <button
                onClick={() => setIsCompareDrawerOpen(true)}
                className="p-2.5 text-eucalyptus-900 bg-eucalyptus-50 hover:bg-eucalyptus-100 rounded-xl transition relative hidden sm:block"
                title="Compare Products"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-eucalyptus-900 text-white font-bold text-[10px] rounded-full flex items-center justify-center">
                  {comparedProducts.length}
                </span>
              </button>
            )}

            {/* Account dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2.5 text-charcoal-700 hover:text-eucalyptus-900 hover:bg-eucalyptus-50 rounded-xl transition flex items-center gap-1"
                aria-label="Account Menu"
              >
                <UserIcon className="w-5 h-5" />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-sand p-3 z-50"
                  >
                    <div className="px-3 py-2 border-b border-sand mb-2">
                      <p className="text-xs text-charcoal-400">Signed in as</p>
                      <p className="text-sm font-bold text-charcoal-900 truncate">
                        {currentUser?.first_name || 'Guest User'}
                      </p>
                      <span className="inline-block mt-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-eucalyptus-50 text-eucalyptus-900 border border-eucalyptus-200">
                        {currentUser?.role || 'GUEST'}
                      </span>
                    </div>

                    <div className="space-y-1 text-sm">
                      <Link
                        href="/account"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-charcoal-700 hover:bg-eucalyptus-50 hover:text-eucalyptus-900 font-medium transition"
                      >
                        Account Dashboard
                      </Link>
                      <Link
                        href="/account/orders"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-charcoal-700 hover:bg-eucalyptus-50 hover:text-eucalyptus-900 font-medium transition"
                      >
                        My Orders & Tracking
                      </Link>
                      <Link
                        href="/account/reviews"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-charcoal-700 hover:bg-eucalyptus-50 hover:text-eucalyptus-900 font-medium transition"
                      >
                        My Verified Reviews
                      </Link>

                      {currentUser?.role === 'WHOLESALE' && (
                        <Link
                          href="/wholesale/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-3 py-2 rounded-lg bg-gold-50 text-gold-800 font-bold hover:bg-gold-100 transition"
                        >
                          Wholesale Quick Order Matrix
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2.5 bg-eucalyptus-900 hover:bg-eucalyptus-800 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition group"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold-500 text-eucalyptus-950 font-black text-[10px] rounded-full flex items-center justify-center shadow-xs">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-semibold">
                {formatPrice(cartSubtotal)}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-2xl z-50 lg:hidden flex flex-col p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-sand">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="inline-block">
                  <img
                    src="/assets/logo.png"
                    alt="Aussie Supplement Official Logo"
                    className="h-9 w-auto object-contain rounded-lg"
                  />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-charcoal-500 hover:bg-offwhite rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-2 flex-1">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2.5 px-3 rounded-lg text-base font-bold transition ${
                    pathname === '/'
                      ? 'text-eucalyptus-950 bg-eucalyptus-50 font-black'
                      : 'text-charcoal-900 hover:bg-eucalyptus-50'
                  }`}
                >
                  Home
                </Link>

                <Link
                  href="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2.5 px-3 rounded-lg text-base font-bold transition ${
                    pathname.startsWith('/shop')
                      ? 'text-eucalyptus-950 bg-eucalyptus-50 font-black'
                      : 'text-charcoal-900 hover:bg-eucalyptus-50'
                  }`}
                >
                  Shop All Products
                </Link>
                <div className="pl-3 space-y-1.5 py-1">
                  {FALLBACK_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-sm text-charcoal-600 hover:text-eucalyptus-900 py-1"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/brands"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-lg text-base font-bold text-charcoal-900 hover:bg-eucalyptus-50"
                >
                  Brands Directory
                </Link>

                <Link
                  href="/wholesale"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-lg text-base font-bold text-gold-700 bg-gold-50"
                >
                  Wholesale B2B Portal
                </Link>

                <Link
                  href="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-lg text-base font-bold text-charcoal-900 hover:bg-eucalyptus-50"
                >
                  Supplement Science & Guides
                </Link>

                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-lg text-base font-bold text-charcoal-900 hover:bg-eucalyptus-50"
                >
                  About Our Australian Sourcing
                </Link>
              </div>

              <div className="pt-4 border-t border-sand space-y-3">
                {/* Mobile Currency Switcher */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-charcoal-500 uppercase tracking-wider block">
                    Currency:
                  </span>
                  <div className="grid grid-cols-3 gap-1.5 bg-offwhite p-1 rounded-xl border border-sand">
                    {(['LKR', 'USD', 'AUD'] as const).map((curr) => {
                      const cfg = CURRENCIES[curr];
                      return (
                        <button
                          key={curr}
                          onClick={() => setCurrency(curr)}
                          className={`py-2 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                            currency === curr
                              ? 'bg-gold-500 text-eucalyptus-950 shadow-xs'
                              : 'text-charcoal-700 hover:bg-white'
                          }`}
                        >
                          <span>{cfg.flag}</span>
                          <span>{curr}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsFinderOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-gold-500 text-eucalyptus-950 font-bold py-3 rounded-xl shadow-md text-sm"
                >
                  <Compass className="w-4 h-4" />
                  Launch Supplement Finder Quiz
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
