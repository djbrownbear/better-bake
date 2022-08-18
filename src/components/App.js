import React from 'react';
import '../assets/css/App.css';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard'
import PollPage from './PollPage';
import Custom404 from './Custom404';
import { useEffect, Fragment } from "react";
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import NewPoll from './NewPoll';
import Nav from './Nav';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children, authedUser }) {
  const location = useLocation();

  return authedUser
    ? ( children )
    : ( <Navigate to="/login" replace state={{ path: location.pathname }} /> );
}

const App = (props) => {

  useEffect(() => {
    props.dispatch(handleInitialData())
  }, [props]);

  return (
    <Fragment>
      <div className="App">
        <LoadingBar />
        <Nav />
        { props.loading === true ? null : (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/error" element={<Custom404 />} />        
            <Route 
              path="/"
              element={
                <RequireAuth authedUser={props.authedUser}>
                  <Dashboard />
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
    </Fragment>
  );
}

const mapStateToProps = ({ authedUser, polls }) => ({
  authedUser,
  loading: polls === null,
});

export default connect(mapStateToProps)(App);
