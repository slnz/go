import { IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { ReactElement } from 'react'
import { Redirect, Route, RouteProps } from 'react-router'
import { useAuth } from '../../lib/auth'
import { ForgotPassword } from '../../pages/ForgotPassword'
import { Login } from '../../pages/Login'
import { Tabs } from '../Tabs'

export function Router(): ReactElement {
  return (
    <IonReactRouter>
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
    </IonReactRouter>
  )
}

function PrivateRoute({ children, ...rest }: RouteProps): ReactElement {
  const { user } = useAuth()

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return user != null ? (
          <>{children}</>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }}
    />
  )
}
