import { configureStore } from "@reduxjs/toolkit";
import { persistauthreducer } from "./authslice";
import { persistStore } from "redux-persist";
import authReducer from "./authslice.js";
import { persistUserReducer } from "./userslice";
import { persistthemereducer } from "./themeslice";

const rootreducer = {
  auth: persistauthreducer,
  user: persistUserReducer,
  theme : persistthemereducer
};

const store = configureStore({
  reducer: rootreducer,
});

const persistedstore = persistStore(store);

export default store;

export { persistedstore };
