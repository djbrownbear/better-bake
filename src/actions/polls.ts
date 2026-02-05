import { createAsyncThunk } from '@reduxjs/toolkit';
import { savePoll, savePollAnswer } from "../utils/api";
import { apiClient } from "../utils/apiClient";
import { config } from "../config";
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

    let poll;
    if (config.USE_REAL_API) {
      // For real API, we need to parse the image URLs to extract baker/season/episode
      // Format expected: "baker-season-episode" or just use placeholder data for now
      const apiPoll = await apiClient.createPoll({
        optionOneText,
        optionOneBaker: optionOneImage, // TODO: Parse or provide proper baker ID
        optionOneSeason: '1',
        optionOneEpisode: '1',
        optionTwoText,
        optionTwoBaker: optionTwoImage, // TODO: Parse or provide proper baker ID
        optionTwoSeason: '1',
        optionTwoEpisode: '1',
      });
      poll = apiClient.transformApiPoll(apiPoll);
    } else {
      poll = await savePoll({
        optionOneText,
        optionTwoText,
        optionOneImage,
        optionTwoImage,
        author: authedUser!,
      });
    }

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
    if (config.USE_REAL_API) {
      const apiPoll = await apiClient.voteOnPoll(qid, answer);
      // Update local state with the new vote
      dispatch(addAnswer({ qid, answer, authedUser }));
      dispatch(addAnswerToUser({ authedUser, qid, answer }));
    } else {
      await savePollAnswer({
        qid,
        answer,
        authedUser,
      });
      dispatch(addAnswer({ qid, answer, authedUser }));
      dispatch(addAnswerToUser({ authedUser, qid, answer }));
    }
  }
);