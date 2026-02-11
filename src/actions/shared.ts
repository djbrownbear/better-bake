import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from "../utils/apiClient";
import { receiveUsers } from "../reducers/users";
import { receivePolls } from "../reducers/polls";
import { receiveBakers } from "../reducers/bakers";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const handleInitialData = createAsyncThunk(
  'shared/fetchInitialData',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    
    try {
      const data = await apiClient.getInitialData();
      
      const { users, polls, bakers } = data;
      dispatch(receiveUsers(users));
      dispatch(receivePolls(polls));
      dispatch(receiveBakers(bakers));
      dispatch(hideLoading());
      
      return data;
    } catch (error) {
      dispatch(hideLoading());
      const errorMessage = error instanceof Error ? error.message : 'Failed to load data';
      console.error('Failed to load initial data:', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);