import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

/**
 * Screen for second tab.
 * You usually will have this in a separate file.
 */
export default class Girls extends Component {
    static navigationOptions = {
      tabBarLabel: '美图',
      tabBarIcon: () => <Icon size={24} name="photo-library" color="black" />
    }
  
    render() {
      return (
        <View>
          <Text>美图</Text>
        </View>
      )
    }
  }