import firebase from "react-native-firebase";
import {Injectable} from "../../IoC";
import {ITodoApi} from "./ITodoApi";

@Injectable()
export class TodoApi implements ITodoApi {
  private _db = firebase.firestore();
  private _onTodosUpdatedListenerUnsubscribe!: any;

  public async getTodos(userUid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._db.collection('todos').get().then((querySnapshot) => {
        const result: any = {};
        querySnapshot.forEach(function (doc) {
          result[doc.id as any] = doc.data();
        });
        resolve(result)
      }).catch((error) => {
        reject(error)
      });
    });
  }

  public async createTodo(userUid: string, title: string, timestamp: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._db.collection("todos").add({
        title,
        timestamp
      }).then((docRef) => {
        resolve(docRef)
      }).catch((error) => {
        reject(error)
      });
    });
  }

  public startListenTodos(userUid: string, onUpdate: any): void {
    this._onTodosUpdatedListenerUnsubscribe = this._db.collection('todos').onSnapshot((querySnapshot) => {
      const result: any = {};
      querySnapshot.forEach(function (doc) {
        result[doc.id as any] = doc.data();
      });
      onUpdate(result)
    })
  }

  public stopListenTodos(): void {
    this._onTodosUpdatedListenerUnsubscribe && this._onTodosUpdatedListenerUnsubscribe();
  }

}

export const gTodoApi = new TodoApi();