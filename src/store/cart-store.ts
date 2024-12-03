import { create } from 'zustand';
import { ProductOfCart } from '@/interfaces';
import { persist } from 'zustand/middleware';

interface State {
  cart: ProductOfCart[];
  addToCart: (product: ProductOfCart) => void;
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
    }),
    {
      name: 'cart-store',
    },
  ),
);
