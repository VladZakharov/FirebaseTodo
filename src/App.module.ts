import {Container, IocModule} from './IoC';
import {ServiceModule} from "./service";

export class AppModule implements IocModule {
  public Configure(ioc: Container): void {
    const imports: IocModule[] = [
      new ServiceModule()
    ];

    imports.forEach(i => {
      i.Configure(ioc);
    });
  }
}
