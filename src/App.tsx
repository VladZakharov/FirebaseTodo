import React, {Component} from 'react';
import {View} from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import {createStackNavigator} from "react-navigation";
import {ScreenMain} from "./components/ScreenMain";
import {InjectLazy} from "./IoC";
import {AppTid} from "./App.module-tid";
import {INavigationService} from "./navigation";

const AppNav = createStackNavigator(
  {
    ScreenMain: {screen: ScreenMain},
  },
  {
    initialRouteName: 'ScreenMain',
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
