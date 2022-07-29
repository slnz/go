import { IonContent, IonHeader, IonPage } from '@ionic/react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { AppBar, Button, Toolbar } from '@mui/material'
import { ReactElement } from 'react'
import { RouteComponentProps, useHistory } from 'react-router'

import { PostForm } from '../../components/PostForm'

type PostFormPageProps = Pick<
  RouteComponentProps<{
    personId: string
    definitionType: string
  }>,
  'match'
>

export function PostFormPage({ match }: PostFormPageProps): ReactElement {
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
        <PostForm
          personId={match.params.personId}
          definitionType={match.params.definitionType}
        />
      </IonContent>
    </IonPage>
  )
}
