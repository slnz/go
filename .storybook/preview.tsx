import { Story } from '@storybook/react'
import { IonApp } from '@ionic/react'
import { setupIonicReact } from '@ionic/react'
import { MemoryRouter } from 'react-router'
import { ThemeProvider, CssBaseline } from '@mui/material'
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

export const decorators = [
  (Story: Story) => (
    <IonApp>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </ThemeProvider>
    </IonApp>
  )
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
  controls: { disabled: true },
  layout: 'fullscreen',
  viewport: {
    viewports: customViewports
  }
}
