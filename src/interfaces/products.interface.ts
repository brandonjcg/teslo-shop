import { ICountrySeed } from '@/seed';

export interface Product {
  id: string;
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

export interface IProductInitialData extends Omit<Product, 'id'> {
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
  users: IUserSeed[];
  countries: ICountrySeed[];
}

export interface ProductOfCart {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  size: Size;
  image: string;
}

// user
export enum EnumRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface IUserSeed {
  email: string;
  name: string;
  password: string;
  role: EnumRole;
}
