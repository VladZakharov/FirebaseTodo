import './../IoC';
import * as React from 'react';
import {Text, TextInput, View} from 'react-native';

import App from '../App';
import {InjectLazy} from "../IoC";
import {IThemeService} from "../service/ThemeService";
import {ServiceTid} from "../service/service.module-tid";
import {IPreferencesService} from "../service/PreferencesService";
import {IAuthService} from "../service/AuthService/AuthService";
import {ITodoService} from "../service/TodoService";
import firebase from "react-native-firebase";
import {ILocaleService} from "../service/LocaleService/Locale.service";

class ReactApplication extends React.Component<{}, { isReady: boolean }> {
  public state = {isReady: false};
  @InjectLazy(ServiceTid.IPreferencesService) private _preferences!: IPreferencesService;
  @InjectLazy(ServiceTid.IThemeService) private _theme!: IThemeService;
  @InjectLazy(ServiceTid.ILocaleService) private _locale!: ILocaleService;
  @InjectLazy(ServiceTid.ITodoService) private _todoService!: ITodoService;
  @InjectLazy(ServiceTid.IAuthService) private _authService!: IAuthService;

  constructor(props: any) {
    super(props);
    this._preload();
  }

  public render() {
    return (
      <View style={{flex: 1}}>
        {this.state.isReady && <App />}
      </View>
    );
  }

  private async _preload() {
    await this._preferences.initialize();
    await this._theme.initialize();
    await this._locale.initialize();
    await this._authService.initialize();
    await this._todoService.initialize();

    const db = firebase.firestore();
    await db.settings({
      timestampsInSnapshots: true
    });

    this.setState({isReady: true})
  }
}

//не разрешает масштабировать текст на iOS
function fixAllowFontScaling() {
  if (!(Text as any).defaultProps) {
    (Text as any).defaultProps = {};
  }
  (Text as any).defaultProps.allowFontScaling = false;

  if (!(TextInput as any).defaultProps) {
    (TextInput as any).defaultProps = {};
  }
  (TextInput as any).defaultProps.allowFontScaling = false;
}

function bootstrapper() {
  fixAllowFontScaling();
  return (props: any) => new ReactApplication(props);
}

export default bootstrapper

