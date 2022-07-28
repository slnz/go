import { IonContent, IonHeader, IonPage } from '@ionic/react'
import { ReactElement, useState } from 'react'

import { PeopleMenuBar } from '../../components/PeopleMenuBar'
import { PersonList } from '../../components/PersonList'

export function PersonListPage(): ReactElement {
  const [search, setSearch] = useState('')

  return (
    <IonPage>
      <IonHeader>
        <PeopleMenuBar onChange={setSearch} />
      </IonHeader>
      <IonContent>
        <PersonList search={search} />
      </IonContent>
    </IonPage>
  )
}
