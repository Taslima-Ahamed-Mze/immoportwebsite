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

const DefaultTheme = createTheme({
        palette: {
            primary: {
                main: "#000000",
                contrastText: "#ffffff",
            },
            secondary: {
                dark: "#515052",
                light: "#e8e9eb",
                main: "#bfc0c0",
            },
            background: {
                default: "#bfc0c0"
            }, 
            text: {
                primary: "#ffffff",
                secondary: "#f5f3f4",
            },
            action: {
                active: "#ffffff",
                hover: "#cbf3f0",
                selected : "#ffbf69",
                disabled: "#f28482",
                focus: "#4ecdc4",
            },
        },
    })

export default DefaultTheme
