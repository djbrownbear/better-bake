import { useState } from "react";
import React from 'react';
import Poll from "./Poll";
import { Poll as PollType } from "../types";
import { useAppSelector } from "../store/hooks";

const Dashboard: React.FC = () => {
  const authedUser = useAppSelector(state => state.authedUser);
  const polls = useAppSelector(state => 
    Object.values(state.polls).sort((a, b) => b.timestamp - a.timestamp)
  );
  const [showUnanswered, setShowUnanswered] = useState(true);
  const [showAnswered, setShowAnswered] = useState(false);


  const answered = (poll: PollType) => (poll.optionOne.votes.includes(authedUser || '') || poll.optionTwo.votes.includes(authedUser || ''));
  const unanswered = (poll: PollType) => (!poll.optionOne.votes.includes(authedUser || '') && !poll.optionTwo.votes.includes(authedUser || ''));

  const toggleView = (viewType: 'answered' | 'unanswered') => {
    if (viewType === 'answered') {
      setShowAnswered(true);
      setShowUnanswered(false);
    } else {
      setShowAnswered(false);
      setShowUnanswered(true);
    }
  }

  return (
  <div>
    <div className="bg-linear-to-r from-primary-600 via-primary-500 to-primary-600 py-8">
      <h1 className="text-4xl text-white font-bold text-center">Dashboard</h1>
    </div>
    <div className="max-w-[65em] mx-auto mb-40 px-4 py-8">
      {/* Button Group Toggle */}
      <div className="flex justify-center mb-8">
        <div 
          className="inline-flex rounded-lg shadow-sm"
          role="tablist"
          aria-label="Poll filter"
        >
        <button
          type="button"
          role="tab"
          aria-selected={showUnanswered}
          aria-controls="unanswered-polls"
          onClick={() => toggleView('unanswered')}
          className={`
            relative px-6 py-2.5 text-sm font-semibold rounded-l-lg border transition-all
            focus:z-10 focus:outline-none focus:ring-2 focus:ring-amber-500
            ${showUnanswered 
              ? 'bg-amber-700 text-white border-amber-700 hover:bg-amber-800' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }
          `}
        >
          Unanswered
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={showAnswered}
          aria-controls="answered-polls"
          onClick={() => toggleView('answered')}
          className={`
            relative -ml-px px-6 py-2.5 text-sm font-semibold rounded-r-lg border transition-all
            focus:z-10 focus:outline-none focus:ring-2 focus:ring-amber-500
            ${showAnswered 
              ? 'bg-amber-700 text-white border-amber-700 hover:bg-amber-800' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }
          `}
        >
          Answered
        </button>
      </div>
    </div>

      {/* Poll Sections */}
      {showUnanswered && (
        <section 
          className="bg-white rounded-lg shadow-md overflow-hidden mb-6" 
          role="tabpanel" 
          id="unanswered-polls"
        >
          <header className="bg-linear-to-r from-primary-600 via-primary-500 to-primary-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Unanswered Polls</h2>
          </header>
          
          {polls.filter(unanswered).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4">
              <div className="bg-gray-100 rounded-full p-6 mb-4">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl text-gray-900 font-bold mb-2">No unanswered polls</h3>
              <p className="text-gray-600 text-center max-w-md">
                You've answered all available polls! Check back later for new polls.
              </p>
            </div>
          ) : (
            <div className="p-6">
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {polls
                  .filter(unanswered)
                  .map((poll) => (
                    <li key={poll.id} className="transform transition-transform hover:scale-[1.02]">
                      <Poll id={poll.id} />
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {showAnswered && (
        <section 
          className="bg-white rounded-lg shadow-md overflow-hidden mb-6" 
          role="tabpanel" 
          id="answered-polls"
        >
          <header className="bg-linear-to-r from-primary-600 via-primary-500 to-primary-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Answered Polls</h2>
          </header>
          
          {polls.filter(answered).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4">
              <div className="bg-gray-100 rounded-full p-6 mb-4">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl text-gray-900 font-bold mb-2">No answered polls yet</h3>
              <p className="text-gray-600 text-center max-w-md">
                Start voting on polls to build your voting history!
              </p>
            </div>
          ) : (
            <div className="p-6">
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {polls
                  .filter(answered)
                  .map((poll) => (
                    <li key={poll.id} className="transform transition-transform hover:scale-[1.02]">
                      <Poll id={poll.id} />
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </section>
      )}

    </div>
  </div>
  );
};

export default Dashboard;