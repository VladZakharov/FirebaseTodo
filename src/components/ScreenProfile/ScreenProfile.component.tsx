import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {InjectLazy} from "../../IoC";
import {ServiceTid} from "../../service/service.module-tid";
import {IAuthService} from "../../service/AuthService/AuthService";
import {observer} from "mobx-react";
import {styled, StyledProps} from "../";
import {ScreenProfileStyles} from "./ScreenProfile.styles";
import {IThemeService} from "../../service/ThemeService";
import {localized, LocalizedProps} from "../LocalizedComponent";
import {ScreenProfileLocales} from "./ScreenProfile.locales";
import {ILocaleService} from "../../service/LocaleService/Locale.service";
import {Layout} from "../Shared/Layout";
import {ThemeName} from "../../theme/theme.types";

type Props = LocalizedProps & StyledProps

@localized(ScreenProfileLocales)
@styled(ScreenProfileStyles)
@observer
export class ScreenProfile extends React.Component<Props> {
  @InjectLazy(ServiceTid.IAuthService) private _authService!: IAuthService;
  @InjectLazy(ServiceTid.IThemeService) private _themeService!: IThemeService;
  @InjectLazy(ServiceTid.ILocaleService) private _localeService!: ILocaleService;

  signOut = async () => {
    const error = await this._authService.signOut();
    error && console.warn(error);
  }

  render() {
    const {styles} = this.props;
    return (
      <Layout>
        <Text style={styles.instructions}>Тема: {this._themeService.themeName}</Text>
        <Text style={styles.instructions}>{this._authService.userUid}</Text>

        <TouchableOpacity onPress={this.signOut}>
          <Text style={styles.instructions}>{this.props.t('signOut')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._localeService.setLocale('ru')}>
          <Text style={styles.instructions}>RU</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._localeService.setLocale('en')}>
          <Text style={styles.instructions}>EN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._themeService.setTheme(ThemeName.Default)}>
          <Text style={styles.instructions}>Default theme</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._themeService.setTheme(ThemeName.Light)}>
          <Text style={styles.instructions}>Light theme</Text>
        </TouchableOpacity>

      </Layout>
    );
  }
}