import { connect, ConnectedProps } from "react-redux";
import { useState } from "react";
import React from 'react';
import Poll from "./Poll";
import { RootState } from "../reducers";
import { Poll as PollType } from "../types";

const ans = "ANSWERED";
const unans = "UNANSWERED"; 

const mapStateToProps = ({ authedUser, polls }: RootState) => (
  {
    authedUser,
    polls: Object.values(polls).sort(
      (a, b) => b.timestamp - a.timestamp
    ),
  }
);

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Dashboard: React.FC<PropsFromRedux> = ({ authedUser, polls }) => {
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
    <div className="title">
      <h1>Dashboard</h1>
    </div>
    <div className="page-wrapper inner">
      <div className="toggle-container">
        <button
          id={unans}
          type="button"
          className="btn btn-togglePollView"
          onClick={toggleView}
          disabled={showUnanswered ? true : false}
        >
          Unanswered
        </button>
        <button
          id={ans}
          type="button"
          className="btn btn-togglePollView"
          onClick={toggleView}
          disabled={showAnswered ? true : false}
        >
          Answered
        </button>
      </div>
      {showUnanswered && 
        <div className="polls-wrapper">
          <h2>Unanswered Polls</h2>
          <ul className="polls-flex">
            {polls
              .filter(unanswered)
              .map(
                (poll) => (
                <li key={poll.id} className="poll-item">
                  <Poll id={poll.id} />
                </li>
            ))}
          </ul>
        </div>
      }
      {showAnswered && 
        <div className="polls-wrapper">
          <h2>Answered Polls</h2>
          <ul className="polls-flex">
            {polls
              .filter(answered)
              .map(
                (poll) => (
                <li key={poll.id} className="poll-item">
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

export default connector(Dashboard);