import { MetadataRoute } from 'next';
import { FALLBACK_CATEGORIES, FALLBACK_BRANDS, FALLBACK_PRODUCTS, FALLBACK_BLOG_POSTS } from '@/lib/api';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aussiesupplements.com.au';

  const staticPages = [
    '',
    '/shop',
    '/brands',
    '/wholesale',
    '/wholesale/apply',
    '/blog',
    '/about',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const productPages = FALLBACK_PRODUCTS.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  const categoryPages = FALLBACK_CATEGORIES.map((c) => ({
    url: `${baseUrl}/category/${c.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const brandPages = FALLBACK_BRANDS.map((b) => ({
    url: `${baseUrl}/brands/${b.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const blogPages = FALLBACK_BLOG_POSTS.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...categoryPages, ...brandPages, ...blogPages];
}
