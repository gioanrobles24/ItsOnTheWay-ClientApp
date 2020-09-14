import React, {Component} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';

import Routes from './src/Routes';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {green} from './src/colors';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          <StatusBar backgroundColor={green} />
          <Routes />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
