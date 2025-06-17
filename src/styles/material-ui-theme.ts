import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2b282b',
    },
    secondary: {
      main: '#dc004e',
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif'
  },
});

export default theme;