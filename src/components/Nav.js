import { Link, useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logoutAuthedUser } from "../actions/authedUser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin,  } from "@fortawesome/free-brands-svg-icons";
import { faFolder, faXmarkCircle } from "@fortawesome/free-regular-svg-icons";


const Nav = ({ dispatch, authedUser, user }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [stickyClass, setStickyClass] = useState('');

  useEffect(() => {
    window.addEventListener('scroll', stickNavbar);
  
    return () => {
      window.removeEventListener('scroll', stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 10 ? setStickyClass('sticky-nav') : setStickyClass('');
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    const el = document.querySelector(".page-container");
    el.style.backgroundColor = "var(--bg-color-primary)";
    toggleNav();
    dispatch(logoutAuthedUser());
    navigate("/");
  }

  const toggleNav = () => setIsOpen(!isOpen); 

  return (
    <nav className={`nav ${stickyClass} ${isOpen ? 'responsive' : ''}`} id="myTopnav">
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
          <ul className={`desktop-menu-main ${isOpen ? '' : 'mm-hide'}`} onClick={(isOpen ? toggleNav : () => {})}>
            <li>
              <NavLink activeClassName="active" to="/"><span>Home</span></NavLink>
            </li>
            <li>
              <NavLink to="/add"><span>New Poll</span></NavLink>
            </li>
            <li>
              <NavLink to="/leaderboard"><span>Leaderboard</span></NavLink>
            </li>
            <li>
              <NavLink to="/auth"><span>Switch User</span></NavLink>
            </li>
          </ul>
          <button className="icon menu" type="button" onClick={toggleNav}>
            <i className="fa fa-bars fa-lg"></i>
          </button>
          {!authedUser &&
            <ul className={`desktop-menu-social ${isOpen ? '' : 'mm-hide'}`} onClick={(isOpen ? toggleNav : () => {})}>
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