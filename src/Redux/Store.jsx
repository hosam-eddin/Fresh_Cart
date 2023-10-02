import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./CounterSlice";

// Store waiting the reducer
export let store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
