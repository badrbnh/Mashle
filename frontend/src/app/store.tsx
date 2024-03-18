import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Define RootState based on the shape of your store
export type RootState = ReturnType<typeof store.getState>;

export default store;
