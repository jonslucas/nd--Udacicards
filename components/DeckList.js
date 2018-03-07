import React, { Component } from 'react';
import { View, Animated} from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { receiveDecks } from '../actions';
import { loadDecks } from '../utils/api';

class DeckItem extends Component {
  state={
    opacity: new Animated.Value(0),
    bounce: new Animated.Value(1),
  }
  componentDidMount() {
    const { opacity } = this.state;

    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
    }).start();

  }
  handlePress = () => {
    const { onPress, deck } = this.props;
    const { bounce } = this.state;

    Animated.sequence([
      Animated.timing(bounce, { toValue: 1.02, duration: 250 }),
      Animated.spring(bounce, { toValue: 1, friction: 3 }),
    ]).start(()=>onPress(deck.title));
  }
  render() {
    const {opacity, bounce} = this.state;
    const { deck } = this.props;
    const cardCount = Object.keys(deck.questions).length;
    const cards = `${cardCount} ${cardCount===1?'card':'cards'}`;

    return(
      <Animated.View style={{opacity, transform: [{scale: bounce}]}}>
        <ListItem
          containerStyle={{height: 100}}
          title={<Text h3>{deck.title}</Text>}
          titleContainerStyle={{marginTop: 15}}
          hideChevron
          badge={{ value:cards, textStyle: {fontSize: 25}, containerStyle: {marginTop: 15} }}
          onPress={this.handlePress}
        />
      </Animated.View>
    );
  }
}

class DeckList extends Component {
  state = {
    ready: false,
    fade: new Animated.Value(0),
    bounce: new Animated.Value(1),
   }
  componentDidMount() {
    const { decks, decksToState } = this.props;
    const { fade } = this.state;

    if (decks.length < 1) {
      loadDecks()
        .then(decksToState)
        .then(_=>this.setState({ready:true}))
        .catch(console.log);
    }
  }
  toDeckDetail = (title) => {
    const { bounce } = this.state;
    const navAct = NavigationActions.navigate({
      routeName: 'DeckDetail',
      params: {deckTitle: title},
    });
    this.props.navigation.dispatch(navAct);

  }
  render() {

    const { decks } = this.props;

    const showDecks = decks.map((deck, ind)=>{
      return (
        <DeckItem key={ind} onPress={this.toDeckDetail} deck={deck} />
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
