import { IonContent, IonHeader, IonPage } from '@ionic/react'
import { ReactElement } from 'react'

export function PersonDetailPage(): ReactElement {
  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen></IonContent>
    </IonPage>
  )
}
