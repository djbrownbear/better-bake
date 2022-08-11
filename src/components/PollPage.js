import { connect } from "react-redux";
import { handleAddAnswer } from "../actions/polls";
import { formatPoll, formatDate, formatPercent } from "../utils/helpers";
import PollHeader from "./PollHeader";

const PollPage = (props) => {

  const handleVote = (e) => {
    e.preventDefault();

    const { dispatch, poll, authedUser } = props;

    dispatch(handleAddAnswer({
      qid: poll.id,
      answer: e.target.id,
      authedUser,
     })
    );
  }

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
    authedUser,
  } = props.poll

  const optionOneVotes = optionOne.votes;
  const optionOneText = optionOne.text;

  const optionTwoVotes = optionTwo.votes;
  const optionTwoText = optionTwo.text;

  const allVotesCount = optionOneVotes.length + optionTwoVotes.length;
  const allVotes = optionOneVotes.concat(optionTwoVotes);
  const hasVotedOptionOne = optionOneVotes.includes(authedUser);
  const hasVotedOptionTwo = optionTwoVotes.includes(authedUser);
  const hasVoted = allVotes.includes(props.authedUser);

  console.log(`Vote count is: ${allVotesCount}, Votes are: ${allVotes}, Did You Vote: ${hasVoted}`);

  function getVotePercentage(val) {
    let result;
    if (val === "optionOne") {
      result = (optionOneVotes.length / allVotesCount);
      return formatPercent(result);
    } else if  (val ==="optionTwo") {
      result = (optionTwoVotes.length / allVotesCount)
      return formatPercent(result);
    } else {
      return;
    }
  };

  return (
    <div>
      <PollHeader 
        avatar={avatar}
        name={name}
        timestamp={timestamp}
      />
      <div className="poll-info">
        <div className={"poll-option " + (hasVotedOptionOne ? "vote-choice": "")}>
            <p>{optionOneText}</p>
            <button
              id="optionOne"
              className="btn-vote" 
              onClick={(e) => handleVote(e)}
              type="button"
              disabled={hasVoted ? true : false }
            >
              Vote
            </button>
            { hasVoted &&
              <p className="poll-details">
                <span>{`${optionOneVotes.length} out of ${allVotesCount} votes`}</span>
                <span>{getVotePercentage("optionOne")}</span>
              </p>
            }
        </div>
        <div className={"poll-option " + (hasVotedOptionTwo ? "vote-choice": "")}>
            <p>{optionTwoText}</p>
            <button
              id="optionTwo"
              className="btn-vote" 
              onClick={(e) => handleVote(e)}
              type="button"
              disabled={hasVoted ? true : false }
            >
              Vote
            </button>
            { hasVoted &&
              <p className="poll-details">
                <span>{`${optionTwoVotes.length} out of ${allVotesCount} votes`}</span>
                <span>{getVotePercentage("optionTwo")}</span>
              </p>
            }
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