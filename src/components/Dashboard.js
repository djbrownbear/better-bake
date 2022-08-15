import { connect } from "react-redux";
import Poll from "./Poll";

const Dashboard = ({ authedUser, polls }) => {
  
  const answered = (poll) => (poll.optionOne.votes.includes(authedUser) || poll.optionTwo.votes.includes(authedUser)) ;
  const unanswered = (poll) => (!poll.optionOne.votes.includes(authedUser) && !poll.optionTwo.votes.includes(authedUser)) ;

  console.log(polls.map(poll => poll.id))

  return (
  <div>
    <h1>Dashboard</h1>
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