import AsyncStorage from "@react-native-community/async-storage";
import { setDummyData, STORAGE_KEY } from "./helpers";

// return all of the decks along with their titles,
// questions, and answers.
export const getDecks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : setDummyData();
  } catch (e) {
    // error reading value
    console.log("Error: ", e);
  }
};

export const removeValue = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // remove error
    console.log("Error: ", e);
  }

  console.log("Done.");
};

// take in a single id argument and return the deck
// associated with that id.
export const getDeck = ({ id }) => {
  console.log(id);
};

//take in a single title argument and add it to the decks.
export const saveDeckTitle = ({ title }) => {
  console.log(title);
};

// take in two arguments, title and card, and will add the card
// to the list of questions for the deck with the associated title.
export const addCardToDeck = ({ title, card }) => {
  console.log(title, card);
};
