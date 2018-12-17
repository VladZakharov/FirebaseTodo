import React from "react";
import {SafeAreaView, Text, TouchableOpacity} from "react-native";
import {styled} from "../StyledComponent";
import {ScreenAuthStyles} from "./ScreenAuth.styles";
import {InjectLazy} from "../../IoC";
import {ServiceTid} from "../../service/service.module-tid";
import {IAuthService} from "../../service/AuthService/AuthService";

interface Props {

}

@styled(ScreenAuthStyles)
export class ScreenAuth extends React.Component<Props> {
  @InjectLazy(ServiceTid.IAuthService) private _authService!: IAuthService;

  signIn = async () => {
    const error = await this._authService.signIn();
    error && console.warn(error);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <TouchableOpacity onPress={this.signIn}>
          <Text>signIn</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}