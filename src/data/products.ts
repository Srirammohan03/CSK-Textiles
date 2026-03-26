import { suitingProducts } from './suitingProducts';
import { shirtingProducts } from './shirtingProducts';
import { weddingProducts } from './weddingProducts';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string[];
  isNew?: boolean;
  description: string;
  longDescription?: string;
  fabric: string;
  colors: string[];
  tags?: string[];
  style?: string;
}

export const products: Product[] = [
  ...suitingProducts,
  ...shirtingProducts,
  ...weddingProducts
];

export const getProductsByCategory = (category: string) => {
  return products.filter(p => p.category === category);
};

export const getNewArrivals = () => {
  return products.filter(p => p.isNew);
};
