import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import bootstrapper from './src/boot/bootstrapper'

AppRegistry.registerComponent(appName, () => bootstrapper())
