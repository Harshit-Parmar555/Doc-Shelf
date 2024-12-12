import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "user",
  storage,
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    avatar: "",
    document: "",
    joinedat: "",
  },
  reducers: {
    setUserDetails: (state, action) => {
      const { name, email, avatar, document, joinedat } = action.payload;
      state.name = name;
      state.email = email;
      state.avatar = avatar;
      state.document = document;
      state.joinedat = joinedat;
    },
    clearUserDetails: () => ({
      name: "",
      email: "",
      avatar: "",
      joinedat: "",
      document: "",
    }),
  },
});

const persistUserReducer = persistReducer(persistConfig, userSlice.reducer);

export const { setUserDetails, clearUserDetails } = userSlice.actions;
export { persistUserReducer };
export default userSlice.reducer;
