import {Injectable, InjectLazy} from "../../IoC";
import {autorun, observable} from "mobx";
import {TodoMap} from "./TodoService.types";
import {ApiTid} from "../../api/api.module-tid";
import {IAuthService} from "../AuthService/AuthService";
import {ISupportInitialize} from "../../shared/types";
import {ServiceTid} from "../service.module-tid";
import {ITodoApi} from "../../api/TodoApi/ITodoApi";

export interface ITodoService extends ISupportInitialize {
  todos: TodoMap;
  isBusy: boolean;

  updateTodos(): Promise<any>;

  createTodo(title: string): Promise<any>;
}

const todosDefaultValue = {};

@Injectable()
export class TodoService implements ITodoService {
  @observable public todos: TodoMap = todosDefaultValue;
  @observable public isBusy: boolean = false;
  @InjectLazy(ServiceTid.IAuthService) private _authService!: IAuthService;
  @InjectLazy(ApiTid.ITodoApi) private _todoApi!: ITodoApi;

  public async initialize(): Promise<any> {
    autorun(async () => {
      if (this._authService.isSignedIn) {
        await this._todoApi.startListenTodos(this._authService.userUid!, (todos: TodoMap) => {
          this.todos = todos || todosDefaultValue;
        })
      } else {
        await this._todoApi.stopListenTodos();
        this.todos = todosDefaultValue
      }
    });
  }

  public async updateTodos(): Promise<any> {
    let error = null;
    try {
      this.isBusy = true;
      this.todos = await this._todoApi.getTodos(this._authService.userUid!) || todosDefaultValue;
      this.isBusy = false;
    } catch (e) {
      error = e
    }
    return error
  }

  public async createTodo(title: string): Promise<any> {
    let error = null;
    try {
      this.isBusy = true;
      await this._todoApi.createTodo(
        this._authService.userUid!,
        title,
        Math.round((new Date()).getTime() / 1000)
      );
      this.isBusy = false;
    } catch (e) {
      error = e
    }
    return error
  }

}

export const gTodoService = new TodoService();