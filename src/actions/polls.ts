import { createAsyncThunk } from '@reduxjs/toolkit';
import { savePoll, savePollAnswer } from "../utils/api";
import { addPoll, addAnswer } from "../reducers/polls";
import { addAnswerToUser, addPollToUser } from "../reducers/users";
import { RootState } from '../reducers';
import { PollAnswer } from '../types';

export const handleAddPoll = createAsyncThunk(
  'polls/addPoll',
  async (
    {
      optionOneText,
      optionTwoText,
      optionOneImage,
      optionTwoImage,
    }: {
      optionOneText: string;
      optionTwoText: string;
      optionOneImage: string;
      optionTwoImage: string;
    },
    { dispatch, getState }
  ) => {
    const { authedUser } = getState() as RootState;

    const poll = await savePoll({
      optionOneText,
      optionTwoText,
      optionOneImage,
      optionTwoImage,
      author: authedUser!,
    });

    dispatch(addPoll(poll));
    dispatch(addPollToUser({ author: poll.author, qid: poll.id }));
  }
);

export const handleAddAnswer = createAsyncThunk(
  'polls/addAnswer',
  async (
    { qid, answer, authedUser }: { qid: string; answer: PollAnswer; authedUser: string },
    { dispatch }
  ) => {
    await savePollAnswer({
      qid,
      answer,
      authedUser,
    });

    dispatch(addAnswer({ qid, answer, authedUser }));
    dispatch(addAnswerToUser({ authedUser, qid, answer }));
  }
);