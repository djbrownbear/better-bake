import { createAsyncThunk } from '@reduxjs/toolkit';
import { getInitialData } from "../utils/api";
import { receiveUsers } from "../reducers/users";
import { receivePolls } from "../reducers/polls";
import { receiveBakers } from "../reducers/bakers";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const handleInitialData = createAsyncThunk(
  'shared/fetchInitialData',
  async (_, { dispatch }) => {
    dispatch(showLoading());
    const { users, polls, bakers } = await getInitialData();
    dispatch(receiveUsers(users));
    dispatch(receivePolls(polls));
    dispatch(receiveBakers(bakers));
    dispatch(hideLoading());
  }
);