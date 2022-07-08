import { IonPage, IonRouterOutlet } from '@ionic/react'
import { ReactElement } from 'react'
import { Route } from 'react-router'

import { PersonDetailPage } from './PersonDetailPage'
import { PersonListPage } from './PersonListPage'

export function PeoplePage(): ReactElement {
  return (
    <IonPage>
      <IonRouterOutlet>
        <Route exact path="/people" component={PersonListPage} />
        <Route path="/people/:id" component={PersonDetailPage} />
      </IonRouterOutlet>
    </IonPage>
  )
}
