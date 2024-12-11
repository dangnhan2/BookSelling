import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let carts = state.cart;
      const item = action.payload;
      let isExistIndex = carts.findIndex((c) => c._id === item._id);
      if (isExistIndex > -1) {
        carts[isExistIndex].quantity =
          carts[isExistIndex].quantity + item.quantity;
        if (carts[isExistIndex].quantity > item.quantity) {
          carts[isExistIndex].quantity = item.quantity;
        }

        // if (isExistProduct > -1) {
        //     carts[isExistProduct].quantity =
        //       carts[isExistProduct].quantity + product.quantity;
        //     if (carts[isExistProduct].quantity > product.quantity) {
        //       carts[isExistProduct].quantity = product.quantity;
        //     }
      } else {
        carts.push({
          quantity: item.quantity,
          _id: item._id,
          data: item,
        });
      }

      state.cart = carts;
    },
  },
});

export const { addToCart } = orderSlice.actions;
export default orderSlice.reducer;
