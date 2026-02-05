import React, { useState } from 'react';
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
  const [isVoting, setIsVoting] = useState(false);
  const [showVoteSuccess, setShowVoteSuccess] = useState(false);
  
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
    
    // Handle both mock data (nested structure) and real API (simple structure)
    let bakerOne = '';
    let bakerTwo = '';
    
    // Check if bakers have the complex nested structure (mock data)
    if (bOneSeason && state.bakers[bOneSeason]?.baker) {
      bakerOne = state.bakers[bOneSeason].baker[pollData.optionOne.baker]?.episodes?.[bOneEpisode]?.bakeURL || pollData.optionOne.imgURL || '';
    } else {
      // Real API or fallback to imgURL
      bakerOne = pollData.optionOne.imgURL || '';
    }
    
    if (bTwoSeason && state.bakers[bTwoSeason]?.baker) {
      bakerTwo = state.bakers[bTwoSeason].baker[pollData.optionTwo.baker]?.episodes?.[bTwoEpisode]?.bakeURL || pollData.optionTwo.imgURL || '';
    } else {
      // Real API or fallback to imgURL
      bakerTwo = pollData.optionTwo.imgURL || '';
    }

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

  const handleVote = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!authedUser || isVoting) return;

    setIsVoting(true);

    try {
      await dispatch(handleAddAnswer({
        qid: poll.id,
        answer: e.currentTarget.id as 'optionOne' | 'optionTwo',
        authedUser: authedUser,
       })
      );
      
      setShowVoteSuccess(true);
      setTimeout(() => setShowVoteSuccess(false), 3000);
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setIsVoting(false);
    }
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
        {showVoteSuccess && (
          <div 
            role="alert" 
            aria-live="polite" 
            className="bg-green-50 border-l-4 border-green-500 text-green-800 p-4 mb-6 rounded-lg"
          >
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="font-semibold">Vote recorded successfully!</p>
            </div>
          </div>
        )}
        <PollHeader 
          avatar={avatar}
          name={name}
          timestamp={timestamp}
        />
        <h2 className="text-3xl font-bold text-center my-6">Who Baked It Better?</h2>
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-8 w-full mt-8">
          <div className={"flex-1 p-4 md:p-6 rounded-lg border-2 transition-all " + (hasVotedOptionOne ? "border-green-500 bg-green-50 shadow-lg": "border-gray-300 hover:border-gray-400") + (isVoting ? " opacity-75" : "")}>
            <div className="flex flex-col items-center justify-center">
              <img className="w-full h-auto max-h-64 md:max-h-96 object-contain mb-4" src={ bakerOne } alt="" aria-hidden="true" />
              <h3 className="text-xl md:text-2xl font-bold text-center my-4">{optionOneText}</h3>
              {hasVotedOptionOne && (
                <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-2">
                  Your Vote
                </div>
              )}
              <button
                id="optionOne"
                className="w-32 py-2.5 px-4 border-none bg-primary hover:bg-primary-hover disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:scale-95 disabled:active:scale-100" 
                onClick={(e) => handleVote(e)}
                type="button"
                disabled={hasVoted || isVoting}
                aria-label={`Vote for ${optionOneText}`}
                aria-pressed={hasVotedOptionOne}
              >
                {isVoting ? 'Voting...' : 'Vote'}
              </button>
              { hasVoted &&
                <p className={"flex flex-col items-center mt-4 text-lg font-semibold " + (winLose(optionOneVotes.length, optionTwoVotes.length) === "winning" ? "text-green-600" : winLose(optionOneVotes.length, optionTwoVotes.length) === "losing" ? "text-red-600" : "text-gray-600")}>
                  <span>{`${optionOneVotes.length} out of ${allVotesCount} votes`}</span>
                  <span>{getVotePercentage("optionOne")}</span>
                </p>
              }
            </div>
          </div>
          <div className={"flex-1 p-4 md:p-6 rounded-lg border-2 transition-all " + (hasVotedOptionTwo ? "border-green-500 bg-green-50 shadow-lg": "border-gray-300 hover:border-gray-400") + (isVoting ? " opacity-75" : "")}>
            <div className="flex flex-col items-center justify-center">
              <img className="w-full h-auto max-h-64 md:max-h-96 object-contain mb-4" src={ bakerTwo } alt="" aria-hidden="true" />
              <h3 className="text-xl md:text-2xl font-bold text-center my-4">{optionTwoText}</h3>
              {hasVotedOptionTwo && (
                <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-2">
                  Your Vote
                </div>
              )}
              <button
                id="optionTwo"
                className="w-32 py-2.5 px-4 border-none bg-primary hover:bg-primary-hover disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:scale-95 disabled:active:scale-100" 
                onClick={(e) => handleVote(e)}
                type="button"
                disabled={hasVoted || isVoting}
                aria-label={`Vote for ${optionTwoText}`}
                aria-pressed={hasVotedOptionTwo}
              >
                {isVoting ? 'Voting...' : 'Vote'}
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