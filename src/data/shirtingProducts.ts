import type { Product } from './products';
import productShirt1 from '/textures/shirts/shirts1.png';
import productShirt2 from '/textures/shirts/shirts2.png';
import productShirt3 from '/textures/shirts/shirts3.png';
import productShirt4 from '/textures/shirts/shirts4.png';
import productShirt5 from '/textures/shirts/shirts5.png';
// const filters = [
// "All", "Cotton", "Linen", "Plain", "Striped", "Checkered"
// ];
export const shirtingProducts: Product[] = [
  {
    id: 'shirt-01',
    name: 'Sky Blue Formal Cotton',
    category: 'shirting',
    price: 2200,
    image: [productShirt1],
    isNewArrival: true,
    description: 'Elegant sky blue shirt perfect for office and formal wear',
    fabric: 'Cotton',
    colors: ['Sky Blue'],
    tags: ['Formal', 'Office Wear']
  },
  {
    id: 'shirt-02',
    name: 'Classic White Premium',
    category: 'shirting',
    price: 1800,
    image: [productShirt2],
    isNewArrival: true,
    description: 'Timeless white shirt with a crisp and clean finish',
    fabric: 'Linen',
    colors: ['White'],
    tags: ['Formal']
  },
  {
    id: 'shirt-03',
    name: 'Jet Black Slim Fit',
    category: 'shirting',
    price: 2500,
    image: [productShirt3],
    description: 'Sharp black shirt designed for evening and formal styling',
    fabric: 'Plain',
    colors: ['Black'],
    tags: ['Party Wear', 'Formal']
  },
  {
    id: 'shirt-04',
    name: 'Navy Textured Designer',
    category: 'shirting',
    price: 1900,
    image: [productShirt4],
    description: 'Modern navy shirt with subtle texture for smart casual looks',
    fabric: 'Striped',
    colors: ['Navy Blue'],
    tags: ['Trending', 'Smart Casual']
  },
  {
    id: 'shirt-05',
    name: 'Formal Checkered',
    category: 'shirting',
    price: 1900,
    image: [productShirt5],
    description: 'Classic checkered shirt perfect for office and formal wear',
    fabric: 'Checkered',
    colors: ['Navy Blue'],
    tags: ['Trending', 'Smart Casual']
  }
];
