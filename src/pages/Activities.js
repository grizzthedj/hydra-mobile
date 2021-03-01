import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonAlert, IonList, IonItem, IonLabel, IonText, IonModal, IonTextarea, IonInput } from '@ionic/react';
import './Activities.css';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

class Activities extends React.Component {
  constructor(props) {
    super(props);

    this.init();
    this.state = {
      activities: []
    }

    this.init = this.init.bind(this);
  }

  init() {
    try {
      SQLite.create({
        name: 'hydra.db', location: 'default'
      }).then(async (db: SQLiteObject) => {
        try {
          db.executeSql('create table if not exists activities(name TEXT, status TEXT, category TEXT, details TEXT, complete_by TEXT)', {})
		        .then(() => console.log("Created activities table"))
            .catch(e => console.log(e));
          db.executeSql('select rowid as id, name, status, category, details, complete_by from activities', {}).then(result => {
            var data = [];
            for (var i = 0; i < result.rows.length; i++) {
              data.push({
                id: result.rows.item(i).id,
                name: result.rows.item(i).name,
                status: result.rows.item(i).status,
                category: result.rows.item(i).category,
                details: result.rows.item(i).details,
                complete_by: result.rows.item(i).complete_by,
              })
            }
            this.setState(() => ({
              activities: data
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

  render() {
    const { activities, showNewActivity } = this.state;
    
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Activities</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Activities</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonItem routerLink="/activity/new">
            <IonLabel><b>New Activity</b></IonLabel>
          </IonItem>

          <IonList>
            {activities.length > 0 ? activities.map((item, index) => {
              return (
                <IonItem key={index} routerLink={"/activities/" + item["id"]}>
                  <IonLabel><b>{item["name"]}</b></IonLabel>
                </IonItem>
              );
            }) : " You have no activities ... Don't be lazy!"}
          </IonList>
        </IonContent>
      </IonPage>
    );
  };
};

export default Activities;
