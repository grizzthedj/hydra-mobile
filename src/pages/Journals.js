import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import './Journals.css';

class Journals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      journalEntries: []
    }
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Journals</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Journals</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonButton>New Journal Entry</IonButton>
        </IonContent>
      </IonPage>
    );
  };
};

export default Journals;
