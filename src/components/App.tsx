import React, { lazy, Suspense, useEffect } from 'react';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading-bar';
import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import Favicon from "react-favicon";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import ErrorBoundary from './ErrorBoundary';

// Lazy load components for code splitting
const LoginPage = lazy(() => import('./LoginPage'));
const Dashboard = lazy(() => import('./Dashboard'));
const Leaderboard = lazy(() => import('./Leaderboard'));
const PollPage = lazy(() => import('./PollPage'));
const Custom404 = lazy(() => import('./Custom404'));
const LoginAs = lazy(() => import('./LoginAs'));
const LandingPage = lazy(() => import('./LandingPage'));
const NewPoll = lazy(() => import('./NewPoll'));
const Nav = lazy(() => import('./Nav'));

// Loading spinner component
const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center min-h-[50vh]" role="status" aria-live="polite">
    <div className="text-center">
      <svg className="animate-spin h-12 w-12 mx-auto text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p className="text-lg text-gray-600 font-semibold">Loading...</p>
    </div>
  </div>
);

interface RequireAuthProps {
  children: React.ReactNode;
}

// Source for RequireAuth: https://ui.dev/react-router-protected-routes-authentication
function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation();
  const authedUser = useAppSelector(state => state.authedUser);

  return authedUser
    ? ( <>{children}</> )
    : ( <Navigate to="/login" replace state={{ path: location.pathname }} /> );
}

const Layout: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
} 

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => Object.keys(state.polls).length === 0);

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <>
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[1000] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded focus:font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          Skip to main content
        </a>
        <div className="App">
          <Favicon 
            url="https://img.icons8.com/emoji/48/000000/ballot-box-with-ballot.png" 
          />
          <div className="page-container">
            <LoadingBar />
            <Suspense fallback={<LoadingSpinner />}>
              <Nav />
            </Suspense>
            <main id="main-content" className="page-wrapper" role="main">
              { loading === true ? (
                <LoadingSpinner />
              ) : (
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/error" element={<Custom404 />} />        
                  <Route 
                  path="/"
                  element={<Layout/>}
                >
                  <Route index element={<LandingPage />}/>
                  <Route path="/welcome" element={<LandingPage />} />
                  <Route
                    path="dashboard"
                    element={
                      <RequireAuth>
                        <Dashboard />
                      </RequireAuth>
                    } 
                  />
                </Route>
                <Route 
                  path="/auth"
                  element={
                    <RequireAuth>
                      <LoginAs />
                    </RequireAuth>
                  }
                />
                <Route 
                  path="/add" 
                  element={
                    <RequireAuth>
                      <NewPoll />
                    </RequireAuth>
                  } 
                />
                <Route 
                  path="/leaderboard" 
                  element={
                    <RequireAuth>
                      <Leaderboard />
                    </RequireAuth>
                  } 
                />
                <Route 
                  path="/questions/:id" 
                  element={
                    <RequireAuth>
                      <PollPage />
                    </RequireAuth>
                  } 
                />   
              </Routes>
              </Suspense>
            )}
          </main>
        </div>
      </div>
      </>
    </ErrorBoundary>
  );
}

export default App;
