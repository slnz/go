import { IonRouterOutlet } from '@ionic/react'
import { ReactElement } from 'react'
import { Route } from 'react-router'

import { PersonDetailPage } from '../../pages/PersonDetailPage'
import { PersonListPage } from '../../pages/PersonListPage'

export function PersonRouterOutlet(): ReactElement {
  return (
    <IonRouterOutlet>
      <Route exact path="/people" component={PersonListPage} />
      <Route path="/people/:personId" component={PersonDetailPage} />
    </IonRouterOutlet>
  )
}
