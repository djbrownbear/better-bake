import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from "../utils/apiClient";
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
    const apiPoll = await apiClient.createPoll({
      optionOneText,
      optionOneBaker: optionOneImage,
      optionOneSeason: '1',
      optionOneEpisode: '1',
      optionTwoText,
      optionTwoBaker: optionTwoImage,
      optionTwoSeason: '1',
      optionTwoEpisode: '1',
    });
    const poll = apiClient.transformApiPoll(apiPoll);

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
    await apiClient.voteOnPoll(qid, answer);
    dispatch(addAnswer({ qid, answer, authedUser }));
    dispatch(addAnswerToUser({ authedUser, qid, answer }));
  }
);