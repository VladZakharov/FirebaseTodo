//TODO удалить файл
import firebase from "react-native-firebase";
import {Injectable} from "../../IoC";
import {ITodoApi} from "./ITodoApi";

@Injectable()
export class TodoApi implements ITodoApi {
  private _onTodosUpdatedListener!: any;

  public async getTodos(userUid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`todos/${userUid}/`).once('value', (snapshot: any) => {
        resolve(snapshot.val());
      }).catch((reason: any) => {
        reject(reason)
      });
    });
  }

  public async createTodo(userUid: string, title: string, timestamp: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const newTodoKey = firebase.database().ref().child(`todos/${userUid}`).push().key;
      firebase.database().ref(`todos/${userUid}/${newTodoKey}`).set({
        title,
        timestamp
      }, (error: any) => {
        error ? reject(error) : resolve()
      });
    });
  }

  public startListenTodos(userUid: string, listener: any): void {
    this._onTodosUpdatedListener = listener;
    firebase.database().ref(`todos/${userUid}/`).on('value', listener)
  }

  public stopListenTodos(): void {
    firebase.database().ref('todos').off('value', this._onTodosUpdatedListener);
  }

}

export const gTodoApi = new TodoApi();