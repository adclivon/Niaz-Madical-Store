import React from 'react';
import { Phone, MessageCircle, MapPin } from 'lucide-react';
import { STORE_PHONE_LOCAL, STORE_LOCATION, buildWhatsAppLink } from '../utils/whatsapp';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-sky-900 text-white text-xs py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        {/* Core Tagline */}
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <span className="font-semibold text-emerald-300">Your Local Medical Store</span>
          <span className="text-sky-300 hidden sm:inline">|</span>
          <span className="text-slate-200">Convenient Medicine Ordering &amp; Home Delivery</span>
        </div>

        {/* Quick Contact & Verified Location Strip */}
        <div className="flex items-center gap-4 text-slate-200 flex-wrap justify-center">
          <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{STORE_LOCATION}</span>
          </div>

          <a
            href={`tel:${STORE_PHONE_LOCAL}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors py-0.5 px-2 rounded hover:bg-white/10"
            title="Call Niaz Medical Store"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-medium font-mono tabular-nums">{STORE_PHONE_LOCAL}</span>
          </a>

          <a
            href={buildWhatsAppLink("Hello Niaz Medical Store, I want to check medicine availability.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 font-semibold transition-colors py-0.5 px-2 rounded bg-emerald-500/20 hover:bg-emerald-500/30"
          >
            <MessageCircle className="w-3.5 h-3.5 shrink-0" />
            <span>WhatsApp Order</span>
          </a>
        </div>
      </div>
    </div>
  );
};
