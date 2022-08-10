import { connect } from "react-redux";
import { formatPoll, formatDate } from "../utils/helpers";

const PollPage = (props) => {

  console.log(props)

  if (props.poll === null) {
    return <p>This poll does not exist</p>;
  }

  const {
    avatar,
    name,
    optionOne,
    optionTwo,
    timestamp,
  } = props.poll

  return (
    <div className="poll-wrapper">
      <div className="poll-header">
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
        <h2>Would you rather...</h2>
        <span>{ formatDate(timestamp) }</span>
      </div>
      <div className="poll-info">
        <div className="poll-option">
            <p>{optionOne.text}</p>
            <span>{optionOne.votes.length}</span>
        </div>
        <div className="poll-option">
            <p>{optionTwo.text}</p>
            <span>{optionOne.votes.length}</span>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = ({ authedUser, users, polls }, {id}) => {
  const poll = polls[id];

  return {
    authedUser,
    poll: poll
      ? formatPoll(poll, users[poll.author], authedUser)
      : null, 
  };
};

export default connect(mapStateToProps)(PollPage);