import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore } from "redux";
// import { store } from './app/store';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import './assets/css/index.css';
import reducer from './reducers';
import middleware from './middleware';
import { BrowserRouter as Router } from 'react-router-dom';

const store = createStore(reducer, middleware);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Router>
     <App />
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
