import React from 'react';
import { handleAddAnswer } from "../actions/polls";
import { formatPoll, formatPercent } from "../utils/helpers";
import PollHeader from "./PollHeader";
import { useParams, Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";

interface PollPageProps {
  id: string;
}

const PollPage: React.FC<PollPageProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  
  const { poll, bakerOne, bakerTwo, authedUser } = useAppSelector(state => {
    const pollData = state.polls[id];
    
    if (!pollData) {
      return {
        authedUser: state.authedUser,
        poll: null,
        bakerOne: '',
        bakerTwo: '',
      };
    }
    
    const bOneSeason = pollData.optionOne.season;
    const bTwoSeason = pollData.optionTwo.season;
    const bOneEpisode = pollData.optionOne.episode;
    const bTwoEpisode = pollData.optionTwo.episode;
    const bakerOne = bOneSeason ? state.bakers[bOneSeason].baker[pollData.optionOne.baker].episodes[bOneEpisode].bakeURL : pollData.optionOne.imgURL;
    const bakerTwo = bTwoSeason ? state.bakers[bTwoSeason].baker[pollData.optionTwo.baker].episodes[bTwoEpisode].bakeURL : pollData.optionTwo.imgURL;

    return {
      authedUser: state.authedUser,
      poll: formatPoll(pollData, state.users[pollData.author], state.authedUser || ''),
      bakerOne,
      bakerTwo,
    };
  });

  if (!poll || !authedUser) {
    return <Navigate to="/error"/>;
  }

  const handleVote = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!authedUser) return;

    dispatch(handleAddAnswer({
      qid: poll.id,
      answer: e.currentTarget.id as 'optionOne' | 'optionTwo',
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
    hasVoted,
  } = poll

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
      <div className="max-w-[65em] mx-auto mb-40 px-4 py-8">
        <PollHeader 
          avatar={avatar}
          name={name}
          timestamp={timestamp}
        />
        <div className="flex flex-row justify-between gap-8 w-full mt-8">
          <div className={"flex-1 p-6 rounded-lg border-2 " + (hasVotedOptionOne ? "border-green-500 bg-green-50": "border-gray-300")}>
            <div className="flex flex-col items-center justify-center">
              <img className="w-full h-auto max-h-96 object-contain mb-4" src={ bakerOne } alt={`${optionOneText}`} />
              <h3 className="text-2xl font-bold text-center my-4">{optionOneText}</h3>
              <button
                id="optionOne"
                className="w-32 py-2.5 px-4 border-none bg-secondary hover:bg-amber-200 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 font-semibold rounded-lg transition-all cursor-pointer" 
                onClick={(e) => handleVote(e)}
                type="button"
                disabled={hasVoted ? true : false }
              >
                Vote
              </button>
              { hasVoted &&
                <p className={"flex flex-col items-center mt-4 text-lg font-semibold " + (winLose(optionOneVotes.length, optionTwoVotes.length) === "winning" ? "text-green-600" : winLose(optionOneVotes.length, optionTwoVotes.length) === "losing" ? "text-red-600" : "text-gray-600")}>
                  <span>{`${optionOneVotes.length} out of ${allVotesCount} votes`}</span>
                  <span>{getVotePercentage("optionOne")}</span>
                </p>
              }
            </div>
          </div>
          <div className={"flex-1 p-6 rounded-lg border-2 " + (hasVotedOptionTwo ? "border-green-500 bg-green-50": "border-gray-300")}>
            <div className="flex flex-col items-center justify-center">
              <img className="w-full h-auto max-h-96 object-contain mb-4" src={ bakerTwo } alt={`${optionTwoText}`} />
              <h3 className="text-2xl font-bold text-center my-4">{optionTwoText}</h3>
              <button
                id="optionTwo"
                className="w-32 py-2.5 px-4 border-none bg-secondary hover:bg-amber-200 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 font-semibold rounded-lg transition-all cursor-pointer" 
                onClick={(e) => handleVote(e)}
                type="button"
                disabled={hasVoted ? true : false }
              >
                Vote
              </button>
              { hasVoted &&
                <p className={"flex flex-col items-center mt-4 text-lg font-semibold " + (winLose(optionTwoVotes.length, optionOneVotes.length) === "winning" ? "text-green-600" : winLose(optionTwoVotes.length, optionOneVotes.length) === "losing" ? "text-red-600" : "text-gray-600")}>
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

// Wrapper component to get params from URL
const PollPageWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <PollPage id={id || ''} />;
};

export default PollPageWrapper;