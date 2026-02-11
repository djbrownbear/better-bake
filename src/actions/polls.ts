import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from "../utils/apiClient";
import { addPoll, addAnswer } from "../reducers/polls";
import { addAnswerToUser, addPollToUser } from "../reducers/users";
import { PollAnswer } from '../types';

export const handleAddPoll = createAsyncThunk(
  'polls/addPoll',
  async (
    {
      optionOneText,
      optionOneBaker,
      optionOneSeason,
      optionOneEpisode,
      optionTwoText,
      optionTwoBaker,
      optionTwoSeason,
      optionTwoEpisode,
    }: {
      optionOneText: string;
      optionOneBaker: string;
      optionOneSeason: string;
      optionOneEpisode: string;
      optionTwoText: string;
      optionTwoBaker: string;
      optionTwoSeason: string;
      optionTwoEpisode: string;
    },
    { dispatch }
  ) => {
    const apiPoll = await apiClient.createPoll({
      optionOneText,
      optionOneBaker,
      optionOneSeason,
      optionOneEpisode,
      optionTwoText,
      optionTwoBaker,
      optionTwoSeason,
      optionTwoEpisode,
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