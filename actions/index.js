export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const DELETE_DECK = 'DELETE_DECK';
export const DELETE_CARD = 'DELETE_CARD';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';


export const addDeck = (title) => (
  {
    type: ADD_DECK,
    title,
  }
);

export const deleteDeck = (title) => (
  {
    type: DELETE_DECK,
    title,
  }
);

export const addCard = (title, card) => (
  {
    type: ADD_CARD,
    title,
    card,
  }
);

export const deleteCard = (title, card) => (
  {
    type: DELETE_CARD,
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
