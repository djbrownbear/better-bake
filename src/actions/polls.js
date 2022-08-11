import { savePoll, savePollAnswer } from "../utils/api";
import { addAnswerToUser, addPollToUser } from "./users";

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

export function handleAddPoll(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return savePoll({
      optionOneText, 
      optionTwoText, 
      author: authedUser,
    })
    .then((poll) => {
      dispatch(addPoll(poll))
      dispatch(addPollToUser(poll))
    });  
  };
}


export function addAnswer({qid, answer, authedUser}) {
  return {
    type: ADD_ANSWER,
    qid,
    answer,
    authedUser,
  };
}

export function handleAddAnswer({ qid, answer, authedUser }) {
  return (dispatch) => {
    // const { authedUser } = getState();

    return savePollAnswer({
      qid,
      answer,      
      authedUser,
    }).then(() => {
      dispatch(addAnswer({qid, answer, authedUser}))
      dispatch(addAnswerToUser({qid, answer, authedUser}))
    })
    .catch((e) => {
      console.log('something went wrong ', e);
    })
  };
}