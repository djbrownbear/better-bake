import { connect } from "react-redux";
import AvatarInfo from "./AvatarWrapper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Leaderboard = ({ usersList }) => {

  return (
    <Box>
      <Typography variant="h3" className="title">
        Leaderboard
      </Typography>
      <Box maxWidth="sm" sx={{ margin: '0 auto' }}>
        <TableContainer component={Paper}>
          <Table aria-label="leaderboard">
            <TableHead>
              <TableRow>
                <TableCell align="right">User</TableCell>
                <TableCell align="right">Created</TableCell>
                <TableCell align="right">Answered</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { 
                usersList.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell align="right">
                      <AvatarInfo
                        avatar={user.avatarURL}
                        name={user.name}
                        id={user.id}
                      />
                    </TableCell>
                    <TableCell align="right">{user.questions.length}</TableCell>
                    <TableCell align="right">{Object.keys(user.answers).length}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

const mapStateToProps = ({ users, authedUser}) => {

  const countAskedAnswered = (x) => {
    const asked = x.questions.length;
    const answered = Object.keys(x.answers).length;
    return asked + answered;
  }

  return {
    usersList: Object.values(users).sort((a,b) => countAskedAnswered(b) - countAskedAnswered(a)),
  };
}

export default connect(mapStateToProps)(Leaderboard);