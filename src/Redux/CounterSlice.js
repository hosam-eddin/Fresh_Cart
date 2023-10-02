import { createSlice } from "@reduxjs/toolkit";

let initialState = { counter: 0, userName: "" };

let counterSlicer = createSlice({
  name: "counterSlice",
  initialState,
  reducers: {
    increase: (state, action) => {
      state.counter += 1;
      console.log("increase");
    },
    decrease: (state, action) => {
      state.counter -= 1;
      console.log("decrease");
    },
  },
});
export let counterReducer = counterSlicer.reducer;
export let { decrease, increase } = counterSlicer.actions;
