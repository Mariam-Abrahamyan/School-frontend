import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logout, signin } from "../../services/api";

const initialState = {
  error: "",
};

export const signinAction = createAsyncThunk(
  "login/try",
  async ({ login, password }) => {
    return await signin({ login, password });
  },
);

export const logoutAction = createAsyncThunk("logout/try", async () => {
  return await logout();
});

const LoginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signinAction.fulfilled, (state, action) => {
      if (action.payload.status == "error") {
        state.error = action.payload.message;
      } else {
        state.error = "";
        state.isLogdin = true;
      }
      console.log(action.payload);
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      if (action.payload.status == "") {
        state.isLogdin = false;
      }
    });
  },
});

export const LoginReducer = LoginSlice.reducer;
