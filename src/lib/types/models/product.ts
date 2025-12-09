import type { Category } from './category';

export type Product = {
  id: number;
  name: string;
  image: string;
  is_cart: boolean;
  cart_item_id: number | null;
  is_favorite: boolean;
  description: string;
  price: string;
  price_before_discount: string | null;
  discount_percentage: string | null;
  categories: Category[];
  rates: { count: number; avg: string };
  stock: number;
  color_list: string[];
};
