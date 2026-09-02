'use client';

import React, { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  Mail,
  Copy,
  Check,
  Share2,
  Clock,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/storeContext';
import { Order } from '@/lib/types';
import { api } from '@/lib/api';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '94775696254';
const ADMIN_EMAIL = 'wpjinadhi@gmail.com';

// Authentic WhatsApp Brand SVG
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

function SuccessContent() {
  const { formatPrice, showToast } = useStore();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || 'AUS-2026-98124';
  const email = searchParams.get('email') || 'customer@example.com';
  const total = searchParams.get('total') || '134.90';

  const [order, setOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);

  // Load full order details from backend
  useEffect(() => {
    let isMounted = true;
    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/orders/lookup/${orderNumber}/?email=${encodeURIComponent(email)}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setOrder(data);
        }
      } catch (e) {}
    };
    fetchOrder();
    return () => { isMounted = false; };
  }, [orderNumber, email]);

  // Construct complete WhatsApp message
  const itemsText = order?.items && order.items.length > 0
    ? order.items.map((it, idx) => `${idx + 1}. *${it.product_name}* (SKU: ${it.sku}) x ${it.quantity} — $${it.total_price}`).join('\n')
    : `1. Order Items (Order Reference: ${orderNumber})`;

  const shippingAddr = order
    ? `${order.street_address}${order.apartment ? `, ${order.apartment}` : ''}, ${order.city}, ${order.state} ${order.postcode}, ${order.country}`
    : 'Provided at checkout';

  const whatsappReceiptMessage = `🛒 *NEW ORDER RECEIVED & PAYMENT CONFIRMED!*
----------------------------------------
*Order Number:* #${orderNumber}
*Total Paid:* $${total}
*Payment Status:* PAID (Stripe 256-Bit SSL)
*Date:* ${new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}

👤 *Customer Information:*
- *Email:* ${email}
- *Phone:* ${order?.customer_phone || 'Registered at checkout'}
- *Name:* ${order ? `${order.shipping_first_name} ${order.shipping_last_name}` : 'Customer'}

📍 *Shipping Address:*
${shippingAddr}
Carrier: ${order?.carrier || 'Australia Post eParcel Express'}

📦 *Items Purchased:*
${itemsText}

💰 *Financial Summary:*
- Total Amount Paid: $${total}
- Tax/GST: Inclusive
----------------------------------------
*Aussie Supplements Order Desk*
WhatsApp: +94 77 569 6254 (077 569 6254)`;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappReceiptMessage)}`;

  const customerTrackingUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi Aussie Supplements team! I have completed payment for Order #${orderNumber} ($${total}). Please send my Australia Post tracking details to this WhatsApp number!`
  )}`;

  const handleCopyReceipt = () => {
    navigator.clipboard.writeText(whatsappReceiptMessage);
    setCopied(true);
    showToast('Order details copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8 text-charcoal-900">
      {/* 1. Success Hero Badge */}
      <div className="text-center space-y-3">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-20 h-20 bg-emerald-100 text-success rounded-full flex items-center justify-center mx-auto shadow-xl border-4 border-white"
        >
          <CheckCircle2 className="w-10 h-10 text-success" />
        </motion.div>

        <span className="inline-block text-[11px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-300">
          Payment Confirmed • Receipt Dispatched
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-charcoal-950">
          Thank you for your order!
        </h1>

        <p className="text-sm text-charcoal-600 max-w-lg mx-auto leading-relaxed">
          Your payment has cleared. All order and invoice details have been dispatched to your email and WhatsApp desk.
        </p>
      </div>

      {/* 2. Dispatched Channels Status Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="bg-white p-4 rounded-2xl border border-sand shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <strong className="block text-charcoal-900 font-bold">Email Receipt Dispatched</strong>
            <span className="text-charcoal-500 block truncate text-[11px]">
              Sent to: <strong className="text-charcoal-800">{email}</strong> &amp; <strong className="text-charcoal-800">{ADMIN_EMAIL}</strong>
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#25D366] flex items-center justify-center shrink-0">
            <WhatsAppIcon className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <strong className="block text-charcoal-900 font-bold">WhatsApp Live Desk</strong>
            <span className="text-charcoal-500 block text-[11px]">
              Hotline: <strong className="text-emerald-800">077 569 6254</strong> (+94 77 569 6254)
            </span>
          </div>
        </div>
      </div>

      {/* 3. PRIMARY WHATSAPP NOTIFICATION & RECEIPT CARD */}
      <div className="bg-gradient-to-br from-emerald-950 via-eucalyptus-950 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-500/30 space-y-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-lg shrink-0">
              <WhatsAppIcon className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300 block">
                Instant WhatsApp Synchronization
              </span>
              <h3 className="text-lg font-black text-white">Send Order to WhatsApp (077 569 6254)</h3>
            </div>
          </div>

          <span className="self-start sm:self-auto flex items-center gap-1.5 text-[11px] bg-emerald-500/20 text-emerald-200 px-3 py-1 rounded-full border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            Live Dispatch Desk
          </span>
        </div>

        <p className="text-xs text-emerald-100/90 leading-relaxed">
          Send this complete order invoice directly to our official WhatsApp line for instant packing priority, bank confirmation, or delivery courier tracking updates.
        </p>

        {/* WhatsApp Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa4f] text-white font-extrabold py-3.5 px-5 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-xs uppercase tracking-wider active:scale-98"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Send Order via WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href={customerTrackingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 active:bg-white/25 text-white font-bold py-3.5 px-5 rounded-2xl border border-white/20 transition flex items-center justify-center gap-2 text-xs active:scale-98"
          >
            <Clock className="w-4 h-4 text-gold-400" />
            <span>Get Tracking Updates on WhatsApp</span>
          </a>
        </div>

        {/* Copy Text Option */}
        <div className="pt-2 flex items-center justify-between text-xs text-emerald-200/80 border-t border-white/10">
          <span className="text-[11px]">Need to save or share your receipt text?</span>
          <button
            onClick={handleCopyReceipt}
            className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-xl transition text-[11px] text-white"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Full Receipt Text'}</span>
          </button>
        </div>
      </div>

      {/* 4. Complete Order Details Breakdown Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand shadow-lg text-left space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-sand gap-4">
          <div>
            <span className="text-xs text-charcoal-400 font-bold uppercase">Order Reference</span>
            <h3 className="font-mono text-lg font-black text-eucalyptus-950">{orderNumber}</h3>
          </div>
          <div>
            <span className="text-xs text-charcoal-400 font-bold uppercase">Total Amount Paid</span>
            <h3 className="text-xl font-black text-charcoal-900">{formatPrice(total)}</h3>
          </div>
          <div>
            <span className="text-xs text-charcoal-400 font-bold uppercase">Carrier Dispatch</span>
            <span className="text-xs font-extrabold text-success block">Australia Post eParcel Express</span>
          </div>
        </div>

        {/* Itemized Order List if available */}
        {order?.items && order.items.length > 0 && (
          <div className="space-y-3 pb-6 border-b border-sand">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-charcoal-400">
              Purchased Items ({order.items.length})
            </h4>
            <div className="divide-y divide-sand">
              {order.items.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-charcoal-900 block">{item.product_name}</strong>
                    <span className="text-charcoal-400 text-[11px]">SKU: {item.sku} • Qty: {item.quantity}</span>
                  </div>
                  <strong className="text-eucalyptus-950">${item.total_price}</strong>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fulfillment Timeline */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-charcoal-500">
            Fulfillment Progress
          </h4>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="font-bold text-success block text-xs">1. Confirmed</span>
              <span className="text-[10px] text-charcoal-500">Payment Verified</span>
            </div>
            <div className="p-3 bg-offwhite rounded-xl border border-sand">
              <span className="font-bold text-charcoal-700 block text-xs">2. Packing</span>
              <span className="text-[10px] text-charcoal-400">Warehouse Queue</span>
            </div>
            <div className="p-3 bg-offwhite rounded-xl border border-sand">
              <span className="font-bold text-charcoal-700 block text-xs">3. Dispatched</span>
              <span className="text-[10px] text-charcoal-400">eParcel Courier</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Navigation Actions */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <Link
          href="/account/orders"
          className="bg-eucalyptus-900 hover:bg-eucalyptus-800 text-white font-bold px-7 py-3.5 rounded-xl text-xs transition shadow-md"
        >
          View in My Account
        </Link>
        <Link
          href="/shop"
          className="bg-offwhite hover:bg-sand text-charcoal-800 font-bold px-7 py-3.5 rounded-xl border border-sand text-xs transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-charcoal-500 font-bold">Loading Order Confirmation...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
