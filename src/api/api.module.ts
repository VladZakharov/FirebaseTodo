import {Container, IocModule} from "../IoC";
import {gAuthService, IAuthService} from "./AuthService/AuthService";
import {ApiTid} from "./api.module-tid";
import {gTodoService, ITodoService} from "./TodoService/TodoService";

export class ApiModule implements IocModule {
  public Configure(ioc: Container): void {
    ioc.bind<IAuthService>(ApiTid.IAuthService).toConstantValue(gAuthService);
    ioc.bind<ITodoService>(ApiTid.ITodoService).toConstantValue(gTodoService);
  }
}