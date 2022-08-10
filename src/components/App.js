import React from 'react';
import '../assets/css/App.css';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import Poll from './Poll';
import PollPage from './PollPage';
import { useEffect } from "react";
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';

const App = (props) => {

  useEffect(() => {
    props.dispatch(handleInitialData())
  }, [props]);

  return (
    <div className="App">
      { props.loading === true ? null : <Dashboard/> }
    </div>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
