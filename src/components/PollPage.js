import { connect } from "react-redux";
import { handleAddAnswer } from "../actions/polls";
import { formatPoll, formatPercent } from "../utils/helpers";
import PollHeader from "./PollHeader";
import { useLocation, useNavigate, useParams, Navigate } from "react-router-dom";
import { 
  Container,
  Typography, 
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Grid,
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

const PollPage = (props) => {

  if (!props.poll || !props.authedUser) {
    return <Navigate to="/error"/>;
  }

  const handleVote = (e) => {
    e.preventDefault();

    const { dispatch, poll, authedUser } = props;

    dispatch(handleAddAnswer({
      qid: poll.id,
      answer: e.target.id,
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
    authedUser,
    hasVoted,
  } = props.poll

  const optionOneVotes = optionOne.votes;
  const optionOneText = optionOne.text;

  const optionTwoVotes = optionTwo.votes;
  const optionTwoText = optionTwo.text;

  const allVotesCount = optionOneVotes.length + optionTwoVotes.length;
  const hasVotedOptionOne = optionOneVotes.includes(authedUser);
  const hasVotedOptionTwo = optionTwoVotes.includes(authedUser);

 

  function getVotePercentage(val) {
    let result;
    if (val === "optionOne") {
      result = (optionOneVotes.length / allVotesCount);
      return formatPercent(result);
    } else if  (val ==="optionTwo") {
      result = (optionTwoVotes.length / allVotesCount)
      return formatPercent(result);
    } else {
      return;
    }
  };

  const winLose = (a, b) => {    
    switch(typeof a === 'number') {
      case (a === b):
        return "tie";
      case (a > b):
        return "winning";
      case (a < b):
        return "losing";
      default:
        return "";
    };
  };
 
  return (
      <Container>
        <PollHeader 
          avatar={avatar}
          name={name}
          timestamp={timestamp}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card className={"poll-option " + (hasVotedOptionOne ? "vote-choice": "")}>
              <CardMedia 
                component="img"
                className="poll-option-img" 
                alt={`${optionOneText}`}
                image={ props.bakerOne } 
              />
              <CardContent>
                <Typography variant="subtitle1" align="center">{optionOneText}</Typography>
                { hasVoted &&
                  <Typography 
                    variant="subtitle2"
                    className={"poll-details " + (winLose(optionOneVotes.length, optionTwoVotes.length))}
                  >
                    <span>{`${optionOneVotes.length} out of ${allVotesCount} votes`}</span>
                    <span>{getVotePercentage("optionOne")}</span>
                  </Typography>
                }                
              </CardContent>
              <CardActions style={{justifyContent: "center"}}>
                <Button
                  id="optionOne"
                  // className="btn btn-vote" 
                  onClick={(e) => handleVote(e)}
                  disabled={hasVoted ? true : false }
                  >
                  Vote
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card className={"poll-option " + (hasVotedOptionTwo ? "vote-choice": "")}>
              <CardMedia 
                component="img"
                className="poll-option-img" 
                alt={`${optionTwoText}`}
                image={ props.bakerTwo } 
              />
              <CardContent>
                <Typography variant="subtitle1" align="center">{optionTwoText}</Typography>
                { hasVoted &&
                  <Typography 
                    variant="subtitle2"
                    className={"poll-details " + (winLose(optionTwoVotes.length, optionOneVotes.length))}
                  >
                    <span>{`${optionTwoVotes.length} out of ${allVotesCount} votes`}</span>
                    <span>{getVotePercentage("optionTwo")}</span>
                  </Typography>
                }
              </CardContent>
              <CardActions style={{justifyContent: "center"}}>
                <Button
                  id="optionTwo"
                  // className="btn btn-vote" 
                  onClick={(e) => handleVote(e)}
                  disabled={hasVoted ? true : false }
                >
                  Vote
                </Button>
              </CardActions>
            </Card>
          </Grid>          
        </Grid>
      </Container>
  )
};

const mapStateToProps = ({ authedUser, users, polls, bakers }, props) => {
  const { id } = props.router.params;
  const poll = polls[id];
  const bOneSeason = poll.optionOne.season;
  const bTwoSeason = poll.optionTwo.season;
  const bOneEpisode = poll.optionOne.episode;
  const bTwoEpisode = poll.optionTwo.episode;
  const bakerOne = bOneSeason ? bakers[bOneSeason].baker[poll.optionOne.baker].episodes[bOneEpisode].bakeURL : poll.optionOne.imgURL;
  const bakerTwo = bTwoSeason ? bakers[bTwoSeason].baker[poll.optionTwo.baker].episodes[bTwoEpisode].bakeURL : poll.optionTwo.imgURL;


  return {
    authedUser,
    poll: poll
      ? formatPoll(poll, users[poll.author], authedUser)
      : null, 
    bakerOne,
    bakerTwo,
  };
};

export default withRouter(connect(mapStateToProps)(PollPage));