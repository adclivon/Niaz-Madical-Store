import React from 'react';
import { Stethoscope, HeartPulse, Sparkles, Cross, Baby, Activity, ArrowRight, ShieldCheck } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../data/sampleProducts';
import { Product, PageId } from '../types/pharmacy';
import { ProductCard } from '../components/ProductCard';

interface HealthcarePageProps {
  onNavigate: (page: PageId, slug?: string) => void;
  onSelectProduct?: (product: Product) => void;
}

export const HealthcarePage: React.FC<HealthcarePageProps> = ({
  onNavigate,
  onSelectProduct,
}) => {
  const healthcareProducts = SAMPLE_PRODUCTS.filter(
    (p) => p.isHealthcareProduct || !p.requiresPrescription
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-slate-900 font-medium">Healthcare Products</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Healthcare Products &amp; Medical Devices
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Non-prescription wellness essentials, daily diagnostic monitors, baby nutrition items, and first aid supplies readily available for home delivery in 283 GB, Mandi Rurala Road.
        </p>
      </div>

      {/* Featured Department Banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gradient-to-br from-sky-50 to-blue-100/60 rounded-2xl border border-sky-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-white shadow-xs text-sky-700 flex items-center justify-center mb-4">
              <Stethoscope className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Diagnostic Monitors</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Blood pressure monitors, clinical fever thermometers, and blood sugar meters for routine home vital tracking.
            </p>
          </div>
          <button
            onClick={() => onNavigate('shop', 'medical-equipment')}
            className="mt-4 text-xs font-bold text-sky-800 hover:text-sky-950 flex items-center gap-1"
          >
            <span>Explore Monitors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-100/60 rounded-2xl border border-emerald-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-white shadow-xs text-emerald-700 flex items-center justify-center mb-4">
              <Cross className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">First Aid &amp; Wound Care</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Antiseptic washes, sterile gauze dressings, burn dressings, and crepe bandages for home emergency readiness.
            </p>
          </div>
          <button
            onClick={() => onNavigate('shop', 'first-aid')}
            className="mt-4 text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
          >
            <span>Explore First Aid</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-100/60 rounded-2xl border border-indigo-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-white shadow-xs text-indigo-700 flex items-center justify-center mb-4">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Vitamins &amp; Nutrition</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Quality daily multivitamins, calcium supplements, zinc complexes, and immunity formulas from reputable brands.
            </p>
          </div>
          <button
            onClick={() => onNavigate('shop', 'vitamins-supplements')}
            className="mt-4 text-xs font-bold text-indigo-800 hover:text-indigo-950 flex items-center gap-1"
          >
            <span>Explore Vitamins</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Healthcare &amp; Daily Essentials Catalog
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Available for immediate direct purchase and home delivery without a doctor prescription.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">
            {healthcareProducts.length} items available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {healthcareProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
