'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User, CurrencyCode, CURRENCIES, SiteConfig, HeroSlide, DiagnosticQuestion, TrustPillarItem } from './types';
import { FALLBACK_SITE_CONFIG, FALLBACK_HERO_SLIDES, FALLBACK_QUIZ_QUESTIONS, FALLBACK_TRUST_PILLARS, apiClient } from './api';

interface StoreContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, isWholesale?: boolean) => void;
  updateCartQuantity: (itemId: string | number, quantity: number) => void;
  removeFromCart: (itemId: string | number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartItemCount: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;

  // Comparison
  comparedProducts: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: number) => void;
  clearCompare: () => void;
  isCompareDrawerOpen: boolean;
  setIsCompareDrawerOpen: (open: boolean) => void;

  // Modals & Tools
  isFinderOpen: boolean;
  setIsFinderOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // CMS & Dynamic Backend Control
  siteConfig: SiteConfig;
  heroSlides: HeroSlide[];
  quizQuestions: DiagnosticQuestion[];
  trustPillars: TrustPillarItem[];
  refreshSiteConfig: () => Promise<void>;

  // Wholesale Mode & User
  isWholesaleMode: boolean;
  setIsWholesaleMode: (mode: boolean) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  switchDemoRole: (role: 'GUEST' | 'RETAIL' | 'WHOLESALE' | 'ADMIN') => void;

  // Currency Switcher (Sri Lankan Rupee LKR default, USD, AUD)
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (amountInAUD: number | string) => string;
  convertPrice: (amountInAUD: number | string) => { amount: number; symbol: string; code: CurrencyCode; formatted: string };

  // Toast Notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const DEMO_USERS: Record<string, User> = {
  RETAIL: {
    id: 101,
    email: 'sarah.miller@sydneyfitness.com.au',
    username: 'sarah.miller@sydneyfitness.com.au',
    first_name: 'Sarah',
    last_name: 'Miller',
    phone: '0412 345 678',
    role: 'RETAIL',
    created_at: '2025-11-10'
  },
  WHOLESALE: {
    id: 102,
    email: 'wholesale@gympower.com.au',
    username: 'wholesale@gympower.com.au',
    first_name: 'Mark (GymPower HQ)',
    last_name: 'Taylor',
    phone: '0423 456 789',
    role: 'WHOLESALE',
    created_at: '2025-08-15'
  },
  ADMIN: {
    id: 999,
    email: 'admin@aussiesupplements.com.au',
    username: 'admin@aussiesupplements.com.au',
    first_name: 'Aussie',
    last_name: 'Operations Manager',
    phone: '1300 000 AUS',
    role: 'ADMIN',
    created_at: '2025-01-01'
  }
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);
  const [isFinderOpen, setIsFinderOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isWholesaleMode, setIsWholesaleMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(DEMO_USERS.RETAIL);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currency, setCurrencyState] = useState<CurrencyCode>('LKR');
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(FALLBACK_SITE_CONFIG);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(FALLBACK_HERO_SLIDES);
  const [quizQuestions, setQuizQuestions] = useState<DiagnosticQuestion[]>(FALLBACK_QUIZ_QUESTIONS);
  const [trustPillars, setTrustPillars] = useState<TrustPillarItem[]>(FALLBACK_TRUST_PILLARS);

  const refreshSiteConfig = async () => {
    try {
      const [cfg, slides, questions, pillars] = await Promise.all([
        apiClient.getSiteConfig(),
        apiClient.getHeroSlides(),
        apiClient.getQuizQuestions(),
        apiClient.getTrustPillars()
      ]);
      if (cfg) {
        setSiteConfig(cfg);
        if (cfg.lkr_multiplier) CURRENCIES.LKR.rate = Number(cfg.lkr_multiplier);
        if (cfg.usd_multiplier) CURRENCIES.USD.rate = Number(cfg.usd_multiplier);
        if (cfg.aud_multiplier) CURRENCIES.AUD.rate = Number(cfg.aud_multiplier);
      }
      if (slides && slides.length > 0) setHeroSlides(slides);
      if (questions && questions.length > 0) setQuizQuestions(questions);
      if (pillars && pillars.length > 0) setTrustPillars(pillars);
    } catch (e) {}
  };

  useEffect(() => {
    refreshSiteConfig();
  }, []);

  // Load initial cart, wishlist & currency preference from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('aus_supp_cart');
      if (savedCart) setCart(JSON.parse(savedCart));
      const savedWishlist = localStorage.getItem('aus_supp_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      const savedCurrency = localStorage.getItem('aus_supp_currency') as CurrencyCode;
      if (savedCurrency && CURRENCIES[savedCurrency]) {
        setCurrencyState(savedCurrency);
      }
    } catch (e) {}
  }, []);

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('aus_supp_currency', c);
    } catch (e) {}
    showToast(`Currency changed to ${CURRENCIES[c].name} (${c})`);
  };

  const formatPrice = (amountInAUD: number | string): string => {
    const num = Number(amountInAUD) || 0;
    const cfg = CURRENCIES[currency] || CURRENCIES.LKR;
    const converted = num * cfg.rate;
    if (currency === 'LKR') {
      return `Rs. ${Math.round(converted).toLocaleString('en-US')}`;
    }
    return `${cfg.symbol}${converted.toFixed(2)} ${currency}`;
  };

  const convertPrice = (amountInAUD: number | string) => {
    const num = Number(amountInAUD) || 0;
    const cfg = CURRENCIES[currency] || CURRENCIES.LKR;
    const converted = num * cfg.rate;
    return {
      amount: converted,
      symbol: cfg.symbol,
      code: currency,
      formatted: formatPrice(num),
    };
  };

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aus_supp_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  const addToCart = (product: Product, quantity = 1, isWholesale = isWholesaleMode) => {
    const unitPrice = isWholesale ? Number(product.wholesale_price) : Number(product.retail_price);
    const cartItemId = `${product.id}-${isWholesale ? 'ws' : 'ret'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? {
                ...item,
                quantity: item.quantity + quantity,
                total_price: (item.quantity + quantity) * unitPrice,
              }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          quantity,
          is_wholesale: isWholesale,
          unit_price: unitPrice,
          total_price: unitPrice * quantity,
        },
      ];
    });

    showToast(`Added ${quantity}x "${product.name}" to cart`);
    setIsCartDrawerOpen(true);
  };

  const updateCartQuantity = (itemId: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity,
              total_price: item.unit_price * quantity,
            }
          : item
      )
    );
  };

  const removeFromCart = (itemId: string | number) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to wishlist`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some((p) => p.id === productId);
  };

  const addToCompare = (product: Product) => {
    setComparedProducts((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        showToast('Product is already in comparison');
        return prev;
      }
      if (prev.length >= 4) {
        showToast('You can compare up to 4 products at once');
        return prev;
      }
      showToast(`Added "${product.name}" to comparison`);
      setIsCompareDrawerOpen(true);
      return [...prev, product];
    });
  };

  const removeFromCompare = (productId: number) => {
    setComparedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCompare = () => {
    setComparedProducts([]);
  };

  const switchDemoRole = (role: 'GUEST' | 'RETAIL' | 'WHOLESALE' | 'ADMIN') => {
    if (role === 'GUEST') {
      setCurrentUser(null);
      setIsWholesaleMode(false);
      showToast('Switched to Guest Browsing');
    } else {
      const u = DEMO_USERS[role];
      setCurrentUser(u);
      setIsWholesaleMode(role === 'WHOLESALE');
      showToast(`Switched account to ${role}: ${u.first_name}`);
    }
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.total_price, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartItemCount,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        comparedProducts,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isCompareDrawerOpen,
        setIsCompareDrawerOpen,
        isFinderOpen,
        setIsFinderOpen,
        quickViewProduct,
        setQuickViewProduct,
        siteConfig,
        heroSlides,
        quizQuestions,
        trustPillars,
        refreshSiteConfig,
        isWholesaleMode,
        setIsWholesaleMode,
        currentUser,
        setCurrentUser,
        switchDemoRole,
        currency,
        setCurrency,
        formatPrice,
        convertPrice,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
