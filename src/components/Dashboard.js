import { connect } from "react-redux";
import { useState } from "react";
import Poll from "./Poll";
import { Container, Typography, Box, Grid, Card, ToggleButtonGroup, ToggleButton } from "@mui/material";

const ans = "ANSWERED";
const unans = "UNANSWERED"; 

const Dashboard = ({ authedUser, polls }) => {
  const [showUnanswered, setShowUnanswered] = useState(true);
  const [showAnswered, setShowAnswered] = useState(false);


  const answered = (poll) => (poll.optionOne.votes.includes(authedUser) || poll.optionTwo.votes.includes(authedUser)) ;
  const unanswered = (poll) => (!poll.optionOne.votes.includes(authedUser) && !poll.optionTwo.votes.includes(authedUser)) ;

  const toggleView = (e) => {
    e.preventDefault();

    const el = document.getElementById(e.target.id);
    const elOpposite = document.getElementById(e.target.id === ans ? unans : ans);
    
    const setSelected = (e) => {
      el.classList.add('selected');
      elOpposite.classList.remove('selected');
    }

    switch (e.target.id) {
      case ans:
        setShowAnswered(showAnswered === false ? true : false);
        setShowUnanswered(showUnanswered === true ? false : true);
        setSelected();
        break;
      case unans:
        setShowAnswered(showAnswered === true ? false : true);
        setShowUnanswered(showUnanswered === false ? true : false);
        setSelected();
        break;
      default:
        return;
    }
  }

  return (
  <Container>
    <Typography variant="h1" align="center">
      Dashboard
    </Typography>
    <Container>
      <ToggleButtonGroup
        color="primary"
        exclusive
        onChange={toggleView}
      >
        <ToggleButton
          id={unans}
          // className="btn btn-togglePollView"
          disabled={showUnanswered ? true : false}
          value={unans}
        >
          Unanswered
        </ToggleButton>
        <ToggleButton
          id={ans}
          // className="btn btn-togglePollView"
          disabled={showAnswered ? true : false}
          value={ans}
        >
          Answered
        </ToggleButton>
      </ToggleButtonGroup>
      {showUnanswered && 
        <Box>
          <Typography variant="h2" align="center">
            Unanswered Polls
          </Typography>
          <Grid container spacing={2}>
            {polls
              .filter(unanswered)
              .map(
                (poll) => (
                <Grid item xs={6}>
                  <Card key={poll.id}>
                    <Poll id={poll.id} />
                  </Card>
                </Grid>
            ))}
          </Grid>
        </Box>
      }
      {showAnswered && 
        <Box>
          <Typography variant="h2" align="center">
            Answered Polls
          </Typography>
          <Grid container spacing={2}>
            {polls
              .filter(answered)
              .map(
                (poll) => (
                <Grid item xs={6}>
                  <Card key={poll.id}>
                    <Poll id={poll.id} />
                  </Card>
                </Grid>
            ))}
          </Grid>
        </Box>
      }
    </Container>
  </Container>
  );
};

const mapStateToProps = ({ authedUser, polls }) => (
  {
    authedUser,
    polls: Object.values(polls).sort(
      (a, b) => b.timestamp - a.timestamp
    ),
  }
);

export default connect(mapStateToProps)(Dashboard);