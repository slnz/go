import { IonContent, IonHeader, IonPage } from '@ionic/react'
import { Box } from '@mui/material'
import { ReactElement, useState } from 'react'
import { useQuery } from 'react-query'

import { AddContactButton } from '../../../components/AddContactButton'
import { PeopleMenuBar } from '../../../components/PeopleMenuBar'
import { getProcessDefinitions } from '../../../lib/queries'

export function PersonListPage(): ReactElement {
  const [search, setSearch] = useState('')

  const { data: processDefinition } = useQuery(
    ['definitions', { type: 'process' }],
    getProcessDefinitions
  )

  if (processDefinition != null) {
    const result = processDefinition
    console.log(result)
  }

  return (
    <IonPage>
      <IonHeader>
        <PeopleMenuBar onChange={(value): void => setSearch(value)} />
      </IonHeader>
      <IonContent fullscreen>
        {search}
        {processDefinition != null &&
          Object.keys(processDefinition).map((key) => <div>{key}</div>)}
        <Box sx={{ right: 20, bottom: 20, position: 'fixed' }}>
          <AddContactButton />
        </Box>
      </IonContent>
    </IonPage>
  )
}
