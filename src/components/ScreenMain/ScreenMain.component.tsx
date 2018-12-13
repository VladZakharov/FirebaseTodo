import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {StyledComponent} from "../index";
import {InjectLazy} from "../../IoC";
import {ServiceTid} from "../../service/service.module-tid";
import {IPreferencesService} from "../../service/PreferencesService";
import {TodoService} from "../../api/TodoService/TodoService";
import {IAuthService} from "../../api/AuthService/AuthService";
import {ApiTid} from "../../api/api.module-tid";
import {observer} from "mobx-react";

interface Props {
}

@observer
export class ScreenMain extends StyledComponent<Props> {
  @InjectLazy(ServiceTid.IPreferencesService) protected _preferences!: IPreferencesService;
  @InjectLazy(ApiTid.IAuthService) private authService!: IAuthService;


  async componentDidMount() {
    // setTimeout(async () => {
    //   const themeName = this._themeService.themeName;
    //   const nextTheme = themeName == ThemeName.Light ? ThemeName.Default : ThemeName.Light;
    //   await this._themeService.setTheme(nextTheme);
    // }, 1000);

    // firebase.database().ref('Users/').set({
    //   email: 'test',
    // }).then((data) => {
    //   console.warn('data ', data)
    // }).catch((error) => {
    //   console.warn('error ', error)
    // })
  }

  signIn = async () => {
    try {
      const data = await this.authService.signIn();
      console.warn('data', data);
    } catch (e) {
      console.warn('data error')
    }
  }

  signOut = async () => {
    await this.authService.signOut();
    console.warn('signed out');
  }

  getTodos = async () => {
    const todoService = new TodoService();
    try {
      const todos = await todoService.GetTodos();
      console.warn('todos', todos);
    } catch (e) {
      console.warn(e)
    }
  }

  render() {
    const {styles} = this;
    const {isSignedIn} = this.authService;
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>Тема: {this._themeService.themeName}</Text>
        <Text style={styles.instructions}>isSignedIn: {isSignedIn ? 'yes' : 'no'}</Text>

        <TouchableOpacity onPress={this.getTodos} disabled={!isSignedIn}>
          <Text style={styles.instructions}>GetTodos</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.signIn} disabled={isSignedIn}>
          <Text style={styles.instructions}>signIn</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.signOut} disabled={!isSignedIn}>
          <Text style={styles.instructions}>signOut</Text>
        </TouchableOpacity>

      </View>
    );
  }
}