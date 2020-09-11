import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  Switch,
  ToastAndroid,
  BackHandler,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Icon, Avatar, Badge, withBadge} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation';
import {green} from '../../colors';
import {config} from '../../config';
const background = require('../../assets/background.png');

export default class VerifyClientView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  register = viewId => {
    fetch(`${config.apiUrl}/clients/register/verify/${this.state.code}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.error) {
          alert('Codigo incorrecto, Intente nuevamente');
        } else {
          Alert.alert(
            'Has sido verficado con exito',
            'Gracias por registrarte, ya puedes distrutar de nuestros servicios',
            [
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
              {text: 'OK', onPress: () => Actions.replace('loginClient')},
            ],
          );
        }
      })
      .catch(error => {
        console.error(error);
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
              <Text style={styles.ConfirTitle} h1>
                Confirmación
              </Text>
            </View>
            <ScrollView style={{width: '100%'}}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputs}
                  placeholder="Inserta el codigo enviado a tu Email"
                  keyboardType="default"
                  underlineColorAndroid="transparent"
                  onChangeText={code => this.setState({code})}
                />
              </View>
            </ScrollView>
            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => {
                this.register();
              }}>
              <Text style={styles.loginText}>Confirmar</Text>
            </TouchableHighlight>
            <Avatar
              rounded
              size="xlarge"
              overlayContainerStyle={{backgroundColor: 'transparent'}}
              containerStyle={{
                alignSelf: 'center',
                flexDirection: 'column',
                marginTop: 20,
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
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'QUICKSAND-LIGHT',
  },

  ConfirTitle: {
    fontSize: 34,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '[z] Arista Light',
    color: '#373535',
  },
  inputContainer: {
    borderBottomColor: '#bdbfc1',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: '100%',
    height: 55,
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
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },

  buttonContainer: {
    height: 45,
    flexDirection: 'row',
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
    fontFamily: 'QUICKSAND-LIGHT',
    color: 'white',
  },

  loginSubTitle: {
    fontSize: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: '#bdbfc1',
  },
});
