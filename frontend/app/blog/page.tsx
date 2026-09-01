import React from 'react';
import Link from 'next/link';
import { FALLBACK_BLOG_POSTS } from '@/lib/api';
import { BookOpen, Clock, ArrowRight, ChevronRight, User } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Supplement Science & Nutrition Guides | Aussie Supplements',
  description: 'Evidence-based deep dives into Australian grass-fed proteins, Creapure creatine dosage, and recovery protocols by Dr. Lachlan Hayes.',
};

export default function BlogListingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 pb-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-gold-50 text-gold-800 border border-gold-300 px-3.5 py-1 rounded-full text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" /> Clinical Nutrition & Sports Science Journal
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-charcoal-950">
          Supplement Science Guides
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600">
          Peer-reviewed articles, ingredient breakdowns, and clinical dosing guidelines authored by Australian sports dietitians.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {FALLBACK_BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            className="group bg-white rounded-3xl border border-sand shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
          >
            <div className="aspect-16/9 w-full bg-offwhite overflow-hidden relative">
              <img
                src={post.cover_image_url}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-eucalyptus-950 text-gold-400 text-[10px] font-black uppercase px-3 py-1 rounded-md shadow-md">
                {post.category_name}
              </span>
            </div>

            <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-charcoal-400 font-medium">
                  <span>{post.author_name}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {post.read_time_minutes} min read
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`} className="block group-hover:text-eucalyptus-800 transition">
                  <h2 className="text-xl font-extrabold text-charcoal-950 leading-snug">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-sand flex items-center justify-between">
                <span className="text-xs text-charcoal-400 font-medium">{post.tags}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-eucalyptus-900 group-hover:text-gold-600 flex items-center gap-1 transition"
                >
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
