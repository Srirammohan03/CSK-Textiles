import type { Product } from './products';
import productShirt1 from '/textures/shirts/shirts1.jpg';
import productShirt2 from '/textures/shirts/shirts2.jpg';
import productShirt3 from '/textures/shirts/shirts3.jpg';
import productShirt4 from '/textures/shirts/shirts4.jpg';
// const filters = [
//   "All",
//   "Cotton",
//   "Linen",
//   "Egyptian Cotton",
//   "Poplin",
//   "Plain",
//   "Striped",
//   "Checkered",
// ];
export const shirtingProducts: Product[] = [
  {
    id: 'shirt-01',
    name: 'Sky Blue Formal Cotton Shirt',
    category: 'shirting',
    price: 2200,
    image: [productShirt1, productShirt2, productShirt3, productShirt4],
    isNew: true,
    description: 'Elegant sky blue shirt perfect for office and formal wear',
    fabric: 'Cotton' + 'Plain',
    colors: ['Sky Blue'],
    tags: ['Formal', 'Office Wear']
  },
  {
    id: 'shirt-02',
    name: 'Classic White Premium Shirt',
    category: 'shirting',
    price: 1800,
    image: [productShirt2, productShirt1, productShirt3, productShirt4],
    isNew: true,
    description: 'Timeless white shirt with a crisp and clean finish',
    fabric: 'Egyptian Cotton' + 'Plain',
    colors: ['White'],
    tags: ['Formal', 'Premium']
  },
  {
    id: 'shirt-03',
    name: 'Jet Black Slim Fit Shirt',
    category: 'shirting',
    price: 2500,
    image: [productShirt3, productShirt1, productShirt2, productShirt4],
    description: 'Sharp black shirt designed for evening and formal styling',
    fabric: 'Linen' + 'Plain' + 'Poplin',
    colors: ['Black'],
    tags: ['Party Wear', 'Formal']
  },
  {
    id: 'shirt-04',
    name: 'Navy Textured Designer Shirt',
    category: 'shirting',
    price: 1900,
    image: [productShirt4, productShirt1, productShirt2, productShirt3],
    description: 'Modern navy shirt with subtle texture for smart casual looks',
    fabric: 'Striped' + 'Checkered',
    colors: ['Navy Blue'],
    tags: ['Trending', 'Smart Casual']
  }
];
