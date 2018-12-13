import firebase from "react-native-firebase";

export class TodoService {

  public async GetTodos(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.database().ref('todos').once('value', function (snapshot: any) {
        resolve(snapshot.val());
      }).catch((reason: any) => {
        reject(reason.toString())
      });

    });
  }

}