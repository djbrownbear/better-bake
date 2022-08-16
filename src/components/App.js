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
import { Routes, Route } from 'react-router-dom';

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
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<NewPoll />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/questions/:id" element={<PollPage />} />   
            <Route path="/error" element={<Custom404 />} />        
          </Routes> 
        )}
      </div>
    </Fragment>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
