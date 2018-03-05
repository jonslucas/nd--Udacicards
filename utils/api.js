import { AsyncStorage } from 'react-native';


const DECK_KEY = "Udacicards:decks";


export function saveToStorage(deck) {
  return AsyncStorage.mergeItem(DECK_KEY, JSON.stringify({
    [deck.title]: deck,
  })).catch(console.error);
}

export function removeDeck(deck) {
  return AsyncStorage.getItem(DECK_KEY)
    .then(JSON.parse)
    .then(d=>{
      d[deck] = undefined;
      delete d[deck];
      AsyncStorage.setItem(DECK_KEY, JSON.stringify(d));
    }).catch(console.error);
}

export function loadDecks() {
  return AsyncStorage.getItem(DECK_KEY).then(JSON.parse).catch(console.error);
}
