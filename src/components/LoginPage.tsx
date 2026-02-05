import { useState, useRef, useEffect } from "react";
import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { setAuthedUser } from "../reducers/authedUser";
import { useAppSelector, useAppDispatch } from "../store/hooks";

const LoginPage: React.FC = () => {
  const { state } = useLocation() as { state?: { path?: string } };
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users);
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
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {success && (
          <Navigate to={(state?.path || "/dashboard")} /> // if successful, take user to homepage or page prior to login
          )
        }
        {error &&
            <h1 data-testid="error-header" className="text-red-600 text-center mb-4 font-bold">Error: Please ensure all fields are filled out.</h1>
        }
        {errorUserPwd &&
            <h1 data-testid="errorUserPwd-header" className="text-red-600 text-center mb-4 font-bold">Error: Incorrect username or password. Please try again.</h1>
        }
        <form className="bg-white rounded-lg shadow-xl p-8" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="text-center mb-8">
              <span className="text-3xl font-bold text-amber-700">Better Bake</span>
              <h2 className="text-2xl font-semibold mt-2">Sign In</h2>
            </div>
            <div>
              <input 
                data-testid="username-input"
                type="text" 
                id="username" 
                name="username" 
                placeholder="Username" 
                ref={usernameRef}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <div>
              <input 
                data-testid="password-input"
                type="password" 
                id="pwd" 
                name="pwd" 
                placeholder="Password" 
                ref={passwordRef}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-4">
              <button data-testid="submit-button" className="flex-1 bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors" type="submit">Submit</button>
              <button data-testid="demo-button" className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors" type="button" onClick={handleDemoLogin}>Demo</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};  

export default LoginPage;