import type { Product } from './products';
import productMenSuit1 from '/textures/suits/Charcoal-Wedding-Suit.jpg';
import productMenSuit1_1 from '/textures/suits/cws1.jpg';
import productMenSuit1_2 from '/textures/suits/cws2.jpg';
import productMenSuit1_3 from '/textures/suits/cws3.jpg';
import productMenSuit1_4 from '/textures/suits/cws4.jpg';

import productMenSuit2 from '/textures/suits/suit-02.png';
import productMenSuit2_1 from '/textures/suits/suit-02-1.jpg';
import productMenSuit2_2 from '/textures/suits/cws3.jpg';
import productMenSuit2_3 from '/textures/suits/suit-02-2.jpg';
import productMenSuit2_4 from '/textures/suits/suit-02-3.jpg';
import productMenSuit2_5 from '/textures/suits/suit-02-4.jpg';

import productMenSuit3 from '/textures/suits/suit-03.jpg';
import productMenSuit3_1 from '/textures/suits/suit-03-1.jpg';
import productMenSuit3_2 from '/textures/suits/suit-03-2.jpg';
import productMenSuit3_3 from '/textures/suits/suit-03-3.jpg';

import productMenSuit4 from '/textures/suits/suit-04.jpg';
import productMenSuit4_1 from '/textures/suits/suit-04-1.webp';
import productMenSuit4_2 from '/textures/suits/cws3.jpg';
import productMenSuit4_3 from '/textures/suits/suit-04-2.jpg';


//  "Wool",
//     "Silk",
//     "Linen",
//     "Cotton",
//     "Plain",
//     "Striped",
//     "Textured",

export const suitingProducts: Product[] = [
  {
    id: 'suit-01',
    name: 'Charcoal Wedding',
    category: 'suiting',
    price: 8500,
    image: [productMenSuit1, productMenSuit1_1, productMenSuit1_2, productMenSuit1_3, productMenSuit1_4],
    isNew: true,
    description: 'Elegant charcoal suit styled for weddings and formal occasions',
    fabric: 'Plain' + 'Silk' + 'Linen',
    colors: ['Charcoal'],
    tags: ['Wedding', 'Formal'],
    style: '3-piece'
  },
  {
    id: 'suit-02',
    name: 'Black & Silver',
    category: 'suiting',
    price: 9200,
    image: [productMenSuit2, productMenSuit2_1, productMenSuit2_2, productMenSuit2_3, productMenSuit2_4, productMenSuit2_5],
    isNew: true,
    description: 'Premium black and silver contrast suit designed for luxury weddings and receptions',
    fabric: 'Plain' + 'Cotton' + 'Textured',
    colors: ['Black', 'Silver Grey'],
    tags: ['Wedding', 'Luxury', 'Reception'],
    style: '3-piece'
  },
  {
    id: 'suit-03',
    name: 'Formal Navy',
    category: 'suiting',
    price: 7800,
    image: [productMenSuit3, productMenSuit3_1, productMenSuit3_2, productMenSuit3_3],
    isNew: true,
    description: 'Classic navy suit designed for business and formal occasions',
    fabric: 'Plain' + 'Linen' + 'Textured',
    colors: ['Navy Blue'],
    tags: ['Formal', 'Business'],
    style: '2-piece'
  },
  {
    id: 'suit-04',
    name: 'Formal Light Grey',
    category: 'suiting',
    price: 11500,
    image: [productMenSuit4, productMenSuit4_1, productMenSuit4_2, productMenSuit4_3],
    description: 'Elegant light grey suit ideal for business and formal occasions',
    fabric: 'Wool' + 'Striped',
    colors: ['Light Silver Grey'],
    tags: ['Formal', 'Office Wear'],
    style: '3-piece'
  },
];
