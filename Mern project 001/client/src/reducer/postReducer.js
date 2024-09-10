import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
} from "../api/api_Index";

const initialState = {
  value: [],
  loading: false,
};

export const fetchPost = createAsyncThunk("fetchPost", async () => {
  const response = await getPosts();
  return response.data;
});

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    deleteReducer: (state, action) => {
      deletePost(action.payload.id);
    },
    likeReducer: (state, action) => {
      likePost(action.payload.id);
    },
    createPostReducer: (state, action) => {
      createPost(action.payload);
    },
    updatePostReducer: (state, action) => {
      updatePost(action.payload.id, action.payload.data);
    },
  },
  extraReducers: {
    [fetchPost.fulfilled]: (state, action) => {
      state.value = action.payload;
      state.loading = false;
    },
    [fetchPost.pending]: (state) => {
      state.loading = true;
    },
    [fetchPost.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const {
  deleteReducer,
  likeReducer,
  createPostReducer,
  updatePostReducer,
} = postSlice.actions;

export default postSlice.reducer;
