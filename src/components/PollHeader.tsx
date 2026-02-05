import React from 'react';
import { formatDate } from "../utils/helpers";

interface PollHeaderProps {
  avatar: string;
  name: string;
  timestamp: number;
}

const PollHeader: React.FC<PollHeaderProps> = ({ avatar, name, timestamp }) => {
  const defaultAvatar = "https://img.icons8.com/external-others-inmotus-design/67/000000/external-Avatar-round-icons-others-inmotus-design-5.png";

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header Section with Gradient */}
      <div className="bg-linear-to-r from-primary-50 via-white to-primary-50 p-8 border-b border-gray-100">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 leading-tight tracking-tight">
          Who Had The <span className="text-primary">Better</span> Bake?
        </h2>
      </div>
      
      {/* Author Info Section */}
      <div className="p-6 bg-white">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Avatar with enhanced styling */}
          <div className="relative">
            <img 
              src={avatar ? avatar : defaultAvatar} 
              alt="" 
              aria-hidden="true"
              className="w-16 h-16 rounded-full object-cover border-4 border-primary-200 shadow-md ring-2 ring-primary-100" 
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          
          {/* Author Name with Icon */}
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start mb-1.5">
              <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span className="text-xs uppercase tracking-widest font-bold text-gray-500 leading-none">
                Poll Creator
              </span>
            </div>
            <p className="text-xl font-bold text-gray-900 leading-tight">
              {name}
            </p>
          </div>
        </div>
        
        {/* Timestamp */}
        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-600">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <time 
              dateTime={new Date(timestamp).toISOString()}
            >
              {formatDate(timestamp)}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PollHeader;