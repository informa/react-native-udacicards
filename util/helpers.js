import AsyncStorage from "@react-native-community/async-storage";
import { dummyData } from "./data";

export const STORAGE_KEY = "UdaciCards:decks";

export const setDummyData = async () => {
  try {
    const jsonValue = JSON.stringify(dummyData);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    // save error
    console.log("Error: ", e);
  }

  console.log("Done.");
  return dummyData;
};
