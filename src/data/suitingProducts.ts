import type { Product } from './products';
import productMenSuit1 from '@/assets/suities/Men/19.jpg';
import productMenSuit2 from '@/assets/suities/Men/1225.jpg';
import productMenSuit3 from '@/assets/suities/Men/1581.jpg';
import productMenSuit4 from '@/assets/suities/Men/5672.jpg';
import productMenSuit6 from '@/assets/suities/Men/5851.jpg';
import productMenSuit7 from '@/assets/suities/Men/9695.jpg';
import productMenSuit8 from '@/assets/suities/Men/21981.jpg';
import productMenSuit9 from '@/assets/suities/Men/63367.jpg';
import productMenSuit10 from '@/assets/suities/Men/311562.jpg';

export const suitingProducts: Product[] = [
  {
    id: 'suit-01',
    name: 'Charcoal Wedding Suit',
    category: 'suiting',
    price: 8500,
    image: [productMenSuit1, productMenSuit4, productMenSuit9, productMenSuit6],
    isNew: true,
    description: 'Elegant charcoal suit styled for weddings and formal occasions',
    fabric: 'Premium Wool Blend',
    colors: ['Charcoal'],
    tags: ['Wedding', 'Formal'],
    style: '3-piece'
  },
  {
    id: 'suit-02',
    name: 'Beige Textured Formal Blazer Set',
    category: 'suiting',
    price: 9200,
    image: [productMenSuit2, productMenSuit7, productMenSuit6, productMenSuit10],
    isNew: true,
    description: 'Sophisticated beige textured blazer with modern tailoring',
    fabric: 'Wool Blend',
    colors: ['Beige'],
    tags: ['Formal', 'Premium'],
    style: '2-piece'
  },
  {
    id: 'suit-03',
    name: 'Navy Slim Fit Designer Suit',
    category: 'suiting',
    price: 7800,
    image: [productMenSuit3, productMenSuit2, productMenSuit6, productMenSuit7],
    description: 'Sharp navy suit with modern slim fit silhouette',
    fabric: 'Premium Wool',
    colors: ['Navy Blue'],
    tags: ['Formal', 'Trending'],
    style: '2-piece'
  },
  {
    id: 'suit-04',
    name: 'Classic Black Business Suit',
    category: 'suiting',
    price: 11500,
    image: [productMenSuit4, productMenSuit7, productMenSuit3, productMenSuit1],
    description: 'Timeless black suit for corporate and formal wear',
    fabric: '100% Wool',
    colors: ['Black'],
    tags: ['Formal', 'Office Wear'],
    style: '2-piece'
  },
  {
    id: 'suit-05',
    name: 'Wine Party Wear Designer Suit',
    category: 'suiting',
    price: 6500,
    image: [productMenSuit9, productMenSuit7, productMenSuit4, productMenSuit1],
    description: 'Stylish wine-colored suit perfect for parties and events',
    fabric: 'Wool Blend',
    colors: ['Wine', 'Maroon'],
    tags: ['Party Wear', 'Trending'],
    style: '2-piece'
  },
  {
    id: 'suit-06',
    name: 'Midnight Velvet Luxury Suit',
    category: 'suiting',
    price: 13000,
    image: [productMenSuit6, productMenSuit1, productMenSuit3, productMenSuit10],
    description: 'Premium velvet suit with a rich luxurious finish',
    fabric: 'Velvet',
    colors: ['Midnight Blue'],
    tags: ['Premium', 'Party Wear'],
    style: '2-piece'
  },
  {
    id: 'suit-07',
    name: 'Checkered Grey Executive Suit',
    category: 'suiting',
    price: 7200,
    image: [productMenSuit7, productMenSuit2, productMenSuit4, productMenSuit1],
    description: 'Professional grey check suit for modern executives',
    fabric: 'Wool Blend',
    colors: ['Grey Check'],
    tags: ['Formal', 'Office Wear'],
    style: '3-piece'
  },
  {
    id: 'suit-08',
    name: 'Burgundy Wedding Statement Suit',
    category: 'suiting',
    price: 8900,
    image: [productMenSuit8, productMenSuit1, productMenSuit9, productMenSuit2],
    description: 'Bold burgundy suit designed for weddings and celebrations',
    fabric: 'Wool Blend',
    colors: ['Burgundy'],
    tags: ['Wedding', 'Party Wear'],
    style: '2-piece'
  }
];
