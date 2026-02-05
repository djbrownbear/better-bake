// Type definitions for Better Bake API

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  avatarURL: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  avatarURL: string | null;
  createdAt: Date;
}

export interface Poll {
  id: string;
  authorId: string;
  optionOneText: string;
  optionOneBaker: string;
  optionOneSeason: string;
  optionOneEpisode: string;
  optionTwoText: string;
  optionTwoBaker: string;
  optionTwoSeason: string;
  optionTwoEpisode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vote {
  id: string;
  userId: string;
  pollId: string;
  option: 'optionOne' | 'optionTwo';
  createdAt: Date;
}

export interface Baker {
  id: string;
  name: string;
  series: string;
}

export interface CreateBakerInput {
  id: string;
  name: string;
  series: string;
}

export interface PollWithVotes extends Poll {
  votes: Vote[];
  author: UserResponse;
}

export interface CreatePollInput {
  optionOneText: string;
  optionOneBaker: string;
  optionOneSeason: string;
  optionOneEpisode: string;
  optionTwoText: string;
  optionTwoBaker: string;
  optionTwoSeason: string;
  optionTwoEpisode: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
  avatarURL?: string;
}

export interface AuthResponse {
  token: string;
  user: UserResponse;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  avatarURL: string | null;
  pollsCreated: number;
  pollsAnswered: number;
  score: number;
}
