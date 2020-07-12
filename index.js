/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiaXRzb250aGV3YXkiLCJhIjoiY2tjYXBvZDNnMDBzZTJycWU0NXBtcjU3cyJ9.RzVCBNzfGW9lqmcZmTA40Q',
);
AppRegistry.registerComponent(appName, () => App);
