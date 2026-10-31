import React, { useState } from 'react';
import { Database, Plus, CheckCircle, Code, Shield, Key, AlertCircle, Package, RefreshCw } from 'lucide-react';
import { PageId, Product, CategorySlug } from '../types/pharmacy';
import { STORE_CATEGORIES } from '../data/categories';
import { SAMPLE_PRODUCTS } from '../data/sampleProducts';

export const AdminArchitecturePage: React.FC<{ onNavigate: (page: PageId) => void }> = ({ onNavigate }) => {
  // Local state preview for owner to test adding products
  const [testProducts, setTestProducts] = useState<Product[]>(SAMPLE_PRODUCTS.slice(0, 4));
  const [newProdName, setNewProdName] = useState('');
  const [newProdBrand, setNewProdBrand] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(150);
  const [newProdCat, setNewProdCat] = useState<CategorySlug>('over-the-counter');
  const [newProdRx, setNewProdRx] = useState(false);
  const [newProdPack, setNewProdPack] = useState('Pack of 10 Tablets');
  const [newProdIngredient, setNewProdIngredient] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAddPreviewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const catObj = STORE_CATEGORIES.find((c) => c.slug === newProdCat);

    const created: Product = {
      id: `prod-${Date.now()}`,
      name: newProdName,
      brand: newProdBrand || 'Pharmaceuticals',
      categorySlug: newProdCat,
      categoryName: catObj ? catObj.name : 'General Medicine',
      requiresPrescription: newProdRx,
      isSamplePrice: false,
      samplePricePKR: Number(newProdPrice),
      packSize: newProdPack,
      dosageForm: 'Oral',
      activeIngredient: newProdIngredient || 'Active Formulation',
      inStock: true,
      description: `Stocked medicine at Niaz Medical Store.`,
      usageGuidelines: 'Use strictly as directed by a healthcare professional.',
      storageInstructions: 'Store below 30°C in dry place.',
      image: '/src/assets/images/product_first_aid_kit_1793430597854.jpg',
    };

    setTestProducts([created, ...testProducts]);
    setNewProdName('');
    setNewProdBrand('');
    setNewProdIngredient('');
    setFeedback(`Product "${created.name}" created in memory session.`);
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-slate-900 font-medium">Admin &amp; Inventory Roadmap</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
          Store Owner &amp; Inventory Integration Guide
        </h1>
        <p className="text-xs sm:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
          Comprehensive documentation and architecture plan for Niaz Medical Store to manage actual medicines, real-time inventory, batch prices, and connect a future secure database.
        </p>
      </div>

      {/* Honest Architectural Status Banner */}
      <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl flex items-start gap-3 text-xs sm:text-sm text-sky-950">
        <Database className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Transparent Architecture Notice:</strong>
          <p className="mt-1 leading-relaxed">
            In this initial release, the storefront operates safely on client-side WhatsApp order integration without maintaining an unverified database. This page outlines the exact technical structure to add persistent database storage (such as Firebase Firestore or Cloud SQL) whenever the business owner is ready to connect live inventory.
          </p>
        </div>
      </div>

      {/* 1. How to update inventory right now */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <Code className="w-5 h-5 text-sky-700" />
          <h2 className="text-lg font-bold text-slate-900">
            1. Current Static Inventory Configuration
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Current catalog items are maintained in <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sky-800 font-mono text-xs">src/data/sampleProducts.ts</code>. The business owner can simply update the array with actual medicine names, manufacturers, pack sizes, and prices:
        </p>

        <pre className="p-4 bg-slate-900 text-slate-200 rounded-xl text-xs font-mono overflow-x-auto border border-slate-800">
{`// Example Product Data Object in src/data/sampleProducts.ts:
{
  id: 'prod-panadol-500',
  name: 'Panadol 500mg Tablets',
  brand: 'GlaxoSmithKline (GSK)',
  categorySlug: 'over-the-counter',
  requiresPrescription: false,
  samplePricePKR: 45,
  packSize: 'Pack of 10 Tablets',
  dosageForm: 'Oral Tablet',
  activeIngredient: 'Paracetamol 500mg',
  inStock: true,
  description: 'Fast effective relief of headaches and fever.',
  usageGuidelines: 'Adults: 1-2 tablets every 4-6 hours.',
  storageInstructions: 'Store below 30°C.',
  image: '/src/assets/images/product_first_aid_kit_1793430597854.jpg'
}`}
        </pre>
      </div>

      {/* 2. Future Database Schema Roadmap */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <Database className="w-5 h-5 text-emerald-700" />
          <h2 className="text-lg font-bold text-slate-900">
            2. Database Schema Plan (PostgreSQL / Firestore)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          When scaling to a multi-user inventory system, the following schemas are designed for seamless database migration:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="font-bold text-slate-800 text-sm">Table: products</span>
            <ul className="text-slate-600 space-y-1">
              <li>• id: UUID PRIMARY KEY</li>
              <li>• name: VARCHAR(255)</li>
              <li>• brand: VARCHAR(255)</li>
              <li>• category_id: VARCHAR(50)</li>
              <li>• requires_prescription: BOOLEAN</li>
              <li>• price_pkr: NUMERIC(10,2)</li>
              <li>• current_stock_qty: INTEGER</li>
              <li>• batch_number: VARCHAR(100)</li>
              <li>• expiry_date: DATE</li>
              <li>• active_formula: VARCHAR(255)</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="font-bold text-slate-800 text-sm">Table: orders</span>
            <ul className="text-slate-600 space-y-1">
              <li>• id: UUID PRIMARY KEY</li>
              <li>• customer_name: VARCHAR(255)</li>
              <li>• customer_phone: VARCHAR(50)</li>
              <li>• delivery_address: TEXT</li>
              <li>• status: 'pending' | 'verified' | 'dispatched' | 'delivered'</li>
              <li>• total_amount: NUMERIC(10,2)</li>
              <li>• prescription_image_url: TEXT (encrypted)</li>
              <li>• created_at: TIMESTAMP WITH TIME ZONE</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Interactive Preview: Product Addition Simulator */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              3. Admin Product Manager Interface Preview
            </h2>
            <p className="text-xs text-slate-500">
              Simulate adding new inventory items into the runtime catalog.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 bg-amber-50 text-amber-800 font-semibold rounded-md border border-amber-200">
            Session Memory Simulator
          </span>
        </div>

        {feedback && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        <form onSubmit={handleAddPreviewProduct} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Medicine Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Brufen 400mg"
              value={newProdName}
              onChange={(e) => setNewProdName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Brand / Company</label>
            <input
              type="text"
              placeholder="e.g. Abbott Pakistan"
              value={newProdBrand}
              onChange={(e) => setNewProdBrand(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Price in PKR</label>
            <input
              type="number"
              required
              min={1}
              value={newProdPrice}
              onChange={(e) => setNewProdPrice(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Category</label>
            <select
              value={newProdCat}
              onChange={(e) => setNewProdCat(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
            >
              {STORE_CATEGORIES.map((c) => (
                <option key={c.id} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Packaging Form</label>
            <input
              type="text"
              placeholder="e.g. Strip of 10 Tablets"
              value={newProdPack}
              onChange={(e) => setNewProdPack(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Prescription Type</label>
            <label className="flex items-center gap-2 mt-2 cursor-pointer">
              <input
                type="checkbox"
                checked={newProdRx}
                onChange={(e) => setNewProdRx(e.target.checked)}
                className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              />
              <span className="font-medium text-slate-700">Requires Doctor Prescription (Rx)</span>
            </label>
          </div>

          <div className="sm:col-span-2 lg:col-span-3 pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Medicine to In-Memory Catalog</span>
            </button>
          </div>
        </form>

        {/* Current list in preview */}
        <div className="pt-4 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-700 block mb-2">
            Active Catalog Items in Memory ({testProducts.length}):
          </span>
          <div className="space-y-2">
            {testProducts.map((p) => (
              <div key={p.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900">{p.name}</span>
                  <span className="text-slate-500 ml-2">({p.brand} · {p.categoryName})</span>
                  {p.requiresPrescription && <span className="ml-2 text-amber-700 font-semibold">[Rx]</span>}
                </div>
                <span className="font-mono font-bold text-slate-800">Rs. {p.samplePricePKR}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
