import AsyncStorage from "@react-native-community/async-storage";
import {
  getDecks,
  saveDeckTitle,
  addCardToDeck,
  resetAsyncStorage,
} from "../api";
import { STORAGE_KEY, setDummyData } from "../helpers";
import { dummyData } from "../data";

describe("api", () => {
  // Remove data from AsyncStorage after each test
  afterEach(async () => {
    await resetAsyncStorage();
    AsyncStorage.setItem.mockClear();
    AsyncStorage.getItem.mockClear();
  });

  it("getDecks returns dummy data if AsyncStorage STORAGE_KEY is null", async () => {
    await getDecks();
    
    expect(AsyncStorage.getItem).toBeCalledWith(STORAGE_KEY);
    expect(AsyncStorage.__INTERNAL_MOCK_STORAGE__[STORAGE_KEY]).toBe(
      JSON.stringify(dummyData)
    );
  });

  it("setDummyData calls AsyncStorage with dummy data", async () => {
    await setDummyData();

    expect(AsyncStorage.setItem).toBeCalledWith(
      STORAGE_KEY,
      JSON.stringify(dummyData)
    );
  });

  it("saveDeckTitle calls AsyncStorage with title and id", async () => {
    const id = "1";
    const title = "test";
    const expectedResult = {
      [id]: {
        id,
        title,
        questions: [],
      },
    };

    // Add some data to AsyncStorage STORAGE_KEY
    await getDecks();

    await saveDeckTitle({ id, title });

    expect(AsyncStorage.mergeItem).toBeCalledWith(
      STORAGE_KEY,
      JSON.stringify(expectedResult)
    );
    expect(AsyncStorage.__INTERNAL_MOCK_STORAGE__[STORAGE_KEY]).toContain(
      Object.keys(expectedResult)[0]
    );
  });

  it("addCardToDeck calls AsyncStorage with deckId and card ", async () => {
    const id = Object.keys(dummyData)[0];
    const card = {
      question: "my question",
      answer: "my answer",
      result: "incorrect",
    };

    // Add some data to AsyncStorage STORAGE_KEY
    await getDecks();

    await addCardToDeck({ deckId: id, card });

    // this call to AsyncStorage is the one that sets the card
    expect(AsyncStorage.setItem.mock.calls[1][1]).toContain(
      JSON.stringify(card)
    );
  });

  it("resetAsyncStorage removes AsyncStorage for STORAGE_KEY", async () => {
    await getDecks();

    expect(Object.keys(AsyncStorage.__INTERNAL_MOCK_STORAGE__).length).toBe(1);

    await resetAsyncStorage();

    expect(Object.keys(AsyncStorage.__INTERNAL_MOCK_STORAGE__).length).toBe(0);
  });
});
