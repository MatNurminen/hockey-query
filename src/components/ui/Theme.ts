import { createTheme, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    extra: {
      adminMenuBG: string;
      menuBG: string;
    };
  }
  interface PaletteOptions {
    extra?: {
      adminMenuBG: string;
      menuBG: string;
    };
  }
}

const theme = createTheme({
  components: {
    MuiInputBase: {
      defaultProps: {
        disableInjectingGlobalStyles: true,
      },
    },
  },
  palette: {
    extra: {
      adminMenuBG: '#042e41',
      menuBG: '#063950',
    },
    secondary: {
      main: '#ca3136',
    },
  },
  typography: {
    fontFamily: '"Exo", sans-serif',
    button: {
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 0,
  },
});

export default responsiveFontSizes(theme);
