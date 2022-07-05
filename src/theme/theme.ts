import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/700.css'
import '@fontsource/plus-jakarta-sans/800.css'
import { createTheme, responsiveFontSizes, ThemeOptions } from '@mui/material'
import { deepmerge } from '@mui/utils'

const light: ThemeOptions = {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: '"IBM Plex Sans"'
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          borderRadius: 10
        }
      }
    }
  },
  typography: {
    fontFamily: '"IBM Plex Sans"',
    h1: {
      fontFamily: '"Plus Jakarta Sans"',
      fontWeight: 800
    },
    h2: {
      fontFamily: '"Plus Jakarta Sans"',
      fontWeight: 800
    },
    h3: {
      fontFamily: '"Plus Jakarta Sans"',
      fontWeight: 800
    },
    h4: {
      fontFamily: '"Plus Jakarta Sans"',
      fontWeight: 800
    },
    h5: {
      fontFamily: '"Plus Jakarta Sans"',
      fontWeight: 800
    },
    h6: {
      fontFamily: '"Plus Jakarta Sans"',
      fontWeight: 800
    },
    button: {
      textTransform: 'none',
      fontWeight: 700
    }
  },
  palette: {
    primary: {
      main: '#007FFF'
    }
  }
}

const dark: ThemeOptions = {
  palette: { mode: 'dark' }
}

export const theme = responsiveFontSizes(createTheme(light))

export const darkTheme = responsiveFontSizes(
  createTheme(deepmerge(light, dark))
)
