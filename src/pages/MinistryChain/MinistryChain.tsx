import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import { ReactElement } from 'react'

export function MinistryChain(): ReactElement {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ministry Chain</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Ministry Chain</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  )
}
