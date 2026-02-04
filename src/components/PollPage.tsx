import { connect, ConnectedProps } from "react-redux";
import React from 'react';
import { handleAddAnswer } from "../actions/polls";
import { formatPoll, formatPercent } from "../utils/helpers";
import PollHeader from "./PollHeader";
import { useParams, Navigate } from "react-router-dom";
import { RootState } from "../reducers";

const mapStateToProps = ({ authedUser, users, polls, bakers }: RootState, ownProps: { id: string }) => {
  const id = ownProps.id;
  const poll = polls[id];
  
  if (!poll) {
    return {
      authedUser,
      poll: null,
      bakerOne: '',
      bakerTwo: '',
    };
  }
  
  const bOneSeason = poll.optionOne.season;
  const bTwoSeason = poll.optionTwo.season;
  const bOneEpisode = poll.optionOne.episode;
  const bTwoEpisode = poll.optionTwo.episode;
  const bakerOne = bOneSeason ? bakers[bOneSeason].baker[poll.optionOne.baker].episodes[bOneEpisode].bakeURL : poll.optionOne.imgURL;
  const bakerTwo = bTwoSeason ? bakers[bTwoSeason].baker[poll.optionTwo.baker].episodes[bTwoEpisode].bakeURL : poll.optionTwo.imgURL;

  return {
    authedUser,
    poll: formatPoll(poll, users[poll.author], authedUser || ''),
    bakerOne,
    bakerTwo,
  };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const PollPage: React.FC<PropsFromRedux> = (props) => {

  if (!props.poll || !props.authedUser) {
    return <Navigate to="/error"/>;
  }

  const handleVote = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { dispatch, poll, authedUser } = props;

    if (!authedUser) return;

    dispatch(handleAddAnswer({
      qid: poll.id,
      answer: e.currentTarget.id as 'optionOne' | 'optionTwo',
      authedUser: authedUser,
     }) as any
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

  function getVotePercentage(val: 'optionOne' | 'optionTwo'): string {
    let result: number;
    if (val === "optionOne") {
      result = (optionOneVotes.length / allVotesCount);
      return formatPercent(result);
    } else if  (val ==="optionTwo") {
      result = (optionTwoVotes.length / allVotesCount)
      return formatPercent(result);
    } else {
      return '';
    }
  }

  const winLose = (a: number, b: number): string => {    
    if (a === b) return "tie";
    if (a > b) return "winning";
    if (a < b) return "losing";
    return "";
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
            <div className="poll-option-wrapper-inner center-h ">
              <img className="poll-option-img" src={ props.bakerOne } alt={`${optionOneText}`} />
              <h3 className="center-v">{optionOneText}</h3>
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
            <div className="poll-option-wrapper-inner center-h ">
              <img className="poll-option-img" src={ props.bakerTwo } alt={`${optionTwoText}`} />
              <h3 className="center-v">{optionTwoText}</h3>
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

const ConnectedPollPage = connector(PollPage);

// Wrapper component to get params from URL
const PollPageWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <ConnectedPollPage id={id || ''} />;
};

export default PollPageWrapper;