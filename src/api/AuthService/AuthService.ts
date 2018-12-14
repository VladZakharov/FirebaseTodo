import firebase from "react-native-firebase";
// @ts-ignore
import {GoogleSignin} from "react-native-google-signin";
import {Injectable} from "../../IoC";
import {ISupportInitialize} from "../../shared/types";
import {observable} from "mobx";

export interface IAuthService extends ISupportInitialize {
  isSignedIn: boolean;
  userUid: string | undefined;

  signIn(): Promise<any>;

  signOut(): Promise<any>;
}

@Injectable()
export class AuthService implements IAuthService {
  @observable public isSignedIn: boolean = false;
  @observable public userUid: string | undefined = undefined;

  public async initialize(): Promise<boolean> {
    try {
      await GoogleSignin.configure();
      this.isSignedIn = await GoogleSignin.isSignedIn();
      if (this.isSignedIn) {
        const data = await GoogleSignin.signInSilently();
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
        const currentUser = await firebase.auth().signInWithCredential(credential);
        this.userUid = currentUser.user.toJSON().uid;
      }
      return true
    } catch (e) {
      return false
    }
  }

  public async signIn(): Promise<any> {
    try {
      let data = undefined;
      if (this.isSignedIn) {
        data = await GoogleSignin.signInSilently();
      } else {
        data = await GoogleSignin.signIn();
      }
      // @ts-ignore
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
      const currentUser = await firebase.auth().signInWithCredential(credential);
      const userData = currentUser.user.toJSON();
      await this._addNewUser(userData.uid, userData.displayName)
      this.userUid = userData.uid;
      this.isSignedIn = true;
      return currentUser.user.toJSON()
    } catch (e) {
      return false
    }
  }

  private _addNewUser = (userUid: string, displayName: string) => {
    return new Promise((resolve) => {
      firebase.database().ref(`users/${userUid}/`).set({displayName}, (error) => {
        if (error) {
          resolve(false)
        } else {
          resolve(true)
        }
      });
    });
  }

  public async signOut(): Promise<any> {
    try {
      if (this.isSignedIn) {
        await GoogleSignin.signOut();
        await firebase.auth().signOut();
        this.isSignedIn = false;
        this.userUid = undefined;
      }
      return true
    } catch (e) {
      console.warn(e);
      return false
    }
  }

}

export const gAuthService = new AuthService();