import { InitialData, Poll, CreatePollInput, User, Baker } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Types for API responses that differ from frontend types
interface ApiUser {
  id: string;
  email: string;
  name: string;
  avatarURL: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ApiVote {
  id: string;
  userId: string;
  pollId: string;
  option: 'optionOne' | 'optionTwo';
  createdAt: string;
}

interface ApiPoll {
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
  createdAt: string;
  votes: ApiVote[];
  author: ApiUser;
}

interface LoginResponse {
  token: string;
  user: ApiUser;
}

class ApiClient {
  private token: string | null = null;

  constructor() {
    // Load token from localStorage on initialization
    this.token = localStorage.getItem('authToken');
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  getToken(): string | null {
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options?.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Authentication endpoints
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(response.token);
    return response;
  }

  async register(email: string, password: string, name: string, avatarURL?: string): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, avatarURL }),
    });
    this.setToken(response.token);
    return response;
  }

  async getCurrentUser(): Promise<ApiUser> {
    return this.request<ApiUser>('/auth/me');
  }

  // Poll endpoints
  async getAllPolls(): Promise<ApiPoll[]> {
    return this.request<ApiPoll[]>('/polls');
  }

  async getPollById(pollId: string): Promise<ApiPoll> {
    return this.request<ApiPoll>(`/polls/${pollId}`);
  }

  async createPoll(pollData: {
    optionOneText: string;
    optionOneBaker: string;
    optionOneSeason: string;
    optionOneEpisode: string;
    optionTwoText: string;
    optionTwoBaker: string;
    optionTwoSeason: string;
    optionTwoEpisode: string;
  }): Promise<ApiPoll> {
    return this.request<ApiPoll>('/polls', {
      method: 'POST',
      body: JSON.stringify(pollData),
    });
  }

  async voteOnPoll(pollId: string, option: 'optionOne' | 'optionTwo'): Promise<ApiPoll> {
    return this.request<ApiPoll>(`/polls/${pollId}/vote`, {
      method: 'POST',
      body: JSON.stringify({ option }),
    });
  }

  async getAnsweredPolls(): Promise<ApiPoll[]> {
    return this.request<ApiPoll[]>('/polls/answered');
  }

  async getUnansweredPolls(): Promise<ApiPoll[]> {
    return this.request<ApiPoll[]>('/polls/unanswered');
  }

  // User endpoints
  async getAllUsers(): Promise<ApiUser[]> {
    return this.request<ApiUser[]>('/users');
  }

  async getUserById(userId: string): Promise<ApiUser> {
    return this.request<ApiUser>(`/users/${userId}`);
  }

  async getLeaderboard(): Promise<Array<{
    userId: string;
    name: string;
    avatarURL: string | null;
    pollsCreated: number;
    pollsAnswered: number;
    score: number;
  }>> {
    return this.request('/users/leaderboard');
  }

  // Baker endpoints
  async getAllBakers(): Promise<Baker[]> {
    return this.request<Baker[]>('/bakers');
  }

  async getBakerById(bakerId: string): Promise<Baker> {
    return this.request<Baker>(`/bakers/${bakerId}`);
  }

  async createBaker(baker: { id: string; name: string; series: string }): Promise<Baker> {
    return this.request<Baker>('/bakers', {
      method: 'POST',
      body: JSON.stringify(baker),
    });
  }

  // Data transformation helpers - convert API format to frontend format
  transformApiUser(apiUser: ApiUser): User {
    // For now, return a user with empty answers/questions
    // These will be calculated from polls/votes data
    return {
      id: apiUser.id,
      password: '', // Don't store password on frontend
      name: apiUser.name,
      avatarURL: apiUser.avatarURL || '',
      answers: {},
      questions: [],
    };
  }

  transformApiPoll(apiPoll: ApiPoll): Poll {
    const optionOneVotes = apiPoll.votes
      .filter(v => v.option === 'optionOne')
      .map(v => v.userId);
    const optionTwoVotes = apiPoll.votes
      .filter(v => v.option === 'optionTwo')
      .map(v => v.userId);

    return {
      id: apiPoll.id,
      author: apiPoll.authorId,
      timestamp: new Date(apiPoll.createdAt).getTime(),
      optionOne: {
        votes: optionOneVotes,
        text: apiPoll.optionOneText,
        season: apiPoll.optionOneSeason,
        episode: apiPoll.optionOneEpisode,
        baker: apiPoll.optionOneBaker,
      },
      optionTwo: {
        votes: optionTwoVotes,
        text: apiPoll.optionTwoText,
        season: apiPoll.optionTwoSeason,
        episode: apiPoll.optionTwoEpisode,
        baker: apiPoll.optionTwoBaker,
      },
    };
  }

  // Get initial data in the format expected by the frontend
  async getInitialData(): Promise<InitialData> {
    const [apiUsers, apiPolls, bakers] = await Promise.all([
      this.getAllUsers(),
      this.getAllPolls(),
      this.getAllBakers(),
    ]);

    // Transform users
    const users: Record<string, User> = {};
    apiUsers.forEach(apiUser => {
      users[apiUser.id] = this.transformApiUser(apiUser);
    });

    // Transform polls and populate user answers/questions
    const polls: Record<string, Poll> = {};
    apiPolls.forEach(apiPoll => {
      const poll = this.transformApiPoll(apiPoll);
      polls[poll.id] = poll;

      // Populate user's questions array
      if (users[poll.author]) {
        users[poll.author].questions.push(poll.id);
      } else {
        console.warn('[getInitialData] poll author not found in users:', poll.author);
      }

      // Populate user's answers
      [...poll.optionOne.votes, ...poll.optionTwo.votes].forEach(userId => {
        if (users[userId]) {
          const answer = poll.optionOne.votes.includes(userId) ? 'optionOne' : 'optionTwo';
          users[userId].answers[poll.id] = answer;
        } else {
          console.warn('[getInitialData] vote userId not found in users:', userId);
        }
      });
    });

    // Transform bakers to Record format
    const bakersRecord: Record<string, Baker> = {};
    bakers.forEach(baker => {
      bakersRecord[baker.id] = baker;
    });

    // Detect empty data - likely indicates unseeded database
    const isEmpty = Object.keys(users).length === 0 && 
                    Object.keys(polls).length === 0 && 
                    Object.keys(bakersRecord).length === 0;
    
    if (isEmpty) {
      console.error('Database appears to be empty. Run "npm run prisma:seed" in the server directory.');
      throw new Error('Database is empty. Please contact the administrator to seed the database.');
    }

    // Warn if only partially populated
    if (Object.keys(users).length === 0) {
      console.warn('No users found in database');
    }
    if (Object.keys(polls).length === 0) {
      console.warn('No polls found in database');
    }
    if (Object.keys(bakersRecord).length === 0) {
      console.warn('No bakers found in database');
    }

    return {
      users,
      polls,
      bakers: bakersRecord,
    };
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
