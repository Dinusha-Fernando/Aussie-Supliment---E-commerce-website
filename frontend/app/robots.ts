import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin-portal', '/account', '/checkout'],
    },
    sitemap: 'https://aussiesupplements.com.au/sitemap.xml',
  };
}
