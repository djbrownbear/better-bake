import { useState, useRef, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";
import { RootState } from "../reducers";

const mapStateToProps = ({ users }: RootState) => {
  return {
    users,
  };
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const LoginPage: React.FC<PropsFromRedux> = ({ dispatch, users }) => {
  const { state } = useLocation() as { state?: { path?: string } };
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorUserPwd, setErrorUserPwd] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (usernameRef.current) usernameRef.current.value = '';
    if (passwordRef.current) passwordRef.current.value = '';
  },[])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Input values are automatically stored in refs
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const user = users[username || ''];

    if (user && user.password === password ){
      setSuccess(true);
      setError(false);
      setErrorUserPwd(false);
      dispatch(setAuthedUser(user.id));
    } else if ( !username || !password) {
      setError(true);
      setSuccess(false);
      setErrorUserPwd(false);
    } else if (!user || user.password !== password ){
      setErrorUserPwd(true);
      setError(false);
      setSuccess(false);
    } else {
      setErrorUserPwd(false);
      setError(false);
      setSuccess(false);
    }
  }

  const handleDemoLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // NOT for production use
    // choose a random user to login as a demo user
    const demoUser = Object.keys(users)[Math.floor(Math.random() * (Object.keys(users).length))];
    if (usernameRef.current) usernameRef.current.value = demoUser;
    if (passwordRef.current) passwordRef.current.value = users[demoUser].password;
    handleSubmit(e);
  }

  return (
    <div className="page-wrapper bg-primary">
      <div className="login">
        {success && (
          <Navigate to={(state?.path || "/dashboard")} /> // if successful, take user to homepage or page prior to login
          )
        }
        {error &&
            <h1 data-testid="error-header" className="warning-text">Error: Please ensure all fields are filled out.</h1>
        }
        {errorUserPwd &&
            <h1 data-testid="errorUserPwd-header" className="warning-text">Error: Incorrect username or password. Please try again.</h1>
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
    </div>
  );
};  

export default connector(LoginPage);