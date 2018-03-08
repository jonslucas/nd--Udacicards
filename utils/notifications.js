import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = "udacicards:notifications';"

export function clearLocalNotification() {
  AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

function createNotification() {
  return {
    title: "Wake your brain up!",
    body: "Daily quizes help solidify recall.  Take a quiz now!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data=>{
      if (data===null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status })=>{
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tom = new Date();
              tom.setDate(tom.getDate() + 1);
              tom.setHours(20);
              tom.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tom,
                  repeat: 'day',
                }
              );
            }
          });
      }
    });
}
