import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonLabel, IonList, IonItem, IonText } from '@ionic/react';
import './Journals.css';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

class Journals extends React.Component {
  constructor(props) {
    super(props);

    this.init();
    this.state = {
      journalEntries: []
    }

    this.init = this.init.bind(this);
  }

  init() {
    try {
      SQLite.create({
        name: 'hydra10.db', location: 'default'
      }).then(async (db: SQLiteObject) => {
        try {
          db.executeSql('create table if not exists journals(mood TEXT, start_date TEXT, went_well TEXT, gone_better TEXT, thankful TEXT)', {})
		        .then(() => console.log("Created journals table"))
            .catch(e => console.log(e));
          db.executeSql('select * from journals', {}).then(result => {
            var data = [];
            for (var i = 0; i < result.rows.length; i++) {
              data.push({
                mood: result.rows.item(i).mood,
                start_date: result.rows.item(i).start_date,
                went_well: result.rows.item(i).went_well,
                gone_better: result.rows.item(i).gone_better,
                thankful: result.rows.item(i).thankful
              })
            }
            this.setState(() => ({
              journalEntries: data
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
    const { journalEntries } = this.state;

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

          <IonItem routerLink="/journal/new">
            <IonLabel><b>New Journal Entry</b></IonLabel>
          </IonItem>

          <IonList>
            {journalEntries.length > 0 ? journalEntries.map((item, index) => {
              return (
                <IonItem key={index}>
                  <IonLabel>
                    <IonText className="font-weight: bold;">
                      <h3>{item["mood"]}</h3>
                    </IonText>
                    
                  </IonLabel>
                  <br></br>
                </IonItem>
              );
            }) : " You have no Journal Entries ... Really?"}
          </IonList>

        </IonContent>
      </IonPage>
    );
  };
};

export default Journals;
