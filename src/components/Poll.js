import { connect } from "react-redux";
import { formatPoll, formatDate } from "../utils/helpers";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { 
  Typography, 
  Box, 
  Button,
  CardContent,
  CardMedia,
  CardActions,
} from "@mui/material";


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
    <Box textAlign="center">
      <CardMedia
        component="img"
        alt={`img of ${ name }`}
        height="68"
        image={props.pollAvatar}
      />
      <CardContent>
        <Typography variant="subtitle1" >{ name }</Typography>
        <Typography variant="subtitle2" >{ formatDate(timestamp) }</Typography>
      </CardContent>
      <CardActions style={{justifyContent: "center"}}>
        <Button
          // className="btn btn-show-poll" 
          variant="outlined"
          size="small"
          onClick={(e) => toPoll(e, id) }
        >
          Show
        </Button>
      </CardActions>
    </Box>
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