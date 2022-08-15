import React from 'react';
import '../assets/css/App.css';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import Poll from './Poll';
import PollPage from './PollPage';
import { useEffect } from "react";
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import NewPoll from './NewPoll';

const App = (props) => {

  useEffect(() => {
    props.dispatch(handleInitialData())
  }, [props]);

  return (
    <div className="App">
      <LoadingBar />
      { props.loading === true ? null : <Dashboard /> }
      {/* props.loading === true ? null : <PollPage id="xj352vofupe1dqz9emx13r" /> */}
    </div>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
