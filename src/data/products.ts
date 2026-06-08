/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, SizeOption, SetOption } from '../types';

// Let's declare professional placeholder photos from Unsplash of high-end pottery, clean clay, garden settings, and luxury resorts
const IMAGES = {
  planters: [
    'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80', // Natural clay pot
    'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80', // Modern plant in pot
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80', // Plant pots in courtyard
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80', // Potted plants on wooden deck
    'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80', // Beautiful Mediterranean ceramics
    'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80', // Display ceramics
  ],
  vases: [
    'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80', // Ceramic vase aesthetic
    'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=800&q=80', // Styled interior vase
    'https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?auto=format&fit=crop&w=800&q=80', // Artisan clay forming
    'https://images.unsplash.com/photo-1610398061401-44af649d2dd8?auto=format&fit=crop&w=800&q=80', // Beautiful glazed pottery textures
    'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=800&q=80', // Contemporary vessels
  ],
  stools: [
    'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80', // Garden bench look
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80', // Interior ceramic side stool
    'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80', // Modern styled stool decoration
  ],
  large: [
    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80', // Giant planters landscape
    'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80', // Grand luxury hotel pots
    'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80', // Estate garden vessels
  ]
};

// Raw definitions as requested by Section 33 in Vietnamese Pottery Website description
const OUTDOOR_PLANTER_NAMES = [
  'Atlas Outdoor Planter P001', 'Terra Grand Planter P002', 'Solis Garden Vessel P003', 'Haven Courtyard Pot P004',
  'Ember Tall Planter P005', 'Dune Bowl Planter P006', 'Verde Landscape Pot P007', 'Arco Statement Planter P008',
  'Coast Large Planter P009', 'Mesa Rustic Pot P010', 'Forma Patio Planter P011', 'Earthline Garden Vessel P012',
  'Cove Outdoor Planter P013', 'Siena Clay Planter P014', 'Arden Garden Pot P015', 'Ridge Textured Planter P016',
  'Alto Tall Vessel P017', 'Lumen Garden Planter P018', 'Terra Arc Pot P019', 'Haven Wide Bowl P020',
  'Onda Patio Planter P021', 'Mora Outdoor Pot P022', 'Slate Garden Vessel P023', 'Aria Statement Pot P024'
];

const INDOOR_POT_NAMES = [
  'Luna Indoor Pot I001', 'Nara Interior Planter I002', 'Halo Accent Pot I003', 'Mộc Table Planter I004',
  'Sora Interior Bowl I005', 'Terra Shelf Pot I006', 'Dune Indoor Vessel I007', 'Cove Decorative Pot I008',
  'Elara Living Pot I009', 'Solis Interior Planter I010', 'Forma Indoor Pot I011', 'Aria Accent Planter I012'
];

const DECORATIVE_VASE_NAMES = [
  'Sora Decorative Vase V001', 'Terra Floor Vessel V002', 'Luna Interior Vase V003', 'Halo Textured Jar V004',
  'Mộc Decorative Vessel V005', 'Haven Accent Vase V006', 'Aria Tall Vase V007', 'Dune Table Vessel V008',
  'Alba Sculptural Vase V009', 'Nara Floor Jar V010', 'Ember Decorative Vase V011', 'Forme Interior Vessel V012',
  'Luma Ceramic Vase V013', 'Siena Textured Vessel V014', 'Cove Display Vase V015', 'Olive Clay Vase V016',
  'Solis Tall Vessel V017', 'Terra Moon Vase V018'
];

const Ceramic_STOOL_NAMES = [
  'Luma Ceramic Stool S001', 'Terra Garden Stool S002', 'Mosaic Glazed Stool S003', 'Eden Outdoor Stool S004',
  'Cove Patio Stool S005', 'Halo Decorative Stool S006', 'Atlas Ceramic Seat S007', 'Sora Accent Stool S008',
  'Dune Garden Stool S009', 'Forma Outdoor Stool S010'
];

const DECORATIVE_OBJECT_NAMES = [
  'Forme Sculptural Object D001', 'Halo Ceramic Sphere D002', 'Terra Lantern D003', 'Garden Accent Vessel D004',
  'Artisan Clay Object D005', 'Sculptural Form D006', 'Luna Decorative Orb D007', 'Sora Ceramic Lantern D008',
  'Mesa Clay Accent D009', 'Arco Sculptural Piece D010', 'Terra Table Object D011', 'Cove Ceramic Form D012'
];

const LARGE_GARDEN_NAMES = [
  'Monument Garden Vessel G001', 'Atlas Oversized Planter G002', 'Terra Estate Pot G003', 'Haven Landscape Jar G004',
  'Solis Grand Outdoor Vessel G005', 'Arco Resort Statement Pot G006', 'Mesa Courtyard Feature G007', 'Dune Architectural Vessel G008'
];

const FINISHES = ['Natural Clay', 'Matte Glaze', 'High-Gloss Reactive Glaze', 'Rustic Textured Earth', 'Sandblasted Stone'];
const COLOURS = ['Terracotta Ochre', 'Warm Sand', 'Linen White', 'Charcoal Slate', 'Natural Olive', 'Reactive Emerald'];
const MATERIALS = ['Vietnamese Red Clay', 'Châm Glazed Stoneware', 'Coarse Sand Earthenware', 'High-Fire Stoneware'];

export const getSizesForProduct = (category: string, baseDims: string): SizeOption[] => {
  if (category === 'Ceramic Stools') {
    return [
      { name: 'Standard Seat (M)', dimensions: 'Ø 35cm x H 46cm', priceFactor: 1.0 },
      { name: 'Oversized Patio Stool (L)', dimensions: 'Ø 42cm x H 52cm', priceFactor: 1.35 }
    ];
  }
  if (category === 'Decorative Objects') {
    return [
      { name: 'Miniature Accent (S)', dimensions: 'W 10cm x L 10cm x H 12cm', priceFactor: 0.65 },
      { name: 'Gallery Standard (M)', dimensions: baseDims, priceFactor: 1.0 },
      { name: 'Foyer Exhibition Size (L)', dimensions: 'W 30cm x L 30cm x H 45cm', priceFactor: 2.2 }
    ];
  }
  
  return [
    { name: 'Accent Small (S)', dimensions: 'Ø 18cm x H 22cm', priceFactor: 0.70 },
    { name: 'Lobby Medium (M)', dimensions: baseDims, priceFactor: 1.0 },
    { name: 'Grand Mansion (L)', dimensions: 'Ø 55cm x H 75cm', priceFactor: 1.55 }
  ];
};

export const getSetsForProduct = (category: string): SetOption[] => {
  if (category === 'Decorative Objects' || category === 'Ceramic Stools') {
    return [
      { name: 'Single Piece', qty: 1, priceFactor: 1.0 },
      { name: 'Pair (Set of 2)', qty: 2, priceFactor: 1.85 }
    ];
  }
  return [
    { name: 'Single Pot', qty: 1, priceFactor: 1.0 },
    { name: 'Set of 3 (Nesting)', qty: 3, priceFactor: 2.55 },
    { name: 'Set of 6 (Master Pack)', qty: 6, priceFactor: 4.80 }
  ];
};

export function generateAllProducts(): Product[] {
  const list: Product[] = [];

  // Helper inside loop to resolve randomized realistic properties
  const makeProperties = (sku: string, i: number, category: string) => {
    const fin = FINISHES[i % FINISHES.length];
    const col = COLOURS[i % COLOURS.length];
    const mat = MATERIALS[i % MATERIALS.length];
    
    let dims = '';
    let app = '';
    let inOut = '';
    let colName = '';
    let imgs: string[] = [];
    let lImg = '';

    if (category === 'Outdoor Planters') {
      dims = `Ø ${45 + (i % 5) * 8}cm x H ${60 + (i % 4) * 15}cm`;
      app = 'Gardens, Terraces, Patios, Courtyards, Hotel Exterior';
      inOut = 'Outdoor Use';
      colName = i % 2 === 0 ? 'Garden & Landscape Collection' : 'Hospitality Selection';
      imgs = [IMAGES.planters[i % IMAGES.planters.length], IMAGES.vases[i % IMAGES.vases.length]];
      lImg = IMAGES.large[i % IMAGES.large.length];
    } else if (category === 'Indoor Pots') {
      dims = `Ø ${20 + (i % 4) * 5}cm x H ${25 + (i % 3) * 8}cm`;
      app = 'Living Rooms, Hallways, Fireplace Accents, Shelves';
      inOut = 'Indoor Use';
      colName = 'Interior Decorative Collection';
      imgs = [IMAGES.planters[(i + 2) % IMAGES.planters.length], IMAGES.vases[(i + 1) % IMAGES.vases.length]];
      lImg = IMAGES.planters[3];
    } else if (category === 'Decorative Vases') {
      dims = `D ${18 + (i % 3) * 6}cm x H ${35 + (i % 5) * 10}cm`;
      app = 'Table decor, Sideboards, Boutique Living Rooms, Retail Shelves';
      inOut = 'Indoor & Covered Outdoor';
      colName = i % 2 === 0 ? 'Interior Decorative Collection' : 'Sculptural Objects Collection';
      imgs = [IMAGES.vases[i % IMAGES.vases.length], IMAGES.planters[(i + 4) % IMAGES.planters.length]];
      lImg = IMAGES.vases[2];
    } else if (category === 'Ceramic Stools') {
      dims = `Ø 35cm x H 46cm (Standard Patio Size)`;
      app = 'Balconies, Garden Seating, Living Accents, Resort Terraces';
      inOut = 'Indoor & Outdoor';
      colName = 'Hospitality Selection';
      imgs = [IMAGES.stools[i % IMAGES.stools.length], IMAGES.planters[(i + 1) % IMAGES.planters.length]];
      lImg = IMAGES.stools[0];
    } else if (category === 'Decorative Objects') {
      dims = `W ${15 + (i % 4) * 5}cm x L ${15 + (i % 4) * 5}cm x H ${20 + (i % 3) * 10}cm`;
      app = 'Decorative shelving, hotel lobbies, boutique design accents';
      inOut = 'Indoor Decorative';
      colName = 'Sculptural Objects';
      imgs = [IMAGES.vases[(i + 3) % IMAGES.vases.length], IMAGES.stools[i % IMAGES.stools.length]];
      lImg = IMAGES.vases[1];
    } else {
      dims = `Ø ${70 + (i % 3) * 15}cm x H ${110 + (i % 3) * 20}cm`;
      app = 'Luxury Villa Entrances, Public Architectural Landscapes, Resorts';
      inOut = 'Heavy-Duty Outdoor';
      colName = 'Garden & Landscape Collection';
      imgs = [IMAGES.large[i % IMAGES.large.length], IMAGES.planters[i % IMAGES.planters.length]];
      lImg = IMAGES.large[2];
    }

    return { fin, col, mat, dims, app, inOut, colName, imgs, lImg };
  };

  // 1. Planters (24)
  OUTDOOR_PLANTER_NAMES.forEach((name, i) => {
    const sku = `P0${i+1 < 10 ? '0' : ''}${i+1}`;
    const p = makeProperties(sku, i, 'Outdoor Planters');
    list.push({
      id: sku,
      name,
      SKU: sku,
      category: 'Outdoor Planters',
      collection: p.colName,
      indoorOutdoor: p.inOut,
      buyerApplication: p.app,
      retailEligible: true,
      tradeEligible: true,
      dimensions: p.dims,
      material: p.mat,
      finish: p.fin,
      colourDirection: p.col,
      customizationNote: 'Available in alternative custom glazes and size modifications upon request. Mold customization available for wholesale lots.',
      mainImage: p.imgs[0],
      galleryImages: p.imgs,
      lifestyleImage: p.lImg,
      relatedItems: ['P002', 'P005', 'G001'],
      active: true,
    });
  });

  // 2. Indoor Pots (12)
  INDOOR_POT_NAMES.forEach((name, i) => {
    const sku = `I0${i+1 < 10 ? '0' : ''}${i+1}`;
    const p = makeProperties(sku, i, 'Indoor Pots');
    list.push({
      id: sku,
      name,
      SKU: sku,
      category: 'Indoor Pots',
      collection: p.colName,
      indoorOutdoor: p.inOut,
      buyerApplication: p.app,
      retailEligible: true,
      tradeEligible: true,
      dimensions: p.dims,
      material: p.mat,
      finish: p.fin,
      colourDirection: p.col,
      customizationNote: 'Glaze alterations supported starting at 200pcs. Base pads for shelf-protection are included by default.',
      mainImage: p.imgs[0],
      galleryImages: p.imgs,
      lifestyleImage: p.lImg,
      relatedItems: ['I002', 'V004'],
      active: true,
    });
  });

  // 3. Vases (18)
  DECORATIVE_VASE_NAMES.forEach((name, i) => {
    const sku = `V0${i+1 < 10 ? '0' : ''}${i+1}`;
    const p = makeProperties(sku, i, 'Decorative Vases');
    list.push({
      id: sku,
      name,
      SKU: sku,
      category: 'Decorative Vases',
      collection: p.colName,
      indoorOutdoor: p.inOut,
      buyerApplication: p.app,
      retailEligible: true,
      tradeEligible: true,
      dimensions: p.dims,
      material: p.mat,
      finish: p.fin,
      colourDirection: p.col,
      customizationNote: 'Interior liquid protection lining is added. Custom debossed logos can be integrated for wholesale customers.',
      mainImage: p.imgs[0],
      galleryImages: p.imgs,
      lifestyleImage: p.lImg,
      relatedItems: ['V002', 'V010', 'D001'],
      active: true,
    });
  });

  // 4. Stools (10)
  Ceramic_STOOL_NAMES.forEach((name, i) => {
    const sku = `S0${i+1 < 10 ? '0' : ''}${i+1}`;
    const p = makeProperties(sku, i, 'Ceramic Stools');
    list.push({
      id: sku,
      name,
      SKU: sku,
      category: 'Ceramic Stools',
      collection: p.colName,
      indoorOutdoor: p.inOut,
      buyerApplication: p.app,
      retailEligible: true,
      tradeEligible: true,
      dimensions: p.dims,
      material: p.mat,
      finish: p.fin,
      colourDirection: p.col,
      customizationNote: 'Load bearing up to 180kg. High-temperature stoneware firing prevents cracking under sub-zero climates.',
      mainImage: p.imgs[0],
      galleryImages: p.imgs,
      lifestyleImage: p.lImg,
      relatedItems: ['S002', 'S005'],
      active: true,
    });
  });

  // 5. Objects (12)
  DECORATIVE_OBJECT_NAMES.forEach((name, i) => {
    const sku = `D0${i+1 < 10 ? '0' : ''}${i+1}`;
    const p = makeProperties(sku, i, 'Decorative Objects');
    list.push({
      id: sku,
      name,
      SKU: sku,
      category: 'Decorative Objects',
      collection: p.colName,
      indoorOutdoor: p.inOut,
      buyerApplication: p.app,
      retailEligible: true,
      tradeEligible: true,
      dimensions: p.dims,
      material: p.mat,
      finish: p.fin,
      colourDirection: p.col,
      customizationNote: 'Bespoke sculptural developments are welcome with a 3D file or architectural brief.',
      mainImage: p.imgs[0],
      galleryImages: p.imgs,
      lifestyleImage: p.lImg,
      relatedItems: ['D002', 'V004'],
      active: true,
    });
  });

  // 6. Large Garden Pieces (8)
  LARGE_GARDEN_NAMES.forEach((name, i) => {
    const sku = `G0${i+1 < 10 ? '0' : ''}${i+1}`;
    const p = makeProperties(sku, i, 'Large Garden Pieces');
    list.push({
      id: sku,
      name,
      SKU: sku,
      category: 'Large Garden Pieces',
      collection: p.colName,
      indoorOutdoor: p.inOut,
      buyerApplication: p.app,
      retailEligible: true,
      tradeEligible: true,
      dimensions: p.dims,
      material: p.mat,
      finish: p.fin,
      colourDirection: p.col,
      customizationNote: 'Heavy duty thick-walled structural pot. Hand-shaped over multiple days. Base drainage channels are pre-formed.',
      mainImage: p.imgs[0],
      galleryImages: p.imgs,
      lifestyleImage: p.lImg,
      relatedItems: ['G002', 'P002'],
      active: true,
    });
  });

  // Attach multiple sizes and sets / packages default configurations
  list.forEach((p, index) => {
    p.sizes = getSizesForProduct(p.category, p.dimensions);
    p.sets = getSetsForProduct(p.category);

    // Generate realistic base retail prices
    let baseRetail = 45.00;
    if (p.category === 'Outdoor Planters') baseRetail = 65.00 + (index % 5) * 10;
    else if (p.category === 'Indoor Pots') baseRetail = 35.00 + (index % 4) * 5;
    else if (p.category === 'Decorative Vases') baseRetail = 28.00 + (index % 4) * 6;
    else if (p.category === 'Ceramic Stools') baseRetail = 95.00 + (index % 3) * 15;
    else if (p.category === 'Decorative Objects') baseRetail = 22.00 + (index % 4) * 4;
    else if (p.category === 'Large Garden Pieces') baseRetail = 180.00 + (index % 3) * 35;

    p.retailPrice = baseRetail;
    p.retailPriceVisible = true;
    p.retailCurrency = 'USD';
    p.checkoutEnabled = true;

    // Generate realistic B2B FOB price configurations
    const code = parseInt(p.id.replace(/^\D+/g, '')) || 5;
    const baseFob = 8 + (code % 15) * 2.5;
    p.fobPriceTier1 = baseFob;
    p.fobPriceTier2 = baseFob * 0.85;
    p.moq = 10 + (code % 5) * 5;
    p.fobCurrency = 'USD';
    p.priceUnit = 'piece';
    p.fobPricingEnabled = true;
  });

  return list;
}
