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
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import NewPoll from './NewPoll';
import Nav from './Nav';
import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import Favicon from "react-favicon";

// Source for RequireAuth: https://ui.dev/react-router-protected-routes-authentication
function RequireAuth({ children, authedUser }) {
  const location = useLocation();

  return authedUser
    ? ( children )
    : ( <Navigate to="/login" replace state={{ path: location.pathname }} /> );
}

const Layout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
} 


const App = (props) => {

  useEffect(() => {
    props.dispatch(handleInitialData())
  }, [props]);

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
            { props.loading === true ? null : (
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/error" element={<Custom404 />} />        
                <Route 
                  path="/"
                  element={<Layout/>}
                >
                  <Route index element={
                      <RequireAuth authedUser={props.authedUser}>
                        <Dashboard />
                      </RequireAuth>
                    }  
                  />
                  <Route path="/welcome" element={<LandingPage />} />
                  <Route
                    path="dashboard"
                    element={
                      <RequireAuth authedUser={props.authedUser}>
                        <Dashboard />
                      </RequireAuth>
                    } 
                  />
                </Route>
                <Route 
                  path="/auth"
                  element={
                    <RequireAuth authedUser={props.authedUser}>
                      <LoginAs />
                    </RequireAuth>
                  }
                />
                <Route 
                  path="/add" 
                  element={
                    <RequireAuth authedUser={props.authedUser}>
                      <NewPoll />
                    </RequireAuth>
                  } 
                />
                <Route 
                  path="/leaderboard" 
                  element={
                    <RequireAuth authedUser={props.authedUser}>
                      <Leaderboard />
                    </RequireAuth>
                  } 
                />
                <Route 
                  path="/questions/:id" 
                  element={
                    <RequireAuth authedUser={props.authedUser}>
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

const mapStateToProps = ({ authedUser, polls }) => ({
  authedUser,
  loading: polls === null,
});

export default connect(mapStateToProps)(App);
