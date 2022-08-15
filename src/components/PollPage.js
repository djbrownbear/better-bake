import { connect } from "react-redux";
import { handleAddAnswer } from "../actions/polls";
import { formatPoll, formatPercent } from "../utils/helpers";
import PollHeader from "./PollHeader";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

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
    hasVoted,
    id
  } = props.poll

  const optionOneVotes = optionOne.votes;
  const optionOneText = optionOne.text;

  const optionTwoVotes = optionTwo.votes;
  const optionTwoText = optionTwo.text;

  const allVotesCount = optionOneVotes.length + optionTwoVotes.length;
  const allVotes = optionOneVotes.concat(optionTwoVotes);
  const hasVotedOptionOne = optionOneVotes.includes(authedUser);
  const hasVotedOptionTwo = optionTwoVotes.includes(authedUser);
  // const hasVoted = allVotes.includes(props.authedUser);

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
    <Link to={`/poll/${id}`} className="poll">
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
    </Link>
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

export default withRouter(connect(mapStateToProps)(PollPage));