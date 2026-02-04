import { ADD_ANSWER_USER, ADD_POLL_USER, RECEIVE_USERS } from "../actions/users";
import { User, PollAnswer } from '../types';

interface ReceiveUsersAction {
  type: typeof RECEIVE_USERS;
  users: Record<string, User>;
}

interface AddAnswerUserAction {
  type: typeof ADD_ANSWER_USER;
  authedUser: string;
  qid: string;
  answer: PollAnswer;
}

interface AddPollUserAction {
  type: typeof ADD_POLL_USER;
  author: string;
  qid: string;
}

type UsersAction = ReceiveUsersAction | AddAnswerUserAction | AddPollUserAction;

type UsersState = Record<string, User>;

export default function users(state: UsersState = {}, action: UsersAction): UsersState {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_ANSWER_USER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer
          }
        }
      };
    case ADD_POLL_USER:
      return {
        ...state,
        [action.author]: {
          ...state[action.author],
          questions: state[action.author].questions.concat(action.qid)
        }
      };
    default:
      return state;
  }
}