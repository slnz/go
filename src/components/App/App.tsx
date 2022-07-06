import { IonApp, setupIonicReact } from '@ionic/react'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'
import { IonReactRouter } from '@ionic/react-router'

/* Theme variables */
import '../../theme/variables.css'
import { ReactElement, useMemo } from 'react'

import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from '../../lib/useAuth'
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material'
import { darkTheme, theme } from '../../theme/theme'
import { Router } from '../Router'

setupIonicReact()
const queryClient = new QueryClient()

export function App(): ReactElement {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const appTheme = useMemo(() => {
    return prefersDarkMode ? darkTheme : theme
  }, [prefersDarkMode])

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <IonApp>
          <IonReactRouter>
            <AuthProvider>
              <Router />
            </AuthProvider>
          </IonReactRouter>
        </IonApp>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
