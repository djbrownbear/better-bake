import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAuthedUser } from "../actions/authedUser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin,  } from "@fortawesome/free-brands-svg-icons";
import { faFolder, faXmarkCircle } from "@fortawesome/free-regular-svg-icons";


const Nav = ({ dispatch, authedUser, user }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const el = document.querySelector(".page-container");
    el.style.backgroundColor = "var(--bg-color-primary)";
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
      <div className="site-menu-inner">
        <div className="logo-wrapper">
          <Link to="/">
            <img 
              className="app-logo" 
              src="https://img.icons8.com/emoji/48/000000/ballot-box-with-ballot.png" 
              alt="Voting Ballot Box" 
            />
            <span>Better Bake</span>
          </Link>
        </div>
        <div className="menu-content-wrapper">    
          <div className="top-bar">
          <button className="icon close" type="button" onClick={toggleNav}>
            <FontAwesomeIcon icon={faXmarkCircle} size="2x" />
          </button>
          </div>
          <ul className="desktop-menu-main">
            <li>
              <Link to="/add"><span>New Poll</span></Link>
            </li>
            <li>
              <Link to="/leaderboard"><span>Leaderboard</span></Link>
            </li>
            <li>
              <Link to="/auth"><span>Switch User</span></Link>
            </li>
          </ul>
          <button className="icon menu" type="button" onClick={toggleNav}>
            <i className="fa fa-bars fa-lg"></i>
          </button>
          {!authedUser &&
            <ul className="desktop-menu-social">
              <li>
                <a href="https://github.com/djbrownbear" target="_blank" rel="noreferrer" alt="link to github">
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/aarontimothybrown/" target="_blank" rel="noreferrer" alt="link to github">
                  <FontAwesomeIcon icon={faLinkedin} size="lg"/>
                </a>
              </li>
              <li>
                <a href="https://aaron.aaronandanita.com" target="_blank" rel="noreferrer" alt="link to portfolio">
                  <FontAwesomeIcon icon={faFolder} size="lg" />
                </a>
              </li>
            </ul>
          }  
          {authedUser &&
            <div className="avatar-wrapper nav-avatar">
                <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className="avatar" />
                <span>{user.id}</span>
                <button data-testid="logout-button" className="btn btn-logout" type="button" onClick={handleClick}>Logout</button>
            </div>
          }
        </div>
      </div>
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