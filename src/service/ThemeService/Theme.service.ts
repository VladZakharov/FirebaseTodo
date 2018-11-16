import {ComponentName, ISupportInitialize, RegisteredComponent, ScreenName} from "../../shared/types";
import EStyleSheet, {AnyObject} from "react-native-extended-stylesheet";
import {Injectable} from "../../IoC";
import {ComponentStyles} from "../../theme";

export interface IThemeService extends ISupportInitialize {
  getStyles(componentName: ScreenName | ComponentName): AnyObject;
}

@Injectable()
export class ThemeService implements IThemeService {
  // public constructor() {
  // }

  public async initialize() {
    EStyleSheet.build();
  }

  getStyles(componentName: ScreenName | ComponentName): AnyObject {
    return EStyleSheet.create(ComponentStyles[componentName] as AnyObject)
    // return EStyleSheet.create({
    //   container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#F5FCFF',
    //   },
    //   welcome: {
    //     fontSize: 20,
    //     textAlign: 'center',
    //     margin: 10,
    //   },
    //   instructions: {
    //     textAlign: 'center',
    //     color: '#333333',
    //     marginBottom: 5,
    //   },
    // });
  }
}
