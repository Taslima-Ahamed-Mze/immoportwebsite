import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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

const DefaultTheme = createTheme({
    palette: {
        primary: {
          main: "#ffffff",
        },
        secondary: {
          main: "#202020",
        },
        error: {},
        warning: {},
        info: {},
        success: {}
    },
  });
  
  export default function PaletteRendering() {
    return(
      <ThemeProvider theme={DefaultTheme}>
          <Menu id="menu-appbar" color="secondary" open={false}></Menu>
      </ThemeProvider>
    ); 
  }