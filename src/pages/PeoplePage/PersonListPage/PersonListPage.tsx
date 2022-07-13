import { IonContent, IonHeader, IonPage } from '@ionic/react'
import { ReactElement, useState } from 'react'
import { useQuery } from 'react-query'

import { PeopleMenuBar } from '../../../components/PeopleMenuBar'
import { getProcessDefinitions } from '../../../lib/queries'

export function PersonListPage(): ReactElement {
  const [search, setSearch] = useState('')

  const { data: processDefinition } = useQuery(
    ['processDefinition'],
    getProcessDefinitions
  )

  return (
    <IonPage>
      <IonHeader>
        <PeopleMenuBar onChange={(value): void => setSearch(value)} />
      </IonHeader>
      <IonContent fullscreen>
        {search}
        {processDefinition != null &&
          Object.keys(processDefinition).map((key) => <div>{key}</div>)}
      </IonContent>
    </IonPage>
  )
}
