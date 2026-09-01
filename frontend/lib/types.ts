export interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone?: string;
  role: 'RETAIL' | 'WHOLESALE' | 'MANAGER' | 'ADMIN';
  created_at: string;
  addresses?: Address[];
}

export interface Address {
  id: number;
  address_type: 'SHIPPING' | 'BILLING';
  first_name: string;
  last_name: string;
  company_name?: string;
  street_address: string;
  apartment?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone?: string;
  is_default: boolean;
}

export interface Subcategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  order: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon_name?: string;
  image_url?: string;
  is_featured: boolean;
  order: number;
  subcategories?: Subcategory[];
  product_count?: number;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  description?: string;
  logo_url?: string;
  banner_url?: string;
  origin_country: string;
  is_featured: boolean;
  website?: string;
  product_count?: number;
}

export interface ProductImage {
  id: number;
  image_url: string;
  alt_text?: string;
  is_primary: boolean;
  order: number;
}

export interface NutritionFact {
  id: number;
  serving_size_info: string;
  energy_kj: string;
  protein_g: string;
  fat_total_g: string;
  fat_saturated_g: string;
  carbs_total_g: string;
  carbs_sugars_g: string;
  sodium_mg: string;
  custom_nutrients: Record<string, string>;
}

export interface WholesaleTierPrice {
  min_quantity: number;
  unit_price: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  barcode?: string;
  artg_number?: string;
  brand_name: string;
  category_name: string;
  category_slug: string;
  short_description: string;
  description?: string;
  retail_price: number | string;
  compare_at_price?: number | string | null;
  wholesale_price: number | string;
  discount_percent: number;
  stock_quantity: number;
  is_in_stock: boolean;
  size_label: string;
  serving_size: string;
  servings_per_container?: number;
  form: 'POWDER' | 'CAPSULES' | 'TABLETS' | 'GUMMIES' | 'LIQUID';
  flavour?: string;
  goal: string;
  dietary_tags: string;
  ingredients?: string;
  directions_for_use?: string;
  warnings?: string;
  storage_info?: string;
  is_featured: boolean;
  is_best_seller: boolean;
  rating_avg: number | string;
  review_count: number;
  is_active?: boolean;
  primary_image?: string;
  image_urls?: string[];
  images?: ProductImage[];
  nutrition?: NutritionFact;
  brand?: Brand;
  category?: Category;
  subcategory?: Subcategory;
  wholesale_pricing_tiers?: WholesaleTierPrice[];
}

export interface ReviewImage {
  id: number;
  image_url: string;
  alt_text?: string;
  created_at: string;
}

export interface ReviewResponse {
  id: number;
  admin_name: string;
  content: string;
  created_at: string;
}

export interface Review {
  id: number;
  user_name: string;
  product: number;
  product_name: string;
  product_slug: string;
  rating: number;
  title: string;
  content: string;
  is_verified_purchase: boolean;
  is_featured: boolean;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'HIDDEN';
  helpful_count: number;
  not_helpful_count: number;
  images?: ReviewImage[];
  response?: ReviewResponse;
  created_at: string;
}

export interface ReviewStats {
  product_name: string;
  total_reviews: number;
  average_rating: number;
  verified_purchases: number;
  reviews_with_photos: number;
  distribution: Record<number, { count: number; percentage: number }>;
}

export interface CartItem {
  id: string | number;
  product: Product;
  quantity: number;
  is_wholesale: boolean;
  unit_price: number;
  total_price: number;
}

export interface Coupon {
  id: number;
  code: string;
  discount_type: 'PERCENTAGE' | 'FIXED';
  discount_value: number;
  min_spend: number;
  max_discount?: number;
  is_active: boolean;
}

export interface OrderItem {
  id: number;
  product?: Product;
  product_name: string;
  sku: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Order {
  id: number;
  order_number: string;
  order_type: 'RETAIL' | 'WHOLESALE';
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
  subtotal: number;
  discount_amount: number;
  shipping_fee: number;
  tax_gst: number;
  total_amount: number;
  coupon_code?: string;
  customer_email: string;
  customer_phone: string;
  shipping_first_name: string;
  shipping_last_name: string;
  company_name?: string;
  street_address: string;
  apartment?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  shipping_method: string;
  tracking_number?: string;
  carrier: string;
  payment_status: string;
  payment_method: string;
  created_at: string;
  items: OrderItem[];
}

export interface WholesaleTier {
  id: number;
  name: string;
  discount_percentage: number;
  min_order_value: number;
  description?: string;
}

export interface WholesaleApplication {
  id: number;
  business_name: string;
  abn: string;
  contact_name: string;
  email: string;
  phone: string;
  business_type: string;
  website?: string;
  estimated_monthly_spend: string;
  interested_categories: string;
  message?: string;
  status: 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';
  admin_notes?: string;
  created_at: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category_name: string;
  category_slug: string;
  author_name: string;
  author_role: string;
  excerpt: string;
  content?: string;
  cover_image_url: string;
  read_time_minutes: number;
  tags: string;
  is_featured: boolean;
  created_at: string;
  category?: { name: string; slug: string };
  related_posts?: BlogPost[];
}

export type CurrencyCode = 'LKR' | 'USD' | 'AUD';

export interface CurrencyConfig {
  code: CurrencyCode;
  name: string;
  symbol: string;
  rate: number; // multiplier from base AUD price
  flag: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  LKR: {
    code: 'LKR',
    name: 'Sri Lankan Rupee',
    symbol: 'Rs. ',
    rate: 200, // 1 AUD ≈ 200 LKR
    flag: '🇱🇰'
  },
  USD: {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    rate: 0.65, // 1 AUD ≈ 0.65 USD
    flag: '🇺🇸'
  },
  AUD: {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: '$',
    rate: 1.0,
    flag: '🇦🇺'
  }
};

export interface SiteConfig {
  site_name: string;
  tagline: string;
  announcement_text: string;
  announcement_enabled: boolean;
  announcement_link: string;
  free_shipping_threshold: number;
  default_currency: CurrencyCode;
  lkr_multiplier: number;
  usd_multiplier: number;
  aud_multiplier: number;
  contact_email: string;
  contact_phone: string;
  warehouse_location: string;
  is_store_open: boolean;
  maintenance_mode: boolean;
  updated_at?: string;
}

export interface HeroHotspot {
  x: string;
  y: string;
  title: string;
  detail: string;
}

export interface HeroSlide {
  id: number;
  title: string;
  tagline: string;
  hero_title: string;
  subline: string;
  size_servings: string;
  retail_price: number | string;
  wholesale_price: number | string;
  image_url: string;
  halo_gradient: string;
  glow_shadow: string;
  tab_label: string;
  slug: string;
  badge_top_value: string;
  badge_top_label: string;
  badge_top_sub: string;
  badge_bottom_title: string;
  badge_bottom_subtitle: string;
  badge_rating_score: string;
  badge_rating_count: string;
  hotspots: HeroHotspot[];
  order: number;
  is_active: boolean;
}

export interface QuizOption {
  id: string;
  title: string;
  desc: string;
  icon: string;
  category_slug: string;
}

export interface DiagnosticQuestion {
  id: number;
  step_number: number;
  question_text: string;
  subtitle?: string;
  options: QuizOption[];
  order: number;
  is_active: boolean;
}

export interface TrustPillarItem {
  id: number;
  title: string;
  subtitle: string;
  icon_type: string;
  order: number;
  is_active: boolean;
}
