import { IonApp, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SnackbarProvider } from 'notistack'
import { ReactElement, useMemo } from 'react'

import { AuthProvider } from '../../lib/useAuth'
import { darkTheme, theme } from '../../theme/theme'
import { Router } from '../Router'

import '@ionic/react/css/core.css'
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'
import '../../theme/variables.css'

setupIonicReact({
  mode: 'md'
})
const queryClient = new QueryClient()

export function App(): ReactElement {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const appTheme = useMemo(() => {
    return prefersDarkMode ? darkTheme : theme
  }, [prefersDarkMode])

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <SnackbarProvider>
          <IonApp>
            <IonReactRouter>
              <AuthProvider>
                <Router />
              </AuthProvider>
            </IonReactRouter>
          </IonApp>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
