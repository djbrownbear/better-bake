import { useState, useRef, FormEvent } from "react";
import React from 'react';
import { Navigate, Link, useLocation } from "react-router-dom";
import { setAuthedUser } from "../reducers/authedUser";
import { receiveUsers } from "../reducers/users";
import { useAppDispatch } from "../store/hooks";
import { apiClient } from "../utils/apiClient";
import { config } from "../config";

const RegisterPage: React.FC = () => {
  const { state } = useLocation() as { state?: { path?: string } };
  const dispatch = useAppDispatch();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const name = nameRef.current?.value;
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      const confirmPassword = confirmPasswordRef.current?.value;

      // Validation
      if (!name || !email || !password || !confirmPassword) {
        setError('Please fill in all fields');
        setIsLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }

      if (password.length < 8) {
        setError('Password must be at least 8 characters long');
        setIsLoading(false);
        return;
      }

      if (!config.USE_REAL_API) {
        setError('Registration is only available with the real API. Please enable VITE_USE_REAL_API=true in your .env file.');
        setIsLoading(false);
        return;
      }

      // Register with real API
      const response = await apiClient.register(email, password, name);
      
      // Transform API user to match frontend User type
      const user = apiClient.transformApiUser(response.user);
      
      // Update Redux state
      dispatch(receiveUsers({ [user.id]: user }));
      dispatch(setAuthedUser(user.id));
      setSuccess(true);
      setError('');
    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  if (!config.USE_REAL_API) {
    return (
      <div className="min-h-screen bg-linear-to-br from-primary-100 via-primary-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <span className="text-3xl font-bold text-primary">Better Bake</span>
            <h1 className="text-2xl font-semibold mt-2">Registration Unavailable</h1>
          </div>
          <p className="text-center text-gray-600 mb-6">
            Registration is only available when using the real backend API.
          </p>
          <div className="text-center">
            <Link 
              to="/login"
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-100 via-primary-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {success && (
          <Navigate to={(state?.path || "/dashboard")} />
        )}
        {error && (
          <div 
            role="alert" 
            aria-live="assertive"
            className="text-red-600 bg-red-50 border border-red-200 rounded-lg text-center p-4 mb-4 font-semibold"
          >
            {error}
          </div>
        )}
        <form className="bg-white rounded-lg shadow-xl p-8" onSubmit={handleSubmit} aria-label="Registration form">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <span className="text-3xl font-bold text-primary">Better Bake</span>
              <h1 className="text-2xl font-semibold mt-2">Create Account</h1>
            </div>
            
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Full Name" 
                ref={nameRef}
                disabled={isLoading}
                required
                aria-required="true"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Email" 
                ref={emailRef}
                disabled={isLoading}
                required
                aria-required="true"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="Password (min 8 characters)" 
                ref={passwordRef}
                disabled={isLoading}
                required
                minLength={8}
                aria-required="true"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                placeholder="Confirm Password" 
                ref={confirmPasswordRef}
                disabled={isLoading}
                required
                aria-required="true"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <button 
              className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary disabled:active:scale-100" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link 
                to="/login"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
