import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")).cart
    : [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      if (state.cart.find((item) => item.pizzaId === action.payload.pizzaId)) {
        const item = state.cart.find(
          (item) => item.pizzaId === action.payload.pizzaId
        );
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
        return;
      }
      state.cart.push(action.payload);
      localStorage.setItem("cart", JSON.stringify({ cart: state.cart }));
    },
    removeItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
      localStorage.setItem("cart", JSON.stringify({ cart: state.cart }));
    },
    increaseQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
      localStorage.setItem("cart", JSON.stringify({ cart: state.cart }));
    },
    decreaseQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) {
        state.cart = state.cart.filter(
          (item) => item.pizzaId !== action.payload
        );
      }
      localStorage.setItem("cart", JSON.stringify({ cart: state.cart }));
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});
export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getTotalCartItems = (state) =>
  state.cart.cart.reduce((acc, item) => acc + item.quantity, 0);
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((acc, item) => acc + item.totalPrice, 0);
export const getCurrentQuantityById = (id) => (state) => {
  return state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
};
export const getCart = (state) => state.cart.cart;
