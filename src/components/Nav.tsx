import { Link, useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { logoutAuthedUser } from "../actions/authedUser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faFolder, faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../reducers";

const mapStateToProps = ({ authedUser, users }: RootState) => {
  const user = users[authedUser || ''];

  return {
    authedUser,
    user,
  };
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Nav: React.FC<PropsFromRedux> = ({ dispatch, authedUser, user }) => {
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
      windowHeight > 50 ? setStickyClass('sticky-nav') : setStickyClass('');
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleNav();
    dispatch(logoutAuthedUser());
    navigate("/");
  }

  const toggleNav = () => setIsOpen(!isOpen); 

  return (
    <nav className={`nav ${stickyClass} ${isOpen ? 'responsive' : ''}`} id="myTopnav">
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
          <ul className={`menu-main ${isOpen ? '' : 'mm-hide'}`} onClick={(isOpen ? toggleNav : () => {})}>
            <li>
              <NavLink to="dashboard"><span>Dashboard</span></NavLink>
            </li>
            <li>
              <NavLink to="/add"><span>New Poll</span></NavLink>
            </li>
            <li>
              <NavLink to="/leaderboard"><span>Leaderboard</span></NavLink>
            </li>
          </ul>
          <button className="icon menu" type="button" onClick={toggleNav}>
              <FontAwesomeIcon icon={faBars} size="lg" /> 
          </button>
          {!authedUser &&
            <ul className={`menu-social ${isOpen ? '' : 'mm-hide'}`} onClick={(isOpen ? toggleNav : () => {})}>
              <li>
                <a href="https://github.com/djbrownbear" target="_blank" rel="noreferrer" title="link to github">
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/aarontimothybrown/" target="_blank" rel="noreferrer" title="link to linkedin">
                  <FontAwesomeIcon icon={faLinkedin} size="lg"/>
                </a>
              </li>
              <li>
                <a href="https://aaron.aaronandanita.com" target="_blank" rel="noreferrer" title="link to portfolio">
                  <FontAwesomeIcon icon={faFolder} size="lg" />
                </a>
              </li>
            </ul>
          }  
          <ul className={`menu-cta center-v ${isOpen ? '' : 'mm-hide'}`} onClick={(isOpen ? toggleNav : () => {})}>
            <li>
              {authedUser 
                ? <NavLink to="/auth"><span>Switch User</span></NavLink>
                : <NavLink to="/login"><span>Sign In</span></NavLink>
              }
           </li> 
          </ul>
          {user &&
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

export default connector(Nav);