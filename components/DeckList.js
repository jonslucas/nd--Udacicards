import React, { Component } from 'react';
import {View} from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

class DeckList extends Component {
  toDeckDetail = (title) => {
    const navAct = NavigationActions.navigate({
      routeName: 'DeckDetail',
      params: {key: title},
    });
    this.props.navigation.dispatch(navAct);
  }
  render() {

    const { decks } = this.props;
    const showDecks = decks.map((deck, ind)=>{
      const cardCount = deck.questions.length;

      const cards = `${cardCount} ${cardCount===1?'card':'cards'}`;
      return (
        <ListItem
          containerStyle={{height: 100}}
          key={ind}
          title={<Text h3> {deck.title}</Text>}
          titleContainerStyle={{marginTop: 15}}
          hideChevron
          badge={{ value:cards, textStyle: {fontSize: 25}, containerStyle: {marginTop: 15} }}
          onPress={()=>this.toDeckDetail(deck.title)}
        />
      );

    })
    return (
      <List>
        {
          showDecks
        }
      </List>
    );
  }
}
const stateTopProps = (state, ownProps) => (
  {
    decks: Object.keys(state).map(key=>state[key]),
    ...ownProps,
  }
);
export default connect(stateTopProps)(DeckList);
