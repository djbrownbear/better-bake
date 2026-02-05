import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, PollAnswer } from '../types';

type UsersState = Record<string, User>;

const usersSlice = createSlice({
  name: 'users',
  initialState: {} as UsersState,
  reducers: {
    receiveUsers: (state, action: PayloadAction<Record<string, User>>) => {
      return { ...state, ...action.payload };
    },
    addAnswerToUser: (state, action: PayloadAction<{ authedUser: string; qid: string; answer: PollAnswer }>) => {
      const { authedUser, qid, answer } = action.payload;
      state[authedUser].answers[qid] = answer;
    },
    addPollToUser: (state, action: PayloadAction<{ author: string; qid: string }>) => {
      const { author, qid } = action.payload;
      state[author].questions.push(qid);
    },
  },
});

export const { receiveUsers, addAnswerToUser, addPollToUser } = usersSlice.actions;
export default usersSlice.reducer;