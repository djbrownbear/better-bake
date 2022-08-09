import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "../components/LoginPage";

describe('LoginPage', () => {
  it('will display an error if all fields except the email address are submitted.', () => {
    render(<LoginPage />);

    const credential = screen.getByTestId('password-input');
    fireEvent.change(credential, {target: { value:'password123' }});

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    expect(screen.getByTestId('error-header')).toBeInTheDocument();
    expect(screen.queryByTestId('success-header')).not.toBeInTheDocument();
  })
  
  it('will display an error if all fields except the password are submitted.', () => {
    render(<LoginPage />);

    const username = screen.getByTestId('username-input');
    fireEvent.change(username, {target: { value:'sarahedo' }});

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    expect(screen.getByTestId('error-header')).toBeInTheDocument();
    expect(screen.queryByTestId('success-header')).not.toBeInTheDocument();
  })

    it('will display a success message if all fields are submitted.', () => {
    render(<LoginPage />);

    const username = screen.getByTestId('username-input');
    fireEvent.change(username, {target: { value:'sarahedo' }});
    const credential = screen.getByTestId('password-input');
    fireEvent.change(credential, {target: { value:'password123' }});

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    expect(screen.getByTestId('success-header')).toBeInTheDocument();
    expect(screen.queryByTestId('error-header')).not.toBeInTheDocument();
  })
})