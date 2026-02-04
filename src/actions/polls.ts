import { savePoll, savePollAnswer } from "../utils/api";
import { addAnswerToUser, addPollToUser } from "./users";
import { Poll, PollAnswer, RootState } from '../types';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

export const RECEIVE_POLLS = "RECEIVE_POLLS" as const;
export const ADD_POLL = "ADD_POLL" as const;
export const ADD_ANSWER = "ADD_ANSWER" as const;

export function receivePolls(polls: Record<string, Poll>) {
  return {
    type: RECEIVE_POLLS,
    polls,
  };
}

export function addPoll(poll: Poll) {
  return {
    type: ADD_POLL,
    poll,
  };
}

export function handleAddPoll(
  optionOneText: string,
  optionTwoText: string,
  optionOneImage: string,
  optionTwoImage: string
): ThunkAction<Promise<void>, RootState, unknown, AnyAction> {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return savePoll({
      optionOneText,
      optionTwoText,
      optionOneImage,
      optionTwoImage,
      author: authedUser!,
    }).then((poll) => {
      dispatch(addPoll(poll));
      dispatch(addPollToUser(poll));
    });
  };
}

export function addAnswer({qid, answer, authedUser}: {qid: string; answer: PollAnswer; authedUser: string}) {
  return {
    type: ADD_ANSWER,
    qid,
    answer,
    authedUser,
  };
}

export function handleAddAnswer({ qid, answer, authedUser }: {qid: string; answer: PollAnswer; authedUser: string}): ThunkAction<Promise<void>, RootState, unknown, AnyAction> {
  return (dispatch) => {
    return savePollAnswer({
      qid,
      answer,
      authedUser,
    })
      .then(() => {
        dispatch(addAnswer({qid, answer, authedUser}));
        dispatch(addAnswerToUser({qid, answer, authedUser}));
      })
      .catch((e) => {
        console.log('something went wrong ', e);
      });
  };
}