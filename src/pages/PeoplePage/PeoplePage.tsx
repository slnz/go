import { IonPage } from '@ionic/react'
import { ReactElement } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router'

import { PersonAddPage } from './PersonAddPage'
import { PersonDetailPage } from './PersonDetailPage'
import { PersonListPage } from './PersonListPage'

export function PeoplePage(): ReactElement {
  const match = useRouteMatch()
  return (
    <IonPage>
      <Switch>
        <Route exact path={match.path} component={PersonListPage} />
        <Route path={`${match.path}/add`} component={PersonAddPage} />
        <Route path={`${match.path}/:personId`} component={PersonDetailPage} />
      </Switch>
    </IonPage>
  )
}
