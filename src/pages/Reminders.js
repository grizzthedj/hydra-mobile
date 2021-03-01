import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import './Reminders.css';

class Reminders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Reminders</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Reminders</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonButton>New Reminder</IonButton>
        </IonContent>
      </IonPage>
    );
  };
};

export default Reminders;
