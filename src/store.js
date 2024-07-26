import { configureStore } from "@reduxjs/toolkit";
import albumsReducer from "./albumsSlice";

const store = configureStore({
  reducer: {
    albums: albumsReducer,
  },
});

export default store;
