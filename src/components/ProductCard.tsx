import React from 'react';
import { ShoppingCart, MessageCircle, Eye, ShieldCheck, FileText } from 'lucide-react';
import { Product } from '../types/pharmacy';
import { useCart } from '../context/CartContext';
import { buildWhatsAppLink, generateSingleProductWhatsAppMessage } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart, openQuickView } = useCart();

  const handleDetailsClick = () => {
    if (onViewDetails) {
      onViewDetails(product);
    } else {
      openQuickView(product);
    }
  };

  const whatsAppDirectUrl = buildWhatsAppLink(
    generateSingleProductWhatsAppMessage(product, 1)
  );

  return (
    <div className="group relative bg-white rounded-xl border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col h-full overflow-hidden">
      {/* Product Image Area */}
      <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
          loading="lazy"
        />

        {/* Prescription Tag / OTC Indicator */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          {product.requiresPrescription ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide bg-amber-500 text-white shadow-xs">
              <FileText className="w-3 h-3" />
              Rx Required
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium tracking-wide bg-slate-900/80 text-white backdrop-blur-xs">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              OTC
            </span>
          )}
        </div>

        {/* Quick View Floating Button */}
        <button
          onClick={handleDetailsClick}
          className="absolute top-2.5 right-2.5 p-1.5 bg-white/90 hover:bg-white text-slate-700 hover:text-sky-700 rounded-md shadow-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          title="View product details"
          aria-label={`View details for ${product.name}`}
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Card Content Area */}
      <div className="p-4 flex flex-col flex-1">
        {/* Brand & Pack metadata (clean unboxed text with typographic dot) */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
          <span className="truncate">{product.brand}</span>
          <span aria-hidden="true">·</span>
          <span className="shrink-0">{product.packSize}</span>
        </div>

        {/* Product Title */}
        <h3
          onClick={handleDetailsClick}
          className="text-base font-semibold text-slate-900 hover:text-sky-700 transition-colors line-clamp-1 cursor-pointer"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Short description */}
        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Pricing Area with Explicit Sample Data Label */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-baseline justify-between gap-2">
          <div>
            <div className="text-base font-bold text-slate-900 font-mono tabular-nums">
              Rs. {product.samplePricePKR.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-400 block font-normal">
              *Sample catalog price
            </span>
          </div>
          <span className="text-xs text-emerald-700 font-medium">In Stock</span>
        </div>

        {/* Actions Button Row */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          {/* Add to Cart */}
          <button
            onClick={() => addToCart(product, 1)}
            className="flex items-center justify-center gap-1.5 px-2.5 py-2 text-xs font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 active:bg-sky-200 border border-sky-200/80 rounded-lg transition-colors cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>

          {/* WhatsApp Direct Order Button */}
          <a
            href={whatsAppDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-2.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg transition-colors cursor-pointer shadow-xs"
            title="Order directly on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
