import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { addCard, deleteCard } from '../actions';
import { saveToStorage } from '../utils/api';
import { NavigationActions } from 'react-navigation';
import { blue, purple } from '../utils/colors';

class CardDetail extends Component {
  state={
    question: this.props.prevQuestion || null,
    answer: this.props.prevAnswer || null,
  }
  onSubmit(navToNext) {

    const { submit, navigation, prevQuestion, prevAnswer, remove } = this.props;
    const { deckTitle } = navigation.state.params;
    const { question, answer } = this.state;
    let navAction;
    if(navToNext === 'newCard') {
      navAction = NavigationActions.navigate({
        routeName: 'CardDetail',
        params: {deckTitle}
      });
    } else if (navToNext === 'deckList') {
      navAction = NavigationActions.navigate({
        routeName: 'DeckList'
      });
    }
    if (question && answer ) {
      remove(deckTitle, {
        question: prevQuestion,
        answer: prevAnswer,
      });
      submit(deckTitle, {question, answer});
      saveToStorage({
        title: deckTitle,
        questions:  {[question]: answer},
        toDelete: false,
      });
    }
    navigation.dispatch(navAction);

  }
  setAnswer = (answer)=>(this.setState({answer}))
  setQuestion = (question)=>(this.setState({question}))
  render() {
    const { cardCount, navigation, prevQuestion, prevAnswer } = this.props;
    const { deckTitle } = navigation.state.params;
    const countStr = `${cardCount} card${cardCount===1?'':'s'}`;
    return (
      <View >
        <Text h2 >{deckTitle}</Text>
        <Text h3 >{countStr}</Text>
        <View >
          <FormLabel>Question</FormLabel>
          <FormInput
            ref={input=>this.question=input}
            onChangeText={this.setQuestion}
            defaultValue={prevQuestion}
          />
        </View>
        <View >
          <FormLabel>Answer</FormLabel>
          <FormInput
            ref={input=>this.answer=input}
            onChangeText={this.setAnswer}
            defaultValue={prevAnswer}
          />
        </View>
        <View style={{marginBottom: 10, marginTop: 20}}>
          <Button
            title="Submit and Add New"
            onPress={()=>this.onSubmit('newCard')}
            buttonStyle={{backgroundColor: blue }}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Button
            title="Complete Deck"
            onPress={()=>this.onSubmit('deckList')}
            buttonStyle={{backgroundColor: purple}}
          />
        </View>
      </View>
    );
  }
}


const stateToProps = (state, ownProps) => {
  const {deckTitle, question, answer} = ownProps.navigation.state.params;

    const deck = state.hasOwnProperty(deckTitle) ? state[deckTitle] : {questions: []};
    return {
      ...ownProps,
      cardCount: Object.keys(deck.questions).length,
      prevQuestion: question,
      prevAnswer: answer,
    };
}
const dispatchToProps = (dispatch) => ({
  submit: (title, card)=>dispatch(addCard(title, card)),
  remove: (title, card)=>dispatch(deleteCard(title, card)),
});

export default connect(stateToProps, dispatchToProps)(CardDetail);
