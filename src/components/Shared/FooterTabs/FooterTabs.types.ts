import {ScreenName} from "../../../navigation";
import * as React from "react";

export interface TabRouteItem<P = any> {
  routeName: ScreenName;
  screen: React.ComponentType<any>;
  title?: string;
  props?: P;
  icon?: string;
  iconColor?: string;
  iconColorActive?: string;
  color?: string;
  colorActive?: string;
  disabled?: boolean;
  replaceRouteName?: ScreenName;
}