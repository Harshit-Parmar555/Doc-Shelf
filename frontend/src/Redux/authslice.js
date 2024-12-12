import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage,
};

const authSilce = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

const persistauthreducer = persistReducer(persistConfig, authSilce.reducer);

export const { login, logout } = authSilce.actions;
export { persistauthreducer };
export default authSilce.reducer;
