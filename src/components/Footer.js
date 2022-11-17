import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faFolder } from "@fortawesome/free-regular-svg-icons";
import {
  Typography,
  Box,
  Container,
  Paper, 
  Grid,
  Link, 
} from "@mui/material";
import { Fragment } from "react";

const Footer = () => {

  return (
    <footer style={{position: "sticky", bottom: '0', width: '100%'}}>
      <Box sx={{ color: "var(--color-secondary)", background: "var(--bg-color-primary)", px: 4, my: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Box>Photo Credits</Box>
              <Box>
                <Link
                  href="https://www.netflix.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="To watch the Great British Bake Off, visit Netflix which opens in a new window."
                >
                  Netflix
                </Link>
              </Box>
              <Box>
                <Link
                  href="http://www.tomhovey.co.uk/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="To learn more, visit the artist Tom Hovey's page which opens in a new window."
                >
                  Tom Hovey
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box>Social</Box>
              <Box>
                <Link
                  href="https://github.com/djbrownbear"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="To learn more, visit the creator's GitHub page which opens in a new window."
                  sx={{ pr: 2 }}
                >
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/aarontimothybrown/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="To learn more, visit the creator's LinkedIn page which opens in a new window."
                  sx={{ px: 2 }}
                >
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </Link>
                <Link
                  href="https://aaron.aaronandanita.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="To learn more, visit the creator's Portfolio page which opens in a new window."
                  sx={{ px: 2 }}
                >
                  <FontAwesomeIcon icon={faFolder} size="lg" />
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
};  

const mapStateToProps = () => {
  return{};
}

export default connect(mapStateToProps)(Footer);