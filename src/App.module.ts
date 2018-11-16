import {Container, IocModule} from './IoC';
import {ServiceModule} from "./service";
import {INavigationService, Navigation} from "./navigation";
import {AppTid} from "./App.module-tid";

const gNavigation = new Navigation();

export class AppModule implements IocModule {
  public Configure(ioc: Container): void {
    ioc.bind<INavigationService>(AppTid.INavigationService).toConstantValue(gNavigation);

    const imports: IocModule[] = [
      new ServiceModule()
    ];

    imports.forEach(i => {
      i.Configure(ioc);
    });
  }
}
