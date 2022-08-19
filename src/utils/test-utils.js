// SOURCE: https://redux.js.org/usage/writing-tests#connected-components
import React from 'react'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
// As a basic setup, import your same slice reducers
// import userReducer from '../features/users/userSlice'
import { createStore } from "redux";
import reducer from '../reducers';
import middleware from '../middleware';
import { MemoryRouter } from "react-router-dom";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    // store = configureStore({ reducer: { user: userReducer }, preloadedState }),
    store = createStore(reducer, middleware),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <MemoryRouter>
        <Provider store={store}>
          {children}
        </Provider>
      </MemoryRouter>
    )
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}