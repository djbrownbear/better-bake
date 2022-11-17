import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faFolder } from "@fortawesome/free-regular-svg-icons";
import {
  Typography,
  Box,
  Button,
  CardContent,
  CardActions,
  Container,
  Grid,
} from "@mui/material";
import { Fragment } from "react";

const LandingPage = ({ dispatch }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    navigate('/login');
  } 

  return (
    <Fragment>
      <section id="one">
        <Box className="container no-gutter center-v color-main">
          <Box className="column content">
            <Box className="img-wrapper">
              <img
                src="https://images.squarespace-cdn.com/content/v1/53db930be4b04ee7c4020290/1559899792825-I5EQCC3M1FMCW8ILW7R6/Benjamina%27s-Floral-Tea-Cake-Series-7.jpg?format=600w"
                alt="Benjamina's Floral Tea Cake"
                className="img-right"
              />
              <img
                src="https://images.squarespace-cdn.com/content/v1/53db930be4b04ee7c4020290/1559899883718-Z3LHPYK96M5GZH882LS8/Kim-Joy-Lavender-%26-Lemon-Fox-Cake.jpg?format=600w"
                alt="Kim-Joy's Lavender and Lemon Fox Cake"
                className="img-left"
              />
              <Box className="circle"></Box>
            </Box>
            <Box className="textBlock">
              <h1>
                Settle who had the <span>better bake</span>.
              </h1>
              <p>
                Together, we can decide the better bake between contestants from{" "}
                <br />
                <a
                  href="https://thegreatbritishbakeoff.co.uk/"
                  alt="The Great British Bake Off site"
                >
                  <span>The Great British Bake Off</span>.
                </a>
              </p>
              <p>On your marks, get set, vote!</p>
              <Box className="center-h">
                <button className="btn" type="button" onClick={handleClick}>
                  Demo
                </button>
              </Box>
            </Box>
          </Box>
        </Box>
      </section>

      <section id="two">
        <Box>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={4}>
              <Box>
                <Typography variant="h4">Vote</Typography>
              </Box>
              <Box className="textBlock">
                <Typography variant="string" paragraph={true}>
                  Cast your vote on the best bakes from user-created polls,
                  including your own polls.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Box className="img-wrapper col-2">
                <img
                  src="https://i.imgur.com/wXxGfuV.png"
                  alt="vote for best bake"
                  className="img-screenshot"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </section>

      <section id="three">
        <Box className="color-accent">
          <Grid container spacing={0}>
            <Grid item xs={12} sm={4}>
              <Box>
                <Typography variant="h4">Leaderboard</Typography>
              </Box>
              <Box>
                <Typography variant="string" paragraph={true}>
                  View user rankings by the number of polls answered and
                  created.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Box className="img-wrapper col-2">
                <img
                  src="https://i.imgur.com/Ftq4FdE.png"
                  alt="vote for best bake"
                  className="img-screenshot"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </section>

      <section id="four">
        <Box>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={4}>
              <Box>
                <Typography variant="h4">Create New Polls</Typography>
              </Box>
              <Box>
                <Typography variant="string" paragraph={true}>
                  Missing the match up you have been waiting for? Well, wait no
                  longer. Create the poll now for others to vote.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Box className="img-wrapper col-2">
                <img
                  src="https://i.imgur.com/Ftq4FdE.png"
                  alt="vote for best bake"
                  className="img-screenshot"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </section>
    </Fragment>
  );
};  

const mapStateToProps = () => {
  return{};
}

export default connect(mapStateToProps)(LandingPage);