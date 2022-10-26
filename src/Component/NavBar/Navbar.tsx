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
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { makeStyles } from "@mui/material";

// Add specific styles to items
const Navbar = () => {
  const user = useContext(ClientContext)

  // Navbar and profile settings links
  const pages = ["Acheter", "Vendre", "Louer"];
  // const settings = [
  //   {
  //     name: "Connexion",
  //     path: "/auth",
  //   },
  //   {
  //     name: "Nouveau ? (Créer un compte)",
  //     path: "/register",
  //   },
  // ];

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

  // function stringAvatar(name: string) {
  //   return {
  //     children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  //   };
  // }

  const navigate = useNavigate();

  const handleLogin = () => {

    navigate("/authentification")
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
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/*NAVBAR - version desktop*/}

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Typography color="#f13d3d" letterSpacing={3} marginX={10} fontFamily="Lato" fontSize={20}>{page}</Typography>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} color="error">
              {
                user.isLoggedIn ?
                  <Avatar alt={user.firstname} src="/static/images/avatar/2.jpg" />
                  :
                  <Avatar src="/static/images/avatar/2.jpg" />
              }
            </IconButton>
            <Menu
              sx={{
                mt: "45px",
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
                  <Typography textAlign="center">
                    {user.lastname != undefined &&
                      <span>Hello {user.firstname} {user.lastname} !</span>
                    }
                  </Typography>
                  <MenuItem onClick={handleProfile}>
                    <Typography textAlign="center">Mon profil</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign="center">Mes favoris</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign="center">Mes documents</Typography>
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