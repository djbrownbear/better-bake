import React from 'react';
import '../assets/css/App.css';
import LoginPage from './LoginPage';
import { useEffect } from "react";
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';

const App = (props) => {

  useEffect(() => {
    props.dispatch(handleInitialData())
  }, [props]);

  return (
    <div className="App">
      <LoginPage />
    </div>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
