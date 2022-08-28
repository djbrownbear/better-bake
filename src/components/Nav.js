import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAuthedUser } from "../actions/authedUser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Nav = ({ dispatch, authedUser, user }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    dispatch(logoutAuthedUser());
    navigate("/");
  }

  function toggleNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "nav") {
      x.className += " responsive";
    } else {
      x.className = "nav";
    }
  }

  return (
    <nav className="nav" id="myTopnav">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <ul className="desktop-menu-main">
        <li>
          <Link to="/"><img className="app-logo" src="https://img.icons8.com/emoji/48/000000/ballot-box-with-ballot.png" alt="Voting Ballot Box" /></Link>
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
        <button className="icon" type="button" onClick={toggleNav}><i className="fa fa-bars"></i></button>
      </ul>
      {!authedUser &&
        <ul className="desktop-menu-login">
          {/* TODO - ADD FONT AWESOME ICONS, FIX FORMATTING */}
          <li><a href="https://github.com/djbrownbear" target="_blank" rel="noreferrer" alt="link to github">LinkedIn</a></li>
          <li><a href="https://www.linkedin.com/in/aarontimothybrown/" target="_blank" rel="noreferrer" alt="link to github">GitHub</a></li>
          <li><a href="https://aaron.aaronandanita.com" target="_blank" rel="noreferrer" alt="link to portfolio">Portfolio</a></li>
        </ul>
      }
      {authedUser &&
        <div className="avatar-wrapper nav-avatar">
          <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className="avatar" />
          <span>{user.id}</span>
          <button data-testid="logout-button" className="btn btn-logout" type="button" onClick={handleClick}>Logout</button>
        </div>
      }
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