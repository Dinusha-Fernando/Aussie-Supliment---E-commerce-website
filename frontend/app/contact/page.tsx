'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/storeContext';
import { Mail, Phone, MapPin, Building2, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const { showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [msg, setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Message received! Our Australian support desk will reply shortly.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 pb-24">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-eucalyptus-800 bg-eucalyptus-50 px-3 py-1 rounded-full border border-eucalyptus-200">
          Customer & Wholesale Support
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-charcoal-950">
          Get in Touch
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600">
          Our Australian clinical dietitians and B2B wholesale team are available Monday to Friday.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact info left */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-sand shadow-sm space-y-6">
            <h3 className="font-extrabold text-base text-charcoal-950">Direct Contacts</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-eucalyptus-50 text-eucalyptus-900 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-eucalyptus-800" />
                </div>
                <div>
                  <strong className="text-charcoal-900 block font-bold text-sm">Customer Hotline</strong>
                  <span className="text-charcoal-600">1300 000 AUS (1300 000 287)</span>
                  <span className="text-charcoal-400 block text-[10px]">Mon-Fri 8:30am - 5:30pm AEST</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-eucalyptus-50 text-eucalyptus-900 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-eucalyptus-800" />
                </div>
                <div>
                  <strong className="text-charcoal-900 block font-bold text-sm">Email Support</strong>
                  <span className="text-charcoal-600">support@aussiesupplements.com.au</span>
                  <span className="text-charcoal-400 block text-[10px]">wholesale@aussiesupplements.com.au</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-eucalyptus-50 text-eucalyptus-900 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-eucalyptus-800" />
                </div>
                <div>
                  <strong className="text-charcoal-900 block font-bold text-sm">Headquarters & Fulfillment</strong>
                  <span className="text-charcoal-600">42 Pitt Street, Sydney NSW 2000</span>
                  <span className="text-charcoal-400 block text-[10px]">Melbourne Logistics Center: Tullamarine VIC 3043</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form right */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-sand shadow-lg">
          {submitted ? (
            <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-success mx-auto" />
              <h3 className="text-lg font-black text-charcoal-950">Thank you for reaching out</h3>
              <p className="text-xs text-charcoal-600">
                We have received your message and an Australian team member will contact you within 4 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="font-extrabold text-base text-charcoal-950 mb-2">Send us a message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-charcoal-700">Your Full Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="e.g. Sarah Miller"
                    className="w-full px-4 py-2.5 bg-offwhite border border-sand rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-eucalyptus-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-charcoal-700">Your Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="sarah@example.com.au"
                    className="w-full px-4 py-2.5 bg-offwhite border border-sand rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-eucalyptus-800"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-charcoal-700">Subject / Inquiry Type</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2.5 bg-offwhite border border-sand rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-eucalyptus-800"
                >
                  <option value="Product Inquiry">Product Formulation & Ingredients Inquiry</option>
                  <option value="Order Tracking">Order Dispatch & Australia Post Tracking</option>
                  <option value="Wholesale B2B">Wholesale B2B Account & Commercial Rates</option>
                  <option value="Other">General Feedback</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-charcoal-700">Your Message *</label>
                <textarea
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  rows={4}
                  required
                  placeholder="How can our Australian team help you?"
                  className="w-full px-4 py-2.5 bg-offwhite border border-sand rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-eucalyptus-800"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-eucalyptus-900 hover:bg-eucalyptus-800 text-white font-extrabold py-3.5 rounded-xl shadow-md transition text-xs flex items-center justify-center gap-2"
              >
                <span>SEND MESSAGE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
