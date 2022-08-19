import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAuthedUser } from "../actions/authedUser";

const Nav = ({ dispatch, authedUser, user }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    dispatch(logoutAuthedUser());
    navigate("/");
  }


  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add">New Poll</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        <li>
          <Link to="/auth">Switch User</Link>
        </li>
        <div className="avatar-wrapper nav-avatar">
          <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className="avatar" />
          <span>{user.id}</span>
          <button data-testid="logout-button" className="btn btn-logout" type="button" onClick={handleClick}>Logout</button>
        </div>
      </ul>
    </nav>
  );
}

const mapStateToProps = ({ authedUser, users }) => {
  const user = users[authedUser];

  return {
    authedUser,
    user,
  };
}

export default connect(mapStateToProps)(Nav);