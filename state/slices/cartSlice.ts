import { Product } from "@/utils/useFetchProducts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Represents an item in the cart with quantity.
 * Extends from the Product interface.
 */
interface CartItem extends Product {
  quantity: number;
}

/**
 * Represents the state of the cart.
 */
interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Adds a product to the cart. If the product already exists, increases its quantity.
     * @param state - The current cart state.
     * @param action - The action payload, which contains the product to add.
     */
    addToProduct: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingProduct = state.items.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    /**
     * Removes a product from the cart based on its ID.
     * @param state - The current cart state.
     * @param action - The action payload, which contains the ID of the product to remove.
     */
    removeProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    /**
     * Increases the quantity of a product in the cart based on its ID.
     * @param state - The current cart state.
     * @param action - The action payload, which contains the ID of the product to increase.
     */
    increaseProductNumber: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const existingProduct = state.items.find((item) => item.id === productId);
      if (existingProduct) {
        existingProduct.quantity += 1;
      }
    },
    /**
     * Decreases the quantity of a product in the cart based on its ID.
     * If the quantity reaches 1, the product is removed from the cart.
     * @param state - The current cart state.
     * @param action - The action payload, which contains the ID of the product to decrease.
     */
    decreaseProductNumber: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const existingProduct = state.items.find((item) => item.id === productId);
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== productId);
        }
      }
    },
  },
});

export const { addToProduct, removeProduct, increaseProductNumber, decreaseProductNumber } = cartSlice.actions;
export default cartSlice.reducer;

/**
 * Selects the total price of all items in the cart.
 * @param state - The current cart state.
 * @returns The total price of all items in the cart.
 */
export const selectTotalPrice = (state: CartState) =>
  state.items.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
