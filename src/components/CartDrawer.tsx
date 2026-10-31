import React from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, FileText, AlertTriangle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC<{ onExploreShop: () => void }> = ({ onExploreShop }) => {
  const {
    items,
    isCartOpen,
    closeCart,
    totalItemsCount,
    subtotal,
    updateQuantity,
    removeFromCart,
    openCheckout,
  } = useCart();

  if (!isCartOpen) return null;

  const hasPrescriptionItems = items.some((item) => item.product.requiresPrescription);

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
    >
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-sky-100 flex items-center justify-center text-sky-700">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 id="cart-title" className="text-base font-bold text-slate-900">
                Your Medicine Cart
              </h2>
              <span className="text-xs text-slate-500 font-mono">
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prescription notice in cart if relevant */}
        {hasPrescriptionItems && (
          <div className="mx-4 mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              Your cart includes <strong>prescription medication (Rx)</strong>. Doctor’s prescription must be verified by Niaz Medical Store before dispatch.
            </p>
          </div>
        )}

        {/* Item List or Empty State */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-base font-semibold text-slate-800">Your cart is empty</p>
              <p className="text-xs text-slate-500 max-w-xs mt-1">
                Browse our catalog of prescription medicines, daily healthcare essentials, and first aid supplies.
              </p>
              <button
                onClick={() => {
                  closeCart();
                  onExploreShop();
                }}
                className="mt-5 px-4 py-2.5 text-xs font-bold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                Browse Medicines
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-lg object-cover bg-white shrink-0 border border-slate-200"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <span className="truncate">{item.product.brand}</span>
                    {item.product.requiresPrescription && (
                      <span className="text-amber-700 font-semibold flex items-center gap-0.5">
                        <FileText className="w-2.5 h-2.5" /> Rx
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-xs font-mono font-bold text-slate-800 mt-1">
                    Rs. {(item.product.samplePricePKR * item.quantity).toLocaleString()}
                    <span className="text-[10px] text-slate-400 font-normal ml-1">
                      (@ Rs. {item.product.samplePricePKR})
                    </span>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-slate-200 rounded bg-white">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 text-xs font-bold"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-mono font-semibold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 text-xs font-bold"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Subtotal & Checkout Trigger */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium">Estimated Subtotal</span>
                <p className="text-[11px] text-slate-400">Sample catalog estimate</p>
              </div>
              <span className="text-xl font-bold font-mono text-slate-900">
                Rs. {subtotal.toLocaleString()}
              </span>
            </div>

            <div className="text-[11px] text-slate-500 bg-white p-2.5 rounded-lg border border-slate-200 leading-tight">
              📍 <strong>Delivery Area:</strong> 283 GB, Mandi Rurala Road &amp; surrounding areas. Final price confirmed upon store verification.
            </div>

            <button
              onClick={openCheckout}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-sky-700 hover:bg-sky-800 active:bg-sky-900 shadow-sm transition-colors cursor-pointer"
            >
              <span>Proceed to Customer Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
