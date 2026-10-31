import React, { useState, useMemo } from 'react';
import { Search, Filter, FileText, CheckCircle2, RotateCcw } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../data/sampleProducts';
import { STORE_CATEGORIES } from '../data/categories';
import { CategorySlug, Product } from '../types/pharmacy';
import { ProductCard } from '../components/ProductCard';
import { MedicalDisclaimerBanner } from '../components/MedicalDisclaimerBanner';

interface ShopPageProps {
  initialCategory?: string;
  onSelectProduct?: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory,
  onSelectProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [rxFilter, setRxFilter] = useState<'all' | 'rx' | 'otc'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc'>('name');

  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.categorySlug !== selectedCategory) {
        return false;
      }
      // Rx filter
      if (rxFilter === 'rx' && !product.requiresPrescription) return false;
      if (rxFilter === 'otc' && product.requiresPrescription) return false;

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesIngredient = product.activeIngredient.toLowerCase().includes(q);
        const matchesCategory = product.categoryName.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesIngredient && !matchesCategory) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.samplePricePKR - b.samplePricePKR;
      if (sortBy === 'price-desc') return b.samplePricePKR - a.samplePricePKR;
      return a.name.localeCompare(b.name);
    });
  }, [selectedCategory, rxFilter, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setRxFilter('all');
    setSearchQuery('');
    setSortBy('name');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Title & Breadcrumb Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <span>Home</span>
          <span>/</span>
          <span className="text-slate-900 font-medium">Shop Medicines</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Shop Medicines &amp; Healthcare Essentials
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Order genuine medicines, vitamins, medical equipment, and healthcare supplies for home delivery in 283 GB &amp; Mandi Rurala Road.
        </p>
      </div>

      {/* Safety Notice */}
      <MedicalDisclaimerBanner compact />

      {/* Search & Filter Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by medicine, brand, or formula..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
            />
          </div>

          {/* Rx / OTC Filter Segmented Control */}
          <div className="md:col-span-3 flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setRxFilter('all')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                rxFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setRxFilter('otc')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                rxFilter === 'otc'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              OTC Only
            </button>
            <button
              onClick={() => setRxFilter('rx')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                rxFilter === 'rx'
                  ? 'bg-white text-amber-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Rx Only
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2.5 px-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-700 font-medium cursor-pointer"
            >
              <option value="name">Sort by: Name (A to Z)</option>
              <option value="price-asc">Sort by: Price (Low to High)</option>
              <option value="price-desc">Sort by: Price (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Category Filter Chips / Buttons */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
              selectedCategory === 'all'
                ? 'bg-sky-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            All Categories ({SAMPLE_PRODUCTS.length})
          </button>
          {STORE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-sky-700 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-slate-500">
            Showing {filteredProducts.length} medicines &amp; healthcare products
          </span>

          {(selectedCategory !== 'all' || rxFilter !== 'all' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-sky-700 hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset filters</span>
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <p className="text-base font-bold text-slate-800">No matching medicines found</p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              We carry a wide variety of medicines at Niaz Medical Store in 283 GB. If you do not see the specific medicine listed here, please message our store team on WhatsApp.
            </p>
            <div className="pt-2">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 text-xs font-bold text-sky-700 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onSelectProduct}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
