import {Container} from './../IoC';
import {ServiceTid} from './service.module-tid';
import {IThemeService, ThemeService} from './ThemeService';
import {IPreferencesService, PreferencesService} from "./PreferencesService";
import {ITodoService, TodoService} from "./TodoService";
import {AuthService, IAuthService} from "./AuthService/AuthService";
import {LocaleService} from "./LocaleService";
import {ILocaleService} from "./LocaleService/Locale.service";

export class ServiceModule {
  public Configure(ioc: Container): void {
    ioc.bind<IPreferencesService>(ServiceTid.IPreferencesService).to(PreferencesService).inSingletonScope();
    ioc.bind<IThemeService>(ServiceTid.IThemeService).to(ThemeService).inSingletonScope();
    ioc.bind<ITodoService>(ServiceTid.ITodoService).to(TodoService).inSingletonScope();
    ioc.bind<IAuthService>(ServiceTid.IAuthService).to(AuthService).inSingletonScope();
    ioc.bind<ILocaleService>(ServiceTid.ILocaleService).to(LocaleService).inSingletonScope();
  }
}
