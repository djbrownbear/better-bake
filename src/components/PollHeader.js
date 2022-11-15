import { connect } from "react-redux";
import AvatarInfo from "./AvatarWrapper";
import { 
  Box,
  Typography, 
} from "@mui/material";

const PollHeader = ({ avatar, name, timestamp }) => {

  return (
    <Box className="poll-header">
      <Typography variant="h4" align="center">
        Who Had The Better Bake?
      </Typography>     
      <AvatarInfo
        avatar={avatar}
        name={name}
        timestamp={timestamp}
      />
    </Box>
  );
}

export default connect()(PollHeader);