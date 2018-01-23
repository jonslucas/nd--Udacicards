import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { addCard } from '../actions';

class NewCard extends Component {
  state={
    question: '',
    answer: '',
  }
  onSubmit(navToNext) {

    const { submit } = this.props;

    if(navToNext === 'newCard') {
      // TODO: Nav to NewCard.
    } else if (navToText === 'deckList') {
      // TODO: Nav to Deck List
    }
  }
  setAnswer = (answer)=>(this.setState({answer}))
  setQuestion = (question)=>(this.setState({question}))
  render() {
    const cardCount = 0; //this.props.questions.length;
    return (
      <View >
        <Text h2 >Deck Name</Text>
        <Text h3 >{cardCount} Cards</Text>
        <View >
          <FormLabel>Question</FormLabel>
          <FormInput ref={input=>this.question=input} onChangeText={this.setQuestion}/>
        </View>
        <View >
          <FormLabel>Answer</FormLabel>
          <FormInput ref={input=>this.answer=input} onChangeText={this.setAnswer}/>
        </View>
        <View style={{marginBottom: 10, marginTop: 20}}>
          <Button title="Add Next Card" />
        </View>
        <View style={{marginTop: 10}}>
          <Button title="Complete Deck" />
        </View>
        <Text h4>{JSON.stringify(this.state, null, 2)}</Text>
      </View>
    );
  }
}


const stateToProps = (state, ownProps) => ({...state, ...ownProps});
const dispatchToProps = (dispatch) => ({submit: (card)=>dispatch(addCard(card))});

export default connect(stateToProps, dispatchToProps)(NewCard);
