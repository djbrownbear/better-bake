import { useState, useRef } from "react";
// import { connect } from "react-redux";
// TODO : set up navigation upon successful login
// import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: build out handling
    }

  return (
    <div className="login">
      <h1>Login Page</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-field">
          <label hmtlFor="username">Username:</label><br />
          <input type="text" id="username" name="username" placeholder="Enter Username" ref={usernameRef} />
        </div>
        <div className="login-field">
          <label htmlFor="pwd">Password:</label><br />
          <input type="password" id="pwd" name="pwd" placeholder="Enter Password" ref={passwordRef} />
        </div>
        <div className="login-field">
          <button className="btn" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};  

export default LoginPage;