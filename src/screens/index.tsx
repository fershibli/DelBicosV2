import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home';
import { NotFound } from './NotFound';

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeScreen,
      options: {
        title: 'DelBicos',
      },
    },
    /*
    *************************************
    Place your screens here, for example:
    *************************************
    ScreenName: {
      screen: ScreenComponent,
      linking: {
        path: 'screen-name',
      },
      options: {
        title: 'Screen Title',
      },
    },
    */
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
