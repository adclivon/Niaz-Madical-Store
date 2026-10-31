import React, { useState } from 'react';
import { X, ShoppingCart, MessageCircle, FileText, CheckCircle2, ShieldCheck, Thermometer, Info } from 'lucide-react';
import { Product } from '../types/pharmacy';
import { useCart } from '../context/CartContext';
import { buildWhatsAppLink, generateSingleProductWhatsAppMessage, STORE_PHONE_LOCAL } from '../utils/whatsapp';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const whatsAppOrderUrl = buildWhatsAppLink(
    generateSingleProductWhatsAppMessage(product, quantity)
  );

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-500 hover:text-slate-900 bg-white/90 hover:bg-white rounded-full shadow-xs transition-colors cursor-pointer"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative bg-slate-100 flex items-center justify-center min-h-[260px] md:min-h-full">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center max-h-[380px]"
            />
            {product.requiresPrescription ? (
              <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded shadow-xs flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Prescription Required
              </div>
            ) : (
              <div className="absolute top-4 left-4 bg-slate-900/80 text-white text-xs font-medium px-2.5 py-1 rounded shadow-xs flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Over-the-Counter (OTC)
              </div>
            )}
          </div>

          {/* Details Content */}
          <div className="p-6 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Brand & Category */}
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-medium text-slate-700">{product.brand}</span>
                <span aria-hidden="true">·</span>
                <span>{product.categoryName}</span>
              </div>

              {/* Title */}
              <h2 id="modal-product-title" className="text-xl font-bold text-slate-900 mt-1">
                {product.name}
              </h2>

              {/* Active Ingredient & Pack */}
              <div className="mt-3 space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">Active Formula:</span>
                  <span className="font-medium text-slate-800 text-right">{product.activeIngredient}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dosage Form:</span>
                  <span className="font-medium text-slate-800">{product.dosageForm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Packaging:</span>
                  <span className="font-medium text-slate-800">{product.packSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Availability:</span>
                  <span className="font-semibold text-emerald-700">Verified at Store</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Prescription Warning if applicable */}
              {product.requiresPrescription && (
                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold">Prescription Verification Required:</strong>
                    <p className="mt-0.5">
                      This medicine requires a valid prescription from a licensed physician. You can share your prescription photo via WhatsApp or present it during delivery in 283 GB.
                    </p>
                  </div>
                </div>
              )}

              {/* Usage & Storage Notes */}
              <div className="mt-3 space-y-2 text-xs text-slate-500">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                  <span><strong>Instructions:</strong> {product.usageGuidelines}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Thermometer className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span><strong>Storage:</strong> {product.storageInstructions}</span>
                </div>
              </div>

              {/* Price & Sample Label */}
              <div className="mt-5 pt-4 border-t border-slate-200 flex items-baseline justify-between">
                <div>
                  <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                    Rs. {(product.samplePricePKR * quantity).toLocaleString()}
                  </div>
                  <span className="text-[11px] text-slate-400">
                    *Sample catalog price (Est. Rs. {product.samplePricePKR} each)
                  </span>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-l-lg font-bold text-sm"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-mono font-semibold text-slate-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-r-lg font-bold text-sm"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-sky-800 bg-sky-50 hover:bg-sky-100 active:bg-sky-200 border border-sky-300 transition-colors cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart ({quantity})</span>
              </button>

              <a
                href={whatsAppOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 shadow-sm transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order via WhatsApp</span>
              </a>
            </div>

            <div className="mt-2 text-center">
              <span className="text-[10px] text-slate-400">
                Call store directly: <a href={`tel:${STORE_PHONE_LOCAL}`} className="font-mono text-slate-600 hover:underline">{STORE_PHONE_LOCAL}</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
