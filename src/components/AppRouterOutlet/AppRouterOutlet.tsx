import { IonRouterOutlet } from '@ionic/react'
import { ReactElement } from 'react'
import { Redirect, Route, RouteProps } from 'react-router'

import { useAuth } from '../../lib/useAuth'
import { ForgotPasswordPage } from '../../pages/ForgotPasswordPage'
import { LoginPage } from '../../pages/LoginPage'
import { ProcessDetailPage } from '../../pages/ProcessDetailPage'
import { PersonRouterOutlet } from '../PersonRouterOutlet'

export function AppRouterOutlet(): ReactElement {
  return (
    <IonRouterOutlet>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/forgot-password" component={ForgotPasswordPage} />
      <PrivateRoute path="/people" component={PersonRouterOutlet} />
      <PrivateRoute
        path="/processes/:processId"
        component={ProcessDetailPage}
      />
      <Route exact path="/">
        <Redirect to="/people" />
      </Route>
    </IonRouterOutlet>
  )
}

function PrivateRoute(props: RouteProps): ReactElement {
  const { user } = useAuth()

  return user != null ? <Route {...props} /> : <Redirect to="/login" />
}
