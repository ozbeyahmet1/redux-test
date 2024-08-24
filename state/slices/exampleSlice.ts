import { createSlice } from "@reduxjs/toolkit";

export interface exampleState {
  value: boolean;
}

const initialState: exampleState = {
  value: false,
};

export const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    open: (state) => {
      state.value = true;
    },
    close: (state) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { open, close } = exampleSlice.actions;

export default exampleSlice.reducer;
