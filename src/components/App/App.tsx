import { Redirect, Route } from 'react-router-dom'
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { ellipse, square, triangle } from 'ionicons/icons'
import { Dashboard } from '../../pages/Dashboard'
import { FaithSteps } from '../../pages/FaithSteps'
import { MinistryChain } from '../../pages/MinistryChain'
import { Profile } from '../../pages/Profile'
import { Login } from '../../pages/Login'

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

/* Theme variables */
import '../../theme/variables.css'
import { ReactElement } from 'react'

import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider, AuthConsumer } from '../../lib/auth'

setupIonicReact()
const queryClient = new QueryClient()

export function App(): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <IonApp>
          <IonReactRouter>
            <AuthConsumer>
              {(context) =>
                context?.user != null ? (
                  <IonTabs>
                    <IonRouterOutlet>
                      <Route exact path="/dashboard" component={Dashboard} />
                      <Route exact path="/faith-steps" component={FaithSteps} />
                      <Route
                        exact
                        path="/ministry-chain"
                        component={MinistryChain}
                      />
                      <Route exact path="/profile" component={Profile} />
                      <Route exact path="/">
                        <Redirect to="/dashboard" />
                      </Route>
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                      <IonTabButton tab="dashboard" href="/dashboard">
                        <IonIcon icon={triangle} />
                        <IonLabel>Dashboard</IonLabel>
                      </IonTabButton>
                      <IonTabButton tab="faith-steps" href="/faith-steps">
                        <IonIcon icon={ellipse} />
                        <IonLabel>Faith Steps</IonLabel>
                      </IonTabButton>
                      <IonTabButton tab="ministry-chain" href="/ministry-chain">
                        <IonIcon icon={square} />
                        <IonLabel>Ministry Chain</IonLabel>
                      </IonTabButton>
                      <IonTabButton tab="profile" href="/profile">
                        <IonIcon icon={square} />
                        <IonLabel>Profile</IonLabel>
                      </IonTabButton>
                    </IonTabBar>
                  </IonTabs>
                ) : (
                  <IonRouterOutlet>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/">
                      <Redirect to="/login" />
                    </Route>
                  </IonRouterOutlet>
                )
              }
            </AuthConsumer>
          </IonReactRouter>
        </IonApp>
      </AuthProvider>
    </QueryClientProvider>
  )
}
