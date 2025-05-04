import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: []
};

export const hashtagSlice = createSlice({
  name: 'hashtag',
  initialState,
  reducers: {
    addTrend: (state, action) => {
      state.value.push(...action.payload)
    }
  },
});

export const { addTrend } = hashtagSlice.actions;
export default hashtagSlice.reducer;
