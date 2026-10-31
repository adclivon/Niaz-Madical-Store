/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, Product } from './types/pharmacy';
import { CartProvider, useCart } from './context/CartContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { PrescriptionUploadModal } from './components/PrescriptionUploadModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SearchModal } from './components/SearchModal';
import { SAMPLE_PRODUCTS } from './data/sampleProducts';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { HealthcarePage } from './pages/HealthcarePage';
import { AboutUsPage } from './pages/AboutUsPage';
import { OrderingGuidePage } from './pages/OrderingGuidePage';
import { HomeDeliveryPage } from './pages/HomeDeliveryPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { FaqPage } from './pages/FaqPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { AdminArchitecturePage } from './pages/AdminArchitecturePage';
import { Check } from 'lucide-react';

function PharmacyApp() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { selectedQuickViewProduct, closeQuickView, openQuickView, addedNotification } = useCart();

  // URL Query Sync for shareable URLs and SEO
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const page = (params.get('page') as PageId) || 'home';
      const category = params.get('category') || undefined;
      const productId = params.get('id');

      setCurrentPage(page);
      setSelectedCategorySlug(category);

      if (productId) {
        const found = SAMPLE_PRODUCTS.find((p) => p.id === productId);
        if (found) openQuickView(found);
      }
    };

    // Initial check from current location
    handlePopState();

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: PageId, categorySlug?: string, productId?: string) => {
    setCurrentPage(page);
    setSelectedCategorySlug(categorySlug);

    const url = new URL(window.location.href);
    if (page === 'home') {
      url.searchParams.delete('page');
    } else {
      url.searchParams.set('page', page);
    }

    if (categorySlug) {
      url.searchParams.set('category', categorySlug);
    } else {
      url.searchParams.delete('category');
    }

    if (productId) {
      url.searchParams.set('id', productId);
    } else {
      url.searchParams.delete('id');
    }

    window.history.pushState({}, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    openQuickView(product);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'shop':
        return (
          <ShopPage
            initialCategory={selectedCategorySlug}
            onSelectProduct={handleSelectProduct}
          />
        );
      case 'categories':
        return (
          <CategoriesPage
            onSelectCategory={(slug) => navigateTo('shop', slug)}
            onNavigate={(page) => navigateTo(page)}
          />
        );
      case 'healthcare':
        return (
          <HealthcarePage
            onNavigate={(page, slug) => navigateTo(page, slug)}
            onSelectProduct={handleSelectProduct}
          />
        );
      case 'about':
        return <AboutUsPage onNavigate={(page) => navigateTo(page)} />;
      case 'ordering-guide':
        return <OrderingGuidePage onNavigate={(page) => navigateTo(page)} />;
      case 'delivery':
        return <HomeDeliveryPage onNavigate={(page) => navigateTo(page)} />;
      case 'contact':
        return <ContactUsPage onNavigate={(page) => navigateTo(page)} />;
      case 'faq':
        return <FaqPage onNavigate={(page) => navigateTo(page)} />;
      case 'privacy':
        return <PrivacyPolicyPage onNavigate={(page) => navigateTo(page)} />;
      case 'terms':
        return <TermsPage onNavigate={(page) => navigateTo(page)} />;
      case 'admin-guide':
        return <AdminArchitecturePage onNavigate={(page) => navigateTo(page)} />;
      case 'home':
      default:
        return (
          <HomePage
            onNavigate={(page, slug) => navigateTo(page, slug)}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Toast Notification when adding items */}
      {addedNotification && (
        <div className="fixed top-24 right-5 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span>{addedNotification}</span>
        </div>
      )}

      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Top Navigation Bar */}
      <Header
        currentPage={currentPage}
        onNavigate={(page, slug) => navigateTo(page, slug)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer onNavigate={(page, slug) => navigateTo(page, slug)} />

      {/* Modals & Overlays */}
      <CartDrawer onExploreShop={() => navigateTo('shop')} />
      <CheckoutModal />
      <PrescriptionUploadModal />
      <ProductDetailModal
        product={selectedQuickViewProduct}
        onClose={closeQuickView}
      />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <PharmacyApp />
    </CartProvider>
  );
}
