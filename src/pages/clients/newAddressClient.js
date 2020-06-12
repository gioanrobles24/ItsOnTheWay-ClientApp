import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableHighlight,
  Image,
  Alert,
  Switch,
  ToastAndroid,
  BackHandler,
  Picker,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Icon, Avatar, Badge, withBadge} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
import {Card} from 'react-native-shadow-cards';
const image = {uri: 'http://dev.itsontheway.net/api/imgBlanca'};

export default class NewAddressClientView extends Component {
  constructor(props) {
    super(props);
    //  this.toggleSwitch = this.toggleSwitch.bind(this);
    this.state = {
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

  newAddress = viewId => {
    Alert.alert(
      'Hola! Por favor confirma: ',
      '¿Estás seguro agregar esta dirección?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Si', onPress: () => Actions.homeClient()},
      ],
      {cancelable: false},
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.Title}>Agregar Dirección</Text>
        </View>

        <RNPickerSelect
          placeholder={{
            label: 'Seleciona una parroquia',
            value: null,
          }}
          items={this.state.items}
          onValueChange={value => {
            this.setState({
              favColor: value,
            });
          }}
          style={{marginLeft: 10, marginTop: 50}}
          value={this.state.favColor}
          useNativeAndroidPickerStyle={true}
          hideIcon={true}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholderTextColor="gray"
            placeholder="Zona"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholderTextColor="gray"
            placeholder="Descripción de dirección"
          />
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => {
            this.newAddress();
          }}>
          <Text style={styles.loginText}>Agregar</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    backgroundColor: 'white',
    fontFamily: 'QUICKSAND-LIGHT',
  },
  SubTitle: {
    fontSize: 15,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  Text: {
    color: '#bdbfc1',
  },
  header: {
    flexDirection: 'row',
    marginTop: 20,
  },
  Title: {
    fontSize: 25,
    color: '#373535',
    marginLeft: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    borderBottomColor: '#bdbfc1',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 400,
    flexDirection: 'row',
  },
  inputs: {
    marginLeft: 12,
    borderBottomColor: '#FFFFFF',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 270,
    borderRadius: 5,
    marginTop: 80,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  loginButton: {
    backgroundColor: '#a9d046',
    alignSelf: 'center',
  },
  loginText: {
    fontFamily: 'QUICKSAND-LIGHT',
    color: 'white',
  },
});
