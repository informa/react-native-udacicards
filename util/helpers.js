import AsyncStorage from "@react-native-community/async-storage";
import { dummyData } from "./data";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";

export const STORAGE_KEY = "UdaciCards:decks";
export const NOTIFICATION_KEY = "UdaciCards:notifications";

export const setDummyData = async () => {
  try {
    const jsonValue = JSON.stringify(dummyData);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    // save error
    console.log("Error: ", e);
  }

  console.log("Done. setDummyData");
  return dummyData;
};

export const clearLocalNotification = async () => {
  try {
    await AsyncStorage.removeItem(NOTIFICATION_KEY);
    Notifications.cancelAllScheduledNotificationsAsync;
  } catch (e) {
    // remove error
  }

  console.log("Done. clearLocalNotification");
};

export const setLocalNotification = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(NOTIFICATION_KEY);
    const data = jsonValue != null ? JSON.parse(jsonValue) : null;

    if (data === null) {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

      if (status === "granted") {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(20);
        tomorrow.setMinutes(0);

        const content = {
          title: "Take a quiz!",
          body: "👋 Keep learning, don't forget to take a quiz today!",
        };

        Notifications.scheduleNotificationAsync({
          content,
          trigger: tomorrow,
        });

        await AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
      }
    }
  } catch (e) {
    // read error
  }

  console.log("Done. setLocalNotification");
};
