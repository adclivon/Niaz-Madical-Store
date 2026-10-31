import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';

export const MedicalDisclaimerBanner: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="font-semibold">Medical Notice:</strong> Information provided is for informational purposes. Consult a licensed healthcare practitioner for medical diagnosis or treatment. Prescription medications strictly require a valid doctor’s prescription.
        </p>
      </div>
    );
  }

  return (
    <aside aria-label="Medical Safety and Disclaimer Notice" className="bg-gradient-to-r from-sky-50 via-slate-50 to-emerald-50 border border-slate-200 rounded-xl p-4 sm:p-5 my-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-sky-100 flex items-center justify-center text-sky-700 shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Responsible Pharmacy &amp; Patient Safety Notice
            </h4>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Niaz Medical Store does not diagnose medical conditions or alter physician treatment regimens. All prescription medications require verification of a legitimate doctor’s prescription prior to fulfillment. Always seek the advice of your physician regarding medical conditions or therapies.
            </p>
          </div>
        </div>
        <div className="text-xs text-slate-500 whitespace-nowrap self-end sm:self-center shrink-0">
          <span className="font-medium text-slate-700">Service Area:</span> 283 GB &amp; Mandi Rurala Road
        </div>
      </div>
    </aside>
  );
};
