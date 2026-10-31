import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, ShieldCheck, Heart, Clock, Check } from 'lucide-react';
import { PageId } from '../types/pharmacy';
import {
  STORE_EMAIL,
  STORE_LOCATION,
  STORE_PHONE_LOCAL,
  buildWhatsAppLink,
} from '../utils/whatsapp';

export const AboutUsPage: React.FC<{ onNavigate: (page: PageId) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb & Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-slate-900 font-medium">About Us</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
          About Niaz Medical Store
        </h1>
        <p className="text-xs sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
          Your neighborhood medical store located at 283 GB, Mandi Rurala Road, Pakistan. Dedicated to providing convenient online medicine ordering and reliable home delivery.
        </p>
      </div>

      {/* Main Core Mission Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              Our Role in the Community
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong>Niaz Medical Store</strong> was established to serve the people of <strong>283 GB</strong> and the surrounding <strong>Mandi Rurala Road</strong> communities. We recognize that traveling to buy urgent medicines, daily prescriptions, or healthcare supplies can be challenging for elderly patients, busy families, and rural residents.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our primary objective is to make genuine medicines, first aid supplies, health monitors, and wellness essentials accessible right at home through simple online ordering and responsive WhatsApp communication.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              Verified Business Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block mb-0.5 font-medium">Business Name</span>
                <strong className="text-slate-900 text-sm">Niaz Medical Store</strong>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block mb-0.5 font-medium">Business Category</span>
                <strong className="text-slate-900 text-sm">Medical Store &amp; Pharmacy Delivery</strong>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block mb-0.5 font-medium">Physical Location</span>
                <strong className="text-slate-900 text-sm">{STORE_LOCATION}</strong>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block mb-0.5 font-medium">WhatsApp / Contact</span>
                <a href={`tel:${STORE_PHONE_LOCAL}`} className="font-mono font-bold text-sky-800 text-sm hover:underline">
                  {STORE_PHONE_LOCAL}
                </a>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 sm:col-span-2">
                <span className="text-slate-500 block mb-0.5 font-medium">Email Address</span>
                <a href={`mailto:${STORE_EMAIL}`} className="font-medium text-sky-800 text-sm hover:underline">
                  {STORE_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Values & Commitments */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-sky-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
              Our Principles
            </span>
            <h3 className="text-xl font-bold">Responsible Community Care</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We operate strictly according to healthcare ethics. We do not invent claims, certifications, or professional qualifications.
            </p>

            <ul className="space-y-3 text-xs text-slate-200">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Genuine Products:</strong> Sourced directly from established pharmaceutical distributors.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Prescription Verification:</strong> Prescription medications strictly verified before dispensing.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Careful Storage:</strong> Controlled room temperatures and hygiene preservation.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Local Home Delivery:</strong> Rapid delivery coordination directly to your home address.</span>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href={buildWhatsAppLink("Hello Niaz Medical Store, I would like to get in touch.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
