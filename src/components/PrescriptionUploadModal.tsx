import React, { useState } from 'react';
import { X, FileText, MessageCircle, ShieldCheck, Camera, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import {
  buildWhatsAppLink,
  generatePrescriptionInquiryWhatsAppMessage,
  STORE_PHONE_LOCAL,
} from '../utils/whatsapp';

export const PrescriptionUploadModal: React.FC = () => {
  const { isPrescriptionModalOpen, closePrescriptionModal } = useCart();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('283 GB, Mandi Rurala Road');
  const [notes, setNotes] = useState('');
  const [photoSelected, setPhotoSelected] = useState(false);
  const [fileName, setFileName] = useState('');

  if (!isPrescriptionModalOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhotoSelected(true);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const message = generatePrescriptionInquiryWhatsAppMessage(
      name || 'Customer',
      phone || 'Not provided',
      address,
      notes + (fileName ? ` (Attaching prescription photo: ${fileName})` : '')
    );
    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer');
    closePrescriptionModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rx-modal-title"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-700">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 id="rx-modal-title" className="text-base font-bold text-slate-900">
                Order with Doctor's Prescription
              </h2>
              <span className="text-xs text-slate-500">
                Niaz Medical Store · Confidential Verification
              </span>
            </div>
          </div>
          <button
            onClick={closePrescriptionModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
            aria-label="Close prescription modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSendToWhatsApp} className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Privacy & Safety Guarantee */}
          <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-900 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Private &amp; Confidential:</strong> Prescriptions are reviewed solely by the authorized medical store staff. Send your prescription photo directly via encrypted WhatsApp to <strong className="font-mono">{STORE_PHONE_LOCAL}</strong>.
            </p>
          </div>

          {/* Step 1: Attach Photo */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Select or Take Prescription Photo
            </label>
            <label className="border-2 border-dashed border-slate-300 hover:border-sky-500 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-slate-50/50 hover:bg-sky-50/30">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-sky-600 border border-slate-200">
                {photoSelected ? <Check className="w-5 h-5 text-emerald-600" /> : <Camera className="w-5 h-5" />}
              </div>
              <div className="text-center">
                <span className="text-xs font-semibold text-slate-800">
                  {photoSelected ? `Attached: ${fileName}` : 'Tap to take photo or choose image'}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Make sure doctor's name, patient name, and medicines are legible.
                </span>
              </div>
            </label>
          </div>

          {/* Patient / Customer Name */}
          <div>
            <label htmlFor="rx-name" className="block text-xs font-semibold text-slate-700 mb-1">
              Patient / Contact Name <span className="text-red-500">*</span>
            </label>
            <input
              id="rx-name"
              type="text"
              required
              placeholder="e.g. Muhammad Tayyab"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-900"
            />
          </div>

          {/* Contact Phone */}
          <div>
            <label htmlFor="rx-phone" className="block text-xs font-semibold text-slate-700 mb-1">
              Contact Phone / WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              id="rx-phone"
              type="tel"
              required
              placeholder="e.g. 03197299209"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-900 font-mono"
            />
          </div>

          {/* Delivery Address */}
          <div>
            <label htmlFor="rx-address" className="block text-xs font-semibold text-slate-700 mb-1">
              Delivery Address in 283 GB &amp; Mandi Rurala Road
            </label>
            <input
              id="rx-address"
              type="text"
              placeholder="Address / Area in 283 GB, Mandi Rurala Road"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-900"
            />
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="rx-notes" className="block text-xs font-semibold text-slate-700 mb-1">
              Specific Instructions or Days of Supply needed (Optional)
            </label>
            <input
              id="rx-notes"
              type="text"
              placeholder="e.g. 1 week dose, brand preference, or syrup bottle"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-900"
            />
          </div>

          {/* Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Prescription to WhatsApp (03197299209)</span>
            </button>
            <span className="text-[11px] text-slate-400 text-center block mt-2">
              Attach the picture directly inside the WhatsApp conversation window.
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
