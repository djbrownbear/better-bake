import { createAsyncThunk } from '@reduxjs/toolkit';
import { getInitialData } from "../utils/api";
import { apiClient } from "../utils/apiClient";
import { config } from "../config";
import { receiveUsers } from "../reducers/users";
import { receivePolls } from "../reducers/polls";
import { receiveBakers } from "../reducers/bakers";
import { setUsingMockData, setApiError } from "../reducers/index";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const handleInitialData = createAsyncThunk(
  'shared/fetchInitialData',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    
    try {
      // Use real API or mock data based on feature flag
      let data;
      let usedFallback = false;
      
      if (config.USE_REAL_API) {
        try {
          data = await apiClient.getInitialData();
          dispatch(setUsingMockData(false));
          dispatch(setApiError(null));
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'API request failed';
          console.error('Real API failed, falling back to mock data:', errorMessage);
          
          // Track that we're using fallback
          dispatch(setApiError(errorMessage));
          dispatch(setUsingMockData(true));
          usedFallback = true;
          
          // Fallback to mock data if real API fails
          data = await getInitialData();
        }
      } else {
        data = await getInitialData();
        dispatch(setUsingMockData(true));
      }
      
      const { users, polls, bakers } = data;
      dispatch(receiveUsers(users));
      dispatch(receivePolls(polls));
      dispatch(receiveBakers(bakers));
      dispatch(hideLoading());
      
      return { data, usedFallback };
    } catch (error) {
      dispatch(hideLoading());
      const errorMessage = error instanceof Error ? error.message : 'Failed to load data';
      console.error('Failed to load initial data:', errorMessage);
      dispatch(setApiError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);