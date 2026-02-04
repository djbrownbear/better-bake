import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
  _getBakers,
} from './_DATA.js';
import { InitialData, Poll, CreatePollInput } from '../types';

export function getInitialData(): Promise<InitialData> {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
    _getBakers(),
  ]).then(([users, polls, bakers]) => ({
    users,
    polls,
    bakers
  }));
}

export function savePoll(info: CreatePollInput): Promise<Poll> {
  return _saveQuestion(info);
}

interface SavePollAnswerInput {
  authedUser: string;
  qid: string;
  answer: 'optionOne' | 'optionTwo';
}

export function savePollAnswer(info: SavePollAnswerInput): Promise<void> {
  return _saveQuestionAnswer(info);
}