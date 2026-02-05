import { useState, useRef, useEffect } from "react";
import React from 'react';
import { Navigate, useLocation, Link } from "react-router-dom";
import { setAuthedUser } from "../reducers/authedUser";
import { receiveUsers } from "../reducers/users";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { apiClient } from "../utils/apiClient";
import { config } from "../config";

const LoginPage: React.FC = () => {
  const { state } = useLocation() as { state?: { path?: string } };
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorUserPwd, setErrorUserPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (usernameRef.current) usernameRef.current.value = '';
    if (passwordRef.current) passwordRef.current.value = '';
  },[])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Input values are automatically stored in refs
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      if (!username || !password) {
        setError(true);
        setSuccess(false);
        setErrorUserPwd(false);
        setIsLoading(false);
        return;
      }

      if (config.USE_REAL_API) {
        // Real API: use email/password authentication
        try {
          const response = await apiClient.login(username, password);
          
          // Transform API user to match frontend User type
          const user = apiClient.transformApiUser(response.user);
          
          // Update Redux state with user data and auth
          dispatch(receiveUsers({ [user.id]: user }));
          dispatch(setAuthedUser(user.id));
          setSuccess(true);
          setError(false);
          setErrorUserPwd(false);
        } catch (error: any) {
          console.error('Login error:', error);
          setErrorUserPwd(true);
          setError(false);
          setSuccess(false);
          setIsLoading(false);
        }
      } else {
        // Mock API: simulate async operation
        setTimeout(() => {
          const user = users[username];

          if (user && user.password === password) {
            setSuccess(true);
            setError(false);
            setErrorUserPwd(false);
            dispatch(setAuthedUser(user.id));
          } else if (!user || user.password !== password) {
            setErrorUserPwd(true);
            setError(false);
            setSuccess(false);
            setIsLoading(false);
          }
        }, 300);
      }
    } catch (error) {
      console.error('Unexpected login error:', error);
      setErrorUserPwd(true);
      setError(false);
      setSuccess(false);
      setIsLoading(false);
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
    <div className="min-h-screen bg-linear-to-br from-primary-100 via-primary-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {success && (
          <Navigate to={(state?.path || "/dashboard")} /> // if successful, take user to homepage or page prior to login
          )
        }
        {error &&
            <div 
              role="alert" 
              aria-live="assertive" 
              data-testid="error-header" 
              className="text-red-600 bg-red-50 border border-red-200 rounded-lg text-center p-4 mb-4 font-semibold"
            >
              Error: Please ensure all fields are filled out.
            </div>
        }
        {errorUserPwd &&
            <div 
              role="alert" 
              aria-live="assertive" 
              data-testid="errorUserPwd-header" 
              className="text-red-600 bg-red-50 border border-red-200 rounded-lg text-center p-4 mb-4 font-semibold"
            >
              Error: Incorrect username or password. Please try again.
            </div>
        }
        <form className="bg-white rounded-lg shadow-xl p-8" onSubmit={handleSubmit} aria-label="Sign in form">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <span className="text-3xl font-bold text-primary">Better Bake</span>
              <h1 className="text-2xl font-semibold mt-2">Sign In</h1>
            </div>
            <div>
              <label htmlFor="username" className="sr-only">
                {config.USE_REAL_API ? 'Email' : 'Username'}
              </label>
              <input 
                data-testid="username-input"
                type={config.USE_REAL_API ? "email" : "text"}
                id="username" 
                name="username" 
                placeholder={config.USE_REAL_API ? "Email" : "Username"}
                ref={usernameRef}
                onChange={handleChange}
                disabled={isLoading}
                required
                aria-required="true"
                aria-invalid={error || errorUserPwd}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label htmlFor="pwd" className="sr-only">Password</label>
              <input 
                data-testid="password-input"
                type="password" 
                id="pwd" 
                name="pwd" 
                placeholder="Password" 
                ref={passwordRef}
                onChange={handleChange}
                disabled={isLoading}
                required
                aria-required="true"
                aria-invalid={error || errorUserPwd}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div className="flex gap-4">
              <button 
                data-testid="submit-button" 
                className="flex-1 bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary disabled:active:scale-100" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Submit'
                )}
              </button>
              <button 
                data-testid="demo-button" 
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-600 disabled:active:scale-100" 
                type="button" 
                onClick={handleDemoLogin}
                disabled={isLoading || config.USE_REAL_API}
                title={config.USE_REAL_API ? "Demo mode not available with real API" : "Login with random user"}
              >
                {isLoading ? 'Loading...' : 'Demo'}
              </button>
            </div>
            
            {config.USE_REAL_API && (
              <div className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link 
                  to="/register"
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                  Create one
                </Link>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};  

export default LoginPage;