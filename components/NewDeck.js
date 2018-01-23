import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { addDeck } from '../actions';

class NewDeck extends Component {
  state={
    title: null,
    error: false,
  }
  onInputChange = (title) => {
    // console.log(title);
    this.setState({title});
  }
  saveDeck = () => {
    const { title } = this.state;
    if (!title) this.setState({error: true});
    else {
      this.props.submit(title);

      this.setState({title: null});

      //TODO: Navigate to NewCard;

    }
  }
  render() {
    const { title, error } = this.state;

    return (
      <View>
        <View>
          <Text h2>Name Your Deck</Text>
          <FormLabel>Name</FormLabel>
          <FormInput ref={input=>this.input=input} onChangeText={this.onInputChange} defaultValue={title} />
          {error ? <FormValidationMessage>{'This deck needs a name'}</FormValidationMessage> : <View></View>}
        </View>
        <View>
          <Button title='Submit' onPress={this.saveDeck} />
        </View>
      </View>
    );
  }
}


const stateToProps = (state, ownProps) => ({...state, ...ownProps});
const dispatchToProps = (dispatch) => ({ submit: (title)=>dispatch(addDeck(title))})

export default connect(stateToProps, dispatchToProps)(NewDeck);
