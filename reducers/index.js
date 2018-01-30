import { RECEIVE_DECKS, ADD_CARD, ADD_DECK } from '../actions';

const testDeck = {
  React: {
  title: 'React',
  questions: [
    {
      question: 'What is React?',
      answer: 'A library for managing user interfaces'
    },
    {
      question: 'Where do you make Ajax requests in React?',
      answer: 'The componentDidMount lifecycle event'
    }
  ]
},
JavaScript: {
  title: 'JavaScript',
  questions: [
    {
      question: 'What is a closure?',
      answer: 'The combination of a function and the lexical environment within which that function was declared.'
    }
  ]
}
};

export const decks = (state=testDeck, action) => {
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
