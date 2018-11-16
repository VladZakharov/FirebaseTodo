import React from 'react';
import {Animated, Platform, Text} from 'react-native';
import {StyledComponent} from "../index";
import {InjectLazy} from "../../IoC";
import {ServiceTid} from "../../service/service.module-tid";
import {IPreferencesService} from "../../service/PreferencesService";
import {ThemeName} from "../../theme/theme.types";
import View = Animated.View;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

interface Props {
}

export class ScreenMain extends StyledComponent<Props> {
  @InjectLazy(ServiceTid.IPreferencesService) protected _preferences!: IPreferencesService;

  componentDidMount() {
    setTimeout(async () => {
      const themeName = this._themeService.themeName;
      const nextTheme = themeName == ThemeName.Light ? ThemeName.Default : ThemeName.Light;
      await this._themeService.setTheme(nextTheme);
    }, 1000);
  }

  render() {
    const {styles} = this;
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>Тема: {this._themeService.themeName}</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}