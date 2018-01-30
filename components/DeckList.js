import React, { Component } from 'react';
import {View} from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';
import { connect } from 'react-redux';

class DeckList extends Component {
  render() {

    const { decks } = this.props;
    const showDecks = decks.map((deck, ind)=>{
      const subtitle = `${deck.questions.length} cards`;
      return (
        <ListItem
          key={ind}
          title={deck.title}
          subtitle={subtitle}
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
