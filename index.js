/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import MapboxGL from '@react-native-mapbox-gl/maps';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {config} from './src/config';
import {store} from './src/redux/store';
import {setPushToken} from './src/reducers/session';
import {Actions} from 'react-native-router-flux';

// PushNotification.addEventListener('registrationError', console.log);
MapboxGL.setAccessToken(config.mapboxKey);
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function(token) {
    console.log(token);
    console.log('TOKEN:', token.token);
    store.dispatch(setPushToken(token.token));
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function(notification) {
    if (!notification.userInteraction) {
      PushNotification.localNotification({
        ...notification,
        visibility: 'public',
        foreground: undefined,
      });
      console.log('NOTIFICATION:', notification);
    } else {
      Actions.allmyOrders();
    }

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    if (Platform.OS === 'ios')
      notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  invokeApp: false,

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function(notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

AppRegistry.registerComponent(appName, () => App);
