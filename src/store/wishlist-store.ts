import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistState {
  productIds: string[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  toggleItem: (productId: string) => void;
  hasItem: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: [],

      addItem: (productId) => {
        if (!get().productIds.includes(productId)) {
          set({ productIds: [...get().productIds, productId] });
        }
      },

      removeItem: (productId) => {
        set({ productIds: get().productIds.filter((id) => id !== productId) });
      },

      toggleItem: (productId) => {
        if (get().productIds.includes(productId)) {
          get().removeItem(productId);
        } else {
          get().addItem(productId);
        }
      },

      hasItem: (productId) => get().productIds.includes(productId),

      clearWishlist: () => set({ productIds: [] }),
    }),
    {
      name: "aelora-wishlist",
    },
  ),
);

export const selectWishlistCount = (state: WishlistState) => state.productIds.length;
