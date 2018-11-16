import {DarkTheme} from "./default/colors";

interface ColorTypes {
  inverse?: string;
  lightest?: string;
  lighten?: string;
  light?: string;
  base?: string;
  dark?: string;
  darken?: string;
  darkest?: string;
}

export type ThemeColorType =
  'primary'
  | 'secondary'
  | 'alternate'
  | 'feature'
  | 'default'
  | 'alert'
  | 'good'
  | 'text'
  | 'debug'
  | 'gradient'
  | 'global';

export interface ThemeData {
  $colors: { [K in ThemeColorType]: ColorTypes };
}

export enum ThemeName {
  Default = 'Default'
}

export type ThemeMap = { [K in ThemeName]: ThemeData };

type Variables = 'global';

export interface ThemeVariables {
  $var: { [K in Variables]?: any };
}

export const themes: ThemeMap = {
  [ThemeName.Default]: DarkTheme
};
