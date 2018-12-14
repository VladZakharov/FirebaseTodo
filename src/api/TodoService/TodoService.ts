import firebase from "react-native-firebase";
import {Injectable, InjectLazy} from "../../IoC";
import {ISupportInitialize} from "../../shared/types";
import {autorun, observable} from "mobx";
import {TodoMap} from "./TodoService.types";
import {ApiTid} from "../api.module-tid";
import {IAuthService} from "../AuthService/AuthService";

export interface ITodoService extends ISupportInitialize {
  todos: TodoMap;
  isBusy: boolean;

  getTodos(): Promise<any>;

  createTodo(title: string): Promise<any>;
}

@Injectable()
export class TodoService implements ITodoService {
  @observable public todos: TodoMap = {};
  @observable public isBusy: boolean = false;
  @InjectLazy(ApiTid.IAuthService) private _authService!: IAuthService;

  public async initialize(): Promise<any> {
    autorun(async () => {
      if (this._authService.isSignedIn) {
        await this._startListenTodos()
      } else {
        await this._stopListenTodos();
        this.todos = {}
      }
    });
  }

  public async getTodos(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.isBusy = true;
      const userUid = this._authService.userUid;
      firebase.database().ref(`todos/${userUid}/`).once('value', (snapshot: any) => {
        resolve(snapshot.val());
      }).catch((reason: any) => {
        reject(reason.toString())
      });
      this.isBusy = false;
    });
  }

  private _startListenTodos(): void {
    const userUid = this._authService.userUid;
    firebase.database().ref(`todos/${userUid}/`).on('value', (snapshot: any) => {
      this.todos = snapshot.val() || {};
    })
  }

  private _stopListenTodos(): void {
    firebase.database().ref('todos').off();
    console.warn('stop');
  }

  public async createTodo(title: string): Promise<any> {
    return new Promise((resolve) => {
      this.isBusy = true;
      const userUid = this._authService.userUid;
      const newTodoKey = firebase.database().ref().child(`todos/${userUid}`).push().key;
      firebase.database().ref(`todos/${userUid}/${newTodoKey}`).set({
        title,
        timestamp: Math.round((new Date()).getTime() / 1000)
      }, (error) => {
        if (error) {
          resolve(false)
        } else {
          resolve(true)
        }
        this.isBusy = false;
      });
    });
  }

}

export const gTodoService = new TodoService();