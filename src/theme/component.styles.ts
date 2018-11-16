import {ScreenMainStyles} from "../components/ScreenMain";
import {RegisteredComponent, ScreenName} from "../shared/types";
import {AnyObject} from "react-native-extended-stylesheet";

type ComponentStylesMap = { [K in RegisteredComponent]: AnyObject };

export const ComponentStyles: ComponentStylesMap = {
  [ScreenName.ScreenMain]: ScreenMainStyles
};