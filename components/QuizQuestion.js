import React from 'react';
import {View} from 'react-native';
import { Text, Button } from 'react-native-elements';
import { red, green, blue } from '../utils/colors';

const Question = (props) => {
  const { card, showAnswer } = props;
  const { handleCorrect, handleWrong, handleShow } = props;
  const { question, answer } = card;
  return (
    <View style={{flex: 1, justifyContent: 'space-around'}}>
      <View style={{flex: 1}}>
        <Text h2>Question:</Text>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text h3>{question}</Text>
        </View>
      </View>
      <View style={{flex: 2, justifyContent: 'flex-start', alignItems: 'center'}}>
        {showAnswer &&
          <Text h4>{answer}</Text>
        }
      </View>
      <View style={{flex: 1}}>
        {!showAnswer ?
            <Button
              raised
              onPress={handleShow}
              title="Show Answer"
              textStyle={{fontSize: 25}}
              icon={{}}
              buttonStyle={{backgroundColor: blue}}
            /> :
            <View style={{flex: 1}}>
              <View style={{flex: 1}}>
                <Button
                  raised
                  onPress={handleCorrect}
                  title="Correct"
                  textStyle={{fontSize: 25}}
                  icon={{}}
                  buttonStyle={{backgroundColor: green}}
                />
              </View>
              <View style={{flex: 1}}>
                <Button
                  raised
                  onPress={handleWrong}
                  title="Incorrect"
                  textStyle={{fontSize: 25}}
                  icon={{}}
                  buttonStyle={{backgroundColor: red}}
                />
              </View>
            </View>
          }

      </View>
    </View>
  );
};

export default Question;
