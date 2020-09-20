import AsyncStorage from "@react-native-community/async-storage";
import { setDummyData, STORAGE_KEY } from "./helpers";

export const getDecks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue !== null || Object.keys(jsonValue).length !== 0
      ? JSON.parse(jsonValue)
      : setDummyData();
  } catch (e) {
    console.log("Error: ", e);
  }
};

// take in a single id argument and return the deck
// associated with that id.
export const getDeck = ({ id }) => {
  console.log(id);
};

export const saveDeckTitle = async ({ title, id }) => {
  try {
    const jsonValue = JSON.stringify({
      [id]: {
        id,
        title,
        questions: [],
      },
    });
    await AsyncStorage.mergeItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const addCardToDeck = async ({ deckId, card }) => {
  console.log("addCardToDeck: ", deckId, card);
  try {
    const data = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
    const newData = {
      ...data,
      [deckId]: {
        ...data[deckId],
        questions: data[deckId].questions.concat(card),
      },
    };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  } catch (e) {
    console.log("Error: ", e);
  }
};
