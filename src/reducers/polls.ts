import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Poll, PollAnswer } from '../types';

type PollsState = Record<string, Poll>;

const pollsSlice = createSlice({
  name: 'polls',
  initialState: {} as PollsState,
  reducers: {
    receivePolls: (state, action: PayloadAction<Record<string, Poll>>) => {
      return { ...state, ...action.payload };
    },
    addPoll: (state, action: PayloadAction<Poll>) => {
      state[action.payload.id] = action.payload;
    },
    addAnswer: (state, action: PayloadAction<{ qid: string; answer: PollAnswer; authedUser: string }>) => {
      const { qid, answer, authedUser } = action.payload;
      state[qid][answer].votes.push(authedUser);
    },
  },
});

export const { receivePolls, addPoll, addAnswer } = pollsSlice.actions;
export default pollsSlice.reducer;