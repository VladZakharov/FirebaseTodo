import {ISupportInitialize} from "../../shared/types/ISupportInitialize.types";
import EStyleSheet from "react-native-extended-stylesheet";
import {Injectable} from "../../IoC";

export interface IThemeService extends ISupportInitialize {
}

@Injectable()
export class ThemeService implements ISupportInitialize {
  // public constructor() {
  // }

  public async initialize() {
    EStyleSheet.build();
  }
}
