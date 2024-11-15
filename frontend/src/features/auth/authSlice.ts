import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { FormInput } from "../../pages/signUp";
import { Inputs } from "../../pages/login";

const user = localStorage.getItem("user");

const initialState = {
  user: user ? user : null,
  isErrored: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const registerUser = createAsyncThunk<string, FormInput>(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      console.log(userData);
      return await authService.register(userData);
    } catch (error: any) {
      const message =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const loginUser = createAsyncThunk<string, Inputs>(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      console.log(userData);
      return await authService.login(userData);
    } catch (error: any) {
      const message =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isErrored = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.user = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isErrored = true;
        state.message = (action.payload as any).message;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isErrored = true;
        state.message = (action.payload as any).message;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
