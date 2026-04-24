import { suitingProducts } from './suitingProducts';
import { shirtingProducts } from './shirtingProducts';
import { weddingProducts } from './weddingProducts';
import { kurtaProducts } from './kurtaProducts';
import { readyToWearProducts } from './readyToWearProducts';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string[];
  isNewArrival?: boolean;
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
  ...weddingProducts,
  ...kurtaProducts,
  ...readyToWearProducts,
];

export const getProductsByCategory = (category: string) => {
  if (category === 'ready-to-wear') {
    return products;
  }

  const aliasMap: Record<string, string> = {
    wedding: 'wedding-sherwani',
  };

  const normalizedCategory = aliasMap[category] ?? category;
  return products.filter((p) => p.category === normalizedCategory);
};

export const getNewArrivals = () => {
  return products.filter((p) => p.isNewArrival);
};
