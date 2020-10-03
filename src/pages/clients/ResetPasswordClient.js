import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
  ImageBackground,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Avatar} from 'react-native-elements';
import {green} from '../../colors';
import {config} from '../../config';
import request from '../../utils/request';
const background = require('../../assets/background.png');

export default class RegisterClientView extends Component {
  constructor(props) {
    super(props);
  }

  sendResetPasswd = viewId => {
    request(`${config.apiUrl}/clients/reset_pass`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cl_email: this.state.email,
      }),
    })
      .then(responseData => {
        if (responseData.error) {
          Alert.alert(responseData.error);
        } else {
          Alert.alert(
            'Te hemos enviado un codigo a tu correo',
            '¿Que deseas hacer?',
            [
              {
                text: 'Log in',
                onPress: () => Actions.pop(),
                style: 'cancel',
              },
              {text: 're enviar codigo', onPress: () => this.sendResetPasswd()},
            ],
            {cancelable: false},
          );
        }
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={background}
          style={{flex: 1, resizeMode: 'cover'}}>
          <View style={styles.container}>
            <View>
              <Text style={styles.loginTitle} h1>
                Restablece tu clave
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Correo"
                placeholderTextColor="gray"
                keyboardType="email-address"
                underlineColorAndroid="transparent"
                onChangeText={email => this.setState({email})}
              />
            </View>

            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => {
                this.sendResetPasswd();
              }}>
              <Text style={styles.loginText}>Enviar</Text>
            </TouchableHighlight>
            <Avatar
              rounded
              size="xlarge"
              overlayContainerStyle={{backgroundColor: 'transparent'}}
              containerStyle={{
                alignSelf: 'center',
                flexDirection: 'column',
                marginTop: 20,
                backgroundColor: 'white',
                elevation: 6,
              }}
              source={{uri: `${config.apiUrl}/imgVerde`}}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'QUICKSAND-LIGHT',
    padding: 20,
  },

  loginTitle: {
    fontSize: 25,
    flexDirection: 'row',
    color: '#373535',
    fontFamily: '[z] Arista Light',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    marginTop: 5,
    borderRadius: 15,
    textAlignVertical: 'top',
    paddingHorizontal: 10,
    borderColor: green,
    borderWidth: 2,
    flex: 1,
    height: Platform.select({ ios: 50, android: 55 }),
    color:'black'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 270,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  loginButton: {
    backgroundColor: '#a9d046',
  },
  loginText: {
    fontFamily: '[z] Arista Light',
    color: 'white',
  },
});
