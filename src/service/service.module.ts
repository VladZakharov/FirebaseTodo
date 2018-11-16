import {Container} from './../IoC';
import {ServiceTid} from './service.module-tid';
import {IThemeService, ThemeService} from './ThemeService';
import {IPreferencesService, PreferencesService} from "./PreferencesService/Preferences.service";

export class ServiceModule {
  public Configure(ioc: Container): void {
    ioc.bind<IPreferencesService>(ServiceTid.IPreferencesService).to(PreferencesService).inSingletonScope();
    ioc.bind<IThemeService>(ServiceTid.IThemeService).to(ThemeService).inSingletonScope();
  }
}
