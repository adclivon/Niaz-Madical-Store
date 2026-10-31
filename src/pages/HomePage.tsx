import React, { useState } from 'react';
import {
  Search,
  MessageCircle,
  Truck,
  ShieldCheck,
  HeartPulse,
  Clock,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  FileText,
  CheckCircle2,
  PackageCheck,
  AlertCircle,
} from 'lucide-react';
import { PageId, Product } from '../types/pharmacy';
import { STORE_CATEGORIES } from '../data/categories';
import { SAMPLE_PRODUCTS } from '../data/sampleProducts';
import { ProductCard } from '../components/ProductCard';
import { MedicalDisclaimerBanner } from '../components/MedicalDisclaimerBanner';
import {
  STORE_EMAIL,
  STORE_LOCATION,
  STORE_PHONE_LOCAL,
  buildWhatsAppLink,
} from '../utils/whatsapp';
import { useCart } from '../context/CartContext';

interface HomePageProps {
  onNavigate: (page: PageId, categorySlug?: string) => void;
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenSearch }) => {
  const { openPrescriptionModal } = useCart();
  const [homeSearchQuery, setHomeSearchQuery] = useState('');

  const featuredProducts = SAMPLE_PRODUCTS.filter((p) => p.featured).slice(0, 8);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (homeSearchQuery.trim()) {
      onNavigate('shop');
    } else {
      onOpenSearch();
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* C. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Trust Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Serving 283 GB, Mandi Rurala Road &amp; Surrounding Areas</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Your Trusted Medical Store,{' '}
                <span className="text-sky-700">Now Just a Click Away</span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                Order medicines and healthcare essentials conveniently from Niaz Medical Store. Contact us for medicine availability and home delivery in our service area.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('shop')}
                  className="px-6 py-3.5 text-sm font-bold text-white bg-sky-700 hover:bg-sky-800 active:bg-sky-900 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Shop Medicines</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={buildWhatsAppLink("Hello Niaz Medical Store, I would like to order medicines for home delivery.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order on WhatsApp</span>
                </a>

                <button
                  onClick={openPrescriptionModal}
                  className="px-5 py-3.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-sky-700" />
                  <span>Send Prescription</span>
                </button>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-left">
                <div>
                  <span className="block text-xs font-bold text-slate-900">Local Delivery</span>
                  <span className="text-[11px] text-slate-500">283 GB &amp; Mandi Rurala</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-900">Prescription Safety</span>
                  <span className="text-[11px] text-slate-500">Verified by store</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-900">Direct WhatsApp</span>
                  <span className="text-[11px] text-slate-500">Instant communication</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Fidelity Healthcare Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
                <img
                  src="/src/assets/images/hero_pharmacy_counter_1793430597030.jpg"
                  alt="Niaz Medical Store Interior Counter"
                  className="w-full h-80 sm:h-96 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Neighborhood Healthcare
                    </span>
                    <h3 className="text-base font-bold">Niaz Medical Store</h3>
                    <p className="text-xs text-slate-200 leading-snug">
                      Making genuine medicines and essential care products easily accessible in 283 GB.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* D. Prominent Search Medicines Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4 sm:p-6">
          <form onSubmit={handleSearchSubmit} className="space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Search Medicines &amp; Healthcare Essentials
            </label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div
                onClick={onOpenSearch}
                className="relative flex-1 flex items-center bg-slate-50 border border-slate-300 hover:border-sky-500 rounded-xl px-4 py-3 cursor-text transition-colors"
              >
                <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
                <span className="text-sm text-slate-400 select-none truncate">
                  Search medicines, healthcare products, or brands...
                </span>
              </div>
              <button
                type="button"
                onClick={onOpenSearch}
                className="px-6 py-3 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search Catalog</span>
              </button>
            </div>

            {/* Quick search shortcuts */}
            <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap pt-1">
              <span className="font-medium text-slate-700">Quick Searches:</span>
              {[
                { name: 'Panadol', slug: 'over-the-counter' },
                { name: 'Augmentin', slug: 'prescription-medicines' },
                { name: 'Vitamins', slug: 'vitamins-supplements' },
                { name: 'First Aid Kit', slug: 'first-aid' },
                { name: 'Thermometer', slug: 'medical-equipment' },
                { name: 'Blood Pressure Monitor', slug: 'medical-equipment' },
              ].map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => onNavigate('shop', item.slug)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-sky-50 hover:text-sky-700 rounded-md text-[11px] font-medium text-slate-600 transition-colors cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </form>
        </div>
      </section>

      {/* Medical Safety Disclaimer Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MedicalDisclaimerBanner />
      </div>

      {/* E. Shop by Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
              Department Catalog
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Shop by Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Browse our legally permitted healthcare departments. Prescription medicines strictly require prescription verification before order acceptance.
            </p>
          </div>
          <button
            onClick={() => onNavigate('categories')}
            className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {STORE_CATEGORIES.map((category) => (
            <div
              key={category.id}
              onClick={() => onNavigate('shop', category.slug)}
              className="group p-5 bg-white border border-slate-200/90 hover:border-sky-400 rounded-2xl shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-sky-50 group-hover:bg-sky-100 text-sky-700 flex items-center justify-center transition-colors mb-4">
                  {category.isPrescriptionCategory ? (
                    <FileText className="w-5 h-5 text-amber-600" />
                  ) : (
                    <HeartPulse className="w-5 h-5 text-sky-700" />
                  )}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {category.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono">{category.itemCount}+ products</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-700 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* F. Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
              In-Stock Essentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Featured Medicines &amp; Healthcare Products
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Preview our common store offerings. Prices shown are illustrative sample catalog estimates; Niaz Medical Store confirms current batch price &amp; availability upon WhatsApp inquiry.
            </p>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>See Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* G. Why Choose Niaz Medical Store? */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
              Our Service Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Why Choose Niaz Medical Store?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Serving the 283 GB &amp; Mandi Rurala Road community with dedicated neighborhood customer service and responsible medicine dispensing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Convenient Online Ordering',
                description:
                  'Easily browse medicines from your phone, add items to your cart, or upload your doctor’s prescription from the comfort of your home.',
                icon: HeartPulse,
              },
              {
                title: 'Friendly Customer Support',
                description:
                  'We take time to assist each customer, answer questions on medicine availability, and provide respectful community care.',
                icon: ShieldCheck,
              },
              {
                title: 'Local Home Delivery',
                description:
                  'Fast, direct medicine delivery right to your door in 283 GB, Mandi Rurala Road, and surrounding rural neighborhoods.',
                icon: Truck,
              },
              {
                title: 'Easy WhatsApp Communication',
                description:
                  'Direct connection with our store at 03197299209. Ask questions, send prescription slips, and receive immediate assistance.',
                icon: MessageCircle,
              },
              {
                title: 'Customer Convenience',
                description:
                  'No unnecessary pharmacy queues. Simply confirm your requirements on WhatsApp, and we coordinate swift doorstep delivery.',
                icon: Clock,
              },
              {
                title: 'Careful Order Handling',
                description:
                  'Medicines are stored under proper conditions, checked for clean packaging and expiry dates, and delivered safely.',
                icon: PackageCheck,
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{feature.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* H. How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
            Simple 4-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            How It Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Ordering medicines for home delivery around 283 GB, Mandi Rurala Road is straightforward.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Browse or Search',
              desc: 'Find the medicine, healthcare product, or medical equipment you need using our search or category catalog.',
            },
            {
              step: '02',
              title: 'Select Required Products',
              desc: 'Add items to your cart, or click "Send Prescription" if you have a written prescription slip from your doctor.',
            },
            {
              step: '03',
              title: 'Confirm Order on WhatsApp',
              desc: 'Submit your delivery address. Our store team reviews the order, verifies prescription validity, and confirms exact pricing.',
            },
            {
              step: '04',
              title: 'Doorstep Delivery',
              desc: 'Receive your packaged healthcare essentials at your door in 283 GB area. Inspect medicines and pay Cash on Delivery.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="relative p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl font-black font-mono text-sky-200 mb-3 block">
                  {item.step}
                </span>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs text-emerald-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                <span>Step {item.step} Completed</span>
              </div>
            </div>
          ))}
        </div>

        {/* Prescription Verification Reminder */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold text-sm block">Prescription Verification Requirement:</strong>
            <p className="mt-1 leading-relaxed">
              In accordance with pharmacy and medicine safety standards, prescription-only medicines (Rx) cannot be dispatched without prior verification of a valid doctor's prescription. You can take a clear picture of the prescription and send it directly via WhatsApp to 03197299209.
            </p>
          </div>
        </div>
      </section>

      {/* I. Home Delivery Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-sky-900 to-slate-900 rounded-3xl text-white overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="p-8 sm:p-12 lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-800/80 text-sky-200 rounded-md text-xs font-semibold">
                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                Local Neighborhood Delivery
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Healthcare Essentials Delivered to Your Doorstep
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Serving customers around 283 GB, Mandi Rurala Road, and adjoining areas. Contact Niaz Medical Store to confirm delivery availability, any nominal delivery charges, and the estimated arrival time at your specific address.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Coverage: 283 GB &amp; Mandi Rurala Road</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Cash on Delivery (COD) supported</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Careful, hygienic packaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Live order updates via WhatsApp</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href={buildWhatsAppLink("Hello Niaz Medical Store, what are the delivery charges and timings for my location near 283 GB?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Inquire Delivery for Your Area</span>
                </a>

                <button
                  onClick={() => onNavigate('delivery')}
                  className="px-4 py-3 text-xs font-semibold text-sky-200 hover:text-white transition-colors"
                >
                  Read Delivery Policy &rarr;
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 lg:p-8 flex items-center justify-center">
              <img
                src="/src/assets/images/delivery_healthcare_package_1793430598246.jpg"
                alt="Medicine Home Delivery Packaging"
                className="rounded-2xl shadow-xl w-full max-h-80 object-cover border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* J. Customer Support Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                Direct Contact
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                Need Help with Medicines?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Reach out directly to Niaz Medical Store. We are ready to assist you with order inquiries, product availability, or directions.
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* WhatsApp Card */}
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 flex flex-col justify-between">
                <div>
                  <MessageCircle className="w-5 h-5 text-emerald-600 mb-2" />
                  <h4 className="text-xs font-bold text-slate-900">WhatsApp Support</h4>
                  <p className="text-xs font-mono font-semibold text-emerald-800 mt-1">
                    {STORE_PHONE_LOCAL}
                  </p>
                </div>
                <a
                  href={buildWhatsAppLink("Hello Niaz Medical Store, I need assistance.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  <span>Chat Now</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>

              {/* Call Card */}
              <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-200 flex flex-col justify-between">
                <div>
                  <Phone className="w-5 h-5 text-sky-600 mb-2" />
                  <h4 className="text-xs font-bold text-slate-900">Direct Phone Call</h4>
                  <p className="text-xs font-mono font-semibold text-sky-800 mt-1">
                    {STORE_PHONE_LOCAL}
                  </p>
                </div>
                <a
                  href={`tel:${STORE_PHONE_LOCAL}`}
                  className="mt-3 text-xs font-bold text-sky-700 hover:underline flex items-center gap-1"
                >
                  <span>Call Store</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <MapPin className="w-5 h-5 text-slate-600 mb-2" />
                  <h4 className="text-xs font-bold text-slate-900">Physical Location</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    {STORE_LOCATION}
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('contact')}
                  className="mt-3 text-xs font-bold text-slate-700 hover:underline flex items-center gap-1 text-left cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
