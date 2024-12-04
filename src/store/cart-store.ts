import { create } from 'zustand';
import { ProductOfCart } from '@/interfaces';
import { persist } from 'zustand/middleware';

interface State {
  cart: ProductOfCart[];
  getTotalItems: () => number;
  addToCart: (product: ProductOfCart) => void;
  updateProductQuantity: (product: ProductOfCart, quantity: number) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => {
        const { cart } = get();

        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size,
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        const updatedCart = cart.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + product.quantity }
            : item,
        );

        set({ cart: updatedCart });
      },
      getTotalItems: () => {
        const { cart } = get();
        let totalItems = 0;
        cart.forEach((item) => {
          totalItems += item.quantity;
        });
        return totalItems;
      },
      updateProductQuantity: (product, quantity) => {
        const { cart } = get();

        const updatedCart = cart.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity }
            : item,
        );

        set({ cart: updatedCart });
      },
    }),
    {
      name: 'cart-store',
    },
  ),
);
