import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import { LoginPage } from "../components/LoginPage";

describe('LoginPage', () => {
  it('will display an error if all fields except the email address are submitted.', () => {
    const view = render(<LoginPage />);

    const username = view.queryByTestId('username-input');
    const credential = view.getByTestId('password-input');
    fireEvent.change(credential, {target: { value:'password123' }});

    const submitButton = view.getByTestId('submit-button');
    fireEvent.click(submitButton);

    expect(view.getByTestId('error-header')).toBeInTheDocument();
    expect(view.queryByTestId('success-header')).not.toBeInTheDocument();
  })
  
  it('will display an error if all fields except the password are submitted.', () => {
    const view = render(<LoginPage />);

    const username = view.getByTestId('username-input');
    fireEvent.change(username, {target: { value:'sarahedo' }});
    const credential = view.queryByTestId('password-input');

    const submitButton = view.getByTestId('submit-button');
    fireEvent.click(submitButton);

    expect(view.getByTestId('error-header')).toBeInTheDocument();
    expect(view.queryByTestId('success-header')).not.toBeInTheDocument();
  })
})