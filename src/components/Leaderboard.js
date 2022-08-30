import { connect } from "react-redux";

const Leaderboard = ({ usersList }) => {
  const defaultAvatar = "https://img.icons8.com/external-others-inmotus-design/67/000000/external-Avatar-round-icons-others-inmotus-design-5.png";

  return (
    <div className="page-wrapper inner">
      <h1>Leaderboard</h1>
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
                  <div className="avatar-wrapper leaderboard">
                    <img 
                      src={user.avatarURL ? user.avatarURL : defaultAvatar }
                      alt={`Avatar of ${user.name}`} 
                    />
                    <div>
                      <span>{user.name}</span>
                      <span className="small-caps">{user.id}</span>
                    </div>
                  </div>
                </td>
                <td>{user.questions.length}</td>
                <td>{Object.keys(user.answers).length}</td>
              </tr>
            ))}
        </tbody>
      </table>
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