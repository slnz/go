import { IonPage, IonRouterOutlet } from '@ionic/react'
import { ReactElement } from 'react'
import { Route } from 'react-router'

import { PersonAddPage } from './PersonAddPage'
import { PersonDetailPage } from './PersonDetailPage'
import { PersonListPage } from './PersonListPage'

export function PeoplePage(): ReactElement {
  return (
    <IonPage>
      <IonRouterOutlet>
        <Route exact path="/people" component={PersonListPage} />
        <Route exact path="/people/add" component={PersonAddPage} />
        <Route path="/people/:id" component={PersonDetailPage} />
      </IonRouterOutlet>
    </IonPage>
  )
}
