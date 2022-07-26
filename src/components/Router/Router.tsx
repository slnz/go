import { IonRouterOutlet } from '@ionic/react'
import { ReactElement } from 'react'
import { Redirect, Route, RouteProps } from 'react-router'

import { useAuth } from '../../lib/useAuth'
import { ForgotPasswordPage } from '../../pages/ForgotPasswordPage'
import { LoginPage } from '../../pages/LoginPage'
import { ProcessDetailPage } from '../../pages/ProcessDetailPage'
import { Tabs } from '../Tabs'

export function Router(): ReactElement {
  return (
    <IonRouterOutlet>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/forgot-password">
        <ForgotPasswordPage />
      </Route>
      <PrivateRoute path="/tabs">
        <Tabs />
      </PrivateRoute>
      <PrivateRoute
        path="/processes/:processId"
        component={ProcessDetailPage}
      />
      <Route exact path="/">
        <Redirect to="/tabs" />
      </Route>
    </IonRouterOutlet>
  )
}

function PrivateRoute(props: RouteProps): ReactElement {
  const { user } = useAuth()

  return user != null ? <Route {...props} /> : <Redirect to="/login" />
}
