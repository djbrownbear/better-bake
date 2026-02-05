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
  
  const closeNav = () => setIsOpen(false);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeNav();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <nav 
      className={`w-full bg-gray-900 border-b border-gray-700 ${stickyClass === 'sticky-nav' ? 'fixed top-0 left-0 z-50' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex w-full max-w-7xl mx-auto justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-white no-underline hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
        >
          <img 
            className="h-9" 
            src="https://img.icons8.com/emoji/48/000000/ballot-box-with-ballot.png" 
            alt="" 
            aria-hidden="true"
          />
          <span className="font-['Lilita_One'] text-xl">Better Bake</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav aria-label="Primary">
            <ul className="flex items-center gap-6">
              <li>
                <NavLink 
                  to="dashboard" 
                  className={({ isActive }) => `
                    text-white font-medium transition-all px-3 py-2 rounded
                    focus:outline-none focus:ring-2 focus:ring-primary-400
                    ${isActive 
                      ? 'text-primary-400 font-semibold' 
                      : 'hover:text-primary-300'
                    }
                  `}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/add" 
                  className={({ isActive }) => `
                    text-white font-medium transition-all px-3 py-2 rounded
                    focus:outline-none focus:ring-2 focus:ring-primary-400
                    ${isActive 
                      ? 'text-primary-400 font-semibold' 
                      : 'hover:text-primary-300'
                    }
                  `}
                >
                  New Poll
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/leaderboard" 
                  className={({ isActive }) => `
                    text-white font-medium transition-all px-3 py-2 rounded
                    focus:outline-none focus:ring-2 focus:ring-primary-400
                    ${isActive 
                      ? 'text-primary-400 font-semibold' 
                      : 'hover:text-primary-300'
                    }
                  `}
                >
                  Leaderboard
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Desktop Right Side */}
          <div className="flex items-center gap-4 border-l border-gray-700 pl-6">
            {authedUser && user ? (
              <>
                <div className="flex items-center gap-2">
                  <img 
                    src={user.avatarURL} 
                    alt="" 
                    aria-hidden="true"
                    className="h-8 w-8 rounded-full object-cover border border-gray-600" 
                  />
                  <span className="text-white text-sm">{user.id}</span>
                </div>
                <button 
                  data-testid="logout-button" 
                  className="px-4 py-1.5 bg-primary text-white font-semibold text-sm rounded transition-all hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary-500 active:scale-95" 
                  type="button" 
                  onClick={handleClick}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://github.com/djbrownbear" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-white hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-secondary rounded"
                    aria-label="Visit GitHub profile"
                  >
                    <FontAwesomeIcon icon={faGithub} size="lg" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/aarontimothybrown/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-white hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-secondary rounded"
                    aria-label="Visit LinkedIn profile"
                  >
                    <FontAwesomeIcon icon={faLinkedin} size="lg"/>
                  </a>
                  <a 
                    href="https://aaron.aaronandanita.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-white hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-secondary rounded"
                    aria-label="Visit portfolio website"
                  >
                    <FontAwesomeIcon icon={faFolder} size="lg" />
                  </a>
                </div>
                <NavLink 
                  to="/login" 
                  className="px-4 py-1.5 bg-primary text-white font-semibold text-sm rounded transition-all hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-secondary active:scale-95 no-underline"
                >
                  Sign In
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-white focus:outline-none focus:ring-2 focus:ring-secondary rounded" 
          type="button" 
          onClick={toggleNav}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <FontAwesomeIcon icon={isOpen ? faXmarkCircle : faBars} size="lg" /> 
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeNav}
            aria-hidden="true"
          />
          <div 
            id="mobile-menu"
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-gray-900 z-50 md:hidden overflow-y-auto shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <span className="text-white font-['Lilita_One'] text-lg">Menu</span>
              <button 
                className="p-2 text-white focus:outline-none focus:ring-2 focus:ring-secondary rounded" 
                type="button" 
                onClick={closeNav}
                aria-label="Close navigation menu"
              >
                <FontAwesomeIcon icon={faXmarkCircle} size="lg" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav aria-label="Mobile primary navigation" className="py-4">
              <ul className="space-y-1">
                <li>
                  <NavLink 
                    to="dashboard" 
                    onClick={closeNav}
                    className={({ isActive }) => `
                      block px-6 py-3 text-white font-medium transition-colors
                      ${isActive 
                        ? 'bg-gray-800 text-primary-400 border-l-4 border-primary-400' 
                        : 'hover:bg-gray-800'
                      }
                    `}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/add" 
                    onClick={closeNav}
                    className={({ isActive }) => `
                      block px-6 py-3 text-white font-medium transition-colors
                      ${isActive 
                        ? 'bg-gray-800 text-primary-400 border-l-4 border-primary-400' 
                        : 'hover:bg-gray-800'
                      }
                    `}
                  >
                    New Poll
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/leaderboard" 
                    onClick={closeNav}
                    className={({ isActive }) => `
                      block px-6 py-3 text-white font-medium transition-colors
                      ${isActive 
                        ? 'bg-gray-800 text-primary-400 border-l-4 border-primary-400' 
                        : 'hover:bg-gray-800'
                      }
                    `}
                  >
                    Leaderboard
                  </NavLink>
                </li>
              </ul>
            </nav>

            {/* Mobile User Section */}
            <div className="border-t border-gray-700 p-4">
              {authedUser && user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded">
                    <img 
                      src={user.avatarURL} 
                      alt="" 
                      aria-hidden="true"
                      className="h-10 w-10 rounded-full object-cover border-2 border-gray-600" 
                    />
                    <div className="flex-1">
                      <div className="text-white font-medium">{user.name}</div>
                      <div className="text-gray-400 text-sm">{user.id}</div>
                    </div>
                  </div>
                  <NavLink 
                    to="/auth" 
                    onClick={closeNav}
                    className="block w-full px-4 py-2 text-center bg-gray-800 text-white font-medium rounded hover:bg-gray-700 transition-colors"
                  >
                    Switch User
                  </NavLink>
                  <button 
                    data-testid="logout-button" 
                    className="w-full px-4 py-2 bg-primary text-white font-semibold rounded transition-all hover:bg-primary-hover active:scale-95" 
                    type="button" 
                    onClick={handleClick}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <NavLink 
                    to="/login" 
                    onClick={closeNav}
                    className="block w-full px-4 py-2 text-center bg-primary text-white font-semibold rounded transition-all hover:bg-primary-hover active:scale-95 no-underline"
                  >
                    Sign In
                  </NavLink>
                  <div className="flex justify-center gap-6 pt-2">
                    <a 
                      href="https://github.com/djbrownbear" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-white hover:text-secondary transition-colors"
                      aria-label="Visit GitHub profile"
                    >
                      <FontAwesomeIcon icon={faGithub} size="lg" />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/aarontimothybrown/" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-white hover:text-secondary transition-colors"
                      aria-label="Visit LinkedIn profile"
                    >
                      <FontAwesomeIcon icon={faLinkedin} size="lg"/>
                    </a>
                    <a 
                      href="https://aaron.aaronandanita.com" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-white hover:text-secondary transition-colors"
                      aria-label="Visit portfolio website"
                    >
                      <FontAwesomeIcon icon={faFolder} size="lg" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

export default Nav;