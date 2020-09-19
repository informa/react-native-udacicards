import { RECEIVE_DECKS } from "../actions";
import { ADD_DECK } from "../actions";
import { ADD_CARD } from "../actions";

const decks = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DECKS:
      console.log("RECEIVE_DECKS", {
        ...state,
        ...action.decks,
      });
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      console.log("ADD_DECK", {
        ...state,
        ...action.deck,
      });
      return {
        ...state,
        ...action.deck,
      };
    case ADD_CARD:
      const { deckId, card } = action;
      console.log("ADD_CARD", {
        ...state,
        [deckId]: {
          ...state[deckId],
          questions: state[deckId].questions.concat(card),
        },
      });
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          questions: state[deckId].questions.concat(card),
        },
      };
    default:
      return state;
  }
};

export default decks;
