import React, { Component } from 'react';
import {View} from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Question from './QuizQuestion';
import Results from './QuizResults';

class Quiz extends Component {
  state={
    showAnswer:false,
    questionInd: 0,
    correctCount: 0,
  };
  handleShow = () => {
    this.setState({showAnswer:true});
  }
  getNextQuestion = () => {
    this.setState(state=>({questionInd: state.questionInd+1}));
  }
  handleCorrect = () => {
    this.getNextQuestion();
    this.setState(state=>({correctCount: state.correctCount+1, showAnswer: false}));
  }
  backToDeck = () => {
    this.props.navigation.dispatch(NavigationActions.navigate({
      routeName: 'DeckDetail',
      params: {deckTitle: this.props.deck.title},
    }))
  }
  restart = () => {
    this.setState({
      showAnswer: false,
      questionInd: 0,
      correctCount: 0,
    });
  }
  render() {
    const { deck } = this.props;
    const {questions, title} = deck;
    const {showAnswer, correctCount, questionInd} = this.state;

    const qArr = Object.keys(questions).map(k=>({question:k, answer:questions[k]}));

    const remainder = qArr.length - questionInd;

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text h2>{title}</Text>
          <Text h4>{remainder} {remainder===1? 'question': 'questions'} remaining</Text>
        </View>
        <View style={{flex: 3}}>
          {questionInd < qArr.length ?
            <Question
              card={qArr[questionInd]}
              handleCorrect={this.handleCorrect}
              handleWrong={this.getNextQuestion}
              showAnswer={showAnswer}
              handleShow={this.handleShow}
          /> :
          <Results
            correctCount={correctCount}
            navBack={this.backToDeck}
            restart={this.restart}
          />
        }
        </View>
      </View>
    );
  }
}

const stateToProps = (state, ownProps) => {
  const { deckTitle } = ownProps.navigation.state.params;
  return {
    deck: state[deckTitle],
    ...ownProps,
  }
}
export default connect(stateToProps)(Quiz);
