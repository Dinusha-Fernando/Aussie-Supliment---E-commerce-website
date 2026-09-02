import logging
import urllib.parse
from django.core.mail import EmailMultiAlternatives
from django.conf import settings

logger = logging.getLogger(__name__)

WHATSAPP_NUMBER = getattr(settings, 'WHATSAPP_NUMBER', '94775696254')


def format_whatsapp_order_text(order):
    """
    Constructs a complete, formatted receipt message for WhatsApp dispatch.
    """
    customer_name = f"{order.shipping_first_name} {order.shipping_last_name}".strip() or "Customer"
    created_at_str = order.created_at.strftime("%d %b %Y, %I:%M %p") if getattr(order, 'created_at', None) else "Just now"

    items_list = []
    items_qs = order.items.all()
    if items_qs.exists():
        for idx, item in enumerate(items_qs, start=1):
            sku_str = f" [{item.sku}]" if item.sku else ""
            items_list.append(f"{idx}. *{item.product_name}*{sku_str} x {item.quantity} — ${item.total_price}")
    else:
        items_list.append("1. Order Items (See invoice)")

    items_block = "\n".join(items_list)

    apt_part = f", {order.apartment}" if getattr(order, 'apartment', '') else ""
    full_address = f"{order.street_address}{apt_part}, {order.city}, {order.state} {order.postcode}, {order.country}"

    text = f"""🛒 *NEW ORDER RECEIVED & PAID!*
----------------------------------------
*Order Reference:* #{order.order_number}
*Date:* {created_at_str}
*Order Status:* {order.status}
*Payment Status:* {order.payment_status} ({order.payment_method})

👤 *CUSTOMER INFORMATION:*
- *Name:* {customer_name}
- *Email:* {order.customer_email}
- *Phone:* {order.customer_phone}
{f"- *Company:* {order.company_name}" if getattr(order, 'company_name', '') else ""}

📍 *SHIPPING DESTINATION:*
{full_address}
- *Method:* {order.shipping_method}
- *Carrier:* {getattr(order, 'carrier', 'Australia Post eParcel')}

📦 *ITEMS ORDERED ({len(items_list)} item{'s' if len(items_list) != 1 else ''}):*
{items_block}

💰 *FINANCIAL SUMMARY:*
- Subtotal: ${order.subtotal}
- Shipping: ${order.shipping_fee}
{f"- Discount: -${order.discount_amount}" if order.discount_amount > 0 else ""}
{f"- Tax/GST (10% inc): ${order.tax_gst}" if order.tax_gst > 0 else ""}
*TOTAL AMOUNT PAID:* *${order.total_amount}*
----------------------------------------
*Aussie Supplements Order Desk*
WhatsApp Hotline: +94 77 569 6254
"""
    return text


def format_whatsapp_order_url(order):
    """
    Returns direct wa.me link containing the complete order message.
    """
    text = format_whatsapp_order_text(order)
    encoded = urllib.parse.quote(text)
    return f"https://wa.me/{WHATSAPP_NUMBER}?text={encoded}"


def send_order_confirmation_email(order):
    """
    Sends detailed HTML & Plaintext receipt emails to:
    1. The customer (order.customer_email)
    2. The store owner / admin (wpjinadhi@gmail.com)
    """
    try:
        from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'Aussie Supplements <wpjinadhi@gmail.com>')
        admin_email = getattr(settings, 'ADMIN_EMAIL', 'wpjinadhi@gmail.com')
        customer_name = f"{order.shipping_first_name} {order.shipping_last_name}".strip() or "Valued Customer"
        created_at_str = order.created_at.strftime("%d %b %Y, %I:%M %p") if getattr(order, 'created_at', None) else "Recent"
        whatsapp_url = format_whatsapp_order_url(order)

        # Build items representation
        items_rows_html = ""
        items_list_text = []
        for item in order.items.all():
            items_list_text.append(f"- {item.product_name} (SKU: {item.sku}) x {item.quantity} = ${item.total_price}")
            items_rows_html += f"""
            <tr>
              <td style="padding: 10px 12px; border-bottom: 1px solid #eef0eb; font-size: 13px; color: #101B17;">
                <strong>{item.product_name}</strong><br/>
                <span style="font-size: 11px; color: #667; font-family: monospace;">SKU: {item.sku}</span>
              </td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #eef0eb; font-size: 13px; text-align: center; color: #101B17;">
                {item.quantity}
              </td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #eef0eb; font-size: 13px; text-align: right; color: #101B17;">
                ${item.unit_price}
              </td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #eef0eb; font-size: 13px; text-align: right; font-weight: bold; color: #123D32;">
                ${item.total_price}
              </td>
            </tr>
            """

        apt_part = f", {order.apartment}" if getattr(order, 'apartment', '') else ""
        full_address = f"{order.street_address}{apt_part}, {order.city}, {order.state} {order.postcode}, {order.country}"
        items_summary_text = "\n".join(items_list_text)

        # Plaintext Fallback
        plain_message = f"""AUSSIE SUPPLEMENTS — OFFICIAL ORDER RECEIPT
============================================================
Order Number: #{order.order_number}
Order Date:   {created_at_str}
Payment:      {order.payment_status} via {order.payment_method}
Order Status: {order.status}

CUSTOMER DETAILS:
Name:    {customer_name}
Email:   {order.customer_email}
Phone:   {order.customer_phone}
{f"Company: {order.company_name}" if getattr(order, 'company_name', '') else ""}

SHIPPING ADDRESS:
{full_address}
Courier: {getattr(order, 'carrier', 'Australia Post eParcel Express')}

ITEMS PURCHASED:
{items_summary_text}

PRICING BREAKDOWN:
Subtotal:     ${order.subtotal}
Shipping Fee: ${order.shipping_fee}
{f"Discount:    -${order.discount_amount}" if order.discount_amount > 0 else ""}
{f"GST (10%):   ${order.tax_gst}" if order.tax_gst > 0 else ""}
------------------------------------------------------------
TOTAL PAID:   ${order.total_amount}
============================================================

WHATSAPP DISPATCH & SUPPORT:
You can message our direct team on WhatsApp: +94 77 569 6254 (077 569 6254)
Click to view or track: {whatsapp_url}

Thank you for choosing Aussie Supplements!
https://aussiesupplements.com.au
"""

        # Rich HTML Email Template
        html_content = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Order Receipt #{order.order_number}</title>
</head>
<body style="margin:0; padding:20px; background-color:#F7F8F4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color:#101B17;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e1e3db; box-shadow: 0 10px 30px rgba(18,61,50,0.08);">
    
    <!-- Brand Header -->
    <div style="background: linear-gradient(135deg, #091c16 0%, #123D32 100%); padding: 30px 24px; text-align: center; color: #ffffff;">
      <h1 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 0.5px; color: #C89B3C;">AUSSIE SUPPLEMENTS</h1>
      <p style="margin: 6px 0 0 0; font-size: 12px; color: #e1f1eb; text-transform: uppercase; letter-spacing: 1.5px;">Order & Payment Receipt</p>
      
      <div style="display: inline-block; margin-top: 15px; background: rgba(200, 155, 60, 0.2); border: 1px solid #C89B3C; padding: 6px 14px; rounded-full; border-radius: 20px; font-size: 12px; font-weight: bold; color: #fdfaf2;">
        Order #{order.order_number} • {order.payment_status}
      </div>
    </div>

    <!-- Body -->
    <div style="padding: 24px;">
      <p style="font-size: 15px; line-height: 1.5; margin: 0 0 15px 0;">
        G'day <strong>{customer_name}</strong>,
      </p>
      <p style="font-size: 13px; color: #42524d; line-height: 1.6; margin: 0 0 20px 0;">
        Thank you for shopping with Aussie Supplements. Your payment of <strong>${order.total_amount}</strong> has been successfully processed and your order is currently being prepared for dispatch.
      </p>

      <!-- Meta Info Box -->
      <table style="width: 100%; background: #F7F8F4; border-radius: 12px; padding: 14px; margin-bottom: 24px; font-size: 12px;">
        <tr>
          <td style="padding: 4px 8px; color: #667;">Order Date:</td>
          <td style="padding: 4px 8px; font-weight: bold; text-align: right;">{created_at_str}</td>
        </tr>
        <tr>
          <td style="padding: 4px 8px; color: #667;">Payment Method:</td>
          <td style="padding: 4px 8px; font-weight: bold; text-align: right;">{order.payment_method}</td>
        </tr>
        <tr>
          <td style="padding: 4px 8px; color: #667;">Contact Phone:</td>
          <td style="padding: 4px 8px; font-weight: bold; text-align: right;">{order.customer_phone}</td>
        </tr>
        <tr>
          <td style="padding: 4px 8px; color: #667;">Shipping To:</td>
          <td style="padding: 4px 8px; font-weight: bold; text-align: right;">{full_address}</td>
        </tr>
      </table>

      <!-- Items Table -->
      <h3 style="font-size: 14px; font-weight: 800; margin: 0 0 10px 0; color: #123D32; text-transform: uppercase; letter-spacing: 0.5px;">Order Summary</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background: #eef1ec; text-align: left;">
            <th style="padding: 8px 12px; font-size: 11px; text-transform: uppercase; color: #455;">Product</th>
            <th style="padding: 8px 12px; font-size: 11px; text-transform: uppercase; color: #455; text-align: center;">Qty</th>
            <th style="padding: 8px 12px; font-size: 11px; text-transform: uppercase; color: #455; text-align: right;">Price</th>
            <th style="padding: 8px 12px; font-size: 11px; text-transform: uppercase; color: #455; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          {items_rows_html}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="padding: 8px 12px; font-size: 12px; text-align: right; color: #667;">Subtotal:</td>
            <td style="padding: 8px 12px; font-size: 12px; text-align: right; font-weight: bold;">${order.subtotal}</td>
          </tr>
          <tr>
            <td colspan="3" style="padding: 4px 12px; font-size: 12px; text-align: right; color: #667;">Shipping Fee:</td>
            <td style="padding: 4px 12px; font-size: 12px; text-align: right; font-weight: bold;">${order.shipping_fee}</td>
          </tr>
          <tr>
            <td colspan="3" style="padding: 12px; font-size: 15px; font-weight: 900; text-align: right; color: #091c16; border-top: 2px solid #123D32;">Total Amount Paid:</td>
            <td style="padding: 12px; font-size: 16px; font-weight: 900; text-align: right; color: #123D32; border-top: 2px solid #123D32;">${order.total_amount}</td>
          </tr>
        </tfoot>
      </table>

      <!-- Direct WhatsApp Action Banner -->
      <div style="background: #e6f9ed; border: 1px solid #25D366; border-radius: 16px; padding: 18px; text-align: center; margin-top: 20px;">
        <h4 style="margin: 0 0 6px 0; color: #0b5c2a; font-size: 14px; font-weight: 800;">Need instant updates on your order?</h4>
        <p style="margin: 0 0 12px 0; font-size: 12px; color: #156634;">Connect directly with our Australian & Sri Lankan WhatsApp dispatch desk.</p>
        <a href="{whatsapp_url}" target="_blank" style="display: inline-block; background: #25D366; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 13px; padding: 10px 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(37,211,102,0.35);">
          💬 View & Confirm on WhatsApp (+94 77 569 6254)
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #F7F8F4; border-top: 1px solid #e1e3db; padding: 18px; text-align: center; font-size: 11px; color: #778;">
      <p style="margin: 0 0 4px 0;">© Aussie Supplements Pty Ltd • Official Support: {getattr(settings, 'CONTACT_EMAIL', 'wpjinadhi@gmail.com')}</p>
      <p style="margin: 0;">Hotline: 077 569 6254 / +94 77 569 6254 • Melbourne & Sydney Fulfillment</p>
    </div>
  </div>
</body>
</html>"""

        # 1. Send receipt to customer
        if order.customer_email:
            customer_subject = f"Order Confirmed #{order.order_number} — Aussie Supplements"
            msg = EmailMultiAlternatives(
                subject=customer_subject,
                body=plain_message,
                from_email=from_email,
                to=[order.customer_email]
            )
            msg.attach_alternative(html_content, "text/html")
            msg.send(fail_silently=True)
            logger.info(f"Customer confirmation email dispatched to {order.customer_email}")

        # 2. Send full order alert to admin (wpjinadhi@gmail.com)
        if admin_email:
            admin_subject = f"🔔 [NEW PAID ORDER] #{order.order_number} - ${order.total_amount} ({customer_name})"
            admin_msg = EmailMultiAlternatives(
                subject=admin_subject,
                body=plain_message,
                from_email=from_email,
                to=[admin_email]
            )
            admin_msg.attach_alternative(html_content, "text/html")
            admin_msg.send(fail_silently=True)
            logger.info(f"Store owner order alert email dispatched to {admin_email}")

    except Exception as e:
        logger.error(f"Error dispatching order confirmation email: {e}", exc_info=True)
