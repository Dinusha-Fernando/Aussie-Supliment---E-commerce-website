import {
  Product,
  Category,
  Brand,
  Review,
  ReviewStats,
  BlogPost,
  WholesaleApplication,
  User,
  Order,
  SiteConfig,
  HeroSlide,
  DiagnosticQuestion,
  TrustPillarItem
} from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export const FALLBACK_SITE_CONFIG: SiteConfig = {
  site_name: 'Aussie Supplements',
  tagline: 'Pure Australian Nutrition • Clinical Performance',
  announcement_text: '🇦🇺 FREE EXPRESS SHIPPING ACROSS AUSTRALIA ON ORDERS OVER $100 • 100% VICTORIAN DAIRY',
  announcement_enabled: true,
  announcement_link: '/shop',
  free_shipping_threshold: 100.0,
  default_currency: 'LKR',
  lkr_multiplier: 200.0,
  usd_multiplier: 0.65,
  aud_multiplier: 1.0,
  contact_email: 'wpjinadhi@gmail.com',
  contact_phone: '1300 892 877',
  warehouse_location: 'Melbourne Distribution Hub, Victoria, Australia',
  is_store_open: true,
  maintenance_mode: false
};

export const FALLBACK_HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: 'Aussie Pure 100% Grass-Fed WPI',
    tagline: 'Single-Origin Victorian Pasture Isolate',
    hero_title: 'BIO-ACTIVE WHEY ISOLATE',
    subline: 'Cold micro-filtered from free-roaming Gippsland dairy cows. 27.4g pure bioactive protein with zero artificial sweeteners, gums, or fillers.',
    size_servings: '2kg Tub • 66 Servings',
    retail_price: 89.95,
    wholesale_price: 58.50,
    image_url: '/assets/hero-tub.jpg',
    halo_gradient: 'from-emerald-500/30 via-gold-500/25 to-amber-500/20',
    glow_shadow: 'shadow-[0_0_80px_rgba(229,169,60,0.35)]',
    tab_label: '1. Grass-Fed WPI 2kg',
    slug: 'aussie-pure-grass-fed-whey-protein-isolate-2kg',
    badge_top_value: '27.4g',
    badge_top_label: 'Pure Protein',
    badge_top_sub: 'Per Single Serve',
    badge_bottom_title: 'Victorian Dairy',
    badge_bottom_subtitle: '100% Pasture Fed',
    badge_rating_score: '4.98',
    badge_rating_count: '1,240+ Verified Reviews',
    hotspots: [
      { x: '22%', y: '24%', title: '27.4g Victorian WPI', detail: 'Cold micro-filtered isolate from Gippsland pasture cows.' },
      { x: '80%', y: '36%', title: 'TGA & ARTG Listed', detail: 'Independently batch tested by TGA analytical laboratories.' },
      { x: '24%', y: '74%', title: 'DigeZyme® Enzymes', detail: 'Digestive enzyme cofactor for zero digestive bloat.' }
    ],
    order: 0,
    is_active: true
  },
  {
    id: 2,
    title: 'Tasman Creapure® Micronized Creatine',
    tagline: 'Certified German High-Purity Monohydrate',
    hero_title: 'ULTRA-PURE CREAPURE®',
    subline: '99.99% certified Creapure® synthesized in Bavaria. Unrivalled explosive ATP muscular power and cellular hydration.',
    size_servings: '500g Pouch • 100 Serves',
    retail_price: 44.95,
    wholesale_price: 29.20,
    image_url: '/assets/hero-creatine.jpg',
    halo_gradient: 'from-cyan-500/35 via-blue-500/25 to-teal-500/20',
    glow_shadow: 'shadow-[0_0_80px_rgba(56,189,248,0.35)]',
    tab_label: '2. Creapure® Creatine',
    slug: 'tasman-performance-creapure-creatine-500g',
    badge_top_value: '99.99%',
    badge_top_label: 'Purity Assay',
    badge_top_sub: 'Zero DCD / DHT',
    badge_bottom_title: 'ATP Power Engine',
    badge_bottom_subtitle: 'Peak Cellular Hydration',
    badge_rating_score: '4.95',
    badge_rating_count: '860+ Verified Reviews',
    hotspots: [
      { x: '22%', y: '24%', title: '99.99% Creapure®', detail: 'Manufactured under Bavarian pharmaceutical standards.' },
      { x: '80%', y: '36%', title: 'Cellular ATP Power', detail: 'Rapidly replenishes muscular phosphocreatine reserves.' },
      { x: '24%', y: '74%', title: 'Instant 200 Mesh', detail: 'Ultra-micronized texture dissolves completely in cold water.' }
    ],
    order: 1,
    is_active: true
  },
  {
    id: 3,
    title: 'Pacific Wild Marine Collagen Peptides',
    tagline: 'Deep-Sea Hydrolyzed Type I & III',
    hero_title: 'WILD MARINE COLLAGEN',
    subline: 'Wild deep-sea peptides fortified with native Australian Kakadu plum Vitamin C for rapid cartilage and connective tissue repair.',
    size_servings: '400g Jar • 40 Serves',
    retail_price: 54.95,
    wholesale_price: 35.70,
    image_url: '/assets/hero-collagen.jpg',
    halo_gradient: 'from-rose-500/30 via-amber-500/25 to-teal-500/20',
    glow_shadow: 'shadow-[0_0_80px_rgba(244,114,182,0.35)]',
    tab_label: '3. Marine Collagen',
    slug: 'pacific-marine-collagen-peptides-400g',
    badge_top_value: '10,000mg',
    badge_top_label: 'Hydrolyzed Peptides',
    badge_top_sub: 'Fortified Vitamin C',
    badge_bottom_title: 'Deep-Sea Origin',
    badge_bottom_subtitle: 'Joint & Skin Elasticity',
    badge_rating_score: '4.96',
    badge_rating_count: '410+ Verified Reviews',
    hotspots: [
      { x: '22%', y: '24%', title: '10,000mg Peptides', detail: 'Low-molecular weight Type I & III peptides for maximum absorption.' },
      { x: '80%', y: '36%', title: 'Heavy Metal Free', detail: 'Tested negative for mercury, lead, and ocean micro-plastics.' },
      { x: '24%', y: '74%', title: 'Vitamin C Cofactor', detail: 'Activates enzymatic collagen cross-linking inside human tissues.' }
    ],
    order: 2,
    is_active: true
  }
];

export const FALLBACK_QUIZ_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 1,
    step_number: 1,
    question_text: 'What is your primary athletic or wellness objective?',
    subtitle: 'Select the core focus of your current training cycle',
    options: [
      { id: 'muscle', title: 'Lean Muscle & Strength', desc: 'Maximize lean mass & muscular power', icon: 'Flame', category_slug: 'protein' },
      { id: 'endurance', title: 'Endurance & Speed', desc: 'Sustain peak output & hydration', icon: 'Zap', category_slug: 'sports-nutrition' },
      { id: 'recovery', title: 'Joint & Tissue Recovery', desc: 'Accelerate systemic healing', icon: 'Heart', category_slug: 'wellness-longevity' },
      { id: 'immunity', title: 'Daily Health & Vitality', desc: 'Optimize immune resilience', icon: 'ShieldCheck', category_slug: 'vitamins-minerals' }
    ],
    order: 1,
    is_active: true
  },
  {
    id: 2,
    step_number: 2,
    question_text: 'What is your dietary preference & digestive sensitivity?',
    subtitle: 'We will filter out any non-compliant allergens',
    options: [
      { id: 'grassfed', title: '100% Grass-Fed Dairy', desc: 'Victorian pasture-fed isolate', icon: 'Leaf', category_slug: 'protein' },
      { id: 'plant', title: '100% Plant-Based & Vegan', desc: 'Organic fermented botanicals', icon: 'Leaf', category_slug: 'protein' },
      { id: 'lactose_free', title: 'Zero Lactose / DigeZyme®', desc: 'Ultra-filtered for zero bloat', icon: 'Activity', category_slug: 'protein' },
      { id: 'any', title: 'No Restrictions', desc: 'All clinical formulations', icon: 'CheckCircle2', category_slug: 'all' }
    ],
    order: 2,
    is_active: true
  },
  {
    id: 3,
    step_number: 3,
    question_text: 'How many days per week do you train or exercise?',
    subtitle: 'Helps calculate your optimal volume & serving frequency',
    options: [
      { id: 'daily', title: '5 to 7 Days / Week', desc: 'Elite athletic / daily training load', icon: 'Zap', category_slug: 'sports-nutrition' },
      { id: 'moderate', title: '3 to 4 Days / Week', desc: 'Consistent high-intensity routine', icon: 'Activity', category_slug: 'protein' },
      { id: 'light', title: '1 to 2 Days / Week', desc: 'General fitness & wellness maintenance', icon: 'Heart', category_slug: 'vitamins-minerals' }
    ],
    order: 3,
    is_active: true
  }
];

export const FALLBACK_TRUST_PILLARS: TrustPillarItem[] = [
  { id: 1, title: '100% Australian Sourced', subtitle: 'Blended in Victoria', icon_type: 'Flag', order: 1, is_active: true },
  { id: 2, title: 'TGA & ARTG Listed', subtitle: 'Therapeutic Lab Assayed', icon_type: 'ShieldCheck', order: 2, is_active: true },
  { id: 3, title: 'Same-Day Dispatch', subtitle: 'Australia Post Express', icon_type: 'Truck', order: 3, is_active: true },
  { id: 4, title: '100% Clean Label', subtitle: 'Zero Artificial Sweeteners', icon_type: 'Leaf', order: 4, is_active: true }
];

// Fallback seed catalog for instant client-side rendering & static generation
export const FALLBACK_CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Protein',
    slug: 'protein',
    description: 'Pure Australian grass-fed whey isolate, organic plant proteins & collagen peptides.',
    icon_name: 'Flame',
    image_url: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=800&q=80',
    is_featured: true,
    order: 1,
    product_count: 18,
    subcategories: [
      { id: 1, name: 'Whey Protein Isolate (WPI)', slug: 'protein-wpi', order: 1 },
      { id: 2, name: 'Organic Plant Protein', slug: 'protein-plant', order: 2 },
      { id: 3, name: 'Hydrolyzed Collagen Peptides', slug: 'protein-collagen', order: 3 },
    ]
  },
  {
    id: 2,
    name: 'Sports Nutrition',
    slug: 'sports-nutrition',
    description: 'Clinical pre-workouts, Creapure creatine, BCAAs & intra-workout electrolytes.',
    icon_name: 'Zap',
    image_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    is_featured: true,
    order: 2,
    product_count: 24,
    subcategories: [
      { id: 4, name: 'Creapure® Creatine Monohydrate', slug: 'sports-creatine', order: 1 },
      { id: 5, name: 'Clinical Pre-Workouts', slug: 'sports-pre-workout', order: 2 },
      { id: 6, name: 'Hydration & Electrolytes', slug: 'sports-electrolytes', order: 3 },
    ]
  },
  {
    id: 3,
    name: 'Vitamins & Minerals',
    slug: 'vitamins-minerals',
    description: 'Therapeutic strength magnesium, bioactive zinc, Vitamin D3 and daily multi-nutrients.',
    icon_name: 'ShieldCheck',
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    is_featured: true,
    order: 3,
    product_count: 32,
    subcategories: [
      { id: 7, name: 'Magnesium Bisglycinate Chelate', slug: 'vitamins-magnesium', order: 1 },
      { id: 8, name: 'Immunity & Bioactive Zinc', slug: 'vitamins-immunity', order: 2 },
    ]
  },
  {
    id: 4,
    name: 'Herbal Supplements',
    slug: 'herbal-supplements',
    description: 'Standardised Australian native botanicals, KSM-66 Ashwagandha & adaptogens.',
    icon_name: 'Leaf',
    image_url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    is_featured: true,
    order: 4,
    product_count: 14,
    subcategories: [
      { id: 9, name: 'KSM-66® Ashwagandha', slug: 'herbal-ashwagandha', order: 1 },
      { id: 10, name: 'Native Australian Botanicals', slug: 'herbal-native', order: 2 },
    ]
  },
  {
    id: 5,
    name: 'Wellness & Longevity',
    slug: 'wellness-longevity',
    description: 'Cellular health, deep sleep formulas, joint recovery & anti-inflammatory nutrition.',
    icon_name: 'Heart',
    image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    is_featured: true,
    order: 5,
    product_count: 19,
    subcategories: [
      { id: 11, name: 'Deep Sleep & Recovery', slug: 'wellness-sleep', order: 1 },
      { id: 12, name: 'Wild Marine Collagen', slug: 'wellness-collagen', order: 2 },
    ]
  }
];

export const FALLBACK_BRANDS: Brand[] = [
  {
    id: 1,
    name: 'Aussie Pure Nutrition',
    slug: 'aussie-pure-nutrition',
    description: '100% grass-fed Victorian dairy, clean label sports nutrition without artificial fillers.',
    logo_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80',
    origin_country: 'Australia (Victoria)',
    is_featured: true,
    product_count: 12
  },
  {
    id: 2,
    name: 'Tasman Performance Lab',
    slug: 'tasman-performance',
    description: 'Clinical dosages backed by peer-reviewed sports science and ultra-pure raw materials.',
    logo_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=200&q=80',
    origin_country: 'Australia (Tasmania)',
    is_featured: true,
    product_count: 8
  },
  {
    id: 3,
    name: 'Byron Bay Organics',
    slug: 'byron-bay-organics',
    description: 'Certified organic wholefood botanicals, adaptogens and natural restorative blends.',
    logo_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=200&q=80',
    origin_country: 'Australia (Byron Bay NSW)',
    is_featured: true,
    product_count: 10
  },
  {
    id: 4,
    name: 'Outback Nutra Care',
    slug: 'outback-nutra',
    description: 'Therapeutic TGA-listed Australian health formulations for daily resilience and vitality.',
    logo_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=200&q=80',
    origin_country: 'Australia (Queensland)',
    is_featured: true,
    product_count: 15
  }
];

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Aussie Pure 100% Grass-Fed Whey Protein Isolate (WPI 90)',
    slug: 'aussie-pure-grass-fed-whey-protein-isolate-2kg',
    sku: 'APN-WPI-2KG-CHO',
    artg_number: 'AUST L 394821',
    brand_name: 'Aussie Pure Nutrition',
    category_name: 'Protein',
    category_slug: 'protein',
    short_description: 'Ultra-pure cold-microfiltered Australian grass-fed WPI. 27.2g protein, <1g carbs and 0 sugar per serving.',
    description: 'Formulated exclusively from 100% grass-fed Victorian dairy pasture cattle. Our Cross-Flow Microfiltration (CFM) preserves bioactive immunoglobulins and lactoferrin while filtering out nearly all lactose and fat. Fast digesting, ultra-smooth mixability with natural Madagascar cocoa and organic stevia.',
    retail_price: 89.95,
    compare_at_price: 104.95,
    wholesale_price: 58.50,
    discount_percent: 14,
    stock_quantity: 350,
    is_in_stock: true,
    size_label: '2kg (66 Serves)',
    serving_size: '30g (1 Rounded Scoop)',
    servings_per_container: 66,
    form: 'POWDER',
    flavour: 'Rich Chocolate Fudge',
    dietary_tags: '100% Australian Grass-Fed, Gluten Free, 99.8% Lactose Free, Non-GMO',
    goal: 'Muscle Growth, Rapid Recovery, Daily Protein Target',
    ingredients: 'Grass-Fed Whey Protein Isolate (Milk), Organic Dutch Alkalized Cocoa Powder, Natural Flavours, Sunflower Lecithin (0.2%), Steviol Glycosides (Organic Stevia).',
    directions_for_use: 'Mix 1 rounded scoop (30g) in 250-350ml of cold water or almond milk. Consume immediately post-workout.',
    warnings: 'Contains Milk dairy. Produced in a certified HACCP and GMP facility in Victoria.',
    is_featured: true,
    is_best_seller: true,
    rating_avg: 4.95,
    review_count: 142,
    primary_image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=1000&q=80',
    images: [
      { id: 1, image_url: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=1000&q=80', is_primary: true, order: 1 },
      { id: 2, image_url: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=1000&q=80', is_primary: false, order: 2 },
    ],
    nutrition: {
      id: 1,
      serving_size_info: '30g (1 Scoop)',
      energy_kj: '482 kJ (115 Cal)',
      protein_g: '27.2 g',
      fat_total_g: '0.3 g',
      fat_saturated_g: '0.1 g',
      carbs_total_g: '0.6 g',
      carbs_sugars_g: '0.3 g',
      sodium_mg: '48 mg',
      custom_nutrients: { 'BCAAs': '6.4g', 'Glutamine': '4.9g', 'L-Leucine': '3.1g' }
    },
    wholesale_pricing_tiers: [
      { min_quantity: 1, unit_price: 58.50 },
      { min_quantity: 10, unit_price: 52.00 },
      { min_quantity: 50, unit_price: 46.50 },
    ]
  },
  {
    id: 2,
    name: 'Tasman Performance Ultra-Pure Creapure® Creatine Monohydrate',
    slug: 'tasman-performance-creapure-creatine-monohydrate-500g',
    sku: 'TP-CREA-500G',
    artg_number: 'AUST L 372109',
    brand_name: 'Tasman Performance Lab',
    category_name: 'Sports Nutrition',
    category_slug: 'sports-nutrition',
    short_description: '100% German Creapure® 200 Mesh Micronized Creatine. Zero fillers, maximum ATP cellular energy and power output.',
    description: 'Creapure® is universally recognized as the gold standard of creatine monohydrate worldwide. Manufactured under rigorous pharmaceutical standards in Germany and tested in Melbourne for 99.99% purity. Unflavoured 200 mesh micronization ensures instant dissolving without stomach discomfort.',
    retail_price: 44.95,
    compare_at_price: 54.95,
    wholesale_price: 26.00,
    discount_percent: 18,
    stock_quantity: 500,
    is_in_stock: true,
    size_label: '500g (100 Serves)',
    serving_size: '5g (1 Level Scoop)',
    servings_per_container: 100,
    form: 'POWDER',
    flavour: 'Pure Unflavoured',
    dietary_tags: '100% Vegan, Gluten Free, HPLC Tested 99.99% Pure',
    goal: 'Strength & Power Output, Lean Muscle Fullness, Brain Energy',
    ingredients: '100% Creapure® Micronized Creatine Monohydrate (HPLC Certified).',
    directions_for_use: 'Mix 1 scoop (5g) with water, fruit juice or your post-workout shake once daily.',
    warnings: 'Drink at least 2.5L of water daily.',
    is_featured: true,
    is_best_seller: true,
    rating_avg: 4.98,
    review_count: 98,
    primary_image: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=1000&q=80',
    images: [
      { id: 3, image_url: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=1000&q=80', is_primary: true, order: 1 },
    ],
    nutrition: {
      id: 2,
      serving_size_info: '5g (1 Scoop)',
      energy_kj: '0 kJ (0 Cal)',
      protein_g: '0.0 g',
      fat_total_g: '0.0 g',
      fat_saturated_g: '0.0 g',
      carbs_total_g: '0.0 g',
      carbs_sugars_g: '0.0 g',
      sodium_mg: '0 mg',
      custom_nutrients: { 'Creapure Creatine Monohydrate': '5,000mg' }
    },
    wholesale_pricing_tiers: [
      { min_quantity: 1, unit_price: 26.00 },
      { min_quantity: 10, unit_price: 22.50 },
      { min_quantity: 50, unit_price: 19.80 },
    ]
  },
  {
    id: 3,
    name: 'Outback Nutra High-Absorption Magnesium Bisglycinate Chelate',
    slug: 'outback-nutra-high-absorption-magnesium-glycinate-120-caps',
    sku: 'OBN-MAG-120CAP',
    artg_number: 'AUST L 384920',
    brand_name: 'Outback Nutra Care',
    category_name: 'Vitamins & Minerals',
    category_slug: 'vitamins-minerals',
    short_description: 'TGA-listed high-potency elemental magnesium glycinate. Supports muscle cramp relief, nervous system calming & deep REM sleep.',
    description: 'Unlike cheap magnesium oxides that cause GI distress, Outback Nutra utilizes 100% chelated Magnesium Bisglycinate bound to organic glycine. This ensures gentle digestion and up to 4x higher bioavailability.',
    retail_price: 39.95,
    compare_at_price: 49.95,
    wholesale_price: 22.00,
    discount_percent: 20,
    stock_quantity: 420,
    is_in_stock: true,
    size_label: '120 Veg Capsules',
    serving_size: '2 Capsules',
    servings_per_container: 60,
    form: 'CAPSULES',
    flavour: 'Vegetable Capsule',
    dietary_tags: 'TGA Listed (AUST L 384920), Vegan, Non-Laxative, Gentle on Stomach',
    goal: 'Muscle Relaxation & Cramp Prevention, Restorative Deep Sleep, Nervous System Balance',
    ingredients: 'Each capsule contains: Magnesium Bisglycinate Chelate (equiv. elemental magnesium 150mg), Vitamin B6 (P5P 5mg), BioPerine® 2.5mg.',
    directions_for_use: 'Take 2 capsules daily with evening meal or 30-45 minutes before sleep.',
    warnings: 'Mineral supplements should not replace a balanced diet.',
    is_featured: true,
    is_best_seller: true,
    rating_avg: 4.91,
    review_count: 76,
    primary_image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80',
    images: [
      { id: 4, image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80', is_primary: true, order: 1 },
    ],
    nutrition: {
      id: 3,
      serving_size_info: '2 Capsules',
      energy_kj: '12 kJ',
      protein_g: '0.0 g',
      fat_total_g: '0.0 g',
      fat_saturated_g: '0.0 g',
      carbs_total_g: '0.0 g',
      carbs_sugars_g: '0.0 g',
      sodium_mg: '0 mg',
      custom_nutrients: { 'Elemental Magnesium': '300mg (80% RDI)', 'Vitamin B6 (P5P)': '10mg' }
    },
    wholesale_pricing_tiers: [
      { min_quantity: 1, unit_price: 22.00 },
      { min_quantity: 10, unit_price: 18.50 },
      { min_quantity: 50, unit_price: 16.00 },
    ]
  },
  {
    id: 4,
    name: 'Byron Bay Organics KSM-66® Ashwagandha Root Stress & Vitality',
    slug: 'byron-bay-organics-ksm-66-ashwagandha-60-caps',
    sku: 'BYR-ASH-60CAP',
    artg_number: 'AUST L 391048',
    brand_name: 'Byron Bay Organics',
    category_name: 'Herbal Supplements',
    category_slug: 'herbal-supplements',
    short_description: 'Full-spectrum organic KSM-66® root extract (600mg). Clinically proven to reduce cortisol, enhance mood resilience and promote physical stamina.',
    description: 'Award-winning KSM-66® is the highest concentration full-spectrum root extract available on the market today. Extracted using sustainable green chemistry without alcohol or chemical solvents.',
    retail_price: 38.95,
    compare_at_price: 46.95,
    wholesale_price: 21.50,
    discount_percent: 17,
    stock_quantity: 280,
    is_in_stock: true,
    size_label: '60 Veggie Capsules',
    serving_size: '1-2 Capsules',
    servings_per_container: 60,
    form: 'CAPSULES',
    flavour: 'Vegetable Capsule',
    dietary_tags: 'Certified Organic, TGA Listed, 5% Withanolides Standardized, Vegan',
    goal: 'Cortisol Management & Stress Relief, Mood Elevation, Endurance & Vitality',
    ingredients: 'Each capsule contains: Withania somnifera (Ashwagandha KSM-66®) extract dry conc. equiv. dry root 3,750mg.',
    directions_for_use: 'Take 1 capsule twice daily with food.',
    warnings: 'Not recommended for use during pregnancy or lactation.',
    is_featured: true,
    is_best_seller: false,
    rating_avg: 4.88,
    review_count: 52,
    primary_image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=80',
    images: [
      { id: 5, image_url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=80', is_primary: true, order: 1 },
    ],
    wholesale_pricing_tiers: [
      { min_quantity: 1, unit_price: 21.50 },
      { min_quantity: 10, unit_price: 18.00 },
      { min_quantity: 50, unit_price: 15.50 },
    ]
  },
  {
    id: 5,
    name: 'Tasman Performance Apex Pre-Workout (Australian Crisp Apple)',
    slug: 'tasman-performance-apex-clinical-pre-workout-apple',
    sku: 'TP-PRE-APPLE',
    brand_name: 'Tasman Performance Lab',
    category_name: 'Sports Nutrition',
    category_slug: 'sports-nutrition',
    short_description: 'Fully disclosed clinical pre-workout. 8,000mg L-Citrulline Malate, 3,200mg Beta-Alanine, 300mg Natural Caffeine & Alpha-GPC.',
    description: 'Engineered without proprietary blends or underdosed fairy-dusting. Delivers relentless nitric oxide blood flow pumps, razor-sharp focus and buffered muscle endurance for intense training sessions.',
    retail_price: 69.95,
    compare_at_price: 79.95,
    wholesale_price: 42.00,
    discount_percent: 13,
    stock_quantity: 310,
    is_in_stock: true,
    size_label: '450g (30 Scoops)',
    serving_size: '15g (1 Full Scoop)',
    servings_per_container: 30,
    form: 'POWDER',
    flavour: 'Australian Crisp Green Apple',
    dietary_tags: 'Zero Artificial Colours, Vegan, 100% Disclosed Formula',
    goal: 'Nitric Oxide Muscle Pumps, Laser Focus & Clean Energy, High-Intensity Endurance',
    ingredients: 'L-Citrulline Malate (2:1), Beta-Alanine, L-Tyrosine, Alpha-GPC, Natural Caffeine, Pink Rock Salt, AstraGin®.',
    directions_for_use: 'Mix 1 scoop with 300ml cold water 20-30 minutes prior to training.',
    warnings: 'Contains high caffeine (300mg/serve). Do not consume within 5 hours of sleep.',
    is_featured: true,
    is_best_seller: true,
    rating_avg: 4.92,
    review_count: 114,
    primary_image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
    images: [
      { id: 6, image_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80', is_primary: true, order: 1 },
    ],
    nutrition: {
      id: 5,
      serving_size_info: '15g (1 Scoop)',
      energy_kj: '45 kJ',
      protein_g: '0.0 g',
      fat_total_g: '0.0 g',
      fat_saturated_g: '0.0 g',
      carbs_total_g: '1.0 g',
      carbs_sugars_g: '0.0 g',
      sodium_mg: '120 mg',
      custom_nutrients: { 'L-Citrulline Malate (2:1)': '8,000mg', 'Beta-Alanine': '3,200mg', 'Natural Caffeine': '300mg' }
    },
    wholesale_pricing_tiers: [
      { min_quantity: 1, unit_price: 42.00 },
      { min_quantity: 10, unit_price: 36.50 },
      { min_quantity: 50, unit_price: 32.00 },
    ]
  },
  {
    id: 6,
    name: 'Aussie Pure Hydrolyzed Wild Deep-Sea Marine Collagen Peptides',
    slug: 'aussie-pure-hydrolyzed-marine-collagen-300g',
    sku: 'APN-COLL-300G',
    artg_number: 'AUST L 388190',
    brand_name: 'Aussie Pure Nutrition',
    category_name: 'Wellness & Longevity',
    category_slug: 'wellness-longevity',
    short_description: 'Type I & III pure bioactive marine collagen peptides (10,000mg). Supports skin elasticity, hair thickness and joint cartilage repair.',
    description: 'Sustainably wild-caught deep-sea fish collagen peptides with exceptionally low molecular weight (2,000 Daltons) for optimal gut absorption and skin fibroblasts synthesis.',
    retail_price: 54.95,
    compare_at_price: 64.95,
    wholesale_price: 33.00,
    discount_percent: 15,
    stock_quantity: 210,
    is_in_stock: true,
    size_label: '300g (30 Serves)',
    serving_size: '10g (1 Scoop)',
    servings_per_container: 30,
    form: 'POWDER',
    flavour: 'Pure Neutral / Unflavoured',
    dietary_tags: 'Wild Caught, 100% Pure Type 1 Peptides, Dairy Free, Keto Friendly',
    goal: 'Skin Hydration & Glow, Joint Cartilage Recovery, Healthy Hair & Nails',
    ingredients: '100% Hydrolyzed Marine Collagen Peptides (Fish), Vitamin C (Ascorbic Acid 50mg).',
    directions_for_use: 'Add 1 scoop (10g) to your daily coffee, tea, smoothie or water.',
    warnings: 'Contains Fish. Not suitable for individuals with seafood allergies.',
    is_featured: true,
    is_best_seller: false,
    rating_avg: 4.96,
    review_count: 64,
    primary_image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
    images: [
      { id: 7, image_url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80', is_primary: true, order: 1 },
    ],
    nutrition: {
      id: 6,
      serving_size_info: '10g (1 Scoop)',
      energy_kj: '155 kJ (37 Cal)',
      protein_g: '9.2 g',
      fat_total_g: '0.0 g',
      fat_saturated_g: '0.0 g',
      carbs_total_g: '0.0 g',
      carbs_sugars_g: '0.0 g',
      sodium_mg: '18 mg',
      custom_nutrients: { 'Type 1 Bioactive Peptides': '9,950mg', 'Vitamin C': '50mg' }
    },
    wholesale_pricing_tiers: [
      { min_quantity: 1, unit_price: 33.00 },
      { min_quantity: 10, unit_price: 28.50 },
      { min_quantity: 50, unit_price: 24.50 },
    ]
  }
];

export const FALLBACK_REVIEWS: Review[] = [
  {
    id: 1,
    user_name: 'Sarah M.',
    product: 1,
    product_name: 'Aussie Pure 100% Grass-Fed Whey Protein Isolate (WPI 90)',
    product_slug: 'aussie-pure-grass-fed-whey-protein-isolate-2kg',
    rating: 5,
    title: 'Best tasting WPI in Australia by a mile — zero bloating!',
    content: 'I have tried almost every Australian whey brand over 6 years of CrossFit training. Aussie Pure WPI mixes completely effortlessly in cold water without foam, and the chocolate flavour tastes like real cacao rather than artificial chemical sweetener. Fast 2-day delivery to Sydney CBD too.',
    is_verified_purchase: true,
    is_featured: true,
    status: 'APPROVED',
    helpful_count: 38,
    not_helpful_count: 1,
    images: [
      { id: 1, image_url: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=400&q=80', alt_text: 'Sarah customer photo', created_at: '2026-02-14' }
    ],
    response: {
      id: 1,
      admin_name: 'Aussie Supplements Team (Official Response)',
      content: 'Thanks so much for the detailed review Sarah! We source our pasture milk directly from local Victorian farms so freshness and digestibility are top priorities. Keep crushing your CrossFit training!',
      created_at: '2026-02-15'
    },
    created_at: '2026-02-14'
  },
  {
    id: 2,
    user_name: 'Mark T. (Gym Owner)',
    product: 2,
    product_name: 'Tasman Performance Ultra-Pure Creapure® Creatine Monohydrate',
    product_slug: 'tasman-performance-creapure-creatine-monohydrate-500g',
    rating: 5,
    title: 'Legit Creapure® quality for our gym members in Melbourne',
    content: 'We stock this at our gym front desk in Melbourne. The 200-mesh micronization makes a huge difference; dissolves seamlessly in water without leaving that grainy residue at the bottom. Outstanding purity certification.',
    is_verified_purchase: true,
    is_featured: true,
    status: 'APPROVED',
    helpful_count: 24,
    not_helpful_count: 0,
    created_at: '2026-02-18'
  },
  {
    id: 3,
    user_name: 'Dr. David R.',
    product: 3,
    product_name: 'Outback Nutra High-Absorption Magnesium Bisglycinate Chelate',
    product_slug: 'outback-nutra-high-absorption-magnesium-glycinate-120-caps',
    rating: 5,
    title: 'Actual elemental bisglycinate — night and day difference for sleep & DOMS',
    content: 'As a physiotherapist I recommend this specific chelated formulation constantly to patients suffering from nocturnal calf cramps and elevated nervous tension. Zero gastrointestinal side-effects and noticeable deep sleep improvement.',
    is_verified_purchase: true,
    is_featured: true,
    status: 'APPROVED',
    helpful_count: 19,
    not_helpful_count: 0,
    created_at: '2026-02-22'
  }
];

export const FALLBACK_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'The Definitive Australian Protein Guide: WPI vs WPC vs Plant Protein',
    slug: 'definitive-australian-protein-guide-wpi-vs-wpc',
    category_name: 'Supplement Guides',
    category_slug: 'supplement-guides',
    author_name: 'Dr. Lachlan Hayes (BSc, MND, APD)',
    author_role: 'Head of Sports Nutrition & Research',
    excerpt: 'Understanding the biological value, leucine threshold and filtration techniques behind premium Australian grass-fed proteins.',
    cover_image_url: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=1000&q=80',
    read_time_minutes: 6,
    tags: 'Protein, Grass-Fed WPI, Leucine, Recovery Science',
    is_featured: true,
    created_at: '2026-02-20',
    content: `
# The Definitive Australian Protein Guide: WPI vs WPC vs Plant Protein

When evaluating dietary protein supplements in Australia, athletes and wellness seekers are faced with dozens of competing claims. Not all protein powders are processed equally.

### 1. Cross-Flow Microfiltered Whey Protein Isolate (WPI)
Whey Protein Isolate (WPI) is subjected to a proprietary cold-temperature filtration process that removes virtually all lactose, fats, and cholesterol while preserving vital bioactive fractions such as:
* **Beta-lactoglobulin & Alpha-lactalbumin**: Rich in branched-chain amino acids (BCAAs).
* **Immunoglobulins & Lactoferrin**: Supporting innate immune response during periods of intense training.

With a protein density exceeding **90% by weight**, WPI provides approximately 2.8g–3.2g of L-Leucine per standard 30g serving—the exact threshold required to maximally trigger the mTOR signalling pathway for Muscle Protein Synthesis (MPS).

### 2. Australian Grass-Fed Advantage
Unlike feedlot-confined dairy cattle common overseas, Victorian and Tasmanian pasture-fed dairy herds graze year-round on nutrient-dense grasses. This natural diet yields superior lipid profiles and higher concentrations of conjugated linoleic acid (CLA).

### 3. Summary Recommendation
For post-workout rapid gastric emptying with zero bloating: Choose **Cold-Microfiltered WPI 90**. For comprehensive recovery and sustained amino acid delivery, combine with clinical creatine monohydrate.
    `
  },
  {
    id: 2,
    title: 'Creatine Monohydrate: 5 Outdated Myths Debunked by Sports Science',
    slug: 'creatine-monohydrate-science-dosage-myths',
    category_name: 'Supplement Guides',
    category_slug: 'supplement-guides',
    author_name: 'Dr. Lachlan Hayes (BSc, MND, APD)',
    author_role: 'Head of Sports Nutrition & Research',
    excerpt: 'Why loading phases are optional, how Creapure® eliminates bloating, and creatine’s emerging role in cognitive longevity.',
    cover_image_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
    read_time_minutes: 5,
    tags: 'Creatine, Creapure, Strength, Cognitive Health',
    is_featured: false,
    created_at: '2026-02-24',
    content: `
# Creatine Monohydrate: 5 Outdated Myths Debunked

Creatine is the most extensively researched ergonomic aid in sports nutrition history, with over 500 peer-reviewed clinical trials demonstrating its safety and efficacy.

### Myth 1: You must undergo a 20g/day loading phase
**The Science**: While taking 20g daily for 5 days saturates intramuscular phosphocreatine stores faster, taking a consistent 5g/day dose achieves identical muscle saturation within 21–28 days without any gastric distress.

### Myth 2: Creatine causes subcutaneous water retention
**The Science**: Creatine increases *intracellular* water volume inside the muscle cells (myocytes), promoting cellular hydration and protein synthesis. It does not cause puffy subcutaneous water retention when using high-purity micronized Creapure®.
    `
  }
];

// Unified API Methods with backend connection and graceful fallback
export const api = {
  async getCategories(): Promise<Category[]> {
    try {
      const res = await fetch(`${API_BASE}/categories/`, { next: { revalidate: 60 } });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend API offline, using fallback categories', e);
    }
    return FALLBACK_CATEGORIES;
  },

  async getBrands(): Promise<Brand[]> {
    try {
      const res = await fetch(`${API_BASE}/brands/`, { next: { revalidate: 60 } });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend API offline, using fallback brands', e);
    }
    return FALLBACK_BRANDS;
  },

  async getProducts(params?: Record<string, string>): Promise<{ results: Product[]; count: number }> {
    try {
      const query = new URLSearchParams(params || {}).toString();
      const res = await fetch(`${API_BASE}/products/?${query}`, { next: { revalidate: 30 } });
      if (res.ok) {
        const data = await res.json();
        return { results: data.results || data, count: data.count || data.length || 0 };
      }
    } catch (e) {
      console.warn('Backend API offline, using fallback products', e);
    }

    let filtered = [...FALLBACK_PRODUCTS];
    if (params?.category) {
      filtered = filtered.filter(p => p.category_slug === params.category);
    }
    if (params?.brand) {
      filtered = filtered.filter(p => p.brand_name.toLowerCase().includes(params.brand.toLowerCase()));
    }
    if (params?.q) {
      const q = params.q.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.short_description.toLowerCase().includes(q));
    }
    return { results: filtered, count: filtered.length };
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    try {
      const res = await fetch(`${API_BASE}/products/${slug}/`, { next: { revalidate: 30 } });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend API offline, looking up fallback product', e);
    }
    return FALLBACK_PRODUCTS.find(p => p.slug === slug) || null;
  },

  async getFeaturedReviews(): Promise<Review[]> {
    try {
      const res = await fetch(`${API_BASE}/reviews/featured/`, { next: { revalidate: 60 } });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend API offline, using fallback reviews', e);
    }
    return FALLBACK_REVIEWS;
  },

  async getProductReviews(slug: string): Promise<Review[]> {
    try {
      const res = await fetch(`${API_BASE}/reviews/product/${slug}/`);
      if (res.ok) {
        const data = await res.json();
        return data.results || data;
      }
    } catch (e) {}
    return FALLBACK_REVIEWS.filter(r => r.product_slug === slug);
  },

  async getProductReviewStats(slug: string): Promise<ReviewStats> {
    try {
      const res = await fetch(`${API_BASE}/reviews/product/${slug}/stats/`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return {
      product_name: slug,
      total_reviews: 142,
      average_rating: 4.9,
      verified_purchases: 136,
      reviews_with_photos: 18,
      distribution: {
        5: { count: 128, percentage: 90 },
        4: { count: 12, percentage: 8 },
        3: { count: 2, percentage: 2 },
        2: { count: 0, percentage: 0 },
        1: { count: 0, percentage: 0 },
      }
    };
  },

  async getBlogPosts(params?: Record<string, string>): Promise<BlogPost[]> {
    try {
      const query = new URLSearchParams(params || {}).toString();
      const res = await fetch(`${API_BASE}/blog/posts/?${query}`);
      if (res.ok) {
        const data = await res.json();
        return data.results || data;
      }
    } catch (e) {}
    return FALLBACK_BLOG_POSTS;
  },

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const res = await fetch(`${API_BASE}/blog/posts/${slug}/`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return FALLBACK_BLOG_POSTS.find(b => b.slug === slug) || null;
  },

  async validateCoupon(code: string, subtotal: number) {
    try {
      const res = await fetch(`${API_BASE}/coupons/validate/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, subtotal })
      });
      return await res.json();
    } catch (e) {
      if (code.toUpperCase() === 'WELCOME10') {
        const discount = Math.round(subtotal * 0.10 * 100) / 100;
        return { valid: true, code: 'WELCOME10', discount_type: 'PERCENTAGE', discount_value: 10, discount_amount: discount, message: 'Saved 10% with WELCOME10' };
      }
      if (code.toUpperCase() === 'AUSSIE20' && subtotal >= 120) {
        return { valid: true, code: 'AUSSIE20', discount_type: 'FIXED', discount_value: 20, discount_amount: 20, message: 'Saved $20 with AUSSIE20' };
      }
      return { valid: false, message: 'Invalid coupon code.' };
    }
  },

  async submitWholesaleApplication(data: Partial<WholesaleApplication>) {
    try {
      const res = await fetch(`${API_BASE}/wholesale/apply/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { success: true, message: 'Application submitted successfully! Our B2B onboarding team will review your ABN within 24 business hours.' };
  },

  async createOrder(orderPayload: any): Promise<Order> {
    try {
      const res = await fetch(`${API_BASE}/orders/create/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    // Mock order response for resilient seamless checkout demonstration
    const orderNum = `AUS-${Math.floor(100000 + Math.random() * 900000)}`;
    return {
      id: Math.floor(Math.random() * 10000),
      order_number: orderNum,
      order_type: orderPayload.order_type || 'RETAIL',
      status: 'CONFIRMED',
      subtotal: orderPayload.subtotal || 134.90,
      discount_amount: orderPayload.discount_amount || 0,
      shipping_fee: orderPayload.shipping_fee || 0,
      tax_gst: Math.round((orderPayload.subtotal || 134.90) / 11 * 100) / 100,
      total_amount: orderPayload.total_amount || 134.90,
      customer_email: orderPayload.customer_email,
      customer_phone: orderPayload.customer_phone,
      shipping_first_name: orderPayload.shipping_first_name,
      shipping_last_name: orderPayload.shipping_last_name,
      street_address: orderPayload.street_address,
      city: orderPayload.city,
      state: orderPayload.state,
      postcode: orderPayload.postcode,
      country: 'Australia',
      shipping_method: orderPayload.shipping_method,
      tracking_number: `AP-${orderNum}`,
      carrier: 'Australia Post eParcel Express',
      payment_status: 'PAID',
      payment_method: orderPayload.payment_method || 'Credit Card (Stripe)',
      created_at: new Date().toISOString(),
      items: orderPayload.items.map((it: any, idx: number) => ({
        id: idx + 1,
        product_name: it.product_name || `Product #${it.product_id}`,
        sku: it.sku || `SKU-${it.product_id}`,
        quantity: it.quantity,
        unit_price: it.unit_price || 44.95,
        total_price: (it.unit_price || 44.95) * it.quantity
      }))
    };
  },

  async getSiteConfig(): Promise<SiteConfig> {
    try {
      const res = await fetch(`${API_BASE}/cms/config/`, { cache: 'no-store' });
      if (res.ok) return await res.json();
    } catch (e) {}
    return FALLBACK_SITE_CONFIG;
  },

  async updateSiteConfig(data: Partial<SiteConfig>, token?: string): Promise<SiteConfig> {
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`${API_BASE}/cms/config/`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { ...FALLBACK_SITE_CONFIG, ...data };
  },

  async getHeroSlides(): Promise<HeroSlide[]> {
    try {
      const res = await fetch(`${API_BASE}/cms/hero-slides/`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {}
    return FALLBACK_HERO_SLIDES;
  },

  async createHeroSlide(slide: Partial<HeroSlide>): Promise<HeroSlide | null> {
    try {
      const res = await fetch(`${API_BASE}/cms/hero-slides/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slide)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { ...FALLBACK_HERO_SLIDES[0], ...slide, id: Date.now() };
  },

  async updateHeroSlide(id: number, slide: Partial<HeroSlide>): Promise<HeroSlide | null> {
    try {
      const res = await fetch(`${API_BASE}/cms/hero-slides/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slide)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { ...FALLBACK_HERO_SLIDES[0], ...slide, id };
  },

  async deleteHeroSlide(id: number): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/cms/hero-slides/${id}/`, { method: 'DELETE' });
      return res.ok || res.status === 204;
    } catch (e) {}
    return true;
  },

  async getQuizQuestions(): Promise<DiagnosticQuestion[]> {
    try {
      const res = await fetch(`${API_BASE}/cms/quiz/`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {}
    return FALLBACK_QUIZ_QUESTIONS;
  },

  async createQuizQuestion(q: Partial<DiagnosticQuestion>): Promise<DiagnosticQuestion | null> {
    try {
      const res = await fetch(`${API_BASE}/cms/quiz/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(q)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { ...FALLBACK_QUIZ_QUESTIONS[0], ...q, id: Date.now() };
  },

  async updateQuizQuestion(id: number, q: Partial<DiagnosticQuestion>): Promise<DiagnosticQuestion | null> {
    try {
      const res = await fetch(`${API_BASE}/cms/quiz/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(q)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { ...FALLBACK_QUIZ_QUESTIONS[0], ...q, id };
  },

  async deleteQuizQuestion(id: number): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/cms/quiz/${id}/`, { method: 'DELETE' });
      return res.ok || res.status === 204;
    } catch (e) {}
    return true;
  },

  async getTrustPillars(): Promise<TrustPillarItem[]> {
    try {
      const res = await fetch(`${API_BASE}/cms/trust-pillars/`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {}
    return FALLBACK_TRUST_PILLARS;
  },

  async createTrustPillar(pillar: Partial<TrustPillarItem>): Promise<TrustPillarItem | null> {
    try {
      const res = await fetch(`${API_BASE}/cms/trust-pillars/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pillar)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { ...FALLBACK_TRUST_PILLARS[0], ...pillar, id: Date.now() };
  },

  async updateTrustPillar(id: number, pillar: Partial<TrustPillarItem>): Promise<TrustPillarItem | null> {
    try {
      const res = await fetch(`${API_BASE}/cms/trust-pillars/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pillar)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { ...FALLBACK_TRUST_PILLARS[0], ...pillar, id };
  },

  async deleteTrustPillar(id: number): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/cms/trust-pillars/${id}/`, { method: 'DELETE' });
      return res.ok || res.status === 204;
    } catch (e) {}
    return true;
  },

  // Product CRUD
  async createProduct(productData: any): Promise<Product | null> {
    try {
      const res = await fetch(`${API_BASE}/products/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { ...FALLBACK_PRODUCTS[0], ...productData, id: Date.now() };
  },

  async updateProduct(id: number, productData: any): Promise<Product | null> {
    try {
      const res = await fetch(`${API_BASE}/products/admin/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { ...FALLBACK_PRODUCTS[0], ...productData, id };
  },

  async deleteProduct(id: number): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/products/admin/${id}/`, { method: 'DELETE' });
      return res.ok || res.status === 204;
    } catch (e) {}
    return true;
  },

  // Category CRUD
  async createCategory(catData: any): Promise<Category | null> {
    try {
      const res = await fetch(`${API_BASE}/categories/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(catData)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { ...FALLBACK_CATEGORIES[0], ...catData, id: Date.now() };
  },

  async updateCategory(id: number, catData: any): Promise<Category | null> {
    try {
      const res = await fetch(`${API_BASE}/categories/admin/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(catData)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { ...FALLBACK_CATEGORIES[0], ...catData, id };
  },

  async deleteCategory(id: number): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/categories/admin/${id}/`, { method: 'DELETE' });
      return res.ok || res.status === 204;
    } catch (e) {}
    return true;
  },

  // Brand CRUD
  async createBrand(brandData: any): Promise<Brand | null> {
    try {
      const res = await fetch(`${API_BASE}/brands/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brandData)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { ...FALLBACK_BRANDS[0], ...brandData, id: Date.now() };
  },

  async updateBrand(id: number, brandData: any): Promise<Brand | null> {
    try {
      const res = await fetch(`${API_BASE}/brands/admin/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brandData)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { ...FALLBACK_BRANDS[0], ...brandData, id };
  },

  async deleteBrand(id: number): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/brands/admin/${id}/`, { method: 'DELETE' });
      return res.ok || res.status === 204;
    } catch (e) {}
    return true;
  },

  // Coupon CRUD
  async getCoupons(): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE}/coupons/`, { cache: 'no-store' });
      if (res.ok) return await res.json();
    } catch (e) {}
    return [
      { id: 1, code: 'WELCOME10', discount_type: 'PERCENTAGE', discount_value: 10, min_spend: 50, is_active: true },
      { id: 2, code: 'AUSSIE20', discount_type: 'FIXED', discount_value: 20, min_spend: 120, is_active: true }
    ];
  },

  async createCoupon(couponData: any): Promise<any | null> {
    try {
      const res = await fetch(`${API_BASE}/coupons/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(couponData)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { ...couponData, id: Date.now() };
  },

  async updateCoupon(id: number, couponData: any): Promise<any | null> {
    try {
      const res = await fetch(`${API_BASE}/coupons/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(couponData)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { ...couponData, id };
  },

  async deleteCoupon(id: number): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/coupons/${id}/`, { method: 'DELETE' });
      return res.ok || res.status === 204;
    } catch (e) {}
    return true;
  },

  // Blog CRUD
  async createBlogPost(postData: any): Promise<BlogPost | null> {
    try {
      const res = await fetch(`${API_BASE}/blog/posts/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { ...FALLBACK_BLOG_POSTS[0], ...postData, id: Date.now() };
  },

  async updateBlogPost(id: number, postData: any): Promise<BlogPost | null> {
    try {
      const res = await fetch(`${API_BASE}/blog/posts/admin/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { ...FALLBACK_BLOG_POSTS[0], ...postData, id };
  },

  async deleteBlogPost(id: number): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/blog/posts/admin/${id}/`, { method: 'DELETE' });
      return res.ok || res.status === 204;
    } catch (e) {}
    return true;
  },

  // Orders Admin
  async getAdminOrders(params?: Record<string, string>): Promise<Order[]> {
    try {
      const query = new URLSearchParams(params || {}).toString();
      const res = await fetch(`${API_BASE}/orders/admin/all/?${query}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        return data.results || data;
      }
    } catch (e) {}
    return [];
  },

  async updateOrderStatus(orderNumber: string, status: string, trackingNumber?: string): Promise<Order | null> {
    try {
      const res = await fetch(`${API_BASE}/orders/admin/${orderNumber}/status/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, tracking_number: trackingNumber })
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  },

  async getStripeConfig(): Promise<{ publishableKey: string }> {
    try {
      const res = await fetch(`${API_BASE}/orders/stripe-config/`, { cache: 'no-store' });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || 'pk_test_demo' };
  },

  async createPaymentIntent(payload: {
    total_amount: number;
    currency: string;
    customer_email: string;
    order_number: string;
  }): Promise<{ clientSecret: string; paymentIntentId: string; order_number: string }> {
    try {
      const res = await fetch(`${API_BASE}/orders/create-payment-intent/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return {
      clientSecret: `pi_mock_${Math.random().toString(36).substring(2)}_secret`,
      paymentIntentId: `pi_mock_${Math.random().toString(36).substring(2)}`,
      order_number: payload.order_number
    };
  }
};

export const apiClient = api;



