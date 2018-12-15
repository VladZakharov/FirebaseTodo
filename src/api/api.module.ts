import {Container, IocModule} from "../IoC";
import {ApiTid} from "./api.module-tid";
import {gTodoApi, ITodoApi} from "./TodoApi/TodoApi";

export class ApiModule implements IocModule {
  public Configure(ioc: Container): void {
    ioc.bind<ITodoApi>(ApiTid.ITodoApi).toConstantValue(gTodoApi);
  }
}