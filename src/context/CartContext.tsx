import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product } from '../types/pharmacy';

interface CartContextType {
  items: CartItem[];
  totalItemsCount: number;
  subtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  isPrescriptionModalOpen: boolean;
  openPrescriptionModal: () => void;
  closePrescriptionModal: () => void;
  selectedQuickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  addedNotification: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'niaz_medical_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<Product | null>(null);
  const [addedNotification, setAddedNotification] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage quota or disabled
    }
  }, [items]);

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.samplePricePKR * item.quantity, 0);

  const addToCart = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { product, quantity }];
    });

    setAddedNotification(`${product.name} added to cart`);
    setTimeout(() => {
      setAddedNotification(null);
    }, 2800);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItemsCount,
        subtotal,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCheckoutOpen,
        openCheckout: () => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        },
        closeCheckout: () => setIsCheckoutOpen(false),
        isPrescriptionModalOpen,
        openPrescriptionModal: () => setIsPrescriptionModalOpen(true),
        closePrescriptionModal: () => setIsPrescriptionModalOpen(false),
        selectedQuickViewProduct,
        openQuickView: (product: Product) => setSelectedQuickViewProduct(product),
        closeQuickView: () => setSelectedQuickViewProduct(null),
        addedNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
