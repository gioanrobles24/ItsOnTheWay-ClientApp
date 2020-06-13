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
  AsyncStorage,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Icon, Avatar, Badge, withBadge} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation';
import {setUser} from '../../reducers/session';
import {connect} from 'react-redux';
const imageverde = {uri: 'http://dev.itsontheway.net/api/imgVerde'};

class LoginClientView extends Component {
  constructor(props) {
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.state = {
      showPassword: true,
      icon: 'visibility-off',
      email: '',
      password: '',
      loading: false,
    };
  }

  toggleSwitch() {
    this.setState(prevState => ({
      icon:
        prevState.icon === 'visibility-off' ? 'visibility' : 'visibility-off',
      showPassword: !this.state.showPassword,
    }));
  }

  register = viewId => {
    Actions.registerClient();
  };
  resetPassword = viewId => {
    Actions.resetPasswordClient();
  };
  Login = () => {
    this.setState({loading: true});
    fetch('http://dev.itsontheway.net/api/clients/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cl_email: this.state.email,
        password: this.state.password,
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        if (responseData.error) {
          Alert.alert(
            'Usuario o contraseña incorrectos, por favor intenta nuevamente',
          );
        } else {
          AsyncStorage.setItem(responseData);
          this.props.login(responseData);
          Actions.homeClient({responseData});
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => this.setState({loading: false}));
  };

  render() {
    const {loading} = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.loginTitle} h1>
            Login
          </Text>
        </View>
        <View>
          <Text style={styles.loginSubTitle} h3>
            Inicie sesión para continuar
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Correo"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={email => this.setState({email})}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholderTextColor="gray"
            placeholder="Contraseña"
            secureTextEntry={this.state.showPassword}
            onChangeText={password => this.setState({password})}
          />
          <Icon
            name={this.state.icon}
            onPress={() => this.toggleSwitch()}
            value={!this.state.showPassword}
          />
        </View>

        <View>
          <Text
            style={styles.reset}
            onPress={() => {
              this.resetPassword();
            }}>
            ¿olvidó la clave?
          </Text>
        </View>

        <TouchableHighlight
          disabled={loading}
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => {
            this.Login();
          }}>
          {!loading ? (
            <Text style={styles.loginText}>Ingresar</Text>
          ) : (
            <Text style={styles.loginText}>Cargando...</Text>
          )}
        </TouchableHighlight>

        <View style={styles.registerContainer}>
          <Text style={styles.registertext} h5>
            Nuevo en It's?
          </Text>
          <Text
            style={styles.registertext2}
            onPress={() => {
              this.register();
            }}
            h5>
            Registrate
          </Text>
        </View>
        <Avatar
          rounded
          size="xlarge"
          overlayContainerStyle={{backgroundColor: 'transparent'}}
          containerStyle={{
            alignSelf: 'center',
            flexDirection: 'column',
            marginTop: 20,
          }}
          source={imageverde}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(setUser(user)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(LoginClientView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    fontFamily: 'QUICKSAND-LIGHT',
  },
  inputContainer: {
    borderBottomColor: '#bdbfc1',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 350,
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

  loginTitle: {
    fontSize: 34,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#373535',
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

  reset: {
    color: '#a9d046',
    height: 30,
    marginBottom: 35,
    fontSize: 16,
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
    left: 72,
  },

  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: 400,
  },
  registertext: {
    color: '#bdbfc1',
    height: 30,
    fontSize: 16,
  },
  registertext2: {
    color: '#a9d046',
  },
});
