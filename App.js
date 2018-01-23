import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { decks } from './reducers';
import NewDeck from './components/NewDeck';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(decks)} >
        <View>
          <Text>Hello World</Text>
          <NewDeck />
        </View>

      </Provider>
    );
  }
}
