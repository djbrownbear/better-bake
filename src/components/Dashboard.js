import { connect } from "react-redux";
import { useState } from "react";
import Poll from "./Poll";

const ans = "ANSWERED";
const unans = "UNANSWERED"; 

const Dashboard = ({ authedUser, polls }) => {
  const [showUnanswered, setShowUnanswered] = useState(true);
  const [showAnswered, setShowAnswered] = useState(false);


  const answered = (poll) => (poll.optionOne.votes.includes(authedUser) || poll.optionTwo.votes.includes(authedUser)) ;
  const unanswered = (poll) => (!poll.optionOne.votes.includes(authedUser) && !poll.optionTwo.votes.includes(authedUser)) ;

  const toggleView = (e) => {
    e.preventDefault();

    console.log(e.target.id);
    switch (e.target.id) {
      case ans:
        setShowAnswered(showAnswered === false ? true : false);
        setShowUnanswered(showUnanswered === true ? false : true);
        break;
      case unans:
        setShowAnswered(showAnswered === true ? false : true);
        setShowUnanswered(showUnanswered === false ? true : false);
        break;
      default:
        return;
    }
  }

  return (
  <div>
    <h1>Dashboard</h1>
    <div>
      <button
        id={ans}
        type="button"
        className="btn btn-togglePollView"
        onClick={toggleView}
        disabled={showAnswered ? true : false}
      >
        Answered
      </button>
      <button
        id={unans}
        type="button"
        className="btn btn-togglePollView"
        onClick={toggleView}
        disabled={showUnanswered ? true : false}
      >
        Unanswered
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
  );
};

const mapStateToProps = ({ authedUser, polls }) => (
  {
    authedUser,
    polls: Object.values(polls).sort(
      (a, b) => b.timestamp - a.timestamp
    ),
  }
);

export default connect(mapStateToProps)(Dashboard);