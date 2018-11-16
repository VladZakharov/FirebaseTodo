import {
  NavigationActions,
  NavigationRouter,
  NavigationScreenProp,
  NavigationStackAction,
  NavigationStateRoute,
  StackActions
} from 'react-navigation';

import {Injectable} from '../IoC';
import {ScreenName} from "../shared/types";

interface Params {
  [key: string]: any;
}

export interface INavigationService {
  dispatch(e: any): void;

  /**
   * https://reactnavigation.org/docs/en/navigation-actions.html#navigate
   * @param routeName - имя скрина на который происходит навигация
   * @param params - параметры передаваемые в props.navigation.state.params
   * @param key - id скрина. Если скрин с таким-же routeName и key существует в истории навигатора - то переход осуществляется к нему.
   * Также переход осуществцяется к предыдущему скрину с таким-же routeName без id, если id не указан.
   */
  navigateTo(routeName: ScreenName, params?: Params, key?: string): void;

  resetTo(routeName: ScreenName, params?: Params): void;

  replaceTo(routeName: ScreenName, params?: Params): void;

  getParams(): any;

  getState(): NavigationStateRoute<any>;
}

enum CustomNavigationActions {
  REPLACE = 'CustomNavigation/Replace'
}

@Injectable()
export class Navigation implements INavigationService {
  public static customizeNavigationRouter(router: NavigationRouter<any, any>): void {
    const prevGetStateForActionHomeStack = router.getStateForAction;
    router.getStateForAction = (action, state) => {
      if (state && action.type as CustomNavigationActions === CustomNavigationActions.REPLACE) {
        const routes = state.routes.slice(0, state.routes.length - 1);
        routes.push(action);
        return {
          ...state,
          routes,
          index: routes.length - 1,
        };
      }

      return prevGetStateForActionHomeStack(action, state);
    };
  }

  private _nav?: NavigationScreenProp<any>;
  private readonly _pendingActions!: NavigationStackAction[];

  constructor() {
    this._nav = undefined;
    this._pendingActions = [];
  }

  public setNavigator(nav: any) {
    this._nav = nav;

    // process pending actions
    while (this._pendingActions.length > 0) {
      const actionArgs = this._pendingActions.shift();
      this._nav!.dispatch(actionArgs!);
    }
  }

  public resetTo(routeName: ScreenName, params?: Params) {
    const eArgs = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName, params})],
    });

    this._nav ? this._nav.dispatch(eArgs) : this._pendingActions.push(eArgs);
  }

  public navigateTo(routeName: ScreenName, params?: Params, key?: string) {
    this._navigateTo(routeName, params, key);
  }

  public replaceTo(routeName: ScreenName, params?: Params) {
    const eArgs = {
      type: CustomNavigationActions.REPLACE as any,
      routeName,
      params
    };

    this._nav ? this._nav.dispatch(eArgs) : this._pendingActions.push(eArgs);
  }

  public dispatch(eArgs: any) {
    this._nav ? this._nav.dispatch(eArgs) : this._pendingActions.push(eArgs);
  }

  public getParams(): any {
    return this.getState().params || {};
  }

  public getState(): NavigationStateRoute<any> {
    try {
      //TODO: в случае когда возникнет ошибка (this._nav is undefined)
      //      надо подумать почему навигатор НЕ инициализирован.
      //      Сейчас так не должно быть.
      let state = this._nav!.state.nav;
      while (state.index != null) {
        state = state.routes[state.index];
      }
      return state;
    } catch (e) {
      throw new Error(`NavigationManager::getState failed: ${e.Message}`);
    }
  }

  private _navigateTo(routeName: ScreenName, params?: Params, key?: string) {
    const eArgs = NavigationActions.navigate({routeName, params, key});
    this._nav ? this._nav.dispatch(eArgs) : this._pendingActions.push(eArgs);
  }

  private _popToTop() {
    const eArgs = StackActions.popToTop({});
    this._nav ? this._nav.dispatch(eArgs) : this._pendingActions.push(eArgs);
  }

}
