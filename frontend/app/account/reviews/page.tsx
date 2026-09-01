'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FALLBACK_REVIEWS } from '@/lib/api';
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  ThumbsUp,
  MessageSquare,
  ChevronRight,
  Plus
} from 'lucide-react';

export default function AccountReviewsPage() {
  const [reviews] = useState(FALLBACK_REVIEWS);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-charcoal-500 font-semibold">
        <Link href="/" className="hover:text-eucalyptus-900">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/account" className="hover:text-eucalyptus-900">My Account</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-charcoal-900 font-bold">My Verified Reviews</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-charcoal-950">
            My Reviews & Feedback
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Reviews authored from verified completed Australian orders.
          </p>
        </div>
      </div>

      {/* Reviews Feed */}
      <div className="space-y-6">
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-sand shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex text-gold-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                {rev.is_verified_purchase && (
                  <span className="text-[10px] font-extrabold text-success bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified Australian Purchase
                  </span>
                )}
              </div>
              <span className="text-xs text-charcoal-400 font-medium">Published on {rev.created_at}</span>
            </div>

            <div className="space-y-1">
              <h3 className="font-extrabold text-base text-charcoal-950">{rev.title}</h3>
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">{rev.content}</p>
            </div>

            {rev.images && rev.images.length > 0 && (
              <div className="flex gap-3 pt-1">
                {rev.images.map((img) => (
                  <img
                    key={img.id}
                    src={img.image_url}
                    alt="Customer attachment"
                    className="w-20 h-20 object-cover rounded-2xl border border-sand"
                  />
                ))}
              </div>
            )}

            {rev.response && (
              <div className="p-4 bg-eucalyptus-50 rounded-2xl border border-eucalyptus-200 text-xs text-eucalyptus-950 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-eucalyptus-900">
                  <ShieldCheck className="w-4 h-4 text-eucalyptus-700" />
                  {rev.response.admin_name}
                </span>
                <p className="text-charcoal-700 italic">&ldquo;{rev.response.content}&rdquo;</p>
              </div>
            )}

            <div className="pt-3 border-t border-sand flex items-center justify-between text-xs">
              <span className="font-bold text-eucalyptus-900">{rev.product_name}</span>
              <span className="text-charcoal-500 font-medium">{rev.helpful_count} people found your review helpful</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
