import React from 'react';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard'
import PollPage from './PollPage';
import Custom404 from './Custom404';
import LoginAs from './LoginAs';
import LandingPage from './LandingPage';
import { useEffect, Fragment } from "react";
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading-bar';
import NewPoll from './NewPoll';
import Nav from './Nav';
import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import Favicon from "react-favicon";
import { useAppSelector, useAppDispatch } from '../store/hooks';

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
    <Fragment>
      <div className="App">
        <Favicon 
          url="https://img.icons8.com/emoji/48/000000/ballot-box-with-ballot.png" 
        />
        <div className="page-container">
          <LoadingBar />
          <Nav /> 
          <div className="page-wrapper">
            { loading === true ? null : (
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
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
