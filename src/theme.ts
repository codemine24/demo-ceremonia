'use client';
import { createTheme } from '@mui/material/styles';
import { Playfair_Display, Lato } from 'next/font/google';

const playfair = Playfair_Display({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: lato.style.fontFamily,
    h1: {
      fontFamily: playfair.style.fontFamily,
      fontWeight: 700,
    },
    h2: {
      fontFamily: playfair.style.fontFamily,
      fontWeight: 700,
    },
    h3: {
      fontFamily: playfair.style.fontFamily,
      fontWeight: 700,
    },
    h4: {
      fontFamily: playfair.style.fontFamily,
      fontWeight: 700,
    },
    h5: {
      fontFamily: playfair.style.fontFamily,
      fontWeight: 700,
    },
    h6: {
      fontFamily: playfair.style.fontFamily,
      fontWeight: 700,
    },
  },
  palette: {
    primary: {
      main: '#4A5D5E', // Deep teal/sage
      light: '#768A8B',
      dark: '#233435',
      contrastText: '#fff',
    },
    secondary: {
      main: '#Cca43b', // Muted Gold
      contrastText: '#fff',
    },
    background: {
      default: '#Fcfcfc',
      paper: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '20px',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;
