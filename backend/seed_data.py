import os
import sys
import django

# Setup Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.accounts.models import User, Address
from apps.categories.models import Category, Subcategory
from apps.brands.models import Brand
from apps.products.models import Product, ProductImage, NutritionFact
from apps.wholesale.models import WholesaleTier, WholesaleApplication, WholesalePrice
from apps.reviews.models import Review, ReviewImage, ReviewResponse
from apps.coupons.models import Coupon
from apps.orders.models import Order, OrderItem
from apps.blog.models import BlogCategory, BlogPost

def seed():
    print("[+] Starting Australian Supplements Data Seeding...")

    # 1. Create Users
    admin_user, _ = User.objects.get_or_create(
        email='admin@aussiesupplements.com.au',
        defaults={
            'username': 'admin@aussiesupplements.com.au',
            'first_name': 'Aussie',
            'last_name': 'Admin',
            'role': User.Role.ADMIN,
            'is_staff': True,
            'is_superuser': True
        }
    )
    admin_user.set_password('AdminPass2026!')
    admin_user.save()

    retail_user, _ = User.objects.get_or_create(
        email='sarah.miller@sydneyfitness.com.au',
        defaults={
            'username': 'sarah.miller@sydneyfitness.com.au',
            'first_name': 'Sarah',
            'last_name': 'Miller',
            'role': User.Role.RETAIL,
            'phone': '0412 345 678'
        }
    )
    retail_user.set_password('RetailPass2026!')
    retail_user.save()

    wholesale_user, _ = User.objects.get_or_create(
        email='wholesale@gympower.com.au',
        defaults={
            'username': 'wholesale@gympower.com.au',
            'first_name': 'Mark',
            'last_name': 'Taylor',
            'role': User.Role.WHOLESALE,
            'phone': '0423 456 789'
        }
    )
    wholesale_user.set_password('WholesalePass2026!')
    wholesale_user.save()

    # Address
    Address.objects.get_or_create(
        user=retail_user,
        defaults={
            'first_name': 'Sarah',
            'last_name': 'Miller',
            'street_address': '42 Pitt Street',
            'apartment': 'Level 4, Apt 12',
            'city': 'Sydney',
            'state': 'NSW',
            'postcode': '2000',
            'country': 'Australia',
            'phone': '0412 345 678',
            'is_default': True
        }
    )

    # 2. Categories & Subcategories
    cat_protein, _ = Category.objects.get_or_create(
        slug='protein',
        defaults={
            'name': 'Protein',
            'description': 'Pure Australian grass-fed whey isolate, organic plant proteins & collagen peptides.',
            'icon_name': 'Flame',
            'image_url': 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=800&q=80',
            'is_featured': True,
            'order': 1
        }
    )
    Subcategory.objects.get_or_create(category=cat_protein, name='Whey Protein Isolate (WPI)', slug='protein-wpi')
    Subcategory.objects.get_or_create(category=cat_protein, name='Organic Plant Protein', slug='protein-plant')
    Subcategory.objects.get_or_create(category=cat_protein, name='Collagen Peptides', slug='protein-collagen')

    cat_sports, _ = Category.objects.get_or_create(
        slug='sports-nutrition',
        defaults={
            'name': 'Sports Nutrition',
            'description': 'Clinical pre-workouts, Creapure creatine, BCAAs & intra-workout electrolytes.',
            'icon_name': 'Zap',
            'image_url': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
            'is_featured': True,
            'order': 2
        }
    )
    Subcategory.objects.get_or_create(category=cat_sports, name='Creatine Monohydrate', slug='sports-creatine')
    Subcategory.objects.get_or_create(category=cat_sports, name='High-Performance Pre-Workouts', slug='sports-pre-workout')
    Subcategory.objects.get_or_create(category=cat_sports, name='Electrolytes & Hydration', slug='sports-electrolytes')

    cat_vitamins, _ = Category.objects.get_or_create(
        slug='vitamins-minerals',
        defaults={
            'name': 'Vitamins & Minerals',
            'description': 'Therapeutic strength magnesium, bioactive zinc, Vitamin D3 and daily multi-nutrients.',
            'icon_name': 'ShieldCheck',
            'image_url': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
            'is_featured': True,
            'order': 3
        }
    )
    Subcategory.objects.get_or_create(category=cat_vitamins, name='Magnesium Glycinate & Chelates', slug='vitamins-magnesium')
    Subcategory.objects.get_or_create(category=cat_vitamins, name='Immunity & Vitamin D3', slug='vitamins-immunity')

    cat_herbal, _ = Category.objects.get_or_create(
        slug='herbal-supplements',
        defaults={
            'name': 'Herbal Supplements',
            'description': 'Standardised Australian native botanicals, KSM-66 Ashwagandha & adaptogens.',
            'icon_name': 'Leaf',
            'image_url': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
            'is_featured': True,
            'order': 4
        }
    )

    cat_wellness, _ = Category.objects.get_or_create(
        slug='wellness-longevity',
        defaults={
            'name': 'Wellness & Recovery',
            'description': 'Cellular health, deep sleep formulas, joint recovery & anti-inflammatory nutrition.',
            'icon_name': 'Heart',
            'image_url': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
            'is_featured': True,
            'order': 5
        }
    )

    # 3. Brands
    brand_aussie, _ = Brand.objects.get_or_create(
        slug='aussie-pure-nutrition',
        defaults={
            'name': 'Aussie Pure Nutrition',
            'description': '100% grass-fed Victorian dairy, clean label sports nutrition without artificial fillers.',
            'logo_url': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80',
            'origin_country': 'Australia (Victoria)',
            'is_featured': True
        }
    )

    brand_tasman, _ = Brand.objects.get_or_create(
        slug='tasman-performance',
        defaults={
            'name': 'Tasman Performance Lab',
            'description': 'Clinical dosages backed by peer-reviewed sports science and ultra-pure raw materials.',
            'logo_url': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=200&q=80',
            'origin_country': 'Australia (Tasmania)',
            'is_featured': True
        }
    )

    brand_byron, _ = Brand.objects.get_or_create(
        slug='byron-bay-organics',
        defaults={
            'name': 'Byron Bay Organics',
            'description': 'Certified organic wholefood botanicals, adaptogens and natural restorative blends.',
            'logo_url': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=200&q=80',
            'origin_country': 'Australia (Byron Bay NSW)',
            'is_featured': True
        }
    )

    brand_outback, _ = Brand.objects.get_or_create(
        slug='outback-nutra',
        defaults={
            'name': 'Outback Nutra Care',
            'description': 'Therapeutic TGA-listed Australian health formulations for daily resilience and vitality.',
            'logo_url': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=200&q=80',
            'origin_country': 'Australia (Queensland)',
            'is_featured': True
        }
    )

    # 4. Wholesale Tiers
    tier_silver, _ = WholesaleTier.objects.get_or_create(
        name='Tier 1 - Verified Gyms & Studios',
        defaults={
            'discount_percentage': 25.00,
            'min_order_value': 300.00,
            'description': 'Designed for boutique fitness studios, CrossFit boxes and personal trainers.'
        }
    )
    tier_gold, _ = WholesaleTier.objects.get_or_create(
        name='Tier 2 - Commercial Retailers & Pharmacies',
        defaults={
            'discount_percentage': 35.00,
            'min_order_value': 1000.00,
            'description': 'For established retail supplement stores, pharmacies and regional distributors.'
        }
    )

    # 5. Products
    p1, _ = Product.objects.get_or_create(
        sku='APN-WPI-2KG-CHO',
        defaults={
            'name': 'Aussie Pure 100% Grass-Fed Whey Protein Isolate (WPI 90)',
            'slug': 'aussie-pure-grass-fed-whey-protein-isolate-2kg',
            'brand': brand_aussie,
            'category': cat_protein,
            'artg_number': 'AUST L 394821',
            'barcode': '9312345678901',
            'short_description': 'Ultra-pure cold-microfiltered Australian grass-fed WPI. 27.2g protein, <1g carbs and 0 sugar per serving.',
            'description': 'Formulated exclusively from 100% grass-fed Victorian dairy pasture cattle. Our Cross-Flow Microfiltration (CFM) preserves bioactive immunoglobulins and lactoferrin while filtering out nearly all lactose and fat. Fast digesting, ultra-smooth mixability with natural Madagascar cocoa and organic stevia.',
            'retail_price': 89.95,
            'compare_at_price': 104.95,
            'wholesale_price': 58.50,
            'stock_quantity': 350,
            'weight_grams': 2000,
            'size_label': '2kg (66 Serves)',
            'serving_size': '30g (1 Rounded Scoop)',
            'servings_per_container': 66,
            'form': Product.FormChoices.POWDER,
            'flavour': 'Rich Chocolate Fudge',
            'dietary_tags': '100% Australian Grass-Fed, Gluten Free, 99.8% Lactose Free, Non-GMO',
            'goal': 'Muscle Growth, Rapid Recovery, Daily Protein Target',
            'ingredients': 'Grass-Fed Whey Protein Isolate (Milk), Organic Dutch Alkalized Cocoa Powder, Natural Flavours, Sunflower Lecithin (0.2%), Steviol Glycosides (Organic Stevia).',
            'directions_for_use': 'Mix 1 rounded scoop (30g) in 250-350ml of cold water, almond milk or your favourite beverage. Consume immediately post-workout or throughout the day.',
            'warnings': 'Contains Milk dairy. Produced in a certified HACCP and GMP facility. Not suitable for children under 15 years or pregnant women without medical consultation.',
            'is_featured': True,
            'is_best_seller': True,
            'rating_avg': 4.95,
            'review_count': 142
        }
    )
    ProductImage.objects.get_or_create(
        product=p1,
        image_url='https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=1000&q=80',
        defaults={'is_primary': True, 'alt_text': 'Aussie Pure WPI 2kg Chocolate Front'}
    )
    ProductImage.objects.get_or_create(
        product=p1,
        image_url='https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=1000&q=80',
        defaults={'is_primary': False, 'alt_text': 'Aussie Pure WPI Powder Scoop'}
    )
    NutritionFact.objects.get_or_create(
        product=p1,
        defaults={
            'serving_size_info': '30g (1 Scoop)',
            'energy_kj': '482 kJ (115 Cal)',
            'protein_g': '27.2 g',
            'fat_total_g': '0.3 g',
            'fat_saturated_g': '0.1 g',
            'carbs_total_g': '0.6 g',
            'carbs_sugars_g': '0.3 g',
            'sodium_mg': '48 mg',
            'custom_nutrients': {'BCAAs': '6.4g', 'Glutamine': '4.9g', 'L-Leucine': '3.1g'}
        }
    )
    WholesalePrice.objects.get_or_create(product=p1, min_quantity=1, defaults={'unit_price': 58.50})
    WholesalePrice.objects.get_or_create(product=p1, min_quantity=10, defaults={'unit_price': 52.00})
    WholesalePrice.objects.get_or_create(product=p1, min_quantity=50, defaults={'unit_price': 46.50})

    p2, _ = Product.objects.get_or_create(
        sku='TP-CREA-500G',
        defaults={
            'name': 'Tasman Performance Ultra-Pure Creapure® Creatine Monohydrate',
            'slug': 'tasman-performance-creapure-creatine-monohydrate-500g',
            'brand': brand_tasman,
            'category': cat_sports,
            'artg_number': 'AUST L 372109',
            'barcode': '9312345678902',
            'short_description': '100% German Creapure® 200 Mesh Micronized Creatine. Zero fillers, maximum ATP cellular energy and power output.',
            'description': 'Creapure® is universally recognized as the gold standard of creatine monohydrate worldwide. Manufactured under rigorous pharmaceutical standards in Germany and tested in Melbourne for 99.99% purity. Unflavoured 200 mesh micronization ensures instant dissolving without stomach discomfort.',
            'retail_price': 44.95,
            'compare_at_price': 54.95,
            'wholesale_price': 26.00,
            'stock_quantity': 500,
            'weight_grams': 500,
            'size_label': '500g (100 Serves)',
            'serving_size': '5g (1 Level Scoop)',
            'servings_per_container': 100,
            'form': Product.FormChoices.POWDER,
            'flavour': 'Pure Unflavoured',
            'dietary_tags': '100% Vegan, Gluten Free, HPLC Tested 99.99% Pure',
            'goal': 'Strength & Power Output, Lean Muscle Fullness, Brain Energy',
            'ingredients': '100% Creapure® Micronized Creatine Monohydrate (HPLC Certified).',
            'directions_for_use': 'Mix 1 scoop (5g) with water, fruit juice or your post-workout shake once daily. Drink plenty of water throughout the day.',
            'warnings': 'Drink at least 2.5L of water daily. Consult a physician before use if you have kidney or renal conditions.',
            'is_featured': True,
            'is_best_seller': True,
            'rating_avg': 4.98,
            'review_count': 98
        }
    )
    ProductImage.objects.get_or_create(
        product=p2,
        image_url='https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=1000&q=80',
        defaults={'is_primary': True, 'alt_text': 'Tasman Creapure Creatine 500g'}
    )
    NutritionFact.objects.get_or_create(
        product=p2,
        defaults={
            'serving_size_info': '5g (1 Scoop)',
            'energy_kj': '0 kJ (0 Cal)',
            'protein_g': '0.0 g',
            'fat_total_g': '0.0 g',
            'fat_saturated_g': '0.0 g',
            'carbs_total_g': '0.0 g',
            'carbs_sugars_g': '0.0 g',
            'sodium_mg': '0 mg',
            'custom_nutrients': {'Creapure Creatine Monohydrate': '5,000mg'}
        }
    )
    WholesalePrice.objects.get_or_create(product=p2, min_quantity=1, defaults={'unit_price': 26.00})
    WholesalePrice.objects.get_or_create(product=p2, min_quantity=10, defaults={'unit_price': 22.50})
    WholesalePrice.objects.get_or_create(product=p2, min_quantity=50, defaults={'unit_price': 19.80})

    p3, _ = Product.objects.get_or_create(
        sku='OBN-MAG-120CAP',
        defaults={
            'name': 'Outback Nutra High-Absorption Magnesium Bisglycinate Chelate',
            'slug': 'outback-nutra-high-absorption-magnesium-glycinate-120-caps',
            'brand': brand_outback,
            'category': cat_vitamins,
            'artg_number': 'AUST L 384920',
            'barcode': '9312345678903',
            'short_description': 'TGA-listed high-potency elemental magnesium glycinate. Supports muscle cramp relief, nervous system calming & deep REM sleep.',
            'description': 'Unlike cheap magnesium oxides that cause GI distress, Outback Nutra utilizes 100% chelated Magnesium Bisglycinate bound to organic glycine. This ensures gentle digestion and up to 4x higher bioavailability. Ideal for active individuals experiencing nighttime muscle cramps or elevated physical stress.',
            'retail_price': 39.95,
            'compare_at_price': 49.95,
            'wholesale_price': 22.00,
            'stock_quantity': 420,
            'weight_grams': 250,
            'size_label': '120 Veg Capsules',
            'serving_size': '2 Capsules',
            'servings_per_container': 60,
            'form': Product.FormChoices.CAPSULES,
            'flavour': 'Unflavoured Capsule',
            'dietary_tags': 'TGA Listed (AUST L 384920), Vegan, Non-Laxative, Gentle on Stomach',
            'goal': 'Muscle Relaxation & Cramp Prevention, Restorative Deep Sleep, Nervous System Balance',
            'ingredients': 'Each capsule contains: Magnesium Bisglycinate Chelate (equiv. elemental magnesium 150mg), Vitamin B6 (Pyridoxal-5-Phosphate 5mg), BioPerine® Black Pepper Extract 2.5mg.',
            'directions_for_use': 'Take 2 capsules daily with evening meal or 30-45 minutes before sleep, or as professionally prescribed.',
            'warnings': 'Mineral supplements should not replace a balanced diet. If symptoms persist consult your healthcare practitioner.',
            'is_featured': True,
            'is_best_seller': True,
            'rating_avg': 4.91,
            'review_count': 76
        }
    )
    ProductImage.objects.get_or_create(
        product=p3,
        image_url='https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80',
        defaults={'is_primary': True, 'alt_text': 'Outback Nutra Magnesium Glycinate Bottle'}
    )
    NutritionFact.objects.get_or_create(
        product=p3,
        defaults={
            'serving_size_info': '2 Capsules',
            'energy_kj': '12 kJ',
            'protein_g': '0.0 g',
            'fat_total_g': '0.0 g',
            'fat_saturated_g': '0.0 g',
            'carbs_total_g': '0.0 g',
            'carbs_sugars_g': '0.0 g',
            'sodium_mg': '0 mg',
            'custom_nutrients': {'Elemental Magnesium': '300mg (80% RDI)', 'Bioactive Vitamin B6 (P5P)': '10mg', 'BioPerine': '5mg'}
        }
    )
    WholesalePrice.objects.get_or_create(product=p3, min_quantity=1, defaults={'unit_price': 22.00})
    WholesalePrice.objects.get_or_create(product=p3, min_quantity=10, defaults={'unit_price': 18.50})
    WholesalePrice.objects.get_or_create(product=p3, min_quantity=50, defaults={'unit_price': 16.00})

    p4, _ = Product.objects.get_or_create(
        sku='BYR-ASH-60CAP',
        defaults={
            'name': 'Byron Bay Organics KSM-66® Ashwagandha Root Stress & Vitality',
            'slug': 'byron-bay-organics-ksm-66-ashwagandha-60-caps',
            'brand': brand_byron,
            'category': cat_herbal,
            'artg_number': 'AUST L 391048',
            'barcode': '9312345678904',
            'short_description': 'Full-spectrum organic KSM-66® root extract (600mg). Clinically proven to reduce cortisol, enhance mood resilience and promote physical stamina.',
            'description': 'Award-winning KSM-66® is the highest concentration full-spectrum root extract available on the market today. Extracted using sustainable green chemistry without alcohol or chemical solvents. Standardized to 5% withanolides.',
            'retail_price': 38.95,
            'compare_at_price': 46.95,
            'wholesale_price': 21.50,
            'stock_quantity': 280,
            'weight_grams': 180,
            'size_label': '60 Veggie Capsules',
            'serving_size': '1-2 Capsules',
            'servings_per_container': 60,
            'form': Product.FormChoices.CAPSULES,
            'flavour': 'Unflavoured Vegetable Cap',
            'dietary_tags': 'Certified Organic, TGA Listed, 5% Withanolides Standardized, Vegan',
            'goal': 'Cortisol Management & Stress Relief, Mood Elevation, Endurance & Vitality',
            'ingredients': 'Each capsule contains: Withania somnifera (Ashwagandha KSM-66®) extract dry conc. equiv. dry root 3,750mg (standardized to withanolides 30mg).',
            'directions_for_use': 'Take 1 capsule twice daily with food or as advised by your healthcare practitioner.',
            'warnings': 'Not recommended for use during pregnancy or lactation. Keep out of reach of children.',
            'is_featured': True,
            'is_best_seller': False,
            'rating_avg': 4.88,
            'review_count': 52
        }
    )
    ProductImage.objects.get_or_create(
        product=p4,
        image_url='https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=80',
        defaults={'is_primary': True, 'alt_text': 'Byron Bay Organics Ashwagandha'}
    )
    NutritionFact.objects.get_or_create(
        product=p4,
        defaults={
            'serving_size_info': '1 Capsule',
            'energy_kj': '5 kJ',
            'protein_g': '0.0 g',
            'fat_total_g': '0.0 g',
            'fat_saturated_g': '0.0 g',
            'carbs_total_g': '0.0 g',
            'carbs_sugars_g': '0.0 g',
            'sodium_mg': '0 mg',
            'custom_nutrients': {'KSM-66 Ashwagandha Extract': '600mg', 'Standardized Withanolides': '30mg'}
        }
    )

    p5, _ = Product.objects.get_or_create(
        sku='TP-PRE-APPLE',
        defaults={
            'name': 'Tasman Performance Apex Pre-Workout (Australian Crisp Apple)',
            'slug': 'tasman-performance-apex-clinical-pre-workout-apple',
            'brand': brand_tasman,
            'category': cat_sports,
            'artg_number': None,
            'barcode': '9312345678905',
            'short_description': 'Fully disclosed clinical pre-workout. 8,000mg L-Citrulline Malate, 3,200mg Beta-Alanine, 300mg Natural Caffeine & Alpha-GPC.',
            'description': 'Engineered without proprietary blends or underdosed fairy-dusting. Delivers relentless nitric oxide blood flow pumps, razor-sharp focus and buffered muscle endurance for intense training sessions.',
            'retail_price': 69.95,
            'compare_at_price': 79.95,
            'wholesale_price': 42.00,
            'stock_quantity': 310,
            'weight_grams': 450,
            'size_label': '450g (30 Scoops)',
            'serving_size': '15g (1 Full Scoop)',
            'servings_per_container': 30,
            'form': Product.FormChoices.POWDER,
            'flavour': 'Australian Crisp Green Apple',
            'dietary_tags': 'Zero Artificial Colours, Vegan, 100% Disclosed Formula',
            'goal': 'Nitric Oxide Muscle Pumps, Laser Focus & Clean Energy, High-Intensity Endurance',
            'ingredients': 'L-Citrulline Malate (2:1), Beta-Alanine, L-Tyrosine, Alpha-GPC (50%), Anhydrous Natural Caffeine (Coffea Arabica), Pink Himalayan Rock Salt, AstraGin®, Natural Flavours, Malic Acid, Stevia.',
            'directions_for_use': 'Mix 1 scoop with 300ml cold water 20-30 minutes prior to training. Assess tolerance with 1/2 scoop first.',
            'warnings': 'Contains high caffeine (300mg/serve). Do not consume within 5 hours of sleep or combine with other stimulants.',
            'is_featured': True,
            'is_best_seller': True,
            'rating_avg': 4.92,
            'review_count': 114
        }
    )
    ProductImage.objects.get_or_create(
        product=p5,
        image_url='https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
        defaults={'is_primary': True, 'alt_text': 'Tasman Apex Pre-Workout Apple'}
    )
    NutritionFact.objects.get_or_create(
        product=p5,
        defaults={
            'serving_size_info': '15g (1 Scoop)',
            'energy_kj': '45 kJ',
            'protein_g': '0.0 g',
            'fat_total_g': '0.0 g',
            'fat_saturated_g': '0.0 g',
            'carbs_total_g': '1.0 g',
            'carbs_sugars_g': '0.0 g',
            'sodium_mg': '120 mg',
            'custom_nutrients': {'L-Citrulline Malate (2:1)': '8,000mg', 'Beta-Alanine': '3,200mg', 'L-Tyrosine': '1,500mg', 'Alpha-GPC': '300mg', 'Natural Caffeine': '300mg'}
        }
    )
    WholesalePrice.objects.get_or_create(product=p5, min_quantity=1, defaults={'unit_price': 42.00})
    WholesalePrice.objects.get_or_create(product=p5, min_quantity=10, defaults={'unit_price': 36.50})
    WholesalePrice.objects.get_or_create(product=p5, min_quantity=50, defaults={'unit_price': 32.00})

    p6, _ = Product.objects.get_or_create(
        sku='APN-COLL-300G',
        defaults={
            'name': 'Aussie Pure Hydrolyzed Wild Deep-Sea Marine Collagen Peptides',
            'slug': 'aussie-pure-hydrolyzed-marine-collagen-300g',
            'brand': brand_aussie,
            'category': cat_wellness,
            'artg_number': 'AUST L 388190',
            'barcode': '9312345678906',
            'short_description': 'Type I & III pure bioactive marine collagen peptides (10,000mg). Supports skin elasticity, hair thickness and joint cartilage repair.',
            'description': 'Sustainably wild-caught deep-sea fish collagen peptides with exceptionally low molecular weight (2,000 Daltons) for optimal gut absorption and skin fibroblasts synthesis. Completely unflavoured and 100% soluble in hot coffee or cold smoothies.',
            'retail_price': 54.95,
            'compare_at_price': 64.95,
            'wholesale_price': 33.00,
            'stock_quantity': 210,
            'weight_grams': 300,
            'size_label': '300g (30 Serves)',
            'serving_size': '10g (1 Scoop)',
            'servings_per_container': 30,
            'form': Product.FormChoices.POWDER,
            'flavour': 'Pure Neutral / Unflavoured',
            'dietary_tags': 'Wild Caught, 100% Pure Type 1 Peptides, Dairy Free, Keto Friendly',
            'goal': 'Skin Hydration & Glow, Joint Cartilage Recovery, Healthy Hair & Nails',
            'ingredients': '100% Hydrolyzed Marine Collagen Peptides (Fish), Vitamin C (Ascorbic Acid 50mg for enhanced collagen synthesis).',
            'directions_for_use': 'Add 1 scoop (10g) to your daily coffee, tea, smoothie or water. Dissolves instantly without altering taste.',
            'warnings': 'Contains Fish. Not suitable for individuals with seafood allergies.',
            'is_featured': True,
            'is_best_seller': False,
            'rating_avg': 4.96,
            'review_count': 64
        }
    )
    ProductImage.objects.get_or_create(
        product=p6,
        image_url='https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
        defaults={'is_primary': True, 'alt_text': 'Aussie Pure Marine Collagen'}
    )
    NutritionFact.objects.get_or_create(
        product=p6,
        defaults={
            'serving_size_info': '10g (1 Scoop)',
            'energy_kj': '155 kJ (37 Cal)',
            'protein_g': '9.2 g',
            'fat_total_g': '0.0 g',
            'fat_saturated_g': '0.0 g',
            'carbs_total_g': '0.0 g',
            'carbs_sugars_g': '0.0 g',
            'sodium_mg': '18 mg',
            'custom_nutrients': {'Type 1 Bioactive Peptides': '9,950mg', 'Vitamin C': '50mg'}
        }
    )

    # 6. Sample Orders (To establish genuine verified purchase relationship!)
    o1, _ = Order.objects.get_or_create(
        order_number='AUS-2026-8812',
        defaults={
            'user': retail_user,
            'order_type': Order.OrderType.RETAIL,
            'status': Order.OrderStatus.DELIVERED,
            'subtotal': 134.90,
            'discount_amount': 0.00,
            'shipping_fee': 0.00,
            'tax_gst': 12.26,
            'total_amount': 134.90,
            'customer_email': 'sarah.miller@sydneyfitness.com.au',
            'customer_phone': '0412 345 678',
            'shipping_first_name': 'Sarah',
            'shipping_last_name': 'Miller',
            'street_address': '42 Pitt Street',
            'apartment': 'Level 4',
            'city': 'Sydney',
            'state': 'NSW',
            'postcode': '2000',
            'shipping_method': Order.ShippingMethod.STANDARD,
            'tracking_number': 'AP-SYD-998241',
            'carrier': 'Australia Post eParcel Express',
            'payment_status': Order.PaymentStatus.PAID,
            'payment_method': 'Apple Pay (Stripe)'
        }
    )
    OrderItem.objects.get_or_create(
        order=o1,
        product=p1,
        defaults={
            'product_name': p1.name,
            'sku': p1.sku,
            'quantity': 1,
            'unit_price': p1.retail_price,
            'total_price': p1.retail_price
        }
    )
    OrderItem.objects.get_or_create(
        order=o1,
        product=p2,
        defaults={
            'product_name': p2.name,
            'sku': p2.sku,
            'quantity': 1,
            'unit_price': p2.retail_price,
            'total_price': p2.retail_price
        }
    )

    # 7. Authentic Customer Reviews
    r1, _ = Review.objects.get_or_create(
        user=retail_user,
        product=p1,
        defaults={
            'rating': 5,
            'title': 'Best tasting WPI in Australia by a mile — zero bloating!',
            'content': 'I have tried almost every Australian whey brand over 6 years of CrossFit training. Aussie Pure WPI mixes completely effortlessly in cold water without foam, and the chocolate flavour tastes like real cacao rather than artificial chemical sweetener. Fast 2-day delivery to Sydney CBD too.',
            'is_verified_purchase': True,
            'is_featured': True,
            'status': Review.ReviewStatus.APPROVED,
            'helpful_count': 38,
            'not_helpful_count': 1
        }
    )
    ReviewImage.objects.get_or_create(
        review=r1,
        image_url='https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=400&q=80',
        defaults={'alt_text': 'Customer photo of WPI tub in gym'}
    )
    ReviewResponse.objects.get_or_create(
        review=r1,
        defaults={
            'admin': admin_user,
            'content': 'Thanks so much for the detailed review Sarah! We source our pasture milk directly from local Victorian farms so freshness and digestibility are top priorities. Keep crushing your CrossFit training!'
        }
    )

    # Additional reviews
    Review.objects.get_or_create(
        user=wholesale_user,
        product=p2,
        defaults={
            'rating': 5,
            'title': 'Legit Creapure® quality for our gym members',
            'content': 'We stock this at our gym front desk in Melbourne. The 200-mesh micronization makes a huge difference; dissolves seamlessly in water without leaving that grainy residue at the bottom. Outstanding purity certification.',
            'is_verified_purchase': True,
            'is_featured': True,
            'status': Review.ReviewStatus.APPROVED,
            'helpful_count': 24,
            'not_helpful_count': 0
        }
    )

    # 8. Coupons
    Coupon.objects.get_or_create(
        code='WELCOME10',
        defaults={
            'discount_type': Coupon.DiscountType.PERCENTAGE,
            'discount_value': 10.00,
            'min_spend': 50.00,
            'is_active': True
        }
    )
    Coupon.objects.get_or_create(
        code='AUSSIE20',
        defaults={
            'discount_type': Coupon.DiscountType.FIXED,
            'discount_value': 20.00,
            'min_spend': 120.00,
            'is_active': True
        }
    )

    # 9. Wholesale Applications
    WholesaleApplication.objects.get_or_create(
        abn='51824753556',
        defaults={
            'user': wholesale_user,
            'business_name': 'GymPower Performance HQ',
            'contact_name': 'Mark Taylor',
            'email': 'wholesale@gympower.com.au',
            'phone': '0423 456 789',
            'business_type': WholesaleApplication.BusinessType.GYM,
            'website': 'https://gympower.com.au',
            'estimated_monthly_spend': '$3,000 - $6,000',
            'interested_categories': 'WPI, Creapure Creatine, Clinical Pre-Workouts',
            'status': WholesaleApplication.Status.APPROVED,
            'assigned_tier': tier_silver,
            'message': 'We operate two 24/7 fitness facilities with over 1,400 active members in South Yarra and Richmond.'
        }
    )

    # 10. Blog
    bcat_guides, _ = BlogCategory.objects.get_or_create(
        slug='supplement-guides',
        defaults={'name': 'Supplement Guides', 'description': 'Evidence-based deep dives into ingredients and performance protocols.'}
    )
    bcat_nutrition, _ = BlogCategory.objects.get_or_create(
        slug='clinical-nutrition',
        defaults={'name': 'Clinical Nutrition', 'description': 'Nutritional science for recovery, body composition and hormone health.'}
    )

    BlogPost.objects.get_or_create(
        slug='definitive-australian-protein-guide-wpi-vs-wpc',
        defaults={
            'title': 'The Definitive Australian Protein Guide: WPI vs WPC vs Plant Protein',
            'category': bcat_guides,
            'author_name': 'Dr. Lachlan Hayes (BSc, MND, APD)',
            'author_role': 'Head of Sports Nutrition & Research',
            'excerpt': 'Understanding the biological value, leucine threshold and filtration techniques behind premium Australian grass-fed proteins.',
            'cover_image_url': 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=1000&q=80',
            'read_time_minutes': 6,
            'tags': 'Protein, Grass-Fed WPI, Leucine, Recovery Science',
            'is_published': True,
            'is_featured': True,
            'content': """
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
            """
        }
    )

    BlogPost.objects.get_or_create(
        slug='creatine-monohydrate-science-dosage-myths',
        defaults={
            'title': 'Creatine Monohydrate: 5 Outdated Myths Debunked by Sports Science',
            'category': bcat_guides,
            'author_name': 'Dr. Lachlan Hayes (BSc, MND, APD)',
            'author_role': 'Head of Sports Nutrition & Research',
            'excerpt': 'Why loading phases are optional, how Creapure® eliminates bloating, and creatine’s emerging role in cognitive longevity.',
            'cover_image_url': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
            'read_time_minutes': 5,
            'tags': 'Creatine, Creapure, Strength, Cognitive Health',
            'is_published': True,
            'is_featured': False,
            'content': """
# Creatine Monohydrate: 5 Outdated Myths Debunked

Creatine is the most extensively researched ergonomic aid in sports nutrition history, with over 500 peer-reviewed clinical trials demonstrating its safety and efficacy.

### Myth 1: You must undergo a 20g/day loading phase
**The Science**: While taking 20g daily for 5 days saturates intramuscular phosphocreatine stores faster, taking a consistent 5g/day dose achieves identical muscle saturation within 21–28 days without any gastric distress.

### Myth 2: Creatine causes subcutaneous water retention
**The Science**: Creatine increases *intracellular* water volume inside the muscle cells (myocytes), promoting cellular hydration and protein synthesis. It does not cause puffy subcutaneous water retention when using high-purity micronized Creapure®.
            """
        }
    )

    print("[SUCCESS] Seeding completed successfully!")

if __name__ == '__main__':
    seed()
