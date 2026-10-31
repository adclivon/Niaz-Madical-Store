import React from 'react';
import { FileText, MessageCircle, Truck, CheckCircle2, ShieldCheck, Camera, ArrowRight, AlertTriangle } from 'lucide-react';
import { PageId } from '../types/pharmacy';
import { buildWhatsAppLink, STORE_PHONE_LOCAL } from '../utils/whatsapp';
import { useCart } from '../context/CartContext';

export const OrderingGuidePage: React.FC<{ onNavigate: (page: PageId) => void }> = ({ onNavigate }) => {
  const { openPrescriptionModal } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-slate-900 font-medium">Medicine Ordering Guide</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
          How to Order Medicines from Niaz Medical Store
        </h1>
        <p className="text-xs sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
          A step-by-step guide to ordering prescription medicines, over-the-counter essentials, and diagnostic equipment with home delivery around 283 GB, Mandi Rurala Road.
        </p>
      </div>

      {/* Two Ordering Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Method 1: Cart Checkout */}
        <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-50 text-sky-800 rounded-md text-xs font-bold">
              <span>Method 1</span>
              <span>·</span>
              <span>Online Catalog Cart</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Browse, Add to Cart &amp; Generate WhatsApp Order
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ideal when you know the exact products, over-the-counter painkillers, vitamins, or first aid kits you require.
            </p>

            <ol className="space-y-3 text-xs text-slate-600 pt-2">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                <span>Search or browse the <strong>Shop Medicines</strong> catalog.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                <span>Adjust quantities and click <strong>Add to Cart</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                <span>Open your cart and enter your name, contact phone, and delivery address.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center shrink-0 text-[11px]">4</span>
                <span>Click to generate your WhatsApp message and send it directly to our store at <strong>{STORE_PHONE_LOCAL}</strong>.</span>
              </li>
            </ol>
          </div>

          <div className="pt-6">
            <button
              onClick={() => onNavigate('shop')}
              className="w-full py-2.5 px-4 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Medicine Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Method 2: Prescription Direct Send */}
        <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-md text-xs font-bold">
              <span>Method 2</span>
              <span>·</span>
              <span>Fastest for Prescriptions</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Send Doctor Prescription on WhatsApp
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              If your doctor wrote a handwritten or printed prescription slip, you do not need to search for every medicine individually.
            </p>

            <ol className="space-y-3 text-xs text-slate-600 pt-2">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                <span>Take a clear, well-lit photograph of the entire prescription slip.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                <span>Ensure doctor's clinic header, patient name, and dosage instructions are readable.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                <span>Send the picture to <strong>03197299209</strong> on WhatsApp along with your delivery address.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center shrink-0 text-[11px]">4</span>
                <span>We verify the prescription, check availability, quote total cost, and dispatch for delivery.</span>
              </li>
            </ol>
          </div>

          <div className="pt-6">
            <button
              onClick={openPrescriptionModal}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>Send Prescription Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Safety & Prescription Rules */}
      <div className="p-6 sm:p-8 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-700 shrink-0" />
          <h3 className="text-base font-bold text-amber-950">
            Important Pharmacy Regulations &amp; Safety Compliance
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          Niaz Medical Store operates in strict conformity with healthcare dispensing standards. Controlled medicines, restricted narcotics, or prescription-only antibiotics cannot be dispensed without reviewing a valid medical prescription from a registered medical practitioner.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-amber-900 pt-1">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>Never change or discontinue prescribed dosages without doctor consultation.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>Prescription photos are held in strict patient privacy and confidentiality.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
