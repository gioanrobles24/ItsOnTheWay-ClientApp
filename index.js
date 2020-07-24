/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {config} from './src/config';

MapboxGL.setAccessToken(config.mapboxKey);
AppRegistry.registerComponent(appName, () => App);
