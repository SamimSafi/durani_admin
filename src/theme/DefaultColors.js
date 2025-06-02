import { createTheme } from '@mui/material/styles';
import typography from './Typography';
import { shadows } from './Shadows';

const baselightTheme = createTheme({
  direction: 'ltr',
  palette: {
    primary: {
      main: '#5D87FF',
      light: '#ECF2FF',
      dark: '#4570EA',
      contrastText: '#ffffff',
      transparent: '#ffffff00',
    },
    secondary: {
      main: '#49BEFF',
      light: '#E8F7FF',
      dark: '#23afdb',
      contrastText: '#ffffff',
    },
    success: {
      main: '#13DEB9',
      light: '#E6FFFA',
      dark: '#02b3a9',
      contrastText: '#ffffff',
    },
    info: {
      main: '#539BFF',
      light: '#EBF3FE',
      dark: '#1682d4',
      contrastText: '#ffffff',
    },
    error: {
      main: '#FA896B',
      light: '#FDEDE8',
      dark: '#f3704d',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#FFAE1F',
      light: '#FEF5E5',
      dark: '#ae8e59',
      contrastText: '#ffffff',
    },
    purple: {
      A50: '#EBF3FE',
      A100: '#6610f2',
      A200: '#557fb9',
    },
    grey: {
      100: '#F2F6FA',
      200: '#EAEFF4',
      300: '#DFE5EF',
      400: '#7C8FAC',
      500: '#5A6A85',
      600: '#2A3547',
      700: '#dfe5ef',
    },
    text: {
      primary: '#2A3547',
      secondary: '#5A6A85',
    },
    action: {
      disabledBackground: 'rgba(73,82,88,0.12)',
      hoverOpacity: 0.02,
      hover: '#f6f9fc',
    },
    divider: '#e5eaef',
  },
  typography,
  shadows,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: 'none',
        },
        '.simplebar-scrollbar:before': {
          background: '#DFE5EF !important',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '7px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 9px 17.5px rgb(0,0,0,0.05)',
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e5eaef !important',
          },
          borderRadius: '7px',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#5D87FF !important',
          },
        },
      },
    },
  },
});

const baseDarkTheme = createTheme({
  direction: 'ltr',
  palette: {
    mode: 'dark',
    primary: {
      main: '#5D87FF',
      light: '#829CFF',
      dark: '#3A5ECC',
      contrastText: '#ffffff',
      transparent: '#ffffff00',
    },
    secondary: {
      main: '#49BEFF',
      light: '#7ACBFF',
      dark: '#1A9BDB',
      contrastText: '#ffffff',
    },
    success: {
      main: '#13DEB9',
      light: '#4BE7CC',
      dark: '#0BA389',
      contrastText: '#ffffff',
    },
    info: {
      main: '#539BFF',
      light: '#80B1FF',
      dark: '#2B7AD4',
      contrastText: '#ffffff',
    },
    error: {
      main: '#FA896B',
      light: '#FCA998',
      dark: '#D9664A',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#FFAE1F',
      light: '#FFBE4D',
      dark: '#D98A00',
      contrastText: '#ffffff',
    },
    purple: {
      A50: '#3A4A6E',
      A100: '#7B61FF',
      A200: '#3A5ECC',
    },
    grey: {
      100: '#2A3547',
      200: '#3B4A5F',
      300: '#5A6A85',
      400: '#7C8FAC',
      500: '#A0B0C8',
      600: '#D0D7E0',
      700: '#E5EAEF',
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#A0B0C8',
    },
    action: {
      disabledBackground: 'rgba(255,255,255,0.12)',
      hoverOpacity: 0.08,
      hover: '#2A3547',
    },
    divider: '#5A6A85',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
  typography,
  shadows,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: 'none',
        },
        '.simplebar-scrollbar:before': {
          background: '#5A6A85 !important',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '7px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 9px 17.5px rgba(255,255,255,0.05)',
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#5A6A85 !important',
          },
          borderRadius: '7px',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#5D87FF !important',
          },
        },
      },
    },
  },
});

export { baselightTheme, baseDarkTheme };