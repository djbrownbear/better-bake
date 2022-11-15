import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import { 
  Box,
  Typography, 
  Avatar,
  Button
} from "@mui/material";

const AvatarInfo = ({ avatar, name, timestamp, id, handleClick}) => {
  const defaultAvatar = "https://img.icons8.com/external-others-inmotus-design/67/000000/external-Avatar-round-icons-others-inmotus-design-5.png";

  return (
  <Box className={`avatar-wrapper ${id && name && !handleClick ? 'leaderboard' : ''} ${id && handleClick ? 'nav-avatar' : ''}`}>
    <Avatar 
      src={avatar ? avatar : defaultAvatar} 
      alt={`Avatar of ${name}`} 
      sx={{ width: 56, height: 56 }}
      // className="avatar"
    />
    { // for PollHeader
    name && timestamp && 
      <Typography variant="string" align="center">
        {`Poll by ${name}`}
        <br/>
        { formatDate(timestamp) }
      </Typography>
    }
    { // for Leaderboard
    id && name && !handleClick &&
      <Box>
        <Typography variant="string">{name}</Typography>
        <Typography 
          variant="string" 
          sx={{
            textTransform: 'uppercase',
            fontSize: '10px',
          }}
        >
          {id}
        </Typography>
      </Box>    
    }
  </Box>
  );
}

export default connect()(AvatarInfo);