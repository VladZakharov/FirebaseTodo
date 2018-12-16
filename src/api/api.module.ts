import {Container, IocModule} from "../IoC";
import {ApiTid} from "./api.module-tid";
import {ITodoApi, TodoApi} from "./TodoApi";
import {IUserApi, UserApi} from "./UserApi";

export class ApiModule implements IocModule {
  public Configure(ioc: Container): void {
    ioc.bind<ITodoApi>(ApiTid.ITodoApi).to(TodoApi).inSingletonScope();
    ioc.bind<IUserApi>(ApiTid.IUserApi).to(UserApi).inSingletonScope();
  }
}