import { IonContent, IonHeader, IonPage } from '@ionic/react'
import { ReactElement } from 'react'

import { PeopleMenuBar } from '../../components/PeopleMenuBar'

export function PeoplePage(): ReactElement {
  return (
    <IonPage>
      <IonHeader>
        <PeopleMenuBar />
      </IonHeader>
      <IonContent fullscreen></IonContent>
    </IonPage>
  )
}
