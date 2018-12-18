import React from "react";
import {styled, StyledProps} from "../StyledComponent";
import {ScreenAuthStyles} from "./ScreenAuth.styles";
import {InjectLazy} from "../../IoC";
import {ServiceTid} from "../../service/service.module-tid";
import {IAuthService} from "../../service/AuthService/AuthService";
import {Layout} from "../Shared/Layout";
import {Button} from "../Shared/Button";
import {localized, LocalizedProps} from "../LocalizedComponent";
import {ScreenAuthLocales} from "./ScreenAuth.locales";

type Props = StyledProps & LocalizedProps

@styled(ScreenAuthStyles)
@localized(ScreenAuthLocales)
export class ScreenAuth extends React.Component<Props> {
  @InjectLazy(ServiceTid.IAuthService) private _authService!: IAuthService;

  signIn = async () => {
    const error = await this._authService.signIn();
    error && console.warn(error);
  }

  render() {
    return (
      <Layout style={{justifyContent: 'center', alignItems: 'center'}}>
        <Button content={this.props.t('SignIn')} onPress={this.signIn} />
      </Layout>
    )
  }
}