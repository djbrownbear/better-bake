import { ADD_POLL, ADD_ANSWER, RECEIVE_POLLS } from "../actions/polls";
import { Poll, PollAnswer } from '../types';

interface ReceivePollsAction {
  type: typeof RECEIVE_POLLS;
  polls: Record<string, Poll>;
}

interface AddPollAction {
  type: typeof ADD_POLL;
  poll: Poll;
}

interface AddAnswerAction {
  type: typeof ADD_ANSWER;
  qid: string;
  answer: PollAnswer;
  authedUser: string;
}

type PollsAction = ReceivePollsAction | AddPollAction | AddAnswerAction;

type PollsState = Record<string, Poll>;

export default function polls(state: PollsState = {}, action: PollsAction): PollsState {
  switch (action.type) {
    case RECEIVE_POLLS:
      return {
        ...state,
        ...action.polls,
      };
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
  }
}