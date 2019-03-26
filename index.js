import {AppRegistry} from 'react-native';
import homepage from './src/components/homepage';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => homepage);
