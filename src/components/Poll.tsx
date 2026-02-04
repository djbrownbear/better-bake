import { connect, ConnectedProps } from "react-redux";
import React from 'react';
import { formatPoll, formatDate } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import { RootState } from "../reducers";

interface OwnProps {
  id: string;
}

const mapStateToProps = ({ authedUser, users, polls }: RootState, { id }: OwnProps) => {
  const poll = polls[id];
  
  if (!poll) {
    return {
      authedUser,
      poll: null,
      pollAvatar: '',
    };
  }
  
  const pollAvatar = users[poll.author].avatarURL;

  return {
    authedUser,
    poll: formatPoll(poll, users[poll.author], authedUser || ''),
    pollAvatar,
  };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const Poll: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const toPoll = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();

    navigate(`/questions/${id}`);
  }

  if (props.poll === null) {
    return <p>This poll does not exist</p>;
  }

  const {
    id,
    name,
    timestamp,
  } = props.poll;

  return (
    <div className="polls">
      <div className="avatar-wrapper poll">
        <img src={props.pollAvatar} alt={`img of ${ name }`}/>
        <span>{ name }</span>
      </div>
      <span>{ formatDate(timestamp) }</span>
      <button
        className="btn btn-show-poll" 
        onClick={(e) => toPoll(e, id) }
      >
        Show
      </button>
    </div>
  )
};

export default connector(Poll);