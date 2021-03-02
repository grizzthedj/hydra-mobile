import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonAlert, IonList, IonItem, IonLabel, IonText, IonModal, IonTextarea, IonInput, IonSelect, IonSelectOption, IonItemDivider, IonDatetime } from '@ionic/react';
import './Activities.css';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

class Activity extends React.Component {
  constructor(props) {
    super(props);
    const urlParams = window.location.href.split('/');
    const idParam = urlParams[urlParams.length - 1];
    const id = (idParam && parseInt(idParam)) ? idParam : 0;

    this.state = {
      id: id,
      name: "",
      status: "",
      details: "",
      category: "",
      complete_by: "",
      showNewActivity: false,
      submitButtonText: "Create"
    }

    if (id && id > 0) {
      this.get(id)
    }

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.get = this.get.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  create() {
    try {
      SQLite.create({
        name: 'hydra10.db', location: 'default'
      }).then(async (db: SQLiteObject) => {
        try {
          db.executeSql('insert into activities values(?, ?, ?, ?, ?)', [this.state.name, this.state.status, this.state.category, this.state.details, this.state.complete_by])
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

  update() {
    try {
      SQLite.create({
        name: 'hydra10.db', location: 'default'
      }).then(async (db: SQLiteObject) => {
        try {
          db.executeSql('update activities set name = ?, status = ?, category = ?, details = ?, complete_by = ?) where rowid = ?', [this.state.name, this.state.status, this.state.category, this.state.details, this.state.complete_by, this.state.id])
		        .then(() => console.log("Updated activity"))
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

  get(id) {
    try {
      SQLite.create({
        name: 'hydra10.db', location: 'default'
      }).then(async (db: SQLiteObject) => {
        try {
          db.executeSql('select rowid as id, name, status, category, details, complete_by from activities where rowid = ?', [id]).then(result => {
            this.setState(() => ({
              id: result.rows.item(0).id,
              name: result.rows.item(0).name,
              status: result.rows.item(0).status,
              details: result.rows.item(0).details,
              category: result.rows.item(0).category,
              complete_by: result.rows.item(0).complete_by,
              submitButtonText: "Update"
            }));
          }).catch(e => console.log(e))
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
          
          <IonItemDivider>Status</IonItemDivider>
          <IonItem>
            <IonSelect id="status" name="status" value={this.state.status} okText="OK" cancelText="Cancel" onIonChange={e => this.handleChange(e)}>
              <IonSelectOption value="NotStarted">Not Started</IonSelectOption>
              <IonSelectOption value="Successful">Successful</IonSelectOption>
              <IonSelectOption value="Failed">Failed</IonSelectOption>
              <IonSelectOption value="Missed">Missed</IonSelectOption>
              <IonSelectOption value="Snooze">Snooze</IonSelectOption>
              <IonSelectOption value="Custom">Add Your Own</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItemDivider>Category</IonItemDivider>
          <IonItem>
            <IonSelect id="category" name="category" value={this.state.category} okText="OK" cancelText="Cancel" onIonChange={e => this.handleChange(e)}>
              <IonSelectOption value="Health">Health</IonSelectOption>
              <IonSelectOption value="Chores">Chores</IonSelectOption>
              <IonSelectOption value="Social">Social</IonSelectOption>
              <IonSelectOption value="Gaming">Gaming</IonSelectOption>
              <IonSelectOption value="Sports">Sports</IonSelectOption>
              <IonSelectOption value="Custom">Add Your Own</IonSelectOption>
            </IonSelect>
          </IonItem>
        
          <IonItemDivider>Complete By</IonItemDivider>
          <IonItem>
            <IonDatetime id="complete_by" name="complete_by" value={this.state.complete_by} displayFormat="MMM DD, YYYY HH:mm" minuteValues="0,15,30,45" onIonChange={e => this.handleChange(e)}></IonDatetime>
          </IonItem>

          <IonItemDivider>Details</IonItemDivider>
          <IonItem>
            <IonTextarea id="details" name="details" value={this.state.details} placeholder="More detail please ..." onIonChange={e => this.handleChange(e)}></IonTextarea> 
          </IonItem>

          <IonButton onClick={this.state.id > 0 ? this.update : this.create}>{this.state.submitButtonText}</IonButton>
          <IonButton routerLink="/activities">Cancel</IonButton>
        </IonContent>
      </IonPage>
    );
  };
};

export default Activity;
