import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const hashtagSlice = createSlice({
  name: "hashtag",
  initialState,
  reducers: {
    setTrends: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setTrends } = hashtagSlice.actions;
export default hashtagSlice.reducer;
