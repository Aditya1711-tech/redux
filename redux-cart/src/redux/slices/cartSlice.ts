import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  name: string;
  price: number;
}

export type CartState = CartItem[];

const cartSlice = createSlice({
  name: "Cart",
  initialState: [],
  reducers: {
    addItem: (state: CartState, action: PayloadAction<CartItem>) => {
      state.push(action.payload);
    },
  },
});

export default cartSlice.reducer;
export const { addItem } = cartSlice.actions;
