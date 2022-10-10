import * as React from 'react';
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logoutAuthedUser } from "../actions/authedUser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin,  } from "@fortawesome/free-brands-svg-icons";
import { faFolder } from "@fortawesome/free-regular-svg-icons";
import AvatarInfo from "./AvatarWrapper"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';



const Nav = ({ dispatch, authedUser, user }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
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

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(logoutAuthedUser());
    navigate("/");
  }


  return (
    <AppBar className={`${stickyClass}`} position="static" id="myTopnav" sx={{ background: 'var(--bg-color-primary)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} >
              <Link to="/">
                <img 
                  className="app-logo" 
                  src="https://img.icons8.com/emoji/48/000000/ballot-box-with-ballot.png" 
                  alt="Voting Ballot Box" 
                />
              </Link>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Better Bake
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem key="dashboard" onClick={handleCloseNavMenu}>
                  <NavLink activeClassName="active" to="dashboard">
                    <Typography textAlign="center">Dashboard</Typography>
                  </NavLink>
                </MenuItem>
                <MenuItem key="newPoll" onClick={handleCloseNavMenu}>
                  <NavLink to="/add">
                    <Typography textAlign="center">New Poll</Typography>
                  </NavLink>
                </MenuItem>
                <MenuItem key="leaderboard" onClick={handleCloseNavMenu}>
                  <NavLink to="/leaderboard">
                    <Typography textAlign="center">Leaderboard</Typography>
                  </NavLink>
                </MenuItem>

                {!authedUser &&
                  <div>
                    <MenuItem key="github" onClick={handleCloseNavMenu}>
                      <a href="https://github.com/djbrownbear" target="_blank" rel="noreferrer" alt="link to github">
                        <FontAwesomeIcon icon={faGithub} size="lg" />
                      </a>
                    </MenuItem>
                    <MenuItem key="linkedIn" onClick={handleCloseNavMenu}>
                      <a href="https://www.linkedin.com/in/aarontimothybrown/" target="_blank" rel="noreferrer" alt="link to github">
                        <FontAwesomeIcon icon={faLinkedin} size="lg"/>
                      </a>
                    </MenuItem>
                    <MenuItem key="portfolio" onClick={handleCloseNavMenu}>
                      <a href="https://aaron.aaronandanita.com" target="_blank" rel="noreferrer" alt="link to portfolio">
                        <FontAwesomeIcon icon={faFolder} size="lg" />
                      </a>
                    </MenuItem>
                  </div>
                }  
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button key="dashboard" onClick={handleCloseNavMenu}>
                  <NavLink activeClassName="active" to="dashboard">
                    <Typography textAlign="center">Dashboard</Typography>
                  </NavLink>
                </Button>
                <Button key="newPoll" onClick={handleCloseNavMenu}>
                  <NavLink to="/add">
                    <Typography textAlign="center">New Poll</Typography>
                  </NavLink>
                </Button>
                <Button key="leaderboard" onClick={handleCloseNavMenu}>
                  <NavLink to="/leaderboard">
                    <Typography textAlign="center">Leaderboard</Typography>
                  </NavLink>
                </Button>

                {!authedUser &&
                  <Box>
                    <Button key="github" onClick={handleCloseNavMenu}>
                      <a href="https://github.com/djbrownbear" target="_blank" rel="noreferrer" alt="link to github">
                        <FontAwesomeIcon icon={faGithub} size="lg" />
                      </a>
                    </Button>
                    <Button key="linkedIn" onClick={handleCloseNavMenu}>
                      <a href="https://www.linkedin.com/in/aarontimothybrown/" target="_blank" rel="noreferrer" alt="link to github">
                        <FontAwesomeIcon icon={faLinkedin} size="lg"/>
                      </a>
                    </Button>
                    <Button key="portfolio" onClick={handleCloseNavMenu}>
                      <a href="https://aaron.aaronandanita.com" target="_blank" rel="noreferrer" alt="link to portfolio">
                        <FontAwesomeIcon icon={faFolder} size="lg" />
                      </a>
                    </Button>
                  </Box>
                }  
            </Box>
            
            <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
              <Link to="/">
                <img 
                  className="app-logo" 
                  src="https://img.icons8.com/emoji/48/000000/ballot-box-with-ballot.png" 
                  alt="Voting Ballot Box" 
                />
              </Link>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Better Bake
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              {user &&
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenUserMenu}
                  color="inherit"             
                >
                  <AvatarInfo 
                    avatar={user.avatarURL}
                    name={user.name}
                    id={user.id}
                    handleClick={handleClick}
                  />
                </IconButton>
              }
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}              
              >
                <MenuItem key="action" onClick={handleCloseUserMenu}>
                  {authedUser 
                    ? <NavLink to="/auth"><span>Switch User</span></NavLink>
                    : <NavLink to="/login"><span>Sign In</span></NavLink>
                  }
                </MenuItem> 
                <MenuItem>
                  <Typography
                    noWrap
                    component="a"
                    data-testid="logout-button" 
                    onClick={handleClick}
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
    </AppBar>
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