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
  Picker,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Icon, Avatar, Badge, withBadge} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
import {green} from '../../colors';
import {config} from '../../config';
const background = require('../../assets/background.png');

export default class RegisterClientView extends Component {
  constructor(props) {
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.state = {
      showPassword: true,
      icon: 'visibility-off',
      favColor: undefined,
      items: [
        {
          label: 'Aragua',
          value: 'red',
        },
        {
          label: 'Distrito Capital',
          value: 'orange',
        },
        {
          label: 'Miranda',
          value: 'blue',
        },
      ],
    };
  }

  toggleSwitch() {
    this.setState(prevState => ({
      icon:
        prevState.icon === 'visibility-off' ? 'visibility' : 'visibility-off',
      showPassword: !this.state.showPassword,
    }));
  }

  Verification = viewId => {
    fetch(`${config.apiUrl}/clients/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cl_email: this.state.email,
        password: this.state.password,
        cl_user: 'user_default',
        cl_phone_1: this.state.phone,
        cl_name: this.state.name,
        cl_last_name: this.state.last_name,
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.error) {
          Alert.alert(
            'Hola!',
            'Este correo ya existe',
            [
              {
                text: 'Cancelar',
                onPress: () => {},
                style: 'cancel',
              },
              {text: 'Ir a login', onPress: () => Actions.pop()},
            ],
            {cancelable: false},
          );
        } else {
          Actions.replace('verifyClient', {responseData});
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Verification = (viewId) => {

  // 	  Actions.verifyClient()
  // }

  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={background}
          style={{flex: 1, resizeMode: 'cover'}}>
          <View style={styles.container}>
            <View>
              <Text style={styles.loginTitle} h1>
                Registro
              </Text>
            </View>
            <ScrollView style={{width: '100%'}}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputs}
                  placeholder="Nombre"
                  keyboardType="default"
                  underlineColorAndroid="transparent"
                  onChangeText={name => this.setState({name})}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputs}
                  placeholder="Apellido"
                  keyboardType="default"
                  underlineColorAndroid="transparent"
                  onChangeText={last_name => this.setState({last_name})}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputs}
                  placeholder="Teléfono"
                  keyboardType="phone-pad"
                  underlineColorAndroid="transparent"
                  onChangeText={phone => this.setState({phone})}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputs}
                  placeholder="Email"
                  keyboardType="email-address"
                  underlineColorAndroid="transparent"
                  onChangeText={email => this.setState({email})}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputs}
                  placeholderTextColor="gray"
                  placeholder="Clave"
                  secureTextEntry={this.state.showPassword}
                  onChangeText={password => this.setState({password})}
                />
                <Icon
                  name={this.state.icon}
                  onPress={() => this.toggleSwitch()}
                  value={!this.state.showPassword}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputs}
                  placeholderTextColor="gray"
                  placeholder="Repetir Clave"
                  secureTextEntry={this.state.showPassword}
                  onChangeText={password_confirm =>
                    this.setState({password_confirm})
                  }
                />
              </View>
            </ScrollView>

            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => {
                this.Verification();
              }}>
              <Text style={styles.loginText}>Continuar</Text>
            </TouchableHighlight>
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
  },

  loginTitle: {
    fontSize: 34,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#373535',
    fontFamily: '[z] Arista Light',
  },
  loginTitle2: {
    fontSize: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#373535',
    fontWeight: 'bold',
  },
  inputContainer: {
    borderBottomColor: '#bdbfc1',
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
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
    fontFamily: '[z] Arista Light',
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
