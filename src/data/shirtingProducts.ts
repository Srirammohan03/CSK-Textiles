import type { Product } from './products';
import productShirt1 from '/images/shirts1.jpg';
import productShirt2 from '/images/shirts2.jpg';
import productShirt3 from '/images/shirts3.jpg';
import productShirt4 from '/images/shirts4.jpg';
import productShirt5 from '/images/shirts5.jpg';

export const shirtingProducts: Product[] = [
  {
    id: 'shirt-01',
    name: 'Sky Blue Formal Cotton Shirt',
    category: 'shirting',
    price: 2200,
    image: [productShirt1, productShirt2, productShirt3, productShirt4],
    isNew: true,
    description: 'Elegant sky blue shirt perfect for office and formal wear',
    fabric: '100% Cotton',
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
    fabric: 'Egyptian Cotton',
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
    fabric: 'Cotton Blend',
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
    fabric: 'Cotton Blend',
    colors: ['Navy Blue'],
    tags: ['Trending', 'Smart Casual']
  },
  {
    id: 'shirt-05',
    name: 'Emerald Green Statement Shirt',
    category: 'shirting',
    price: 2600,
    image: [productShirt5, productShirt1, productShirt2, productShirt3],
    description: 'Bold designer shirt for standout party and evening wear',
    fabric: 'Premium Cotton Blend',
    colors: ['Emerald Green'],
    tags: ['Party Wear', 'Trending', 'Designer']
  }
];
