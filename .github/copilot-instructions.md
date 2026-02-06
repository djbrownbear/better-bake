# Better Bake - AI Coding Agent Instructions

## Project Overview
"Better Bake" is a React + Redux polling app for voting on "Who Baked It Better" questions. Users login, view/answer polls, create polls, and see leaderboard rankings. The app uses a fake in-memory database (`_DATA.js`) and is deployed to GitHub Pages.

## Architecture

### State Management - Redux Pattern
- **Store setup**: `src/index.js` creates store with `createStore(reducer, middleware)`
- **Middleware**: Custom logger (`middleware/logger.js`) logs every action and state change
- **Reducers**: Combined in `reducers/index.js` - `authedUser`, `users`, `polls`, `bakers`, `loadingBar`
- **Actions pattern**: All async actions follow the "thunk" pattern, return functions with `(dispatch, getState)`

### Key Data Flow
1. **Initialization**: `handleInitialData()` in `actions/shared.js` orchestrates loading users, polls, and bakers
2. **Data source**: `utils/_DATA.js` is the fake backend - all CRUD operations go through `utils/api.js`
3. **Optimistic updates**: Actions dispatch to multiple reducers (e.g., `handleAddPoll` updates both `polls` and `users` state)

### Routing & Authentication
- **Router**: Uses `HashRouter` (not `BrowserRouter`) for GitHub Pages compatibility
- **Auth pattern**: `RequireAuth` wrapper in `App.js` protects routes, redirects to `/login` with location state
- **Auth state**: `authedUser` reducer stores just the user ID (string), not the full user object

## Component Conventions

### State Access Pattern
Components connect to Redux using `connect()` HOC, not hooks:
```javascript
const mapStateToProps = ({ authedUser, polls, users }) => ({
  authedUser,
  polls: Object.values(polls).sort((a,b) => b.timestamp - a.timestamp)
});
export default connect(mapStateToProps)(Dashboard);
```

### Poll Filtering Logic
- **Dashboard.js**: Filters polls by checking if `authedUser` ID is in `poll.optionOne.votes` or `poll.optionTwo.votes` arrays
- Always sort polls by timestamp descending: `.sort((a,b) => b.timestamp - a.timestamp)`

## Data Structure

### Users Object
```javascript
users[userId] = {
  id, password, name, avatarURL,
  answers: { [pollId]: 'optionOne' | 'optionTwo' },
  questions: [pollIds]  // polls created by this user
}
```

### Polls Object
```javascript
polls[pollId] = {
  id, author, timestamp,
  optionOne: { votes: [userIds], text, season, episode, baker },
  optionTwo: { votes: [userIds], text, season, episode, baker }
}
```

### Bakers
Separate reducer/state for baker metadata (Great British Bake Off contestants), received on initialization but rarely modified.

## Development Workflows

### Testing
- **Test utilities**: Use `renderWithProviders` from `utils/test-utils.js` - wraps components in Redux Provider + MemoryRouter
- **Snapshots**: Tests use snapshot testing (see `tests/__snapshots__/`)
- **Run tests**: `npm test` (uses Create React App's Jest config)

### Build & Deploy
- `npm start` - development server (port 3000)
- `npm run build` - production build
- `npm run deploy` - builds and deploys to GitHub Pages via `gh-pages` package
- **Homepage config**: `package.json` sets `homepage: "https://aaron.aaronandanita.com/better-bake"` for correct asset paths

### Styling
- Global styles in `assets/css/index.css`
- Uses FontAwesome icons via `@fortawesome/react-fontawesome` 
- Loading bar via `react-redux-loading-bar` (imported in actions with `showLoading()`/`hideLoading()`)

## Critical Patterns

1. **Never mutate state** - Redux requires immutability; use spread operators in reducers
2. **Action creators are synchronous** - async logic lives in "handle" functions (e.g., `handleAddPoll` calls `addPoll`)
3. **Error handling**: Invalid poll IDs navigate to `/error` (Custom404 component)
4. **Poll creation**: `NewPoll.js` passes 4 params to `handleAddPoll`: `(optionOneText, optionTwoText, optionOneImage, optionTwoImage)`
5. **Authentication**: Passwords stored in plain text (not production-ready, educational project)

## File Organization
- `actions/` - One file per reducer, plus `shared.js` for initialization
- `components/` - Each page/feature is a component (no sub-directories)
- `utils/_DATA.js` - Mock database, **never import directly in components** (always use `api.js`)
- `utils/helpers.js` - Utility functions for data transformation

---

## Modernization Guide

### Phase 1: TypeScript Migration

#### Step 1.1: Setup TypeScript Infrastructure
```bash
npm install --save-dev typescript @types/react @types/react-dom @types/react-redux @types/node
npx tsc --init
```

**tsconfig.json configuration:**
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

#### Step 1.2: Define Core Types First
Create `src/types/index.ts` with domain models:
```typescript
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
}

export interface RootState {
  authedUser: string | null;
  users: Record<string, User>;
  polls: Record<string, Poll>;
  bakers: Record<string, Baker>;
  loadingBar: { default: number };
}
```

#### Step 1.3: Migration Order
1. **Start with utilities**: Convert `utils/_DATA.js` → `_DATA.ts`, `api.js` → `api.ts`, `helpers.js` → `helpers.ts`
2. **Reducers next**: Add return types, action types
3. **Actions**: Type thunk actions with `ThunkAction` from `redux-thunk`
4. **Components last**: Convert `.js` → `.tsx`, add prop interfaces

#### Step 1.4: Typed Redux Patterns
```typescript
// src/store/hooks.ts - Create typed hooks
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './types';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Example typed action
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

export function handleAddPoll(
  optionOneText: string,
  optionTwoText: string,
  optionOneImage: string,
  optionTwoImage: string
): ThunkAction<Promise<void>, RootState, unknown, AnyAction> {
  return async (dispatch, getState) => {
    const { authedUser } = getState();
    // implementation
  };
}
```

### Phase 2: Frontend Modernization

#### Step 2.1: Migrate to Redux Toolkit
**Benefits**: Eliminates boilerplate, built-in immutability, TypeScript support

```bash
npm install @reduxjs/toolkit
```

**Convert reducers to slices** (`reducers/polls.js` → `store/pollsSlice.ts`):
```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PollsState {
  [key: string]: Poll;
}

const pollsSlice = createSlice({
  name: 'polls',
  initialState: {} as PollsState,
  reducers: {
    receivePolls: (state, action: PayloadAction<Record<string, Poll>>) => {
      return action.payload;
    },
    addPoll: (state, action: PayloadAction<Poll>) => {
      state[action.payload.id] = action.payload;
    },
    addAnswer: (state, action: PayloadAction<{ pollId: string; authedUser: string; answer: string }>) => {
      const { pollId, authedUser, answer } = action.payload;
      state[pollId][answer].votes.push(authedUser);
    },
  },
});

export const { receivePolls, addPoll, addAnswer } = pollsSlice.actions;
export default pollsSlice.reducer;
```

**Create async thunks**:
```typescript
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchInitialData = createAsyncThunk(
  'app/fetchInitialData',
  async () => {
    const data = await getInitialData();
    return data;
  }
);
```

#### Step 2.2: Replace connect() with Hooks
**Before** (Dashboard.js):
```javascript
const mapStateToProps = ({ authedUser, polls }) => ({ authedUser, polls });
export default connect(mapStateToProps)(Dashboard);
```

**After** (Dashboard.tsx):
```typescript
import { useAppSelector } from '../store/hooks';

const Dashboard: React.FC = () => {
  const authedUser = useAppSelector(state => state.authedUser);
  const polls = useAppSelector(state => 
    Object.values(state.polls).sort((a, b) => b.timestamp - a.timestamp)
  );
  
  // component logic
};
```

#### Step 2.3: Modern UI Framework Options

**Option A: Tailwind CSS** (Recommended for rapid development)
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Option B: Material-UI / MUI** (Component library)
```bash
npm install @mui/material @emotion/react @emotion/styled
```

**Option C: shadcn/ui** (Copy-paste components with Tailwind)
```bash
npm install tailwindcss-animate class-variance-authority clsx tailwind-merge
npx shadcn-ui@latest init
```

#### Step 2.4: Upgrade Routing Patterns
Replace `RequireAuth` wrapper with React Router v6 patterns:
```typescript
// src/components/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authedUser = useAppSelector(state => state.authedUser);
  const location = useLocation();
  
  if (!authedUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};
```

#### Step 2.5: Code Splitting & Performance
```typescript
// App.tsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./components/Dashboard'));
const Leaderboard = lazy(() => import('./components/Leaderboard'));

// In routes:
<Suspense fallback={<LoadingSpinner />}>
  <Dashboard />
</Suspense>
```

### Phase 3: Backend API Development

#### Step 3.1: Technology Stack Recommendations

**Option A: Node.js + Express + PostgreSQL** (Traditional, well-supported)
```bash
mkdir server
cd server
npm init -y
npm install express cors dotenv pg bcrypt jsonwebtoken
npm install -D typescript @types/express @types/node tsx
```

**Option B: Node.js + Fastify + Prisma** (Modern, performant)
```bash
npm install fastify @fastify/cors @fastify/jwt prisma
npm install -D @types/node tsx
npx prisma init
```

**Option C: Hono + Cloudflare Workers** (Edge, serverless)
```bash
npm create hono@latest server
cd server
npm install @prisma/client @prisma/adapter-d1
```

#### Step 3.2: Database Schema (PostgreSQL/Prisma)

**schema.prisma**:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // hashed
  name      String
  avatarURL String?
  createdAt DateTime @default(now())
  
  polls     Poll[]   @relation("AuthorPolls")
  votes     Vote[]
}

model Poll {
  id        String   @id @default(cuid())
  authorId  String
  author    User     @relation("AuthorPolls", fields: [authorId], references: [id])
  
  optionOneText   String
  optionOneBaker  String
  optionOneSeason String
  optionOneEpisode String
  
  optionTwoText   String
  optionTwoBaker  String
  optionTwoSeason String
  optionTwoEpisode String
  
  createdAt DateTime @default(now())
  votes     Vote[]
  
  @@index([authorId])
  @@index([createdAt])
}

model Vote {
  id        String   @id @default(cuid())
  userId    String
  pollId    String
  option    String   // "optionOne" or "optionTwo"
  createdAt DateTime @default(now())
  
  user User @relation(fields: [userId], references: [id])
  poll Poll @relation(fields: [pollId], references: [id])
  
  @@unique([userId, pollId]) // User can only vote once per poll
  @@index([pollId])
  @@index([userId])
}

model Baker {
  id      String @id
  name    String
  series  String
}
```

#### Step 3.3: API Structure (Express Example)

```
server/
├── src/
│   ├── index.ts              # Entry point
│   ├── routes/
│   │   ├── auth.routes.ts    # POST /api/auth/login, /register
│   │   ├── polls.routes.ts   # GET/POST /api/polls
│   │   ├── users.routes.ts   # GET /api/users, /api/users/:id
│   │   └── bakers.routes.ts  # GET /api/bakers
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── polls.controller.ts
│   │   └── users.controller.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts    # JWT verification
│   │   └── error.middleware.ts
│   ├── services/
│   │   ├── auth.service.ts       # Business logic
│   │   └── polls.service.ts
│   └── config/
│       ├── database.ts
│       └── jwt.ts
├── prisma/
│   └── schema.prisma
├── .env
├── package.json
└── tsconfig.json
```

#### Step 3.4: API Endpoints Design

**Authentication**:
```typescript
POST   /api/auth/register    { email, password, name }
POST   /api/auth/login       { email, password } → { token, user }
POST   /api/auth/refresh     { refreshToken }
GET    /api/auth/me          → { user } (requires JWT)
```

**Polls**:
```typescript
GET    /api/polls                 → Poll[] (sorted by timestamp)
GET    /api/polls/:id             → Poll
POST   /api/polls                 → Poll (requires auth)
POST   /api/polls/:id/vote        { option: 'optionOne'|'optionTwo' }
GET    /api/polls/answered        → Poll[] (user's answered polls)
GET    /api/polls/unanswered      → Poll[] (user's unanswered polls)
```

**Users & Leaderboard**:
```typescript
GET    /api/users                 → User[]
GET    /api/users/:id             → User
GET    /api/leaderboard           → { userId, pollsCreated, pollsAnswered, score }[]
```

#### Step 3.5: Authentication Implementation

**JWT Strategy** (server/src/middleware/auth.middleware.ts):
```typescript
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  userId?: string;
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};
```

**Password hashing**:
```typescript
import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
```

#### Step 3.6: Frontend API Integration

**Create API client** (src/api/client.ts):
```typescript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private token: string | null = null;
  
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }
  
  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }
  
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
    };
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: { ...headers, ...options?.headers },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }
    
    return response.json();
  }
  
  async login(email: string, password: string) {
    return this.request<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }
  
  async getPolls() {
    return this.request<Poll[]>('/polls');
  }
  
  async createPoll(pollData: CreatePollInput) {
    return this.request<Poll>('/polls', {
      method: 'POST',
      body: JSON.stringify(pollData),
    });
  }
  
  async voteOnPoll(pollId: string, option: 'optionOne' | 'optionTwo') {
    return this.request<Poll>(`/polls/${pollId}/vote`, {
      method: 'POST',
      body: JSON.stringify({ option }),
    });
  }
}

export const apiClient = new ApiClient();
```

**Update Redux thunks** to use real API:
```typescript
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const { token, user } = await apiClient.login(email, password);
    apiClient.setToken(token);
    return user;
  }
);
```

#### Step 3.7: Migration Strategy

**Parallel running approach**:
1. **Build backend** with same data structure as `_DATA.js`
2. **Create data migration script** to seed DB from existing mock data
3. **Run both** mock and real API during development (feature flag)
4. **Gradually switch** endpoints from mock to real API
5. **Remove** `_DATA.js` once all endpoints migrated

**Environment-based switching**:
```typescript
// src/config.ts
export const USE_MOCK_API = process.env.REACT_APP_USE_MOCK === 'true';

// In store setup
import { getInitialData as getMockData } from './utils/api';
import { apiClient } from './api/client';

const dataLoader = USE_MOCK_API 
  ? getMockData 
  : () => apiClient.getInitialData();
```

### Phase 4: Deployment Modernization

#### Option A: Separate Hosting
- **Frontend**: Keep GitHub Pages or migrate to Vercel/Netlify
- **Backend**: Railway.app, Render.com, Fly.io
- **Database**: Supabase, PlanetScale, Neon

#### Option B: Full-Stack Platform
- **Vercel**: Deploy Next.js with API routes
- **Cloudflare Pages**: Deploy with Workers backend
- **AWS Amplify**: Full stack with AppSync/DynamoDB

#### Recommended Approach for Better Bake
1. **Frontend**: Vercel (free tier, automatic deployments)
2. **Backend**: Railway.app (free tier, PostgreSQL included)
3. **Auth**: NextAuth.js or Clerk for managed authentication

#### Railway Deployment Configuration

**Pre-Deploy Command Strategy:**
Railway executes commands between building and deploying your application, ideal for database migrations. Pre-deploy commands run in your private network with environment variables and fail-safe deployment (non-zero exit stops deployment).

**Configuration:**
1. **Dockerfile** - Simplified CMD (migrations handled separately):
```dockerfile
FROM node:22.12-slim
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

2. **Railway Pre-Deploy Command** (set in project settings):
```bash
npm run prisma:migrate:deploy
```

3. **Optional: Database Seeding** (one-time or as needed):
```bash
npm run prisma:migrate:deploy && npm run prisma:seed
```

**Key Points:**
- Pre-deploy commands execute in temporary container with private network access
- Deployment aborts if command exits with non-zero status
- Filesystem changes are not persisted (use start command for volume operations)
- Migrations complete successfully before application starts serving traffic
- Clean separation: Build → Migrate → Deploy phases

**Prisma 7 Compatibility:**
Seed script requires adapter-based initialization:
```typescript
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });
```

### Migration Checklist

**TypeScript** (Phase 1 - COMPLETED):
- [x] Install TypeScript and type definitions
- [x] Create `src/types/index.ts` with domain models
- [x] Convert `_DATA.js` (still .js, typed via imports)
- [x] Convert reducers to typed reducers (authedUser, users, polls, bakers)
- [x] Convert actions to typed thunk actions (all action files)
- [x] Convert utility files (`helpers.ts`, `api.ts`)
- [x] Convert middleware to TypeScript (`logger.ts`, `index.ts`)
- [x] Add RootState type export from reducers
- [x] Convert all components to TypeScript
- [x] Verify app compiles with zero TypeScript errors

**Redux Toolkit** (Phase 2.1 - COMPLETED):
- [x] Install `@reduxjs/toolkit` (already present)
- [x] Convert 4 reducers to slices (authedUser, users, polls, bakers)
- [x] Replace thunks with `createAsyncThunk` (handleInitialData, handleAddPoll, handleAddAnswer)
- [x] Update store to use `configureStore`
- [x] Delete old action files and middleware/index.ts
- [x] Eliminated ~200 lines of boilerplate code

**Modern React** (Phase 2.2 - COMPLETED):
- [x] Replace all `connect()` HOC with hooks (12/12 components)
- [x] Add custom typed hooks (`useAppSelector`, `useAppDispatch`)
- [x] Convert Custom404, PollHeader, LandingPage, LoginPage, LoginAs, Nav, Dashboard, Leaderboard, Poll, NewPoll, PollPage, App
- [x] Remove all dispatch type casting (`as any`)
- [x] Verify TypeScript compilation with zero errors

**Modern UI Framework** (Phase 2.3 - COMPLETED):
- [x] Install Tailwind CSS (v3.4.1 - CRA compatible, v4 requires Vite migration)
- [x] Configure tailwind.config.js with custom colors (primary: #fcdf70, secondary: #fef3c7)
- [x] Configure postcss.config.js with tailwindcss plugin
- [x] Add `@tailwind base; @tailwind components; @tailwind utilities;` to index.css
- [x] Convert LandingPage to Tailwind
- [x] Convert LoginPage and LoginAs to Tailwind
- [x] Convert Nav to Tailwind
- [x] Convert Dashboard to Tailwind
- [x] Convert Poll to Tailwind (Batch 3)
- [x] Convert Leaderboard to Tailwind (Batch 3)
- [x] Convert NewPoll to Tailwind (Batch 4)
- [x] Convert PollPage to Tailwind (Batch 4)
- [x] Remove unused custom CSS (1,148 lines removed, 98% reduction)
- [x] Build verification passed (CSS bundle reduced by 37%)
- [x] Development server confirmed - All styling working correctly

**UI/UX Review & Polish** (Phase 2.4 - COMPLETED):
- [x] Accessibility audit and compliance (WCAG 2.1 AA)
  - [x] Keyboard navigation testing
  - [x] Screen reader compatibility (ARIA labels, roles, live regions)
  - [x] ARIA labels and roles on all interactive elements
  - [x] Color contrast validation (minimum 4.5:1)
  - [x] Focus indicators on interactive elements (focus rings added)
  - [x] Skip-to-content link for keyboard users
- [x] Responsive design testing
  - [x] Mobile (320px-480px) - Grid layouts, responsive text
  - [x] Tablet (481px-1024px) - Adaptive navigation
  - [x] Desktop (1025px+) - Optimal spacing
  - [x] Navigation menu mobile responsive with hamburger
  - [x] Dashboard polls use responsive grid (replaces fixed 31.5% width)
  - [x] Leaderboard table with horizontal scroll on mobile
- [x] User flow optimization
  - [x] Login → Dashboard flow with loading states
  - [x] Creating new poll with success feedback
  - [x] Voting on poll with visual confirmation
  - [x] Error recovery with improved 404 page
- [x] Design consistency review
  - [x] Consistent spacing with Tailwind utilities
  - [x] Typography hierarchy (h1 for page titles, h2 for sections)
  - [x] Button styles with hover, focus, disabled, active states
  - [x] Card layouts with consistent shadows
  - [x] Form input styling with focus rings
- [x] Loading states & user feedback
  - [x] Loading indicators for async operations (login, voting, poll creation)
  - [x] Success messages (poll created, vote submitted)
  - [x] Disabled states while processing
  - [x] App-level loading skeleton with spinner
- [x] Error handling & validation
  - [x] Form validation messages (improved styling with bg colors)
  - [x] Empty states (no polls in Dashboard)
  - [x] Enhanced 404 page with navigation options
  - [x] ARIA live regions for error announcements
- [x] Performance & visual polish
  - [x] Smooth transitions (active:scale-95 on buttons)
  - [x] Button click feedback (scale animation)
  - [x] Hover states on interactive elements
  - [x] Top user badge on Leaderboard
  - [x] Semantic HTML with proper landmarks (main, nav, footer)
- [x] Component modernization complete
  - [x] App.tsx - Skip-to-content link, loading state, semantic main
  - [x] Nav.tsx - Desktop/mobile separation, slide-in drawer, escape key support
  - [x] Dashboard.tsx - Button group toggle, responsive grid, empty states, gradient headers
  - [x] Poll.tsx - Card-based design (header/content/footer sections)
  - [x] PollHeader.tsx - Enhanced typography (3xl-5xl), gradient sections, status indicator
  - [x] Leaderboard.tsx - Medal rankings (🥇🥈🥉), modern list layout, stats display
  - [x] LoginPage.tsx - Loading states, improved error messages, ARIA labels
  - [x] LandingPage.tsx - All sections modernized (hero, vote, leaderboard, create, footer)
  - [x] NewPoll.tsx - Gradient header, card-based form, enhanced button, success notification
  - [x] PollPage.tsx - Vote feedback, loading states, visual confirmation
  - [x] Custom404.tsx - Enhanced with navigation buttons and better messaging
- [x] CSS optimization
  - [x] Removed 1,148 lines of custom CSS (98% reduction)
  - [x] CSS bundle reduced by 37%
  - [x] All styling now uses Tailwind utilities
- [ ] Final manual testing across devices (user responsibility)
  - [ ] Test all user flows on mobile device
  - [ ] Test keyboard-only navigation
  - [ ] Test with screen reader (NVDA/JAWS)
  - [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)

**Infrastructure Upgrade** (Phase 2.5 - COMPLETED):
- [x] Migrate from Create React App to Vite
- [x] Implement code splitting with `React.lazy`
- [x] Add error boundaries
- [x] Optimize bundle size (manual chunks for vendors)
- [x] Build time improvement: 20s → 3.77s (85% faster)
- [x] Upgrade to Tailwind CSS v4 (prep for Phase 2.6)

**Accessibility & Theme Optimization** (Phase 2.6 - COMPLETED):
- [x] Upgrade Tailwind CSS v3.4.1 → v4.1.18
- [x] Migrate to CSS-first @theme configuration
- [x] Remove tailwind.config.js and postcss.config.js
- [x] Convert vite.config.ts → vite.config.mts (ESM compatibility)
- [x] Implement complete color scale (50-900) with semantic aliases
- [x] Fix visual regressions (light background gradients)
- [x] Improve color contrast for WCAG 2.1 AA compliance
- [x] Replace hardcoded amber-* colors with theme variables
- [x] Update 28 gradient utilities (bg-gradient-to-* → bg-linear-to-*)
- [x] Update 10 flex utilities (flex-shrink-0 → shrink-0)
- [x] Achieve Lighthouse accessibility: 100/100
- [x] Create COLOR-AUDIT-PLAN.md documentation
- [x] Build verification: 0 errors, minimal warnings

**Backend** (Phase 3 - COMPLETED):
- [x] Initialize backend project with TypeScript
- [x] Design and create database schema (Prisma)
- [x] Implement authentication (JWT + bcrypt)
- [x] Set up project structure (Fastify + Prisma)
- [x] Create authentication endpoints (register, login, me)
- [x] Test authentication flow (registration, login, protected routes)
- [x] Create API endpoints for polls (6 endpoints)
- [x] Create API endpoints for users (3 endpoints)
- [x] Create API endpoints for bakers (3 endpoints)
- [x] Add input validation (Zod)
- [x] Test all endpoints via Postman
- [x] Fix database connection pool configuration
- [x] Create Postman collection for testing
- [ ] Write API tests (unit + integration)
- [ ] Add rate limiting (prevent brute force attacks)
- [ ] Implement request throttling
- [x] Create deployment configurations (Railway, Vercel)
- [x] Add production scripts to package.json
- [x] Create deployment documentation (guides, checklists)
- [ ] Deploy backend to Railway
- [ ] Set up environment variables in Railway
- [ ] Configure HTTPS in production
- [ ] Deploy frontend to Vercel

**Integration**:
- [x] Create API client with token management
- [x] Update Redux thunks to call real API
- [x] Handle loading/error states properly
- [x] Add retry logic for failed requests
- [x] Test with both mock and real API
- [x] Update LoginPage for real authentication
- [x] Update logout to clear JWT token
- [x] Fix data structure compatibility (baker images)
- [x] Add registration flow for new users
- [x] Disable Demo button when using real API
- [x] Add Toast notification component
- [ ] Remove `_DATA.js` when complete
