import { IonContent, IonHeader, IonPage } from '@ionic/react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { AppBar, Button, Toolbar } from '@mui/material'
import { ReactElement } from 'react'
import { RouteComponentProps, useHistory } from 'react-router'

import { ProcessDetail } from '../../components/ProcessDetail'

type ProcessDetailPageProps = Pick<
  RouteComponentProps<{
    processId: string
  }>,
  'match'
>

export function ProcessDetailPage({
  match
}: ProcessDetailPageProps): ReactElement {
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
          </Toolbar>
        </AppBar>
      </IonHeader>
      <IonContent fullscreen>
        <ProcessDetail id={match.params.processId} />
      </IonContent>
    </IonPage>
  )
}
