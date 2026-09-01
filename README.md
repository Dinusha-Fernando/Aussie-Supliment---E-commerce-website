# Australian Supplements — Full-Stack Ecommerce Platform

A premium, modern, SEO-first Australian supplements ecommerce platform supporting both **B2C retail** and **B2B wholesale** customers with an **Australian Natural + Premium Wellness + Modern Clinical** aesthetic.

---

## 🌟 Key Architecture & Features

### Frontend (Next.js 14+ App Router, TypeScript, Tailwind CSS, Framer Motion)
* **SEO-First Architecture**: Metadata API, dynamic `sitemap.xml`, `robots.txt`, and Google `Organization`, `Product`, `AggregateRating`, `Review`, `Article` JSON-LD schemas.
* **Australian Wellness & Eucalyptus Theme**: Deep Eucalyptus (`#123D32`), Natural Green (`#2F6B5A`), Australian Gold (`#C89B3C`), and Warm Off-White (`#F7F8F4`).
* **Verified Customer Review System**: Verified purchase badges automatically calculated from completed orders, rating breakdowns, customer photo gallery, helpful voting (`👍`), and official admin replies.
* **B2B Wholesale Portal**: Dedicated landing page, ABN application with business classification, and a **Quick-Order SKU Matrix** for high-velocity wholesale purchasing.
* **Interactive Tools**: 3-step **Supplement Finder Quiz** and side-by-side **Product Comparison Matrix**.
* **Streamlined Australian Checkout**: Australian state/postcode handling, standard & express courier options, coupon promo validation (`WELCOME10`), GST calculation, and mock payment gateway confirmation.
* **Customer & Admin Portals**: Dedicated "My Reviews" hub, Order Tracking, Wishlist, and Admin Review Moderation / Wholesale Application approval suites.

### Backend (Python Django + Django REST Framework)
* **Modular Apps**: `accounts`, `products`, `categories`, `brands`, `reviews`, `wholesale`, `cart`, `orders`, `coupons`, `blog`, `analytics`.
* **Verified Review Logic**: Automatic calculation of `is_verified_purchase` by checking completed order history.
* **Tiered Pricing Engine**: Automated volume discounts (1-9, 10-49, 50+ units) and customer price tiers.
* **REST APIs**: Full CRUD, JWT authentication, and pagination.

---

## 🚀 Getting Started Locally

### 1. Backend Setup (Django API)

```bash
cd backend
python -m pip install -r requirements.txt
python manage.py makemigrations accounts categories brands products reviews wholesale cart orders coupons blog analytics
python manage.py migrate
python seed_data.py
python manage.py runserver 127.0.0.1:8000
```

* **API Root**: `http://127.0.0.1:8000/api/`
* **Django Admin**: `http://127.0.0.1:8000/admin/` (Login: `admin@aussiesupplements.com.au` / `AdminPass2026!`)

---

### 2. Frontend Setup (Next.js)

```bash
cd frontend
npm install
npm run dev
```

* **Frontend Store**: `http://localhost:3000`

---

## 🐳 Docker Deployment

```bash
docker-compose up --build -d
```
