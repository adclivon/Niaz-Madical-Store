import React, { useState } from 'react';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';
import { PageId } from '../types/pharmacy';
import { STORE_LOCATION, STORE_PHONE_LOCAL, buildWhatsAppLink } from '../utils/whatsapp';

export const FaqPage: React.FC<{ onNavigate: (page: PageId) => void }> = ({ onNavigate }) => {
  const faqs = [
    {
      q: 'Do I need a prescription to order medicines from Niaz Medical Store?',
      a: 'For Over-the-Counter (OTC) items like common paracetamol, antacids, multivitamins, and first aid supplies, no prescription is required. However, for prescription medicines (Rx) such as antibiotics, chronic cardiac, blood pressure, or diabetes medications, a legitimate doctor’s prescription must be verified by our store team before dispensing.',
    },
    {
      q: 'Which areas do you deliver to around Mandi Rurala Road?',
      a: 'Our primary delivery zone covers 283 GB, Mandi Rurala Road, and nearby connected chaks and village settlements. If you are located further along Rurala Road, please WhatsApp us at 03197299209 with your location to confirm rider reachability.',
    },
    {
      q: 'How does payment work?',
      a: 'We operate on Cash on Delivery (COD). You inspect your sealed medication package upon delivery and pay the delivery rider in cash.',
    },
    {
      q: 'Are the prices listed on this website final?',
      a: 'The prices and items currently displayed are illustrative sample catalog listings. Because pharmaceutical batch prices frequently change under DRAP / manufacturer regulations in Pakistan, Niaz Medical Store confirms the exact current batch price and stock availability with you directly on WhatsApp before your order is finalized.',
    },
    {
      q: 'How do I send my doctor prescription?',
      a: 'You can simply take a clear photo of your prescription slip using your smartphone and send it to our WhatsApp number 03197299209. You can also use the "Send Prescription" button on this website to pre-fill your patient name and delivery address.',
    },
    {
      q: 'What if a medicine I urgently need is not listed in the catalog?',
      a: 'Our physical store carries a broad inventory. If an item is not shown in the online demo list, simply message us on WhatsApp with the brand name or generic salt. If in stock, we will pack and dispatch it promptly.',
    },
    {
      q: 'How is medicine quality and temperature maintained during transit?',
      a: 'All pharmaceuticals are stored under regulated room conditions. When dispatched for delivery, items are enclosed in protective, tamper-evident packaging to safeguard them from heat, dust, and handling damage.',
    },
    {
      q: 'Can you recommend medicines for my medical symptoms?',
      a: 'No. In adherence to patient safety and pharmacy ethics, Niaz Medical Store does not diagnose medical conditions or prescribe medications for specific symptoms. We strongly advise all customers to consult a qualified medical doctor or healthcare practitioner for clinical diagnoses and treatment plans.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-slate-900 font-medium">Frequently Asked Questions</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-base text-slate-600 mt-2 leading-relaxed">
          Helpful answers regarding medicine ordering, prescriptions, local home delivery, and payment at Niaz Medical Store (283 GB, Mandi Rurala Road).
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base font-bold text-slate-900">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-sky-700' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/30">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* WhatsApp Help CTA */}
      <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-emerald-950">Have a different question?</h3>
            <p className="text-xs text-emerald-800">
              Message Niaz Medical Store directly on WhatsApp for quick personal assistance.
            </p>
          </div>
        </div>

        <a
          href={buildWhatsAppLink("Hello Niaz Medical Store, I have a question regarding an order.")}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Ask on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
