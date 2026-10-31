import React, { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { buildWhatsAppLink, STORE_PHONE_LOCAL } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside aria-label="Quick Customer Support and WhatsApp" className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Quick Popup Card */}
      {isOpen && (
        <div className="mb-3 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight">Niaz Medical Store</h4>
                <p className="text-[10px] text-emerald-100">283 GB, Mandi Rurala Road</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded transition-colors"
              aria-label="Close chat helper"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-slate-50 text-xs text-slate-700 space-y-3">
            <p className="leading-relaxed bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
              Salam! How can we assist you with medicines, prescriptions, or home delivery today?
            </p>

            <a
              href={buildWhatsAppLink("Hello Niaz Medical Store, I want to inquire about medicines.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Start WhatsApp Chat</span>
            </a>

            <a
              href={`tel:${STORE_PHONE_LOCAL}`}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-xl border border-slate-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-sky-700" />
              <span>Call: {STORE_PHONE_LOCAL}</span>
            </a>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white py-3 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
        aria-label="WhatsApp quick contact button"
      >
        <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
        <span className="text-xs font-bold hidden sm:inline">Order on WhatsApp</span>
      </button>
    </aside>
  );
};
