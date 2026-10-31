import React from 'react';
import { ShieldCheck, Lock, EyeOff, UserCheck } from 'lucide-react';
import { PageId } from '../types/pharmacy';
import { STORE_EMAIL, STORE_LOCATION, STORE_PHONE_LOCAL } from '../utils/whatsapp';

export const PrivacyPolicyPage: React.FC<{ onNavigate: (page: PageId) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-slate-900 font-medium">Privacy Policy</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-base text-slate-600 mt-2 leading-relaxed">
          How Niaz Medical Store protects customer personal data and doctor prescription confidentiality.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Commitment to Patient Confidentiality</h2>
          <p>
            At <strong>Niaz Medical Store</strong> (283 GB, Mandi Rurala Road, Pakistan), we recognize that medical conditions, prescription information, and personal delivery details are sensitive matters. We are committed to maintaining the highest standards of discretion and patient confidentiality in accordance with Pakistani healthcare ethics and applicable data protection regulations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Information We Collect</h2>
          <p>When you contact us, place an order inquiry, or submit a prescription, we may collect:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Customer name and contact phone / WhatsApp number.</li>
            <li>Delivery address and local landmarks in 283 GB and Mandi Rurala Road area.</li>
            <li>Photographs or scans of medical prescriptions shared for medication verification.</li>
            <li>Order history and customer service correspondence.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Safe Handling of Doctor Prescriptions</h2>
          <p>
            Prescriptions shared with Niaz Medical Store are examined solely by authorized store staff for the explicit purpose of verifying medication identity, dosage, physician information, and safe fulfillment. We strictly prohibit the public exposure, indexing, or commercial sharing of patient prescriptions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Third-Party Disclosures</h2>
          <p>
            We do not sell, rent, or trade your personal or health data to third-party marketing brokers. Your contact and delivery details are only shared with our designated delivery personnel to accomplish doorstep delivery.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">5. Contact Information</h2>
          <p>For any privacy inquiries or to request deletion of your contact records, please contact:</p>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 space-y-1">
            <p><strong>Niaz Medical Store</strong></p>
            <p>Location: {STORE_LOCATION}</p>
            <p>Phone / WhatsApp: {STORE_PHONE_LOCAL}</p>
            <p>Email: {STORE_EMAIL}</p>
          </div>
        </section>

        <p className="text-[11px] text-slate-400 pt-4 border-t border-slate-100">
          Last revised: October 2026. Updates will be posted on this page.
        </p>
      </div>
    </div>
  );
};
