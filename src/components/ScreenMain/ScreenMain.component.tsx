import {createFooterTabBar, TabRouteItem} from "../Shared/FooterTabs";
import {ScreenHome} from "../ScreenHome";
import {ScreenProfile} from "../ScreenProfile";
import {ScreenMainLocales} from "./ScreenMain.locales";
import {Icons} from "../../theme/assets/icons";

const routes: TabRouteItem[] = [
  {
    routeName: 'ScreenHome',
    screen: ScreenHome,
    title: 'ScreenHome',
    icon: Icons.HomeIcon(22, 20),
    color: '#fff',
    colorActive: '#000',
    // replaceRouteName: 'PortfelHome',
  },
  {
    routeName: 'ScreenProfile',
    screen: ScreenProfile,
    title: 'ScreenProfile',
    color: '#fff',
    colorActive: '#000',
  }
];

export const ScreenMain = createFooterTabBar(routes, ScreenMainLocales);
