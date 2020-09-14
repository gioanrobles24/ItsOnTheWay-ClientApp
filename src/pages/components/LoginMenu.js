import React from 'react';
import {View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {green} from '../../colors';
export function LoginMenu() {
  return (
    <View style={{alignSelf: 'center', marginTop: 50}}>
      <Text
        style={{textAlign: 'center', fontSize: 24, color: green}}
        onPress={() => Actions.loginClient()}>
        Inicia Sesión
      </Text>
      <Text style={{textAlign: 'center', fontSize: 24}}>ó</Text>
      <Text
        style={{textAlign: 'center', fontSize: 24, color: green}}
        onPress={() => Actions.registerClient()}>
        Registrate
      </Text>
    </View>
  );
}
