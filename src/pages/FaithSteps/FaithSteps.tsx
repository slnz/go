import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import { ReactElement } from 'react'

export function FaithSteps(): ReactElement {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Faith Steps</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Faith Steps</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  )
}
