import { ADD_ANSWER_USER, ADD_POLL_USER, RECEIVE_USERS } from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_ANSWER_USER:
      return {
        ...state,
        [action.authedUser] : {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid] : action.answer
          }
        }
      };
    case ADD_POLL_USER:
      return {
        ...state,
        [action.poll.author] : {
          ...state[action.poll.author],
          questions: state[action.poll.author].questions.concat(action.poll.qid)
          }
      };
    default:
      return state;
  };
}