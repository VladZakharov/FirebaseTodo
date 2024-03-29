import firebase from "react-native-firebase";
// @ts-ignore
import {GoogleSignin} from "react-native-google-signin";
import {Injectable, InjectLazy} from "../../IoC";
import {ISupportInitialize} from "../../shared/types";
import {observable} from "mobx";
import {ApiTid} from "../../api/api.module-tid";
import {IUserApi} from "../../api/UserApi";

export interface IAuthService extends ISupportInitialize {
  isSignedIn: boolean;
  userUid: string | undefined;
  isBusy: boolean;

  signIn(): Promise<any>;

  signOut(): Promise<any>;
}

@Injectable()
export class AuthService implements IAuthService {
  @InjectLazy(ApiTid.IUserApi) private _userApi!: IUserApi;

  @observable public isSignedIn: boolean = false;
  @observable public userUid: string | undefined = undefined;
  @observable public isBusy: boolean = false;


  public async initialize(): Promise<boolean> {
    let error = null;
    try {
      await GoogleSignin.configure();
      this.isSignedIn = await GoogleSignin.isSignedIn();
      if (this.isSignedIn) {
        const data = await GoogleSignin.signInSilently();
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
        const currentUser = await firebase.auth().signInWithCredential(credential) as any;
        this.userUid = currentUser.user.toJSON().uid;
      }
    } catch (e) {
      error = e
    }
    return error
  }

  public async signIn(): Promise<any> {
    this.isBusy = true;
    let error = null;
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
      const userData = currentUser.user.toJSON() as any;
      await this._userApi.createUser(userData.uid, userData.displayName);
      this.userUid = userData.uid;
      this.isSignedIn = true;
    } catch (e) {
      error = e
    }
    this.isBusy = false;
    return error
  }

  public async signOut(): Promise<any> {
    this.isBusy = true;
    let error = null;
    try {
      if (this.isSignedIn) {
        await GoogleSignin.signOut();
        await firebase.auth().signOut();
        this.isSignedIn = false;
        this.userUid = undefined;
      }
    } catch (e) {
      error = e
    }
    this.isBusy = false;
    return error
  }

}