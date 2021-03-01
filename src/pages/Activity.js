import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonAlert, IonList, IonItem, IonLabel, IonText, IonModal, IonTextarea, IonInput } from '@ionic/react';
import './Activities.css';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

class Activity extends React.Component {
  constructor(props) {
    super(props);

    this.init();
    this.state = {
      name: "",
      details: "",
      showNewActivity: false,
      categories: ["Health", "Chores", "Social", "Gaming", "Sports"]
    }

    this.create = this.create.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  create() {
    // try {
    //   SQLite.create({
    //     name: 'hydra.db', location: 'default'
    //   }).then(async (db: SQLiteObject) => {
    //     try {
    //       db.executeSql('select * from activities', {}).then(result => {
    //         var data = [];
    //         for (var i = 0; i < result.rows.length; i++) {
    //           data.push({
    //             name: result.rows.item(i).name
    //           })
    //         }
    //         this.setState(() => ({
    //           activities: data
    //         }));
    //       }).catch(e => console.log(e))
    //     } 
    //     catch (e) {
    //       console.log(e);
    //     }
    //   })
    // } 
    // catch(e) {
    //   console.log(e)
    // }
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
          {/* <IonInput value={this.state.name} placeholder="Activity Name" onIonChange={e => this.handleChange(e)}></IonInput>
          <IonTextarea placeholder="More detail please ..." value={this.state.details} onIonChange={e => this.handleChange(e)}></IonTextarea>  */}
        </IonContent>
      </IonPage>
    );
  };
};

export default Activity;
