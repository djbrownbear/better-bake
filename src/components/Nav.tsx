import { Link, useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import React from 'react';
import { logoutAuthedUser } from "../reducers/authedUser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faFolder, faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector, useAppDispatch } from "../store/hooks";

const Nav: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authedUser = useAppSelector(state => state.authedUser);
  const user = useAppSelector(state => state.users[authedUser || '']);
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
    <nav className={`w-full bg-gray-900 border-b border-gray-700 flex justify-center items-center py-2 px-4 ${stickyClass === 'sticky-nav' ? 'fixed top-0 left-0 z-50' : ''} ${isOpen ? 'responsive' : ''}`} id="myTopnav">
      <div className="flex w-full max-w-7xl justify-between items-center">
        <div className="ml-2 w-fit">
          <Link to="/" className="flex items-center text-white no-underline hover:no-underline">
            <img 
              className="h-9 px-1" 
              src="https://img.icons8.com/emoji/48/000000/ballot-box-with-ballot.png" 
              alt="Voting Ballot Box" 
            />
            <span className="block w-32 font-['Lilita_One'] text-xl font-normal">Better Bake</span>
          </Link>
        </div>
        <div className={`flex justify-between ${isOpen ? 'fixed right-0 top-0 w-full h-full bg-gray-900 flex-col overflow-y-auto transition-all duration-300 z-[500]' : 'flex-auto mr-auto'}`}>    
          <div className={`${isOpen ? 'block' : 'hidden'}`}>
            <button className="float-left ml-2.5 mt-2.5 bg-transparent border-none text-white" type="button" onClick={toggleNav}>
              <FontAwesomeIcon icon={faXmarkCircle} size="2x" />
            </button>
          </div>
          <ul className={`flex flex-row justify-start items-center p-1.5 mx-auto ${isOpen ? 'flex-col items-start w-full' : ''}`} onClick={(isOpen ? toggleNav : () => {})}>
            <li className={`list-none px-2.5 ${isOpen ? 'border-b border-white m-0 w-full py-2.5' : 'py-0'}`}>
              <NavLink to="dashboard" className={({ isActive }) => `pb-2 text-white no-underline transition-all duration-400 ${isActive ? 'font-semibold border-b-2 border-secondary' : 'hover:underline hover:text-secondary hover:font-semibold'}`}><span>Dashboard</span></NavLink>
            </li>
            <li className={`list-none px-2.5 ${isOpen ? 'border-b border-white m-0 w-full py-2.5' : 'py-0'}`}>
              <NavLink to="/add" className={({ isActive }) => `pb-2 text-white no-underline transition-all duration-400 ${isActive ? 'font-semibold border-b-2 border-secondary' : 'hover:underline hover:text-secondary hover:font-semibold'}`}><span>New Poll</span></NavLink>
            </li>
            <li className={`list-none px-2.5 ${isOpen ? 'border-b border-white m-0 w-full py-2.5' : 'py-0'}`}>
              <NavLink to="/leaderboard" className={({ isActive }) => `pb-2 text-white no-underline transition-all duration-400 ${isActive ? 'font-semibold border-b-2 border-secondary' : 'hover:underline hover:text-secondary hover:font-semibold'}`}><span>Leaderboard</span></NavLink>
            </li>
          </ul>
          <button className={`float-right ml-auto bg-transparent border-none text-white pr-2.5 ${isOpen ? 'hidden' : 'md:hidden'}`} type="button" onClick={toggleNav}>
              <FontAwesomeIcon icon={faBars} size="lg" /> 
          </button>
          {!authedUser &&
            <ul className={`flex flex-row justify-start items-center ${isOpen ? 'flex-col items-start text-left m-0 pl-0 block' : 'ml-auto justify-end'}`} onClick={(isOpen ? toggleNav : () => {})}>
              <li className={`list-none p-2.5 ${isOpen ? 'pt-0' : ''}`}>
                <a href="https://github.com/djbrownbear" target="_blank" rel="noreferrer" title="link to github" className="text-white hover:text-gray-300">
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </a>
              </li>
              <li className="list-none p-2.5">
                <a href="https://www.linkedin.com/in/aarontimothybrown/" target="_blank" rel="noreferrer" title="link to linkedin" className="text-white hover:text-gray-300">
                  <FontAwesomeIcon icon={faLinkedin} size="lg"/>
                </a>
              </li>
              <li className="list-none p-2.5">
                <a href="https://aaron.aaronandanita.com" target="_blank" rel="noreferrer" title="link to portfolio" className="text-white hover:text-gray-300">
                  <FontAwesomeIcon icon={faFolder} size="lg" />
                </a>
              </li>
            </ul>
          }  
          <ul className={`flex flex-col justify-center items-center ${isOpen ? '' : 'hidden md:flex'}`} onClick={(isOpen ? toggleNav : () => {})}>
            <li className="list-none p-2.5">
              {authedUser 
                ? <NavLink to="/auth" className={({ isActive }) => `pb-2 text-white no-underline transition-all duration-400 ${isActive ? 'font-semibold border-b-2 border-secondary' : 'hover:underline hover:text-secondary hover:font-semibold'}`}><span>Switch User</span></NavLink>
                : <NavLink to="/login" className={({ isActive }) => `pb-2 text-white no-underline transition-all duration-400 ${isActive ? 'font-semibold border-b-2 border-secondary' : 'hover:underline hover:text-secondary hover:font-semibold'}`}><span>Sign In</span></NavLink>
              }
           </li> 
          </ul>
          {user &&
            <div className={`text-white flex-row justify-evenly px-2.5 ${isOpen ? 'inline-flex self-start py-0.5 ml-0' : 'flex'}`}>
                <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className="h-9" />
                <span className="px-1.5 text-left">{user.id}</span>
                <button data-testid="logout-button" className="mt-0 py-2.5 px-1.5 bg-secondary text-gray-900 uppercase border-none transition-all duration-700 rounded hover:bg-amber-200" type="button" onClick={handleClick}>Logout</button>
            </div>
          }
        </div>
      </div>
    </nav>
  );
}

export default Nav;