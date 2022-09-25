import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import { 
  Box,
  Typography, 
} from "@mui/material";

const PollHeader = ({ avatar, name, timestamp}) => {
  const defaultAvatar = "https://img.icons8.com/external-others-inmotus-design/67/000000/external-Avatar-round-icons-others-inmotus-design-5.png";

  return (
    <Box className="poll-header">
      <Typography variant="h4" align="center">Who Had The Better Bake?</Typography>     
      <Box className="avatar-wrapper">
        <img src={avatar ? avatar : defaultAvatar} alt={`Avatar of ${name}`} className="avatar" />
        <Typography variant="string" align="center">
          {`Poll by ${name}`}
        </Typography>
        <Typography variant="string" align="center">
          { formatDate(timestamp) }
        </Typography>
      </Box>
    </Box>
  );
}

export default connect()(PollHeader);