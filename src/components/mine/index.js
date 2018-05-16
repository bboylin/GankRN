import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

/**
 * Screen for third tab.
 * You usually will have this in a separate file.
 */
export default class Mine extends Component {
    static navigationOptions = {
      tabBarLabel: '我的',
      tabBarIcon: () => <Icon size={24} name="person" color="black" />
    }
  
    render() {
      return (
        <View>
          <Text>我的</Text>
        </View>
      )
    }
  }