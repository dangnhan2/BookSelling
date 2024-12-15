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
      console.log(item.data);
      let isExistIndex = carts.findIndex((c) => c._id === item._id);
      if (isExistIndex > -1) {
        carts[isExistIndex].quantity =
          carts[isExistIndex].quantity + item.quantity;
        if (carts[isExistIndex].quantity > item.data.quantity) {
          carts[isExistIndex].quantity = item.data.quantity;
        }
      } else {
        carts.push({
          quantity: item.quantity,
          _id: item._id,
          data: item.data,
        });
      }

      state.cart = carts;
    },

    doUpdateAction: (state, action) => {
      let carts = state.cart;
      const item = action.payload;
      console.log(item.data);
      let isExistIndex = carts.findIndex((c) => c._id === item._id);
      if (isExistIndex > -1) {
        carts[isExistIndex].quantity = item.quantity;
        if (carts[isExistIndex].quantity > carts[isExistIndex].data.quantity) {
          carts[isExistIndex].quantity = carts[isExistIndex].data.quantity;
        }
      } else {
        carts.push({
          quantity: item.quantity,
          _id: item._id,
          data: item.data,
        });
      }

      state.cart = carts;
    },

    doDeleteAction: (state, action) => {
      // console.log(action.payload.id);
      let carts = state.cart;
      state.cart = carts.filter((item) => item._id !== action.payload.id);
    },

    doPlaceOrder: (state, action) => {
      state.cart = [];
    },
  },
});

export const { addToCart, doUpdateAction, doDeleteAction, doPlaceOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
