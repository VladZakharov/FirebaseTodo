import {ISupportInitialize} from "../../shared/types";
import {Injectable} from "../../IoC";
import {observable} from "mobx";
import {LocaleTypes} from "./Locale.types";

export interface ILocaleService extends ISupportInitialize {
  locale: LocaleTypes;

  setLocale(locale: LocaleTypes): void;
}

@Injectable()
export class LocaleService implements ILocaleService {
  @observable public locale!: LocaleTypes;

  async initialize(): Promise<any> {
    this.locale = 'ru'
  }

  setLocale(locale: LocaleTypes): void {
    this.locale = locale
  }
}