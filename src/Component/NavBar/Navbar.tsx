import * as React from "react";
import { Link } from "react-router-dom";
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
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import RoomIcon from '@mui/icons-material/Room';
import PersonIcon from '@mui/icons-material/Person';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({

  categButton1: {
    textTransform: 'capitalize',
    color: 'black !important',
    fontFamily: 'HomemadeApple !important',
    fontSize: '25px !important',
    marginLeft: '50px !important',
    '&:hover': {
      backgroundColor: 'transparent !important',
      color: '#ff5959 !important',
    }
  },

  categButton2: {
    color: '#f13d3d !important',
    fontFamily: 'HomemadeApple !important',
    textTransform: 'lowercase',
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent !important',
      color: '#ff5959 !important',
    }
  }
})
const Navbar = () => {
  const classes = useStyles();
  const user = useContext(ClientContext)

  // Navbar and profile settings links
  const pages = ["Acheter", "Louer"];

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

  const navigate = useNavigate();

  const handleLogin = () => {

    navigate("/login")
  }
  const handleLogout = () => {
    user.logout()
    navigate("/");
  }
  const handleRegister = () => {
    navigate("/register");
  }
  const handleProfile = () => {
    navigate("/espaceclient")
  }
  const handleContact = () => {
    navigate("/contact")
  }

  return (
    <AppBar position="static" style={{ background: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/*NAVBAR - version mobile*/}

          <Link to={"/"}>
            <Avatar
              src="./Images/logo.png"
              alt="Logo Immopport"
              sx={{ width: 105, height: 105, padding: 2 }}
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
                display: { xs: "block", md: "none" }
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography className={classes.categButton2}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/*NAVBAR - version desktop*/}

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                className={classes.categButton1}
                key={page}
                onClick={handleCloseNavMenu}
              >
                <Typography className={classes.categButton1}>{page}</Typography>
              </Button>
            ))}
          </Box>

          <Box sx={{ marginX: 5 }}>
            <Button onClick={handleContact} sx={{ p: 0 }} className={classes.categButton2}>
              <RoomIcon className={classes.categButton2} />
              <Typography className={classes.categButton2}>nos agences</Typography>
            </Button>
          </Box>

          <Box sx={{ marginX: 5 }}>
            <Button onClick={handleOpenUserMenu} sx={{ p: 0 }} className={classes.categButton2}>
              <PersonIcon className={classes.categButton2} />
              <Typography className={classes.categButton2}>mon compte</Typography>
            </Button>
            <Menu
              sx={{
                mt: "35px",
                px: 3
              }}
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

              {/* {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  <NavLink to={setting.path} style={{ textDecoration: "none" }}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </NavLink>
                </MenuItem>
              ))} */}

              {!user.isLoggedIn &&
                <>
                  <MenuItem onClick={handleLogin}>
                    <Typography textAlign="center">Se connecter</Typography>
                  </MenuItem>

                  <MenuItem onClick={handleRegister}>
                    <Typography textAlign="center">Créer mon compte</Typography>
                  </MenuItem>
                </>
              }
              {user.isLoggedIn &&
                <>
                  <MenuItem onClick={handleProfile}>
                    <Typography textAlign="center">Mon profil</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Déconnexion</Typography>
                  </MenuItem>
                </>
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;