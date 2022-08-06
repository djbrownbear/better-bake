import { savePoll, savePollAnswer } from "../utils/api";

export const RECEIVE_POLLS = "RECEIVE_POLLS";
export const ADD_POLL = "ADD_POLL";
export const ADD_ANSWER = "ADD_ANSWER";

export function receivePolls(polls) {
  return {
    type: RECEIVE_POLLS,
    polls,
  };
}

export function addPoll(poll) {
  return {
    type: ADD_POLL,
    poll,
  };
}

export function addAnswer(poll) {
  return {
    type: ADD_ANSWER,
    poll,
  };
}