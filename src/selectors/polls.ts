import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../reducers';
import { formatPoll } from '../utils/helpers';
import { Poll, User, Baker } from '../types';

/**
 * Select all polls as an array sorted by timestamp (newest first)
 * Memoized to prevent unnecessary rerenders
 */
export const selectSortedPolls = createSelector(
  [(state: RootState) => state.polls],
  (polls): Poll[] => Object.values(polls).sort((a, b) => b.timestamp - a.timestamp)
);

/**
 * Select users sorted by total score (questions + answers)
 * Memoized to prevent unnecessary rerenders in Leaderboard
 */
export const selectSortedUsers = createSelector(
  [(state: RootState) => state.users],
  (users): User[] => {
    const countAskedAnswered = (user: User) => {
      const asked = user.questions.length;
      const answered = Object.keys(user.answers).length;
      return asked + answered;
    };

    return Object.values(users).sort((a, b) => countAskedAnswered(b) - countAskedAnswered(a));
  }
);

/**
 * Select all bakers as a sorted array for dropdowns
 * Memoized to prevent recomputation in NewPoll
 */
export const selectAllBakers = createSelector(
  [(state: RootState) => state.bakers],
  (bakers): Baker[] => {
    return Object.values(bakers).sort((a, b) => a.name.localeCompare(b.name));
  }
);

/**
 * Select authed user info for NewPoll
 */
export const selectNewPollUserData = createSelector(
  [(state: RootState) => state.users[state.authedUser || '']],
  (user) => ({
    name: user?.name || '',
    avatar: user?.avatarURL || '',
  })
);

/**
 * Select new poll data
 */
export const selectNewPollData = createSelector(
  [selectNewPollUserData, selectAllBakers],
  (userData, allBakers) => ({
    ...userData,
    allBakers,
  })
);

/**
 * Create a memoized selector for a specific poll by ID
 * Returns formatted poll data ready for display
 */
export const makeSelectFormattedPoll = (pollId: string) =>
  createSelector(
    [
      (state: RootState) => state.polls[pollId],
      (state: RootState) => state.users,
      (state: RootState) => state.authedUser,
    ],
    (poll, users, authedUser) => {
      if (!poll) return null;
      return formatPoll(poll, users[poll.author], authedUser || '');
    }
  );

/**
 * Create a memoized selector for poll author avatar
 */
export const makeSelectPollAvatar = (pollId: string) =>
  createSelector(
    [
      (state: RootState) => state.polls[pollId],
      (state: RootState) => state.users,
    ],
    (poll, users) => {
      if (!poll) return '';
      return users[poll.author]?.avatarURL || '';
    }
  );

/**
 * Create a memoized selector for PollPage data
 */
export const makeSelectPollPageData = (pollId: string) =>
  createSelector(
    [
      (state: RootState) => state.polls[pollId],
      (state: RootState) => state.users,
      (state: RootState) => state.bakers,
      (state: RootState) => state.authedUser,
    ],
    (pollData, users, bakers, authedUser) => {
      if (!pollData) {
        return {
          authedUser,
          poll: null,
          bakerOne: '',
          bakerTwo: '',
        };
      }

      const bOneSeason = pollData.optionOne.season;
      const bTwoSeason = pollData.optionTwo.season;
      const bOneEpisode = pollData.optionOne.episode;
      const bTwoEpisode = pollData.optionTwo.episode;

      // Handle both mock data (nested structure) and real API (simple structure)
      let bakerOne = '';
      let bakerTwo = '';

      // Check if bakers have the complex nested structure (mock data)
      if (bOneSeason && bakers[bOneSeason]?.baker) {
        bakerOne =
          bakers[bOneSeason].baker[pollData.optionOne.baker]?.episodes?.[bOneEpisode]?.bakeURL ||
          pollData.optionOne.imgURL ||
          '';
      } else {
        // Real API or fallback to imgURL
        bakerOne = pollData.optionOne.imgURL || '';
      }

      if (bTwoSeason && bakers[bTwoSeason]?.baker) {
        bakerTwo =
          bakers[bTwoSeason].baker[pollData.optionTwo.baker]?.episodes?.[bTwoEpisode]?.bakeURL ||
          pollData.optionTwo.imgURL ||
          '';
      } else {
        // Real API or fallback to imgURL
        bakerTwo = pollData.optionTwo.imgURL || '';
      }

      return {
        authedUser,
        poll: formatPoll(pollData, users[pollData.author], authedUser || ''),
        bakerOne,
        bakerTwo,
      };
    }
  );
