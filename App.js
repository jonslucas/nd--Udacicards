import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { decks } from './reducers';
import NewCard from './components/NewCard';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(decks)} >
        <View>
          <Text>Hello World</Text>
          <NewCard />
        </View>

      </Provider>
    );
  }
}
