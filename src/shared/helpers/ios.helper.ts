import {Platform} from "react-native";
import { DimensionsWidth, DimensionsHeight } from './index';

export function isIphoneX() {
  return (
    Platform.OS === 'ios' &&
    !(Platform as any).isPad &&
    !(Platform as any).isTVOS &&
    (DimensionsHeight === 812 || DimensionsWidth === 812)
  );
}

export function isIphone5Generation() {
  return (
    Platform.OS === 'ios' &&
    !(Platform as any).isPad &&
    !(Platform as any).isTVOS &&
    (DimensionsWidth <= 320)
  );
}