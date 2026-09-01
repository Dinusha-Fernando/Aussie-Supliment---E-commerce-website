import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FALLBACK_BLOG_POSTS, FALLBACK_PRODUCTS } from '@/lib/api';
import { ProductCard } from '@/components/products/ProductCard';
import { Clock, User, ChevronRight, Share2, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = FALLBACK_BLOG_POSTS.find((b) => b.slug === slug);
  if (!post) return { title: 'Article Not Found | Aussie Supplements' };

  return {
    title: `${post.title} | Australian Sports Science`,
    description: post.excerpt,
  };
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = FALLBACK_BLOG_POSTS.find((b) => b.slug === slug);

  if (!post) {
    notFound();
  }

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [post.cover_image_url],
    "datePublished": post.created_at,
    "author": [{
      "@type": "Person",
      "name": post.author_name,
      "jobTitle": post.author_role
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Aussie Supplements",
      "logo": {
        "@type": "ImageObject",
        "url": "https://aussiesupplements.com.au/logo.png"
      }
    },
    "description": post.excerpt
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />

      {/* Breadcrumb */}
      <div className="bg-sand/40 border-b border-sand py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-charcoal-500 font-semibold overflow-x-auto">
          <Link href="/" className="hover:text-eucalyptus-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-eucalyptus-900">Science Journal</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-charcoal-900 font-bold truncate max-w-xs">{post.title}</span>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-4 text-center sm:text-left">
          <span className="inline-block bg-eucalyptus-950 text-gold-400 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-md">
            {post.category_name}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-charcoal-950 leading-tight">
            {post.title}
          </h1>

          {/* Author Badge */}
          <div className="flex items-center gap-3 pt-2 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-eucalyptus-900 text-gold-400 font-black flex items-center justify-center text-base">
              LH
            </div>
            <div>
              <p className="font-extrabold text-sm text-charcoal-900">{post.author_name}</p>
              <p className="text-xs text-charcoal-500">{post.author_role} • {post.read_time_minutes} min read</p>
            </div>
          </div>
        </div>

        {/* Featured Cover Image */}
        <div className="rounded-3xl overflow-hidden shadow-xl border border-sand aspect-16/9 bg-offwhite">
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Markdown Content */}
        <div className="prose prose-lg max-w-none text-charcoal-800 space-y-6 text-sm sm:text-base leading-relaxed bg-white p-8 sm:p-12 rounded-3xl border border-sand shadow-sm">
          <p className="text-base sm:text-lg font-semibold text-charcoal-900 leading-relaxed italic border-l-4 border-gold-500 pl-4">
            {post.excerpt}
          </p>

          <div className="space-y-4 whitespace-pre-line">
            {post.content}
          </div>

          <div className="pt-8 border-t border-sand flex items-center justify-between text-xs text-charcoal-500">
            <span>Tags: <strong>{post.tags}</strong></span>
            <div className="flex items-center gap-1 text-eucalyptus-800 font-bold">
              <ShieldCheck className="w-4 h-4 text-eucalyptus-800" />
              <span>Peer-Reviewed Clinical Data</span>
            </div>
          </div>
        </div>
      </article>

      {/* Featured Synergistic Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <h3 className="text-2xl font-black text-charcoal-950 mb-6">
          Formulations Mentioned in this Guide
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FALLBACK_PRODUCTS.slice(0, 3).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
