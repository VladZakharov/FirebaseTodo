import {Component} from "react";
import {InjectLazy} from "../IoC";
import {ServiceTid} from "../service/service.module-tid";
import {IThemeService} from "../service/ThemeService";
import {RegisteredComponent} from "../shared/types";
import {AnyObject} from "react-native-extended-stylesheet";


export abstract class StyledComponent<P = {}, S = {}> extends Component<P, S> {
  @InjectLazy(ServiceTid.IThemeService) protected _themeService!: IThemeService;
  protected styles: AnyObject;

  protected constructor(props: any) {
    super(props);
    this.styles = this._themeService.getStyles(this.constructor.name as RegisteredComponent);
  }
}