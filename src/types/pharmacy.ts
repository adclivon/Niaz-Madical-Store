export type PageId =
  | 'home'
  | 'shop'
  | 'categories'
  | 'product-detail'
  | 'healthcare'
  | 'about'
  | 'ordering-guide'
  | 'delivery'
  | 'contact'
  | 'faq'
  | 'privacy'
  | 'terms'
  | 'admin-guide';

export type CategorySlug =
  | 'prescription-medicines'
  | 'over-the-counter'
  | 'vitamins-supplements'
  | 'personal-care'
  | 'baby-care'
  | 'first-aid'
  | 'medical-equipment'
  | 'healthcare-essentials';

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug;
  description: string;
  isPrescriptionCategory?: boolean;
  itemCount: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  categorySlug: CategorySlug;
  categoryName: string;
  requiresPrescription: boolean;
  isSamplePrice: boolean;
  samplePricePKR: number;
  packSize: string;
  dosageForm: string;
  activeIngredient: string;
  inStock: boolean;
  description: string;
  usageGuidelines: string;
  storageInstructions: string;
  image: string;
  featured?: boolean;
  isHealthcareProduct?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerCheckoutData {
  customerName: string;
  phoneNumber: string;
  deliveryAddress: string;
  nearbyLandmark?: string;
  hasPrescription: boolean;
  prescriptionDetails?: string;
  orderNotes?: string;
}
