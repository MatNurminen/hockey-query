import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type {} from '@mui/x-data-grid/themeAugmentation';

declare module '@mui/material/styles' {
  interface Palette {
    extra: {
      adminMenuBG: string;
      menuBG: string;
      menuDividerBG: string;
      adminMenuText: string;
    };
    ocean: Palette['primary'];
  }
  interface PaletteOptions {
    extra?: {
      adminMenuBG: string;
      menuBG: string;
      menuDividerBG: string;
      adminMenuText: string;
    };
    ocean?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    ocean: true;
  }
}

const theme = createTheme({
  components: {
    MuiInputBase: {
      defaultProps: {
        disableInjectingGlobalStyles: true,
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(even)': {
            backgroundColor: '#eceef3',
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        row: {
          '&:nth-of-type(even)': {
            backgroundColor: '#eceef3',
          },
        },
      },
    },
  },
  palette: {
    extra: {
      adminMenuBG: '#042e41',
      menuBG: '#063950',
      menuDividerBG: '#043950',
      adminMenuText: '#ccdbe3',
    },
    secondary: {
      main: '#ca3136',
    },
    ocean: {
      main: '#093f56',
      light: '#0b4f6a',
      dark: '#062d3d',
      contrastText: '#fff',
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