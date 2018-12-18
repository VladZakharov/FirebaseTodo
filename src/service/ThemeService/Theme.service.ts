import {ISupportInitialize} from "../../shared/types";
import EStyleSheet from "react-native-extended-stylesheet";
import {Inject, Injectable} from "../../IoC";
import {ThemeName, themes} from "../../theme/theme.types";
import {ServiceTid} from "../service.module-tid";
import {IPreferencesService} from "../PreferencesService";
import WellKnownPreferencesKeys from "../PreferencesService/WellKnownPreferencesKeys";
import {observable} from "mobx";

export interface IThemeService extends ISupportInitialize {
  themeName: ThemeName;

  setTheme(themeName: ThemeName): void;
}

@Injectable()
export class ThemeService implements IThemeService {
  public constructor(@Inject(ServiceTid.IPreferencesService) private _preferences: IPreferencesService) {
  }

  @observable
  public themeName!: ThemeName;

  public async initialize() {
    this.themeName = await this._preferences.get(WellKnownPreferencesKeys.AppTheme) as ThemeName;
    EStyleSheet.build(themes[this.themeName]);
  }

  public async setTheme(themeName: ThemeName): Promise<void> {
    await this._preferences.set(WellKnownPreferencesKeys.AppTheme, themeName);
    EStyleSheet.build(themes[themeName as ThemeName]);
    this.themeName = themeName;
  }
}
