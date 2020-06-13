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
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Icon, Avatar, Badge, withBadge} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';

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
    state = {
      name: '',
      last_name: '',
      email: '',
      phone: '',
      password: '',
      password_confirm: '',
      estado: '',
      user: 'user_default',
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
    console.log(
      'Button pressed ' +
        'correo:' +
        this.state.email +
        'password' +
        this.state.password,
    );

    fetch('http://dev.itsontheway.net/api/clients/register', {
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
        console.log(JSON.stringify(responseData) + 'register callback');
        if (responseData.error) {
          Alert.alert(
            'Hola!',
            'Este correo ya existe',
            [
              {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Ir a login', onPress: () => Actions.pop()},
            ],
            {cancelable: false},
          );
        } else {
          Actions.verifyClient({responseData});
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
      <View style={styles.container}>
        <View>
          <Text style={styles.loginTitle} h1>
            Registro
          </Text>
        </View>
        <ScrollView>
          <View>
            <Text style={styles.loginTitle2} h3>
              Registrate para poder empezar
            </Text>
          </View>
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
          <RNPickerSelect
            placeholder={{
              label: 'Seleciona un estado',
              value: null,
            }}
            items={this.state.items}
            onValueChange={value => {
              this.setState({
                favColor: value,
              });
            }}
            style={{marginLeft: 10}}
            value={this.state.favColor}
            useNativeAndroidPickerStyle={true}
            hideIcon={true}
          />
        </ScrollView>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => {
            this.Verification();
          }}>
          <Text style={styles.loginText}>Continuar</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    fontFamily: 'QUICKSAND-LIGHT',
  },

  loginTitle: {
    fontSize: 34,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#373535',
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
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 400,
    height: 55,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 50,
    marginLeft: 12,
    borderBottomColor: '#FFFFFF',
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
