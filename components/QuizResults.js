import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { orange, green } from '../utils/colors';
import { clearLocalNotification } from '../utils/notifications';

class Results extends Component {

  componentDidMount() {
    clearLocalNotification();
  }

  render() {
    const { correctCount, navBack, restart } = this.props;

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
}

export default Results;
