import React from 'react';
import { formatPoll, formatDate } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

interface PollProps {
  id: string;
}

const Poll: React.FC<PollProps> = ({ id }) => {
  const navigate = useNavigate();
  const poll = useAppSelector(state => {
    const pollData = state.polls[id];
    if (!pollData) return null;
    return formatPoll(pollData, state.users[pollData.author], state.authedUser || '');
  });
  const pollAvatar = useAppSelector(state => {
    const pollData = state.polls[id];
    if (!pollData) return '';
    return state.users[pollData.author].avatarURL;
  });

  const toPoll = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    navigate(`/questions/${id}`);
  }

  if (poll === null) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
        <p className="text-gray-500">Poll not found</p>
      </div>
    );
  }

  const {
    id: pollId,
    name,
    timestamp,
  } = poll;

  return (
    <article className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden h-full flex flex-col">
      {/* Author Info */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-gray-50">
        <img 
          src={pollAvatar} 
          alt="" 
          aria-hidden="true"
          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">{name}</p>
          <time 
            className="text-xs text-gray-500" 
            dateTime={new Date(timestamp).toISOString()}
          >
            {formatDate(timestamp)}
          </time>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-16 h-16 rounded-full bg-linear-to-br from-primary-100 to-primary-200 flex items-center justify-center mb-4">
          <svg 
            className="w-8 h-8 text-primary" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
            />
          </svg>
        </div>
        <p className="text-gray-600 text-sm font-medium mb-4">Who Baked It Better?</p>
      </div>

      {/* Action Button */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <button
          className="w-full py-2.5 px-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:scale-[0.98]" 
          onClick={(e) => toPoll(e, pollId)}
          aria-label={`View poll by ${name}`}
        >
          View Poll
        </button>
      </div>
    </article>
  )
};

export default Poll;