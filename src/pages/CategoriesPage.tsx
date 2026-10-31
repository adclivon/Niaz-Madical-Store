import React from 'react';
import {
  FileText,
  ShieldCheck,
  HeartPulse,
  Sparkles,
  Baby,
  Cross,
  Stethoscope,
  Activity,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { STORE_CATEGORIES } from '../data/categories';
import { PageId } from '../types/pharmacy';
import { MedicalDisclaimerBanner } from '../components/MedicalDisclaimerBanner';

interface CategoriesPageProps {
  onSelectCategory: (slug: string) => void;
  onNavigate: (page: PageId) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  onSelectCategory,
  onNavigate,
}) => {
  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'prescription-medicines':
        return <FileText className="w-6 h-6 text-amber-600" />;
      case 'over-the-counter':
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case 'vitamins-supplements':
        return <HeartPulse className="w-6 h-6 text-sky-600" />;
      case 'personal-care':
        return <Sparkles className="w-6 h-6 text-indigo-600" />;
      case 'baby-care':
        return <Baby className="w-6 h-6 text-pink-600" />;
      case 'first-aid':
        return <Cross className="w-6 h-6 text-red-600" />;
      case 'medical-equipment':
        return <Stethoscope className="w-6 h-6 text-teal-600" />;
      case 'healthcare-essentials':
      default:
        return <Activity className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-slate-900 font-medium">Medicine Categories</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Medicine &amp; Healthcare Categories
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Explore our organized pharmacy departments at Niaz Medical Store. Each department is managed with careful handling and strict adherence to medicine safety protocols.
        </p>
      </div>

      <MedicalDisclaimerBanner />

      {/* Categories Detailed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {STORE_CATEGORIES.map((category) => (
          <div
            key={category.id}
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                  {getCategoryIcon(category.slug)}
                </div>
                {category.isPrescriptionCategory && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Doctor Prescription Required
                  </span>
                )}
              </div>

              <h2 className="text-lg font-bold text-slate-900">{category.name}</h2>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {category.description}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <p>
                  <strong>Compliance:</strong>{' '}
                  {category.isPrescriptionCategory
                    ? 'Only dispensed against legitimate doctor prescription under store pharmacist verification.'
                    : 'Over-the-counter and general healthcare essentials for direct home delivery.'}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                {category.itemCount}+ products listed
              </span>
              <button
                onClick={() => onSelectCategory(category.slug)}
                className="px-4 py-2 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
