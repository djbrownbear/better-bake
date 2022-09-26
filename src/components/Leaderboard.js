import { connect } from "react-redux";
import AvatarInfo from "./AvatarWrapper";

const Leaderboard = ({ usersList }) => {

  return (
    <div>
      <div className="title">
        <h1>Leaderboard</h1>
      </div>
      <div className="page-wrapper inner">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Created</th>
              <th>Answered</th>
            </tr>
          </thead>
          <tbody>
            { 
              usersList.map((user) => (
                <tr key={user.id}>
                  <td>
                    <AvatarInfo
                      avatar={user.avatarURL}
                      name={user.name}
                      id={user.id}
                    />
                  </td>
                  <td>{user.questions.length}</td>
                  <td>{Object.keys(user.answers).length}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
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