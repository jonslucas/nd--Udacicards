import { RECEIVE_DECKS, ADD_CARD, ADD_DECK, DELETE_DECK, DELETE_CARD } from '../actions';

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
  ],
  toDelete: false,
},
JavaScript: {
  title: 'JavaScript',
  questions: [
    {
      question: 'What is a closure?',
      answer: 'The combination of a function and the lexical environment within which that function was declared.'
    }
  ],
  toDelete: false,
}
};

export const decks = (state={}, action) => {
  switch(action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_CARD:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: [...state[action.title].questions, action.card],
        }
      };
    case DELETE_CARD:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: state[action.title].questions
                      .filter(q=>(
                        q.question !== action.card.question &&
                        q.answer !== action.card.answer
                      )),
        }
      };
    case ADD_DECK:
      const deck = {
        title: action.title,
        questions: [],
        toDelete: false,
      };
      return {
        ...state,
        [action.title]: deck,
      };
    case DELETE_DECK:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          toDelete: true,
        }
      };
    default:
      return state;
  }
}
