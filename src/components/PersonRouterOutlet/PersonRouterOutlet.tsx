import { IonRouterOutlet } from '@ionic/react'
import { ReactElement } from 'react'
import { Route } from 'react-router'

import { PersonDetailPage } from '../../pages/PersonDetailPage'
import { PersonListPage } from '../../pages/PersonListPage'
import { ProcessDetailPage } from '../../pages/ProcessDetailPage'

export function PersonRouterOutlet(): ReactElement {
  return (
    <IonRouterOutlet>
      <Route exact path="/people" component={PersonListPage} />
      <Route path="/people/:personId" exact component={PersonDetailPage} />
      <Route
        path="/people/:personId/processes/:processId"
        exact
        component={ProcessDetailPage}
      />
    </IonRouterOutlet>
  )
}
