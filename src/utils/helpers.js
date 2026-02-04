import { Poll, User, PollOption } from '../types';

export interface FormattedPoll {
  name: string;
  id: string;
  timestamp: number;
  avatar: string;
  optionOne: PollOption;
  optionTwo: PollOption;
  authedUser: string;
  hasVoted: boolean;
}

export function formatDate(timestamp: number): string {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString('en-US');
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString();
}

export function formatPoll(poll: Poll, author: User, authedUser: string): FormattedPoll {
  const { id, optionOne, optionTwo, timestamp } = poll;
  const { name, avatarURL } = author;
  
  const optionOneVotes = optionOne.votes;
  const optionTwoVotes = optionTwo.votes;
  const allVotes = optionOneVotes.concat(optionTwoVotes);
  const hasVoted = allVotes.includes(authedUser);

  return {
    name,
    id,
    timestamp,
    avatar: avatarURL,
    optionOne,
    optionTwo,
    authedUser,
    hasVoted,
  };
}

export function formatPercent(val: number): string {
  // source: https://stackoverflow.com/questions/45163256/how-to-format-numbers-as-percentage-values-in-javascript
  // author: wrlee
  return val.toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 });
}