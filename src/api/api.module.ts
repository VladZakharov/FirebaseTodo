import {Container, IocModule} from "../IoC";
import {gAuthService, IAuthService} from "./AuthService/AuthService";
import {ApiTid} from "./api.module-tid";

export class ApiModule implements IocModule {
  public Configure(ioc: Container): void {
    ioc.bind<IAuthService>(ApiTid.IAuthService).toConstantValue(gAuthService);
  }
}