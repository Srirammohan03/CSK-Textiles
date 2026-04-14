import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL, getImageUrl } from "@/api/config";
import type { Product } from "@/data/products";

export type { Product } from "@/data/products";

const parseImagePaths = (product: Product): Product => {
  if (product && product.image) {
    if (Array.isArray(product.image)) {
      product.image = product.image.map(img => getImageUrl(img));
    } else if (typeof product.image === "string") {
      // @ts-ignore - Handle string edge cases properly though TS says string[]
      product.image = [getImageUrl(product.image)];
    }
  }
  return product;
};

const fetchProducts = async (category?: string): Promise<Product[]> => {
  const url = category 
    ? `${API_BASE_URL}/products?category=${category}` 
    : `${API_BASE_URL}/products`;
    
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch products");
  
  const data: Product[] = await res.json();
  return data.map(parseImagePaths);
};

const fetchProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  
  const product: Product = await res.json();
  return parseImagePaths(product);
};

export const useProducts = (category?: string) => {
  return useQuery({
    queryKey: ["products", category],
    queryFn: () => fetchProducts(category),
  });
};

export const useProduct = (id?: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });
};

export const useNewArrivals = () => {
  return useQuery({
    queryKey: ["products", "new-arrivals"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/products?newArrival=true`);
      if (!res.ok) throw new Error("Failed to fetch new arrivals");
      const data: Product[] = await res.json();
      return data.map(parseImagePaths);
    },
  });
};
