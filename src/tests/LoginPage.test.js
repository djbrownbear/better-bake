import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "../components/LoginPage";
import { renderWithProviders } from "../utils/test-utils";

describe('LoginPage', () => {
  it('will display an error if all fields except the username are submitted.', () => {
    renderWithProviders(<LoginPage />);

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

  it('will display an error if the username is incorrect.', () => {
    renderWithProviders(<LoginPage />);

    const username = screen.getByTestId('username-input');
    fireEvent.change(username, {target: { value:'nobody' }});

    const credential = screen.getByTestId('password-input');
    fireEvent.change(credential, {target: { value:'password123' }});

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    expect(screen.getByTestId('errorUserPwd-header')).toBeInTheDocument();
    expect(screen.queryByTestId('error-header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('success-header')).not.toBeInTheDocument();
  })

  it('will display an error if the password is incorrect.', () => {
    renderWithProviders(<LoginPage />);

    const username = screen.getByTestId('username-input');
    fireEvent.change(username, {target: { value:'sarahedo' }});

    const credential = screen.getByTestId('password-input');
    fireEvent.change(credential, {target: { value:'password' }});

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    expect(screen.getByTestId('errorUserPwd-header')).toBeInTheDocument();
    expect(screen.queryByTestId('error-header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('success-header')).not.toBeInTheDocument();
  })

  it('will display a success message if all fields are submitted correctly.', async () => {
    renderWithProviders(<LoginPage />);

    const username = screen.getByTestId('username-input');
    fireEvent.change(username, {target: { value:'sarahedo' }});
    expect(username.value).toBe('sarahedo');
    const credential = screen.getByTestId('password-input');
    fireEvent.change(credential, {target: { value:'password123' }});
    expect(credential.value).toBe('password123');

    const submitButton = screen.getByTestId('submit-button');
    await fireEvent.click(submitButton);

    expect(screen.getByTestId('logout-button')).toBeInTheDocument();
    expect(screen.queryByTestId('errorUserPwd-header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error-header')).not.toBeInTheDocument();
  })
})