import { IonContent, IonPage } from '@ionic/react'
import { ReactElement } from 'react'
import { Login as LoginComponent } from '../../components/Login'

/* Due to a bug with testing this page component has been separated from the
   implementation and instead just wraps the implementation in an ionic page.
   https://github.com/ionic-team/stencil/issues/3434
  */
export function Login(): ReactElement {
  return (
    <IonPage>
      <IonContent fullscreen>
        <LoginComponent />
      </IonContent>
    </IonPage>
  )
}
