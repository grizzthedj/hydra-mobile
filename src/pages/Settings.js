import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToggle, IonList, IonItem, IonDatetime, IonLabel, IonItemDivider, IonButton } from '@ionic/react';
import './Settings.css';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reminder_default: false,
      notification_time: "",
      numSlides: 1
    }

    this.init = this.init.bind(this);
    this.update = this.update.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.init();
  }

  init() {
    try {
      SQLite.create({
        name: 'hydra10.db', location: 'default'
      }).then(async (db: SQLiteObject) => {
        try {
          db.executeSql('create table if not exists settings(reminder_default TEXT, notification_time TEXT)', {})
		        .then(() => console.log("===== Created settings table"))
            .catch(e => console.log(e));
          db.executeSql('insert into settings values (?, ?)', [this.state.reminder_default, this.state.notification_time])
		        .then(() => console.log("===== Seeded settings table"))
            .catch(e => console.log(e));
          db.executeSql('delete from settings where rowid > ?', [1])
		        .then(() => console.log("===== Deleted un-needed rows settings table"))
            .catch(e => console.log(e));
          db.executeSql('select rowid as id, reminder_default, notification_time from settings where rowid = ?', [1]).then(result => {
            this.setState(() => ({
              reminder_default: result.rows.item(0).reminder_default,
              notification_time: result.rows.item(0).notification_time
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

  update(field) {
    try {
      SQLite.create({
        name: 'hydra10.db', location: 'default'
      }).then(async (db: SQLiteObject) => {
        try {
          db.executeSql('update settings set ' + field + ' = ? where rowid = ?', [this.state[field], 1]).then(() => {
            console.log("===== Updated " + field + " in settings to " + this.state[field]);
          }).catch(e => console.log(e));
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
    const value = event.target.value;
    const name = event.target.name;

    console.log("===== NAME: " + name);
    console.log("===== VALUE: " + value);

    this.setState({
      [name]: value
    }); 
    this.update(name);   
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
          <IonItem>
            <IonToggle id="reminder_default" name="reminder_default" checked={this.state.reminder_default} onIonChange={e => this.handleChange(e)} />
          </IonItem>

          <IonItemDivider>Journal Notification Time</IonItemDivider>
          <IonItem>
            <IonDatetime id="notification_time" name="notification_time" value={this.state.notification_time} displayFormat="h:mm A" minuteValues="0,15,30,45" onIonChange={e => this.handleChange(e)}></IonDatetime>
          </IonItem>

        </IonContent>
      </IonPage>
    );
  };
};

export default Settings;