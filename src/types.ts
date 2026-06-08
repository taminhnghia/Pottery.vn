/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// User roles in our Pottery Portal
export type UserRole = 'guest' | 'retail_customer' | 'trade_applicant' | 'approved_b2b_buyer' | 'strategic_distributor' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  companyName?: string;
  companyWebsite?: string;
  country?: string;
  phone?: string;
  approvalStatus?: 'approved' | 'rejected' | 'pending';
  assignedBuyerGroup?: string;
  registrationNumber?: string;
  businessType?: string;
}

export interface Product {
  id: string;
  name: string;
  SKU: string;
  category: 'Outdoor Planters' | 'Indoor Pots' | 'Decorative Vases' | 'Ceramic Stools' | 'Decorative Objects' | 'Large Garden Pieces';
  collection: string;
  indoorOutdoor: string;
  buyerApplication: string;
  retailEligible: boolean;
  tradeEligible: boolean;
  dimensions: string; // Dimensions overview
  material: string;
  finish: string;
  colourDirection: string;
  customizationNote: string;
  mainImage: string;
  galleryImages: string[];
  lifestyleImage: string;
  relatedItems: string[]; // SKU list

  // Retail Pricing (managed by Admin)
  retailPrice?: number;
  retailCurrency?: string;
  retailPriceVisible?: boolean;
  retailAvailability?: 'In Stock' | 'Made to Order' | 'Upon Enquiry';
  checkoutEnabled?: boolean;
  active?: boolean;

  // B2B FOB Pricing
  fobPricingEnabled?: boolean;
  fobCurrency?: string;
  incoterm?: 'FOB' | 'FCA' | 'CIF' | 'Other' | 'To Be Discussed';
  incotermVersion?: string; // e.g. "Incoterms® 2020"
  namedPortOfLoading?: string;
  priceUnit?: 'piece' | 'set' | 'carton';
  fobPriceTier1?: number;
  fobTier1MinimumQuantity?: number;
  fobTier1MaximumQuantity?: number;
  fobPriceTier2?: number;
  fobTier2MinimumQuantity?: number;
  fobTier2MaximumQuantity?: number;
  volumeQuoteThreshold?: number;
  quotationOnly?: boolean;
  moq?: number;
  priceValidity?: string;
  tradePricingVisibility?: 'Hidden' | 'Approved B2B Buyers Only' | 'Assigned Buyer Group Only' | 'Account Specific Only' | 'Quotation Only';

  // Export Data
  packingType?: string;
  piecesPerCarton?: number;
  cartonDimensions?: string;
  netWeight?: number;
  grossWeight?: number;
  cbmPerCarton?: number;
  palletInformation?: string;
  estimatedQuantity20FT?: number;
  estimatedQuantity40FT?: number;
  estimatedQuantity40HC?: number;
  fragilePackingNote?: string;
  loadingRecommendation?: string;
  specificationSheetFile?: string;
  sampleAvailable?: boolean;
  samplePrice?: number;
}

export interface InquiryItem {
  product: Product;
  quantity: number;
  preferredFinish?: string;
  preferredColour?: string;
  customSizeRequirement?: string;
  notes?: string;
}

export interface QuoteRequest {
  id: string;
  date: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  website?: string;
  buyerType: string;
  items: {
    productSKU: string;
    productName: string;
    quantity: number;
    finish?: string;
    colour?: string;
    customSize?: string;
    notes?: string;
  }[];
  preferredIncoterm: string;
  destinationCountry: string;
  destinationPort: string;
  targetCurrency: string;
  expectedOrderTiming: string;
  containerRequirement: string;
  status: 'New' | 'Under Review' | 'Awaiting Information' | 'Quoted' | 'Closed';
}

export interface TradeApplication {
  id: string;
  date: string;
  companyName: string;
  companyWebsite?: string;
  country: string;
  businessRegistrationNumber: string;
  businessType: string;
  primarySalesChannel: string;
  contactName: string;
  jobTitle: string;
  email: string;
  phone: string;
  preferredIncoterm: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface CustomDevelopmentBrief {
  id: string;
  fullName: string;
  company: string;
  email: string;
  country: string;
  productCategory: string;
  estimatedQuantity: number;
  customizationDetails: string;
  status: string;
}
