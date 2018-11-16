import {DimensionsHeight, DimensionsWidth} from '../../shared/helpers';
import {ThemeVariables} from "../theme.types";

const deviceHeight = DimensionsHeight;
const deviceWidth = DimensionsWidth;

export const defaultThemeVars: ThemeVariables = {
  $var: {
    global: {
      deviceHeight, deviceWidth,
      fontScale: (deviceHeight > deviceWidth ? deviceWidth : deviceHeight) / 375,
    }
  }
};
