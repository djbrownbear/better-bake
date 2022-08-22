// SOURCE: https://redux.js.org/usage/writing-tests#connected-components
import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from "redux";
import reducer from '../reducers';
import middleware from '../middleware';
import { MemoryRouter } from "react-router-dom";
import { handleInitialData } from '../actions/shared';

function setupStore() {
 const store = createStore(reducer, middleware);
 store.dispatch(handleInitialData());
 return store;
}

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(),
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