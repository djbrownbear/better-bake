import * as React from "react";
import { screen, fireEvent, cleanup } from "@testing-library/react";
import LoginPage from "../components/LoginPage";
import { renderWithProviders } from "../utils/test-utils";
import { createStore } from "redux";
import reducer from '../reducers';
import middleware from '../middleware';
import { handleInitialData } from '../actions/shared';

const store = createStore(reducer, middleware);
afterEach(() => cleanup);

describe('LoginPage', () => {
  it('will display an error if all fields except the username are submitted.', () => {
    renderWithProviders(<LoginPage />);

    const credential = screen.getByTestId('password-input');
    fireEvent.change(credential, {target: { value:'password123' }});

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    expect(screen.getByTestId('error-header')).toBeInTheDocument();
    expect(screen.queryByTestId('errorUserPwd-header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('success-header')).not.toBeInTheDocument();
  })
  
  it('will display an error if all fields except the password are submitted.', () => {
    renderWithProviders(<LoginPage />);

    const username = screen.getByTestId('username-input');
    fireEvent.change(username, {target: { value:'sarahedo' }});

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    expect(screen.getByTestId('error-header')).toBeInTheDocument();
    expect(screen.queryByTestId('errorUserPwd-header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('success-header')).not.toBeInTheDocument();
  })

  it('will display an error if the username is incorrect.', async () => {
    await store.dispatch(handleInitialData());
    const { dispatch } = store.dispatch;
    const state = store.getState();
    const users = state.users;
    const user = 'nobody';

    renderWithProviders(<LoginPage dispatch={dispatch} users={users}/>);

    const username = screen.getByTestId('username-input');
    fireEvent.change(username, {target: { value: user }});
    expect(Object.keys(users).includes(user)).toBeFalsy()

    const credential = screen.getByTestId('password-input');
    fireEvent.change(credential, {target: { value:'password123' }});

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    expect(screen.getByTestId('errorUserPwd-header')).toBeInTheDocument();
    expect(screen.queryByTestId('error-header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('success-header')).not.toBeInTheDocument();
  })

  it('will display an error if the password is incorrect.', async () => {
    await store.dispatch(handleInitialData());
    const { dispatch } = store.dispatch;
    const state = store.getState();
    const users = state.users;

    renderWithProviders(<LoginPage dispatch={dispatch} users={users}/>);

    const username = screen.getByTestId('username-input');
    fireEvent.change(username, {target: { value: 'sarahedo' }});

    const credential = screen.getByTestId('password-input');
    fireEvent.change(credential, {target: { value: 'password' }});
    expect(credential.value).not.toEqual(users[username.value].password);

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    expect(screen.getByTestId('errorUserPwd-header')).toBeInTheDocument();
    expect(screen.queryByTestId('error-header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('success-header')).not.toBeInTheDocument();
  })

  it('will check all fields are entered correctly.', async () => {
    await store.dispatch(handleInitialData());
    const { dispatch } = store.dispatch;
    const state = store.getState();
    const users = state.users;
    const user = 'tylermcginnis';

    renderWithProviders(<LoginPage dispatch={dispatch} users={users}/>);

    const username = screen.getByTestId('username-input');
    fireEvent.change(username, {target: { value: user }});
    expect(username.value).toEqual(users[user].id);
    const credential = screen.getByTestId('password-input');
    fireEvent.change(credential, {target: { value:'abc321' }});
    expect(credential.value).toEqual(users[user].password);
  })
})