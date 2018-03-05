import React, { Component } from 'react';
import {View} from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { receiveDecks } from '../actions';
import { loadDecks } from '../utils/api';

class DeckList extends Component {
  state = { ready: false }
  componentDidMount() {
    const { decks, decksToState } = this.props;

    if (decks.length < 1) {
      console.log('Calling loadDecks');
      loadDecks()
        .then(decksToState)
        .then(_=>this.setState({ready:true}))
        .catch(console.log);
    }


  }
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

    });
    return (
      <View>
        <List>
          { showDecks }
        </List>

      </View>
    );
  }
}
const stateToProps = (state, ownProps) => {
  const decks = Object.keys(state)
                .map(key=>state[key])
                .filter(d=>{
                  const { title, toDelete } = d;
                  return d.toDelete === false;
                });
  return {
    decks,
    ...ownProps,
  }
};
const dispToProps = dispatch => (
  {
    decksToState: (decks) => dispatch(receiveDecks(decks))
  }
);
export default connect(stateToProps, dispToProps)(DeckList);
