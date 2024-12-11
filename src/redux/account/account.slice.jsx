import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { LogoutAPI } from "../../service/api";
const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: {
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: "",
  },
};

export const UserLogout = createAsyncThunk("user/logout", async () => {
  let res = await LogoutAPI();
  if (res && res.statusCode === 201) {
    return;
  }
});

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    doLoginAction: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload;
    },
    doGetAction: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(UserLogout.fulfilled, (state) => {
      localStorage.removeItem("access_token");
      state.isAuthenticated = false;
      state.isLoading = true;
      state.user = {
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
      };
    });
  },
});

// Action creators are generated for each case reducer function
export const { doLoginAction, doGetAction } = accountSlice.actions;

export default accountSlice.reducer;
