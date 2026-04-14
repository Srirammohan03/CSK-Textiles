import { products } from './src/data/products';
import fs from 'fs';

fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
console.log('Products exported to products.json!');
