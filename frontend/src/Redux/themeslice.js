import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"

const persistConfig = {
    key: "theme",
    storage,
  };

  const themeSilce = createSlice({
    name: "theme",
    initialState: {
      theme: false
    },
    reducers: {
      themetoggle:(state)=>{
        state.theme = !state.theme
      }
    },
  });

  const persistthemereducer = persistReducer(persistConfig,themeSilce.reducer)

  export const {themetoggle} = themeSilce.actions

  export {persistthemereducer}
