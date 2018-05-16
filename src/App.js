import { NavigationComponent } from 'react-native-material-bottom-navigation';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from './components/home';
import Girls from './components/girls';
import Mine from './components/mine';

/**
 * react-navigation's TabNavigator.
 */
const MyApp = TabNavigator(
  {
    Home: { screen: Home },
    Girls: { screen: Girls },
    Mine: { screen: Mine }
  },
  {
    tabBarComponent: NavigationComponent,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      bottomNavigationOptions: {
        labelColor: 'black',
        rippleColor: 'black',
        tabs: {
          Home: {
            barBackgroundColor: '#ffffff'
          },
          Girls: {
            barBackgroundColor: '#ffffff'
          },
          Mine: {
            barBackgroundColor: '#ffffff'
          }
        }
      }
    }
  }
)

export default MyApp;

// just for dismissing some warnings
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Class RCTCxxModule was not exported']);
YellowBox.ignoreWarnings(['source.uri should not be']);