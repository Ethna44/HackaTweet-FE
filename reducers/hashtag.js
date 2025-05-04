import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: []
};

export const hashtagSlice = createSlice({
  name: 'hashtag',
  initialState,
  reducers: {
    addTrend: (state, action) => {
      const combined = [...state.value, ...action.payload];

      const unique = [...new Set(combined)];

      state.value = unique;
    },
  },
});

export const { addTrend } = hashtagSlice.actions;
export default hashtagSlice.reducer;
