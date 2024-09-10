import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../postReducer";
import authReducer from "../authReducer";

export default configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
