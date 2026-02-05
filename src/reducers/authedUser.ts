import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const authedUserSlice = createSlice({
  name: 'authedUser',
  initialState: null as string | null,
  reducers: {
    setAuthedUser: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
    logoutAuthedUser: () => {
      return null;
    },
  },
});

export const { setAuthedUser, logoutAuthedUser } = authedUserSlice.actions;
export default authedUserSlice.reducer;