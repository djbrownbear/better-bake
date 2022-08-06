import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import reducer from '../reducers';

export const store = configureStore({
  reducer: {
    reducer
    // counter: counterReducer,
  },
});
