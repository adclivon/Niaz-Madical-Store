import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { NiazLogo } from './NiazLogo';
import { PageId } from '../types/pharmacy';
import { STORE_CATEGORIES } from '../data/categories';
import {
  STORE_EMAIL,
  STORE_LOCATION,
  STORE_PHONE_LOCAL,
  buildWhatsAppLink,
} from '../utils/whatsapp';

interface FooterProps {
  onNavigate: (page: PageId, categorySlug?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      {/* Top Banner inside Footer: Community Service Commitment */}
      <div className="border-b border-slate-800 py-8 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-sky-900/40 border border-sky-700/40 flex items-center justify-center text-sky-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Local Neighborhood Pharmacy</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Conveniently serving 283 GB, Mandi Rurala Road &amp; surrounding areas.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-900/40 border border-emerald-700/40 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Safe &amp; Verified Medicines</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Responsible dispensing with required doctor prescription checks.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-teal-900/40 border border-teal-700/40 flex items-center justify-center text-teal-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Daily WhatsApp Support</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Direct message our team at 03197299209 for order confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="bg-white/95 p-2 rounded-xl inline-block">
              <NiazLogo size="sm" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Niaz Medical Store is a reliable neighborhood medical store and pharmacy located at 283 GB, Mandi Rurala Road, Pakistan. We facilitate convenient online medicine ordering and reliable home delivery for our local community.
            </p>
            <div className="pt-2">
              <a
                href={buildWhatsAppLink("Hello Niaz Medical Store, I need assistance with an order.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide uppercase mb-3">
              Explore Store
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shop Medicines
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('healthcare')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Healthcare Products &amp; Devices
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ordering-guide')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Medicine Ordering Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('delivery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home Delivery Coverage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide uppercase mb-3">
              Medicine Categories
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              {STORE_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate('shop', cat.slug)}
                    className="hover:text-white transition-colors text-left truncate max-w-full cursor-pointer flex items-center justify-between group"
                  >
                    <span>{cat.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Verified Contact Information */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide uppercase mb-3">
              Store Information
            </h3>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{STORE_LOCATION}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`tel:${STORE_PHONE_LOCAL}`}
                  className="font-mono text-slate-200 hover:text-white transition-colors"
                >
                  {STORE_PHONE_LOCAL}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={buildWhatsAppLink("Hello Niaz Medical Store")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-300 hover:text-emerald-200 transition-colors"
                >
                  03197299209 (WhatsApp)
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`mailto:${STORE_EMAIL}`}
                  className="text-slate-300 hover:text-white transition-colors truncate"
                >
                  {STORE_EMAIL}
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('admin-guide')}
                  className="text-[11px] text-slate-500 hover:text-sky-400 transition-colors underline cursor-pointer"
                >
                  Store Owner &amp; Admin Roadmap
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Legal Links */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-500 space-y-4">
          <p className="leading-relaxed text-[11px]">
            <strong>Patient Disclaimer:</strong> The information provided on this website is for educational and retail catalog purposes only and does not substitute for qualified medical consultation, diagnosis, or treatment. Prescription medications will only be dispensed upon validation of a doctor’s prescription by Niaz Medical Store.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p>© {new Date().getFullYear()} Niaz Medical Store. All Rights Reserved.</p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => onNavigate('privacy')}
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => onNavigate('terms')}
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                Terms &amp; Conditions
              </button>
              <button
                onClick={() => onNavigate('ordering-guide')}
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                Ordering Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
