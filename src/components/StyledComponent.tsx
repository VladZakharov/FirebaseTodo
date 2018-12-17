import * as React from "react";
import {InjectLazy} from "../IoC";
import {ServiceTid} from "../service/service.module-tid";
import {IThemeService} from "../service/ThemeService";
import EStyleSheet, {AnyObject} from "react-native-extended-stylesheet";
import {autorun} from "mobx";

type IReactComponent<P = any> =
  | React.FunctionComponent<P>
  | React.ComponentClass<P>
  | React.ClassicComponentClass<P>;

type Decorator = (styles: AnyObject) => <T extends IReactComponent>(target: T) => T;

export interface StyledProps {
  styles: any
}

const decorator = (styles: AnyObject) => (ScreenComponent: IReactComponent): IReactComponent => {
  class HOC extends React.Component<StyledProps> {
    @InjectLazy(ServiceTid.IThemeService) protected _themeService!: IThemeService;
    protected styles!: AnyObject;

    public constructor(props: any) {
      super(props);
      autorun(() => {
        this._themeService.themeName;// для запуска autorun
        this.styles = EStyleSheet.create(styles);
        this.forceUpdate();
      });
    }

    public render() {
      return <ScreenComponent {...this.props} styles={this.styles} />;
    }
  }

  return HOC as IReactComponent;
};

export const styled = decorator as Decorator;