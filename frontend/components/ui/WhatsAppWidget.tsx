'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Sparkles,
  Clock,
  ShieldCheck,
  CheckCheck,
  Headphones,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '94775696254';
const DISPLAY_NUMBER = '077 569 6254';
const INTERNATIONAL_DISPLAY = '+94 77 569 6254';

// Authentic WhatsApp Brand SVG
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const QUICK_TOPICS = [
  {
    icon: '🥛',
    title: 'Protein & Creatine Advice',
    subtitle: 'WPI vs WPC, Creapure dosage & flavours',
    message: "Hi Aussie Supplements team! I'd like expert guidance on choosing the right Whey Protein / Creatine for my fitness goals."
  },
  {
    icon: '🚚',
    title: 'Track My Order / Delivery',
    subtitle: 'Check dispatch speed & courier status',
    message: "Hi Aussie Supplements, I'd like to check the dispatch status of my order."
  },
  {
    icon: '🏢',
    title: 'Wholesale & B2B Inquiry',
    subtitle: 'Gym, clinic & retail bulk tier pricing',
    message: "G'day! I am interested in wholesale B2B pricing and bulk supply terms for our business."
  },
  {
    icon: '💊',
    title: 'Ingredients & TGA Compliance',
    subtitle: 'Therapeutic strength & allergen details',
    message: "Hi! I have a question regarding product ingredients and certifications."
  }
];

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const widgetRef = useRef<HTMLDivElement>(null);

  // Trigger non-intrusive teaser after 6 seconds once per session
  useEffect(() => {
    const seen = sessionStorage.getItem('as_wa_teaser_seen');
    if (!seen) {
      const timer = setTimeout(() => {
        setShowTeaser(true);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleOpenChat = (text?: string) => {
    const msg = text && text.trim() ? text : "G'day Aussie Supplements team! I would like to inquire about your products.";
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setShowTeaser(false);
    setHasInteracted(true);
    sessionStorage.setItem('as_wa_teaser_seen', 'true');
  };

  const dismissTeaser = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTeaser(false);
    sessionStorage.setItem('as_wa_teaser_seen', 'true');
  };

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto select-none"
      aria-label="WhatsApp live chat support"
    >
      {/* 1. EXPANDED CONCIERGE CARD */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="w-[calc(100vw-2rem)] sm:w-[380px] max-w-[400px] mb-3.5 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(18,61,50,0.35)] border border-emerald-100 overflow-hidden flex flex-col text-charcoal-900"
          >
            {/* Header: Eucalyptus + WhatsApp Green Gradient */}
            <div className="bg-gradient-to-r from-eucalyptus-950 via-eucalyptus-900 to-[#128C7E] p-4 sm:p-5 text-white relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                      <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />
                    </div>
                    {/* Pulsing online badge */}
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#25D366] border-2 border-eucalyptus-950 rounded-full animate-pulse" />
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-extrabold text-sm sm:text-base text-white leading-tight">
                        Aussie Supplements
                      </h3>
                      <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-eucalyptus-200 mt-0.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                      <span>Live Concierge • {DISPLAY_NUMBER}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition active:scale-95"
                  aria-label="Close WhatsApp chat card"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Verified Trust Strip */}
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-eucalyptus-100">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gold-400" />
                  Avg reply: <strong className="text-white">&lt; 5 mins</strong>
                </span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-md font-semibold text-gold-300">
                  Direct WhatsApp Line
                </span>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-4 sm:p-5 space-y-3.5 max-h-[70vh] overflow-y-auto bg-gradient-to-b from-white to-[#F7F8F4]">
              {/* Agent Greeting Bubble */}
              <div className="bg-white p-3.5 rounded-2xl border border-sand shadow-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-eucalyptus-900">
                  <Headphones className="w-3.5 h-3.5 text-gold-600" />
                  <span>G&apos;day from our Aussie Nutrition Desk! 👋</span>
                </div>
                <p className="text-xs text-charcoal-700 leading-relaxed">
                  Have questions about our grass-fed WPI, Creapure creatine, order dispatch, or wholesale supply? Select a quick topic below or send us a message:
                </p>
                <div className="flex items-center gap-1 text-[10px] text-charcoal-400 pt-0.5">
                  <CheckCheck className="w-3 h-3 text-[#25D366]" />
                  <span>Official WhatsApp: {INTERNATIONAL_DISPLAY}</span>
                </div>
              </div>

              {/* Quick Topic Chips */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-charcoal-400 block px-1">
                  Quick Inquiry Topics
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  {QUICK_TOPICS.map((topic, index) => (
                    <button
                      key={index}
                      onClick={() => handleOpenChat(topic.message)}
                      className="group w-full text-left p-2.5 rounded-xl bg-white hover:bg-emerald-50/80 border border-sand hover:border-emerald-300 transition duration-150 flex items-center justify-between shadow-2xs hover:shadow-xs active:scale-98"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-base shrink-0">{topic.icon}</span>
                        <div className="min-w-0">
                          <strong className="block text-xs font-bold text-charcoal-900 group-hover:text-eucalyptus-900 truncate">
                            {topic.title}
                          </strong>
                          <span className="block text-[10px] text-charcoal-500 truncate">
                            {topic.subtitle}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-charcoal-300 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Message Input */}
              <div className="pt-2 border-t border-sand space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-charcoal-400 block px-1">
                  Or Write a Custom Message
                </span>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={customMsg}
                    onChange={(e) => setCustomMsg(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleOpenChat(customMsg);
                      }
                    }}
                    placeholder="Ask about supplements, delivery..."
                    className="w-full text-xs bg-white border border-sand rounded-xl pl-3.5 pr-11 py-2.5 text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent transition shadow-2xs"
                  />
                  <button
                    onClick={() => handleOpenChat(customMsg)}
                    disabled={!customMsg.trim()}
                    className="absolute right-1.5 p-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] disabled:bg-charcoal-200 text-white transition active:scale-90"
                    aria-label="Send custom question on WhatsApp"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Direct Big Action Button */}
              <button
                onClick={() => handleOpenChat(customMsg)}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa4f] text-white font-black py-3 px-4 rounded-2xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition flex items-center justify-center gap-2 text-xs uppercase tracking-wider group"
              >
                <WhatsAppIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Start Chat on WhatsApp</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. TIMED TEASER BUBBLE (Non-intrusive prompt before click) */}
      <AnimatePresence>
        {!isOpen && showTeaser && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 15, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={handleToggle}
            className="mb-3 cursor-pointer bg-white/95 backdrop-blur-md text-charcoal-900 p-3.5 rounded-2xl shadow-xl border border-sand flex items-center gap-3 max-w-xs hover:border-emerald-300 transition group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <WhatsAppIcon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0 text-xs">
              <p className="font-bold text-charcoal-900 leading-tight">
                Need help or quick diet advice?
              </p>
              <p className="text-[11px] text-charcoal-500 mt-0.5">
                Chat with us on WhatsApp ({DISPLAY_NUMBER})
              </p>
            </div>
            <button
              onClick={dismissTeaser}
              className="p-1 hover:bg-charcoal-100 rounded-lg text-charcoal-400 hover:text-charcoal-700 transition"
              title="Dismiss teaser"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. MAIN FLOATING ACTION BUTTON */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
        onClick={handleToggle}
        className={`relative group flex items-center gap-2.5 p-3 sm:px-4 sm:py-3.5 rounded-full shadow-2xl transition duration-300 ${
          isOpen
            ? 'bg-charcoal-900 text-white shadow-charcoal-900/30'
            : 'bg-[#25D366] hover:bg-[#20ba59] text-white shadow-[0_10px_35px_-5px_rgba(37,211,102,0.6)]'
        }`}
        aria-label="Open WhatsApp live support"
      >
        {/* Pulsing Aura Ring */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 group-hover:opacity-60 animate-ping pointer-events-none" />
        )}

        {isOpen ? (
          <X className="w-6 h-6 sm:w-5 sm:h-5 transition-transform group-hover:rotate-90" />
        ) : (
          <WhatsAppIcon className="w-6 h-6 sm:w-5 sm:h-5 fill-white transition-transform group-hover:scale-110" />
        )}

        <div className="hidden sm:flex flex-col items-start leading-none pr-1">
          <span className="font-black text-xs tracking-wide">
            {isOpen ? 'Close Chat' : 'WhatsApp Us'}
          </span>
          {!isOpen && (
            <span className="text-[9px] text-emerald-100 font-semibold mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Online Now
            </span>
          )}
        </div>

        {/* Notification badge if not interacted yet */}
        {!isOpen && !hasInteracted && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white font-black text-[10px] rounded-full flex items-center justify-center shadow-md border-2 border-white animate-bounce">
            1
          </span>
        )}
      </motion.button>
    </div>
  );
};
