import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {InjectLazy} from "../../IoC";
import {ServiceTid} from "../../service/service.module-tid";
import {IAuthService} from "../../service/AuthService/AuthService";
import {observer} from "mobx-react";
import {ITodoService} from "../../service/TodoService";
import {styled, StyledProps} from "../";
import {ScreenHomeStyles} from "./ScreenHome.styles";
import {localized, LocalizedProps} from "../LocalizedComponent";
import {ScreenHomeLocales} from "./ScreenHome.locales";
import {Layout} from "../Shared/Layout";

type Props = LocalizedProps & StyledProps

@localized(ScreenHomeLocales)
@styled(ScreenHomeStyles)
@observer
export class ScreenHome extends React.Component<Props> {
  @InjectLazy(ServiceTid.IAuthService) private _authService!: IAuthService;
  @InjectLazy(ServiceTid.ITodoService) private _todoService!: ITodoService;

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
      <Layout>
        <TouchableOpacity onPress={this.updateTodos}>
          <Text style={styles.instructions}>{this.props.t('updateTodos')}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.createTodo('test_' + new Date().toString())}>
          <Text style={styles.instructions}>{this.props.t('createTodo')}</Text>
        </TouchableOpacity>

        {this._todoService.isBusy || this._authService.isBusy && <Text>loading...</Text>}

        {
          Object.keys(this._todoService.todos).map(key => (
            <Text key={key}>{this._todoService.todos[key].title}</Text>
          ))
        }
      </Layout>
    );
  }
}