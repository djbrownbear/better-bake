import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Avatar,
  Box,
  Button,
  Typography,
} from "@mui/material";

const LoginAs = ({ dispatch, authedUser, usersList}) => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setAuthedUser(e.currentTarget.id));
    navigate((state?.path || "/dashboard"));
  }

  return (
    <Box>
      <Typography variant="h3" className="title">
        Switch User
      </Typography>
      <Box className="page-wrapper inner">
        <Box className="userlist">
          {usersList.map((user) => (  
            <Button key={user.id} id={user.id} type="button" className="btn btn-userlist" onClick={handleClick}>
              <Avatar 
                src={user.avatarURL}
                alt={`Avatar of ${user.name}`} 
              />
              <Typography variant="string" focusable="false" align="left">{user.name}</Typography>
              <Typography variant="string" focusable="false" align="left">{user.id}</Typography>
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

const mapStateToProps = ({ users, authedUser }) => {
  return {
    authedUser,
    usersList: Object.values(users).sort((a,b) => b.id - a.id),
  };
}

export default connect(mapStateToProps)(LoginAs);