import { combineReducers } from "@reduxjs/toolkit";
import authedUser from "./authedUser";
import users from "./users";
import polls from "./polls";
import bakers from "./bakers";
import { loadingBarReducer } from "react-redux-loading-bar";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ApiHealthState = {
  isUsingMockData: boolean;
  lastError: string | null;
};

const apiHealthSlice = createSlice({
  name: 'apiHealth',
  initialState: { isUsingMockData: false, lastError: null } as ApiHealthState,
  reducers: {
    setUsingMockData: (state, action: PayloadAction<boolean>) => {
      state.isUsingMockData = action.payload;
    },
    setApiError: (state, action: PayloadAction<string | null>) => {
      state.lastError = action.payload;
    },
  },
});

export const { setUsingMockData, setApiError } = apiHealthSlice.actions;

const rootReducer = combineReducers({
  authedUser,
  users,
  polls,
  bakers,
  apiHealth: apiHealthSlice.reducer,
  loadingBar: loadingBarReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;