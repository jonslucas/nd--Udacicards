import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { deleteDeck } from '../actions';
import { removeDeck } from '../utils/api';

const DeckDetail = (props) => {
  const { deck, removeDeckFromState, navigation } = props;
  const cardCount = Object.keys(deck.questions).length;
  return (
    <View>
      <Text h3>{deck.title}</Text>
      <Text h4>{cardCount} {cardCount === 1 ? 'card' : 'cards'} </Text>
      {/* <Text h4>{JSON.stringify(props, null, 2)}</Text> */}
      <Button
        raised
        icon={{name: 'page-multiple', type: 'foundation'}}
        title='Manage Cards'
        onPress={()=>{
          navigation.dispatch(NavigationActions.navigate({
            routeName: 'CardList',
            params: { deck: deck.title }
          }));
        }}
      />
      <Button
        raised
        icon={{name: 'page-add', type: 'foundation'}}
        title='Add Cards'
        onPress={()=>{
          navigation.dispatch(NavigationActions.navigate({
            routeName: 'NewCard',
            params: {deckTitle: deck.title}
          }));
        }}
      />
      <Button
        raised
        icon={{name: 'trophy', type: 'foundation'}}
        title='Quiz'
        onPress={()=>{
          navigation.dispatch(NavigationActions.navigate({
            routeName: 'Quiz',
          }));
        }}
      />
      <Button
        raised
        icon={{name: 'x', type: 'foundation'}}
        title='Delete'
        onPress={()=>{
          removeDeck(deck.title);
          removeDeckFromState(deck.title);
          navigation.dispatch(NavigationActions.navigate({
            routeName: 'DeckList',
          }));
        }}
      />

    </View>
  );
}


const stateToProps = (state, ownProps) => {
  const deck = ownProps.navigation.state.params.key;
  return {
    deck: state[deck],
    ...ownProps,
  }
};

const dispToProps = dispatch => ({
  removeDeckFromState: (deck)=>(dispatch(deleteDeck(deck))),
});

export default connect(stateToProps, dispToProps)(DeckDetail);
