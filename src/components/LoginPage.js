import { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

const LoginPage = ({ dispatch, users }) => {
  const { state } = useLocation();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorUserPwd, setErrorUserPwd] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    usernameRef.current = undefined;
    passwordRef.current = undefined;
  },[])

  const handleChange = (e) => {
    if (e.target.id === "pwd") {
      passwordRef.current = e.target.value;
    } else if (e.target.id ==="username") {
      usernameRef.current = e.target.value;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users[usernameRef.current];

    if (user && user.password === passwordRef.current ){
      setSuccess(true);
      setError(false);
      setErrorUserPwd(false);
      dispatch(setAuthedUser(user.id));
      const el = document.querySelector(".page-container");
      el.style.backgroundColor = "var(--bg-color-default)";
    } else if ( !usernameRef.current || !passwordRef.current) {
      setError(true);
      setSuccess(false);
      setErrorUserPwd(false);
    } else if (!user || user.password !== passwordRef.current ){
      setErrorUserPwd(true);
      setError(false);
      setSuccess(false);
    } else {
      setErrorUserPwd(false);
      setError(false);
      setSuccess(false);
    }
  }

  const handleDemoLogin = (e) => {
    e.preventDefault();

    // NOT for production use
    // choose a random user to login as a demo user
    const demoUser = Object.keys(users)[Math.floor(Math.random() * (Object.keys(users).length))];
    usernameRef.current = demoUser;
    passwordRef.current = users[demoUser].password;
    handleSubmit(e);
  }

  return (
    <div className="login">
      {success && (
        <Navigate to={(state?.path || "/auth")} /> // if successful, take user to homepage or page prior to login
        )
      }
      {error &&
          <h1 data-testid="error-header">Error: Please ensure all fields are filled out.</h1>
      }
      {errorUserPwd &&
           <h1 data-testid="errorUserPwd-header">Error: Incorrect username or password. Please try again.</h1>
      }
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="column">
          <span>Better Bake</span>
          <div className="row">
            <h2>Sign In</h2>
          </div>
          <div className="container">
            <div className="login-field">
              {/* <label hmtlFor="username">Username</label><br /> */}
              <input 
                data-testid="username-input"
                type="text" 
                id="username" 
                name="username" 
                placeholder="Username" 
                ref={usernameRef}
                onChange={handleChange}
              />
            </div>
            <div className="login-field">
              {/* <label htmlFor="pwd">Password</label><br /> */}
              <input 
                data-testid="password-input"
                type="password" 
                id="pwd" 
                name="pwd" 
                placeholder="Password" 
                ref={passwordRef}
                onChange={handleChange}
              />
            </div>
            <div className="login-field">
              <button data-testid="submit-button" className="btn btn-login" type="submit">Submit</button>
              <button data-testid="demo-button" className="btn btn-login" type="button" onClick={handleDemoLogin}>Demo</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};  

const mapStateToProps = ({ users }) => {
  return{
    users,
  };
}

export default connect(mapStateToProps)(LoginPage);