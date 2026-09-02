'use client';

import React from 'react';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/storeContext';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '94775696254';

// Authentic WhatsApp Brand SVG
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface WhatsAppProductBtnProps {
  product: Product;
  quantity?: number;
  className?: string;
  variant?: 'outline' | 'filled' | 'pill';
  customLabel?: string;
}

export const WhatsAppProductBtn: React.FC<WhatsAppProductBtnProps> = ({
  product,
  quantity = 1,
  className = '',
  variant = 'outline',
  customLabel,
}) => {
  const { formatPrice, isWholesaleMode } = useStore();

  const handleProductWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const price = isWholesaleMode ? product.wholesale_price : product.retail_price;
    const formattedPrice = formatPrice(price);
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

    const message = [
      `*Product Inquiry / WhatsApp Order*`,
      `Product: *${product.name}*`,
      `SKU: ${product.sku || 'N/A'}`,
      `Price: ${formattedPrice} each`,
      quantity > 1 ? `Quantity: ${quantity}` : null,
      pageUrl ? `Link: ${pageUrl}` : null,
      ``,
      `Hi Aussie Supplements! I have a question about this item / would like to place an order via WhatsApp. Is this in stock for delivery?`
    ]
      .filter(Boolean)
      .join('\n');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (variant === 'filled') {
    return (
      <button
        onClick={handleProductWhatsApp}
        className={`w-full bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa4f] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 text-xs sm:text-sm active:scale-98 ${className}`}
        title="Order or Ask about this product via WhatsApp"
      >
        <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 fill-white shrink-0" />
        <span className="truncate">{customLabel || 'Order / Inquire via WhatsApp'}</span>
      </button>
    );
  }

  if (variant === 'pill') {
    return (
      <button
        onClick={handleProductWhatsApp}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition active:scale-95 ${className}`}
        title="Ask question via WhatsApp"
      >
        <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366] shrink-0" />
        <span>{customLabel || 'Ask on WhatsApp'}</span>
      </button>
    );
  }

  // Default: elegant outline / secondary CTA
  return (
    <button
      onClick={handleProductWhatsApp}
      className={`w-full bg-white hover:bg-emerald-50/70 active:bg-emerald-100/70 text-emerald-900 border-2 border-emerald-500/40 hover:border-[#25D366] font-extrabold py-3 px-4 rounded-xl shadow-xs transition flex items-center justify-center gap-2 text-xs sm:text-sm active:scale-98 ${className}`}
      title="Ask Australian nutritionist about this product on WhatsApp"
    >
      <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 fill-[#25D366] shrink-0" />
      <span className="truncate">{customLabel || 'Ask Dietitian or Order on WhatsApp'}</span>
    </button>
  );
};
