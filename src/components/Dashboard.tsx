import { useState } from "react";
import React from 'react';
import Poll from "./Poll";
import { Poll as PollType } from "../types";
import { useAppSelector } from "../store/hooks";

const ans = "ANSWERED";
const unans = "UNANSWERED"; 

const Dashboard: React.FC = () => {
  const authedUser = useAppSelector(state => state.authedUser);
  const polls = useAppSelector(state => 
    Object.values(state.polls).sort((a, b) => b.timestamp - a.timestamp)
  );
  const [showUnanswered, setShowUnanswered] = useState(true);
  const [showAnswered, setShowAnswered] = useState(false);


  const answered = (poll: PollType) => (poll.optionOne.votes.includes(authedUser || '') || poll.optionTwo.votes.includes(authedUser || ''));
  const unanswered = (poll: PollType) => (!poll.optionOne.votes.includes(authedUser || '') && !poll.optionTwo.votes.includes(authedUser || ''));

  const toggleView = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const el = document.getElementById(e.currentTarget.id);
    const elOpposite = document.getElementById(e.currentTarget.id === ans ? unans : ans);
    
    const setSelected = () => {
      el?.classList.add('selected');
      elOpposite?.classList.remove('selected');
    }

    switch (e.currentTarget.id) {
      case ans:
        setShowAnswered(showAnswered === false ? true : false);
        setShowUnanswered(showUnanswered === true ? false : true);
        setSelected();
        break;
      case unans:
        setShowAnswered(showAnswered === true ? false : true);
        setShowUnanswered(showUnanswered === false ? true : false);
        setSelected();
        break;
      default:
        return;
    }
  }

  return (
  <div>
    <div className="bg-secondary py-8">
      <h1 className="text-4xl font-bold text-center">Dashboard</h1>
    </div>
    <div className="max-w-[65em] mx-auto mb-40 px-4 py-8">
      <div className="flex bg-gray-900 text-white justify-center items-center h-[42px] max-w-[380px] rounded-full py-0 px-1.5 mx-auto">
        <button
          id={unans}
          type="button"
          className={`w-1/2 m-0 rounded-full py-2.5 px-4 font-semibold border-none transition-all cursor-pointer ${showUnanswered ? 'bg-secondary text-gray-900 z-[2]' : 'bg-gray-900 text-white z-0 hover:bg-gray-800'}`}
          onClick={toggleView}
          disabled={showUnanswered ? true : false}
        >
          Unanswered
        </button>
        <button
          id={ans}
          type="button"
          className={`w-1/2 m-0 rounded-full py-2.5 px-4 font-semibold border-none transition-all cursor-pointer ${showAnswered ? 'bg-secondary text-gray-900 z-[2]' : 'bg-gray-900 text-white z-0 hover:bg-gray-800'}`}
          onClick={toggleView}
          disabled={showAnswered ? true : false}
        >
          Answered
        </button>
      </div>
      {showUnanswered && 
        <div className="p-0 my-5 mx-auto flex w-full border border-gray-900 flex-col">
          <h2 className="bg-gray-900 text-white m-0 py-4 text-center text-2xl font-bold">Unanswered Polls</h2>
          <ul className="mx-2.5 my-0 py-2.5 px-5 flex flex-wrap justify-between items-center">
            {polls
              .filter(unanswered)
              .map(
                (poll) => (
                <li key={poll.id} className="w-[31.5%] p-0.5 m-1.5 shadow-md">
                  <Poll id={poll.id} />
                </li>
            ))}
          </ul>
        </div>
      }
      {showAnswered && 
        <div className="p-0 my-5 mx-auto flex w-full border border-gray-900 flex-col">
          <h2 className="bg-gray-900 text-white m-0 py-4 text-center text-2xl font-bold">Answered Polls</h2>
          <ul className="mx-2.5 my-0 py-2.5 px-5 flex flex-wrap justify-between items-center">
            {polls
              .filter(answered)
              .map(
                (poll) => (
                <li key={poll.id} className="w-[31.5%] p-0.5 m-1.5 shadow-md">
                  <Poll id={poll.id} />
                </li>
            ))}
          </ul>
        </div>
      }
    </div>
  </div>
  );
};

export default Dashboard;