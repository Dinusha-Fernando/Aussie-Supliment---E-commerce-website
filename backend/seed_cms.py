import os
import django
from decimal import Decimal

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.cms.models import SiteConfig, HeroSlide, DiagnosticQuizQuestion, TrustPillar

def seed_cms():
    print("Seeding CMS configuration...")
    
    # 1. Site Configuration
    config, created = SiteConfig.objects.get_or_create(id=1)
    config.site_name = "Aussie Supplements"
    config.tagline = "Pure Australian Nutrition • Clinical Performance"
    config.announcement_text = "🇦🇺 FREE EXPRESS SHIPPING ACROSS AUSTRALIA ON ORDERS OVER $100 • 100% VICTORIAN DAIRY"
    config.announcement_enabled = True
    config.announcement_link = "/shop"
    config.free_shipping_threshold = Decimal('100.00')
    config.default_currency = "LKR"
    config.lkr_multiplier = Decimal('200.00')
    config.usd_multiplier = Decimal('0.6500')
    config.aud_multiplier = Decimal('1.00')
    config.contact_email = "support@aussiesupplements.com.au"
    config.contact_phone = "1300 892 877"
    config.warehouse_location = "Melbourne Distribution Hub, Victoria, Australia"
    config.is_store_open = True
    config.save()
    print("[OK] SiteConfig initialized.")

    # 2. Hero Slides
    HeroSlide.objects.all().delete()

    slide1 = HeroSlide.objects.create(
        title='Aussie Pure 100% Grass-Fed WPI',
        tagline='Single-Origin Victorian Pasture Isolate',
        hero_title='BIO-ACTIVE WHEY ISOLATE',
        subline='Cold micro-filtered from free-roaming Gippsland dairy cows. 27.4g pure bioactive protein with zero artificial sweeteners, gums, or fillers.',
        size_servings='2kg Tub • 66 Servings',
        retail_price=Decimal('89.95'),
        wholesale_price=Decimal('58.50'),
        image_url='/assets/hero-tub.jpg',
        halo_gradient='from-emerald-500/30 via-gold-500/25 to-amber-500/20',
        glow_shadow='shadow-[0_0_80px_rgba(229,169,60,0.35)]',
        tab_label='1. Grass-Fed WPI 2kg',
        slug='aussie-pure-grass-fed-whey-protein-isolate-2kg',
        badge_top_value='27.4g',
        badge_top_label='Pure Protein',
        badge_top_sub='Per Single Serve',
        badge_bottom_title='Victorian Dairy',
        badge_bottom_subtitle='100% Pasture Fed',
        badge_rating_score='4.98',
        badge_rating_count='1,240+ Verified Reviews',
        hotspots=[
            {"x": "22%", "y": "24%", "title": "27.4g Victorian WPI", "detail": "Cold micro-filtered isolate from Gippsland pasture cows."},
            {"x": "80%", "y": "36%", "title": "TGA & ARTG Listed", "detail": "Independently batch tested by TGA analytical laboratories."},
            {"x": "24%", "y": "74%", "title": "DigeZyme® Enzymes", "detail": "Digestive enzyme cofactor for zero digestive bloat."}
        ],
        order=0,
        is_active=True
    )

    slide2 = HeroSlide.objects.create(
        title='Tasman Creapure® Micronized Creatine',
        tagline='Certified German High-Purity Monohydrate',
        hero_title='ULTRA-PURE CREAPURE®',
        subline='99.99% certified Creapure® synthesized in Bavaria. Unrivalled explosive ATP muscular power and cellular hydration.',
        size_servings='500g Pouch • 100 Serves',
        retail_price=Decimal('44.95'),
        wholesale_price=Decimal('29.20'),
        image_url='/assets/hero-creatine.jpg',
        halo_gradient='from-cyan-500/35 via-blue-500/25 to-teal-500/20',
        glow_shadow='shadow-[0_0_80px_rgba(56,189,248,0.35)]',
        tab_label='2. Creapure® Creatine',
        slug='tasman-performance-creapure-creatine-500g',
        badge_top_value='99.99%',
        badge_top_label='Purity Assay',
        badge_top_sub='Zero DCD / DHT',
        badge_bottom_title='ATP Power Engine',
        badge_bottom_subtitle='Peak Cellular Hydration',
        badge_rating_score='4.95',
        badge_rating_count='860+ Verified Reviews',
        hotspots=[
            {"x": "22%", "y": "24%", "title": "99.99% Creapure®", "detail": "Manufactured under Bavarian pharmaceutical standards."},
            {"x": "80%", "y": "36%", "title": "Cellular ATP Power", "detail": "Rapidly replenishes muscular phosphocreatine reserves."},
            {"x": "24%", "y": "74%", "title": "Instant 200 Mesh", "detail": "Ultra-micronized texture dissolves completely in cold water."}
        ],
        order=1,
        is_active=True
    )

    slide3 = HeroSlide.objects.create(
        title='Pacific Wild Marine Collagen Peptides',
        tagline='Deep-Sea Hydrolyzed Type I & III',
        hero_title='WILD MARINE COLLAGEN',
        subline='Wild deep-sea peptides fortified with native Australian Kakadu plum Vitamin C for rapid cartilage and connective tissue repair.',
        size_servings='400g Jar • 40 Serves',
        retail_price=Decimal('54.95'),
        wholesale_price=Decimal('35.70'),
        image_url='/assets/hero-collagen.jpg',
        halo_gradient='from-rose-500/30 via-amber-500/25 to-teal-500/20',
        glow_shadow='shadow-[0_0_80px_rgba(244,114,182,0.35)]',
        tab_label='3. Marine Collagen',
        slug='pacific-marine-collagen-peptides-400g',
        badge_top_value='10,000mg',
        badge_top_label='Hydrolyzed Peptides',
        badge_top_sub='Fortified Vitamin C',
        badge_bottom_title='Deep-Sea Origin',
        badge_bottom_subtitle='Joint & Skin Elasticity',
        badge_rating_score='4.96',
        badge_rating_count='410+ Verified Reviews',
        hotspots=[
            {"x": "22%", "y": "24%", "title": "10,000mg Peptides", "detail": "Low-molecular weight Type I & III peptides for maximum absorption."},
            {"x": "80%", "y": "36%", "title": "Heavy Metal Free", "detail": "Tested negative for mercury, lead, and ocean micro-plastics."},
            {"x": "24%", "y": "74%", "title": "Vitamin C Cofactor", "detail": "Activates enzymatic collagen cross-linking inside human tissues."}
        ],
        order=2,
        is_active=True
    )
    print("[OK] Hero Slides initialized.")

    # 3. Trust Pillars
    TrustPillar.objects.all().delete()
    TrustPillar.objects.create(title="100% Australian Sourced", subtitle="Blended in Victoria", icon_type="Flag", order=1)
    TrustPillar.objects.create(title="TGA & ARTG Listed", subtitle="Therapeutic Lab Assayed", icon_type="ShieldCheck", order=2)
    TrustPillar.objects.create(title="Same-Day Dispatch", subtitle="Australia Post Express", icon_type="Truck", order=3)
    TrustPillar.objects.create(title="100% Clean Label", subtitle="Zero Artificial Sweeteners", icon_type="Leaf", order=4)
    print("[OK] Trust Pillars initialized.")

    # 4. Diagnostic Quiz Questions
    DiagnosticQuizQuestion.objects.all().delete()
    DiagnosticQuizQuestion.objects.create(
        step_number=1,
        question_text="What is your primary athletic or wellness objective?",
        subtitle="Select the core focus of your current training cycle",
        options=[
            {"id": "muscle", "title": "Lean Muscle & Strength", "desc": "Maximize lean mass & muscular power", "icon": "Flame", "category_slug": "protein"},
            {"id": "endurance", "title": "Endurance & Speed", "desc": "Sustain peak output & hydration", "icon": "Zap", "category_slug": "sports-nutrition"},
            {"id": "recovery", "title": "Joint & Tissue Recovery", "desc": "Accelerate systemic healing", "icon": "Heart", "category_slug": "wellness-longevity"},
            {"id": "immunity", "title": "Daily Health & Vitality", "desc": "Optimize immune resilience", "icon": "ShieldCheck", "category_slug": "vitamins-minerals"}
        ],
        order=1,
        is_active=True
    )
    DiagnosticQuizQuestion.objects.create(
        step_number=2,
        question_text="What is your dietary preference & digestive sensitivity?",
        subtitle="We will filter out any non-compliant allergens",
        options=[
            {"id": "grassfed", "title": "100% Grass-Fed Dairy", "desc": "Victorian pasture-fed isolate", "icon": "Leaf", "category_slug": "protein"},
            {"id": "plant", "title": "100% Plant-Based & Vegan", "desc": "Organic fermented botanicals", "icon": "Leaf", "category_slug": "protein"},
            {"id": "lactose_free", "title": "Zero Lactose / DigeZyme®", "desc": "Ultra-filtered for zero bloat", "icon": "Activity", "category_slug": "protein"},
            {"id": "any", "title": "No Restrictions", "desc": "All clinical formulations", "icon": "CheckCircle2", "category_slug": "all"}
        ],
        order=2,
        is_active=True
    )
    DiagnosticQuizQuestion.objects.create(
        step_number=3,
        question_text="How many days per week do you train or exercise?",
        subtitle="Helps calculate your optimal volume & serving frequency",
        options=[
            {"id": "daily", "title": "5 to 7 Days / Week", "desc": "Elite athletic / daily training load", "icon": "Zap", "category_slug": "sports-nutrition"},
            {"id": "moderate", "title": "3 to 4 Days / Week", "desc": "Consistent high-intensity routine", "icon": "Activity", "category_slug": "protein"},
            {"id": "light", "title": "1 to 2 Days / Week", "desc": "General fitness & wellness maintenance", "icon": "Heart", "category_slug": "vitamins-minerals"}
        ],
        order=3,
        is_active=True
    )
    print("[OK] Diagnostic Quiz Questions initialized.")
    print("CMS seeding complete!")

if __name__ == '__main__':
    seed_cms()
