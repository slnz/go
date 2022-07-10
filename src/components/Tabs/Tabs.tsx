import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react'
import { people, analytics, footsteps } from 'ionicons/icons'
import { ReactElement } from 'react'
import { Redirect, Route } from 'react-router-dom'

import { FaithSteps } from '../../pages/FaithSteps'
import { MinistryChain } from '../../pages/MinistryChain'
import { PeoplePage } from '../../pages/PeoplePage'

export function Tabs(): ReactElement {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/people" component={PeoplePage} />
        <Route exact path="/tabs/faith-steps" component={FaithSteps} />
        <Route exact path="/tabs/ministry-chain" component={MinistryChain} />
        <Redirect exact path="/tabs" to="/tabs/people" />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="People" href="/tabs/people">
          <IonIcon icon={people} />
          <IonLabel>People</IonLabel>
        </IonTabButton>
        <IonTabButton tab="faith-steps" href="/tabs/faith-steps">
          <IonIcon icon={footsteps} />
          <IonLabel>Faith Steps</IonLabel>
        </IonTabButton>
        <IonTabButton tab="ministry-chain" href="/tabs/ministry-chain">
          <IonIcon icon={analytics} />
          <IonLabel>Ministry Chain</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}
