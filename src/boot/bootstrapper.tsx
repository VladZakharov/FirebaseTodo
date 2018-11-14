import './../IoC';
import * as React from 'react';
import {Text, TextInput, View} from 'react-native';

import App from '../App';
import {InjectLazy} from "../IoC";
import {IThemeService} from "../service/ThemeService";
import {ServiceTid} from "../service/service.module-tid";

class ReactApplication extends React.Component<{}, { isReady: boolean }> {
  public state = {isReady: false};
  @InjectLazy(ServiceTid.IThemeService) private _themeService!: IThemeService;

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
    await this._themeService.initialize();

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

