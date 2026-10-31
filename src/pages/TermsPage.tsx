import React from 'react';
import { AlertCircle, FileCheck, ShieldAlert, Truck } from 'lucide-react';
import { PageId } from '../types/pharmacy';
import { STORE_LOCATION, STORE_PHONE_LOCAL } from '../utils/whatsapp';

export const TermsPage: React.FC<{ onNavigate: (page: PageId) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-slate-900 font-medium">Terms &amp; Conditions</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
          Terms &amp; Conditions of Service
        </h1>
        <p className="text-xs sm:text-base text-slate-600 mt-2 leading-relaxed">
          Standard terms governing online catalog browsing, medicine ordering, and home delivery with Niaz Medical Store.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Medical &amp; Clinical Disclaimer</h2>
          <p>
            The content, descriptions, and catalog items displayed on this website are provided strictly for general customer information. <strong>Niaz Medical Store does not offer medical diagnoses, treatment plans, or pharmaceutical consultations.</strong> Patients must consult their registered medical practitioner prior to initiating, altering, or terminating any pharmaceutical treatment.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Prescription Verification Requirement</h2>
          <p>
            Under drug regulatory standards in Pakistan, prescription-only medicines (Rx) cannot and will not be dispensed without a valid, legible prescription from a licensed medical professional. Submitting an order inquiry via WhatsApp is subject to mandatory pharmacist review. If a valid prescription cannot be verified, the prescription medication will be refused.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Nature of Online Inquiries &amp; Order Acceptance</h2>
          <p>
            Submitting a cart order or generating a WhatsApp message from this website constitutes an <strong>order inquiry</strong>. An order is formally accepted only after Niaz Medical Store confirms product availability, current official batch pricing, and delivery arrangements directly with the customer.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Sample Catalog Data Notice</h2>
          <p>
            Prices and inventories displayed online reflect sample catalog reference figures. Due to market updates and manufacturer pricing adjustments, exact batch prices will be stated during WhatsApp confirmation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">5. Cash on Delivery &amp; Medicine Return Policy</h2>
          <p>
            Due to strict pharmaceutical storage safety rules and risk of temperature contamination, <strong>medicines cannot be returned once delivered and unsealed</strong>, except in cases of store dispatch error or damaged packaging observed immediately upon delivery before the rider departs.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">6. Governing Jurisdiction</h2>
          <p>
            These terms are governed by the applicable laws of the Islamic Republic of Pakistan.
          </p>
        </section>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
          <p><strong>Niaz Medical Store</strong> · {STORE_LOCATION}</p>
          <p>Support / Contact: {STORE_PHONE_LOCAL}</p>
        </div>
      </div>
    </div>
  );
};
