import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";

export default configureStore({
  reducer: combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
  }),
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(baseApi.middleware);
  },
});
