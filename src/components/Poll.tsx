import React from 'react';
import { formatPoll, formatDate } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

interface PollProps {
  id: string;
}

const Poll: React.FC<PollProps> = ({ id }) => {
  const navigate = useNavigate();
  const poll = useAppSelector(state => {
    const pollData = state.polls[id];
    if (!pollData) return null;
    return formatPoll(pollData, state.users[pollData.author], state.authedUser || '');
  });
  const pollAvatar = useAppSelector(state => {
    const pollData = state.polls[id];
    if (!pollData) return '';
    return state.users[pollData.author].avatarURL;
  });

  const toPoll = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    navigate(`/questions/${id}`);
  }

  if (poll === null) {
    return <p>This poll does not exist</p>;
  }

  const {
    id: pollId,
    name,
    timestamp,
  } = poll;

  return (
    <div className="m-0 p-0.5 flex flex-col justify-center items-center w-full bg-[#F3F5F7]">
      <div className="flex flex-row justify-center my-1.5 mx-auto font-bold w-full">
        <img src={pollAvatar} alt={`img of ${ name }`} className="h-[50px] px-1"/>
        <span className="mx-1 w-fit my-1.5">{ name }</span>
      </div>
      <span className="my-1.5">{ formatDate(timestamp) }</span>
      <button
        className="w-[100px] my-1.5 py-2.5 px-4 border-none bg-secondary hover:bg-amber-200 text-gray-900 font-semibold rounded-lg transition-all cursor-pointer" 
        onClick={(e) => toPoll(e, pollId) }
      >
        Show
      </button>
    </div>
  )
};

export default Poll;