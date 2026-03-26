import type { Product } from './products';
import productMenSuit1 from '@/assets/suities/Men/19.jpg';
import productMenSuit3 from '@/assets/suities/Men/1581.jpg';
import productWedding1 from '/images/wedding-dress.png';
import productWedding2 from '/images/wedding-dress2.jpg';
import productWedding3 from '/images/wedding-dress3.jpg';
import productWedding4 from '/images/wedding-dress4.jpg';

export const weddingProducts: Product[] = [
  {
    id: 'wedding-01',
    name: 'Royal Cream Sherwani Set',
    category: 'wedding-sherwani',
    price: 15000,
    image: [productWedding1, productWedding2],
    isNew: true,
    description: 'Elegant cream sherwani with traditional detailing',
    fabric: 'Silk Brocade',
    colors: ['Cream', 'Gold'],
    tags: ['Wedding', 'Festival', 'Premium']
  },
  {
    id: 'wedding-02',
    name: 'Navy Indo-Western Sherwani',
    category: 'wedding-sherwani',
    price: 12500,
    image: [productWedding2, productMenSuit3],
    isNew: true,
    description: 'Modern navy blue indo-western with structured fit',
    fabric: 'Silk Blend',
    colors: ['Navy Blue'],
    tags: ['Wedding', 'Reception']
  },
  {
    id: 'wedding-03',
    name: 'Ivory Embroidered Sherwani',
    category: 'wedding-sherwani',
    price: 18000,
    image: [productWedding3, productWedding4],
    description: 'Classic ivory sherwani with fine embroidery work',
    fabric: 'Silk Embroidery',
    colors: ['Ivory', 'Off White'],
    tags: ['Wedding', 'Premium']
  },
  {
    id: 'wedding-04',
    name: 'Blush Pink Designer Sherwani',
    category: 'wedding-sherwani',
    price: 16500,
    image: [productWedding4, productMenSuit1],
    description: 'Soft blush pink sherwani with modern royal finish',
    fabric: 'Silk Blend',
    colors: ['Blush Pink'],
    tags: ['Wedding', 'Trending']
  }
];
