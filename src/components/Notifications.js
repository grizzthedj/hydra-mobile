import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

var Notifications = (function () {
  var init = function() {
    //every minute check the database for the event that will be due
    const checkReminders = interval(10 * 1000);

    checkReminders.subscribe(() => {
      this.getDueReminders()
    })
  };

  var getDueReminders = function() {
    var c_datetime = new Date().getTime();

    for (var reminder in this.reminders)
      var diff = c_datetime - new Date(reminder['due_date']).getTime()

    var diffMins = Math.round(((diff % 86400000) % 3600000) / 60000);
    if (diffMins <= this.reminder_time && diffMins > 0) {
      this.createNotification(diffMins)
    }
  };

  var createNotification = function() {
    this.popover.create({
      component: PopovercomponentPage,
      componentProps: {
        data: number
      },
      showBackdrop: false
    }).then((popoverElement) => {
      popoverElement.present();
    })
  }

  return {
    init: init
  }

})();

export default Notifications;



