import { Redirect, Route } from 'react-router-dom'
import { ReactElement } from 'react'
import { ellipse, square, triangle } from 'ionicons/icons'
import { Dashboard } from '../../pages/Dashboard'
import { FaithSteps } from '../../pages/FaithSteps'
import { MinistryChain } from '../../pages/MinistryChain'
import { Profile } from '../../pages/Profile'
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react'

export function Tabs(): ReactElement {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/dashboard" component={Dashboard} />
        <Route exact path="/tabs/faith-steps" component={FaithSteps} />
        <Route exact path="/tabs/ministry-chain" component={MinistryChain} />
        <Route exact path="/tabs/profile" component={Profile} />
        <Redirect exact path="/tabs" to="/tabs/dashboard" />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="dashboard" href="/tabs/dashboard">
          <IonIcon icon={triangle} />
          <IonLabel>Dashboard</IonLabel>
        </IonTabButton>
        <IonTabButton tab="faith-steps" href="/tabs/faith-steps">
          <IonIcon icon={ellipse} />
          <IonLabel>Faith Steps</IonLabel>
        </IonTabButton>
        <IonTabButton tab="ministry-chain" href="/tabs/ministry-chain">
          <IonIcon icon={square} />
          <IonLabel>Ministry Chain</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/tabs/profile">
          <IonIcon icon={square} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}
