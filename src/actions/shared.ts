import { createAsyncThunk } from '@reduxjs/toolkit';
import { getInitialData } from "../utils/api";
import { apiClient } from "../utils/apiClient";
import { config } from "../config";
import { receiveUsers } from "../reducers/users";
import { receivePolls } from "../reducers/polls";
import { receiveBakers } from "../reducers/bakers";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const handleInitialData = createAsyncThunk(
  'shared/fetchInitialData',
  async (_, { dispatch }) => {
    dispatch(showLoading());
    
    // Use real API or mock data based on feature flag
    const data = config.USE_REAL_API
      ? await apiClient.getInitialData()
      : await getInitialData();
    
    const { users, polls, bakers } = data;
    dispatch(receiveUsers(users));
    dispatch(receivePolls(polls));
    dispatch(receiveBakers(bakers));
    dispatch(hideLoading());
  }
);