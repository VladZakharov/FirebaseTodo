import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {StyledComponent} from "../index";
import {InjectLazy} from "../../IoC";
import {ServiceTid} from "../../service/service.module-tid";
import {IPreferencesService} from "../../service/PreferencesService";
import {ITodoService} from "../../api/TodoService/TodoService";
import {IAuthService} from "../../api/AuthService/AuthService";
import {ApiTid} from "../../api/api.module-tid";
import {observer} from "mobx-react";

interface Props {
}

@observer
export class ScreenMain extends StyledComponent<Props> {
  @InjectLazy(ServiceTid.IPreferencesService) protected _preferences!: IPreferencesService;
  @InjectLazy(ApiTid.IAuthService) private _authService!: IAuthService;
  @InjectLazy(ApiTid.ITodoService) private _todoService!: ITodoService;


  async componentDidMount() {
    // setTimeout(async () => {
    //   const themeName = this._themeService.themeName;
    //   const nextTheme = themeName == ThemeName.Light ? ThemeName.Default : ThemeName.Light;
    //   await this._themeService.setTheme(nextTheme);
    // }, 1000);
  }

  signIn = async () => {
    const error = await this._authService.signIn();
    error && console.warn(error);
  }

  signOut = async () => {
    const error = await this._authService.signOut();
    error && console.warn(error);
  }

  updateTodos = async () => {
    const error = await this._todoService.updateTodos();
    error && console.warn(error);
  }

  createTodo = async (title: string) => {
    const error = await this._todoService.createTodo(title);
    error && console.warn(error);
  }

  render() {
    const {styles} = this;
    const {isSignedIn} = this._authService;
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>Тема: {this._themeService.themeName}</Text>
        <Text style={styles.instructions}>{this._authService.userUid}</Text>

        {
          isSignedIn &&
          <React.Fragment>
            <TouchableOpacity onPress={this.updateTodos}>
              <Text style={styles.instructions}>updateTodos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.createTodo('test_' + new Date().toString())}>
              <Text style={styles.instructions}>createTodo</Text>
            </TouchableOpacity>
          </React.Fragment>
        }
        {
          isSignedIn ?
            <TouchableOpacity onPress={this.signOut}>
              <Text style={styles.instructions}>signOut</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={this.signIn}>
              <Text style={styles.instructions}>signIn</Text>
            </TouchableOpacity>
        }

        {this._todoService.isBusy || this._authService.isBusy && <Text>loading...</Text>}

        {
          Object.keys(this._todoService.todos).map(key => (
            <Text key={key}>{this._todoService.todos[key].title}</Text>
          ))
        }

      </View>
    );
  }
}