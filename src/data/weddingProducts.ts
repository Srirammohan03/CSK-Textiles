import type { Product } from './products';
import productWedding1 from '/textures/wedding/wedding-01.png';
import productWedding1_1 from '/textures/wedding/wedding-01-1.jpg';
import productWedding1_2 from '/textures/wedding/wedding-01-2.jpg';
import productWedding1_3 from '/textures/wedding/wedding-01-3.jpg';
import productWedding1_4 from '/textures/wedding/wedding-01-4.jpg';
import productWedding1_5 from '/textures/wedding/wedding-01-5.jpg';
import productWedding1_6 from '/textures/wedding/wedding-01-6.jpg';

import productWedding2 from '/textures/wedding/wedding-02.jpg';
import productWedding2_1 from '/textures/wedding/wedding-02-1.jpg';
import productWedding2_2 from '/textures/wedding/wedding-02-2.jpg';
import productWedding2_3 from '/textures/wedding/wedding-02-3.jpg';
import productWedding2_4 from '/textures/wedding/wedding-02-4.jpg';
import productWedding2_5 from '/textures/wedding/wedding-02-5.jpg';
import productWedding2_6 from '/textures/wedding/wedding-02-6.jpg';

import productWedding3 from '/textures/wedding/wedding-03.jpg';
import productWedding3_1 from '/textures/wedding/wedding-03-1.jpg';
import productWedding3_2 from '/textures/wedding/wedding-03-2.jpg';
import productWedding3_3 from '/textures/wedding/wedding-03-3.jpg';
import productWedding3_4 from '/textures/wedding/wedding-03-4.jpg';
import productWedding3_5 from '/textures/wedding/wedding-03-5.jpg';
import productWedding3_6 from '/textures/wedding/wedding-03-6.jpg';
import productWedding3_7 from '/textures/wedding/wedding-03-7.jpg';

// import productWedding4 from '/images/wedding-dress4.jpg';
// const filters = [
//   "All",
//   "Silk",
//   "Brocade",
//   "Velvet",
//   "Jacquard",
//   "Handloom",
//   "Embroidered",
//   "Textured",
// ];
export const weddingProducts: Product[] = [
  {
    id: 'wedding-01',
    name: 'Royal Cream',
    category: 'wedding-sherwani',
    price: 15000,
    image: [productWedding1, productWedding1_1, productWedding1_2, productWedding1_3, productWedding1_4, productWedding1_5, productWedding1_6],
    isNew: true,
    description: 'Elegant cream sherwani with traditional detailing',
    fabric: 'Silk' + 'Brocade' + 'Jacquard' + 'Embroidered' + 'Textured' + 'Handloom',
    colors: ['Cream', 'Gold'],
    tags: ['Wedding', 'Festival', 'Premium']
  },
  {
    id: 'wedding-02',
    name: 'Navy Indo-Western',
    category: 'wedding-sherwani',
    price: 12500,
    image: [productWedding2, productWedding2_1, productWedding2_2, productWedding2_3, productWedding2_4, productWedding2_5, productWedding2_6],
    isNew: true,
    description: 'Modern navy blue indo-western with structured fit',
    fabric: 'Silk' + 'Velvet' + 'Jacquard' + 'Embroidered' + 'Textured',
    colors: ['Navy Blue'],
    tags: ['Wedding', 'Reception']
  },
  {
    id: 'wedding-03',
    name: 'Ivory Embroidered',
    category: 'wedding-sherwani',
    price: 18000,
    image: [productWedding3, productWedding3_1, productWedding3_2, productWedding3_3, productWedding3_4, productWedding3_5, productWedding3_6, productWedding3_7],
    description: 'Classic ivory sherwani with fine embroidery work',
    fabric: 'Silk' + 'Brocade' + 'Jacquard' + 'Embroidered' + 'Textured' + 'Handloom',
    colors: ['Ivory', 'Off White'],
    tags: ['Wedding', 'Premium']
  },
  // {
  //   id: 'wedding-04',
  //   name: 'Blush Pink Designer',
  //   category: 'wedding-sherwani',
  //   price: 16500,
  //   image: [productWedding4],
  //   description: 'Soft blush pink sherwani with modern royal finish',
  //   fabric: 'Silk Blend',
  //   colors: ['Blush Pink'],
  //   tags: ['Wedding', 'Trending']
  // }
];
