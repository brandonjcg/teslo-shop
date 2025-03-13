import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GLOBAL_TAX } from '@/constants/cart';
import { type ProductOfCart } from '@/interfaces/products.interface';

interface State {
  cart: ProductOfCart[];
  getTotalItems: () => number;
  addToCart: (product: ProductOfCart) => void;
  updateProductQuantity: (product: ProductOfCart, quantity: number) => void;
  removeProduct: (product: ProductOfCart) => void;
  getSummaryInfo: () => {
    totalItems: number;
    subTotal: number;
    taxes: number;
    total: number;
  };
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      clearCart: () => set({ cart: [] }),
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
      removeProduct: (product) => {
        const { cart } = get();
        const updatedCart = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size,
        );

        set({ cart: updatedCart });
      },
      getSummaryInfo: () => {
        const { cart } = get();
        const summary = {
          subTotal: 0,
        };

        cart.forEach((item) => {
          summary.subTotal += item.price * item.quantity;
        });
        const taxes = summary.subTotal * (GLOBAL_TAX / 100);
        const total = summary.subTotal + taxes;

        return {
          totalItems: get().getTotalItems(),
          subTotal: summary.subTotal,
          taxes,
          total,
        };
      },
    }),
    {
      name: 'cart-store',
    },
  ),
);
