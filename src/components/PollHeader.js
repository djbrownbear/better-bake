import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";

const PollHeader = ({ avatar, name, timestamp}) => {
  const defaultAvatar = "https://img.icons8.com/external-others-inmotus-design/67/000000/external-Avatar-round-icons-others-inmotus-design-5.png";

  return (
    <div className="poll-header">
      <h2>Who Had The Better Bake?</h2>     
      <div className="avatar-wrapper">
        <img src={avatar ? avatar : defaultAvatar} alt={`Avatar of ${name}`} className="avatar" />
        <span>{`Poll by ${name}`}</span>
      </div>
      <span>{ formatDate(timestamp) }</span>
    </div>
  );
}

export default connect()(PollHeader);