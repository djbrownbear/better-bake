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
      <p>{ name }</p>
      <span>{ formatDate(timestamp) }</span>
      <button
        className="btn-show-poll" 
        onClick={(e) => toPoll(e, id) }
      >
        Show
      </button>
    </div>
  )
};

const mapStateToProps = ({ authedUser, users, polls }, {id}) => {
  const poll = polls[id];

  return {
    authedUser,
    poll: poll
      ? formatPoll(poll, users[poll.author], authedUser)
      : null, 
  };
};

export default withRouter(connect(mapStateToProps)(Poll));