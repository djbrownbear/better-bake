import { ADD_POLL, ADD_ANSWER, RECEIVE_POLLS } from "../actions/polls";

export default function polls(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POLLS:
      return {
        ...state,
        ...action.polls,
      }
    case ADD_POLL:
      const { poll } = action;
      return {
        ...state,
        [poll.id]: poll,
      };
    case ADD_ANSWER: {
      const { qid, answer, authedUser } = action;

      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
          ...state[qid][answer],
          votes: state[qid][answer].votes.concat([authedUser]),
          },
        },
      };
    }
    default:
      return state;
  };
}