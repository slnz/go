import { IonContent, IonHeader, IonPage } from '@ionic/react'
import { ReactElement, useState } from 'react'

import { PeopleMenuBar } from '../../components/PeopleMenuBar'

export function PeoplePage(): ReactElement {
  const [search, setSearch] = useState('')
  return (
    <IonPage>
      <IonHeader>
        <PeopleMenuBar onChange={(value): void => setSearch(value)} />
      </IonHeader>
      <IonContent fullscreen>{search}</IonContent>
    </IonPage>
  )
}
