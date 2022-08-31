import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
  _getBakers,
} from './_DATA.js';

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
    _getBakers(),
  ]).then(([users, polls]) => ({
    users,
    polls,
  }))
}

export function savePoll (info) {
  return _saveQuestion(info);
}

export function savePollAnswer (info) {
  return _saveQuestionAnswer(info);
}