import { useState, useRef } from "react";
// import { connect } from "react-redux";
// TODO : set up navigation upon successful login
// import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  let usernameRef = useRef();
  let passwordRef = useRef();

  const handleChange = (e) => {
    if (e.target.name === "pwd") {
      let passwordRef = e.target.value;
      return passwordRef;
    } else if (e.target.name ==="username") {
      let usernameRef = e.target.value;
      return usernameRef;
    } else {
      return;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!usernameRef || !passwordRef ) {
      setError(true);
      setSuccess(false);
      return;
    }

    setSuccess(true);
    setError(false);
  }

  return (
    <div className="login">
      {success &&
        <h1 data-testid="success-header">Form Submitted!</h1>
      }
      {error &&
          <h1 data-testid="error-header">Error: Please ensure all fields are filled out.</h1>
      }
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login Page</h1>
        <div className="login-field">
          <label hmtlFor="username">Username:</label><br />
          <input 
            data-testid="username-input"
            type="text" 
            id="username" 
            name="username" 
            placeholder="Enter Username" 
            ref={usernameRef} 
            onChange={handleChange}
          />
        </div>
        <div className="login-field">
          <label htmlFor="pwd">Password:</label><br />
          <input 
            data-testid="password-input"
            type="password" 
            id="pwd" 
            name="pwd" 
            placeholder="Enter Password" 
            ref={passwordRef} 
            onChange={handleChange}
          />
        </div>
        <div className="login-field">
          <button data-testid="submit-button" className="btn" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};  

export default LoginPage;