import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import './assets/css/index.css';
import reducer from './reducers';
import { HashRouter as Router } from 'react-router-dom';
import logger from './middleware/logger';

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV !== 'production'
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Router basename="/">
     <App />
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
