export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_ANSWER_USER = "ADD_ANSWER_USER";
export const ADD_POLL_USER = "ADD_POLL_USER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function addAnswerToUser({authedUser, qid, answer}) {
  return {
    type: ADD_ANSWER_USER,
    authedUser,
    qid,
    answer,
  };
}

export function addPollToUser({ author, id }) {
  return {
    type: ADD_POLL_USER,
    author,
    qid: id,
  };
}