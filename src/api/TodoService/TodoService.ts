import firebase from "react-native-firebase";
import {Injectable, InjectLazy} from "../../IoC";
import {ISupportInitialize} from "../../shared/types";
import {autorun, observable} from "mobx";
import {TodoMap} from "./TodoService.types";
import {ApiTid} from "../api.module-tid";
import {IAuthService} from "../AuthService/AuthService";

const todosDefaultValue = {};

export interface ITodoService extends ISupportInitialize {
  todos: TodoMap;
  isBusy: boolean;

  updateTodos(): Promise<any>;

  createTodo(title: string): Promise<any>;
}

@Injectable()
export class TodoService implements ITodoService {
  @observable public todos: TodoMap = todosDefaultValue;
  @observable public isBusy: boolean = false;
  private _todosListener: any = (snapshot: any) => {
    this.todos = snapshot.val() || todosDefaultValue;
  };
  @InjectLazy(ApiTid.IAuthService) private _authService!: IAuthService;

  public async initialize(): Promise<any> {
    autorun(async () => {
      if (this._authService.isSignedIn) {
        await this._startListenTodos()
      } else {
        await this._stopListenTodos();
        this.todos = todosDefaultValue
      }
    });
  }

  public async updateTodos(): Promise<any> {
    return new Promise((resolve) => {
      let error = null;
      this.isBusy = true;
      firebase.database().ref(`todos/${this._authService.userUid}/`).once('value', (snapshot: any) => {
        this.todos = snapshot.val() || todosDefaultValue;
        this.isBusy = false;
      }).catch((reason: any) => {
        error = reason;
        this.isBusy = false;
      });
      resolve(error as any)
    });
  }

  private _startListenTodos(): void {
    firebase.database().ref(`todos/${this._authService.userUid}/`).on('value', this._todosListener)
  }

  private _stopListenTodos(): void {
    firebase.database().ref('todos').off('value', this._todosListener);
  }

  public async createTodo(title: string): Promise<any> {
    return new Promise((resolve) => {
      this.isBusy = true;
      const userUid = this._authService.userUid;
      const newTodoKey = firebase.database().ref().child(`todos/${userUid}`).push().key;
      firebase.database().ref(`todos/${userUid}/${newTodoKey}`).set({
        title,
        timestamp: Math.round((new Date()).getTime() / 1000)
      }, (error: any) => {
        resolve(error);
        this.isBusy = false;
      });
    });
  }

}

export const gTodoService = new TodoService();