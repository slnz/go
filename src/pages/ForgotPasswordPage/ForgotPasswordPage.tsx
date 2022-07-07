import { IonContent, IonHeader, IonPage } from '@ionic/react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { AppBar, Toolbar, Button } from '@mui/material'
import { ReactElement } from 'react'
import { useHistory } from 'react-router'

import { ForgotPassword } from '../../components/ForgotPassword'

export function ForgotPasswordPage(): ReactElement {
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
        <ForgotPassword />
      </IonContent>
    </IonPage>
  )
}
