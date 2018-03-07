import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { deleteDeck } from '../actions';
import { removeDeck } from '../utils/api';
import { red, blue, green, lightPurp, orange } from '../utils/colors';

const DeckDetail = (props) => {
  const { deck, removeDeckFromState, navigation } = props;
  const cardCount = Object.keys(deck.questions).length;
  return (
    <View style={{flex:1, flexDirection: 'column', justifyContent:'space-between'}}>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginTop: 75}}>
        <Text h3>{deck.title}</Text>
        <Text h4>{cardCount} {cardCount === 1 ? 'card' : 'cards'} </Text>
      </View>
      <View style={{flex: 2}}>
        <Button
          raised
          buttonStyle={{backgroundColor: blue, marginBottom: 50}}
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
          buttonStyle={{backgroundColor: green, marginBottom: 50}}
          icon={{name: 'page-add', type: 'foundation'}}
          title='Add Cards'
          onPress={()=>{
            navigation.dispatch(NavigationActions.navigate({
              routeName: 'CardDetail',
              params: {deckTitle: deck.title}
            }));
          }}
        />
        <Button
          raised
          buttonStyle={{backgroundColor: orange, marginBottom: 50 }}
          icon={{name: 'trophy', type: 'foundation'}}
          title='Quiz'
          onPress={()=>{
            navigation.dispatch(NavigationActions.navigate({
              routeName: 'Quiz',
              params: { deckTitle: deck.title }
            }));
          }}
        />
        <Button
          raised
          buttonStyle={{backgroundColor: red, marginBottom: 50}}
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
        <Button
          raised
          buttonStyle={{backgroundColor: lightPurp}}
          icon={{}}
          title="Back to Deck List"
          onPress={()=>(
            navigation.dispatch(NavigationActions.navigate({
              routeName: 'DeckList',
            }))
          )}
        />

      </View>
    </View>
  );
}


const stateToProps = (state, ownProps) => {
  const title = ownProps.navigation.state.params.deckTitle;
  return {
    deck: state[title],
    ...ownProps,
  }
};

const dispToProps = dispatch => ({
  removeDeckFromState: (deck)=>(dispatch(deleteDeck(deck))),
});

export default connect(stateToProps, dispToProps)(DeckDetail);
