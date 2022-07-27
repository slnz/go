import { IonApp, setupIonicReact } from '@ionic/react'
import { ThemeProvider, CssBaseline, Box } from '@mui/material'
import { Story } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { initialize as mswInitialize, mswDecorator } from 'msw-storybook-addon'
import { SnackbarProvider } from 'notistack'
import React, { ReactElement, useEffect } from 'react'
import { MemoryRouter } from 'react-router'

import { client } from '../src/lib/fluro'
import { theme } from '../src/theme/theme'

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

setupIonicReact({
  mode: 'md'
})

mswInitialize({ onUnhandledRequest: 'bypass' })

const mockedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

export const decorators = [
  mswDecorator,
  (Story: Story): ReactElement => {
    useEffect(() => {
      return () => client.cache.reset()
    }, [])

    return (
      <QueryClientProvider client={mockedQueryClient}>
        <IonApp>
          <ThemeProvider theme={theme}>
            <SnackbarProvider>
              <Box sx={{ height: '100%', overflow: 'auto' }}>
                <CssBaseline />
                <MemoryRouter>
                  <Story />
                </MemoryRouter>
              </Box>
            </SnackbarProvider>
          </ThemeProvider>
        </IonApp>
      </QueryClientProvider>
    )
  }
]

const customViewports = {
  mobileMin: {
    name: 'Small Mobile',
    styles: {
      width: '360px',
      height: '640px'
    },
    type: 'mobile'
  },
  mobileMax: {
    name: 'Large Mobile',
    styles: {
      width: '540px',
      height: '960px'
    },
    type: 'mobile'
  },
  tablet: {
    name: 'Tablet',
    styles: {
      width: '768px',
      height: '1024px'
    },
    type: 'tablet'
  }
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    disable: true,
    grid: {
      disable: true
    }
  },
  chromatic: { viewports: [360] },
  controls: { disable: true },
  layout: 'fullscreen',
  viewport: {
    viewports: customViewports
  }
}
