export interface Product {
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  gender: Gender;
}

export interface IProductSeed extends Omit<Product, 'images'> {
  images?: string[];
  type: Type;
}

export interface IProductInitialData extends Product {
  type: Type;
}

export const genders = ['men', 'women', 'kid', 'unisex'] as const;
export type Gender = (typeof genders)[number];
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';

export const types = ['shirts', 'pants', 'hoodies', 'hats'] as const;

export type Type = (typeof types)[number];

export interface SeedData {
  categories: Type[];
  products: IProductInitialData[];
}
