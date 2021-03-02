import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToggle, IonList, IonItem, IonDatetime, IonLabel, IonItemDivider, IonButton } from '@ionic/react';
import './Settings.css';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.init();
    this.state = {
      reminder_default: "off",
      notification_time: ""
    }

    this.init = this.init.bind(this);
    this.update = this.update.bind(this);
  }

  init() {
    try {
      SQLite.create({
        name: 'hydra9.db', location: 'default'
      }).then(async (db: SQLiteObject) => {
        try {
          db.executeSql('create table if not exists settings(reminder_default TEXT, notification_time TEXT)', {})
		        .then(() => console.log("Created settings table"))
            .catch(e => console.log(e));
          db.executeSql('insert into settings values (?, ?)', [this.state.reminder_default, this.state.notification_time])
		        .then(() => console.log("Seeded settings table"))
            .catch(e => console.log(e));
          db.executeSql('select rowid as id, reminder_default, notification_time from settings', {}).then(result => {
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

  update() {
    try {
      SQLite.create({
        name: 'hydra9.db', location: 'default'
      }).then(async (db: SQLiteObject) => {
        try {
          db.executeSql('update settings set reminder_default = ?, notification_time = ?) where rowid = ?', [this.state.reminder_default, this.state.notification_time, 1])
		        .then(() => console.log("Updated settings"))
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
            <IonToggle id="reminder_default" name="reminder_default" value={this.state.reminder_default} />
          </IonItem>

          <IonItemDivider>Journal Notification Time</IonItemDivider>
          <IonItem>
            <IonDatetime id="notification_time" name="notification_time" value={this.state.notification_time} displayFormat="h:mm A" minuteValues="0,15,30,45"></IonDatetime>
          </IonItem>

          <IonButton onClick={this.update}>Update</IonButton>

        </IonContent>
      </IonPage>
    );
  };
};

export default Settings;