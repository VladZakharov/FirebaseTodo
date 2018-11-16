import { Platform, StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { DimensionsWidth, DimensionsHeight } from '../../../shared/helpers';
import { ThemeVariables } from '../../theme.types';

const deviceHeight = DimensionsHeight;
const deviceWidth = DimensionsWidth;
const fontScaleFactor = deviceWidth < 360 ? 0.8 : 1;

export function isIphoneX() {
  return (
    Platform.OS === 'ios' &&
    !(Platform as any).isPad &&
    !(Platform as any).isTVOS &&
    (deviceHeight === 812 || deviceWidth === 812)
  );
}

export function isIphone5Generation() {
  return (
    Platform.OS === 'ios' &&
    !(Platform as any).isPad &&
    !(Platform as any).isTVOS &&
    (deviceWidth <= 320)
  );
}

const safeAreaTop = 44;
const safeAreaBottom = 34;
const isSafeAreaNeeded = isIphoneX();

export const defaultThemeVars: ThemeVariables = {
  $var: {
    double: {
      space: {
        xs: '$space.xs * 2',
        md: '$space.md * 2',
        lg: '$space.lg * 2'
      }
    },

    global: {
      deviceHeight, deviceWidth,
      fontScale: (deviceHeight > deviceWidth ? deviceWidth : deviceHeight) / 375,
      statusBarHeight: Platform.OS === 'ios' ? (isSafeAreaNeeded ? safeAreaTop : 20) : StatusBar.currentHeight,
      keyboardVerticalOffset: 0,
      appHeaderHeight: '$var.AppHeader.height + $var.global.statusBarHeight',
      passwordAutoFillHeight: 45,
      fontScaleFactor
    },
    Thumbnail: {
      sm: 24,
      md: 32,
      lg: 40
    },
    SafeArea: {
      top: isSafeAreaNeeded ? safeAreaTop : 0,
      bottom: isSafeAreaNeeded ? safeAreaBottom : 0,
      isSafeAreaNeeded
    },
    Logo: {
      base: {
        sm: require('./../../../assets/image/logo.png'),
        md: require('./../../../assets/image/logo.png'),
        lg: require('./../../../assets/image/logo.png')
      },
      inverse: {
        sm: require('./../../../assets/image/logoInverse.png'),
        md: require('./../../../assets/image/logoInverse.png'),
        lg: require('./../../../assets/image/logoInverse.png'),
      },
    },
    BackgroundImage: {
      intro: require('./../assets/bgIntro.jpg'),
      login: require('./../assets/bgLogin.jpg'),
    },
    Button: {
      height: {
        sm: 20,
        md: 35,
        lg: 50,
        xl: 70,
      }
    },
    Dropdown: {
      height: 50,
    },
    PinPad: {
      buttonDiameter: '$var.global.deviceWidth / 5', // 75,
      buttonMargin: '$var.global.deviceWidth / 15', // 25,
      dotDiameter: 7,
    },
    AppHeader: {
      height: 50,
    },
    FooterTabs: {
      height: 50,
      margin: '$space.sm * 2',
      marginBottom: isIphoneX() ? 0 : '$var.FooterTabs.margin',
      areaHeight: '$var.FooterTabs.height + $var.FooterTabs.marginBottom',
      withSafeAreaHeight: '$var.FooterTabs.areaHeight + $var.SafeArea.bottom',
      iconSize: 18,
      imageWidth: 44,
      imageHeight: 44,
      paddingHorizontal: isIphone5Generation() ? 0 : '$space.xs'
    },
    HeaderTabs: {
      height: 40,
      underlineHeight: 2
    },
    HeaderButtonTabs: {
      height: 30,
    },
    Swiper: {
      indicator: { height: 2, width: 48 },
      bar: {height: 30}
    },
    InputText: {
      padding: '$space.lg',
      doublePadding: '$var.double.space.lg'
    },
    NewsDetails: {
      topOffset: 60
    },
    InvestIdea: {
      topOffset: 60,
      bottomOffset: 50
    },
    DoneBar: {
      height: Platform.OS === 'ios' ? 40 : 0,
    },
    Content: {
      bottomOffsetBase: '$var.DoneBar.height + $var.InputText.padding',
      bottomOffset: '$var.Content.bottomOffsetBase + 10'
    },

    Login: {
      codesImageWidth: 235,
      codesImageHeight: 74
    },
    Instrument: {
      headerHeight: 38,
      priceDateTimeOffset: '35%',
      withSafeAreaBottom: '70 + $var.SafeArea.bottom'
    },
    Quotes: {
      headerHeight: 32,
      nameColumnRatio: 0.6,
      wideNameColumnRatio: 0.7,
      priceChangeColumnRatio: 0.7,
      itemHeight: 50,
      stateAlertSize: 5,
      quoteNameRightPadding: '$var.Thumbnail.md + $space.sm'
    },
    StrategyQuotes: {
      headerHeight: 32,
      nameColumnRatio: 0.4,
      priceColumnRatio: 0.3,
      percentColumnRatio: 0.2,
      itemHeight: 50,
      stateAlertSize: 5,
      quoteNameRightPadding: '$var.Thumbnail.md + $space.sm'
    },
    Portfel: {
      summaryHeight: 89,
      compactSummaryHeight: 50,
      refreshIconDiameter: 32,
      accountItemHeight: 70,
      listItemHeight: 50
    },
    History: {
      itemHeight: 70,
      cancelButtonWidth: 127,
      leftContainerRatio: 0.65,
      rightContainerRatio: 0.35,
      filterHeaderHeight: 42,
    },
    Alerts: {
      itemHeight: 84,
      cancelButtonWidth: 127,
    },
    About: {
      blockHeight: 50
    },
    Profile: {
      itemHeight: 50,
      emailFieldMaxWidth: 200
    },
    Support: {
      dividerHeight: 2,
      dividerOpacity: 0.1
    },
    CheckableItem: {
      height: 50,
      iconContainerWidth: 40
    },
    Quiz: {
      headerMarginTop: !isSafeAreaNeeded ? '$space.md' : 0,
      headerIconSize: 32,
      progressLineHeight: 1,
      buttonDiameter: 32,
      titleFontSize: 16,
      answerItemHeight: 60,
      iconContainerWidth: 40,
      finalImageSize: 240,
    },
    Withdrawal: {
      buttonDiameter: 32,
      accountCardHeight: 168
    },
    BannersList: {
      height: 181,
      bannerHeight: 120,
      portfolioTextPadding: 100
    },
    ConnectionPortfel: {
      swiperHeight: 100,
      swiperItemPadding: 25
    },
    List: {
      rowItemMinHeight: '$var.Button.height.lg'
    },
    PortfelStrategy: {
      headerHeight: 268
    }
  },
};
