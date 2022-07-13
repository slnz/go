import { IonContent, IonHeader, IonPage } from '@ionic/react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { AppBar, Button, Toolbar } from '@mui/material'
import { ReactElement } from 'react'
import { RouteComponentProps, useHistory } from 'react-router'

import { PersonDetail } from '../../../components/PersonDetail'

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
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Button
              sx={{ mr: 2 }}
              onClick={(): void => history.goBack()}
              startIcon={<ArrowBackIcon />}
              color="inherit"
            >
              Back
            </Button>
          </Toolbar>
        </AppBar>
      </IonHeader>
      <IonContent fullscreen>
        <PersonDetail id={match.params.personId} />
      </IonContent>
    </IonPage>
  )
}
