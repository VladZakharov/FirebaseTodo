import React from 'react';
import {Text, View} from 'react-native';
import {StyledComponent} from "../index";
import {InjectLazy} from "../../IoC";
import {ServiceTid} from "../../service/service.module-tid";
import {IPreferencesService} from "../../service/PreferencesService";
import firebase from 'react-native-firebase';
import {GoogleSignin} from "react-native-google-signin";

interface Props {
}

const googleLogin = async () => {
  try {
    await GoogleSignin.configure();
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      await GoogleSignin.signOut();
      await firebase.auth().signOut()
    }

    const data = await GoogleSignin.signIn();
    // @ts-ignore
    const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
    const currentUser = await firebase.auth().signInWithCredential(credential);
    console.warn(JSON.stringify(currentUser.user.toJSON()));
  } catch (e) {
    console.warn(e);
  }
};

export class ScreenMain extends StyledComponent<Props> {
  @InjectLazy(ServiceTid.IPreferencesService) protected _preferences!: IPreferencesService;

  async componentDidMount() {
    // setTimeout(async () => {
    //   const themeName = this._themeService.themeName;
    //   const nextTheme = themeName == ThemeName.Light ? ThemeName.Default : ThemeName.Light;
    //   await this._themeService.setTheme(nextTheme);
    // }, 1000);

    await googleLogin();

    firebase.database().ref('todos').once('value', function (snapshot: any) {
      console.warn(snapshot.val())
    }).catch((reason: any) => {
      console.warn('ERROR: ' + reason)
    });

    // firebase.database().ref('Users/').set({
    //   email: 'test',
    // }).then((data) => {
    //   console.warn('data ', data)
    // }).catch((error) => {
    //   console.warn('error ', error)
    // })

  }

  render() {
    const {styles} = this;
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>Тема: {this._themeService.themeName}</Text>
      </View>
    );
  }
}