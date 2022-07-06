import { IonRouterOutlet } from '@ionic/react'
import { ReactElement } from 'react'
import { Redirect, Route, RouteProps } from 'react-router'
import { useAuth } from '../../lib/useAuth'
import { ForgotPassword } from '../../pages/ForgotPassword'
import { Login } from '../../pages/Login'
import { Tabs } from '../Tabs'

export function Router(): ReactElement {
  return (
    <IonRouterOutlet>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/forgot-password">
        <ForgotPassword />
      </Route>
      <PrivateRoute path="/tabs">
        <Tabs />
      </PrivateRoute>
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
