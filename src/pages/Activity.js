import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonAlert, IonList, IonItem, IonLabel, IonText, IonModal, IonTextarea, IonInput, IonSelect, IonSelectOption, IonItemDivider } from '@ionic/react';
import './Activities.css';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

class Activity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      details: "",
      category: "",
      showNewActivity: false
    }

    this.create = this.create.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  create() {
    try {
      SQLite.create({
        name: 'hydra2.db', location: 'default'
      }).then(async (db: SQLiteObject) => {
        try {
          db.executeSql('insert into activities values(?, ?, ?)', [this.state.name, this.state.category, this.state.details])
		        .then(() => console.log("Inserted activity"))
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
            <IonTitle>New Activity</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">New Activity</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonItemDivider>Name</IonItemDivider>
          <IonItem>
            <IonInput id="name" name="name" value={this.state.name} placeholder="Activity Name" onIonChange={e => this.handleChange(e)}></IonInput>
          </IonItem>
          
          <IonItemDivider>Category</IonItemDivider>
          <IonItem>
            <IonSelect id="category" name="category" value={this.state.category} okText="Okay" cancelText="Dismiss" onIonChange={e => this.handleChange(e)}>
              <IonSelectOption value="Health">Health</IonSelectOption>
              <IonSelectOption value="Chores">Chores</IonSelectOption>
              <IonSelectOption value="Social">Social</IonSelectOption>
              <IonSelectOption value="Gaming">Gaming</IonSelectOption>
              <IonSelectOption value="Sports">Sports</IonSelectOption>
              <IonSelectOption value="Custom">Add Your Own</IonSelectOption>
            </IonSelect>
          </IonItem>
        
          <IonItemDivider>Details</IonItemDivider>
          <IonItem>
            <IonTextarea id="details" name="details" value={this.state.details} placeholder="More detail please ..." onIonChange={e => this.handleChange(e)}></IonTextarea> 
          </IonItem>

          <IonButton routerLink="/activities" onClick={this.create}>Create</IonButton>
          <IonButton routerLink="/activities">Cancel</IonButton>
        </IonContent>
      </IonPage>
    );
  };
};

export default Activity;
