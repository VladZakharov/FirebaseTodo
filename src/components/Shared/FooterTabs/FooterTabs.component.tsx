import transform from 'lodash/transform';
import {TabRouteItem} from "./FooterTabs.types";
import * as React from "react";
import {createTabNavigator, NavigationActions, NavigationScreenProp, NavigationStateRoute} from "react-navigation";
import {styled, StyledProps} from "../../StyledComponent";
import {FooterTabsStyles} from "./FooterTabs.styles";
import {Text, TouchableHighlight, View} from "react-native";
import {InjectLazy} from "../../../IoC";
import {AppTid} from "../../../App.module-tid";
import {INavigationService} from "../../../navigation";
import {localized, LocalizedProps} from "../../LocalizedComponent";
import {LocaleMap} from "../../../service/LocaleService";

interface NavigationProps {
  navigation: NavigationScreenProp<any>;
  navigationState: NavigationStateRoute<any>;
}

type Props = LocalizedProps & StyledProps & NavigationProps

export function createFooterTabBar(routes: TabRouteItem[], locales: LocaleMap) {

  @localized(locales)
  @styled(FooterTabsStyles)
  class FooterTabs extends React.Component<Props> {
    @InjectLazy(AppTid.INavigationService) private _navigation!: INavigationService;

    render() {
      const {props} = this;
      const activeIndex = props.navigation.state.index;
      return (
        <View style={{padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          {
            routes.map((item, index) => {
              const active = activeIndex === index;
              return (
                <TouchableHighlight key={item.routeName} onPress={() => {
                  if (item.replaceRouteName) {
                    this._navigation.dispatch(NavigationActions.navigate(Object.assign({}, item, {routeName: item.replaceRouteName})));
                  } else {
                    this._navigation.dispatch(NavigationActions.navigate(item));
                  }
                }}>
                  <View style={{padding: 20, backgroundColor: '#c694c2'}}>
                    {!!item.title && <Text style={{color: '#fff'}}>{props.t(item.title)}</Text>}
                  </View>
                </TouchableHighlight>
              )
            })
          }
        </View>
      )
    }
  }

  return createTabNavigator(
    transform(routes, (acc, item) => {
      acc[item.routeName] = {screen: item.screen};
    }, {}), {
      swipeEnabled: false,
      animationEnabled: true,
      tabBarPosition: 'bottom',
      tabBarComponent: FooterTabs,
      backBehavior: 'none'
    }
  );
}