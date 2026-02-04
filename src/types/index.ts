// Core domain types for Better Bake application

export interface User {
  id: string;
  password: string;
  name: string;
  avatarURL: string;
  answers: Record<string, 'optionOne' | 'optionTwo'>;
  questions: string[];
}

export interface PollOption {
  votes: string[];
  text: string;
  season: string;
  episode: string;
  baker: string;
  imgURL?: string;
}

export interface Poll {
  id: string;
  author: string;
  timestamp: number;
  optionOne: PollOption;
  optionTwo: PollOption;
}

export interface Baker {
  id: string;
  name: string;
  series: string;
  baker?: any; // Complex nested structure from _DATA.js
  [key: string]: any; // Allow dynamic properties for episodes
}

export interface RootState {
  authedUser: string | null;
  users: Record<string, User>;
  polls: Record<string, Poll>;
  bakers: Record<string, Baker>;
  loadingBar: { default: number };
}

// Helper type for creating new polls (without server-generated fields)
export interface CreatePollInput {
  optionOneText: string;
  optionTwoText: string;
  optionOneImage: string;
  optionTwoImage: string;
  author: string;
}

// Type for poll answers
export type PollAnswer = 'optionOne' | 'optionTwo';

// Type for initial data from API
export interface InitialData {
  users: Record<string, User>;
  polls: Record<string, Poll>;
  bakers: Record<string, Baker>;
}
 
