import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { orange, green } from '../utils/colors';

const Results = props => {

    const { correctCount, navBack, restart } = props;

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text h3>{correctCount} answered correctly</Text>
        </View>
        <View style={{flex: 3}}>
          <View style={{marginBottom: 30}} >
            <Button
              raised
              title="Retake Quiz"
              buttonStyle={{backgroundColor: green}}
              onPress={restart}
            />
          </View>
          <View style={{marginTop: 15}} >
            <Button
              raised
              title="Back to Deck"
              buttonStyle={{backgroundColor: orange}}
              onPress={navBack}
            />
          </View>
        </View>
      </View>
    );
}

export default Results;
