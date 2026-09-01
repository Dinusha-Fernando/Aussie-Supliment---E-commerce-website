'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useStore } from '@/lib/storeContext';
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  FileCheck,
  Building,
  Phone,
  Mail,
  User,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function WholesaleApplyPage() {
  const { showToast } = useStore();
  const [businessName, setBusinessName] = useState('');
  const [abn, setAbn] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessType, setBusinessType] = useState('GYM');
  const [website, setWebsite] = useState('');
  const [estimatedMonthlySpend, setEstimatedMonthlySpend] = useState('$1,000 - $3,000');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!abn.trim() || !businessName.trim() || !email.trim()) {
      showToast('Please fill out all required business fields');
      return;
    }

    setIsSubmitting(true);
    await api.submitWholesaleApplication({
      business_name: businessName,
      abn,
      contact_name: contactName,
      email,
      phone,
      business_type: businessType,
      website,
      estimated_monthly_spend: estimatedMonthlySpend,
      message
    });
    setIsSubmitting(false);
    setIsSubmitted(true);
    showToast('🎉 Wholesale application submitted for review!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-charcoal-500 font-semibold">
        <Link href="/" className="hover:text-eucalyptus-900">Home</Link>
        <span>/</span>
        <Link href="/wholesale" className="hover:text-eucalyptus-900">Wholesale</Link>
        <span>/</span>
        <span className="text-charcoal-900 font-bold">ABN Application</span>
      </div>

      <div className="bg-white rounded-3xl border border-sand shadow-xl p-8 sm:p-12 space-y-8">
        <div className="space-y-2 border-b border-sand pb-6">
          <div className="inline-flex items-center gap-2 bg-gold-50 text-gold-800 border border-gold-300 px-3 py-1 rounded-full text-xs font-bold">
            <Building2 className="w-3.5 h-3.5" /> Commercial Trade Verification
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-charcoal-950">
            Australian Wholesale Account Application
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600">
            Please provide your valid 11-digit Australian Business Number (ABN) to qualify for Tier 1 and Tier 2 wholesale purchasing pricing.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-success rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-charcoal-950">Application Received Successfully</h3>
            <p className="text-xs sm:text-sm text-charcoal-700 max-w-md mx-auto leading-relaxed">
              Thank you {contactName || 'Partner'}. Our B2B commercial team has registered your application for <strong>{businessName}</strong> (ABN: {abn}). We will review your account status within 24 business hours.
            </p>
            <div className="pt-2">
              <Link
                href="/wholesale/dashboard"
                className="bg-eucalyptus-900 hover:bg-eucalyptus-800 text-white font-bold px-6 py-3 rounded-xl text-xs transition inline-block shadow-md"
              >
                Preview Wholesale SKU Matrix →
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Business Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-charcoal-800 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-eucalyptus-800" />
                  Registered Business Name *
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. GymPower Performance Pty Ltd"
                  required
                  className="w-full px-4 py-2.5 bg-offwhite border border-sand rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-eucalyptus-800"
                />
              </div>

              {/* ABN */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-charcoal-800 flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-eucalyptus-800" />
                  Australian Business Number (ABN) *
                </label>
                <input
                  type="text"
                  value={abn}
                  onChange={(e) => setAbn(e.target.value)}
                  placeholder="e.g. 51 824 753 556"
                  required
                  className="w-full px-4 py-2.5 bg-offwhite border border-sand rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-eucalyptus-800"
                />
              </div>

              {/* Contact Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-charcoal-800 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-eucalyptus-800" />
                  Primary Contact Person *
                </label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Mark Taylor"
                  required
                  className="w-full px-4 py-2.5 bg-offwhite border border-sand rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-eucalyptus-800"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-charcoal-800 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-eucalyptus-800" />
                  Business Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="wholesale@yourgym.com.au"
                  required
                  className="w-full px-4 py-2.5 bg-offwhite border border-sand rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-eucalyptus-800"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-charcoal-800 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-eucalyptus-800" />
                  Australian Phone Number *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0412 345 678"
                  required
                  className="w-full px-4 py-2.5 bg-offwhite border border-sand rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-eucalyptus-800"
                />
              </div>

              {/* Business Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-charcoal-800">Business Facility Type *</label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full px-4 py-2.5 bg-offwhite border border-sand rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-eucalyptus-800 font-semibold"
                >
                  <option value="GYM">Gym / Fitness Studio / CrossFit Box</option>
                  <option value="SUPPLEMENT_STORE">Retail Supplement Store</option>
                  <option value="PHARMACY">Pharmacy / Health Chemist</option>
                  <option value="ONLINE_RETAILER">Online Retailer</option>
                  <option value="PERSONAL_TRAINER">Personal Trainer / Coach</option>
                  <option value="OTHER">Other Commercial Entity</option>
                </select>
              </div>

              {/* Website */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-extrabold text-charcoal-800 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-eucalyptus-800" />
                  Website / Social Media (Optional)
                </label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourbusiness.com.au"
                  className="w-full px-4 py-2.5 bg-offwhite border border-sand rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-eucalyptus-800"
                />
              </div>

              {/* Monthly Spend */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-extrabold text-charcoal-800">Estimated Monthly Supplement Spend</label>
                <select
                  value={estimatedMonthlySpend}
                  onChange={(e) => setEstimatedMonthlySpend(e.target.value)}
                  className="w-full px-4 py-2.5 bg-offwhite border border-sand rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-eucalyptus-800 font-semibold"
                >
                  <option value="$1,000 - $3,000">$1,000 - $3,000 AUD (Tier 1 Studio)</option>
                  <option value="$3,000 - $6,000">$3,000 - $6,000 AUD (Tier 1 Growth)</option>
                  <option value="$6,000 - $10,000">$6,000 - $10,000 AUD (Tier 2 Commercial)</option>
                  <option value="$10,000+">$10,000+ AUD (Tier 2 Enterprise / Distributor)</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-extrabold text-charcoal-800">Facility Location & Order Notes</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Provide physical street address, member count, or specific products you wish to stock..."
                  className="w-full px-4 py-2.5 bg-offwhite border border-sand rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-eucalyptus-800"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-eucalyptus-900 hover:bg-eucalyptus-800 text-white font-extrabold py-4 rounded-xl shadow-lg transition text-sm flex items-center justify-center gap-2"
            >
              <span>{isSubmitting ? 'Submitting Application...' : 'SUBMIT ABN WHOLESALE APPLICATION'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
