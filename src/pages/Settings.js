import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToggle, IonList, IonItem, IonDatetime, IonLabel, IonItemDivider } from '@ionic/react';
import './Settings.css';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reminder: "off",
      notificationTime: ""
    }
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Settings</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonItemDivider>Default Reminder</IonItemDivider>
          <IonItem><IonToggle value="reminder" /></IonItem>

          <IonItemDivider>Journal Notification Time</IonItemDivider>
          <IonItem><IonDatetime displayFormat="h:mm A" minuteValues="0,15,30,45"></IonDatetime></IonItem>

        </IonContent>
      </IonPage>
    );
  };
};

export default Settings;