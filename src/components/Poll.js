import { connect } from "react-redux";
import { formatPoll, formatDate } from "../utils/helpers";

const Poll = (props) => {

  console.log(props)

  const toPoll = (e, id) => {
    e.preventDefault();
    console.log("Poll is: ", id)
    // TODO: add navigation to poll
  }

  if (props.poll === null) {
    return <p>This poll does not exist</p>;
  }

  const {
    avatar,
    id,
    name,
    timestamp,
    hasVoted,
  } = props.poll

  return (
    <div className="polls">
      <p>{ name }</p>
      <span>{ formatDate(timestamp) }</span>
      <button
        className="btn-show-poll" 
        onClick={(e) => toPoll(e, id) }
      >
        Show
      </button>
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

export default connect(mapStateToProps)(Poll);