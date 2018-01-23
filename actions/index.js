export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';


export const addDeck = (title) => (
  {
    type: ADD_DECK,
    title,
  }
)

export const addCard = (title, card) => (
  {
    type: ADD_CARD,
    title,
    card,
  }
);

export const receiveDecks = (decks) => (
  {
    type: RECEIVE_DECKS,
    decks,
  }
);
