import { connect } from "react-redux";
import { formatPoll, formatDate } from "../utils/helpers";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const Poll = (props) => {
  const navigate = useNavigate();

  const toPoll = (e, id) => {
    e.preventDefault();

    navigate(`/questions/${id}`)
  }

  if (props.poll === null) {
    return <p>This poll does not exist</p>;
  }

  const {
    id,
    name,
    timestamp,
  } = props.poll

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

const mapStateToProps = ({ authedUser, users, polls }, {id}) => {
  const poll = polls[id];
  const pollAvatar = users[poll.author].avatarURL;

  return {
    authedUser,
    poll: poll
      ? formatPoll(poll, users[poll.author], authedUser)
      : null, 
    pollAvatar,
  };
};

export default withRouter(connect(mapStateToProps)(Poll));