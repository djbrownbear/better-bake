import { formatDate } from "../utils/helpers";

const PollHeader = ({ avatar, name, timestamp}) => {
  // const defaultAvatar = "../assets/images/avatars/icons8-avatar-67.png";
  const defaultAvatar = "https://img.icons8.com/external-others-inmotus-design/67/000000/external-Avatar-round-icons-others-inmotus-design-5.png";

  return (
    <div className="poll-header">
      <img src={avatar ? avatar : defaultAvatar} alt={`Avatar of ${name}`} className="avatar" />
      <h2>Would you rather...</h2>
      <span>{ formatDate(timestamp) }</span>
    </div>
  );
}

export default PollHeader;