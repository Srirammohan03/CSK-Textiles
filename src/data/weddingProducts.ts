import type { Product } from './products';
import productWedding1 from '/textures/wedding/wedding-01.png';
// import productWedding1_1 from '/textures/wedding/wedding-01-1.jpg';
// import productWedding1_2 from '/textures/wedding/wedding-01-2.jpg';
// import productWedding1_3 from '/textures/wedding/wedding-01-3.jpg';
// import productWedding1_4 from '/textures/wedding/wedding-01-4.jpg';
// import productWedding1_5 from '/textures/wedding/wedding-01-5.jpg';
// import productWedding1_6 from '/textures/wedding/wedding-01-6.jpg';

import productWedding2 from '/textures/wedding/wedding-02.png';
// import productWedding2_1 from '/textures/wedding/wedding-02-1.jpg';
// import productWedding2_2 from '/textures/wedding/wedding-02-2.jpg';
// import productWedding2_3 from '/textures/wedding/wedding-02-3.jpg';
// import productWedding2_4 from '/textures/wedding/wedding-02-4.jpg';
// import productWedding2_5 from '/textures/wedding/wedding-02-5.jpg';
// import productWedding2_6 from '/textures/wedding/wedding-02-6.jpg';

import productWedding3 from '/textures/wedding/wedding-03.png';
// import productWedding3_1 from '/textures/wedding/wedding-03-1.jpg';
// import productWedding3_2 from '/textures/wedding/wedding-03-2.jpg';
// import productWedding3_3 from '/textures/wedding/wedding-03-3.jpg';
// import productWedding3_4 from '/textures/wedding/wedding-03-4.jpg';
// import productWedding3_5 from '/textures/wedding/wedding-03-5.jpg';
// import productWedding3_6 from '/textures/wedding/wedding-03-6.jpg';
// import productWedding3_7 from '/textures/wedding/wedding-03-7.jpg';

import productWedding4 from '/textures/wedding/wedding-04.png';
// import productWedding4_1 from '/textures/wedding/wedding-04-1.jpg';
// import productWedding4_2 from '/textures/wedding/wedding-04-2.jpg';
// import productWedding4_3 from '/textures/wedding/wedding-04-3.jpg';
// import productWedding4_4 from '/textures/wedding/wedding-04-4.jpg';
// import productWedding4_5 from '/textures/wedding/wedding-04-5.jpg';
// import productWedding4_6 from '/textures/wedding/wedding-04-6.jpg';

// const filters = [
//   "All",
//   "Silk",
//   "Velvet",
//   "Embroidered",
//   "Textured",
// ];
export const weddingProducts: Product[] = [
  {
    id: 'wedding-01',
    name: 'Royal Cream',
    category: 'wedding-sherwani',
    price: 15000,
    image: [productWedding1],
    isNewArrival: true,
    description: 'Elegant cream sherwani with traditional detailing',
    fabric: 'Silk',
    colors: ['Cream', 'Gold'],
    tags: ['Wedding', 'Festival']
  },
  {
    id: 'wedding-02',
    name: 'Navy Indo-Western',
    category: 'wedding-sherwani',
    price: 12500,
    image: [productWedding2],
    isNewArrival: true,
    description: 'Modern navy blue indo-western with structured fit',
    fabric: 'Velvet',
    colors: ['Navy Blue'],
    tags: ['Wedding', 'Reception']
  },
  {
    id: 'wedding-03',
    name: 'Ivory Embroidered',
    category: 'wedding-sherwani',
    price: 18000,
    image: [productWedding3],
    description: 'Classic ivory sherwani with fine embroidery work',
    fabric: 'Embroidered',
    colors: ['Ivory', 'Off White'],
    tags: ['Wedding']
  },
  {
    id: 'wedding-04',
    name: 'Blush Pink Designer',
    category: 'wedding-sherwani',
    price: 16500,
    image: [productWedding4],
    description: 'Soft blush pink sherwani with modern royal finish',
    fabric: 'Textured',
    colors: ['Blush Pink'],
    tags: ['Wedding', 'Trending']
  }
];
