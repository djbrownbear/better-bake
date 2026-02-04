import { User, PollAnswer } from '../types';

export const RECEIVE_USERS = "RECEIVE_USERS" as const;
export const ADD_ANSWER_USER = "ADD_ANSWER_USER" as const;
export const ADD_POLL_USER = "ADD_POLL_USER" as const;

export function receiveUsers(users: Record<string, User>) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function addAnswerToUser({authedUser, qid, answer}: {authedUser: string; qid: string; answer: PollAnswer}) {
  return {
    type: ADD_ANSWER_USER,
    authedUser,
    qid,
    answer,
  };
}

export function addPollToUser({ author, id }: {author: string; id: string}) {
  return {
    type: ADD_POLL_USER,
    author,
    qid: id,
  };
}