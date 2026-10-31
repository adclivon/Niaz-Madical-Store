import React, { useState } from 'react';
import { Search, ShoppingBag, MessageCircle, Menu, X, FileText } from 'lucide-react';
import { NiazLogo } from './NiazLogo';
import { PageId } from '../types/pharmacy';
import { useCart } from '../context/CartContext';
import { buildWhatsAppLink } from '../utils/whatsapp';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId, categorySlug?: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
}) => {
  const { totalItemsCount, openCart, openPrescriptionModal } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageId }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Shop Medicines', page: 'shop' },
    { label: 'Categories', page: 'categories' },
    { label: 'Healthcare Products', page: 'healthcare' },
    { label: 'Ordering Guide', page: 'ordering-guide' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 sm:gap-8">
          {/* Zone 1: Brand Wordmark & Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-1 -ml-1 transition-opacity hover:opacity-95"
            aria-label="Niaz Medical Store Home"
          >
            <NiazLogo size="md" />
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'text-sky-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions & WhatsApp CTA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-slate-600 hover:text-sky-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Search medicines and products"
              aria-label="Search medicines and products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Quick Rx Order Button */}
            <button
              onClick={openPrescriptionModal}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200/80 rounded-lg transition-colors cursor-pointer"
              title="Order with Doctor Prescription"
            >
              <FileText className="w-4 h-4 text-sky-600" />
              <span>Send Prescription</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 text-slate-700 hover:text-sky-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label={`Shopping Cart with ${totalItemsCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-sky-600 text-white font-mono text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp Order CTA Button */}
            <a
              href={buildWhatsAppLink("Hello Niaz Medical Store, I would like to place an order.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg transition-colors shadow-xs whitespace-nowrap cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Order</span>
            </a>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white shadow-xl animate-in fade-in duration-200">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-sky-50 text-sky-800 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{link.label}</span>
                </button>
              );
            })}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openPrescriptionModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-sky-800 bg-sky-50 rounded-lg border border-sky-200"
              >
                <FileText className="w-4 h-4 text-sky-600" />
                <span>Upload Doctor Prescription</span>
              </button>

              <a
                href={buildWhatsAppLink("Hello Niaz Medical Store, I would like to order medicines.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat &amp; Order on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
