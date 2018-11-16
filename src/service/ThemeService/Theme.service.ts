import {ComponentName, ISupportInitialize, ScreenName} from "../../shared/types";
import EStyleSheet, {AnyObject} from "react-native-extended-stylesheet";
import {Inject, Injectable} from "../../IoC";
import {ComponentStyles} from "../../components";
import {ThemeName, themes} from "../../theme/theme.types";
import {ServiceTid} from "../service.module-tid";
import {IPreferencesService} from "../PreferencesService";
import WellKnownPreferencesKeys from "../PreferencesService/WellKnownPreferencesKeys";
import {observable} from "mobx";

export interface IThemeService extends ISupportInitialize {
  themeName: ThemeName;

  setTheme(themeName: ThemeName): void;

  getStyles(componentName: ScreenName | ComponentName): AnyObject;
}

@Injectable()
export class ThemeService implements IThemeService {
  public constructor(@Inject(ServiceTid.IPreferencesService) private _preferences: IPreferencesService) {
  }

  @observable
  public themeName!: ThemeName;

  public async initialize() {
    this.themeName = await this._preferences.get(WellKnownPreferencesKeys.AppTheme) as ThemeName;
    console.warn('Theme: ' + this.themeName);
    EStyleSheet.build(themes[this.themeName]);
  }

  public async setTheme(themeName: ThemeName): Promise<void> {
    await this._preferences.set(WellKnownPreferencesKeys.AppTheme, themeName);
    EStyleSheet.build(themes[themeName as ThemeName]);
    this.themeName = themeName;
    console.warn('setTheme: ' + themeName);
  }

  public getStyles(componentName: ScreenName | ComponentName): AnyObject {
    return EStyleSheet.create(ComponentStyles[componentName] as AnyObject)
  }
}
