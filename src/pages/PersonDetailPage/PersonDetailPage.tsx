import { IonContent, IonHeader, IonPage } from '@ionic/react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { AppBar, Box, Button, Toolbar } from '@mui/material'
import { ReactElement } from 'react'
import { RouteComponentProps, useHistory } from 'react-router'

import { AddProcessButton } from '../../components/AddProcessButton'
import { PersonDetail } from '../../components/PersonDetail'

type PersonDetailPageProps = Pick<
  RouteComponentProps<{
    personId: string
  }>,
  'match'
>

export function PersonDetailPage({
  match
}: PersonDetailPageProps): ReactElement {
  const history = useHistory()

  return (
    <IonPage>
      <IonHeader>
        <AppBar position="static" color="inherit">
          <Toolbar>
            <Button
              sx={{ mr: 2 }}
              onClick={(): void => history.goBack()}
              startIcon={<ArrowBackIcon />}
              color="inherit"
            >
              Back
            </Button>

            <Box sx={{ flex: 1 }} />
            <AddProcessButton
              itemId={match.params.personId}
              itemType="contact"
              onSubmit={(content): void => {
                // so when you go back the add to process doesn't pop up again
                history.replace(`/people/${match.params.personId}`)
                history.push(
                  `/people/${match.params.personId}/processes/${content._id}`
                )
              }}
            />
          </Toolbar>
        </AppBar>
      </IonHeader>
      <IonContent>
        <PersonDetail id={match.params.personId} />
      </IonContent>
    </IonPage>
  )
}
