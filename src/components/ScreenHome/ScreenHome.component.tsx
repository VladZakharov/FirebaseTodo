import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {InjectLazy} from "../../IoC";
import {ServiceTid} from "../../service/service.module-tid";
import {IAuthService} from "../../service/AuthService/AuthService";
import {observer} from "mobx-react";
import {ITodoService} from "../../service/TodoService";
import {styled, StyledProps} from "../";
import {ScreenHomeStyles} from "./ScreenHome.styles";
import {IThemeService} from "../../service/ThemeService";
import {localized, LocalizedProps} from "../LocalizedComponent";
import {ScreenHomeLocales} from "./ScreenHome.locales";
import {ILocaleService} from "../../service/LocaleService/Locale.service";

type Props = LocalizedProps & StyledProps

@localized(ScreenHomeLocales)
@styled(ScreenHomeStyles)
@observer
export class ScreenHome extends React.Component<Props> {
  @InjectLazy(ServiceTid.IAuthService) private _authService!: IAuthService;
  @InjectLazy(ServiceTid.ITodoService) private _todoService!: ITodoService;
  @InjectLazy(ServiceTid.IThemeService) private _themeService!: IThemeService;
  @InjectLazy(ServiceTid.ILocaleService) private _localeService!: ILocaleService;


  async componentDidMount() {
    //   setTimeout(async () => {
    //     const themeName = this._themeService.themeName;
    //     const nextTheme = themeName == ThemeName.Light ? ThemeName.Default : ThemeName.Light;
    //     await this._themeService.setTheme(nextTheme);
    //   }, 1000);
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
    const {styles} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>Тема: {this._themeService.themeName}</Text>
        <Text style={styles.instructions}>{this._authService.userUid}</Text>

        <TouchableOpacity onPress={this.updateTodos}>
          <Text style={styles.instructions}>{this.props.t('updateTodos')}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.createTodo('test_' + new Date().toString())}>
          <Text style={styles.instructions}>{this.props.t('createTodo')}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.signOut}>
          <Text style={styles.instructions}>{this.props.t('signOut')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._localeService.setLocale('ru')}>
          <Text style={styles.instructions}>RU</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._localeService.setLocale('en')}>
          <Text style={styles.instructions}>EN</Text>
        </TouchableOpacity>

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