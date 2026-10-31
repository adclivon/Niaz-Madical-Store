import React from 'react';
import { Truck, MapPin, Clock, ShieldCheck, CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import { PageId } from '../types/pharmacy';
import {
  STORE_LOCATION,
  STORE_PHONE_LOCAL,
  buildWhatsAppLink,
} from '../utils/whatsapp';

export const HomeDeliveryPage: React.FC<{ onNavigate: (page: PageId) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-slate-900 font-medium">Home Delivery</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
          Healthcare Essentials Delivered to Your Doorstep
        </h1>
        <p className="text-xs sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
          Reliable medicine delivery service specifically tailored for residents in 283 GB, Mandi Rurala Road, and surrounding rural communities.
        </p>
      </div>

      {/* Main Delivery Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Policy & Coverage */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              Coverage &amp; Delivery Locations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Niaz Medical Store provides local delivery focused around our store location at <strong>283 GB, Mandi Rurala Road</strong>. Because we operate locally, we can reach homes, farms, and village centers in our vicinity with careful and prompt attention.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Customers in neighboring chaks and localities along Rurala Road are welcome to message us on WhatsApp with their exact location pin or nearby landmark to verify immediate delivery availability.
            </p>

            <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Primary Area:</strong> 283 GB core &amp; nearby roads</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Extended Area:</strong> Mandi Rurala Road villages</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              Delivery Charges &amp; Schedule
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To keep healthcare affordable, local delivery charges are kept nominal or free depending on order size and exact distance from the store.
            </p>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <Clock className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Delivery Timings:</strong>
                  <p className="mt-0.5">Orders placed during store operating hours are usually dispatched within 1 to 3 hours depending on rider route availability.</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Cash on Delivery (COD):</strong>
                  <p className="mt-0.5">You can safely inspect the sealed medicine package and batch expiry dates before paying the delivery rider in cash.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Inquire Delivery Banner */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-emerald-800 to-teal-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <Truck className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold">Check Delivery in Your Area</h3>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Want to know if we can deliver to your house right now? Send us a quick WhatsApp message with your street or chak number.
            </p>

            <a
              href={buildWhatsAppLink("Hello Niaz Medical Store, I would like to check delivery availability and charges for my address in 283 GB area.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl text-xs font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire on WhatsApp (03197299209)</span>
            </a>

            <div className="pt-2 text-center">
              <a
                href={`tel:${STORE_PHONE_LOCAL}`}
                className="text-xs text-emerald-200 hover:underline flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Or call directly: {STORE_PHONE_LOCAL}</span>
              </a>
            </div>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
            <strong className="text-slate-900 block">Temperature &amp; Moisture Protection:</strong>
            <p>
              Sensitive items (such as syrups, eye drops, or diagnostic test strips) are carefully packed in insulated, moisture-safe bags to protect them from heat during transport.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
