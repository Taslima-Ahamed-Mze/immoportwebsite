<<<<<<< HEAD
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import ClientContext from '../../Contexts/ClientContext';
=======
import * as React from "react";
import { NavLink, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ClientContext from "../../Contexts/ClientContext";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

>>>>>>> BD

// Add specific styles to items
const Navbar = () => {
<<<<<<< HEAD

    const clientContext = React.useContext(ClientContext)

    const pages = ['Acheter', 'Vendre', 'Louer', 'Bureaux & Commerces'];
    const settings = [{
        name: 'Connexion',
        path: '/auth',
    },
    {
        name: 'Nouveau ? (Créer un compte)',
        path: '/register',
    }];
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
=======
  const clientContext = React.useContext(ClientContext);
>>>>>>> BD

  // Navbar and profile settings links
  const pages = ["Acheter", "Vendre", "Louer", "Bureaux & Commerces"];
  const settings = [
    {
      name: "Connexion",
      path: "/auth",
    },
    {
      name: "Nouveau ? (Créer un compte)",
      path: "/register",
    },
  ];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* {!clientContext.isLoggedIn && <button className="login" onClick={loginHandler}>Login</button>}
                    {clientContext.isLoggedIn && (<button className="login" onClick={logoutHandler}>Logout</button>)} */}

<<<<<<< HEAD
                    {/* {!clientContext.isLoggedIn && <button className="login" onClick={loginHandler}>Login</button>}
                    {clientContext.isLoggedIn && (<button className="login" onClick={logoutHandler}>Logout</button>)} */}

                    {/*NAVBAR - version responsive*/}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                    </Typography>
=======
          {/*NAVBAR - version responsive*/}
>>>>>>> BD

          <Link to={"/auth"}>
            <Avatar
              src="./Images/logo_immopport.png"
              alt="Logo ImmOpport"
              sx={{ borderRadius: 2, width: 80, height: 60 }}
            />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/*NAVBAR - version classique*/}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography>

<<<<<<< HEAD
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <MenuItem onClick={handleOpenUserMenu} sx={{ p: 0 }}>

                            </MenuItem>
                        </Tooltip>
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
                            {settings.map((setting) => (
                                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                                    <NavLink to={setting.path} style={{ textDecoration: 'none' }}>
                                        <Typography>{setting.name}</Typography>
                                    </NavLink>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
=======
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  <NavLink to={setting.path} style={{ textDecoration: "none" }}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
>>>>>>> BD
};

export default Navbar;