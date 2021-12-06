/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import MainNavigation from './src/navigations/MainNavigation'

AppRegistry.registerComponent(appName, () => MainNavigation);
