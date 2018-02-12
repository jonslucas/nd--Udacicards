import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';


const DeckDetail = (props) => {
  const { deck } = props;
  const cardCount = deck.questions.length;
  return (
    <View>
      <Text h3>{deck.title}</Text>
      <Text h4>{cardCount} {cardCount === 1 ? 'card' : 'cards'} </Text>
      {/* <Text h4>{JSON.stringify(props, null, 2)}</Text> */}
      <Button
        raised
        icon={{name: 'page-multiple', type: 'foundation'}}
        title='Manage Cards'
      />
      <Button
        raised
        icon={{name: 'page-add', type: 'foundation'}}
        title='Add Cards'
      />
      <Button
        raised
        icon={{name: 'trophy', type: 'foundation'}}
        title='Quiz'
      />

    </View>
  );
}


const stateToProps = (state, ownProps) => {
  const deck = ownProps.navigation.state.params.key;
  return {
    deck: state[deck],
  }
}

export default connect(stateToProps)(DeckDetail);
