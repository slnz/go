import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import { ReactElement } from 'react'
// import { useAuth } from '../../lib/auth'

export function Login(): ReactElement {
  // const { login } = useAuth()
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen></IonContent>
    </IonPage>
  )
}
