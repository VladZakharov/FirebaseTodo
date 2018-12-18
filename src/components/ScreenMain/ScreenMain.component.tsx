import {createFooterTabBar, TabRouteItem} from "../Shared/FooterTabs";
import {ScreenHome} from "../ScreenHome";
import {ScreenProfile} from "../ScreenProfile";
import {ScreenMainLocales} from "./ScreenMain.locales";

const routes: TabRouteItem[] = [
  {
    routeName: 'ScreenHome',
    screen: ScreenHome,
    title: 'ScreenHome'
    // replaceRouteName: 'PortfelHome',
  },
  {
    routeName: 'ScreenProfile',
    screen: ScreenProfile,
    title: 'ScreenProfile'
  }
];

export const ScreenMain = createFooterTabBar(routes, ScreenMainLocales);
