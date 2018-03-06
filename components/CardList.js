import React from 'react';
import { View } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';


const CardList = (props) => {
  const { cards, deckTitle, navigation } = props;
  return (
    <View>
      { cards.map((card, ind)=>{
        const { question, answer } = card;
        return (
          <ListItem
            containerStyle={{height: 100}}
            key={ind}
            title={ <Text h4> {question} </Text>}
            titleContainerStyle={{marginTop: 15}}
            onPress={()=>{
              navigation.dispatch(NavigationActions.navigate({
                routeName: 'CardDetail',
                params: {
                  deckTitle,
                  question,
                  answer,
                }
              }));
            }}
          />
        );
      })}
    </View>
  );
}


const stateToProps = (state, ownProps) => {
  const { deck } = ownProps.navigation.state.params;
  const { questions } = state[deck];
  const cards = Object.keys(questions).map(k=>({question: k, answer: questions[k] }))
  return {
    deckTitle: deck,
    cards,
    ...ownProps,
  };
}

export default connect(stateToProps)(CardList);
