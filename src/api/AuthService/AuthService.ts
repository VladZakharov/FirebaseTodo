import firebase from "react-native-firebase";
// @ts-ignore
import {GoogleSignin} from "react-native-google-signin";
import {Injectable} from "../../IoC";
import {ISupportInitialize} from "../../shared/types";
import {observable} from "mobx";

export interface IAuthService extends ISupportInitialize {
  isSignedIn: boolean;

  signIn(): Promise<any>;

  signOut(): Promise<any>;
}

@Injectable()
class AuthService implements IAuthService {
  @observable public isSignedIn!: boolean;

  public async initialize(): Promise<boolean> {
    try {
      await GoogleSignin.configure();
      this.isSignedIn = await GoogleSignin.isSignedIn();
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
      this.isSignedIn = true;
      // console.warn(JSON.stringify(currentUser.user.toJSON()));
      return currentUser
    } catch (e) {
      return false
    }
  }

  public async signOut(): Promise<any> {
    try {
      if (this.isSignedIn) {
        await GoogleSignin.signOut();
        await firebase.auth().signOut();
        this.isSignedIn = false;
      }
      return true
    } catch (e) {
      console.warn(e);
      return false
    }
  }

}

export const gAuthService = new AuthService();