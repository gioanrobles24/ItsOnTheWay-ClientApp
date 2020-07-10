/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoid3VsZnN5c3RlbXMiLCJhIjoiY2tibDB4aDJkMTNjNjJzbXlwdGd4bjVrZSJ9.lfBKMJjxa9t9cN7jMY0DDQ',
);
AppRegistry.registerComponent(appName, () => App);
