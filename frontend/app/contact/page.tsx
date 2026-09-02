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
          {/* WhatsApp Fast-Track Priority Card */}
          <div className="bg-gradient-to-br from-emerald-950 via-eucalyptus-950 to-emerald-900 text-white p-7 rounded-3xl border border-emerald-500/30 shadow-xl space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block">
                    Instant Response Support
                  </span>
                  <h3 className="text-base font-black text-white">WhatsApp Live Desk</h3>
                </div>
              </div>

              <span className="flex items-center gap-1 text-[11px] bg-emerald-500/20 text-emerald-200 px-2.5 py-1 rounded-full border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                Online Now
              </span>
            </div>

            <p className="text-xs text-emerald-100/90 leading-relaxed">
              Fast-track your supplement queries, dosage questions, or bulk wholesale requests directly via WhatsApp. Average reply under 5 minutes.
            </p>

            <div className="pt-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-emerald-300/80 block uppercase font-bold">Direct Line</span>
                <span className="text-sm font-extrabold text-white">077 569 6254</span>
                <span className="text-[10px] text-emerald-300 block">(+94 77 569 6254)</span>
              </div>

              <a
                href="https://wa.me/94775696254?text=Hi%20Aussie%20Supplements,%20I'd%20like%20to%20inquire%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa4f] text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-lg shadow-emerald-900/40 transition active:scale-95 shrink-0"
              >
                <span>Start WhatsApp Chat</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

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
                  <a href="mailto:wpjinadhi@gmail.com" className="text-charcoal-600 hover:text-eucalyptus-800 transition">wpjinadhi@gmail.com</a>
                  <span className="text-charcoal-400 block text-[10px]">Mon-Fri 8:30am - 5:30pm AEST</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-eucalyptus-50 text-eucalyptus-900 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-eucalyptus-800" />
                </div>
                <div>
                  <strong className="text-charcoal-900 block font-bold text-sm">Fulfillment & Distribution Hub</strong>
                  <span className="text-charcoal-600">Colombo Central Distribution Hub, Colombo, Sri Lanka</span>
                  <span className="text-charcoal-400 block text-[10px]">Island-Wide Express Delivery across Sri Lanka</span>
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
                We have received your message and our customer desk will contact you within 4 business hours.
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
                    placeholder="Your Name"
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
                    placeholder="your.email@example.com"
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
                  <option value="Order Tracking">Order Dispatch & Island-Wide Delivery Tracking</option>
                  <option value="Wholesale B2B">Wholesale B2B Account & Gym Partner Rates</option>
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
