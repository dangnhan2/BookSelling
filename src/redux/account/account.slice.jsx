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
  tempAvatar: "",
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
    doUploadAvatarAction: (state, action) => {
      state.tempAvatar = action.payload.avatar;
      // state.user.avatar = action.payload.avatar;
      // console.log(state.tempAvatar);
    },
    doUpdateUserInfoAction: (state, action) => {
      state.user.avatar = action.payload.avatar;
      state.user.phone = action.payload.phone;
      state.user.fullName = action.payload.fullName;
      // console.log(state.user);
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
export const {
  doLoginAction,
  doGetAction,
  doUploadAvatarAction,
  doUpdateUserInfoAction,
} = accountSlice.actions;

export default accountSlice.reducer;
