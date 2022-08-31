import { connect } from "react-redux";
import { handleAddAnswer } from "../actions/polls";
import { formatPoll, formatPercent } from "../utils/helpers";
import PollHeader from "./PollHeader";
import { useLocation, useNavigate, useParams, Navigate } from "react-router-dom";

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

  if (!props.poll || !props.authedUser) {
    return <Navigate to="/error"/>;
  }

  const handleVote = (e) => {
    e.preventDefault();

    const { dispatch, poll, authedUser } = props;

    dispatch(handleAddAnswer({
      qid: poll.id,
      answer: e.target.id,
      authedUser: authedUser,
     })
    );
  }

  const {
    avatar,
    name,
    optionOne,
    optionTwo,
    timestamp,
    authedUser,
    hasVoted,
  } = props.poll

  const optionOneVotes = optionOne.votes;
  const optionOneText = optionOne.text;

  const optionTwoVotes = optionTwo.votes;
  const optionTwoText = optionTwo.text;

  const allVotesCount = optionOneVotes.length + optionTwoVotes.length;
  const hasVotedOptionOne = optionOneVotes.includes(authedUser);
  const hasVotedOptionTwo = optionTwoVotes.includes(authedUser);

 

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

  const winLose = (a, b) => {    
    switch(typeof a === 'number') {
      case (a === b):
        return "tie";
      case (a > b):
        return "winning";
      case (a < b):
        return "losing";
      default:
        return "";
    };
  };
 
  return (
      <div className="page-wrapper inner">
        <PollHeader 
          avatar={avatar}
          name={name}
          timestamp={timestamp}
        />
        <div className="poll-info">
          <div className={"poll-option " + (hasVotedOptionOne ? "vote-choice": "")}>
            <div className="poll-option-wrapper-inner">
              <img className="poll-option-img" src={ props.bakerOne } alt={`${optionOneText}`} />
              <h3>{optionOneText}</h3>
              <button
                id="optionOne"
                className="btn btn-vote" 
                onClick={(e) => handleVote(e)}
                type="button"
                disabled={hasVoted ? true : false }
              >
                Vote
              </button>
              { hasVoted &&
                <p className={"poll-details " + (winLose(optionOneVotes.length, optionTwoVotes.length))}>
                  <span>{`${optionOneVotes.length} out of ${allVotesCount} votes`}</span>
                  <span>{getVotePercentage("optionOne")}</span>
                </p>
              }
            </div>
          </div>
          <div className={"poll-option " + (hasVotedOptionTwo ? "vote-choice": "")}>
            <div className="poll-option-wrapper-inner">
              <img className="poll-option-img" src={ props.bakerTwo } alt={`${optionTwoText}`} />
              <h3>{optionTwoText}</h3>
              <button
                id="optionTwo"
                className="btn btn-vote" 
                onClick={(e) => handleVote(e)}
                type="button"
                disabled={hasVoted ? true : false }
              >
                Vote
              </button>
              { hasVoted &&
                <p className={"poll-details " + (winLose(optionTwoVotes.length, optionOneVotes.length))}>
                  <span>{`${optionTwoVotes.length} out of ${allVotesCount} votes`}</span>
                  <span>{getVotePercentage("optionTwo")}</span>
                </p>
              }
            </div>
          </div>
        </div>
      </div>
  )
};

const mapStateToProps = ({ authedUser, users, polls, bakers }, props) => {
  const { id } = props.router.params;
  const poll = polls[id];
  const bOneSeason = poll.optionOne.season;
  const bTwoSeason = poll.optionTwo.season;
  const bOneEpisode = poll.optionOne.episode;
  const bTwoEpisode = poll.optionTwo.episode;
  const bakerOne = bakers[bOneSeason].baker[poll.optionOne.baker].episodes[bOneEpisode].bakeURL;
  const bakerTwo = bakers[bTwoSeason].baker[poll.optionTwo.baker].episodes[bTwoEpisode].bakeURL;


  return {
    authedUser,
    poll: poll
      ? formatPoll(poll, users[poll.author], authedUser)
      : null, 
    bakerOne,
    bakerTwo,
  };
};

export default withRouter(connect(mapStateToProps)(PollPage));