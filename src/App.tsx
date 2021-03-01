import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, triangle, book, settings, notifications, clipboard } from 'ionicons/icons';
import Activities from './pages/Activities';
import Activity from './pages/Activity';
import Reminders from './pages/Reminders';
import Journals from './pages/Journals';
import Journal from './pages/Journal';
import Settings from './pages/Settings';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/activities">
            <Activities />
          </Route>
          <Route exact path="/activities/:id">
            <Activity />
          </Route>
          <Route exact path="/activity/new">
            <Activity />
          </Route>
          <Route exact path="/reminders">
            <Reminders />
          </Route>
          <Route exact path="/journals">
            <Journals />
          </Route>
          <Route exact path="/journal/new">
            <Journal />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="activities" href="/activities">
            <IonIcon icon={clipboard} />
            <IonLabel>Activities</IonLabel>
          </IonTabButton>
          <IonTabButton tab="reminders" href="/reminders">
            <IonIcon icon={notifications} />
            <IonLabel>Reminders</IonLabel>
          </IonTabButton>
          <IonTabButton tab="journals" href="/journals">
            <IonIcon icon={book} />
            <IonLabel>Journal</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/settings">
            <IonIcon icon={settings} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
