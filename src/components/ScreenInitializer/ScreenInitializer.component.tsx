import {styled} from "../StyledComponent";
import React from "react";
import {SafeAreaView, Text, View} from "react-native";
import {ScreenInitializerStyles} from "./ScreenInitializer.styles";
import {InjectLazy} from "../../IoC";
import {ServiceTid} from "../../service/service.module-tid";
import {IAuthService} from "../../service/AuthService/AuthService";
import {AppTid} from "../../App.module-tid";
import {INavigationService} from "../../navigation";
import {autorun} from "mobx";

@styled(ScreenInitializerStyles)
export class ScreenInitializer extends React.Component {
  @InjectLazy(ServiceTid.IAuthService) private _authService!: IAuthService;
  @InjectLazy(AppTid.INavigationService) private _navigationManager!: INavigationService;

  componentDidMount(): void {
    setTimeout(() => {
      autorun(() => {
        const nextScreen = this._authService.isSignedIn ? 'ScreenMain' : 'ScreenAuth';
        this._navigationManager.resetTo(nextScreen)
      });
    }, 1000);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{flex: 1}}>
          <Text>loading...</Text>
        </View>
      </SafeAreaView>
    )
  }
}