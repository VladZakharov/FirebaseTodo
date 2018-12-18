import React, {Component} from 'react';
import {View} from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import {createStackNavigator} from "react-navigation";
import {InjectLazy} from "./IoC";
import {AppTid} from "./App.module-tid";
import {INavigationService} from "./navigation";
import {ScreenInitializer} from "./components/ScreenInitializer";
import {ScreenAuth} from "./components/ScreenAuth";
import {ScreenMain} from "./components/ScreenMain";
import {ScreenProfile} from "./components/ScreenProfile";

const AppNav = createStackNavigator(
  {
    ScreenInitializer: {screen: ScreenInitializer},
    ScreenAuth: {screen: ScreenAuth},
    ScreenMain: {screen: ScreenMain},
    ScreenProfile: {screen: ScreenProfile}
  },
  {
    initialRouteName: 'ScreenInitializer',
    headerMode: 'none',
    transitionConfig: () => ({
      transitionSpec: {duration: 0}
    }),
    cardStyle: {shadowColor: 'transparent'}
  }
);

type Props = {};
export default class App extends Component<Props> {
  @InjectLazy(AppTid.INavigationService) private _navigationManager!: INavigationService;

  public render() {
    return (
      <View style={SS.container}>
        <AppNav ref={this._setNavRef} />
      </View>
    );
  }

  private _setNavRef = (nav: any) => (this._navigationManager as any).setNavigator(nav);
}

const SS = EStyleSheet.create({
  container: {flex: 1}
});
