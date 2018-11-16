import DefaultPreference from 'react-native-default-preference';
import WellKnownPreferencesKeys from './WellKnownPreferencesKeys';
import shortid from 'shortid';
import {Injectable} from "../../IoC";
import {ISupportInitialize} from "../../shared/types";
import {ThemeName} from "../../theme/theme.types";

// это нужно так как сторонние либы могут сохранять свои параметры в NSUserDefaults(ios), а clearAll не должен их стереть
const appPrefix = '@todoapp:';

export interface IPreferencesService extends ISupportInitialize {
  set(key: string, value: string): Promise<any>;
  get(key: string): Promise<string>;
  clear(key: string): Promise<string>;
  reset(...key: string[]): Promise<any[]>;
}

@Injectable()
export class PreferencesService implements IPreferencesService {

  async initialize(): Promise<any> {
    await this._processFirstLaunch()
  }

  public get(key: string): Promise<string> {
    return DefaultPreference.get(this._keyWithPrefix(key));
  }

  public set(key: string, value: string): Promise<any> {
    return DefaultPreference.set(this._keyWithPrefix(key), value);
  }

  public reset(...key: string[]): Promise<any[]> {
    return Promise.all(key.map(k => this.clear(k)));
  }

  public clear(key: string): Promise<any> {
    return DefaultPreference.clear(this._keyWithPrefix(key));
  }

  private _keyWithPrefix = (key: string) => appPrefix + key;

  private async _processFirstLaunch() {
    const appInstanceId = await this.get(WellKnownPreferencesKeys.AppInstanceId);
    const isFirstLaunchAfterInstall = !appInstanceId;
    if (isFirstLaunchAfterInstall) {
      await this.set(WellKnownPreferencesKeys.AppTheme, ThemeName.Light);
      const newAppInstanceId = shortid();
      await this.set(WellKnownPreferencesKeys.AppInstanceId, newAppInstanceId);
    }
  }

}