'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/storeContext';
import { api } from '@/lib/api';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Building2,
  CheckCircle2,
  Lock,
  ArrowRight,
  ChevronRight,
  Phone,
  Mail,
  User,
  MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal, clearCart, showToast, isWholesaleMode, currentUser, formatPrice } = useStore();

  const [email, setEmail] = useState(currentUser?.email || 'sarah.miller@sydneyfitness.com.au');
  const [phone, setPhone] = useState(currentUser?.phone || '0412 345 678');
  const [firstName, setFirstName] = useState(currentUser?.first_name || 'Sarah');
  const [lastName, setLastName] = useState(currentUser?.last_name || 'Miller');
  const [companyName, setCompanyName] = useState('');
  const [streetAddress, setStreetAddress] = useState('42 Pitt Street');
  const [apartment, setApartment] = useState('Level 4, Suite 12');
  const [city, setCity] = useState('Sydney');
  const [state, setState] = useState('NSW');
  const [postcode, setPostcode] = useState('2000');
  const [shippingMethod, setShippingMethod] = useState<'STANDARD' | 'EXPRESS' | 'PALLET_FREIGHT'>('STANDARD');
  const [paymentMethod, setPaymentMethod] = useState<'CREDIT_CARD' | 'AFTERPAY' | 'INVOICE'>('CREDIT_CARD');
  const [isProcessing, setIsProcessing] = useState(false);

  // Card details
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  const shippingFee =
    shippingMethod === 'EXPRESS'
      ? 14.95
      : shippingMethod === 'PALLET_FREIGHT'
      ? 45.00
      : cartSubtotal >= 100
      ? 0.00
      : 9.95;

  const finalTotal = cartSubtotal + shippingFee;
  const gstAmount = Math.round((finalTotal / 11) * 100) / 100;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('Your cart is empty');
      return;
    }

    setIsProcessing(true);
    const orderNum = `AUS-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      // 1. Initialize Stripe PaymentIntent on Django Backend
      if (paymentMethod === 'CREDIT_CARD') {
        await api.createPaymentIntent({
          total_amount: finalTotal,
          currency: 'aud',
          customer_email: email,
          order_number: orderNum
        });
      }

      // 2. Dispatch Order to Backend
      const orderPayload = {
        order_number: orderNum,
        order_type: isWholesaleMode ? 'WHOLESALE' : 'RETAIL',
        customer_email: email,
        customer_phone: phone,
        shipping_first_name: firstName,
        shipping_last_name: lastName,
        company_name: companyName,
        street_address: streetAddress,
        apartment,
        city,
        state,
        postcode,
        shipping_method: shippingMethod,
        payment_method: paymentMethod === 'INVOICE' 
          ? 'B2B 30-Day Commercial Invoice' 
          : 'Stripe 256-Bit SSL (Visa/Mastercard/ApplePay)',
        subtotal: cartSubtotal,
        shipping_fee: shippingFee,
        total_amount: finalTotal,
        items: cart.map((item) => ({
          product_id: item.product.id,
          product_name: item.product.name,
          sku: item.product.sku,
          quantity: item.quantity,
          is_wholesale: item.is_wholesale,
          unit_price: item.unit_price,
          total_price: item.total_price,
        })),
      };

      const order = await api.createOrder(orderPayload);
      setIsProcessing(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#123D32', '#C89B3C', '#2E7D5B', '#ffffff'],
        });
      } catch (err) {}

      clearCart();
      router.push(`/checkout/success?order=${order.order_number || orderNum}&email=${encodeURIComponent(email)}&total=${finalTotal.toFixed(2)}`);
    } catch (err) {
      setIsProcessing(false);
      showToast('Error finalizing transaction. Please check your details.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-sand pb-4">
        <div className="flex items-center gap-2 text-xs text-charcoal-500 font-semibold">
          <Link href="/cart" className="hover:text-eucalyptus-900">Cart</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-charcoal-900 font-bold">Secure Australian Checkout</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-eucalyptus-900 font-bold">
          <Lock className="w-3.5 h-3.5 text-gold-600" />
          <span>256-bit SSL Encrypted</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Form Left */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-8">
          {/* 1. Contact Information */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-charcoal-950 flex items-center gap-2">
              <Mail className="w-4 h-4 text-eucalyptus-800" />
              1. Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-charcoal-700">Email Address for Tracking Updates *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-offwhite border border-sand rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-eucalyptus-800 font-medium"
                />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-charcoal-700">Australian Mobile Phone *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-offwhite border border-sand rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-eucalyptus-800 font-medium"
                />
              </div>
            </div>
          </div>

          {/* 2. Delivery Address */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-charcoal-950 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-eucalyptus-800" />
              2. Australian Delivery Address
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-charcoal-700">First Name *</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-offwhite border border-sand rounded-xl text-xs font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-charcoal-700">Last Name *</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-offwhite border border-sand rounded-xl text-xs font-medium"
                />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-charcoal-700">Company / Gym Name (Optional)</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Sydney Health Studio"
                  className="w-full px-4 py-2.5 bg-offwhite border border-sand rounded-xl text-xs font-medium"
                />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-charcoal-700">Street Address *</label>
                <input
                  type="text"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-offwhite border border-sand rounded-xl text-xs font-medium"
                />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-charcoal-700">Apartment / Suite / Unit (Optional)</label>
                <input
                  type="text"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  className="w-full px-4 py-2.5 bg-offwhite border border-sand rounded-xl text-xs font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-charcoal-700">Suburb / City *</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-offwhite border border-sand rounded-xl text-xs font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-charcoal-700">State *</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-4 py-2.5 bg-offwhite border border-sand rounded-xl text-xs font-bold"
                >
                  <option value="NSW">New South Wales (NSW)</option>
                  <option value="VIC">Victoria (VIC)</option>
                  <option value="QLD">Queensland (QLD)</option>
                  <option value="WA">Western Australia (WA)</option>
                  <option value="SA">South Australia (SA)</option>
                  <option value="TAS">Tasmania (TAS)</option>
                  <option value="ACT">Australian Capital Territory (ACT)</option>
                  <option value="NT">Northern Territory (NT)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-charcoal-700">Postcode *</label>
                <input
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-offwhite border border-sand rounded-xl text-xs font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-charcoal-700">Country</label>
                <input
                  type="text"
                  value="Australia"
                  disabled
                  className="w-full px-4 py-2.5 bg-sand/60 border border-sand rounded-xl text-xs font-bold text-charcoal-500"
                />
              </div>
            </div>
          </div>

          {/* 3. Shipping Method */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-charcoal-950 flex items-center gap-2">
              <Truck className="w-4 h-4 text-eucalyptus-800" />
              3. Delivery Courier Method
            </h2>

            <div className="space-y-2 text-xs">
              <label
                onClick={() => setShippingMethod('STANDARD')}
                className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition ${
                  shippingMethod === 'STANDARD'
                    ? 'border-eucalyptus-900 bg-eucalyptus-50/50'
                    : 'border-sand hover:bg-offwhite'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'STANDARD'}
                    onChange={() => setShippingMethod('STANDARD')}
                    className="text-eucalyptus-900"
                  />
                  <div>
                    <span className="font-extrabold text-charcoal-900 block text-xs">
                      Standard eParcel Tracked Delivery (2–4 Business Days)
                    </span>
                    <span className="text-charcoal-500 text-[11px]">
                      {cartSubtotal >= 100 ? `Free over ${formatPrice(100)} spend` : 'Standard domestic rate'}
                    </span>
                  </div>
                </div>
                <strong className="text-eucalyptus-950 font-black">
                  {cartSubtotal >= 100 ? 'FREE' : formatPrice(9.95)}
                </strong>
              </label>

              <label
                onClick={() => setShippingMethod('EXPRESS')}
                className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition ${
                  shippingMethod === 'EXPRESS'
                    ? 'border-eucalyptus-900 bg-eucalyptus-50/50'
                    : 'border-sand hover:bg-offwhite'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'EXPRESS'}
                    onChange={() => setShippingMethod('EXPRESS')}
                    className="text-eucalyptus-900"
                  />
                  <div>
                    <span className="font-extrabold text-charcoal-900 block text-xs">
                      Australia Post Express Air Courier (1–2 Days Next-Flight)
                    </span>
                    <span className="text-charcoal-500 text-[11px]">Priority warehouse packing & dispatch</span>
                  </div>
                </div>
                <strong className="text-eucalyptus-950 font-black">{formatPrice(14.95)}</strong>
              </label>
            </div>
          </div>

          {/* 4. Payment */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-charcoal-950 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-eucalyptus-800" />
              4. Payment Method
            </h2>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('CREDIT_CARD')}
                  className={`p-3 rounded-xl border-2 font-bold transition text-center ${
                    paymentMethod === 'CREDIT_CARD'
                      ? 'bg-eucalyptus-900 text-white border-eucalyptus-900'
                      : 'bg-offwhite border-sand text-charcoal-700'
                  }`}
                >
                  Credit / Debit Card
                </button>

                {isWholesaleMode && (
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('INVOICE')}
                    className={`p-3 rounded-xl border-2 font-bold transition text-center ${
                      paymentMethod === 'INVOICE'
                        ? 'bg-gold-500 text-eucalyptus-950 border-gold-500'
                        : 'bg-offwhite border-sand text-charcoal-700'
                    }`}
                  >
                    B2B 30-Day Invoice
                  </button>
                )}
              </div>

              {paymentMethod === 'CREDIT_CARD' && (
                <div className="p-5 bg-offwhite rounded-2xl border border-sand space-y-4 text-xs">
                  {/* Stripe Verified Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-sand">
                    <div className="flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="font-bold text-charcoal-800 text-[11px]">
                        Stripe 256-Bit SSL Encrypted Checkout
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 opacity-85">
                      <span className="text-[10px] font-black bg-blue-600 text-white px-1.5 py-0.5 rounded">VISA</span>
                      <span className="text-[10px] font-black bg-red-500 text-white px-1.5 py-0.5 rounded">MC</span>
                      <span className="text-[10px] font-black bg-blue-800 text-white px-1.5 py-0.5 rounded">AMEX</span>
                      <span className="text-[10px] font-black bg-black text-white px-1.5 py-0.5 rounded">Pay</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-charcoal-700">Card Number</label>
                      <span className="text-[10px] text-charcoal-400 font-mono">PCI-DSS Level 1</span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        maxLength={19}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                          setCardNumber(val || e.target.value);
                        }}
                        placeholder="4242 4242 4242 4242"
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-sand rounded-xl font-mono text-xs font-bold text-charcoal-900 focus:outline-none focus:border-gold-500"
                      />
                      <CreditCard className="w-4 h-4 text-charcoal-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="font-bold text-charcoal-700">Expiry MM/YY</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        maxLength={5}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="12/28"
                        className="w-full px-4 py-2.5 bg-white border border-sand rounded-xl font-mono text-xs font-bold text-charcoal-900 focus:outline-none focus:border-gold-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="font-bold text-charcoal-700">CVC / CVV</label>
                        <span className="text-[10px] text-charcoal-400">3-4 digits</span>
                      </div>
                      <input
                        type="text"
                        value={cardCvc}
                        maxLength={4}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="888"
                        className="w-full px-4 py-2.5 bg-white border border-sand rounded-xl font-mono text-xs font-bold text-charcoal-900 focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-1.5 text-[11px] text-charcoal-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Your payment is processed securely via Stripe. Card details are tokenized & never stored.</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-eucalyptus-900 hover:bg-eucalyptus-800 text-white font-extrabold py-4 px-6 rounded-xl shadow-xl transition flex items-center justify-center gap-2 text-sm"
          >
            <span>{isProcessing ? 'Processing Order...' : `PLACE ORDER • ${formatPrice(finalTotal)}`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Order Items Summary Right */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-sand shadow-lg p-6 space-y-6 sticky top-28">
          <h3 className="font-black text-base text-charcoal-950 pb-3 border-b border-sand">
            Order Review ({cart.length} items)
          </h3>

          <div className="divide-y divide-sand max-h-72 overflow-y-auto space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="pt-3 flex items-center gap-3 first:pt-0">
                <img
                  src={item.product.primary_image}
                  alt={item.product.name}
                  className="w-14 h-14 object-contain bg-offwhite rounded-xl border border-sand p-1 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-charcoal-900 truncate">{item.product.name}</h4>
                  <span className="text-[11px] text-charcoal-500">Qty: {item.quantity} • {item.product.size_label}</span>
                </div>
                <span className="font-black text-xs text-eucalyptus-950">
                  {formatPrice(item.total_price)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs text-charcoal-600 pt-4 border-t border-sand">
            <div className="flex justify-between">
              <span>Cart Subtotal</span>
              <span className="font-bold text-charcoal-900">{formatPrice(cartSubtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="font-bold text-charcoal-900">
                {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
              </span>
            </div>
            <div className="flex justify-between text-[11px] text-charcoal-400">
              <span>Tax Inclusive</span>
              <span>{formatPrice(gstAmount)}</span>
            </div>
            <div className="flex justify-between text-base font-black text-charcoal-950 pt-2 border-t border-sand">
              <span>Final Total</span>
              <span className="text-xl text-eucalyptus-950 font-black">{formatPrice(finalTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
