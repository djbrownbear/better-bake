import React from 'react';
import { Link } from 'react-router-dom';

const Custom404: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <svg className="w-32 h-32 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">This poll does not exist or has been removed.</p>
        <div className="flex gap-4 justify-center">
          <Link 
            to="/dashboard" 
            className="bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 px-6 rounded-lg transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 no-underline"
          >
            Go to Dashboard
          </Link>
          <Link 
            to="/" 
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 no-underline"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Custom404;