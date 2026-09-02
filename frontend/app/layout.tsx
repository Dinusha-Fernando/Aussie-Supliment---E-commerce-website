import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { QuickViewModal } from "@/components/products/QuickViewModal";
import { SupplementFinderModal } from "@/components/modals/SupplementFinderModal";
import { CompareDrawer } from "@/components/modals/CompareDrawer";
import { Toast } from "@/components/ui/Toast";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Australian Supplements | Premium Grass-Fed Protein, Creapure® & Wellness",
  description: "Australia's leading evidence-based sports nutrition & wellness ecommerce platform. 100% grass-fed Victorian dairy, TGA listed formulations, and commercial B2B wholesale pricing.",
  keywords: [
    "Australian Supplements",
    "Whey Protein Isolate Australia",
    "Grass-Fed WPI",
    "Creapure Creatine Australia",
    "Magnesium Glycinate TGA",
    "Wholesale Supplements Australia",
    "B2B Gym Supplements"
  ],
  authors: [{ name: "Aussie Supplements Pty Ltd" }],
  openGraph: {
    title: "Australian Supplements — Pure Nutrition & Science Backed",
    description: "Premium Australian grass-fed WPI, Creapure creatine, and TGA-listed wellness supplements for retail and wholesale.",
    url: "https://aussiesupplements.com.au",
    siteName: "Aussie Supplements",
    locale: "en_AU",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/assets/logo-icon.png",
    shortcut: "/assets/logo-icon.png",
    apple: "/assets/logo-icon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global JSON-LD Schema for Organization
  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aussie Supplements",
    "url": "https://aussiesupplements.com.au",
    "logo": "https://aussiesupplements.com.au/assets/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+61-1300-000-287",
      "contactType": "Customer Service & Wholesale",
      "areaServed": "AU",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "42 Pitt Street",
      "addressLocality": "Sydney",
      "addressRegion": "NSW",
      "postalCode": "2000",
      "addressCountry": "AU"
    }
  };

  return (
    <html lang="en-AU" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      <body className="font-sans antialiased bg-offwhite text-charcoal-900 min-h-screen flex flex-col selection:bg-gold-500/30 selection:text-eucalyptus-950">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* Global Drawers, Modals, WhatsApp & Toast */}
          <CartDrawer />
          <QuickViewModal />
          <SupplementFinderModal />
          <CompareDrawer />
          <Toast />
          <WhatsAppWidget />
        </Providers>
      </body>
    </html>
  );
}
