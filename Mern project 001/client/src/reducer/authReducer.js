import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signin, signup } from "../api/api_Index";

const initialState = {
  value: { authData: {} },
};

export const signInReducer = createAsyncThunk("signInReducer", async (Data) => {
  const { navigate, newUser } = Data;
  const { data } = await signin(newUser);
  return { data, navigate };
});

export const signUpReducer = createAsyncThunk("signUpReducer", async (Data) => {
  const { navigate, newUser } = Data;
  const { data } = await signup(newUser);
  return { data, navigate };
});

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    logOutReducer: (state, action) => {
      localStorage.clear();
      state.value.authData = null;
      state.loginStatus = false;
      state.signUpStatus = false;
    },
  },
  extraReducers: {
    [signInReducer.fulfilled]: (state, action) => {
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...action.payload.data })
      );
      state.value.authData = action.payload.data.result;
      action.payload.navigate("/");
    },
    [signUpReducer.fulfilled]: (state, action) => {
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...action.payload.data })
      );
      state.value.authData = action.payload.data.result;
      action.payload.navigate("/");
    },
  },
});

export const { logOutReducer } = authSlice.actions;

export default authSlice.reducer;
