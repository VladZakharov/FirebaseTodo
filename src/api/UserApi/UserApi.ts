import firebase from "react-native-firebase";
import {Injectable} from "../../IoC";
import {IUserApi} from "./IUserApi";

@Injectable()
export class UserApi implements IUserApi {
  private _db = firebase.firestore();
  private _onUsersUpdatedListenerUnsubscribe!: any;

  public async getUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._db.collection('users').get().then((querySnapshot) => {
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

  public async createUser(uid: string, name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._db.collection("users").doc(uid).set({
        name
      }).then((docRef: any) => {
        resolve(docRef)
      }).catch((error) => {
        reject(error)
      });
    });
  }

  public startListenUsers(onUpdate: any): void {
    this._onUsersUpdatedListenerUnsubscribe = this._db.collection('todos').onSnapshot((querySnapshot) => {
      const result: any = {};
      querySnapshot.forEach(function (doc) {
        result[doc.id as any] = doc.data();
      });
      onUpdate(result)
    })
  }

  public stopListenUsers(): void {
    this._onUsersUpdatedListenerUnsubscribe && this._onUsersUpdatedListenerUnsubscribe();
  }

}