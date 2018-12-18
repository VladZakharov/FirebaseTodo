import * as React from "react";
import {InjectLazy} from "../IoC";
import {ServiceTid} from "../service/service.module-tid";
import {AnyObject} from "react-native-extended-stylesheet";
import {autorun} from "mobx";
import {ILocaleService} from "../service/LocaleService/Locale.service";
import {LocaleMap} from "../service/LocaleService";

type IReactComponent<P = any> =
  | React.FunctionComponent<P>
  | React.ComponentClass<P>
  | React.ClassicComponentClass<P>;

type Decorator = (styles: AnyObject) => <T extends IReactComponent>(target: T) => T;

export interface LocalizedProps {
  t: (key: string) => string
}

const decorator = (locales: LocaleMap) => (ScreenComponent: IReactComponent): IReactComponent => {
  class HOC extends React.Component<LocalizedProps> {
    @InjectLazy(ServiceTid.ILocaleService) protected _localeService!: ILocaleService;
    private readonly locales!: LocaleMap;
    private isMount!: boolean;

    componentDidMount = () => this.isMount = true;

    componentWillUnmount = () => this.isMount = false;

    public constructor(props: any) {
      super(props);
      this.locales = locales;
      autorun(() => {
        this._localeService.locale; // для запуска autorun
        this.isMount && this.forceUpdate();
      });
    }

    private t = (key: string): string => {
      return this.locales[this._localeService.locale][key]
    }

    public render() {
      return <ScreenComponent {...this.props} t={this.t} />;
    }
  }

  return HOC as IReactComponent;
};

export const localized = decorator as Decorator;