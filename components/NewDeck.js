import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { orange } from '../utils/colors';
import { NavigationActions } from 'react-navigation';

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

      this.props.navigation.dispatch(NavigationActions.navigate({
        routeName: 'CardDetail',
        params: {deckTitle: title}
      }));
    }
  }
  render() {
    const { title, error } = this.state;

    const { navigation } = this.props;

    return (
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
          <Text h2 style={{flex: 1}}>Name Your Deck</Text>
        </View>
        <View style={{flex: 3}}>
          <FormLabel labelStyle={{fontSize: 28}}>Name</FormLabel>
          <FormInput
            containerStyle={{paddingBottom: 25}}
            inputStyle={{fontSize: 24}}
            ref={input=>this.input=input}
            onChangeText={this.onInputChange}
            defaultValue={title} />
          {error ? <FormValidationMessage>{'This deck needs a name'}</FormValidationMessage> : <View></View>}
          <Button title='Submit' onPress={this.saveDeck} buttonStyle={{backgroundColor: orange}}/>
        </View>

      </View>
    );
  }
}


const stateToProps = (state, ownProps) => ({...state, ...ownProps});
const dispatchToProps = (dispatch) => ({ submit: (title)=>dispatch(addDeck(title))})

export default connect(stateToProps, dispatchToProps)(NewDeck);
