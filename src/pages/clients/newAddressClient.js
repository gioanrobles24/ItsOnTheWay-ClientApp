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
import {connect} from 'react-redux';
const image = {uri: 'http://dev.itsontheway.net/api/imgBlanca'};

class NewAddressClientView extends Component {
  constructor(props) {
    super(props);
    //  this.toggleSwitch = this.toggleSwitch.bind(this);
    this.state = {
      zones: [],
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

  componentDidMount() {
    fetch('http://dev.itsontheway.net/api/aviable_zones')
      .then(resp => resp.json())
      .then(resp => this.setState({zones: resp.response.zones_aviables}));
  }

  newAddress = viewId => {
    const {zone, description} = this.state;
    if (zone && description) {
      Alert.alert(
        'Hola! Por favor confirma: ',
        '¿Estás seguro agregar esta dirección?',
        [
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Si',
            onPress: () => {
              const body = JSON.stringify({
                description,
                cl_id: this.props.user.response.client_info.id,
                mun_id: this.state.zones.find(z => z.id === zone).mun_id,
                zone_id: zone.toString(),
              });

              fetch(
                'http://dev.itsontheway.net/api/clients/new_address_client',
                {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: body,
                },
              )
                .then(resp => {
                  return resp.json();
                  // Actions.homeClient();
                })
                .then(() => Actions.addressClient());
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert('Selecciona una zona y escribe la descripcion');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.Title}>Agregar Dirección</Text>
        </View>

        <View style={styles.inputContainer}>
          <RNPickerSelect
            placeholder={{
              label: 'Seleciona una zona`',
            }}
            items={this.state.zones.map(z => ({
              label: z.zone_name,
              value: z.id,
            }))}
            onValueChange={value => {
              this.setState({
                zone: value,
              });
            }}
            style={{placeholder: {color: 'black'}}}
            // useNativeAndroidPickerStyle={true}
            hideIcon={true}
          />
        </View>
        <Text style={{marginHorizontal: 25, color: '#bdbfc1'}}>
          Solo enviamos a las zonas listadas
        </Text>
        {/* <TextInput
            style={styles.inputs}
            placeholderTextColor="gray"
            placeholder="Zona"
          /> */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholderTextColor="gray"
            placeholder="Descripción de dirección"
            onChangeText={value => this.setState({description: value})}
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

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.session.user,
  };
};

export default connect(
  mapStateToProps,
  null,
)(NewAddressClientView);

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
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  inputs: {
    marginLeft: 12,
    color: 'black',
    // borderBottomColor: '#FFFFFF',
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
