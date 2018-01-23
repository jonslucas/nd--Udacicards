import { RECEIVE_DECKS, ADD_CARD, ADD_DECK } from '../actions';


export const decks = (state={}, action) => {
  switch(action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...decks,
      }
    case ADD_CARD:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: [...state[action.title].questions, action.card],
        }
      }
    case ADD_DECK:
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: [],
        }
      };
    default:
      return state;
  }
}
