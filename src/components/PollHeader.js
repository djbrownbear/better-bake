import { formatDate } from "../utils/helpers";

const PollHeader = ({ avatar, name, timestamp}) => {

  return (
    <div className="poll-header">
      <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
      <h2>Would you rather...</h2>
      <span>{ formatDate(timestamp) }</span>
    </div>
  );
}

export default PollHeader;