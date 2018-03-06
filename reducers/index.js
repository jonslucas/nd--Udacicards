import { RECEIVE_DECKS, ADD_CARD, ADD_DECK, DELETE_DECK, DELETE_CARD } from '../actions';

const testDeck = {
  React: {
  title: 'React',
  questions: {
    'What is React?': 'A library for managing user interfaces',
    'Where do you make Ajax requests in React?': 'The componentDidMount lifecycle event',
  },
  toDelete: false,
},
JavaScript: {
  title: 'JavaScript',
  questions: {
    'What is a closure?': 'The combination of a function and the lexical environment within which that function was declared.',
  },
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
          questions: {
            ...state[action.title].questions,
             [action.card.question]: action.card.answer,
           }
        }
      };
    case DELETE_CARD:
      const { questions } = state[action.title];
      const qs = Object.keys(questions).filter(qs=>qs!==action.card.questions);
      let newQs = {};
      qs.forEach(q=>{
        newQs[q] = questions[q];
      });
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: newQs,
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
