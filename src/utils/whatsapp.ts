import { CartItem, CustomerCheckoutData, Product } from '../types/pharmacy';

export const STORE_PHONE_LOCAL = '03197299209';
export const STORE_PHONE_INTL = '923197299209';
export const STORE_EMAIL = 'tayyabhy@gmail.com';
export const STORE_LOCATION = '283 GB, Mandi Rurala Road, Pakistan';

/**
 * Builds the wa.me link with encoded message
 */
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${STORE_PHONE_INTL}?text=${encodeURIComponent(message.trim())}`;
}

/**
 * Formats full checkout order into a clean, legible WhatsApp order inquiry
 */
export function generateCartOrderWhatsAppMessage(
  data: CustomerCheckoutData,
  items: CartItem[],
  estimatedTotal: number
): string {
  const dateStr = new Date().toLocaleDateString('en-PK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const lines: string[] = [];
  lines.push(`*NEW MEDICINE ORDER INQUIRY - NIAZ MEDICAL STORE*`);
  lines.push(`Date: ${dateStr}`);
  lines.push(``);
  lines.push(`*CUSTOMER DETAILS:*`);
  lines.push(`• Name: ${data.customerName}`);
  lines.push(`• Phone: ${data.phoneNumber}`);
  lines.push(`• Delivery Address: ${data.deliveryAddress}`);
  if (data.nearbyLandmark) {
    lines.push(`• Landmark: ${data.nearbyLandmark}`);
  }
  lines.push(``);

  lines.push(`*REQUESTED MEDICINES & ITEMS:*`);
  let hasRx = false;
  items.forEach((item, index) => {
    const rxTag = item.product.requiresPrescription ? ' [Rx Required]' : '';
    if (item.product.requiresPrescription) hasRx = true;
    lines.push(
      `${index + 1}. *${item.product.name}* (Qty: ${item.quantity})`
    );
    lines.push(
      `   Brand: ${item.product.brand}${rxTag} - Est. Rs. ${item.product.samplePricePKR * item.quantity}`
    );
  });

  lines.push(``);
  lines.push(`*ESTIMATED TOTAL:* Rs. ${estimatedTotal.toLocaleString()}`);
  lines.push(`_(Note: Final price & availability to be confirmed by Niaz Medical Store)_`);

  if (hasRx) {
    lines.push(``);
    lines.push(`*PRESCRIPTION NOTICE:*`);
    lines.push(`⚠️ Order contains prescription medicines. I will share a clear photo of the doctor prescription in this chat for verification.`);
  }

  if (data.orderNotes && data.orderNotes.trim().length > 0) {
    lines.push(``);
    lines.push(`*CUSTOMER NOTES:*`);
    lines.push(`${data.orderNotes.trim()}`);
  }

  lines.push(``);
  lines.push(`Please confirm medicine availability, total amount, and delivery timing for 283 GB, Mandi Rurala Road area.`);

  return lines.join('\n');
}

/**
 * Formats a quick single-product order inquiry
 */
export function generateSingleProductWhatsAppMessage(product: Product, quantity = 1): string {
  const rxNotice = product.requiresPrescription
    ? `\n⚠️ I understand this requires a valid doctor prescription and I will provide the photo.`
    : '';

  const message = `*PRODUCT INQUIRY / ORDER - NIAZ MEDICAL STORE*
Hello, I would like to check availability and order this product:

• Product: *${product.name}*
• Brand: ${product.brand}
• Pack: ${product.packSize}
• Quantity: ${quantity}
• Sample Price listed: Rs. ${product.samplePricePKR * quantity}${rxNotice}

Please let me know if this is available for delivery/pickup at 283 GB, Mandi Rurala Road. Thank you!`;

  return message;
}

/**
 * Formats direct prescription upload order inquiry
 */
export function generatePrescriptionInquiryWhatsAppMessage(
  name: string,
  phone: string,
  address: string,
  notes: string
): string {
  const message = `*PRESCRIPTION MEDICINE INQUIRY - NIAZ MEDICAL STORE*
Hello Niaz Medical Store, I want to order medicines using my doctor's prescription:

• Patient/Customer Name: *${name}*
• Contact Number: ${phone}
• Delivery Address: ${address || 'Near 283 GB, Mandi Rurala Road'}
${notes ? `• Additional Instructions: ${notes}\n` : ''}
I am attaching the clear photo of my doctor's prescription directly with this WhatsApp message. Please verify and quote the total price and delivery time.`;

  return message;
}
