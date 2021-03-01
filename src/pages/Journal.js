import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonAlert, IonList, IonItem, IonLabel, IonText, IonModal, IonTextarea, IonInput, IonSelect, IonSelectOption, IonItemDivider } from '@ionic/react';
import './Journals.css';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

class Journal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mood: "",
      start_date: "",
      went_well: "",
      gone_better: "",
      thankful: ""
    }

    this.create = this.create.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  create() {
    try {
      SQLite.create({
        name: 'hydra.db', location: 'default'
      }).then(async (db: SQLiteObject) => {
        try {
          db.executeSql('insert into journals values(?, ?, ?, ?, ?)', [this.state.mood, this.state.start_date, this.state.went_well, this.state.gone_better, this.state.thankful])
            .then(() => console.log("Inserted journal"))
            .catch(e => console.log(e));
        } 
        catch (e) {
          console.log(e);
        }
      })
    } 
    catch(e) {
      console.log(e)
    }
  }

  handleChange(event) {
    const value = event.target.value
    const name = event.target.name
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>New Journal</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">New Journal</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonItemDivider>Mood</IonItemDivider>
          <IonItem>
            <IonInput id="mood" name="mood" value={this.state.mood} placeholder="How you feeling today?" onIonChange={e => this.handleChange(e)}></IonInput>
          </IonItem>

          <IonItemDivider>What went well today?</IonItemDivider>
          <IonItem>
            <IonTextarea id="went_well" name="went_well" value={this.state.went_well} placeholder="" onIonChange={e => this.handleChange(e)}></IonTextarea> 
          </IonItem>

          <IonItemDivider>What could have gone better?</IonItemDivider>
          <IonItem>
            <IonTextarea id="gone_better" name="gone_better" value={this.state.gone_better} placeholder="" onIonChange={e => this.handleChange(e)}></IonTextarea> 
          </IonItem>

          <IonItemDivider>What are you thankful for?</IonItemDivider>
          <IonItem>
            <IonTextarea id="thankful" name="thankful" value={this.state.thankful} placeholder="" onIonChange={e => this.handleChange(e)}></IonTextarea> 
          </IonItem>

          <IonButton routerLink="/journals" onClick={this.create}>Create</IonButton>
          <IonButton routerLink="/journals">Cancel</IonButton>
        </IonContent>
      </IonPage>
    );
  };
};

export default Journal;
