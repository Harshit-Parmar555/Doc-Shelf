import { createSlice, configureStore } from "@reduxjs/toolkit";
import {persistReducer,persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage"


const persistConfig = {
    key : "auth",
    storage
};



const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
  },
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
  },
});

const persistreducer = persistReducer(persistConfig,authSlice.reducer);



export const authActions = authSlice.actions;

export const store = configureStore({
  reducer : persistreducer ,
});

export const persistedstore = persistStore(store);