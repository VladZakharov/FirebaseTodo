import {Container} from './../IoC';
import {ServiceTid} from './service.module-tid';
import {IThemeService, ThemeService} from './ThemeService';

export class ServiceModule {
  public Configure(ioc: Container): void {
    ioc.bind<IThemeService>(ServiceTid.IThemeService).to(ThemeService).inSingletonScope();
  }
}
