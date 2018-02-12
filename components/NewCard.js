import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { NavigationActions } from 'react-navigation';

class NewCard extends Component {
  state={
    question: '',
    answer: '',
  }
  onSubmit(navToNext) {

    const { submit, navigation } = this.props;
    const { deckTitle } = navigation.state.params;
    const { question, answer } = this.state;
    let navAction;
    if(navToNext === 'newCard') {
      // TODO: Nav to NewCard.
      navAction = NavigationActions.navigate({
        routeName: 'NewCard',
        params: {deckTitle}
      });
    } else if (navToNext === 'deckList') {
      // TODO: Nav to Deck List
      navAction = NavigationActions.navigate({
        routeName: 'DeckList'
      });
    }
    submit(deckTitle, {question, answer});
    navigation.dispatch(navAction);
  }
  setAnswer = (answer)=>(this.setState({answer}))
  setQuestion = (question)=>(this.setState({question}))
  render() {
    const { cardCount, navigation } = this.props;
    const { deckTitle } = navigation.state.params;
    const countStr = `${cardCount} card${cardCount===1?'':'s'}`;
    return (
      <View >
        <Text h2 >{deckTitle}</Text>
        <Text h3 >{countStr}</Text>
        <View >
          <FormLabel>Question</FormLabel>
          <FormInput ref={input=>this.question=input} onChangeText={this.setQuestion}/>
        </View>
        <View >
          <FormLabel>Answer</FormLabel>
          <FormInput ref={input=>this.answer=input} onChangeText={this.setAnswer}/>
        </View>
        <View style={{marginBottom: 10, marginTop: 20}}>
          <Button title="Add Next Card" onPress={()=>this.onSubmit('newCard')} />
        </View>
        <View style={{marginTop: 10}}>
          <Button title="Complete Deck" onPress={()=>this.onSubmit('deckList')} />
        </View>
        {/* <Text h4>{JSON.stringify(this.state, null, 2)}</Text> */}
        <Text h4>{JSON.stringify(this.props, null, 2)}</Text>
      </View>
    );
  }
}


const stateToProps = (state, ownProps) => {
  const {deckTitle} = ownProps.navigation.state.params;

    const deck = state.hasOwnProperty(deckTitle) ? state[deckTitle] : {questions: []};
    return {
      ...ownProps,
      cardCount: deck.questions.length
    };
}
const dispatchToProps = (dispatch) => ({submit: (title, card)=>dispatch(addCard(title, card))});

export default connect(stateToProps, dispatchToProps)(NewCard);
