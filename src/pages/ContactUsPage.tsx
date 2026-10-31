import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, Clock, CheckCircle } from 'lucide-react';
import { PageId } from '../types/pharmacy';
import {
  STORE_EMAIL,
  STORE_LOCATION,
  STORE_PHONE_LOCAL,
  buildWhatsAppLink,
} from '../utils/whatsapp';

export const ContactUsPage: React.FC<{ onNavigate: (page: PageId) => void }> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Medicine Availability');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullMsg = `*INQUIRY FROM WEBSITE - NIAZ MEDICAL STORE*
• Name: ${name}
• Phone: ${phone || 'Not provided'}
• Subject: ${subject}
• Message: ${message}`;

    window.open(buildWhatsAppLink(fullMsg), '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-slate-900 font-medium">Contact Us</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
          Contact Niaz Medical Store
        </h1>
        <p className="text-xs sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
          We are here to answer your medicine inquiries, verify prescription availability, and coordinate home delivery around 283 GB, Mandi Rurala Road.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Details Cards */}
        <div className="lg:col-span-5 space-y-4">
          {/* Phone Card */}
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-slate-500">Phone Support</span>
                <h3 className="text-base font-bold text-slate-900">Direct Call</h3>
              </div>
            </div>
            <p className="text-xs text-slate-600">
              Speak directly with our store team for urgent medicine checks.
            </p>
            <div className="pt-1">
              <a
                href={`tel:${STORE_PHONE_LOCAL}`}
                className="inline-flex items-center gap-2 text-sm font-bold font-mono text-sky-700 hover:text-sky-900 hover:underline"
              >
                <span>{STORE_PHONE_LOCAL}</span>
                <span className="text-xs font-sans font-normal">(Tap to Call)</span>
              </a>
            </div>
          </div>

          {/* WhatsApp Card */}
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-slate-500">WhatsApp Messaging</span>
                <h3 className="text-base font-bold text-slate-900">Fastest Response</h3>
              </div>
            </div>
            <p className="text-xs text-slate-600">
              Send prescription photos, medicine lists, or check delivery charges.
            </p>
            <div className="pt-1">
              <a
                href={buildWhatsAppLink("Hello Niaz Medical Store, I want to inquire about medicines.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 py-1.5 px-3 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on 03197299209</span>
              </a>
            </div>
          </div>

          {/* Email Card */}
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-slate-500">Email Inquiries</span>
                <h3 className="text-base font-bold text-slate-900">Official Email</h3>
              </div>
            </div>
            <p className="text-xs text-slate-600">
              For business, supplier, or general non-urgent customer inquiries.
            </p>
            <div className="pt-1">
              <a
                href={`mailto:${STORE_EMAIL}`}
                className="text-xs font-bold text-slate-800 hover:text-sky-700 hover:underline break-all"
              >
                {STORE_EMAIL}
              </a>
            </div>
          </div>

          {/* Location Card */}
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-slate-500">Physical Address</span>
                <h3 className="text-base font-bold text-slate-900">Store Location</h3>
              </div>
            </div>
            <p className="text-xs text-slate-700 font-medium">
              {STORE_LOCATION}
            </p>
            <p className="text-[11px] text-slate-500">
              Serving 283 GB, Mandi Rurala Road, and neighboring villages.
            </p>
          </div>
        </div>

        {/* Right: Interactive Message Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            Send an Online Inquiry
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Fill in your details below. Your message will be formatted directly for instant resolution via WhatsApp or email.
          </p>

          {submitted && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block">Inquiry Form Handled!</strong>
                <p className="mt-0.5">Your message has been initiated. If your WhatsApp window did not open, you can message us directly at <strong>03197299209</strong>.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tayyab"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone / WhatsApp Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 03197299209"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-900 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Inquiry Topic
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 cursor-pointer"
              >
                <option value="Medicine Availability">Medicine Availability Check</option>
                <option value="Home Delivery Timing">Home Delivery Timing &amp; Charges</option>
                <option value="Prescription Verification">Doctor Prescription Question</option>
                <option value="Medical Equipment Inquiry">Medical Equipment / BP Monitor / Meter</option>
                <option value="General Question">General Store Question</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Message / Required Medicines <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Mention medicine name, tablet count, dosage, or delivery location details..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-900 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send via WhatsApp to Niaz Medical Store</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
