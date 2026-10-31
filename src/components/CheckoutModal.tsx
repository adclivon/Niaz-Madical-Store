import React, { useState } from 'react';
import { X, MessageCircle, AlertCircle, CheckCircle, ArrowLeft, Send, FileText } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CustomerCheckoutData } from '../types/pharmacy';
import {
  buildWhatsAppLink,
  generateCartOrderWhatsAppMessage,
  STORE_PHONE_LOCAL,
  STORE_LOCATION,
} from '../utils/whatsapp';

export const CheckoutModal: React.FC = () => {
  const { items, subtotal, isCheckoutOpen, closeCheckout, clearCart } = useCart();

  const [formData, setFormData] = useState<CustomerCheckoutData>({
    customerName: '',
    phoneNumber: '',
    deliveryAddress: '283 GB, Mandi Rurala Road',
    nearbyLandmark: '',
    hasPrescription: false,
    prescriptionDetails: '',
    orderNotes: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCheckoutOpen) return null;

  const hasRx = items.some((item) => item.product.requiresPrescription);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!formData.phoneNumber.trim() || formData.phoneNumber.trim().length < 10) {
      setErrorMsg('Please enter a valid Pakistani contact phone / WhatsApp number (e.g. 03197299209)');
      return;
    }
    if (!formData.deliveryAddress.trim()) {
      setErrorMsg('Please enter your delivery address in 283 GB / Mandi Rurala Road area');
      return;
    }

    setErrorMsg('');
    const message = generateCartOrderWhatsAppMessage(formData, items, subtotal);
    setGeneratedMessage(message);
    setFormSubmitted(true);
  };

  const handleReset = () => {
    setFormSubmitted(false);
    setGeneratedMessage('');
  };

  const whatsAppLink = buildWhatsAppLink(generatedMessage);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-700">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 id="checkout-modal-title" className="text-base font-bold text-slate-900">
                {formSubmitted ? 'Review & Confirm on WhatsApp' : 'Customer Delivery Details'}
              </h2>
              <span className="text-xs text-slate-500">
                Niaz Medical Store · {STORE_LOCATION}
              </span>
            </div>
          </div>
          <button
            onClick={closeCheckout}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!formSubmitted ? (
          /* Step 1: Customer Form */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Prescription Warning */}
            {hasRx && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold">Prescription Items in Cart:</strong>
                  <p className="mt-0.5 text-amber-800">
                    Your order contains prescription medications. After submitting, please send a photograph of your doctor’s prescription in WhatsApp to our team for verification.
                  </p>
                </div>
              </div>
            )}

            {/* Customer Name */}
            <div>
              <label htmlFor="customerName" className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="customerName"
                type="text"
                required
                placeholder="e.g. Muhammad Tayyab"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-900"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-xs font-semibold text-slate-700 mb-1">
                WhatsApp / Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                id="phoneNumber"
                type="tel"
                required
                placeholder="e.g. 03197299209"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-900 font-mono"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                We will contact you on this number to confirm medicine availability.
              </span>
            </div>

            {/* Delivery Address */}
            <div>
              <label htmlFor="deliveryAddress" className="block text-xs font-semibold text-slate-700 mb-1">
                Delivery Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="deliveryAddress"
                rows={2}
                required
                placeholder="House / Street details in 283 GB, Mandi Rurala Road area"
                value={formData.deliveryAddress}
                onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-900 resize-none"
              />
            </div>

            {/* Nearby Landmark */}
            <div>
              <label htmlFor="nearbyLandmark" className="block text-xs font-semibold text-slate-700 mb-1">
                Nearby Landmark / Area Reference (Optional)
              </label>
              <input
                id="nearbyLandmark"
                type="text"
                placeholder="e.g. Near Main Mosque / School / Rurala Road Chowk"
                value={formData.nearbyLandmark}
                onChange={(e) => setFormData({ ...formData, nearbyLandmark: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-900"
              />
            </div>

            {/* Order Notes */}
            <div>
              <label htmlFor="orderNotes" className="block text-xs font-semibold text-slate-700 mb-1">
                Special Instructions / Delivery Timing Note (Optional)
              </label>
              <input
                id="orderNotes"
                type="text"
                placeholder="e.g. Call before delivery, deliver in afternoon"
                value={formData.orderNotes}
                onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-900"
              />
            </div>

            {/* Order Summary Box */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1">
                <span>Items in Order:</span>
                <span>{items.length} items</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-slate-900">
                <span>Estimated Subtotal:</span>
                <span className="font-mono">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Payment Method: Cash on Delivery (COD) upon inspection at your doorstep.
              </p>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Generate WhatsApp Order Message</span>
              </button>
            </div>
          </form>
        ) : (
          /* Step 2: WhatsApp Confirmation & Message Preview */
          <div className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-sm block">Order Details Ready!</strong>
                <p className="mt-1 leading-relaxed">
                  Click the button below to send this order inquiry directly to <strong>Niaz Medical Store (03197299209)</strong>.
                </p>
              </div>
            </div>

            {/* Crucial Pharmacy Verification Notice */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p>
                <strong>Important:</strong> Generating a WhatsApp message does not constitute a guaranteed dispatch. Our medical store team will review availability, verify prescriptions if applicable, and confirm your order before dispatch.
              </p>
            </div>

            {/* Message Preview */}
            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-1">
                Preview of WhatsApp Message:
              </span>
              <pre className="p-3 bg-slate-900 text-slate-200 rounded-xl text-xs font-mono whitespace-pre-wrap max-h-48 overflow-y-auto border border-slate-700 leading-relaxed">
                {generatedMessage}
              </pre>
            </div>

            {/* Direct Open WhatsApp Button */}
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                // Keep cart or clear when confirmed by user
              }}
              className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Send Order to WhatsApp (03197299209)</span>
            </a>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Edit details</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  clearCart();
                  closeCheckout();
                }}
                className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Clear Cart &amp; Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
