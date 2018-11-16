import {ComponentName, ISupportInitialize, ScreenName} from "../../shared/types";
import EStyleSheet, {AnyObject} from "react-native-extended-stylesheet";
import {Injectable} from "../../IoC";
import {ComponentStyles} from "../../components";
import {ThemeName, themes} from "../../theme/theme.types";

export interface IThemeService extends ISupportInitialize {
  setTheme(themeName: ThemeName): void;
  getStyles(componentName: ScreenName | ComponentName): AnyObject;
}

@Injectable()
export class ThemeService implements IThemeService {
  // public constructor() {
  // }

  public async initialize() {
    EStyleSheet.build(themes.Default);
  }

  setTheme(themeName: ThemeName): void {
  }

  getStyles(componentName: ScreenName | ComponentName): AnyObject {
    return EStyleSheet.create(ComponentStyles[componentName] as AnyObject)
  }
}
