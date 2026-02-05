import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Baker } from '../types';

type BakersState = Record<string, Baker>;

const bakersSlice = createSlice({
  name: 'bakers',
  initialState: {} as BakersState,
  reducers: {
    receiveBakers: (state, action: PayloadAction<Record<string, Baker>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { receiveBakers } = bakersSlice.actions;
export default bakersSlice.reducer;