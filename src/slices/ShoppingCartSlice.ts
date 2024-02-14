import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { ReactNode } from "react";

type CartItem = {
  id: number;
  quantity: number;
};

interface ShoppingCartState {
  cartItems: CartItem[];
  isOpen: boolean;
}

// type ShoppingCartProviderProps = {
//   children: ReactNode;
// };

// interface ShoppingCartContext {
//   openCart: () => void;
//   closeCart: () => void;
//   getItemQuantity: (id: number) => number;
//   increaseCartQuantity: (id: number) => void;
//   decreaseCartQuantity: (id: number) => void;
//   removeFromCart: (id: number) => void;
//   cartQuantity: number;
//   cartItems: CartItem[];
// }

const initialState: ShoppingCartState = {
  cartItems: [],
  isOpen: false,
};

const ShoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    increaseCartQuantity: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (!existingItem) {
        state.cartItems.push({ id, quantity: 1 });
      } else {
        existingItem.quantity += 1;
      }
    },
    decreaseCartQuantity: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = Math.max(0, existingItem.quantity - 1);
        if (existingItem.quantity === 0) {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
    },
  },
});

export const {
  openCart,
  closeCart,
  increaseCartQuantity,
  decreaseCartQuantity,
  removeFromCart,
} = ShoppingCartSlice.actions;

export default ShoppingCartSlice.reducer;
