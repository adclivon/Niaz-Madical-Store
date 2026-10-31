import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, FileText, ShoppingCart } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../data/sampleProducts';
import { Product } from '../types/pharmacy';
import { useCart } from '../context/CartContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const { addToCart } = useCart();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return SAMPLE_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.activeIngredient.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-sky-700 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search medicines, healthcare products, or brands..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 focus:outline-none placeholder:text-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-slate-900 bg-white border border-slate-200 rounded-lg shadow-xs cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              <p className="font-medium text-slate-700">Quick medicine suggestions:</p>
              <div className="flex flex-wrap gap-2 justify-center mt-3">
                {['Panadol', 'Augmentin', 'Surbex Z', 'CaC-1000', 'Thermometer', 'BP Monitor', 'First Aid'].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => setQuery(item)}
                      className="px-3 py-1 bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-600 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs space-y-2">
              <p className="font-semibold text-slate-800 text-sm">No medicines found for "{query}"</p>
              <p className="max-w-md mx-auto">
                Need a specific medicine not shown in our demo catalog? Contact Niaz Medical Store on WhatsApp directly at <strong className="font-mono text-slate-800">03197299209</strong> to check immediate in-store availability.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Found {results.length} matching products
              </span>
              {results.map((product) => (
                <div
                  key={product.id}
                  className="p-3 rounded-xl border border-slate-200 hover:border-sky-300 hover:bg-sky-50/40 transition-all flex items-center justify-between gap-3 group"
                >
                  <div
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-white shrink-0 border border-slate-200"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span className="truncate">{product.brand}</span>
                        {product.requiresPrescription && (
                          <span className="text-amber-700 font-semibold flex items-center gap-0.5">
                            <FileText className="w-2.5 h-2.5" /> Rx
                          </span>
                        )}
                        <span>·</span>
                        <span>{product.packSize}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-sky-700 truncate">
                        {product.name}
                      </h4>
                      <span className="text-xs font-mono font-bold text-slate-800">
                        Rs. {product.samplePricePKR.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="p-2 text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      title="Add to cart"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Add</span>
                    </button>
                    <button
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="p-2 text-slate-400 group-hover:text-sky-700 rounded-lg cursor-pointer"
                      title="View details"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
