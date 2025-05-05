import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {}
};

export const hashtagSlice = createSlice({
  name: 'hashtag',
  initialState,
  reducers: {
    addTrend: (state, action) => {
      // for (let i = 0; i < action.payload.length; i++) {
      //   const tag = action.payload[i]*
      //pour les bébés
     
      action.payload.forEach(tag => { 
        if(state.value[tag]){
          state.value[tag]++
          
        } else{
          state.value[tag]=1
        }
      });
    },
    resetAllTrends:(state)=>{
      state.value= {}
    }
  },
});

export const { addTrend , resetAllTrends} = hashtagSlice.actions;
export default hashtagSlice.reducer;
